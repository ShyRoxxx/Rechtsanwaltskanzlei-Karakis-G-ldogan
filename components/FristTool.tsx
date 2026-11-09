"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Info } from "lucide-react";
import { fristen, type FristId } from "@/lib/content";
import { computeFrist, fmtDate, toInputValue } from "@/lib/fristen";

/**
 * Fristen-Wegweiser: Schreiben wählen, Datum eingeben, Frist sehen.
 * Reine Orientierung im Browser — es wird nichts gespeichert oder versendet.
 */
export default function FristTool({ initial = "kuendigung" as FristId }: { initial?: FristId }) {
  const [id, setId] = useState<FristId>(initial);
  const [date, setDate] = useState<string>("");
  const [abroad, setAbroad] = useState(false);
  const frist = fristen.find((f) => f.id === id)!;

  const result = useMemo(() => {
    if (!date) return null;
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return null;
    return computeFrist(frist, new Date(y, m - 1, d), abroad);
  }, [date, frist, abroad]);

  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateRef.current) dateRef.current.max = toInputValue(new Date());
  }, []);
  const tone = !result ? "idle" : result.daysLeft < 0 ? "over" : result.daysLeft <= 5 ? "soon" : "ok";

  return (
    <div className="frist">
      <fieldset className="frist-choices">
        <legend className="frist-legend">1 · Welches Schreiben haben Sie bekommen?</legend>
        <div className="frist-chips">
          {fristen.map((f) => (
            <label key={f.id} className="frist-chip" data-on={f.id === id || undefined}>
              <input type="radio" name="frist" value={f.id} checked={f.id === id} onChange={() => setId(f.id)} className="sr-only" />
              {f.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="frist-row">
        <div className="frist-date">
          <label htmlFor="frist-datum" className="frist-legend">2 · {frist.start}</label>
          <div className="frist-input">
            <CalendarDays size={18} strokeWidth={1.75} aria-hidden />
            <input ref={dateRef} id="frist-datum" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          {id === "erbe" && (
            <label className="frist-check">
              <input type="checkbox" checked={abroad} onChange={(e) => setAbroad(e.target.checked)} />
              <span>Der Verstorbene lebte nur im Ausland, oder ich war bei Fristbeginn im Ausland</span>
            </label>
          )}
        </div>

        <output className="frist-result" data-tone={tone} htmlFor="frist-datum" aria-live="polite">
          {result ? (
            <>
              <span className="frist-result-label">
                {result.daysLeft < 0 ? "Diese Frist ist voraussichtlich abgelaufen seit" : "Voraussichtliches Fristende"}
              </span>
              <span className="frist-result-date">{fmtDate(result.end)}</span>
              <span className="frist-result-days">
                {result.daysLeft > 1 && `noch ${result.daysLeft} Tage`}
                {result.daysLeft === 1 && "noch 1 Tag — morgen"}
                {result.daysLeft === 0 && "heute ist der letzte Tag"}
                {result.daysLeft < 0 && "Rufen Sie trotzdem an — manchmal gibt es noch Wege."}
              </span>
              <span className="frist-result-what">
                {frist.what} ({frist.basis}).
                {result.shiftedBecause && ` Das rechnerische Ende fiel auf einen ${result.shiftedBecause === "Samstag" || result.shiftedBecause === "Sonntag" ? result.shiftedBecause : `Feiertag (${result.shiftedBecause})`} und verschiebt sich auf den nächsten Werktag.`}
              </span>
            </>
          ) : (
            <>
              <span className="frist-result-label">Fristende</span>
              <span className="frist-result-date frist-result-empty">Datum eingeben</span>
              <span className="frist-result-what">{frist.what} ({frist.basis}).</span>
            </>
          )}
        </output>
      </div>

      <div className="frist-foot">
        <p className="frist-note">
          <Info size={16} strokeWidth={1.75} aria-hidden />
          <span>
            Unverbindliche Orientierung, keine Rechtsberatung. Maßgeblich ist der tatsächliche Zugang; Sonderfälle
            verschieben Fristen. Ihre Eingabe bleibt in Ihrem Browser.
          </span>
        </p>
        <Link href={`/kontakt?gebiet=${encodeURIComponent(frist.area)}#anfrage`} className="btn btn-accent">
          Frist prüfen lassen <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
