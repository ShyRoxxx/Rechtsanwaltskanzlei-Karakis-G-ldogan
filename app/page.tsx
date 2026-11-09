import Hero from "@/components/Hero";
import AreasLetter from "@/components/AreasLetter";
import KanzleiIntro from "@/components/KanzleiIntro";
import FristBand from "@/components/FristBand";
import Steps from "@/components/Steps";
import Location from "@/components/Location";
import Faq from "@/components/Faq";
import CtaForm from "@/components/CtaForm";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/lib/content";
import { faqLd } from "@/lib/seo";

export const metadata = {
  title: { absolute: "Rechtsanwältin Hannover-Ricklingen · Kanzlei Karakis Güldogan" },
  description:
    "Rechtsanwältin Penbe Güldogan am Mühlenberger Markt, Hannover: Arbeits-, Familien-, Verkehrs-, Miet- und Erbrecht. Beratung auf Deutsch und Türkisch — jetzt anrufen.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AreasLetter />
      <KanzleiIntro />
      <FristBand />
      <Steps />
      <Location />
      <Faq items={faq} />
      <CtaForm />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
