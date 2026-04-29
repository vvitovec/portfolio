# Portfolio Web

Personal portfolio and project admin for [vitovec.com](https://vitovec.com), built with Next.js App Router, TypeScript, Prisma, PostgreSQL, next-intl, tRPC, NextAuth, and Vercel Blob.

## Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- tRPC + React Query
- next-intl for Czech and English routes
- NextAuth with GitHub allowlist
- Vercel Blob for admin uploads
- Resend for contact form delivery

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Use `.env.example` as the template for local variables. Required production services:

- PostgreSQL database
- GitHub OAuth application
- Vercel Blob store
- Resend API key for contact form email
- OpenAI API key for admin translation tools

For Vercel Blob, attach a Blob store to the Vercel project. Locally, pull Vercel variables with `vercel env pull` or add `BLOB_READ_WRITE_TOKEN` manually.

## Scripts

```bash
pnpm dev       # start the local dev server
pnpm lint      # run ESLint
pnpm build     # create a production build
pnpm db:seed   # seed the database
```

## Project Structure

- `src/app` - App Router routes and API handlers
- `src/components` - reusable UI and feature components
- `src/server` - server-only auth, database, queries, and tRPC routers
- `src/messages` - Czech and English UI messages
- `prisma` - schema, migrations, and seed data

## Quality Checks

Before shipping changes:

```bash
pnpm lint
pnpm build
```

After deployment, verify `robots.txt`, `sitemap.xml`, page metadata, structured data, and Core Web Vitals for the public Czech and English pages.
