import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  BlogPostStatus,
  NewsletterEmailStatus,
  NewsletterEmailType,
  NewsletterPostSendStatus,
  type Locale,
} from "@/generated/prisma";
import { db } from "@/server/db";
import {
  buildBlogPostEmail,
  getNewsletterBaseUrl,
  sendNewsletterEmail,
} from "@/server/newsletter/email";
import { adminProcedure, router } from "@/server/trpc/trpc";

const sendPostSchema = z.object({
  postId: z.string().min(1),
  force: z.boolean().optional().default(false),
});

const limitSchema = z
  .object({
    limit: z.number().int().min(1).max(100).optional().default(50),
  })
  .optional();

type PostTranslation = {
  locale: Locale;
  title: string;
  excerpt: string | null;
  contentMarkdown: string;
};

function selectTranslation(
  translations: PostTranslation[],
  locale: Locale,
): PostTranslation {
  return (
    translations.find((translation) => translation.locale === locale) ??
    translations.find((translation) => translation.locale === "en") ??
    translations[0] ?? {
      locale,
      title: "New blog post",
      excerpt: null,
      contentMarkdown: "",
    }
  );
}

export const adminNewsletterRouter = router({
  summary: adminProcedure.query(async () => {
    const [confirmed, pending, unsubscribed, sent, failed] = await Promise.all([
      db.newsletterSubscriber.count({ where: { status: "CONFIRMED" } }),
      db.newsletterSubscriber.count({ where: { status: "PENDING" } }),
      db.newsletterSubscriber.count({ where: { status: "UNSUBSCRIBED" } }),
      db.newsletterEmailEvent.count({ where: { status: "SENT" } }),
      db.newsletterEmailEvent.count({ where: { status: "FAILED" } }),
    ]);

    return { confirmed, pending, unsubscribed, sent, failed };
  }),
  subscribers: adminProcedure.input(limitSchema).query(async ({ input }) =>
    db.newsletterSubscriber.findMany({
      take: input?.limit ?? 50,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        locale: true,
        status: true,
        source: true,
        consentAt: true,
        confirmedAt: true,
        unsubscribedAt: true,
        lastSentAt: true,
        createdAt: true,
      },
    }),
  ),
  sends: adminProcedure.input(limitSchema).query(async ({ input }) =>
    db.newsletterPostSend.findMany({
      take: input?.limit ?? 30,
      orderBy: { createdAt: "desc" },
      include: {
        post: {
          select: {
            slug: true,
            translations: {
              select: { locale: true, title: true },
            },
          },
        },
      },
    }),
  ),
  events: adminProcedure.input(limitSchema).query(async ({ input }) =>
    db.newsletterEmailEvent.findMany({
      take: input?.limit ?? 50,
      orderBy: { createdAt: "desc" },
      include: {
        subscriber: {
          select: { email: true, locale: true, status: true },
        },
        post: {
          select: { slug: true },
        },
      },
    }),
  ),
  sendPost: adminProcedure.input(sendPostSchema).mutation(async ({ ctx, input }) => {
    const post = await db.blogPost.findUnique({
      where: { id: input.postId },
      select: {
        id: true,
        slug: true,
        status: true,
        newsletterSends: {
          where: { status: NewsletterPostSendStatus.COMPLETED },
          select: { id: true },
          take: 1,
        },
        translations: {
          select: {
            locale: true,
            title: true,
            excerpt: true,
            contentMarkdown: true,
          },
        },
      },
    });

    if (!post) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Blog post not found." });
    }

    if (post.status !== BlogPostStatus.PUBLISHED) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Only published posts can be sent.",
      });
    }

    if (post.newsletterSends.length > 0 && !input.force) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "This post was already sent to the newsletter.",
      });
    }

    const subscribers = await db.newsletterSubscriber.findMany({
      where: { status: "CONFIRMED" },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        locale: true,
        unsubscribeToken: true,
      },
    });

    const postSend = await db.newsletterPostSend.create({
      data: {
        postId: post.id,
        status: NewsletterPostSendStatus.PENDING,
        recipientCount: subscribers.length,
      },
    });

    let sentCount = 0;
    let failedCount = 0;
    const baseUrl = getNewsletterBaseUrl();

    for (const subscriber of subscribers) {
      const translation = selectTranslation(post.translations, subscriber.locale);
      const postUrl = `${baseUrl}/${subscriber.locale}/blog/${post.slug}`;
      const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe/${subscriber.unsubscribeToken}`;
      const email = buildBlogPostEmail({
        locale: subscriber.locale,
        title: translation.title,
        excerpt: translation.excerpt,
        contentMarkdown: translation.contentMarkdown,
        postUrl,
        unsubscribeUrl,
      });
      const result = await sendNewsletterEmail({
        to: subscriber.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
        tags: [
          { name: "category", value: "newsletter" },
          { name: "type", value: "blog-post" },
          { name: "post", value: post.slug },
        ],
      });

      if (result.ok) {
        sentCount += 1;
        await db.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: { lastSentAt: new Date() },
        });
      } else {
        failedCount += 1;
      }

      await db.newsletterEmailEvent.create({
        data: {
          subscriberId: subscriber.id,
          postId: post.id,
          postSendId: postSend.id,
          type: NewsletterEmailType.BLOG_POST,
          status: result.ok
            ? NewsletterEmailStatus.SENT
            : NewsletterEmailStatus.FAILED,
          toEmail: subscriber.email,
          subject: email.subject,
          resendEmailId: result.ok ? result.id : null,
          errorMessage: result.ok ? null : result.error,
        },
      });
    }

    const status =
      failedCount > 0
        ? NewsletterPostSendStatus.FAILED
        : NewsletterPostSendStatus.COMPLETED;
    const updatedSend = await db.newsletterPostSend.update({
      where: { id: postSend.id },
      data: {
        status,
        sentCount,
        failedCount,
        completedAt: new Date(),
        errorMessage:
          failedCount > 0
            ? `${failedCount} newsletter email(s) failed.`
            : null,
      },
    });

    return {
      ...updatedSend,
      initiatedBy: ctx.session?.user?.email ?? null,
    };
  }),
});
