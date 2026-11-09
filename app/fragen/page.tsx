import PageHead from "@/components/PageHead";
import Faq from "@/components/Faq";
import CtaForm from "@/components/CtaForm";
import JsonLd from "@/components/JsonLd";
import { areas, faq } from "@/lib/content";
import { faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Häufige Fragen · Anwaltskosten, Termin, Sprache",
  description:
    "Was kostet das Erstgespräch, kann ich Türkisch sprechen, was ist ein Beratungshilfeschein? Antworten der Kanzlei Karakis Güldogan in Hannover-Mühlenberg.",
  path: "/fragen",
});

const all = [...faq, ...areas.flatMap((a) => a.faq.slice(0, 1))];

export default function Page() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "Fragen", path: "/fragen" }]}
        lines={["Was Mandanten", "uns am Telefon fragen."]}
        lead="Kosten, Termine, Sprache, Unterlagen: Die Antworten auf die Fragen, die vor dem ersten Gespräch oft kommen. Ihre ist nicht dabei? Rufen Sie einfach an."
      />
      <Faq items={faq} title={["Rund um", "den Termin"]} />
      <Faq items={areas.flatMap((a) => a.faq.slice(0, 1))} title={["Aus den", "Rechtsgebieten"]} id="faq-gebiete" />
      <CtaForm />
      <JsonLd data={faqLd(all)} />
    </>
  );
}
