import { redirect } from "next/navigation";

import { db } from "@/server/db";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: RouteContext) {
  const { token } = await params;
  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { unsubscribeToken: token },
    select: { id: true, locale: true },
  });

  if (!subscriber) {
    redirect("/en/blog?newsletter=invalid");
  }

  await db.newsletterSubscriber.update({
    where: { id: subscriber.id },
    data: {
      status: "UNSUBSCRIBED",
      unsubscribedAt: new Date(),
      confirmationTokenHash: null,
    },
  });

  redirect(`/${subscriber.locale}/blog?newsletter=unsubscribed`);
}
