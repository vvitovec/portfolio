-- CreateEnum
CREATE TYPE "CommentTargetType" AS ENUM ('BLOG_POST', 'PROJECT');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('VISIBLE', 'PENDING_REVIEW', 'BLOCKED', 'HIDDEN', 'DELETED');

-- CreateEnum
CREATE TYPE "CommentModerationStatus" AS ENUM ('PASSED', 'FLAGGED', 'BLOCKED', 'UNCHECKED');

-- CreateTable
CREATE TABLE "CommunityThread" (
    "id" TEXT NOT NULL,
    "targetType" "CommentTargetType" NOT NULL,
    "targetSlug" TEXT NOT NULL,
    "blogPostId" TEXT,
    "projectId" TEXT,
    "title" TEXT NOT NULL,
    "lastCommentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "parentId" TEXT,
    "authorName" TEXT,
    "body" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "status" "CommentStatus" NOT NULL DEFAULT 'VISIBLE',
    "moderationStatus" "CommentModerationStatus" NOT NULL DEFAULT 'UNCHECKED',
    "moderationSource" TEXT,
    "moderationReason" TEXT,
    "moderationCategories" JSONB,
    "moderationCheckedAt" TIMESTAMP(3),
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentIpBlock" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "reason" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentIpBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityThread_targetType_targetSlug_key" ON "CommunityThread"("targetType", "targetSlug");

-- CreateIndex
CREATE INDEX "CommunityThread_targetType_idx" ON "CommunityThread"("targetType");

-- CreateIndex
CREATE INDEX "CommunityThread_targetSlug_idx" ON "CommunityThread"("targetSlug");

-- CreateIndex
CREATE INDEX "CommunityThread_blogPostId_idx" ON "CommunityThread"("blogPostId");

-- CreateIndex
CREATE INDEX "CommunityThread_projectId_idx" ON "CommunityThread"("projectId");

-- CreateIndex
CREATE INDEX "CommunityThread_lastCommentAt_idx" ON "CommunityThread"("lastCommentAt");

-- CreateIndex
CREATE INDEX "Comment_threadId_idx" ON "Comment"("threadId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_status_idx" ON "Comment"("status");

-- CreateIndex
CREATE INDEX "Comment_isAdmin_idx" ON "Comment"("isAdmin");

-- CreateIndex
CREATE INDEX "Comment_ipHash_idx" ON "Comment"("ipHash");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CommentIpBlock_ipHash_key" ON "CommentIpBlock"("ipHash");

-- CreateIndex
CREATE INDEX "CommentIpBlock_active_idx" ON "CommentIpBlock"("active");

-- CreateIndex
CREATE INDEX "CommentIpBlock_createdAt_idx" ON "CommentIpBlock"("createdAt");

-- AddConstraint
ALTER TABLE "CommunityThread" ADD CONSTRAINT "CommunityThread_target_fk_check" CHECK (
    ("targetType" = 'BLOG_POST' AND "blogPostId" IS NOT NULL AND "projectId" IS NULL)
    OR
    ("targetType" = 'PROJECT' AND "projectId" IS NOT NULL AND "blogPostId" IS NULL)
);

-- AddForeignKey
ALTER TABLE "CommunityThread" ADD CONSTRAINT "CommunityThread_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityThread" ADD CONSTRAINT "CommunityThread_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "CommunityThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
