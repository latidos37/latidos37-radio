export function Footer() {
  return (
    <footer className="relative mt-20 bg-blood text-cream overflow-hidden">
      <div className="diag-stripes h-3" />
      <div className="relative grain px-4 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-5xl md:text-7xl leading-[0.8]">
              LATI<br />DOS<br />
              <span className="text-stroke" style={{ WebkitTextStroke: "2px var(--cream)" }}>37</span>
            </h3>
            <p className="mt-6 text-sm uppercase tracking-widest opacity-90">
              Música · Cultura · Isalive · Novedades
            </p>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Escucha</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.ivoox.com/podcast-latidos37_sq_f1426133_1.html" target="_blank" rel="noreferrer" className="hover:underline">
                  → iVoox
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:underline">
                  → Instagram
                </a>
              </li>
              <li>
                <a href="mailto:latidos37@gmail.com" className="hover:underline">
                  → Contacto
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Onda</p>
            <p className="text-sm leading-relaxed opacity-90">
              Onda Local de Andalucía · ScannerFM · Onda Wantuki.
              Programa musical y cultural alternativo. Novedades, entrevistas y sesiones especiales.
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-cream/30 pt-6 text-xs uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Latidos37 — All vibes reserved</span>
          <span className="font-display text-2xl">★ ON AIR ★</span>
        </div>
      </div>
    </footer>
  );
}
