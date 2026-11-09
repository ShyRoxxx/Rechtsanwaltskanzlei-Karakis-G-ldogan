// Alle Inhalte der Website an einer Stelle. Ein Textwechsel ist eine Zeile hier.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rechtsanwaltskanzlei-karakis.demo.bilbaoconsulting.com";

export const firm = {
  name: "Rechtsanwaltskanzlei Karakis Güldogan",
  short: "Kanzlei Karakis Güldogan",
  lawyer: "Penbe Güldogan",
  role: "Rechtsanwältin",
  street: "Mühlenbergzentrum 8",
  zip: "30457",
  city: "Hannover",
  district: "Mühlenberg",
  borough: "Ricklingen",
  phone: "+49 511 5390756",
  phoneDisplay: "0511 539 07 56",
  phoneHref: "tel:+495115390756",
  fax: "0511 539 07 54",
  mobile: "0163 718 31 36",
  mobileHref: "tel:+491637183136",
  email: "info@ra-gueldogan.de",
  hours: "Termin nach Vereinbarung",
  geo: { lat: 52.340881, lng: 9.692455 },
  rating: { value: "4,2", count: 6 },
  mapsUrl: "https://maps.google.com/?cid=9141833119119388758",
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=M%C3%BChlenbergzentrum+8%2C+30457+Hannover",
  languages: ["Deutsch", "Türkisch"],
} as const;

