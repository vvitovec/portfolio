import { CommentTargetType } from '@/generated/prisma';
import CommentsClient from '@/components/comments/CommentsClient';
import { getCommentsForTarget } from '@/server/queries/comments';

type CommentsSectionProps = {
  targetType: CommentTargetType;
  targetSlug: string;
};

export default async function CommentsSection({ targetType, targetSlug }: CommentsSectionProps) {
  const data = await getCommentsForTarget(targetType, targetSlug);

  return (
    <CommentsClient
      targetType={targetType}
      targetSlug={targetSlug}
      initialComments={data.comments}
    />
  );
}
