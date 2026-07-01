import { Images } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

type StoryCardLinkProps = {
  href: string;
  label: string;
};

export default function StoryCardLink({ href, label }: StoryCardLinkProps) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="border-border/70 bg-background/70 hover:bg-accent w-full justify-center gap-2 rounded-xl text-xs font-semibold shadow-sm transition-colors"
    >
      <Link href={href}>
        <Images className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    </Button>
  );
}
