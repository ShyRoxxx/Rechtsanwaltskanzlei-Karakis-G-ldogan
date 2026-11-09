import Image from "next/image";
import { preload } from "react-dom";
import Link from "next/link";
import { ArrowRight, Phone, Star, TramFront, SquareParking, Navigation } from "lucide-react";
import { firm } from "@/lib/content";
import pointsJson from "@/lib/map-points.json";

type Pt = { x: number; y: number };
type MapPts = { name: string; w: number; points: Record<string, Pt> };
const points = pointsJson as unknown as MapPts[];
import portrait from "@/public/img/penbe-gueldogan.webp";

const desk = points.find((p) => p.name === "muehlenberg")!;
const mob = points.find((p) => p.name === "muehlenberg-m")!;

export default function Hero() {
  // Karte vor den Schriften anfordern: sie ist das größte Element im ersten Bildschirm
  preload("/map/muehlenberg-m.avif", { as: "image", type: "image/avif", fetchPriority: "high", media: "(max-width: 899px)" });
  preload("/map/muehlenberg.avif", { as: "image", type: "image/avif", fetchPriority: "high", media: "(min-width: 900px)" });
  return (
    <section className="hero" aria-labelledby="hero-h1">
      <figure className="hero-map" aria-label="Karte: Die Kanzlei im Mühlenbergzentrum 8, direkt an der Stadtbahn Mühlenberger Markt">
        <div className="hero-map-move">
          <div className="hero-map-canvas">
            <picture>
              <source media="(min-width: 900px)" srcSet="/map/muehlenberg.avif" type="image/avif" width={2000} height={1300} />
              <img src="/map/muehlenberg-m.avif" width={1040} height={800} alt="" fetchPriority="high" className="hero-map-img" />
            </picture>
            <MapMarkers />
          </div>
        </div>
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="osm-credit">
          © OpenStreetMap-Mitwirkende
        </a>
      </figure>

      <div className="hero-card" data-intro="card">
        <Image src={portrait} alt="Rechtsanwältin Penbe Güldogan" width={72} height={72} className="hero-card-img" sizes="72px" placeholder="blur" />
        <div className="min-w-0">
          <p className="font-bold leading-tight">{firm.lawyer}</p>
          <p className="small text-[var(--text-2)]">Rechtsanwältin · Deutsch &amp; Türkisch</p>
          <p className="small mt-1 flex items-center gap-1.5">
            <Star size={15} strokeWidth={0} fill="#c98a12" aria-hidden />
            <span className="font-bold tabular-nums">{firm.rating.value}</span>
            <a href={firm.mapsUrl} target="_blank" rel="noopener" className="link-u text-[var(--text-2)]">
              {firm.rating.count} Google-Bewertungen
            </a>
          </p>
        </div>
      </div>

      <div className="hero-text wrap">
        <div className="hero-text-inner">
          <p className="hero-statement display">
            <span className="line hero-line"><span className="line-in" style={{ "--d": 0 } as React.CSSProperties}>Ihr Recht hat</span></span>
            <span className="line hero-line"><span className="line-in" style={{ "--d": 1 } as React.CSSProperties}>hier eine <span className="hero-em">Adresse.</span></span></span>
          </p>
          <h1 id="hero-h1" className="hero-h1" data-intro="text" style={{ "--d": 0 } as React.CSSProperties}>
            Rechtsanwältin in Hannover-Ricklingen für Arbeits-, Familien-, Verkehrs-, Miet- und Erbrecht
          </h1>
          <p className="hero-sub" data-intro="text" style={{ "--d": 1 } as React.CSSProperties}>
            Penbe Güldogan berät Sie in ihrer Kanzlei am Mühlenberger Markt — auf Deutsch und auf Türkisch.
            Läuft eine Frist, bekommen Sie kurzfristig einen Termin.
          </p>
          <div className="hero-cta" data-intro="text" style={{ "--d": 2 } as React.CSSProperties}>
            <a href={firm.phoneHref} className="btn btn-primary">
              <Phone size={18} strokeWidth={1.75} aria-hidden />
              <span className="tabular-nums">{firm.phoneDisplay}</span> anrufen
            </a>
            <Link href="/kontakt#anfrage" className="hero-link">
              oder Erstgespräch online anfragen <ArrowRight size={17} strokeWidth={1.75} className="btn-arrow" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

}

function MapMarkers() {
  return (
    <>
      {[desk, mob].map((m) => (
        <div key={m.name} className={m.name === "muehlenberg" ? "markers markers-desk" : "markers markers-mob"}>
          <span className="map-chip chip-bahn" data-intro="chip" style={{ "--d": 1, left: `${m.points.stadtbahn.x}%`, top: `${m.points.stadtbahn.y}%` } as React.CSSProperties}>
            <TramFront size={15} strokeWidth={1.75} aria-hidden /> Stadtbahn Mühlenberger Markt
          </span>
          <span className="map-chip chip-park" data-intro="chip" style={{ "--d": 2, left: `${m.points.parken.x}%`, top: `${m.points.parken.y}%` } as React.CSSProperties}>
            <SquareParking size={15} strokeWidth={1.75} aria-hidden /> Parkplatz am Zentrum
          </span>
          <span className="walk-ring" aria-hidden style={{ left: `${m.points.kanzlei.x}%`, top: `${m.points.kanzlei.y}%`, width: `${(274 / m.w) * 200}%` }}>
            <span className="walk-ring-label">400 m</span>
          </span>
          <span className="pin" style={{ left: `${m.points.kanzlei.x}%`, top: `${m.points.kanzlei.y}%` }}>
            <span className="pin-ring" aria-hidden />
            <span className="pin-drop">
              <span className="pin-head" aria-hidden>§</span>
              <a className="pin-label" href={firm.routeUrl} target="_blank" rel="noopener" data-intro="chip">
                <strong>Mühlenbergzentrum 8</strong>
                <span><Navigation size={13} strokeWidth={2} aria-hidden /> Route planen</span>
              </a>
            </span>
          </span>
        </div>
      ))}
    </>
  );
}
