import { createServerFn } from "@tanstack/react-start";

export type Episode = {
  id: string;
  title: string;
  link: string;
  audio: string;
  description: string;
  pubDate: string;
  duration: string;
  image: string;
  season?: string;
  episode?: string;
  slug: string;
};

const FEED_URL = "https://www.ivoox.com/podcast-latidos37_fg_f1426133_filtro_1.xml";

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function pick(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
}

function attr(block: string, tag: string, name: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*\\b${name}=["']([^"']+)["']`));
  return m ? m[1] : "";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function parseFeed(xml: string): Episode[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map((block) => {
    const guid = pick(block, "guid");
    const id = guid.split("/").pop() || guid;
    const title = pick(block, "title");
    const link = pick(block, "link");
    const audio = attr(block, "enclosure", "url");
    const description = pick(block, "description");
    const pubDate = pick(block, "pubDate");
    const duration = pick(block, "itunes:duration");
    const season = pick(block, "itunes:season");
    const episode = pick(block, "itunes:episode");
    const image = attr(block, "itunes:image", "href") || attr(block, "image", "href");
    return {
      id,
      title,
      link,
      audio,
      description,
      pubDate,
      duration,
      season,
      episode,
      image,
      slug: `${id}-${slugify(title)}`,
    };
  });
}

let cache: { at: number; data: Episode[] } | null = null;

export const getEpisodes = createServerFn({ method: "GET" }).handler(async () => {
  if (cache && Date.now() - cache.at < 5 * 60 * 1000) {
    return { episodes: cache.data, error: null as string | null };
  }
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Latidos37Web/1.0" },
    });
    if (!res.ok) {
      return { episodes: cache?.data ?? [], error: `Feed ${res.status}` };
    }
    const xml = await res.text();
    const data = parseFeed(xml);
    cache = { at: Date.now(), data };
    return { episodes: data, error: null };
  } catch (e) {
    return { episodes: cache?.data ?? [], error: (e as Error).message };
  }
});
