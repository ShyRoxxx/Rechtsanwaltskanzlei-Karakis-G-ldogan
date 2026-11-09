"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadGsap } from "@/lib/gsap";

type Vars = Record<string, number>;
const FROM: Record<string, Vars> = {
  up: { y: 36 },
  down: { y: -28 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.94, y: 20 },
  fade: {},
};
const EASE = "expo.out";

/**
 * Seitenweite Einblendungen. Jede Sektion wählt ihre Richtung über data-reveal,
 * Gruppen staffeln ihre Kinder, Überschriften steigen zeilenweise aus der Maske.
 * GSAP wird erst nach der Hydrierung geladen; bei reduzierter Bewegung bleibt alles im Endzustand.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.classList.contains("reduce-motion")) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      // Was beim Start schon im Bild ist, bleibt stehen — nur Kommendes wird eingeblendet.
      const seen = (el: Element) => el.getBoundingClientRect().top < window.innerHeight * 0.92;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal-group] [data-reveal])").forEach((el) => {
          const kind = el.dataset.reveal ?? "up";
          if (kind === "lines" || seen(el)) return;
          gsap.fromTo(el, { opacity: 0, ...FROM[kind] }, {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: kind === "fade" ? 1 : 0.9,
            delay: Number(el.dataset.delay ?? 0),
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const kind = group.dataset.revealGroup || "up";
          if (seen(group)) return;
          gsap.fromTo(group.querySelectorAll("[data-reveal]"), { opacity: 0, ...FROM[kind] }, {
            opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: EASE, stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='lines']:not(.page-title)").forEach((el) => {
          gsap.set(el, { opacity: 1 });
          gsap.fromTo(el.querySelectorAll(".line-in"), { yPercent: 110, skewY: 4 }, {
            yPercent: 0, skewY: 0, duration: 1, ease: EASE, stagger: 0.08,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Tiefe nur mit Maus: an den Scrollweg gekoppelte Effekte laufen auf Touch dem Finger hinterher
        const mm = gsap.matchMedia();
        mm.add("(hover: hover) and (pointer: fine) and (min-width: 900px)", () => {
          const map = document.querySelector(".hero-map-move");
          if (map) {
            gsap.to(map, { yPercent: 9, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
          }
        });
      });
      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    }).catch(() => document.documentElement.classList.add("reduce-motion"));

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}
