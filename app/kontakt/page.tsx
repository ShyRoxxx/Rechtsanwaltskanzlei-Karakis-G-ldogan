import { Mail, Phone, Printer, Smartphone, Clock } from "lucide-react";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import Location from "@/components/Location";
import { firm } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kontakt · Anwältin am Mühlenberger Markt Hannover",
  description:
    "Termin bei Rechtsanwältin Penbe Güldogan: Mühlenbergzentrum 8, 30457 Hannover, Tel. 0511 539 07 56. Erstgespräch anfragen — auf Deutsch oder Türkisch.",
  path: "/kontakt",
});

const ways = [
  { icon: Phone, label: "Telefon", value: firm.phoneDisplay, href: firm.phoneHref },
  { icon: Smartphone, label: "Mobil", value: firm.mobile, href: firm.mobileHref },
  { icon: Mail, label: "E-Mail", value: firm.email, href: `mailto:${firm.email}` },
  { icon: Printer, label: "Fax", value: firm.fax },
  { icon: Clock, label: "Termine", value: firm.hours },
];

export default function Page() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "Kontakt", path: "/kontakt" }]}
        lines={["Termin vereinbaren,", "Frist sichern."]}
        lead="Am schnellsten geht es am Telefon. Sie können uns aber auch eine kurze Anfrage schicken — wir rufen zurück."
      />
      <section className="section" id="anfrage" aria-labelledby="anfrage-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="anfrage-h" className="h3">So erreichen Sie uns</h2>
            <ul className="mt-6 flex flex-col" data-reveal-group="up">
              {ways.map((w) => (
                <li key={w.label} className="flex items-center gap-4 border-t border-[var(--line)] py-4 last:border-b" data-reveal>
                  <w.icon size={20} strokeWidth={1.75} className="shrink-0 text-[var(--accent-ink)]" aria-hidden />
                  <span className="flex flex-col">
                    <span className="small text-[var(--text-3)]">{w.label}</span>
                    {w.href ? <a href={w.href} className="link-u font-bold tabular-nums">{w.value}</a> : <span className="font-bold tabular-nums">{w.value}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8" data-reveal="up">
            <ContactForm idPrefix="kontakt" />
          </div>
        </div>
      </section>
      <Location />
    </>
  );
}
