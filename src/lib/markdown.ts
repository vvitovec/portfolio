import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import type { Root } from "hast";

const allowedTagNames = [
  "p",
  "a",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "code",
  "pre",
  "h2",
  "h3",
  "h4",
  "blockquote",
  "hr",
  "br",
];

const defaultLinkAttributes = Array.isArray(defaultSchema.attributes?.a)
  ? defaultSchema.attributes?.a
  : [];

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: Array.from(
    new Set([...(defaultSchema.tagNames ?? []), ...allowedTagNames]),
  ),
  attributes: {
    ...defaultSchema.attributes,
    a: Array.from(
      new Set([...(defaultLinkAttributes ?? []), "href", "rel", "target"]),
    ),
  },
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

function addLinkAttributes() {
  return (tree: Root) => {
    const visit = (node: Root | Root["children"][number]) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && isExternalHref(href)) {
          node.properties = {
            ...node.properties,
            rel: "noreferrer noopener",
            target: "_blank",
          };
        }
      }

      if ("children" in node && Array.isArray(node.children)) {
        node.children.forEach((child) => visit(child));
      }
    };

    visit(tree);
  };
}

export async function renderMarkdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(addLinkAttributes)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
