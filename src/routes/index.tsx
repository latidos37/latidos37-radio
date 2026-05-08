import { createFileRoute, Link } from "@tanstack/react-router";
import { getEpisodes, type Episode } from "@/lib/ivoox.functions";
import { HeroPlayer } from "@/components/HeroPlayer";
import { EpisodeCard } from "@/components/EpisodeCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LATIDOS37 — Radio musical alternativa · Podcast indie español" },
      { name: "description", content: "Música indie, escena underground, novedades, entrevistas y sesiones especiales. Podcast cultural en Onda Local de Andalucía, ScannerFM y Onda Wantuki." },
      { property: "og:title", content: "LATIDOS37 — Radio · Podcast · Cultura" },
      { property: "og:description", content: "El último episodio en directo + archivo completo del podcast." },
    ],
  }),
  loader: () => getEpisodes(),
  component: Home,
});

const NEWS = [
  {
    tag: "Novedades",
    title: "El renacer del indie ibérico: 12 discos que están redefiniendo 2026",
    excerpt: "De Triángulo de Amor Bizarro a Linda Guilala. Una temporada que no da tregua.",
    color: "bg-blood",
  },
  {
    tag: "Entrevista",
    title: "Apartamentos Acapulco · Santos Mártires y la liturgia del pop",
    excerpt: "Hablamos con la banda sobre su próximo disco, las raíces y la furia melódica.",
    color: "bg-orange-hot",
  },
  {
    tag: "Festival",
    title: "BlackSoundFest: la batalla de bandas que está cocinando Granada",
    excerpt: "Javi nos cuenta cómo se está fraguando una nueva escena desde el sur.",
    color: "bg-yellow-hot",
  },
];

const GALLERY_PLACEHOLDERS = [
  "from-blood to-ink",
  "from-orange-hot to-blood",
  "from-cream to-orange-hot",
  "from-magenta to-blood",
  "from-yellow-hot to-orange-hot",
  "from-blood to-magenta",
  "from-ink to-blood",
  "from-cream to-magenta",
];

function Home() {
  const { episodes, error } = Route.useLoaderData();
  const latest = episodes[0];
  const recent = episodes.slice(1, 9);

  return (
    <>
      {/* HERO */}
      <section className="relative noise-bg overflow-hidden border-b-4 border-cream">
        <div className="grain absolute inset-0" />

        {/* Diagonal red slab */}
        <div className="absolute -left-20 top-10 w-[60%] h-40 bg-blood -rotate-6 opacity-95" />
        <div className="absolute right-0 top-0 w-32 md:w-48 h-full diag-stripes opacity-60" />

        <div className="relative px-4 md:px-10 pt-14 md:pt-24 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] bg-cream text-ink px-3 py-1">
              ★ Frecuencia 37 · Onda Local
            </span>
            <span className="hidden md:inline font-mono text-xs uppercase tracking-widest text-cream/70">
              Música · Cultura · Isalive · Novedades
            </span>
          </div>

          <h1 className="font-display text-cream leading-[0.78] text-[22vw] md:text-[14rem]">
            <span className="block">LATI</span>
            <span className="block text-blood -mt-2 md:-mt-6">
              DOS
              <span className="text-stroke ml-2 md:ml-6" style={{ WebkitTextStroke: "3px var(--cream)" }}>
                37
              </span>
            </span>
          </h1>

          <div className="mt-6 md:mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-end">
            <p className="max-w-2xl text-base md:text-lg text-cream/85 leading-relaxed">
              Programa de radio y podcast musical alternativo. Novedades indie, entrevistas,
              sesiones especiales y la cápsula <span className="text-blood font-bold">Isalive</span>.
              Todo lo que late fuera del mainstream.
            </p>
            <div className="flex gap-2">
              <Link
                to="/programas"
                className="bg-blood text-cream px-6 py-4 font-display uppercase tracking-wider hover:bg-cream hover:text-ink transition-colors"
              >
                Escuchar todos →
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="bg-blood text-cream py-3 border-y-2 border-cream overflow-hidden">
          <div className="marquee whitespace-nowrap font-display text-2xl md:text-4xl uppercase">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12 px-6">
                <span>★ Indie español</span>
                <span>● Novedades semanales</span>
                <span>★ Sesiones especiales</span>
                <span>● Isalive</span>
                <span>★ Onda Local de Andalucía</span>
                <span>● ScannerFM</span>
                <span>★ Onda Wantuki</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAYER */}
      {latest ? (
        <section className="px-0">
          <HeroPlayer ep={latest} />
        </section>
      ) : (
        <section className="px-6 py-10 bg-cream text-ink">
          <p className="font-display text-xl">
            {error ? `No pudimos cargar el feed: ${error}` : "Cargando episodio…"}
          </p>
        </section>
      )}

      {/* LATEST PROGRAMS */}
      <section className="relative px-4 md:px-10 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 border-b-2 border-cream/30 pb-4">
          <h2 className="font-display text-5xl md:text-8xl">
            Últimos <span className="text-blood">programas</span>
          </h2>
          <Link to="/programas" className="font-mono uppercase text-sm tracking-widest hover:text-blood">
            Archivo completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {recent.map((ep, i) => (
            <EpisodeCard key={ep.id} ep={ep} index={i} />
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className="relative bg-cream text-ink clip-diagonal-rev">
        <div className="grain absolute inset-0 opacity-30" />
        <div className="relative px-4 md:px-10 py-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-3 h-3 rounded-full bg-blood animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.4em]">Radar Cultural</span>
          </div>
          <h2 className="font-display text-5xl md:text-8xl mb-12 leading-[0.85]">
            Noticias<br />
            <span className="text-blood">musicales</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((n, i) => (
              <article
                key={i}
                className={`hover-lift relative p-6 border-2 border-ink ${n.color} text-ink min-h-[260px] flex flex-col justify-between`}
              >
                <span className="font-mono text-xs uppercase tracking-widest bg-ink text-cream px-2 py-1 self-start">
                  {n.tag}
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-tight mb-2">{n.title}</h3>
                  <p className="text-sm">{n.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            to="/noticias"
            className="inline-block mt-10 bg-ink text-cream px-6 py-4 font-display uppercase tracking-wider hover:bg-blood transition-colors"
          >
            Leer el Radar →
          </Link>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative px-4 md:px-10 py-24 overflow-hidden">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-display text-5xl md:text-8xl">
            Galería <span className="text-orange-hot">visual</span>
          </h2>
          <Link to="/galeria" className="font-mono uppercase text-sm tracking-widest hover:text-orange-hot">
            Ver Instagram →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY_PLACEHOLDERS.map((g, i) => (
            <div
              key={i}
              className={`aspect-square bg-gradient-to-br ${g} relative overflow-hidden hover-lift border-2 border-cream/10`}
            >
              <div className="absolute inset-0 grain" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-cream text-3xl mix-blend-difference">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
