"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";
const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 36 },
  down: { y: -28 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.94, y: 20 },
  fade: {},
};

/**
 * Seitenweite Einblendungen. Jede Sektion wählt ihre Richtung über data-reveal,
 * Gruppen staffeln ihre Kinder, Überschriften steigen zeilenweise aus der Maske.
 * Bei reduzierter Bewegung bleibt alles im Endzustand.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = document.documentElement.classList.contains("reduce-motion");
    if (reduce) return;

    let ctx: gsap.Context | undefined;
    let raf = 0;
    const setup = () => {
    ctx = gsap.context(() => {
      // Einzelne Elemente
      gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal-group] [data-reveal])").forEach((el) => {
        const kind = el.dataset.reveal ?? "up";
        if (kind === "lines") return;
        gsap.fromTo(
          el,
          { opacity: 0, ...FROM[kind] },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: kind === "fade" ? 1 : 0.9,
            delay: Number(el.dataset.delay ?? 0),
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // Gruppen mit Staffelung
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        const kind = group.dataset.revealGroup || "up";
        gsap.fromTo(
          items,
          { opacity: 0, ...FROM[kind] },
          {
            opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: EASE, stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          },
        );
      });

      // Überschriften zeilenweise
      gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
        const inner = el.querySelectorAll(".line-in");
        gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          inner,
          { yPercent: 110, skewY: 4 },
          {
            yPercent: 0, skewY: 0, duration: 1, ease: EASE, stagger: 0.08,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      // Parallax nur mit Maus
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 0.12);
          gsap.fromTo(
            el,
            { yPercent: -amt * 50 },
            { yPercent: amt * 50, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
    });

    ScrollTrigger.refresh();
    };
    // erst nach der Hydrierung starten, damit React und GSAP sich nicht in die Quere kommen
    const start = () => { raf = requestAnimationFrame(() => { raf = requestAnimationFrame(setup); }); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", start);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
