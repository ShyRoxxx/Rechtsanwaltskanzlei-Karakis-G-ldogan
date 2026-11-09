import Link from "next/link";
import { areas, firm, nav, serviceArea } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] pb-28 pt-16 md:pb-12">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-12" />
          <address className="mt-6 not-italic leading-relaxed text-[var(--text-2)]">
            {firm.name}
            <br />
            {firm.role} {firm.lawyer}
            <br />
            {firm.street}, {firm.zip} {firm.city}
          </address>
          <p className="mt-4 flex flex-col gap-1">
            <a className="link-u w-fit tabular-nums" href={firm.phoneHref}>Tel. {firm.phoneDisplay}</a>
            <span className="tabular-nums text-[var(--text-2)]">Fax {firm.fax}</span>
            <a className="link-u w-fit" href={`mailto:${firm.email}`}>{firm.email}</a>
          </p>
          <p className="mt-4 text-[var(--text-2)]">{firm.hours}</p>
        </div>
        <nav aria-label="Rechtsgebiete" className="md:col-span-3">
          <h2 className="kicker-text">Rechtsgebiete</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {areas.map((a) => (
              <li key={a.slug}><Link className="link-draw" href={`/rechtsgebiete/${a.slug}`}>{a.name}</Link></li>
            ))}
            <li><Link className="link-draw" href="/rechtsgebiete#weitere">Zivil-, WEG- und Medienrecht</Link></li>
          </ul>
        </nav>
        <nav aria-label="Kanzlei" className="md:col-span-2">
          <h2 className="kicker-text">Kanzlei</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.href}><Link className="link-draw" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="kicker-text">Gut erreichbar aus</h2>
          <p className="mt-4 text-[var(--text-2)]">{serviceArea.join(", ")} und ganz Hannover. Stadtbahn bis Mühlenberger Markt.</p>
        </div>
      </div>
      <div className="wrap mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[0.875rem] text-[var(--text-3)] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <span>© 2026 Rechtsanwaltskanzlei Karakis Güldogan. Alle Rechte vorbehalten.</span>
          <a href="https://bilbaoconsulting.com" target="_blank" rel="noopener" className="link-u w-fit">Website von Bilbao Consulting</a>
        </div>
        <div className="flex gap-5">
          <Link href="/impressum" className="link-u">Impressum</Link>
          <Link href="/datenschutz" className="link-u">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
