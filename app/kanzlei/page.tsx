import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import Steps from "@/components/Steps";
import Location from "@/components/Location";
import CtaForm from "@/components/CtaForm";
import Lines from "@/components/Lines";
import { firm } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import portrait from "@/public/img/penbe-gueldogan.webp";
import logo from "@/public/brand/logo-karakis-gueldogan.png";

export const metadata = pageMeta({
  title: "Rechtsanwältin Penbe Güldogan · türkischsprachig in Hannover",
  description:
    "Die Kanzlei Karakis Güldogan am Mühlenbergzentrum: Rechtsanwältin Penbe Güldogan berät deutsche und internationale Mandanten auf Deutsch und Türkisch.",
  path: "/kanzlei",
});

export default function Page() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "Kanzlei", path: "/kanzlei" }]}
        lines={["Eine Kanzlei für", "zwei Welten."]}
        lead="Die Rechtsanwaltskanzlei Karakis Güldogan berät und vertritt deutsche und internationale Mandanten — Privatleute, Familienunternehmen und mittelständische Betriebe aus dem In- und Ausland."
      />
      <section className="section">
        <div className="wrap grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5" data-reveal="left">
            <div className="portrait-frame">
              <div className="portrait-back" aria-hidden />
              <figure className="portrait-paper">
                <Image src={portrait} alt="Rechtsanwältin Penbe Güldogan" className="portrait-img" sizes="(min-width: 900px) 300px, 60vw" placeholder="blur" />
                <figcaption className="portrait-cap">
                  <span className="display text-[1.5rem] leading-tight">{firm.lawyer}</span>
                  <span className="small text-[var(--text-2)]">Rechtsanwältin · Deutsch und Türkisch</span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="text-block md:col-span-7">
            <Lines className="h2" lines={["Penbe Güldogan,", "Rechtsanwältin"]} />
            <div data-reveal="up">
              <p className="lead !text-[var(--ink)]">
                Die meisten Mandantinnen und Mandanten der Kanzlei stammen aus Deutschland, der Türkei und arabischen
                Ländern. Viele leben seit Jahrzehnten in Hannover, haben Familie, Arbeit und Eigentum aber in zwei Ländern.
              </p>
              <p>
                Rechtsanwältin Penbe Güldogan berät auf Deutsch und auf Türkisch. Das spart nicht nur die Übersetzerin —
                es sorgt dafür, dass im Gespräch nichts verloren geht, was für den Fall wichtig ist: ein Satz im
                Arbeitsvertrag, eine Absprache in der Familie, ein Dokument aus dem Heimatland.
              </p>
              <p>
                Die Berufsbezeichnung Rechtsanwältin wurde in der Bundesrepublik Deutschland verliehen. Die Kanzlei
                vertritt Mandanten vor Gerichten in ganz Deutschland — vom Arbeitsgericht Hannover bis zum Familiengericht
                in einer anderen Stadt.
              </p>
            </div>
            <h2 data-reveal="up">Warum am Mühlenberg</h2>
            <p data-reveal="up">
              Die Kanzlei liegt im Mühlenbergzentrum, mitten in einem der Wohnviertel im Hannoveraner Süden. Wer hier
              wohnt, erreicht sie zu Fuß oder mit der Stadtbahn bis Mühlenberger Markt; aus Wettbergen, Ricklingen,
              Linden, Hemmingen und Ronnenberg ist es nicht weit. Für ein Erstgespräch müssen Sie also nicht in die Innenstadt.
            </p>
            <h2 data-reveal="up">Das Zeichen der Kanzlei</h2>
            <div className="mt-4 flex flex-wrap items-center gap-6" data-reveal="up">
              <div className="rounded-[var(--radius-m)] bg-[var(--surface)] p-5 shadow-[0_0_0_1px_var(--line)]">
                <Image src={logo} alt="Logo der Rechtsanwaltskanzlei Karakış Güldoğan mit Waage und Schwert" className="h-20 w-auto" sizes="300px" />
              </div>
              <p className="!mt-0 max-w-[24rem]">
                Waage und Schwert im Logo, der Name in türkischer Schreibweise: Karakış Güldoğan. Das §-Zeichen, das Sie
                überall auf dieser Website finden, stammt aus dem bisherigen Symbol der Kanzlei.
              </p>
            </div>
            <Link href="/rechtsgebiete" className="chapter-link" data-reveal="up">
              Zu den Rechtsgebieten <ArrowRight size={17} strokeWidth={1.75} className="btn-arrow" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <Steps />
      <Location />
      <CtaForm />
    </>
  );
}
