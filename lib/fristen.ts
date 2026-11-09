import type { Frist } from "./content";

// Gesetzliche Feiertage in Niedersachsen (für die Verschiebung nach § 193 BGB / § 222 ZPO)
function easter(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export function holidayName(d: Date): string | null {
  const y = d.getFullYear();
  const e = easter(y);
  const rel = (n: number) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + n);
  const list: [Date, string][] = [
    [new Date(y, 0, 1), "Neujahr"],
    [rel(-2), "Karfreitag"],
    [rel(1), "Ostermontag"],
    [new Date(y, 4, 1), "Tag der Arbeit"],
    [rel(39), "Christi Himmelfahrt"],
    [rel(50), "Pfingstmontag"],
    [new Date(y, 9, 3), "Tag der Deutschen Einheit"],
    [new Date(y, 9, 31), "Reformationstag"],
    [new Date(y, 11, 25), "1. Weihnachtstag"],
    [new Date(y, 11, 26), "2. Weihnachtstag"],
  ];
  const hit = list.find(([h]) => key(h) === key(d));
  return hit ? hit[1] : null;
}

export type FristResult = {
  raw: Date;
  end: Date;
  shiftedBecause: string | null;
  daysLeft: number;
};

export function computeFrist(frist: Frist, start: Date, abroad = false, today = new Date()): FristResult {
  let raw: Date;
  if (frist.id === "erbe" && abroad) {
    // sechs Monate: gleicher Tag sechs Monate später, sonst Monatsletzter (§ 188 Abs. 2, 3 BGB)
    const target = new Date(start.getFullYear(), start.getMonth() + 6, 1);
    const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    raw = new Date(target.getFullYear(), target.getMonth(), Math.min(start.getDate(), last));
  } else if (frist.rule.weeks) {
    raw = new Date(start.getFullYear(), start.getMonth(), start.getDate() + frist.rule.weeks * 7);
  } else {
    // Ende des übernächsten Kalendermonats nach Zugang
    raw = new Date(start.getFullYear(), start.getMonth() + (frist.rule.endOfMonthPlus ?? 2) + 1, 0);
  }
  let end = new Date(raw);
  let shiftedBecause: string | null = null;
  for (let guard = 0; guard < 7; guard++) {
    const dow = end.getDay();
    const hol = holidayName(end);
    if (dow === 0 || dow === 6 || hol) {
      shiftedBecause ??= hol ?? (dow === 6 ? "Samstag" : "Sonntag");
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1);
    } else break;
  }
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysLeft = Math.round((end.getTime() - t0.getTime()) / 86400000);
  return { raw, end, shiftedBecause, daysLeft };
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export const toInputValue = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
