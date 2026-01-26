# Portfolio Web — Development Guidelines (Codex Context)

> IMPORTANT FOR CODEX:
> - Always follow the rules in this file.
> - Every change must keep the codebase clean, scalable, and production-ready.
> - Prefer small, reviewable steps.
> - After each implementation step, ensure `pnpm lint` and `pnpm build` would pass.

## 1) Project Goal
Build a highly professional, visually exceptional personal portfolio website (CZ/EN) that serves as a digital business card for future clients.

Key qualities:
- Modern “premium” look & feel, strong typography, high-quality motion
- Fast, accessible, SEO-friendly
- Future-proof architecture (easy to extend, minimal refactors)
- Built-in admin UI for managing portfolio entries
- Hosted on Vercel
- Dynamic web app (not a purely static site)

## 2) Core Features (Must-Have)
### Public site
- Home (hero + signature sections + highlighted projects)
- Projects list (filterable/searchable optional)
- Project detail page (rich content, media gallery)
- About / Services section (optional but recommended for conversion)
- Contact page with form + success/failure UX
- Language switcher: Czech / English

### Admin (built-in)
- Secure login (admin-only)
- Admin dashboard
- CRUD for Projects (create/edit/delete)
- Image/media upload (project cover + gallery)
- Multilingual fields for each project (CZ + EN)
- Draft/publish toggle (optional but recommended)

### Non-goals
- No WordPress or page builders.
- No selling directly (no shop); focus on self-presentation.

## 3) Tech Stack (Chosen)
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (Radix-based)
- Framer Motion for UI/micro-interactions (+ optional GSAP only if needed)
- tRPC + React Query for typed API
- Prisma ORM + PostgreSQL
- Auth: NextAuth (Auth.js) with GitHub OAuth (preferred) or Credentials
- i18n: next-intl (App Router friendly)
- Deployment: Vercel

## 4) Quality Bar
This is a “top-tier” portfolio. Every feature must be:
- Polished UI/UX
- Responsive (mobile-first)
- Accessible (WCAG-minded, keyboard navigable)
- Performant (Core Web Vitals)
- Maintainable (clear structure, types, minimal duplication)

## 5) Design System & UI Principles
- Use a consistent spacing scale, typography scale, and color tokens.
- Keep layouts clean: grid-based, generous whitespace.
- Cards: soft shadows, subtle borders, 2xl rounded corners.
- Motion: premium, subtle, intentional. No janky animations.
- Include support for `prefers-reduced-motion`.
- Dark mode is optional; if included, do it properly (tokens + contrast).

### Recommended UI sections (public)
- Hero with clear positioning + short tagline
- Featured projects (3–6)
- Services/skills (what you do + tools)
- Testimonials/clients (optional)
- Contact CTA + footer

## 6) Animation Guidelines
- Use Framer Motion for:
  - Page transitions (subtle)
  - Microinteractions (hover, button feedback, card reveal)
  - Section entrance animations (on viewport)
- Avoid over-animating everything.
- Respect `prefers-reduced-motion`:
  - disable heavy transitions
  - fallback to minimal fades
- Keep animation durations consistent (e.g., 0.2–0.6s).

## 7) Accessibility & UX
- All interactive elements must be keyboard accessible.
- Visible focus states.
- Labels for inputs, aria attributes where needed.
- Form validation messages clear & localized.
- Images have alt text (localized where relevant).
- Headings hierarchy correct (H1 once per page).

## 8) Performance Rules
- Use `next/image` for all images.
- Use modern formats where possible (WebP/AVIF).
- Avoid heavy client components; keep content pages mostly server-rendered.
- Load animations and large libraries only where needed.
- Prefer server components + server data fetching when possible.
- Use caching strategies for public data (revalidate where appropriate).

## 9) Security Rules
- Admin routes must be protected server-side (not only client checks).
- Never expose secrets to the client (no `NEXT_PUBLIC_*` for server secrets).
- Validate all inputs on the server using Zod schemas.
- Rate-limit contact endpoint (basic approach acceptable).
- Upload endpoints must require auth (admin-only).

## 10) Data Model (Prisma)
A minimal recommended schema:

