import { Plus } from "lucide-react";
import Lines from "./Lines";

export default function Faq({ items, title = ["Was Mandanten", "vorher fragen."], headingAs = "h2", id = "faq-h" }: { items: { q: string; a: string }[]; title?: string[]; headingAs?: "h1" | "h2"; id?: string }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <Lines as={headingAs} id={id} className="h2" lines={title} />
        </div>
        <div className="md:col-span-7 lg:col-span-8" data-reveal-group="up">
          {items.map((f) => (
            <details key={f.q} className="faq" data-reveal>
              <summary>
                <span>{f.q}</span>
                <Plus size={22} strokeWidth={1.75} className="faq-icon" aria-hidden />
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
