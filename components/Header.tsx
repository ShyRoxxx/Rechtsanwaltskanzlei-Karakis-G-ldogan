"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, X } from "lucide-react";
import Logo from "./Logo";
import { firm, nav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schließen (State-Anpassung während des Renderns)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled || undefined}
        style={{ height: "var(--header-h)" }}
      >
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Logo className="h-10 md:h-12" priority />
          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-draw py-2 font-bold text-[var(--text-2)] transition-colors hover:text-[var(--ink)] aria-[current=page]:text-[var(--ink)]"
                    aria-current={isActive(n.href) ? "page" : undefined}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href={firm.phoneHref} className="btn btn-primary hidden !min-h-11 !px-5 sm:inline-flex">
              <Phone size={18} strokeWidth={1.75} aria-hidden />
              <span className="tabular-nums">{firm.phoneDisplay}</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              className="menu-btn lg:hidden"
              aria-expanded={open}
              aria-controls="mobilmenue"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
              <span aria-hidden className="menu-lines" data-open={open || undefined}>
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobilmenue" className="mobile-menu lg:hidden" data-open={open || undefined} aria-hidden={!open} inert={!open}>
        <div className="wrap flex h-full flex-col pb-10" style={{ paddingTop: "calc(var(--header-h) + 1.5rem)" }}>
          <ul className="flex flex-col gap-1">
            {[{ href: "/", label: "Start" }, ...nav].map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={n.href}
                  className="mobile-link"
                  aria-current={pathname === n.href ? "page" : undefined}
                >
                  <span className="para-mark text-[0.7em]" aria-hidden>§</span> {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-foot mt-auto flex flex-col gap-3" style={{ "--i": 7 } as React.CSSProperties}>
            <a href={firm.phoneHref} className="btn btn-primary w-full">
              <Phone size={18} strokeWidth={1.75} aria-hidden /> {firm.phoneDisplay} anrufen
            </a>
            <p className="small muted text-center">
              {firm.street}, {firm.zip} {firm.city} · {firm.hours}
            </p>
          </div>
          <button type="button" className="sr-only focus:not-sr-only" onClick={() => setOpen(false)}>
            <X aria-hidden /> Menü schließen
          </button>
        </div>
      </div>
    </>
  );
}
