---
layout: layout
title: "Live Regions And Alerts"
position: 19
lead: "TODO"
---

# Live Regions And Alerts

- Welche Technik funktioniert zuverlässig auf jeder wichtigen Combo? Ggf. auch Fallback auf `role="alert"` für ältere Systeme. Wer das nicht unterstützt muss als zu alt angesehen werden und wird bewusst nicht berücksichtigt.
- JAWS scheint die System-Lang zu verwenden bei Live Regionen, egal in welcher Sprache die Seite ist! Das tönt ziemlich bescheuert...
- Manchmal ist folgendes vielleicht eine Alternative: [Delivering Notifications to Screen Readers Through the Title](/code-examples-of-common-patterns-and-daily-requirements/title/delivering-notifications-to-screen-readers-through-the-title){.page}
- Manchmal ist folgendes vielleicht eine Alternative: [Focus Handling](/code-examples-of-common-patterns-and-daily-requirements/focus-handling){.page}

- Alerts vor Screenreadern im Browse-Mode zu verstecken ist schwierig, sie scheinen unterschiedlich auf `display:none` oder `hidden` Attribut zu reagieren.
    - Am besten Alerts immer auch visuell anzeigen, z.B. bei Autocomplete oberhalb der Suggestions: "3 Vorschläge".
        - Sie müssen auch immer entfernt werden, also am besten vor Anzeigen eines neuen Alerts die alten löschen (oder verstecken?)
    - Siehe accessibility-developer-guide/pen/VrqoXj