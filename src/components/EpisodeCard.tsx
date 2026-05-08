import { Link } from "@tanstack/react-router";
import type { Episode } from "@/lib/ivoox.functions";

function formatDate(s: string): string {
  try {
    return new Date(s).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return s;
  }
}

export function EpisodeCard({ ep, index = 0 }: { ep: Episode; index?: number }) {
  const tilt = index % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]";
  return (
    <Link
      to="/programas/$slug"
      params={{ slug: ep.slug }}
      className={`hover-lift group block bg-card border-2 border-cream/15 hover:border-blood ${tilt}`}
    >
      <div className="relative aspect-square overflow-hidden bg-ink">
        {ep.image && (
          <img
            src={ep.image}
            alt={ep.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute top-2 left-2 bg-blood text-cream font-display text-xs px-2 py-1">
          {ep.season && ep.episode ? `S${ep.season}·E${ep.episode}` : "EP"}
        </div>
        <div className="absolute bottom-2 right-2 bg-cream text-ink font-mono text-[10px] px-2 py-1">
          {ep.duration}
        </div>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-blood">
          {formatDate(ep.pubDate)}
        </p>
        <h3 className="mt-2 font-display text-lg leading-tight text-cream group-hover:text-blood transition-colors line-clamp-3">
          {ep.title.replace(/^Latidos37\|?\s*/i, "")}
        </h3>
      </div>
    </Link>
  );
}
