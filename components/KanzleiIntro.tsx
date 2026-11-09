import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { firm } from "@/lib/content";
import portrait from "@/public/img/penbe-gueldogan.webp";
import Lines from "./Lines";

const facts = [
  "Rechtsanwältin Penbe Güldogan — Gespräche auf Deutsch und auf Türkisch",
  "Mandantinnen und Mandanten aus Deutschland, der Türkei und arabischen Ländern",
  "Privatleute, Familienunternehmen und mittelständische Betriebe",
  "Vertretung vor Gerichten in ganz Deutschland",
];

export default function KanzleiIntro() {
  return (
    <section className="section kanzlei-intro" aria-labelledby="kanzlei-h">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative md:col-span-5" data-reveal="left">
          <div className="portrait-frame">
            <div className="portrait-back" aria-hidden />
            <figure className="portrait-paper">
              <Image src={portrait} alt="Rechtsanwältin Penbe Güldogan" className="portrait-img" sizes="(min-width: 900px) 300px, 60vw" placeholder="blur" />
              <figcaption className="portrait-cap">
                <span className="display text-[1.5rem] leading-tight">{firm.lawyer}</span>
                <span className="small text-[var(--text-2)]">Rechtsanwältin</span>
              </figcaption>
            </figure>
          </div>
          <a href={firm.mapsUrl} target="_blank" rel="noopener" className="rating-badge" data-reveal="scale" data-delay="0.25">
            <span className="rating-num tabular-nums">{firm.rating.value}</span>
            <span className="flex flex-col">
              <span className="flex gap-0.5" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} strokeWidth={0} fill={i < 4 ? "#c98a12" : "#d9dedd"} />
                ))}
              </span>
              <span className="small text-[var(--text-2)]">{firm.rating.count} Bewertungen bei Google</span>
            </span>
          </a>
        </div>
        <div className="md:col-span-7">
          <Lines id="kanzlei-h" className="h2 max-w-[16ch]" lines={["Rat im Viertel,", "nicht im Büroturm."]} />
          <div className="prose-col mt-6 text-[var(--text-2)]" data-reveal="up">
            <p>
              Die Kanzlei Karakis Güldogan berät und vertritt deutsche und internationale Mandanten in Hannover. Sie
              liegt nicht in der Innenstadt, sondern dort, wo viele Mandanten wohnen und einkaufen: im Mühlenbergzentrum,
              direkt an der Stadtbahn.
            </p>
            <p>
              Wer mit einem Brief vom Gericht oder vom Arbeitgeber kommt, braucht zuerst eine verständliche Erklärung —
              in der Sprache, in der man auch über Familie und Geld spricht. Erst dann entscheiden Sie, wie es weitergeht.
            </p>
          </div>
          <ul className="fact-list mt-8" data-reveal-group="up">
            {facts.map((f) => (
              <li key={f} data-reveal>
                <span className="para-mark" aria-hidden>§</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/kanzlei" className="chapter-link" data-reveal="up">
            Mehr über die Kanzlei <ArrowRight size={17} strokeWidth={1.75} className="btn-arrow" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
