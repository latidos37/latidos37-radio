import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería — LATIDOS37 · Archivo visual underground" },
      { name: "description", content: "Mural editorial de Latidos37: posts, reels, flyers y archivo visual de cultura musical underground sincronizados desde Instagram." },
      { property: "og:title", content: "Galería visual — LATIDOS37" },
      { property: "og:description", content: "Exposición digital del programa de radio Latidos37." },
    ],
  }),
  component: GaleriaPage,
});

const INSTAGRAM_URL = "https://www.instagram.com/latidos37/";
const BEHOLD_FEED_ID = import.meta.env.VITE_BEHOLD_FEED_ID as string | undefined;

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

// Editorial archive — asymmetric layout pieces with metadata
type Item = {
  c: string;
  t: string;
  n: string;
  kind: "post" | "reel" | "flyer" | "archive";
  date: string;
  caption: string;
  // grid spans (mobile / md / lg)
  span: string;
  ratio: string;
};

const ARCHIVE: Item[] = [
  { n: "01", t: "ON AIR", kind: "post",    date: "08·05·26", caption: "Cabina abierta. Frecuencia 37.", c: "from-blood via-blood to-ink",        span: "col-span-2 md:col-span-4 lg:col-span-6 row-span-2", ratio: "aspect-[16/10]" },
  { n: "02", t: "ISALIVE", kind: "reel",   date: "06·05·26", caption: "Sesión colaborativa con Isalive.", c: "from-orange-hot via-blood to-magenta", span: "col-span-2 md:col-span-2 lg:col-span-3 row-span-2", ratio: "aspect-[3/4]" },
  { n: "03", t: "FLYER",  kind: "flyer",   date: "04·05·26", caption: "Cartel temporada 8.",            c: "from-cream via-orange-hot to-blood",  span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1", ratio: "aspect-square" },
  { n: "04", t: "VINILO", kind: "archive", date: "02·05·26", caption: "Selecta del archivo sonoro.",   c: "from-ink via-ink to-blood",           span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1", ratio: "aspect-square" },
  { n: "05", t: "RAVE",   kind: "post",    date: "29·04·26", caption: "Madrugada en directo.",         c: "from-magenta via-blood to-ink",       span: "col-span-2 md:col-span-3 lg:col-span-4 row-span-2", ratio: "aspect-[4/5]" },
  { n: "06", t: "STUDIO", kind: "post",    date: "27·04·26", caption: "Backstage, mesa de mezclas.",   c: "from-yellow-hot via-orange-hot to-blood", span: "col-span-2 md:col-span-3 lg:col-span-5 row-span-1", ratio: "aspect-[16/9]" },
  { n: "07", t: "ARCHIVE",kind: "archive", date: "22·04·26", caption: "Hemeroteca cultural.",          c: "from-cream to-ink",                   span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1", ratio: "aspect-square" },
  { n: "08", t: "REEL",   kind: "reel",    date: "20·04·26", caption: "Mini set en cabina.",           c: "from-blood via-magenta to-ink",       span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-2", ratio: "aspect-[9/16]" },
  { n: "09", t: "POSTER", kind: "flyer",   date: "18·04·26", caption: "Cartelería constructivista.",   c: "from-blood to-orange-hot",            span: "col-span-2 md:col-span-3 lg:col-span-3 row-span-1", ratio: "aspect-[4/3]" },
  { n: "10", t: "LIVE",   kind: "post",    date: "14·04·26", caption: "Banda invitada en directo.",    c: "from-orange-hot via-magenta to-ink",  span: "col-span-2 md:col-span-3 lg:col-span-6 row-span-2", ratio: "aspect-[16/10]" },
  { n: "11", t: "TAPE",   kind: "archive", date: "10·04·26", caption: "Cassette mix #037.",            c: "from-ink to-magenta",                 span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1", ratio: "aspect-square" },
  { n: "12", t: "NIGHT",  kind: "reel",    date: "05·04·26", caption: "Nocturna underground.",         c: "from-magenta via-ink to-blood",       span: "col-span-1 md:col-span-2 lg:col-span-3 row-span-2", ratio: "aspect-[9/16]" },
];

const TYPO_BLOCKS = ["LATIDOS37", "ISALIVE", "RADIO CULTURE", "SONIC ARCHIVE", "LIVE VISUALS", "UNDERGROUND FREQUENCIES"];

// Reveal-on-scroll hook
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      },
      { rootMargin: "-8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return { ref, seen };
}

function GaleriaPage() {
  const enabled = Boolean(BEHOLD_FEED_ID);
  useBeholdScript(enabled);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? 0 : (i + 1) % ARCHIVE.length)), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? 0 : (i - 1 + ARCHIVE.length) % ARCHIVE.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  return (
    <>
      {/* ───── HERO EDITORIAL ───── */}
      <header className="relative bg-ink text-cream overflow-hidden border-b-4 border-cream">
        <div className="grain absolute inset-0 opacity-70" />
        <div
          className="absolute -right-20 top-10 w-[28rem] h-[28rem] bg-blood rounded-full blur-[120px] opacity-40"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute -left-24 bottom-0 w-[32rem] h-[32rem] bg-orange-hot rounded-full blur-[140px] opacity-25"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div className="absolute inset-y-0 left-1/3 w-px bg-cream/10 rotate-[8deg] origin-top" />
        <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.4em] text-cream/50">
          Vol·037 / archivo visual
        </div>

        <div className="relative px-4 md:px-10 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="block w-10 md:w-20 h-px bg-blood" />
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-orange-hot">
              ★ Mural visual {enabled ? "· en vivo" : "· editorial"}
            </p>
          </div>
          <h1 className="font-display text-[22vw] md:text-[12rem] lg:text-[15rem] leading-[0.78] mix-blend-difference">
            GALE<br />
            <span className="text-orange-hot">RÍA</span>
            <span className="text-blood">.</span>
          </h1>
          <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl">
            <p className="md:col-span-2 text-base md:text-xl text-cream/85 leading-relaxed">
              Un archivo visual del programa: posts, reels, flyers y momentos de cabina.
              Una <em className="text-orange-hot not-italic">exposición digital</em> que respira al ritmo de la radio.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="self-end inline-block bg-cream text-ink px-6 py-4 font-display uppercase tracking-wider text-sm hover:bg-orange-hot hover:text-ink transition-colors border-4 border-cream hover:border-orange-hot"
            >
              @latidos37 →
            </a>
          </div>
        </div>
        <div className="diag-stripes-cream h-2 opacity-40" />
      </header>

      {/* ───── BEHOLD WIDGET (live) or EDITORIAL ARCHIVE (fallback) ───── */}
      {enabled ? (
        <section className="relative bg-ink px-4 md:px-10 py-16">
          <div className="grain absolute inset-0 opacity-30 pointer-events-none" />
          {(() => {
            const Tag = "behold-widget" as unknown as "div";
            return <Tag {...({ "feed-id": BEHOLD_FEED_ID } as React.HTMLAttributes<HTMLElement>)} />;
          })()}
          <p className="mt-12 text-center text-xs font-mono uppercase tracking-widest text-cream/50">
            ★ Sincronizado automáticamente con @latidos37
          </p>
        </section>
      ) : (
        <EditorialArchive onOpen={setLightbox} />
      )}

      {/* ───── PREMIUM LIGHTBOX ───── */}
      {lightbox !== null && (
        <Lightbox
          item={ARCHIVE[lightbox]}
          index={lightbox}
          total={ARCHIVE.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}

/* ────────────────────────────────────────────── */

function EditorialArchive({ onOpen }: { onOpen: (i: number) => void }) {
  // Split items into editorial sections divided by giant typographic blocks
  const sections = [
    { title: TYPO_BLOCKS[0], sub: "Frecuencia · 37 mhz", items: ARCHIVE.slice(0, 4) },
    { title: TYPO_BLOCKS[2], sub: "Archivo · primavera 26", items: ARCHIVE.slice(4, 8) },
    { title: TYPO_BLOCKS[3], sub: "Underground · sin filtro", items: ARCHIVE.slice(8, 12) },
  ];

  return (
    <section className="relative bg-ink">
      <div className="grain absolute inset-0 opacity-30 pointer-events-none" />

      {/* Notice */}
      {!import.meta.env.VITE_BEHOLD_FEED_ID && (
        <div className="relative mx-4 md:mx-10 mt-10 mb-4 border-l-4 border-blood pl-4 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-blood">
            Mural editorial · demostración
          </p>
          <p className="mt-2 text-cream/70 text-sm">
            Sincroniza el feed real configurando{" "}
            <code className="bg-blood/20 px-1 text-orange-hot">VITE_BEHOLD_FEED_ID</code>{" "}
            tras crear un feed gratuito en{" "}
            <a href="https://behold.so" target="_blank" rel="noreferrer" className="underline text-orange-hot">behold.so</a>.
          </p>
        </div>
      )}

      {sections.map((sec, si) => (
        <div key={si} className="relative">
          <TypoDivider title={sec.title} sub={sec.sub} index={si} />
          <div className="px-4 md:px-10 pb-16">
            <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 auto-rows-[120px] md:auto-rows-[160px] gap-3 md:gap-4">
              {sec.items.map((it) => {
                const realIndex = ARCHIVE.indexOf(it);
                return (
                  <ArchiveTile key={it.n} item={it} index={realIndex} onOpen={() => onOpen(realIndex)} />
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Closing manifesto */}
      <div className="relative px-4 md:px-10 py-24 border-t-4 border-cream/10">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-hot mb-4">★ manifiesto visual</p>
          <p className="font-display text-3xl md:text-6xl leading-[0.95] text-cream">
            La radio se <span className="text-blood">ve</span>.
            <br />
            La cultura se <span className="text-orange-hot">archiva</span>.
            <br />
            <span className="text-stroke">Latidos37</span> se vive.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-10 bg-blood text-cream px-8 py-4 font-display uppercase tracking-wider hover:bg-orange-hot hover:text-ink transition-colors"
          >
            Seguir el archivo en vivo →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────── */

function TypoDivider({ title, sub, index }: { title: string; sub: string; index: number }) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`relative px-4 md:px-10 py-12 md:py-20 overflow-hidden transition-all duration-1000 ${
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${index % 2 === 0 ? "bg-ink" : "bg-blood text-cream"}`}
    >
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 diag-stripes-cream opacity-30" />
      <div className="flex items-baseline gap-4 mb-2">
        <span className={`block w-8 md:w-16 h-px ${index % 2 === 0 ? "bg-orange-hot" : "bg-cream"}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-70">{sub}</span>
      </div>
      <h2 className="font-display text-[12vw] md:text-[7rem] lg:text-[9rem] leading-[0.82] tracking-tighter">
        {title}
      </h2>
    </div>
  );
}

/* ────────────────────────────────────────────── */

function ArchiveTile({ item, onOpen }: { item: Item; index: number; onOpen: () => void }) {
  const { ref, seen } = useReveal<HTMLButtonElement>();
  const kindLabel = item.kind === "reel" ? "▶ REEL" : item.kind === "flyer" ? "✦ FLYER" : item.kind === "archive" ? "◷ ARCHIVE" : "● POST";

  return (
    <button
      ref={ref}
      onClick={onOpen}
      className={`group relative overflow-hidden bg-gradient-to-br ${item.c} ${item.span}
        border border-cream/10 cursor-zoom-in
        transition-all duration-700 ease-out
        ${seen ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"}`}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Texture */}
      <div className="absolute inset-0 grain opacity-70" />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 via-transparent to-transparent" />

      {/* Slow zoom on hover */}
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-110">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-cream text-5xl md:text-7xl lg:text-8xl mix-blend-difference opacity-90 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            #{item.n}
          </span>
        </div>
      </div>

      {/* Top metadata strip */}
      <div className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center justify-between text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-cream/80">
        <span className="bg-ink/60 backdrop-blur-sm px-2 py-1">{kindLabel}</span>
        <span className="bg-ink/60 backdrop-blur-sm px-2 py-1">{item.date}</span>
      </div>

      {/* Hover overlay — title appears */}
      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/80 transition-colors duration-500 flex flex-col items-start justify-end p-4 md:p-6">
        <span className="block w-10 h-px bg-orange-hot opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-3" />
        <span className="font-display text-cream text-xl md:text-3xl lg:text-4xl leading-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {item.t}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
          Abrir →
        </span>
      </div>

      {/* Constructivist corner brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-cream/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-cream/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Cinematic light sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-cream/15 to-transparent skew-x-12 group-hover:translate-x-[400%] transition-transform duration-[1400ms] ease-out" />
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────── */

function Lightbox({
  item, index, total, onClose, onNext, onPrev,
}: { item: Item; index: number; total: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/97 backdrop-blur-md flex flex-col animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="grain absolute inset-0 opacity-30 pointer-events-none" />

      {/* Top bar — exhibition style */}
      <div className="relative flex items-center justify-between px-4 md:px-10 py-5 border-b border-cream/10 text-cream font-mono text-[10px] uppercase tracking-[0.4em]">
        <span>★ Latidos37 / archivo</span>
        <span className="hidden md:block">{item.kind} · {item.date}</span>
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-cream font-display text-2xl hover:text-blood transition-colors"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      {/* Main stage */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 py-8" onClick={(e) => e.stopPropagation()}>
        {/* Prev */}
        <button
          onClick={onPrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center text-cream border border-cream/30 hover:bg-cream hover:text-ink transition-all duration-300 font-display text-2xl z-10"
          aria-label="Anterior"
        >
          ←
        </button>

        {/* The "artwork" */}
        <figure className="relative w-full max-w-3xl flex flex-col items-center animate-in zoom-in-95 fade-in duration-500">
          <div
            className={`relative w-full ${item.ratio} max-h-[68vh] bg-gradient-to-br ${item.c}
              border-4 border-cream shadow-[18px_18px_0_var(--blood)]`}
          >
            <div className="absolute inset-0 grain opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cream/80">
                Latidos37 · #{item.n}
              </span>
              <span className="mt-3 font-display text-cream text-5xl md:text-7xl lg:text-8xl mix-blend-difference leading-none">
                {item.t}
              </span>
            </div>
            {/* corner brackets */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-orange-hot" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-orange-hot" />
          </div>

          <figcaption className="mt-6 w-full max-w-3xl flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-cream">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-hot">
                {item.kind} · {item.date}
              </p>
              <p className="mt-2 font-display text-2xl md:text-3xl">{item.t}</p>
              <p className="text-cream/70 text-sm mt-1 max-w-md">{item.caption}</p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="self-start md:self-end bg-cream text-ink px-5 py-3 font-display uppercase text-sm hover:bg-orange-hot transition-colors"
            >
              Ver en Instagram →
            </a>
          </figcaption>
        </figure>

        {/* Next */}
        <button
          onClick={onNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center text-cream border border-cream/30 hover:bg-cream hover:text-ink transition-all duration-300 font-display text-2xl z-10"
          aria-label="Siguiente"
        >
          →
        </button>

        {/* Mobile nav */}
        <div className="md:hidden absolute bottom-4 inset-x-0 flex justify-center gap-3">
          <button onClick={onPrev} className="px-5 py-2 border border-cream/30 text-cream font-display">←</button>
          <button onClick={onNext} className="px-5 py-2 border border-cream/30 text-cream font-display">→</button>
        </div>
      </div>
    </div>
  );
}
