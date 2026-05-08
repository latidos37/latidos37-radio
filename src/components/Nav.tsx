import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-cream bg-ink/90 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="inline-block w-3 h-3 bg-blood rounded-full animate-pulse" />
          <span className="font-display text-xl md:text-2xl tracking-tight text-cream">
            LATIDOS<span className="text-blood">37</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-display uppercase">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/programas">Programas</NavLink>
          <NavLink to="/noticias">Radar</NavLink>
          <NavLink to="/galeria">Galería</NavLink>
        </nav>
      </div>
      <div className="diag-stripes h-2" />
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 text-cream hover:text-blood transition-colors"
      activeProps={{ className: "text-blood" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
