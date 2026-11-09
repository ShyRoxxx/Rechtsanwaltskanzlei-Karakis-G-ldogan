"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Bringt nach jedem Seitenwechsel an den Anfang der neuen Seite —
 * oder, bei einem Link mit Anker (z. B. /kontakt#anfrage), genau zu diesem Abschnitt
 * unterhalb der Kopfzeile. Zurück/Vor im Browser behält die gemerkte Position.
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => (fromHistory.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      if (!window.location.hash) return;
    } else if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }
      const header = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      const top = el.getBoundingClientRect().top + window.scrollY - header - 16;
      window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" });
    };
    go();
    // nach dem Laden von Schriften und Bildern einmal nachjustieren
    const raf = requestAnimationFrame(() => requestAnimationFrame(go));
    const t = window.setTimeout(go, 350);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
