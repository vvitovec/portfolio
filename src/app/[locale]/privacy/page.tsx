import type { Metadata } from "next";

import Container from "@/components/layout/Container";
import JsonLd from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type PrivacyContent = {
  title: string;
  description: string;
  updated: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

const privacyByLocale: Record<Locale, PrivacyContent> = {
  cs: {
    title: "Zásady ochrany osobních údajů",
    description:
      "Stručné informace o tom, jak Viktor Vítovec zpracovává osobní údaje při používání tohoto portfolia a kontaktních formulářů.",
    updated: "Aktualizováno 30. června 2026",
    sections: [
      {
        title: "Kdo údaje zpracovává",
        body: [
          "Správcem osobních údajů je Viktor Vítovec, kontakt: viktor@vvitovec.com.",
          "Tento web slouží jako osobní portfolio, kontaktní místo pro spolupráce a publikační prostor pro projekty a články.",
        ],
      },
      {
        title: "Jaké údaje zpracovávám",
        body: [
          "Při odeslání kontaktního formuláře zpracovávám údaje, které sami zadáte, typicky jméno, e-mail a text zprávy.",
          "Web může z technických důvodů zpracovávat běžné provozní údaje, například IP adresu, čas požadavku, stránku a základní informace o prohlížeči.",
        ],
      },
      {
        title: "Proč údaje používám",
        body: [
          "Údaje používám k odpovědi na zprávy, domluvě spolupráce, ochraně webu před zneužitím a k zajištění běžného provozu webu.",
          "Neprodávám osobní údaje třetím stranám a nepoužívám je pro nevyžádaný marketing.",
        ],
      },
      {
        title: "Služby třetích stran",
        body: [
          "Web je provozován přes hostingové a infrastrukturní služby, které mohou zpracovávat provozní data nezbytná pro doručení webu a zabezpečení.",
          "Odkazy na externí služby, například GitHub, Instagram nebo LinkedIn, se řídí zásadami těchto služeb.",
        ],
      },
      {
        title: "Doba uchování a práva",
        body: [
          "Zprávy a související údaje uchovávám po dobu potřebnou k vyřízení komunikace a navazující spolupráce, případně po dobu vyžadovanou právními povinnostmi.",
          "Můžete požádat o přístup, opravu nebo smazání svých údajů na e-mailu viktor@vvitovec.com.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    description:
      "A concise overview of how Viktor Vítovec processes personal data when you use this portfolio and contact forms.",
    updated: "Updated June 30, 2026",
    sections: [
      {
        title: "Who processes the data",
        body: [
          "The data controller is Viktor Vítovec, contact: viktor@vvitovec.com.",
          "This website is a personal portfolio, a contact point for collaboration, and a publishing space for projects and articles.",
        ],
      },
      {
        title: "What data I process",
        body: [
          "When you submit a contact form, I process the information you provide, typically your name, email address, and message.",
          "For technical reasons, the website may process standard operational data such as IP address, request time, page URL, and basic browser information.",
        ],
      },
      {
        title: "Why I use the data",
        body: [
          "I use the data to respond to messages, discuss collaboration, protect the website from abuse, and keep the website operating normally.",
          "I do not sell personal data to third parties and I do not use it for unsolicited marketing.",
        ],
      },
      {
        title: "Third-party services",
        body: [
          "The website runs on hosting and infrastructure services that may process operational data needed to deliver and secure the website.",
          "External links, such as GitHub, Instagram, or LinkedIn, are governed by the policies of those services.",
        ],
      },
      {
        title: "Retention and rights",
        body: [
          "I keep messages and related data for as long as needed to handle communication and related collaboration, or for the period required by legal obligations.",
          "You can request access, correction, or deletion of your data by emailing viktor@vvitovec.com.",
        ],
      },
    ],
  },
};

function getLocale(rawLocale: string): Locale {
  return routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const content = privacyByLocale[locale];

  return buildPageMetadata({
    locale,
    pathname: "/privacy",
    title: `${content.title} | ${SITE_NAME}`,
    description: content.description,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocale(rawLocale);
  const content = privacyByLocale[locale];
  const homeLabel = locale === "cs" ? "Domů" : "Home";

  return (
    <>
      <JsonLd
        id={`privacy-structured-data-${locale}`}
        data={[
          createWebPageSchema({
            locale,
            pathname: "/privacy",
            title: content.title,
            description: content.description,
            includePerson: true,
          }),
          createBreadcrumbSchema(locale, [
            { name: homeLabel, pathname: "/" },
            { name: content.title, pathname: "/privacy" },
          ]),
        ]}
      />
      <section className="py-20 sm:py-28">
        <Container>
          <article className="mx-auto max-w-3xl space-y-10">
            <header className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {content.updated}
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {content.title}
              </h1>
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                {content.description}
              </p>
            </header>
            <div className="space-y-8">
              {content.sections.map((section) => (
                <section
                  key={section.title}
                  className="border-t border-border/70 pt-6"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
