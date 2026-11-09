"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { areas, moreAreas } from "@/lib/content";
import LetterCard from "./LetterCard";
import Lines from "./Lines";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TILT = [-2.2, 1.6, -1.2, 2, -1.8];

/**
 * „Der Brief auf dem Tisch“: Das Schreiben bleibt neben den Rechtsgebieten stehen
 * und wechselt am Platz, sobald der nächste Abschnitt die Mitte erreicht.
 * Die Seite scrollt dabei normal weiter — nichts wird festgehalten.
 */
export default function AreasLetter() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = useRef(0);

  useGSAP(
    () => {
      const reduce = document.documentElement.classList.contains("reduce-motion");
      const q = gsap.utils.selector(root);
      const cards = q<HTMLElement>(".letter-slot");

      cards.forEach((c, i) => {
        gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, rotation: TILT[i] });
      });

      const show = (next: number) => {
        const prev = current.current;
        if (next === prev) return;
        current.current = next;
        setActive(next);
        const out = cards[prev];
        const inn = cards[next];
        gsap.killTweensOf([out, inn, ...out.querySelectorAll("[data-l],[data-stamp]"), ...inn.querySelectorAll("[data-l],[data-stamp]")]);
        if (reduce) {
          gsap.to(out, { autoAlpha: 0, duration: 0.3 });
          gsap.to(inn, { autoAlpha: 1, duration: 0.3 });
          return;
        }
        const dir = next > prev ? 1 : -1;
        // altes Schreiben: Zeilen gehen nach oben, Blatt gleitet weg
        gsap.to(out.querySelectorAll("[data-l]"), { yPercent: -60 * dir, opacity: 0, duration: 0.45, ease: "expo.out", stagger: 0.03 });
        gsap.to(out, { autoAlpha: 0, y: -40 * dir, rotation: TILT[prev] - 3 * dir, duration: 0.6, ease: "expo.out", delay: 0.08 });
        // neues Schreiben: wird von unten auf den Tisch gelegt, Zeilen steigen nach
        gsap.fromTo(inn, { autoAlpha: 0, y: 60 * dir, rotation: TILT[next] + 4 * dir, scale: 0.97 }, { autoAlpha: 1, y: 0, rotation: TILT[next], scale: 1, duration: 0.85, ease: "expo.out" });
        gsap.fromTo(inn.querySelectorAll("[data-l]"), { yPercent: 70 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.045, delay: 0.1 });
        gsap.fromTo(inn.querySelector("[data-stamp]"), { scale: 1.35, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.6, ease: "back.out(2.4)", delay: 0.38 });
      };

      q<HTMLElement>("[data-chapter]").forEach((ch, i) => {
        ScrollTrigger.create({
          trigger: ch,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && show(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section areas" aria-labelledby="areas-h">
      <div className="wrap">
        <div className="areas-intro">
          <Lines id="areas-h" className="h2 max-w-[18ch]" lines={["Meistens beginnt", "es mit einem Brief."]} />
          <p className="lead mt-6 max-w-[36rem]" data-reveal="up">
            Eine Kündigung, ein Bußgeldbescheid, Post vom Nachlassgericht. Hier sehen Sie, in welchen Rechtsgebieten wir
            vertreten — und welche Frist in dem Schreiben steckt, das Sie vielleicht gerade in der Hand halten.
          </p>
        </div>

        <div className="areas-grid">
          <div className="areas-sticky">
            <div className="letter-stage" aria-hidden>
              {areas.map((a) => (
                <div key={a.slug} className="letter-slot">
                  <LetterCard letter={a.letter} />
                </div>
              ))}
            </div>
            <ol className="areas-dots" aria-hidden>
              {areas.map((a, i) => (
                <li key={a.slug} data-on={i === active || undefined} />
              ))}
            </ol>
          </div>

          <div className="areas-chapters">
            {areas.map((a, i) => (
              <article key={a.slug} className="chapter" data-chapter data-on={i === active || undefined}>
                <h3 className="chapter-title">
                  <span className="para-mark" aria-hidden>§ </span>
                  {a.name}
                </h3>
                <p className="chapter-teaser">{a.teaser}</p>
                <p className="mt-4 max-w-[34rem] text-[var(--text-2)]">{a.summary}</p>
                <Link href={`/rechtsgebiete/${a.slug}`} className="chapter-link">
                  Mehr zum {a.name} <ArrowRight size={17} strokeWidth={1.75} className="btn-arrow" aria-hidden />
                </Link>
              </article>
            ))}
            <div className="chapter-more" data-reveal="up">
              <p className="kicker-text">Außerdem</p>
              <p className="mt-2 text-[var(--text-2)]">
                {moreAreas.map((m, i) => (
                  <span key={m.name}>
                    <Link href="/rechtsgebiete#weitere" className="link-u font-bold text-[var(--ink)]">{m.name}</Link>
                    {i < moreAreas.length - 1 ? ", " : ""}
                  </span>
                ))}{" "}
                — auf der Übersicht aller Rechtsgebiete.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
