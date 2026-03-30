-- CreateEnum
CREATE TYPE "WebsiteStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "WebsiteStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Website" ("id", "name", "url", "category", "description", "sortOrder", "status", "createdAt", "updatedAt", "publishedAt")
VALUES
    ('cm8uwebsite001', 'XinChao', 'https://xinchao.vvitovec27.workers.dev/', 'Restaurace', 'Vietnamská restaurace v Českých Budějovicích', 10, 'PUBLISHED', NOW(), NOW(), '2025-01-05T10:00:00.000Z'),
    ('cm8uwebsite002', 'Kavárna U Vás', 'https://u-vas.vvitovec27.workers.dev/', 'Kavárna & Čajovna', 'Kavárna a čajovna v centru Českých Budějovic', 20, 'PUBLISHED', NOW(), NOW(), '2025-01-06T10:00:00.000Z'),
    ('cm8uwebsite003', 'Restaurace U Podkovy', 'https://u-podkovy.vvitovec27.workers.dev/', 'Restaurace', 'Česká restaurace se steaky v Českých Budějovicích', 30, 'PUBLISHED', NOW(), NOW(), '2025-01-07T10:00:00.000Z'),
    ('cm8uwebsite004', 'ATIRA', 'https://atira-web.vercel.app/', 'Projekce & Development', 'Projekce, inženýring a development', 40, 'PUBLISHED', NOW(), NOW(), '2025-01-08T10:00:00.000Z'),
    ('cm8uwebsite005', 'Martina Jiříčková', 'https://martina-vyjednavaci-web.vercel.app/', 'Vyjednávání', 'Profesionální vyjednávací služby', 50, 'PUBLISHED', NOW(), NOW(), '2025-01-09T10:00:00.000Z'),
    ('cm8uwebsite006', 'TISOX', 'https://www.tisox.cz/cs', 'Stavební firma', 'Projektování a realizace staveb', 60, 'PUBLISHED', NOW(), NOW(), '2025-01-10T10:00:00.000Z'),
    ('cm8uwebsite007', 'EasyFlex', 'https://easyflex.onrender.com/', 'Aplikace', 'Webová aplikace EasyFlex', 70, 'PUBLISHED', NOW(), NOW(), '2025-01-11T10:00:00.000Z'),
    ('cm8uwebsite008', 'Landing Gen', 'https://landing.vvitovec.com/', 'Aplikace', 'Nástroj pro rychlou tvorbu landing pages', 80, 'PUBLISHED', NOW(), NOW(), '2025-01-12T10:00:00.000Z'),
    ('cm8uwebsite009', 'Natvian', 'https://natvian.com/', 'E-shop', 'Přírodní veganská kosmetika z Evropy', 90, 'PUBLISHED', NOW(), NOW(), '2025-01-13T10:00:00.000Z'),
    ('cm8uwebsite010', 'Kavárna Pokoj', 'https://pokoj.vvitovec27.workers.dev/', 'Kavárna & Čajovna', 'Kavárna, která se cítí jako obývák', 100, 'PUBLISHED', NOW(), NOW(), '2025-01-14T10:00:00.000Z'),
    ('cm8uwebsite011', 'Bistro Na lžíci', 'https://na-lzici.vvitovec27.workers.dev/', 'Restaurace', 'Útulné bistro v srdci Českých Budějovic', 110, 'PUBLISHED', NOW(), NOW(), '2025-01-15T10:00:00.000Z');
