import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-ink text-cream flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-[20vw] md:text-[12rem] leading-none text-blood">404</h1>
        <p className="font-display text-2xl mt-4">Señal perdida en la frecuencia</p>
        <Link to="/" className="inline-block mt-6 bg-cream text-ink px-6 py-3 font-display uppercase tracking-wider hover:bg-blood hover:text-cream transition-colors">
          ← Volver al estudio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="min-h-screen bg-ink text-cream flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl text-blood">Interferencias</h1>
        <p className="mt-3 text-sm text-cream/70">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 bg-blood text-cream px-6 py-3 font-display uppercase tracking-wider"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LATIDOS37 — Radio musical alternativa · Podcast indie" },
      { name: "description", content: "Latidos37: programa de radio y podcast musical y cultural alternativo. Novedades, entrevistas, sesiones e Isalive en Onda Local de Andalucía, ScannerFM y Onda Wantuki." },
      { name: "author", content: "Latidos37" },
      { name: "theme-color", content: "#d91e18" },
      { property: "og:title", content: "LATIDOS37 — Radio · Podcast · Cultura" },
      { property: "og:description", content: "Música indie, escena underground y cultura alternativa cada semana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-ink text-cream">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