export const nav = [
  { href: "/rechtsgebiete", label: "Rechtsgebiete" },
  { href: "/kanzlei", label: "Kanzlei" },
  { href: "/fristen", label: "Fristen" },
  { href: "/fragen", label: "Fragen" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export type Letter = {
  sender: string;
  senderLine: string;
  subject: string;
  lines: string[];
  deadline: string;
  deadlineNote: string;
};

export type Area = {
  slug: string;
  name: string;
  teaser: string;
  summary: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  cases: string[];
  process: string;
  costs: string;
  letter: Letter;
  faq: { q: string; a: string }[];
  fristId?: FristId;
};

export const areas: Area[] = [
  {
    slug: "arbeitsrecht",
    name: "Arbeitsrecht",
    teaser: "Kündigung, Abmahnung, Zeugnis, ausstehender Lohn",
    summary:
      "Eine Kündigung lässt sich nur innerhalb von drei Wochen gerichtlich angreifen. Wir prüfen, ob sie wirksam ist, ob eine Abfindung realistisch ist und was im Aufhebungsvertrag fehlt — bevor Sie etwas unterschreiben.",
    title: "Arbeitsrecht Hannover · Kündigung prüfen lassen",
    description:
      "Kündigung, Abmahnung oder Aufhebungsvertrag? Rechtsanwältin Penbe Güldogan in Hannover-Mühlenberg prüft schnell — die Klagefrist beträgt nur drei Wochen.",
    h1: "Arbeitsrecht in Hannover: Kündigung, Abmahnung, Lohn",
    intro: [
      "Im Arbeitsrecht entscheidet oft die erste Woche. Wer eine Kündigung erhält, hat nach § 4 Kündigungsschutzgesetz drei Wochen Zeit, Kündigungsschutzklage beim Arbeitsgericht zu erheben. Danach gilt die Kündigung in aller Regel als wirksam — auch wenn sie es eigentlich nicht war.",
      "Wir vertreten Arbeitnehmerinnen und Arbeitnehmer aus Hannover und Umgebung, ebenso kleine Betriebe und Familienunternehmen, die einen Arbeitsvertrag aufsetzen oder eine Trennung sauber regeln möchten. Gerade in Branchen mit vielen Minijobs, Schichtarbeit und mündlichen Absprachen lohnt ein genauer Blick auf das, was tatsächlich vereinbart wurde.",
    ],
    cases: [
      "Kündigung erhalten: Prüfung der Wirksamkeit, Kündigungsschutzklage, Verhandlung über eine Abfindung",
      "Aufhebungsvertrag vorgelegt: Was steht drin, was fehlt, droht eine Sperrzeit beim Arbeitslosengeld?",
      "Abmahnung: Gegendarstellung, Entfernung aus der Personalakte",
      "Lohn, Überstunden oder Urlaub nicht bezahlt: außergerichtliche Forderung und Klage",
      "Arbeitszeugnis: Formulierungen verstehen und berichtigen lassen",
      "Für Betriebe: Arbeitsverträge, Kündigungen rechtssicher formulieren",
    ],
    process:
      "Bringen Sie die Kündigung mit dem Briefumschlag mit — das Zugangsdatum zählt. Dazu Arbeitsvertrag, die letzten Lohnabrechnungen und Abmahnungen, falls vorhanden. Im ersten Gespräch klären wir, ob eine Klage Aussicht hat und welches Ziel realistisch ist: Weiterbeschäftigung oder eine Abfindung.",
    costs:
      "In der ersten Instanz vor dem Arbeitsgericht trägt jede Seite ihre Anwaltskosten selbst, unabhängig vom Ausgang (§ 12a Arbeitsgerichtsgesetz). Viele Rechtsschutzversicherungen übernehmen Arbeitsrechtsfälle; die Deckungsanfrage stellen wir für Sie.",
    letter: {
      sender: "Muster Logistik GmbH",
      senderLine: "Personalabteilung · Hannover",
      subject: "Kündigung des Arbeitsverhältnisses",
      lines: [
        "hiermit kündigen wir das mit Ihnen bestehende Arbeitsverhältnis ordentlich und fristgerecht zum nächstmöglichen Termin.",
        "Bitte geben Sie Arbeitsmittel und Schlüssel bis zum letzten Arbeitstag zurück.",
      ],
      deadline: "3 Wochen",
      deadlineNote: "für die Kündigungsschutzklage ab Zugang",
    },
    faq: [
      {
        q: "Steht mir nach einer Kündigung automatisch eine Abfindung zu?",
        a: "Nein. Einen gesetzlichen Anspruch gibt es nur in Ausnahmefällen. In der Praxis wird eine Abfindung meist im Kündigungsschutzverfahren ausgehandelt — deshalb ist die Klage innerhalb der drei Wochen so wichtig.",
      },
      {
        q: "Soll ich den Aufhebungsvertrag sofort unterschreiben?",
        a: "Unterschreiben Sie nichts unter Zeitdruck. Ein Aufhebungsvertrag kann eine Sperrzeit beim Arbeitslosengeld auslösen. Lassen Sie ihn vorher prüfen — das dauert meist nur einen Termin.",
      },
      {
        q: "Gilt der Kündigungsschutz auch im Kleinbetrieb?",
        a: "Das Kündigungsschutzgesetz greift erst ab mehr als zehn Beschäftigten und nach sechs Monaten Betriebszugehörigkeit. Auch im Kleinbetrieb kann eine Kündigung aber unwirksam sein, etwa bei Schwangerschaft oder Formfehlern.",
      },
    ],
    fristId: "kuendigung",
  },
  {
    slug: "familienrecht",
    name: "Familienrecht",
    teaser: "Trennung, Scheidung, Unterhalt, Sorge- und Umgangsrecht",
    summary:
      "Trennung, Scheidung, Unterhalt und das Sorgerecht für die Kinder — auch dann, wenn die Ehe in der Türkei oder einem anderen Land geschlossen wurde. Wir klären, welches Recht gilt, und führen Sie ruhig durch das Verfahren.",
    title: "Familienrecht Hannover · Scheidung & Unterhalt",
    description:
      "Scheidung, Unterhalt, Sorgerecht — auch bei Ehen aus der Türkei. Familienrecht bei Rechtsanwältin Penbe Güldogan in Hannover-Mühlenberg. Beratung auf Deutsch und Türkisch.",
    h1: "Familienrecht in Hannover: Trennung, Scheidung, Unterhalt",
    intro: [
      "Eine Trennung ist selten nur eine Rechtsfrage. Trotzdem hängt viel davon ab, dass die rechtlichen Schritte in der richtigen Reihenfolge passieren: Trennungsjahr, Unterhalt, Wohnung, Kinder, Versorgungsausgleich. Wir ordnen das mit Ihnen und vertreten Sie vor dem Familiengericht beim Amtsgericht Hannover.",
      "Viele unserer Mandantinnen und Mandanten haben in der Türkei oder einem arabischen Land geheiratet oder besitzen zwei Staatsangehörigkeiten. Dann stellt sich zuerst die Frage, welches Recht gilt und ob ein deutsches Urteil auch im Heimatland anerkannt wird. Diese Fragen klären wir gleich zu Beginn — im Gespräch auf Deutsch oder Türkisch.",
    ],
    cases: [
      "Scheidung, auch bei Eheschließung im Ausland, und Anerkennung ausländischer Scheidungen",
      "Kindesunterhalt, Trennungsunterhalt und nachehelicher Unterhalt — Berechnung und Durchsetzung",
      "Sorgerecht und Umgangsrecht, Begleitung bei Gesprächen mit dem Jugendamt",
      "Zugewinnausgleich und Aufteilung von Hausrat und Ehewohnung",
      "Gewaltschutz: schnelle Anordnungen beim Familiengericht",
      "Eheverträge und Scheidungsfolgenvereinbarungen",
    ],
    process:
      "Für das erste Gespräch genügen Heiratsurkunde, Geburtsurkunden der Kinder und, falls es um Unterhalt geht, Einkommensnachweise der letzten zwölf Monate. Wir besprechen, was jetzt zu regeln ist und was bis nach dem Trennungsjahr warten kann.",
    costs:
      "Die Kosten einer Scheidung richten sich nach dem Verfahrenswert, der vor allem aus dem Einkommen beider Ehegatten berechnet wird. Wer die Kosten nicht tragen kann, erhält unter Umständen Verfahrenskostenhilfe — den Antrag stellen wir mit Ihnen.",
    letter: {
      sender: "Amtsgericht Hannover",
      senderLine: "Familiengericht",
      subject: "Scheidungsantrag Ihres Ehegatten — Zustellung",
      lines: [
        "in der Familiensache wird Ihnen der beigefügte Antrag auf Scheidung der Ehe zugestellt.",
        "Sie erhalten Gelegenheit zur Stellungnahme. Für die Scheidung selbst besteht Anwaltszwang.",
      ],
      deadline: "Frist laut Schreiben",
      deadlineNote: "meist zwei bis vier Wochen zur Stellungnahme",
    },
    faq: [
      {
        q: "Kann ich mich in Deutschland scheiden lassen, wenn wir in der Türkei geheiratet haben?",
        a: "In aller Regel ja, wenn einer von Ihnen seinen gewöhnlichen Aufenthalt in Deutschland hat. Welches Scheidungsrecht angewendet wird, richtet sich nach der Rom-III-Verordnung; das prüfen wir im ersten Gespräch.",
      },
      {
        q: "Brauchen beide Ehegatten einen Anwalt?",
        a: "Den Scheidungsantrag kann nur ein Anwalt stellen. Der andere Ehegatte braucht nicht zwingend einen eigenen Anwalt, wenn er nur zustimmen und keine eigenen Anträge stellen möchte.",
      },
      {
        q: "Wie viel Unterhalt bekommen die Kinder?",
        a: "Der Kindesunterhalt richtet sich nach der Düsseldorfer Tabelle, also nach dem Einkommen des unterhaltspflichtigen Elternteils und dem Alter des Kindes. Wir rechnen das mit Ihren Zahlen konkret aus.",
      },
    ],
  },
  {
    slug: "verkehrsrecht",
    name: "Verkehrsrecht",
    teaser: "Bußgeldbescheid, Fahrverbot, Unfall, Punkte",
    summary:
      "Gegen einen Bußgeldbescheid bleiben zwei Wochen für den Einspruch. Wir sehen die Akte ein, prüfen Messung und Verfahren und regulieren nach einem Unfall den Schaden mit der gegnerischen Versicherung.",
    title: "Verkehrsrecht Hannover · Bußgeldbescheid Einspruch",
    description:
      "Bußgeldbescheid, Fahrverbot oder Unfall in Hannover? Verkehrsrecht bei Rechtsanwältin Penbe Güldogan: Akteneinsicht, Einspruch innerhalb von zwei Wochen, Schadensregulierung.",
    h1: "Verkehrsrecht in Hannover: Bußgeld, Fahrverbot, Unfall",
    intro: [
      "Wer beruflich auf das Auto angewiesen ist, für den kann ein Monat Fahrverbot schwerer wiegen als das Bußgeld. Gegen einen Bußgeldbescheid können Sie innerhalb von zwei Wochen nach Zustellung Einspruch einlegen (§ 67 OWiG). Ist die Frist verstrichen, wird der Bescheid rechtskräftig.",
      "Wir beantragen Akteneinsicht, prüfen, ob Messgerät, Eichung und Fahreridentifizierung stimmen, und beraten Sie, ob sich der Einspruch lohnt. Nach einem Verkehrsunfall sorgen wir dafür, dass die gegnerische Haftpflichtversicherung Reparatur, Gutachten, Nutzungsausfall und gegebenenfalls Schmerzensgeld vollständig bezahlt.",
    ],
    cases: [
      "Bußgeldbescheid und Anhörungsbogen: Akteneinsicht, Einspruch, Verhandlung vor dem Amtsgericht",
      "Fahrverbot: Möglichkeiten, das Fahrverbot abzuwenden oder den Zeitpunkt zu wählen",
      "Punkte in Flensburg und drohender Entzug der Fahrerlaubnis",
      "Verkehrsunfall: Schadensregulierung mit der gegnerischen Versicherung",
      "Unfall mit Auslandsbezug, etwa mit einem Fahrzeug mit ausländischem Kennzeichen",
    ],
    process:
      "Bringen Sie den Bußgeldbescheid samt Umschlag mit, bei einem Unfall Fotos, Namen von Zeugen und die Daten der Gegenseite. Den Anhörungsbogen müssen Sie nur zur Person ausfüllen — zur Sache sagen Sie besser erst nach der Akteneinsicht etwas.",
    costs:
      "Bei einem unverschuldeten Unfall muss die gegnerische Versicherung in der Regel auch Ihre Anwaltskosten übernehmen. Im Bußgeldverfahren tritt häufig die Verkehrsrechtsschutzversicherung ein.",
    letter: {
      sender: "Bußgeldstelle",
      senderLine: "Verkehrsordnungswidrigkeiten",
      subject: "Bußgeldbescheid",
      lines: [
        "Ihnen wird vorgeworfen, die zulässige Höchstgeschwindigkeit außerorts um 27 km/h überschritten zu haben.",
        "Geldbuße 150,00 € zzgl. Gebühren und Auslagen · Eintragung: 1 Punkt",
      ],
      deadline: "2 Wochen",
      deadlineNote: "für den Einspruch ab Zustellung",
    },
    faq: [
      {
        q: "Lohnt sich ein Einspruch überhaupt?",
        a: "Das lässt sich erst nach Akteneinsicht seriös sagen. Häufig finden sich Fehler bei der Messung oder der Identifizierung. Mit Rechtsschutzversicherung ist das Kostenrisiko gering.",
      },
      {
        q: "Muss ich den Anhörungsbogen ausfüllen?",
        a: "Angaben zur Person sind Pflicht, Angaben zur Sache nicht. Äußern Sie sich zum Vorwurf erst, wenn wir die Akte gesehen haben.",
      },
      {
        q: "Wer zahlt nach einem unverschuldeten Unfall meinen Anwalt?",
        a: "Die Anwaltskosten gehören zum Schaden und werden in der Regel von der Haftpflichtversicherung des Unfallgegners übernommen.",
      },
    ],
    fristId: "bussgeld",
  },
  {
    slug: "mietrecht",
    name: "Mietrecht",
    teaser: "Mieterhöhung, Kündigung, Nebenkosten, Wohnungseigentum",
    summary:
      "Mieterhöhung, Nebenkostenabrechnung, Eigenbedarfskündigung oder Mängel in der Wohnung: Wir prüfen Ihr Schreiben und sagen, was Sie zahlen müssen — und was nicht. Auch für Vermieter und Wohnungseigentümer.",
    title: "Mietrecht Hannover · Mieterhöhung & Kündigung",
    description:
      "Mieterhöhung, Nebenkosten, Eigenbedarf oder WEG-Streit? Mietrecht und Wohnungseigentumsrecht bei Rechtsanwältin Penbe Güldogan in Hannover-Mühlenberg.",
    h1: "Mietrecht und Wohnungseigentum in Hannover",
    intro: [
      "Rund um den Mühlenberg wohnen die meisten Menschen zur Miete, viele in großen Wohnanlagen. Entsprechend häufig landen Mieterhöhungen, Nebenkostenabrechnungen und Modernisierungsankündigungen auf dem Tisch. Nicht jede Forderung ist berechtigt: Eine Mieterhöhung muss begründet sein, etwa mit dem Mietspiegel der Landeshauptstadt Hannover, und die Kappungsgrenze einhalten.",
      "Wir beraten Mieterinnen und Mieter ebenso wie private Vermieter. Im Wohnungseigentumsrecht vertreten wir Eigentümer bei Streit um Beschlüsse der Eigentümerversammlung, Sonderumlagen und die Abrechnung der Verwaltung.",
    ],
    cases: [
      "Mieterhöhung: Prüfung der Begründung, der Kappungsgrenze und der Zustimmungsfrist",
      "Nebenkostenabrechnung: Fristen, umlagefähige Kosten, Rückforderung",
      "Kündigung wegen Eigenbedarf oder Zahlungsverzug, Räumungsklage",
      "Mängel und Mietminderung, Schimmel, Heizungsausfall",
      "Kaution: Rückzahlung nach Auszug",
      "Wohnungseigentum: Anfechtung von Beschlüssen, Sonderumlagen, Hausgeld",
    ],
    process:
      "Bringen Sie den Mietvertrag, das aktuelle Schreiben und, wenn es um Nebenkosten geht, die Abrechnungen der letzten beiden Jahre mit. Zahlen oder unterschreiben Sie nichts, bevor wir es gesehen haben — das gilt besonders für eine Zustimmung zur Mieterhöhung.",
    costs:
      "Die Kosten richten sich nach dem Streitwert, bei Mieterhöhungen etwa nach dem Jahresbetrag der Erhöhung. Mietrechtsschutz ist in vielen Versicherungen enthalten; die Anfrage übernehmen wir.",
    letter: {
      sender: "Hausverwaltung",
      senderLine: "Wohnanlage Mühlenberg",
      subject: "Mieterhöhung auf die ortsübliche Vergleichsmiete",
      lines: [
        "gemäß § 558 BGB bitten wir Sie um Zustimmung zur Erhöhung der Nettokaltmiete um 48,20 € monatlich.",
        "Zur Begründung verweisen wir auf den Mietspiegel der Landeshauptstadt Hannover.",
      ],
      deadline: "Ende des 2. Monats",
      deadlineNote: "nach Zugang — so lange können Sie überlegen",
    },
    faq: [
      {
        q: "Muss ich einer Mieterhöhung sofort zustimmen?",
        a: "Nein. Sie haben bis zum Ende des zweiten Kalendermonats nach Zugang Zeit zu überlegen. Erst danach kann der Vermieter auf Zustimmung klagen.",
      },
      {
        q: "Bis wann muss die Nebenkostenabrechnung kommen?",
        a: "Spätestens zwölf Monate nach Ende des Abrechnungszeitraums. Kommt sie später, kann der Vermieter Nachzahlungen in der Regel nicht mehr verlangen.",
      },
      {
        q: "Vertreten Sie auch Vermieter?",
        a: "Ja, wir beraten auch private Vermieter, etwa bei Mieterhöhungen, Zahlungsrückständen oder einer Kündigung.",
      },
    ],
    fristId: "mieterhoehung",
  },
  {
    slug: "erbrecht",
    name: "Erbrecht",
    teaser: "Testament, Erbschein, Pflichtteil, Erbe im Ausland",
    summary:
      "Ein Erbe kann man nur sechs Wochen lang ausschlagen — bei Wohnsitz im Ausland sechs Monate. Wir helfen bei Erbschein, Pflichtteil und Testament und bei Nachlässen, zu denen eine Wohnung in der Türkei gehört.",
    title: "Erbrecht Hannover · Erbschein, Pflichtteil, Ausland",
    description:
      "Erbe ausschlagen, Pflichtteil, Erbschein oder Nachlass in der Türkei? Erbrecht bei Rechtsanwältin Penbe Güldogan in Hannover — die Ausschlagungsfrist beträgt sechs Wochen.",
    h1: "Erbrecht in Hannover — auch mit Nachlass im Ausland",
    intro: [
      "Nach einem Todesfall kommen in kurzer Zeit viele Schreiben: vom Nachlassgericht, von Banken, manchmal von Gläubigern. Wer ein überschuldetes Erbe nicht annehmen will, muss es innerhalb von sechs Wochen ausschlagen, nachdem er vom Erbfall und vom Grund seiner Berufung erfahren hat (§ 1944 BGB). Lebte der Verstorbene nur im Ausland oder halten Sie sich bei Fristbeginn im Ausland auf, beträgt die Frist sechs Monate.",
      "Viele Familien in Hannover haben Vermögen in zwei Ländern: das Konto hier, die Wohnung in der Türkei. Seit der Europäischen Erbrechtsverordnung gilt grundsätzlich das Recht des letzten gewöhnlichen Aufenthalts — für Immobilien in der Türkei gelten aber eigene Regeln. Wir prüfen, welches Recht anzuwenden ist, und begleiten Sie durch das Verfahren beim Nachlassgericht.",
    ],
    cases: [
      "Erbschein beantragen und Nachlass ordnen",
      "Erbe ausschlagen, wenn Schulden drohen",
      "Pflichtteil berechnen und durchsetzen",
      "Testament und Erbvertrag gestalten, auch bei Vermögen in mehreren Ländern",
      "Erbengemeinschaft: Auseinandersetzung, Verkauf, Streit unter Geschwistern",
      "Nachlass mit Bezug zur Türkei oder zu arabischen Ländern",
    ],
    process:
      "Hilfreich sind Sterbeurkunde, ein vorhandenes Testament, Schreiben des Nachlassgerichts und eine grobe Übersicht über Konten, Immobilien und Schulden. Liegen Dokumente nur auf Türkisch vor, sprechen wir sie gemeinsam durch.",
    costs:
      "Die Kosten richten sich nach dem Wert des Nachlasses beziehungsweise des Pflichtteils. Für die erste Beratung eines Verbrauchers ist die Gebühr gesetzlich auf höchstens 190 Euro zuzüglich Umsatzsteuer begrenzt (§ 34 RVG).",
    letter: {
      sender: "Amtsgericht Hannover",
      senderLine: "Nachlassgericht",
      subject: "Eröffnung einer Verfügung von Todes wegen",
      lines: [
        "in der Nachlasssache übersenden wir Ihnen eine Abschrift des eröffneten Testaments.",
        "Sie sind darin als Erbin bzw. Erbe benannt.",
      ],
      deadline: "6 Wochen",
      deadlineNote: "zur Ausschlagung — 6 Monate bei Auslandsbezug",
    },
    faq: [
      {
        q: "Wie schlage ich ein Erbe aus?",
        a: "Durch Erklärung gegenüber dem Nachlassgericht, persönlich zur Niederschrift oder in öffentlich beglaubigter Form. Ein einfacher Brief genügt nicht. Wir sagen Ihnen, welches Gericht zuständig ist und was mitzubringen ist.",
      },
      {
        q: "Welches Recht gilt, wenn mein Vater in Hannover lebte, aber eine Wohnung in der Türkei hatte?",
        a: "Für den Nachlass gilt grundsätzlich deutsches Recht, weil er zuletzt in Deutschland lebte. Für die Immobilie in der Türkei wendet das türkische Recht aber eigene Regeln an. Das muss im Einzelfall geprüft werden.",
      },
      {
        q: "Wie hoch ist der Pflichtteil?",
        a: "Der Pflichtteil beträgt die Hälfte des gesetzlichen Erbteils und ist ein Geldanspruch gegen die Erben. Er verjährt in drei Jahren ab Ende des Jahres, in dem Sie vom Erbfall und von der Enterbung erfahren haben.",
      },
    ],
    fristId: "erbe",
  },
];

export const moreAreas = [
  {
    name: "Zivilrecht",
    text: "Kaufverträge, Werkverträge, offene Rechnungen, Mahnbescheide, Schadensersatz. Wir setzen Forderungen außergerichtlich und vor Gericht durch und wehren unberechtigte Forderungen ab — für Privatleute ebenso wie für kleine Betriebe und Familienunternehmen.",
  },
  {
    name: "Wohnungseigentumsrecht",
    text: "Beschlüsse der Eigentümerversammlung, Hausgeld, Sonderumlagen, Streit mit der Verwaltung oder Nachbarn in der Anlage. Eine Beschlussanfechtung muss innerhalb eines Monats erhoben werden.",
  },
  {
    name: "Medienrecht",
    text: "Unerlaubt veröffentlichte Fotos, beleidigende Beiträge in sozialen Netzwerken, Abmahnungen wegen Urheberrechtsverletzungen. Wir prüfen Unterlassungsansprüche und wehren überhöhte Abmahnforderungen ab.",
  },
];

export const steps = [
  {
    title: "Anrufen oder Anfrage senden",
    text: "Sie schildern in zwei Sätzen, worum es geht und ob eine Frist läuft. Wir vereinbaren einen Termin in der Kanzlei — bei laufender Frist kurzfristig.",
  },
  {
    title: "Unterlagen mitbringen",
    text: "Das Schreiben samt Briefumschlag, Verträge und alles, was Sie schon unternommen haben. Dokumente auf Türkisch sind kein Hindernis.",
  },
  {
    title: "Einschätzung und Kosten",
    text: "Sie erfahren, wie wir die Lage sehen, welche Schritte sinnvoll sind und was sie kosten. Erst dann entscheiden Sie, ob wir für Sie tätig werden.",
  },
];

export const faq = [
  {
    q: "Was kostet das erste Gespräch?",
    a: "Für Verbraucher ist die Gebühr einer ersten Beratung gesetzlich auf höchstens 190 Euro zuzüglich Umsatzsteuer begrenzt (§ 34 RVG). Den genauen Betrag nennen wir Ihnen vorab am Telefon. Mit Rechtsschutzversicherung oder Beratungshilfeschein kann die Beratung für Sie günstiger oder kostenfrei sein.",
  },
  {
    q: "Kann ich das Gespräch auf Türkisch führen?",
    a: "Ja. Rechtsanwältin Penbe Güldogan berät auf Deutsch und auf Türkisch. Sie müssen keine Übersetzerin mitbringen.",
  },
  {
    q: "Haben Sie feste Sprechzeiten?",
    a: "Termine vergeben wir nach Vereinbarung, damit Sie nicht warten müssen. Rufen Sie an unter 0511 539 07 56 oder schicken Sie uns eine Anfrage — läuft eine Frist, sagen Sie es gleich dazu.",
  },
  {
    q: "Ich habe nur wenig Geld. Kann ich trotzdem zu Ihnen kommen?",
    a: "Ja. Mit einem Beratungshilfeschein vom Amtsgericht zahlen Sie für die Beratung nur einen geringen Eigenanteil. Für ein Gerichtsverfahren gibt es Prozess- bzw. Verfahrenskostenhilfe; die Anträge stellen wir mit Ihnen.",
  },
  {
    q: "Wie finde ich die Kanzlei?",
    a: "Die Kanzlei liegt im Mühlenbergzentrum 8, direkt an der Stadtbahn-Haltestelle Mühlenberger Markt. Parkplätze gibt es am Zentrum.",
  },
  {
    q: "Vertreten Sie auch Mandanten außerhalb von Hannover?",
    a: "Ja. Die Kanzlei liegt im Süden Hannovers und ist aus Mühlenberg, Wettbergen, Ricklingen, Linden, Hemmingen und Ronnenberg schnell erreichbar. Vertreten können wir Sie vor Gerichten in ganz Deutschland — Gespräche und Unterlagen laufen auf Wunsch auch per Telefon und E-Mail.",
  },
];

export const serviceArea = ["Mühlenberg", "Wettbergen", "Ricklingen", "Oberricklingen", "Linden", "Bornum", "Hemmingen", "Ronnenberg"];

/* ---------- Fristen-Wegweiser ---------- */

export type FristId = "kuendigung" | "bussgeld" | "mahnbescheid" | "mieterhoehung" | "erbe";

export type Frist = {
  id: FristId;
  label: string;
  short: string;
  basis: string;
  start: string;
  rule: { weeks?: number; endOfMonthPlus?: number; months?: number };
  what: string;
  area: string;
};

export const fristen: Frist[] = [
  {
    id: "kuendigung",
    label: "Kündigung vom Arbeitgeber",
    short: "Kündigung",
    basis: "§ 4 KSchG",
    start: "Tag, an dem die Kündigung bei Ihnen ankam",
    rule: { weeks: 3 },
    what: "Kündigungsschutzklage beim Arbeitsgericht erheben",
    area: "Arbeitsrecht",
  },
  {
    id: "bussgeld",
    label: "Bußgeldbescheid",
    short: "Bußgeld",
    basis: "§ 67 OWiG",
    start: "Zustelldatum (steht auf dem gelben Umschlag)",
    rule: { weeks: 2 },
    what: "Einspruch bei der Bußgeldstelle einlegen",
    area: "Verkehrsrecht",
  },
  {
    id: "mahnbescheid",
    label: "Gerichtlicher Mahnbescheid",
    short: "Mahnbescheid",
    basis: "§ 692 ZPO",
    start: "Zustelldatum (steht auf dem gelben Umschlag)",
    rule: { weeks: 2 },
    what: "Widerspruch beim Mahngericht einlegen",
    area: "Zivilrecht",
  },
  {
    id: "mieterhoehung",
    label: "Mieterhöhung (Mietspiegel)",
    short: "Mieterhöhung",
    basis: "§ 558b BGB",
    start: "Tag, an dem das Schreiben bei Ihnen ankam",
    rule: { endOfMonthPlus: 2 },
    what: "Zustimmen oder ablehnen — bis dahin dürfen Sie überlegen",
    area: "Mietrecht",
  },
  {
    id: "erbe",
    label: "Erbe ausschlagen",
    short: "Erbe",
    basis: "§ 1944 BGB",
    start: "Tag, an dem Sie vom Erbfall und Ihrer Erbenstellung erfahren haben",
    rule: { weeks: 6 },
    what: "Ausschlagung gegenüber dem Nachlassgericht erklären",
    area: "Erbrecht",
  },
];
