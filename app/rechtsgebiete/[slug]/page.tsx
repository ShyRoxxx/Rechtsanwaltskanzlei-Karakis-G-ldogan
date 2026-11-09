import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import PageHead from "@/components/PageHead";
import LetterCard from "@/components/LetterCard";
import FristBand from "@/components/FristBand";
import Faq from "@/components/Faq";
import CtaForm from "@/components/CtaForm";
import JsonLd from "@/components/JsonLd";
import { areas, firm } from "@/lib/content";
import { faqLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = areas.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.description, path: `/rechtsgebiete/${a.slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areas.find((x) => x.slug === slug);
  if (!a) notFound();
  const others = areas.filter((x) => x.slug !== a.slug);
  const [first, ...rest] = a.h1.split(":");

  return (
    <>
      <PageHead
        crumbs={[{ name: "Rechtsgebiete", path: "/rechtsgebiete" }, { name: a.name, path: `/rechtsgebiete/${a.slug}` }]}
        lines={rest.length ? [`${first}:`, rest.join(":").trim()] : [a.h1]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" data-reveal="up" data-delay="0.2">
          <a href={firm.phoneHref} className="btn btn-primary"><Phone size={18} strokeWidth={1.75} aria-hidden /> <span className="tabular-nums">{firm.phoneDisplay}</span> anrufen</a>
          <Link href={`/kontakt?gebiet=${encodeURIComponent(a.name)}#anfrage`} className="hero-link">oder Erstgespräch anfragen <ArrowRight size={17} strokeWidth={1.75} className="btn-arrow" aria-hidden /></Link>
        </div>
      </PageHead>

      <section className="section">
        <div className="wrap area-layout">
          <div className="text-block">
            <div data-reveal="up">
              {a.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "lead !text-[var(--ink)]" : ""}>{p}</p>
              ))}
            </div>
            <h2 data-reveal="up">Wobei wir Sie vertreten</h2>
            <ul className="case-list" data-reveal-group="up">
              {a.cases.map((c) => (
                <li key={c} data-reveal><span className="para-mark" aria-hidden>§</span><span>{c}</span></li>
              ))}
            </ul>
            <h2 data-reveal="up">So läuft es ab</h2>
            <p data-reveal="up">{a.process}</p>
            <h2 data-reveal="up">Was es kostet</h2>
            <p data-reveal="up">{a.costs}</p>
            <p data-reveal="up">
              Für Verbraucher ist die erste Beratung gesetzlich auf höchstens 190 Euro zuzüglich Umsatzsteuer begrenzt
              (§ 34 RVG). Den Betrag nennen wir Ihnen vorher.
            </p>
          </div>
          <aside className="area-aside" aria-label="Beispiel eines typischen Schreibens" data-reveal="right">
            <LetterCard letter={a.letter} />
            <p className="small mt-5 text-[var(--text-3)]">So oder ähnlich sieht das Schreiben aus, mit dem viele Mandanten kommen. Bringen Sie Ihres einfach mit.</p>
          </aside>
        </div>
      </section>

      {a.fristId && <FristBand initial={a.fristId} />}
      <Faq items={a.faq} title={["Fragen zum", a.name]} />

      <section className="section !pt-0" aria-labelledby="weitere-h">
        <div className="wrap">
          <h2 id="weitere-h" className="kicker-text">Weitere Rechtsgebiete</h2>
          <ul className="mt-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/rechtsgebiete/${o.slug}`} className="area-row !py-5">
                  <span className="area-row-title !text-[var(--fs-h3)]">{o.name}</span>
                  <span className="area-row-arrow" aria-hidden><ArrowRight size={20} strokeWidth={1.75} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaForm />
      <JsonLd data={faqLd(a.faq)} />
    </>
  );
}
