type JsonLdProps = {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

const ESCAPED_JSON_LD_CHARS: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

export function serializeJsonLd(data: JsonLdProps["data"]) {
  return JSON.stringify(data).replace(
    /[<>&\u2028\u2029]/g,
    (char) => ESCAPED_JSON_LD_CHARS[char] ?? char,
  );
}

export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
