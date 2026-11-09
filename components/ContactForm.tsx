"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ShieldAlert } from "lucide-react";
import { areas, firm, moreAreas } from "@/lib/content";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

const AREA_OPTIONS = [...areas.map((a) => a.name), ...moreAreas.map((m) => m.name), "Weiß ich noch nicht"];

/**
 * Anfrage für ein Erstgespräch. Ohne Server ehrlich umgesetzt:
 * Absenden öffnet eine vorbereitete E-Mail an die Kanzlei.
 */
export default function ContactForm({ idPrefix = "f" }: { idPrefix?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const areaRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("gebiet");
    if (g && AREA_OPTIONS.includes(g) && areaRef.current) areaRef.current.value = g;
  }, []);

  const id = (s: string) => `${idPrefix}-${s}`;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Errors = {};
    if (v("name").length < 2) next.name = "Bitte geben Sie Ihren Namen an, damit wir Sie ansprechen können.";
    if (v("phone").replace(/[^\d]/g, "").length < 6) next.phone = "Bitte eine Telefonnummer angeben, unter der wir Sie zurückrufen können.";
    if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Diese E-Mail-Adresse sieht unvollständig aus — bitte prüfen oder das Feld leer lassen.";
    if (!fd.get("consent")) next.consent = "Bitte bestätigen Sie, dass wir Ihre Angaben für den Rückruf verwenden dürfen.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const body = [
      `Name: ${v("name")}`,
      `Telefon für Rückruf: ${v("phone")}`,
      v("email") && `E-Mail: ${v("email")}`,
      `Rechtsgebiet: ${v("area") || "nicht angegeben"}`,
      `Rückruf am besten: ${v("time")}`,
      v("deadline") && `Frist läuft bis: ${v("deadline")}`,
      "",
      v("message") && `Worum es geht (kurz):\n${v("message")}`,
    ].filter(Boolean).join("\n");
    const subject = `Anfrage Erstgespräch – ${v("area") || "Rechtsfrage"}`;
    window.location.href = `mailto:${firm.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  if (opened) {
    return (
      <div className="form-card" role="status">
        <Mail size={28} strokeWidth={1.5} aria-hidden className="text-[var(--accent-ink)]" />
        <h3 className="h3 mt-4">Ihre E-Mail ist vorbereitet</h3>
        <p className="mt-3 text-[var(--text-2)]">
          Ihr E-Mail-Programm sollte sich mit der fertigen Anfrage geöffnet haben. Bitte dort noch auf
          „Senden“ tippen — erst dann ist die Anfrage bei uns.
        </p>
        <p className="mt-3 text-[var(--text-2)]">
          Es hat sich nichts geöffnet? Schreiben Sie direkt an{" "}
          <a className="link-u font-bold text-[var(--ink)]" href={`mailto:${firm.email}`}>{firm.email}</a> oder rufen Sie an:{" "}
          <a className="link-u font-bold text-[var(--ink)]" href={firm.phoneHref}>{firm.phoneDisplay}</a>.
        </p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setOpened(false)}>Formular erneut öffnen</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form-card" noValidate onSubmit={onSubmit} aria-describedby={id("intro")}>
      <p id={id("intro")} className="form-alert">
        <ShieldAlert size={18} strokeWidth={1.75} aria-hidden />
        <span>Bitte schildern Sie hier noch keine vertraulichen Einzelheiten. Für den Rückruf genügen Name, Telefon und das Rechtsgebiet.</span>
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={id("name")}>Name</label>
          <input id={id("name")} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-err") : undefined} />
          {errors.name && <p id={id("name-err")} className="err">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>Telefon für den Rückruf</label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="z. B. 0511 …" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-err") : undefined} />
          {errors.phone && <p id={id("phone-err")} className="err">{errors.phone}</p>}
        </div>
        <div className="field">
          <label htmlFor={id("area")}>Rechtsgebiet</label>
          <select ref={areaRef} id={id("area")} name="area" defaultValue="">
            <option value="">Bitte wählen</option>
            {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={id("time")}>Rückruf am besten</label>
          <select id={id("time")} name="time" defaultValue="egal">
            <option value="egal">Egal, so bald wie möglich</option>
            <option value="vormittags">Vormittags</option>
            <option value="nachmittags">Nachmittags</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={id("email")}>E-Mail <span className="font-normal text-[var(--text-3)]">(freiwillig)</span></label>
          <input id={id("email")} name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-err") : undefined} />
          {errors.email && <p id={id("email-err")} className="err">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor={id("deadline")}>Läuft eine Frist? <span className="font-normal text-[var(--text-3)]">(freiwillig)</span></label>
          <input id={id("deadline")} name="deadline" type="date" />
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor={id("message")}>Worum geht es, in ein, zwei Sätzen? <span className="font-normal text-[var(--text-3)]">(freiwillig)</span></label>
          <textarea id={id("message")} name="message" maxLength={600} placeholder="z. B. Kündigung am 3. November erhalten, Arbeitgeber mit 25 Beschäftigten" />
        </div>
      </div>
      <div className="field mt-5">
        <label className="!flex cursor-pointer items-start gap-3 !font-normal">
          <input type="checkbox" name="consent" className="mt-1 !min-h-0 h-5 w-5 shrink-0 accent-[var(--accent-ink)]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? id("consent-err") : undefined} />
          <span className="text-[var(--text-2)]">
            Die Kanzlei darf meine Angaben verwenden, um mich zurückzurufen. Mehr in der <Link href="/datenschutz" className="link-u">Datenschutzerklärung</Link>.
          </span>
        </label>
        {errors.consent && <p id={id("consent-err")} className="err">{errors.consent}</p>}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary">
          Anfrage als E-Mail vorbereiten <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
        </button>
        <p className="small text-[var(--text-3)]">Öffnet Ihr E-Mail-Programm mit der fertigen Nachricht.</p>
      </div>
    </form>
  );
}
