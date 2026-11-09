import type { Letter } from "@/lib/content";

/** Ein Schreiben, wie es Mandanten mitbringen — im Code gesetzt, deutlich als Beispiel markiert. */
export default function LetterCard({ letter, compact = false }: { letter: Letter; compact?: boolean }) {
  return (
    <div className={`letter ${compact ? "letter-compact" : ""}`}>
      <div className="letter-head">
        <div>
          <p className="letter-sender" data-l>{letter.sender}</p>
          <p className="letter-sender-line" data-l>{letter.senderLine}</p>
        </div>
        <span className="letter-tag">Beispiel</span>
      </div>
      <p className="letter-subject" data-l>{letter.subject}</p>
      <div className="letter-body">
        <p data-l>Sehr geehrte Damen und Herren,</p>
        {letter.lines.map((l, i) => (
          <p key={i} data-l>{l}</p>
        ))}
        <span className="letter-bars" aria-hidden data-l>
          <i style={{ width: "92%" }} />
          <i style={{ width: "78%" }} />
          <i style={{ width: "64%" }} />
        </span>
      </div>
      <div className="letter-stamp" data-stamp>
        <span className="letter-stamp-mark" aria-hidden>§</span>
        <span>
          <span className="letter-stamp-value">{letter.deadline}</span>
          <span className="letter-stamp-note">{letter.deadlineNote}</span>
        </span>
      </div>
    </div>
  );
}
