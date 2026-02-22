import Link from "next/link";

export default function RootNotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-6 py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Stránka nebyla nalezena.
        </h1>
        <p className="text-muted-foreground">
          Zkuste pokračovat na hlavní stránku portfolia.
        </p>
        <Link
          href="/cs"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Přejít na homepage
        </Link>
      </div>
    </main>
  );
}
