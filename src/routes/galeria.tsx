import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — LATIDOS37 · Mural visual de Instagram" },
      { name: "description", content: "Mosaico visual del programa Latidos37: posts, reels y momentos del estudio sincronizados desde Instagram." },
      { property: "og:title", content: "Galería visual — LATIDOS37" },
      { property: "og:description", content: "Mural cultural en directo desde @latidos37." },
    ],
  }),
  component: GaleriaPage,
});

const INSTAGRAM_URL = "https://www.instagram.com/latidos37/";
// Configurable: set VITE_BEHOLD_FEED_ID in env to activate the live Instagram widget.
// Get one free at https://behold.so (no API token, no Meta app required).
const BEHOLD_FEED_ID = import.meta.env.VITE_BEHOLD_FEED_ID as string | undefined;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id"?: string },
        HTMLElement
      >;
    }
  }
}

function useBeholdScript(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (document.querySelector('script[data-behold="1"]')) return;
    const s = document.createElement("script");
    s.src = "https://w.behold.so/widget.js";
    s.type = "module";
    s.dataset.behold = "1";
    document.head.appendChild(s);
  }, [enabled]);
}

const FALLBACK = [
  { c: "from-blood to-ink", t: "On Air", n: "01" },
  { c: "from-orange-hot to-blood", t: "Sesión 8x23", n: "02" },
  { c: "from-cream to-orange-hot", t: "Isalive", n: "03" },
  { c: "from-magenta to-blood", t: "Estudio", n: "04" },
  { c: "from-yellow-hot to-orange-hot", t: "Backstage", n: "05" },
  { c: "from-blood to-magenta", t: "Festival", n: "06" },
  { c: "from-ink to-blood", t: "Vinilos", n: "07" },
  { c: "from-cream to-magenta", t: "Reel", n: "08" },
  { c: "from-blood to-orange-hot", t: "Banda", n: "09" },
  { c: "from-magenta to-yellow-hot", t: "Live", n: "10" },
  { c: "from-orange-hot to-ink", t: "Cabina", n: "11" },
  { c: "from-cream to-blood", t: "Poster", n: "12" },
];

function GaleriaPage() {
  const enabled = Boolean(BEHOLD_FEED_ID);
  useBeholdScript(enabled);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close lightbox with Escape
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <header className="relative bg-ink text-cream overflow-hidden border-b-4 border-cream">
        <div className="grain absolute inset-0 opacity-60" />
        <div className="absolute -right-10 top-10 w-72 h-72 bg-blood rounded-full blur-3xl opacity-30" />
        <div className="absolute -left-10 bottom-0 w-96 h-96 bg-orange-hot rounded-full blur-3xl opacity-20" />
        <div className="absolute inset-y-0 left-1/3 w-px bg-cream/10 rotate-[8deg] origin-top" />
        <div className="relative px-4 md:px-10 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-hot mb-4">
            ★ Mural visual {enabled ? "· en vivo" : "· @latidos37"}
          </p>
          <h1 className="font-display text-[18vw] md:text-[10rem] leading-[0.82]">
            Gale<br />
            <span className="text-orange-hot">ría</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Una pared digital con lo que pasa dentro y fuera del estudio. Posts, reels y momentos
            sincronizados desde Instagram.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-cream text-ink px-6 py-3 font-display uppercase tracking-wider hover:bg-orange-hot transition-colors"
          >
            @latidos37 →
          </a>
        </div>
        <div className="diag-stripes-cream h-2 opacity-40" />
      </header>

      <section className="relative px-4 md:px-10 py-12">
        {enabled ? (
          <div ref={ref} className="behold-wrap">
            {/* Behold renders the live Instagram grid here */}
            <behold-widget feed-id={BEHOLD_FEED_ID} />
            <p className="mt-8 text-center text-xs font-mono uppercase tracking-widest text-cream/50">
              ★ Sincronizado automáticamente con @latidos37
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 border-l-4 border-blood pl-4 max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-widest text-blood">
                Mural de demostración
              </p>
              <p className="mt-2 text-cream/80 text-sm">
                Para sincronizar las publicaciones reales, crea un feed gratuito en{" "}
                <a href="https://behold.so" target="_blank" rel="noreferrer" className="underline text-orange-hot">
                  behold.so
                </a>{" "}
                con la cuenta @latidos37 y guarda su ID como variable{" "}
                <code className="bg-blood/20 px-1">VITE_BEHOLD_FEED_ID</code>.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {FALLBACK.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`group relative aspect-square overflow-hidden bg-gradient-to-br ${g.c} border-2 border-cream/10 hover-lift cursor-zoom-in`}
                >
                  <div className="absolute inset-0 grain opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-cream text-3xl md:text-5xl mix-blend-difference transition-transform duration-500 group-hover:scale-110">
                      #{g.n}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/70 transition-colors duration-500 flex items-end p-4">
                    <span className="font-display text-cream text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {g.t} →
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cream/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cream/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Lightbox fullscreen */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="grain absolute inset-0 opacity-30 pointer-events-none" />
          <button
            className="absolute top-4 right-4 text-cream font-display text-3xl hover:text-blood"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div
            className={`relative w-full max-w-2xl aspect-square bg-gradient-to-br ${FALLBACK[lightbox].c} border-4 border-cream shadow-[14px_14px_0_var(--blood)]`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 grain opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-cream/80">
                Latidos37 · #{FALLBACK[lightbox].n}
              </span>
              <span className="mt-3 font-display text-cream text-5xl md:text-7xl mix-blend-difference">
                {FALLBACK[lightbox].t}
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 bg-cream text-ink px-5 py-2 font-display uppercase text-sm hover:bg-orange-hot transition-colors"
              >
                Ver en Instagram →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
