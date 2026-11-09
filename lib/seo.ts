import type { Metadata } from "next";
import { SITE_URL, firm, serviceArea } from "./content";

export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "Rechtsanwaltskanzlei Karakis Güldogan · Hannover — Ihr Recht hat hier eine Adresse." };

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${firm.short}`, description, url: path, images: [OG_IMAGE] },
  };
}

export function legalServiceLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#kanzlei`,
    name: firm.name,
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/brand/logo-karakis-gueldogan.png`,
    telephone: firm.phone,
    faxNumber: "+49 511 5390754",
    email: firm.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: firm.street,
      postalCode: firm.zip,
      addressLocality: firm.city,
      addressRegion: "Niedersachsen",
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: firm.geo.lat, longitude: firm.geo.lng },
    areaServed: [...serviceArea, "Hannover"].map((name) => ({ "@type": "Place", name })),
    knowsLanguage: ["de", "tr"],
    employee: { "@type": "Person", name: firm.lawyer, jobTitle: firm.role },
    sameAs: [firm.mapsUrl],
    knowsAbout: ["Arbeitsrecht", "Familienrecht", "Verkehrsrecht", "Mietrecht", "Erbrecht", "Zivilrecht", "Wohnungseigentumsrecht", "Medienrecht"],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Startseite", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
