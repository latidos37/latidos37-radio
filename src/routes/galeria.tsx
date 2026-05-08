import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — LATIDOS37 · Mural visual de Instagram" },
      { name: "description", content: "Mosaico visual del programa Latidos37: posts, reels y momentos del estudio." },
      { property: "og:title", content: "Galería visual — LATIDOS37" },
    ],
  }),
  component: GaleriaPage,
});

const GRID = [
  { c: "from-blood to-ink", t: "On Air" },
  { c: "from-orange-hot to-blood", t: "Sesión 8x23" },
  { c: "from-cream to-orange-hot", t: "Isalive" },
  { c: "from-magenta to-blood", t: "Estudio" },
  { c: "from-yellow-hot to-orange-hot", t: "Backstage" },
  { c: "from-blood to-magenta", t: "Festival" },
  { c: "from-ink to-blood", t: "Vinilos" },
  { c: "from-cream to-magenta", t: "Reel" },
  { c: "from-blood to-orange-hot", t: "Banda" },
  { c: "from-magenta to-yellow-hot", t: "Live" },
  { c: "from-orange-hot to-ink", t: "Cabina" },
  { c: "from-cream to-blood", t: "Poster" },
];

function GaleriaPage() {
  return (
    <>
      <header className="relative bg-ink text-cream overflow-hidden border-b-4 border-cream">
        <div className="absolute -right-10 top-10 w-72 h-72 bg-blood rounded-full blur-3xl opacity-30" />
        <div className="absolute -left-10 bottom-0 w-96 h-96 bg-orange-hot rounded-full blur-3xl opacity-20" />
        <div className="relative px-4 md:px-10 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-hot mb-4">★ Mural visual</p>
          <h1 className="font-display text-[18vw] md:text-[10rem] leading-[0.82]">
            Gale<br />
            <span className="text-orange-hot">ría</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Una pared digital con lo que pasa dentro y fuera del estudio. Sigue la cuenta para
            que esto siga latiendo.
          </p>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-cream text-ink px-6 py-3 font-display uppercase tracking-wider hover:bg-orange-hot transition-colors"
          >
            @latidos37 →
          </a>
        </div>
      </header>

      <section className="px-4 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {GRID.map((g, i) => (
            <a
              key={i}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className={`group relative aspect-square overflow-hidden bg-gradient-to-br ${g.c} border-2 border-cream/10 hover-lift`}
            >
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-cream text-3xl md:text-5xl mix-blend-difference">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-colors flex items-end p-4">
                <span className="font-display text-cream text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.t} →
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs font-mono uppercase tracking-widest text-cream/50">
          ★ Mosaico de muestra · Conecta tu API de Instagram para sincronización automática
        </p>
      </section>
    </>
  );
}
