import { Locale, ProjectStatus } from "../src/generated/prisma";
import { db } from "../src/server/db.script";

const projects = [
  {
    slug: "landing-gen",
    status: ProjectStatus.PUBLISHED,
    featured: true,
    coverImageUrl: "/images/projects/landing-gen/cover.jpg",
    liveUrl: "https://landinggen.app",
    repoUrl: null,
    techStack: ["Next.js", "Tailwind", "Framer Motion"],
    publishedAt: new Date("2024-06-15T10:00:00Z"),
    translations: {
      create: [
        {
          locale: Locale.cs,
          title: "Landing Gen",
          tagline: "Generátor landing stránek pro startupy.",
          descriptionShort:
            "Rychlé sestavení konverzních stránek s důrazem na výkon a SEO.",
          highlights: ["Rychlé MVP", "A/B testování", "Vysoká konverze"],
        },
        {
          locale: Locale.en,
          title: "Landing Gen",
          tagline: "Landing page generator for startups.",
          descriptionShort:
            "Rapidly build conversion-focused pages with performance and SEO in mind.",
          highlights: ["Rapid MVPs", "A/B testing", "High conversion"],
        },
      ],
    },
  },
  {
    slug: "easyflex",
    status: ProjectStatus.PUBLISHED,
    featured: true,
    coverImageUrl: "/images/projects/easyflex/cover.jpg",
    liveUrl: "https://easyflex.eu",
    repoUrl: null,
    techStack: ["Next.js", "tRPC", "Prisma"],
    publishedAt: new Date("2024-09-05T10:00:00Z"),
    translations: {
      create: [
        {
          locale: Locale.cs,
          title: "EasyFlex",
          tagline: "Platforma pro flexibilní pracovní týmy.",
          descriptionShort:
            "Nástroj pro řízení projektů a kapacit v rychle rostoucích firmách.",
          highlights: ["Plánování kapacit", "Realtime dashboardy", "Integrace"],
        },
        {
          locale: Locale.en,
          title: "EasyFlex",
          tagline: "Flexible workforce management platform.",
          descriptionShort:
            "A tool for managing projects and capacity in fast-growing teams.",
          highlights: ["Capacity planning", "Realtime dashboards", "Integrations"],
        },
      ],
    },
  },
  {
    slug: "mind-plant",
    status: ProjectStatus.DRAFT,
    featured: false,
    coverImageUrl: "/images/projects/mind-plant/cover.jpg",
    liveUrl: null,
    repoUrl: null,
    techStack: ["React", "Next.js", "Supabase"],
    translations: {
      create: [
        {
          locale: Locale.cs,
          title: "Mind Plant",
          tagline: "Digitální koučink pro mentální pohodu.",
          descriptionShort:
            "Aplikace, která propojuje denní rituály a data o náladě.",
          highlights: ["Personalizace", "Notifikace", "Dashboardy"],
        },
        {
          locale: Locale.en,
          title: "Mind Plant",
          tagline: "Digital coaching for mental well-being.",
          descriptionShort:
            "An app that connects daily rituals with mood insights.",
          highlights: ["Personalization", "Notifications", "Dashboards"],
        },
      ],
    },
  },
  {
    slug: "real-estate-predict",
    status: ProjectStatus.PUBLISHED,
    featured: false,
    coverImageUrl: "/images/projects/real-estate-predict/cover.jpg",
    liveUrl: "https://estatepredict.ai",
    repoUrl: null,
    techStack: ["Next.js", "Python", "PostgreSQL"],
    publishedAt: new Date("2023-12-11T10:00:00Z"),
    translations: {
      create: [
        {
          locale: Locale.cs,
          title: "Real Estate Predict",
          tagline: "Predikce cen nemovitostí pomocí dat.",
          descriptionShort:
            "Analytická platforma pro investory s důrazem na lokalitu.",
          highlights: ["Modely predikce", "Interaktivní mapy", "Export dat"],
        },
        {
          locale: Locale.en,
          title: "Real Estate Predict",
          tagline: "Data-driven real estate price forecasting.",
          descriptionShort:
            "Analytics platform for investors with location-first insights.",
          highlights: ["Forecast models", "Interactive maps", "Data exports"],
        },
      ],
    },
  },
  {
    slug: "weby-pro-firmy",
    status: ProjectStatus.DRAFT,
    featured: false,
    coverImageUrl: "/images/projects/weby-pro-firmy/cover.jpg",
    liveUrl: null,
    repoUrl: null,
    techStack: ["Next.js", "Tailwind", "Contentful"],
    translations: {
      create: [
        {
          locale: Locale.cs,
          title: "Weby pro firmy",
          tagline: "Prémiové weby pro lokální podniky.",
          descriptionShort:
            "Sada šablon a procesů pro rychlý launch firemních webů.",
          highlights: ["Rychlý launch", "Více jazyků", "SEO ready"],
        },
        {
          locale: Locale.en,
          title: "Business Websites",
          tagline: "Premium sites for local businesses.",
          descriptionShort:
            "A set of templates and workflows to launch business sites fast.",
          highlights: ["Fast launch", "Multilingual", "SEO ready"],
        },
      ],
    },
  },
];

async function main() {
  await db.project.deleteMany();

  for (const project of projects) {
    await db.project.create({ data: project });
  }
}

main()
  .then(() => {
    console.log("Database seeded.");
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