### Project
- id (cuid)
- slug (unique)
- status: DRAFT | PUBLISHED
- featured (bool)
- coverImageUrl
- gallery (optional: separate table or JSON)
- techStack (string[] or relation)
- links: liveUrl, repoUrl, caseStudyUrl (optional)
- createdAt, updatedAt, publishedAt (optional)

### ProjectTranslation
- id
- projectId (FK)
- locale: "cs" | "en"
- title
- tagline (optional)
- descriptionShort (optional)
- descriptionLong (markdown/MDX optional)
- role (optional)
- highlights (string[] optional)

Prefer relations over duplicated columns if content grows.
Keep slug stable across locales.

## 11) Content Format
- Descriptions: allow markdown (recommended). If using MDX, keep it safe and simple.
- Keep project pages structured:
  - Problem → Solution → Outcome → Tech → Screenshots

## 12) i18n Rules (next-intl)
- Routing with locales `/cs` and `/en` (or default locale without prefix if desired, but be consistent).
- UI strings come from translation files (no hardcoded strings).
- Project content translations come from DB via ProjectTranslation.
- Language switcher must preserve current route if possible.

Recommended structure:
- `src/messages/cs.json`
- `src/messages/en.json`

## 13) Admin UX Requirements
- Admin UI must be fast and clean, not an afterthought.
- CRUD forms:
  - Real-time validation (client) + final validation (server)
  - Localized fields grouped per language tab (CS/EN)
  - Image upload with preview
- Provide clear success/error toasts.
- Make it hard to accidentally delete (confirm modal).

## 14) Contact Form
- Fields: name, email, message (+ optional company)
- Server endpoint:
  - Zod validation
  - spam protection: basic honeypot + rate limiting
  - deliver via email provider (e.g., Resend) or SMTP
- Show localized success confirmation.
- Optional: store submissions in DB.

## 15) Project Structure & Conventions
### Directories
- `src/app` — routes & layouts (App Router)
- `src/components` — UI components
- `src/components/sections` — page sections (Hero, FeaturedProjects, etc.)
- `src/components/admin` — admin-specific components
- `src/server` — server-only code (db, auth, trpc)
- `src/lib` — utilities (formatting, constants)
- `src/messages` — translation JSON

### Code style
- TypeScript strict mode (prefer).
- No `any` unless justified; use Zod inferred types.
- Prefer named exports for reusable utilities; default export for pages/components if needed.
- Keep components small; split by responsibility.

### Naming
- Components: `PascalCase`
- Files: `kebab-case` for routes, `PascalCase` for React components (or consistent convention, but pick one).
- Server modules: `camelCase` filenames are fine; consistency > preference.

## 16) tRPC Guidelines
- All mutations and queries must:
  - validate input with Zod
  - enforce auth where needed
- Separate routers:
  - `public` (published projects)
  - `admin` (full CRUD, requires auth)

Use React Query for caching and optimistic updates where useful.

## 17) Auth Guidelines (NextAuth)
Preferred: GitHub OAuth with allowlist of admin account(s).
- Only specific GitHub user(s)/email(s) can access admin.
- Session strategy: JWT is fine for Vercel.
- Protect admin routes on the server:
  - in route handlers / server actions / middleware checks

## 18) Testing (Optional but recommended)
- Minimal:
  - unit tests for critical utils (slugify, locale routing)
  - basic integration test for contact endpoint
- E2E optional later (Playwright)

## 19) Deployment Notes (Vercel)
- Use environment variables for DB and Auth secrets.
- Ensure Prisma is compatible with serverless:
  - use Prisma recommended settings for serverless.
- Use a managed Postgres (Neon/Supabase).
- For media:
  - Prefer Vercel Blob / UploadThing / Cloudinary.
  - Do not store user uploads on local filesystem.

## 20) Definition of Done (DoD)
A feature is done when:
- Works on mobile + desktop
- Localized strings are complete (cs/en)
- Accessible and keyboard-friendly
- Types and validations correct
- No console errors
- `pnpm lint` and `pnpm build` pass
- UI looks polished (spacing, typography, motion)

## 21) “Codex Prompt Footer” (must be appended to every Codex prompt)
Always append this to your prompt:

---
NOTE FOR CODEX:
Follow the project rules in `/development.md` (single source of truth). Keep changes minimal, clean, and production-ready. Validate types, i18n, accessibility, and security.
---
