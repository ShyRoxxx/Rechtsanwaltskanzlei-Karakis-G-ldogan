import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { firm } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="page-head !border-0">
      <div className="page-head-glow" aria-hidden />
      <div className="wrap relative pb-24">
        <p className="display text-[clamp(5rem,3rem+10vw,10rem)] leading-none text-[var(--accent-ink)]" aria-hidden>§ 404</p>
        <h1 className="page-title !mt-6">Diese Seite gibt es nicht (mehr).</h1>
        <p className="lead mt-6 max-w-[34rem]">Vielleicht wurde sie verschoben, oder der Link hat einen Tippfehler. Hier geht es weiter:</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">Zur Startseite <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden /></Link>
          <a href={firm.phoneHref} className="btn btn-ghost"><Phone size={18} strokeWidth={1.75} aria-hidden /> {firm.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
