import { renderMarkdownToHtml } from "@/lib/markdown";

type MarkdownProps = {
  content?: string | null;
};

export default async function Markdown({ content }: MarkdownProps) {
  if (!content?.trim()) {
    return null;
  }

  const html = await renderMarkdownToHtml(content);

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-foreground/80 prose-ul:my-4 prose-ol:my-4 prose-li:my-1 prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6 prose-a:text-foreground prose-a:decoration-foreground/30 prose-a:underline-offset-4 prose-code:rounded prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-pre:border prose-pre:border-border prose-pre:bg-muted/50"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
