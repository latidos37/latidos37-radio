import { useEffect, useRef, useState } from "react";
import type { Episode } from "@/lib/ivoox.functions";

export function HeroPlayer({ ep }: { ep: Episode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  }

  return (
    <div className="relative bg-cream text-ink border-y-4 border-ink overflow-hidden">
      <div className="grid md:grid-cols-[260px_1fr_auto] gap-6 p-5 md:p-7 items-center">
        {ep.image && (
          <img
            src={ep.image}
            alt={ep.title}
            className="w-full max-w-[260px] aspect-square object-cover border-4 border-ink shadow-[8px_8px_0_var(--blood)]"
          />
        )}
        <div className="min-w-0">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-blood">
            ★ Último episodio · En el aire
          </p>
          <h2 className="mt-2 font-display text-2xl md:text-4xl leading-[0.95] line-clamp-2">
            {ep.title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-ink/80 line-clamp-3">
            {ep.description.replace(/<[^>]+>/g, "")}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs font-mono uppercase">
            <span className="bg-ink text-cream px-2 py-1">{ep.duration}</span>
            {ep.season && ep.episode && (
              <span className="bg-blood text-cream px-2 py-1">
                S{ep.season} · E{ep.episode}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={toggle}
            aria-label={playing ? "Pausar" : "Reproducir"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blood text-cream border-4 border-ink shadow-[6px_6px_0_var(--ink)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_var(--ink)] transition-all flex items-center justify-center group"
          >
            {playing ? (
              <div className="flex gap-1 items-end h-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-full bg-cream wave-bar"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            ) : (
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current ml-1">
                <path d="M6 4l14 8-14 8z" />
              </svg>
            )}
          </button>
          <span className="font-display text-sm tracking-wider">
            {playing ? "ON AIR" : "PRESS PLAY"}
          </span>
        </div>
      </div>
      <audio ref={audioRef} src={ep.audio} preload="none" />
    </div>
  );
}
