import { Phone } from "lucide-react";
import { firm } from "@/lib/content";
import Mesh from "./Mesh";
import ContactForm from "./ContactForm";
import Lines from "./Lines";

export default function CtaForm() {
  return (
    <section className="ink-band grain section" aria-labelledby="cta-h" id="anfrage">
      <Mesh />
      <div className="wrap relative z-[1] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Lines id="cta-h" className="h2 text-[var(--on-ink)]" lines={["Rufen Sie an —", "oder schreiben Sie", "zwei Sätze."]} />
          <p className="mt-6 max-w-[30rem] text-[var(--on-ink-2)]" data-reveal="up">
            Wir melden uns in der Regel am selben oder nächsten Werktag. Läuft eine Frist, sagen Sie es bitte gleich dazu.
          </p>
          <a href={firm.phoneHref} className="cta-phone" data-reveal="up">
            <Phone size={22} strokeWidth={1.5} aria-hidden />
            <span className="tabular-nums">{firm.phoneDisplay}</span>
          </a>
          <p className="mt-3 text-[var(--on-ink-2)]" data-reveal="up">
            {firm.street}, {firm.zip} {firm.city} · {firm.hours}
          </p>
        </div>
        <div className="lg:col-span-7" data-reveal="up">
          <ContactForm idPrefix="cta" />
        </div>
      </div>
    </section>
  );
}
