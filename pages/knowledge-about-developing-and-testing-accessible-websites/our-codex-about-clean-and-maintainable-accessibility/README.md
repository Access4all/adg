---
layout: layout
title: "Our codex about clean and maintainable accessibility"
navigation_title: "Codex"
position: 6
lead: "TODO"
---

# Our codex about clean and maintainable accessibility

Aufzeigen, dass es für die meisten Ansprüche genau einen perfekten Weg gibt, sie umzusetzen! Typischerweise ist das "plain old HTML". Und auch wenn es oftmals diverse weitere Möglichkeiten gibt, um WCAG-konform zu sein, so ist dieser eine perfekte Weg wann immer möglich vorzuziehen.

Beispiel zeigen mit Formularfeld und Labels: es gibt **einen perfekten Weg** mittels ID und `for`-Attribut, welcher für alle funktioniert. Wenn man stattdessen z.B. mit `aria-label` oder `aria-labelledby` arbeitet, dann funktioniert das auch für Screenreader, aber das Label ist nicht mehr klickbar für Mausnutzer, und auch gängige automatisierte Test-Tools geben dann falsch-positive Fehler aus (z.B. WAVE, vielleicht auch andere wie TotalValidator?)! Oder theoretisch könnte man auch ein `<th>`-Element als Label programmatisch zuordnen (wenn das Eingabefeld sich in einer Tabelle befindet), aber das funktioniert nicht gleich gut in allen Screenreadern (soweit ich weiss).

Deshalb: wann immer möglich sollte man diesem einen perfekten Pfad folgen! Vielleicht können wir entsprechende Beispiele auch mit einem Banner markieren (etwa "A4A Codex Compliant")?

Find a way that's working for all!!! E.g. trying to hide controls from screen readers doesn't work (focusable!), so everything must work the same way for everybody (even when the functionality isn't necessary for screen reader, e.g. zoom of image). Möglichst keine "Weichen" einbauen! Für alle Nutzer exakt dasselbe Nutzer-Erlebnis anbieten, auch wenn dies zeitweise unnütz scheint (etwa eine Bild-Zoom-Funktion für Screen Reader), aber es gibt oft Nutzer, welche sowohl visuell als auch mit Screen Reader unterwegs sind (etwa Leute die schlecht sehen oder nicht gut lesen können): da ist es dann doof wenn der Screenreader etwas völlig anderes tut als man visuell erwarten würde.

Zitat Detlef Beyer (Lufthansa):

> Es gilt immer, eine praktikable Lösung zu finden, und nicht sich darauf zu berufen, dass Browser/Screenreader etwas nicht können!

Our content is not about how stuff SHOULD work, but about techniques that REALLY DO work.

Möglichst nicht redundant! Niemals `<form role="form">`! (Aber was ist mit `<input required aria-required>`>

Auch gute Punkte: <http://vanseodesign.com/web-design/five-rules-aria-html/> Wir wollen hier aber noch viel mehr ins Details gehen! Z.B. behaupte ich, dass eine Tabliste eigentlich eine Radiobutton-Gruppe ist, und dass hier dieselbe Regel gilt: niemals native Semantik durch ARIA Zeugs nachmachen!

# Gute Tools nutzen!

- Z.B. Präprozessoren! Es ist unglaublich, wieviele "menschliche" (vermeidbare) Probleme auch heute noch dadurch entstehen, dass einfach nur schlechte Tools eingesetzt werden...!
- Oder CodePen für rapid Prototyping zwischen Agentur, Kunde, und Accessibility-Tester! Siehe auch [How to use our code examples on CodePen.io](/code-examples-of-common-patterns-and-daily-requirements/how-to-use-our-code-examples-on-codepen-io){.page}. Ein Hinweis irgendwo, dass man am besten agil vorgeht (statt Wasserfall-artig) wäre auch gut.