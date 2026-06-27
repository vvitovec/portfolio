import { redirect } from "next/navigation";

import { hashNewsletterToken } from "@/server/newsletter/tokens";
import { db } from "@/server/db";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: RouteContext) {
  const { token } = await params;
  const tokenHash = hashNewsletterToken(token);
  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { confirmationTokenHash: tokenHash },
    select: { id: true, locale: true },
  });

  if (!subscriber) {
    redirect("/en/blog?newsletter=invalid");
  }

  await db.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: {
      status: "CONFIRMED",
      confirmedAt: new Date(),
      unsubscribedAt: null,
      confirmationTokenHash: null,
    },
  });

  redirect(`/${subscriber.locale}/blog?newsletter=confirmed`);
}
