import Link from "next/link";
import PageHead from "@/components/PageHead";
import FristBand from "@/components/FristBand";
import Faq from "@/components/Faq";
import CtaForm from "@/components/CtaForm";
import JsonLd from "@/components/JsonLd";
import { fristen } from "@/lib/content";
import { faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fristen berechnen · Einspruch, Klage, Ausschlagung",
  description:
    "Kündigung, Bußgeldbescheid, Mahnbescheid, Mieterhöhung oder Erbe: Berechnen Sie unverbindlich, wie lange Ihre Frist läuft — und lassen Sie sie in Hannover prüfen.",
  path: "/fristen",
});

const fristFaq = [
  { q: "Ab wann läuft die Frist?", a: "In der Regel ab dem Tag, an dem das Schreiben bei Ihnen angekommen ist — nicht ab dem Datum, das oben auf dem Brief steht. Bei förmlicher Zustellung steht das Datum auf dem gelben Umschlag. Heben Sie den Umschlag deshalb immer auf." },
  { q: "Was passiert, wenn die Frist an einem Wochenende endet?", a: "Fällt das Fristende auf einen Samstag, Sonntag oder gesetzlichen Feiertag, endet die Frist erst am nächsten Werktag. Der Wegweiser berücksichtigt das für Niedersachsen." },
  { q: "Ich war im Urlaub und habe die Frist verpasst. Ist alles verloren?", a: "Nicht unbedingt. Wer ohne eigenes Verschulden verhindert war, kann unter Umständen Wiedereinsetzung in den vorigen Stand beantragen — dafür gilt aber wieder eine kurze Frist. Rufen Sie sofort an." },
  { q: "Reicht ein Brief oder eine E-Mail, um die Frist zu wahren?", a: "Das hängt vom Verfahren ab. Eine Kündigungsschutzklage muss beim Arbeitsgericht eingehen, eine Erbausschlagung muss beglaubigt sein. Eine einfache E-Mail genügt fast nie." },
];

export default function Page() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "Fristen", path: "/fristen" }]}
        lines={["Fristen, die", "man kennen muss."]}
        lead="Viele Rechte gehen nicht verloren, weil man im Unrecht ist, sondern weil eine Frist verstrichen ist. Der Wegweiser zeigt Ihnen für fünf häufige Schreiben, wie viel Zeit bleibt."
      />
      <FristBand />
      <section className="section" aria-labelledby="ueberblick-h">
        <div className="wrap">
          <h2 id="ueberblick-h" className="h2">Die Fristen im Überblick</h2>
          <div className="mt-10 overflow-x-auto" data-reveal="up">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--line-strong)] text-[var(--fs-sm)] text-[var(--text-3)]">
                  <th scope="col" className="py-3 pr-6 font-bold">Schreiben</th>
                  <th scope="col" className="py-3 pr-6 font-bold">Frist</th>
                  <th scope="col" className="py-3 pr-6 font-bold">Was zu tun ist</th>
                  <th scope="col" className="py-3 font-bold">Rechtsgebiet</th>
                </tr>
              </thead>
              <tbody>
                {fristen.map((f) => (
                  <tr key={f.id} className="border-b border-[var(--line)] align-top">
                    <th scope="row" className="py-4 pr-6 font-bold">{f.label}</th>
                    <td className="py-4 pr-6">{f.rule.weeks ? `${f.rule.weeks} Wochen` : "bis Ende des 2. Monats"}{f.id === "erbe" ? " (6 Monate mit Auslandsbezug)" : ""}<span className="block text-[var(--fs-sm)] text-[var(--text-3)]">{f.basis}</span></td>
                    <td className="py-4 pr-6 text-[var(--text-2)]">{f.what}</td>
                    <td className="py-4 text-[var(--text-2)]">{f.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-[44rem] text-[var(--text-2)]">
            Mehr zu den einzelnen Gebieten: <Link href="/rechtsgebiete/arbeitsrecht" className="link-u">Arbeitsrecht</Link>,{" "}
            <Link href="/rechtsgebiete/verkehrsrecht" className="link-u">Verkehrsrecht</Link>,{" "}
            <Link href="/rechtsgebiete/mietrecht" className="link-u">Mietrecht</Link> und{" "}
            <Link href="/rechtsgebiete/erbrecht" className="link-u">Erbrecht</Link>.
          </p>
        </div>
      </section>
      <Faq items={fristFaq} title={["Häufige Fragen", "zu Fristen"]} />
      <CtaForm />
      <JsonLd data={faqLd(fristFaq)} />
    </>
  );
}
