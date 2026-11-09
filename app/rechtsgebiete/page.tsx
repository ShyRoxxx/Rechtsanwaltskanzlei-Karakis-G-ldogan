import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import CtaForm from "@/components/CtaForm";
import Lines from "@/components/Lines";
import { areas, moreAreas } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Rechtsgebiete · Anwältin Hannover-Mühlenberg",
  description:
    "Arbeits-, Familien-, Verkehrs-, Miet- und Erbrecht sowie Zivil-, WEG- und Medienrecht: alle Rechtsgebiete der Kanzlei Karakis Güldogan in Hannover im Überblick.",
  path: "/rechtsgebiete",
});

export default function Page() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "Rechtsgebiete", path: "/rechtsgebiete" }]}
        lines={["Acht Rechtsgebiete,", "eine Ansprechpartnerin."]}
        lead="Die Kanzlei deckt die Rechtsgebiete ab, mit denen Privatleute, Familien und kleine Betriebe im Alltag zu tun haben. Wählen Sie Ihr Thema — oder rufen Sie an, wenn Sie nicht sicher sind, wohin Ihr Anliegen gehört."
      />
      <section className="section" aria-label="Rechtsgebiete mit eigener Seite">
        <div className="wrap">
          <ul data-reveal-group="up">
            {areas.map((a) => (
              <li key={a.slug} data-reveal>
                <Link href={`/rechtsgebiete/${a.slug}`} className="area-row">
                  <span>
                    <span className="area-row-title block">{a.name}</span>
                    <span className="mt-2 block max-w-[40rem] text-[var(--text-2)]">{a.teaser}</span>
                  </span>
                  <span className="area-row-arrow" aria-hidden><ArrowRight size={20} strokeWidth={1.75} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-[var(--surface)]" id="weitere" aria-labelledby="weitere-h">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Lines id="weitere-h" className="h2" lines={["Außerdem", "vertreten wir Sie"]} />
          </div>
          <div className="grid gap-10 md:col-span-8" data-reveal-group="up">
            {moreAreas.map((m) => (
              <article key={m.name} data-reveal className="border-t border-[var(--line)] pt-6">
                <h3 className="h3"><span className="para-mark" aria-hidden>§ </span>{m.name}</h3>
                <p className="mt-3 max-w-[40rem] text-[var(--text-2)]">{m.text}</p>
              </article>
            ))}
            <p className="text-[var(--text-2)]" data-reveal>
              Ihr Thema ist nicht dabei? Die Kanzlei berät auch im Wirtschafts- und im Strafrecht.
              Fragen Sie am Telefon nach — wenn wir nicht die Richtigen sind, sagen wir es Ihnen offen.
            </p>
          </div>
        </div>
      </section>
      <CtaForm />
    </>
  );
}
