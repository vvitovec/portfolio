export const solisPublishedAt = new Date('2026-06-11T08:00:00.000Z');

export const solisWebsite = {
  name: 'Solis',
  url: 'https://www.solis.cz/',
  category: 'E-shop',
  description: 'Multijazyčný e-shop pro velkou firmu s ABRA Gen, SEO a reklamní správou',
  sortOrder: 25,
  status: 'PUBLISHED' as const,
  publishedAt: solisPublishedAt,
};

export const solisProject = {
  slug: 'solis',
  status: 'PUBLISHED' as const,
  featured: true,
  year: 2026,
  coverImageUrl: '/images/projects/solis/homepage.webp',
  galleryImageUrls: [
    '/images/projects/solis/homepage.webp',
    '/images/projects/solis/search-console.webp',
  ],
  liveUrl: 'https://www.solis.cz/',
  repoUrl: null,
  techStack: [
    'E-commerce',
    'Multilingual web',
    'ABRA Gen',
    'SEO',
    'Google Search Console',
    'Online ads',
  ],
  publishedAt: solisPublishedAt,
  translations: {
    create: [
      {
        locale: 'cs' as const,
        title: 'Solis',
        tagline: 'Komplexní multijazyčný e-shop pro velkého prodejce techniky.',
        descriptionShort:
          'Satelitní e-shop na více doménách pro různé jazyky, napojený na ABRA Gen a dlouhodobě řešený přes SEO, reklamy a Google Search Console.',
        descriptionLong:
          'Solis je rozsáhlý e-shop pro velkou firmu s širokým katalogem produktů, náhradních dílů a servisních kategorií. Práce nebyla jen o webu jako vitríně, ale o provozním systému: vícejazyčné domény, produktová struktura, účetní integrace, měření, organická návštěvnost a reklamní výkon.',
        role: 'Web development, e-commerce architektura, ABRA Gen integrace, SEO, reklamy a technická správa',
        highlights: [
          'Multijazyčný satelitní web na více doménách',
          'Rozsáhlý e-shop s mnoha produkty a kategoriemi',
          'Napojení na účetní systém ABRA Gen',
          'Technické SEO a práce s Google Search Console',
          'Správa reklam a výkonových kanálů',
          'Dlouhodobá práce pro velkou firmu s komplexním provozem',
        ],
        caseStudyBlocks: [
          {
            id: 'solis-problem',
            type: 'problem',
            title: 'Velký e-shop bez prostoru pro jednoduchá řešení',
            body: 'Solis potřeboval web, který zvládne velké množství produktů, technických parametrů, náhradních dílů a servisního obsahu. Zároveň bylo nutné řešit více jazyků formou satelitních webů na různých doménách, aby lokální verze fungovaly obchodně i ve vyhledávání.',
          },
          {
            id: 'solis-solution',
            type: 'solution',
            title: 'E-shop, integrace a výkonový provoz jako jeden celek',
            body: 'Projekt jsem řešil jako komplexní e-commerce infrastrukturu: katalog a obsah, vícejazyčné domény, napojení na účetní program ABRA Gen, technické SEO, vyhodnocování v Google Search Console a podporu reklam. Cílem bylo, aby web nebyl oddělený od firmy, ale zapadal do běžného provozu a obchodních procesů.',
          },
          {
            id: 'solis-outcome',
            type: 'outcome',
            title: 'Stabilní základ pro růst velké firmy',
            body: 'Výsledkem je rozsáhlý firemní e-shop, který dokáže obsloužit široký sortiment, různé jazykové mutace i dlouhodobý výkon v organickém a placeném vyhledávání.',
            bullets: [
              'Jazykové verze oddělené podle domén a trhu',
              'Produktový katalog připravený pro velký sortiment',
              'Účetní data propojená přes ABRA Gen',
              'SEO a reklamy řízené podle měřeného výkonu',
            ],
          },
          {
            id: 'solis-search-console',
            type: 'image',
            title: 'Search Console jako každodenní provozní nástroj',
            body: 'U takhle velkého e-shopu nestačí web jednou spustit. Průběžná práce v Google Search Console pomáhá hlídat dotazy, stránky, indexaci, Core Web Vitals a výkon organického vyhledávání napříč jazykovými verzemi.',
            imageUrl: '/images/projects/solis/search-console.webp',
            caption: 'Výkon v Google Search Console pro solis.cz za poslední tři měsíce.',
            layout: 'right',
          },
        ],
      },
      {
        locale: 'en' as const,
        title: 'Solis',
        tagline: 'A complex multilingual e-commerce platform for a large company.',
        descriptionShort:
          'A satellite e-shop across multiple domains for different languages, connected to ABRA Gen and supported by SEO, ads, and Google Search Console work.',
        descriptionLong:
          'Solis is a large e-commerce project for a company with a broad catalogue of products, spare parts, and service categories. The work was not just a presentation website, but an operating system: multilingual domains, product structure, accounting integration, measurement, organic traffic, and paid performance.',
        role: 'Web development, e-commerce architecture, ABRA Gen integration, SEO, ads, and technical operations',
        highlights: [
          'Multilingual satellite website across multiple domains',
          'Large e-shop with many products and categories',
          'Integration with the ABRA Gen accounting system',
          'Technical SEO and Google Search Console work',
          'Ad management and performance channels',
          'Long-term work for a large company with complex operations',
        ],
        caseStudyBlocks: [
          {
            id: 'solis-problem',
            type: 'problem',
            title: 'A large e-shop with no room for simple fixes',
            body: 'Solis needed a website that could handle a large number of products, technical parameters, spare parts, and service content. It also needed multiple languages through satellite websites on different domains, so each local version could work commercially and in search.',
          },
          {
            id: 'solis-solution',
            type: 'solution',
            title: 'E-commerce, integration, and performance operations together',
            body: 'I treated the project as complex e-commerce infrastructure: catalogue and content, multilingual domains, integration with the ABRA Gen accounting software, technical SEO, Google Search Console analysis, and ad support. The goal was to make the website part of everyday business operations, not a separate layer next to the company.',
          },
          {
            id: 'solis-outcome',
            type: 'outcome',
            title: "A stable foundation for a large company's growth",
            body: 'The result is a broad company e-shop that can support a large catalogue, multiple language versions, and long-term performance across organic and paid search.',
            bullets: [
              'Language versions separated by domain and market',
              'Product catalogue prepared for a large assortment',
              'Accounting data connected through ABRA Gen',
              'SEO and ads managed through measured performance',
            ],
          },
          {
            id: 'solis-search-console',
            type: 'image',
            title: 'Search Console as a daily operating tool',
            body: 'For an e-shop of this size, launching the website is not enough. Continuous work in Google Search Console helps track queries, pages, indexation, Core Web Vitals, and organic search performance across language versions.',
            imageUrl: '/images/projects/solis/search-console.webp',
            caption: 'Google Search Console performance for solis.cz over the last three months.',
            layout: 'right',
          },
        ],
      },
    ],
  },
};
