import { steps } from "@/lib/content";
import Lines from "./Lines";

export default function Steps() {
  return (
    <section className="section" aria-labelledby="steps-h">
      <div className="wrap">
        <Lines id="steps-h" className="h2 max-w-[20ch]" lines={["So läuft der", "erste Termin."]} />
        <ol className="steps mt-12" data-reveal-group="up">
          {steps.map((s, i) => (
            <li key={s.title} className="step" data-reveal>
              <span className="step-num tabular-nums" aria-hidden>{i + 1}</span>
              <h3 className="h3 mt-5">{s.title}</h3>
              <p className="mt-3 text-[var(--text-2)]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
