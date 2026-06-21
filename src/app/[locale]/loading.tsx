import Container from "@/components/layout/Container";

export default function LocaleLoading() {
  return (
    <section className="py-20 sm:py-28" aria-busy="true">
      <Container>
        <div className="max-w-2xl space-y-4">
          <div className="h-9 w-56 rounded-xl bg-muted/70" />
          <div className="h-5 w-full max-w-xl rounded-lg bg-muted/60" />
          <div className="h-5 w-4/5 rounded-lg bg-muted/50" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm"
            >
              <div className="aspect-[16/10] bg-muted/60" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 rounded-lg bg-muted/70" />
                <div className="h-4 w-full rounded-lg bg-muted/50" />
                <div className="h-4 w-3/4 rounded-lg bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
