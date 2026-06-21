import { renderMarkdownToHtml } from "@/lib/markdown";

type MarkdownProps = {
  content?: string | null;
};

const markdownClassName = [
  "max-w-none text-[1.0625rem] leading-8 text-foreground/85",
  "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
  "[&_p]:my-5 [&_p]:leading-8",
  "[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-foreground sm:[&_h2]:text-3xl",
  "[&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3]:text-foreground sm:[&_h3]:text-2xl",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:text-foreground/90",
  "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-foreground/35 [&_a]:decoration-1 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-foreground/70",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:my-2 [&_li]:pl-1",
  "[&_code]:rounded [&_code]:bg-muted/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-foreground",
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_pre]:p-4",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-5 [&_blockquote]:text-foreground/75",
].join(" ");

export default async function Markdown({ content }: MarkdownProps) {
  if (!content?.trim()) {
    return null;
  }

  const html = await renderMarkdownToHtml(content);

  return (
    <div
      className={markdownClassName}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
