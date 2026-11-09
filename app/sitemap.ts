import type { MetadataRoute } from "next";
import { SITE_URL, areas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/rechtsgebiete", ...areas.map((a) => `/rechtsgebiete/${a.slug}`), "/kanzlei", "/fristen", "/fragen", "/kontakt", "/impressum", "/datenschutz"];
  return paths.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: new Date("2026-11-09"), changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
