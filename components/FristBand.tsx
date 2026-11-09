import Mesh from "./Mesh";
import FristTool from "./FristTool";
import Lines from "./Lines";
import type { FristId } from "@/lib/content";

export default function FristBand({ initial, headingAs = "h2" }: { initial?: FristId; headingAs?: "h1" | "h2" }) {
  return (
    <section className="ink-band grain section" aria-labelledby="frist-h" id="fristen">
      <Mesh />
      <div className="wrap relative z-[1] grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Lines as={headingAs} id="frist-h" className="h2 text-[var(--on-ink)]" lines={["Wie viel Zeit", "bleibt Ihnen?"]} />
          <p className="mt-6 text-[var(--on-ink-2)]" data-reveal="up">
            Viele Schreiben setzen eine Frist, ohne sie zu nennen. Wählen Sie Ihr Schreiben und das Datum, an dem es
            ankam — der Wegweiser rechnet das voraussichtliche Fristende aus, mit Wochenenden und Feiertagen in Niedersachsen.
          </p>
        </div>
        <div className="lg:col-span-8" data-reveal="right">
          <FristTool initial={initial} />
        </div>
      </div>
    </section>
  );
}
