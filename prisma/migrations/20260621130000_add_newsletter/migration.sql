-- CreateEnum
CREATE TYPE "NewsletterSubscriberStatus" AS ENUM ('PENDING', 'CONFIRMED', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "NewsletterEmailType" AS ENUM ('CONFIRMATION', 'BLOG_POST');

-- CreateEnum
CREATE TYPE "NewsletterEmailStatus" AS ENUM ('SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "NewsletterPostSendStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'en',
    "status" "NewsletterSubscriberStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "confirmationTokenHash" TEXT,
    "unsubscribeToken" TEXT NOT NULL,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "lastSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterPostSend" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "status" "NewsletterPostSendStatus" NOT NULL,
    "recipientCount" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterPostSend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterEmailEvent" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT,
    "postId" TEXT,
    "postSendId" TEXT,
    "type" "NewsletterEmailType" NOT NULL,
    "status" "NewsletterEmailStatus" NOT NULL,
    "toEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "resendEmailId" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterEmailEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_confirmationTokenHash_key" ON "NewsletterSubscriber"("confirmationTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_unsubscribeToken_key" ON "NewsletterSubscriber"("unsubscribeToken");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_status_idx" ON "NewsletterSubscriber"("status");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_locale_idx" ON "NewsletterSubscriber"("locale");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_createdAt_idx" ON "NewsletterSubscriber"("createdAt");

-- CreateIndex
CREATE INDEX "NewsletterPostSend_postId_idx" ON "NewsletterPostSend"("postId");

-- CreateIndex
CREATE INDEX "NewsletterPostSend_status_idx" ON "NewsletterPostSend"("status");

-- CreateIndex
CREATE INDEX "NewsletterPostSend_createdAt_idx" ON "NewsletterPostSend"("createdAt");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_subscriberId_idx" ON "NewsletterEmailEvent"("subscriberId");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_postId_idx" ON "NewsletterEmailEvent"("postId");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_postSendId_idx" ON "NewsletterEmailEvent"("postSendId");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_type_idx" ON "NewsletterEmailEvent"("type");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_status_idx" ON "NewsletterEmailEvent"("status");

-- CreateIndex
CREATE INDEX "NewsletterEmailEvent_createdAt_idx" ON "NewsletterEmailEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "NewsletterPostSend" ADD CONSTRAINT "NewsletterPostSend_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterEmailEvent" ADD CONSTRAINT "NewsletterEmailEvent_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "NewsletterSubscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterEmailEvent" ADD CONSTRAINT "NewsletterEmailEvent_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterEmailEvent" ADD CONSTRAINT "NewsletterEmailEvent_postSendId_fkey" FOREIGN KEY ("postSendId") REFERENCES "NewsletterPostSend"("id") ON DELETE SET NULL ON UPDATE CASCADE;
