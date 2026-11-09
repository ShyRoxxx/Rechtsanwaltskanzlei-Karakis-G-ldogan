import { TriangleAlert } from "lucide-react";
import PageHead from "@/components/PageHead";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Datenschutz", description: "Datenschutzerklärung der Rechtsanwaltskanzlei Karakis Güldogan, Hannover.", path: "/datenschutz" });

export default function Page() {
  return (
    <>
      <PageHead crumbs={[{ name: "Datenschutz", path: "/datenschutz" }]} lines={["Datenschutz"]} />
      <section className="section">
        <div className="wrap legal-text">
          <p className="placeholder-note"><TriangleAlert size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden /><span><strong>Platzhalter:</strong> Die vollständige, geprüfte Datenschutzerklärung wird vor Veröffentlichung eingesetzt. Die folgenden Punkte beschreiben, wie diese Website technisch aufgebaut ist.</span></p>
          <h2>Kein Tracking, keine Cookies</h2>
          <p>Diese Website setzt keine Cookies, keine Analyse-Werkzeuge und keine Inhalte von Drittanbietern ein. Schriften und Karten werden von unserem eigenen Server ausgeliefert.</p>
          <h2>Kartendarstellung</h2>
          <p>Die Karten sind Bilder, die einmalig aus Daten von OpenStreetMap erstellt wurden (© OpenStreetMap-Mitwirkende, ODbL). Beim Aufruf der Seite wird keine Verbindung zu OpenStreetMap oder Google aufgebaut. Erst wenn Sie „Route planen“ anklicken, öffnet sich Google Maps.</p>
          <h2>Anfrageformular</h2>
          <p>Das Formular verschickt selbst keine Daten. Es bereitet eine E-Mail in Ihrem E-Mail-Programm vor, die Sie selbst absenden. Bitte schildern Sie dort keine vertraulichen Einzelheiten.</p>
          <h2>Fristen-Wegweiser</h2>
          <p>Die Berechnung findet ausschließlich in Ihrem Browser statt. Eingaben werden weder gespeichert noch übertragen.</p>
          <h2>Verantwortliche Stelle, Ihre Rechte</h2>
          <p>[Wird ergänzt]</p>
        </div>
      </section>
    </>
  );
}
