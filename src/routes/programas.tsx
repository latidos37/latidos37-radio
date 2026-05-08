import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getEpisodes, type Episode } from "@/lib/ivoox.functions";
import { EpisodeCard } from "@/components/EpisodeCard";

export const Route = createFileRoute("/programas")({
  head: () => ({
    meta: [
      { title: "Programas — LATIDOS37 · Archivo completo del podcast" },
      { name: "description", content: "Todos los episodios de Latidos37: novedades indie, entrevistas, sesiones especiales e Isalive. Búsqueda y archivo completo." },
      { property: "og:title", content: "Programas — LATIDOS37" },
    ],
  }),
  loader: () => getEpisodes(),
  component: ProgramasPage,
});

const PAGE_SIZE = 12;

function ProgramasPage() {
  const { episodes, error } = Route.useLoaderData() as { episodes: Episode[]; error: string | null };
  const [q, setQ] = useState("");
  const [season, setSeason] = useState<string>("all");
  const [count, setCount] = useState(PAGE_SIZE);

  const seasons = useMemo(
    () => Array.from(new Set(episodes.map((e) => e.season).filter(Boolean))).sort((a, b) => Number(b) - Number(a)),
    [episodes]
  );

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return episodes.filter((e) => {
      if (season !== "all" && e.season !== season) return false;
      if (!s) return true;
      return e.title.toLowerCase().includes(s) || e.description.toLowerCase().includes(s);
    });
  }, [episodes, q, season]);

  const visible = filtered.slice(0, count);

  return (
    <>
      <header className="relative bg-blood text-cream overflow-hidden border-b-4 border-cream">
        <div className="grain absolute inset-0" />
        <div className="relative px-4 md:px-10 py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.4em] mb-4">★ Archivo completo</p>
          <h1 className="font-display text-[18vw] md:text-[10rem] leading-[0.82]">
            Pro<br />gramas
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            {episodes.length} episodios. Cada uno una sesión, un viaje, una excusa para descubrir
            algo nuevo.
          </p>
        </div>
        <div className="diag-stripes-cream h-3 opacity-40" />
      </header>

      <section className="sticky top-[68px] z-30 bg-ink/95 backdrop-blur border-b-2 border-cream/20 px-4 md:px-10 py-4 flex flex-wrap gap-3 items-center">
        <input
          type="search"
          placeholder="Buscar episodios, bandas, temas…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setCount(PAGE_SIZE); }}
          className="flex-1 min-w-[200px] bg-ink border-2 border-cream/30 focus:border-blood outline-none px-4 py-3 text-cream font-mono placeholder:text-cream/40"
        />
        <select
          value={season}
          onChange={(e) => { setSeason(e.target.value); setCount(PAGE_SIZE); }}
          className="bg-ink border-2 border-cream/30 focus:border-blood outline-none px-4 py-3 text-cream font-mono uppercase"
        >
          <option value="all">Todas las temporadas</option>
          {seasons.map((s) => (
            <option key={s} value={s}>Temporada {s}</option>
          ))}
        </select>
        <span className="font-mono text-xs uppercase tracking-widest text-cream/60">
          {filtered.length} resultados
        </span>
      </section>

      <section className="px-4 md:px-10 py-12">
        {error && <p className="text-blood mb-6">{error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visible.map((ep, i) => (
            <EpisodeCard key={ep.id} ep={ep} index={i} />
          ))}
        </div>
        {count < filtered.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setCount((c) => c + PAGE_SIZE)}
              className="bg-cream text-ink px-8 py-4 font-display uppercase tracking-wider hover:bg-blood hover:text-cream transition-colors"
            >
              Cargar más ({filtered.length - count})
            </button>
          </div>
        )}
      </section>
    </>
  );
}
