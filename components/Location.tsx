import { ExternalLink, SquareParking, TramFront, Clock } from "lucide-react";
import { firm } from "@/lib/content";
import pointsJson from "@/lib/map-points.json";

const points = pointsJson as unknown as { name: string; points: Record<string, { x: number; y: number }> }[];
import Lines from "./Lines";

const m = points.find((p) => p.name === "hannover-sued")!;
const labels: Record<string, string> = {
  innenstadt: "Innenstadt", ricklingen: "Ricklingen", linden: "Linden", hemmingen: "Hemmingen", ronnenberg: "Ronnenberg",
};

export default function Location({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section className="section location" aria-labelledby="ort-h">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7" data-reveal="left">
          <figure className="area-map">
            <div className="area-map-inner">
              <picture>
                <source srcSet="/map/hannover-sued.avif" type="image/avif" />
                <img src="/map/hannover-sued.avif" alt="Karte des Hannoveraner Südwestens mit der Kanzlei am Mühlenberg und den umliegenden Stadtteilen" width={1200} height={900} loading="lazy" decoding="async" />
              </picture>
              {Object.entries(labels).map(([k, label]) => (
                <span key={k} className="area-chip" style={{ left: `${m.points[k].x}%`, top: `${m.points[k].y}%` }}>
                  {label}
                </span>
              ))}
              <span className="area-pin" style={{ left: `${m.points.kanzlei.x}%`, top: `${m.points.kanzlei.y}%` }}>
                <span className="pin-head" aria-hidden>§</span>
                <span className="area-pin-label">Kanzlei · Mühlenberg</span>
              </span>
            </div>
            <figcaption>
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="link-u">© OpenStreetMap-Mitwirkende</a>
            </figcaption>
          </figure>
        </div>
        <div className="lg:col-span-5 lg:pt-6">
          <Lines as={headingAs} id="ort-h" className="h2" lines={["Gleich an der", "Stadtbahn."]} />
          <address className="mt-6 not-italic text-[var(--fs-lead)] leading-snug">
            {firm.name}
            <br />
            {firm.street}, {firm.zip} {firm.city}-{firm.borough}
          </address>
          <ul className="mt-8 flex flex-col gap-5" data-reveal-group="up">
            <li className="info-row" data-reveal>
              <TramFront size={20} strokeWidth={1.75} aria-hidden />
              <span><strong>Stadtbahn:</strong> Haltestelle Mühlenberger Markt, die Kanzlei liegt direkt am Zentrum.</span>
            </li>
            <li className="info-row" data-reveal>
              <SquareParking size={20} strokeWidth={1.75} aria-hidden />
              <span><strong>Auto:</strong> Parkplätze am Mühlenbergzentrum, über die Hamelner Chaussee (B 217) gut erreichbar.</span>
            </li>
            <li className="info-row" data-reveal>
              <Clock size={20} strokeWidth={1.75} aria-hidden />
              <span><strong>Termine:</strong> nach Vereinbarung unter <a href={firm.phoneHref} className="link-u tabular-nums">{firm.phoneDisplay}</a></span>
            </li>
          </ul>
          <a href={firm.routeUrl} target="_blank" rel="noopener" className="btn btn-ghost mt-8" data-reveal="up">
            Route planen <ExternalLink size={17} strokeWidth={1.75} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
