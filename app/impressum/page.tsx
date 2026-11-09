import { TriangleAlert } from "lucide-react";
import PageHead from "@/components/PageHead";
import { firm } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Impressum", description: "Impressum der Rechtsanwaltskanzlei Karakis Güldogan, Hannover.", path: "/impressum" });

export default function Page() {
  return (
    <>
      <PageHead crumbs={[{ name: "Impressum", path: "/impressum" }]} lines={["Impressum"]} />
      <section className="section">
        <div className="wrap legal-text">
          <p className="placeholder-note"><TriangleAlert size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden /><span><strong>Platzhalter:</strong> Der geprüfte Impressumstext (u. a. zuständige Rechtsanwaltskammer, berufsrechtliche Regelungen, Berufshaftpflichtversicherung) wird vor Veröffentlichung ergänzt. Die Angaben unten stammen von der bisherigen Website.</span></p>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>{firm.name}<br />{firm.role} {firm.lawyer}<br />{firm.street}<br />{firm.zip} {firm.city}</p>
          <h2>Kontakt</h2>
          <p>Telefon {firm.phoneDisplay}<br />Fax {firm.fax}<br />E-Mail {firm.email}</p>
          <h2>Berufsbezeichnung</h2>
          <p>Rechtsanwältin, verliehen in der Bundesrepublik Deutschland.</p>
          <h2>Zuständige Kammer, Berufsrecht, Versicherung</h2>
          <p>[Wird ergänzt]</p>
          <h2>Umsatzsteuer</h2>
          <p>[Steuernummer bzw. USt-IdNr. wird ergänzt]</p>
        </div>
      </section>
    </>
  );
}
