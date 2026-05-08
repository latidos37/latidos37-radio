import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEpisodes, type Episode } from "@/lib/ivoox.functions";
import { EpisodeCard } from "@/components/EpisodeCard";

export const Route = createFileRoute("/programas/$slug")({
  loader: async ({ params }) => {
    const { episodes } = await getEpisodes();
    const ep = episodes.find((e) => e.slug === params.slug);
    if (!ep) throw notFound();
    const idx = episodes.findIndex((e) => e.id === ep.id);
    const related = episodes.filter((_, i) => i !== idx).slice(0, 4);
    return { ep, related };
  },
  head: ({ loaderData }) => {
    const ep = loaderData?.ep;
    if (!ep) return { meta: [{ title: "Episodio — LATIDOS37" }] };
    const desc = ep.description.replace(/<[^>]+>/g, "").slice(0, 160);
    return {
      meta: [
        { title: `${ep.title} — LATIDOS37` },
        { name: "description", content: desc },
        { property: "og:title", content: ep.title },
        { property: "og:description", content: desc },
        { property: "og:image", content: ep.image },
        { property: "og:type", content: "music.song" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-4 py-24 text-center">
      <h1 className="font-display text-6xl text-blood">Episodio no encontrado</h1>
      <Link to="/programas" className="inline-block mt-6 underline">← Volver al archivo</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-blood">Error</h1>
      <p className="mt-4 text-cream/70">{error.message}</p>
    </div>
  ),
  component: EpisodePage,
});

function EpisodePage() {
  const { ep, related } = Route.useLoaderData() as { ep: Episode; related: Episode[] };
  const date = new Date(ep.pubDate).toLocaleDateString("es-ES", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const shareUrl = `https://www.ivoox.com/podcast-latidos37_sq_f1426133_1.html`;

  return (
    <article>
      <header className="relative bg-cream text-ink overflow-hidden border-b-4 border-ink">
        <div className="grain absolute inset-0 opacity-40" />
        <div className="relative grid md:grid-cols-[1fr_360px] gap-8 px-4 md:px-10 py-12">
          <div>
            <Link to="/programas" className="font-mono text-xs uppercase tracking-widest text-blood hover:underline">
              ← Programas
            </Link>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest">{date} · {ep.duration}</p>
            <h1 className="mt-3 font-display text-4xl md:text-7xl leading-[0.85]">
              {ep.title.replace(/^Latidos37\|?\s*/i, "")}
            </h1>
            {ep.season && ep.episode && (
              <span className="inline-block mt-4 bg-blood text-cream font-display px-3 py-1">
                S{ep.season} · E{ep.episode}
              </span>
            )}
          </div>
          {ep.image && (
            <img
              src={ep.image}
              alt={ep.title}
              className="w-full max-w-sm justify-self-end aspect-square object-cover border-4 border-ink shadow-[10px_10px_0_var(--blood)]"
            />
          )}
        </div>
      </header>

      <section className="px-4 md:px-10 py-10 max-w-4xl">
        <div className="bg-card border-2 border-cream/15 p-4">
          <audio controls preload="metadata" src={ep.audio} className="w-full" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={ep.link}
            target="_blank"
            rel="noreferrer"
            className="bg-blood text-cream px-5 py-3 font-display uppercase text-sm hover:bg-cream hover:text-ink transition-colors"
          >
            Abrir en iVoox →
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(ep.title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noreferrer"
            className="border-2 border-cream/40 px-5 py-3 font-display uppercase text-sm hover:border-blood hover:text-blood"
          >
            Compartir
          </a>
        </div>

        <div className="mt-10 prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-cream/85 whitespace-pre-wrap">
            {ep.description.replace(/<[^>]+>/g, "")}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 md:px-10 py-16 border-t-2 border-cream/20">
          <h2 className="font-display text-4xl md:text-6xl mb-8">
            Más <span className="text-blood">latidos</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((r, i) => (
              <EpisodeCard key={r.id} ep={r} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
