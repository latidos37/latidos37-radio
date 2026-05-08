import { useEffect } from "react";

const SCRIPT_SRC = "https://w.behold.so/widget.js";
const FEED_ID = "kZhFmOI1boWX9ex8i7Gj";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id"?: string },
        HTMLElement
      >;
    }
  }
}

export default function BeholdFeed() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.type = "module";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <section className="w-full bg-transparent py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <behold-widget feed-id={FEED_ID} style={{ width: "100%", display: "block" }} />
      </div>
    </section>
  );
}
