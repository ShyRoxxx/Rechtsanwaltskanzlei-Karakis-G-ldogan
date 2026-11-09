"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Phone, Star, TramFront, SquareParking, Navigation } from "lucide-react";
import { firm } from "@/lib/content";
import pointsJson from "@/lib/map-points.json";

type Pt = { x: number; y: number };
type MapPts = { name: string; points: Record<string, Pt> };
const points = pointsJson as unknown as MapPts[];
import portrait from "@/public/img/penbe-gueldogan.webp";

gsap.registerPlugin(useGSAP);

const desk = points.find((p) => p.name === "muehlenberg")!;
const mob = points.find((p) => p.name === "muehlenberg-m")!;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = document.documentElement.classList.contains("reduce-motion");
      const q = gsap.utils.selector(root);
      if (reduce) {
        gsap.set(q("[data-intro]"), { opacity: 1, clearProps: "transform" });
        return;
      }
      const run = () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(q(".hero-map-canvas"), { scale: 1.07, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 }, 0)
          .fromTo(q(".hero-line .line-in"), { y: 0, yPercent: 110, skewY: 5 }, { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.09 }, 0.15)
          .fromTo(q("[data-intro='text']"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.45)
          .fromTo(q(".pin-drop"), { y: -46, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "back.out(2.2)" }, 0.55)
          .fromTo(q(".pin-ring"), { scale: 0.3, opacity: 0.7 }, { scale: 3.2, opacity: 0, duration: 1.6, ease: "power2.out" }, 1.0)
          .fromTo(q("[data-intro='chip']"), { opacity: 0, y: 10, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 }, 0.95)
          .fromTo(q("[data-intro='card']"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1 }, 0.75);
      };
      if (document.fonts?.status === "loaded") run();
      else document.fonts.ready.then(run);

      // Tiefe beim Scrollen: Karte bleibt etwas zurück (nur mit Maus)
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 900px)", () => {
        gsap.to(q(".hero-map-move"), {
          yPercent: 9, scale: 1.04, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-h1">
      <figure className="hero-map" aria-label="Karte: Die Kanzlei im Mühlenbergzentrum 8, direkt an der Stadtbahn Mühlenberger Markt">
        <div className="hero-map-move">
          <div className="hero-map-canvas" data-intro>
            <picture>
              <source media="(min-width: 900px)" srcSet="/map/muehlenberg.avif" type="image/avif" width={2000} height={1300} />
              <img src="/map/muehlenberg-m.avif" width={1400} height={1000} alt="" fetchPriority="high" decoding="async" className="hero-map-img" />
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
            <span className="line hero-line"><span className="line-in">Ihr Recht hat</span></span>
            <span className="line hero-line"><span className="line-in">hier eine <span className="hero-em">Adresse.</span></span></span>
          </p>
          <h1 id="hero-h1" className="hero-h1" data-intro="text">
            Rechtsanwältin in Hannover-Ricklingen für Arbeits-, Familien-, Verkehrs-, Miet- und Erbrecht
          </h1>
          <p className="hero-sub" data-intro="text">
            Penbe Güldogan berät Sie in ihrer Kanzlei am Mühlenberger Markt — auf Deutsch und auf Türkisch.
            Läuft eine Frist, bekommen Sie kurzfristig einen Termin.
          </p>
          <div className="hero-cta" data-intro="text">
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
          <span className="map-chip chip-bahn" data-intro="chip" style={{ left: `${m.points.stadtbahn.x}%`, top: `${m.points.stadtbahn.y}%` }}>
            <TramFront size={15} strokeWidth={1.75} aria-hidden /> Stadtbahn Mühlenberger Markt
          </span>
          <span className="map-chip chip-park" data-intro="chip" style={{ left: `${m.points.parken.x}%`, top: `${m.points.parken.y}%` }}>
            <SquareParking size={15} strokeWidth={1.75} aria-hidden /> Parkplatz am Zentrum
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
