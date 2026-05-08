import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Radar Cultural — LATIDOS37 · Noticias musicales indie" },
      { name: "description", content: "Reseñas, entrevistas, agenda cultural y novedades de la escena indie y underground española." },
      { property: "og:title", content: "Radar Cultural — LATIDOS37" },
    ],
  }),
  component: NoticiasPage,
});

const ARTICLES = [
  {
    tag: "Reseña",
    color: "bg-blood text-cream",
    title: "El renacer del indie ibérico: 12 discos que están redefiniendo 2026",
    author: "Jose Martín",
    date: "07 May 2026",
    excerpt: "Una temporada en la que Triángulo de Amor Bizarro, Linda Guilala y Apartamentos Acapulco han marcado el ritmo. Pero hay mucho más bajo la superficie.",
    big: true,
  },
  {
    tag: "Entrevista",
    color: "bg-orange-hot text-ink",
    title: "Apartamentos Acapulco · Santos Mártires y la liturgia del pop",
    author: "David",
    date: "29 Abr 2026",
    excerpt: "La banda nos abre el cuaderno de su próximo trabajo y habla de raíces, de furia y de melodía.",
  },
  {
    tag: "Festival",
    color: "bg-yellow-hot text-ink",
    title: "BlackSoundFest: la batalla de bandas que está cocinando Granada",
    author: "Latidos37",
    date: "22 Abr 2026",
    excerpt: "Una nueva escena se fragua desde el sur. Audiciones, conciertos y mucho ruido del bueno.",
  },
  {
    tag: "Agenda",
    color: "bg-cream text-ink",
    title: "Get Back Music Doc Fest: el cine documental musical también late",
    author: "Sandra Ruesna",
    date: "26 Mar 2026",
    excerpt: "Un festival imprescindible para quienes creen que el videoclip y el documental musical también son arte mayor.",
  },
  {
    tag: "Isalive",
    color: "bg-magenta text-cream",
    title: "Flores para Antonio: el documental que se llevó el Goya",
    author: "Jose Martín",
    date: "22 Abr 2026",
    excerpt: "Isaki Lacuesta firma una obra íntima sobre Antonio Flores. Repasamos la banda sonora y su impacto.",
  },
  {
    tag: "Novedades",
    color: "bg-ink text-cream border-2 border-cream",
    title: "Estela Gris, Sanisidro y Kokoshca: tres nombres para no perder de vista",
    author: "David",
    date: "08 Abr 2026",
    excerpt: "Post-punk murciano, embrujo flamenco mediterráneo y adoctrinamiento melódico. Una semana redonda.",
  },
];

function NoticiasPage() {
  const [hero, ...rest] = ARTICLES;
  return (
    <>
      <header className="relative overflow-hidden border-b-4 border-cream">
        <div className="absolute inset-0 diag-stripes opacity-30" />
        <div className="relative px-4 md:px-10 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-blood mb-4">★ Magazine cultural</p>
          <h1 className="font-display text-[18vw] md:text-[10rem] leading-[0.82]">
            Radar<br />
            <span className="text-blood">Cultural</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Reseñas, entrevistas, agenda y novedades de la escena indie española.
            Lo que se cuece bajo el radar — y lo que merece atención.
          </p>
        </div>
      </header>

      <section className="px-4 md:px-10 py-12">
        {/* Featured */}
        <article className="hover-lift grid md:grid-cols-2 border-4 border-cream mb-12">
          <div className={`${hero.color} p-8 md:p-12 flex flex-col justify-between min-h-[360px]`}>
            <span className="font-mono text-xs uppercase tracking-widest bg-ink text-cream px-2 py-1 self-start">
              {hero.tag}
            </span>
            <div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.9] mb-4">{hero.title}</h2>
              <p className="text-base">{hero.excerpt}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-70">
                {hero.author} · {hero.date}
              </p>
            </div>
          </div>
          <div className="relative bg-ink min-h-[260px]">
            <div className="absolute inset-0 noise-bg" />
            <div className="absolute inset-0 grain" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[20vw] md:text-[12rem] text-blood mix-blend-screen">37</span>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((a, i) => (
            <article
              key={i}
              className={`hover-lift ${a.color} p-6 min-h-[280px] flex flex-col justify-between ${i % 2 ? "rotate-[0.4deg]" : "rotate-[-0.4deg]"}`}
            >
              <span className="font-mono text-xs uppercase tracking-widest bg-ink text-cream px-2 py-1 self-start">
                {a.tag}
              </span>
              <div>
                <h3 className="font-display text-2xl leading-tight mb-3">{a.title}</h3>
                <p className="text-sm">{a.excerpt}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-70">
                  {a.author} · {a.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
