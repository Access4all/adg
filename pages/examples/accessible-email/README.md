---
navigation_title: "Accessible Email"
position: 21
changed: "2018-05-14"
---

# Accessible Email

**TODO**



## Additional notes

- HTML Emails basieren auf sehr altem, schlechtem HTML Code, da sie uralte Systeme (z.B. alte Exchange Versionen) anzielen können müssen
    - Tabellen Layouts => wie optimieren? aria-hidden auf leere Zellen??
    - Auch Exchange Versionen benutzen veraltete HTML Rendering Engines, diejenige von Word?! (Quelle?)
- Outlook war lange dafür bekannt, sehr schlechte Unterstützung der Accessibility zu leisten. Entsprechend klickten wohl die meisten Nutzer auf den Web-Link. Laut Aussagen eines blinden Mitarbeiters hat die neuste Version von Outlook aber aufgeholt. Zudem seien die meisten HTML Mails so schlecht programmiert, dass sie oft auch in Browsern nur schlecht lesbar sind.
- Fakt ist, dass immer noch viele Email Clients schlechte Unterstützung für HTML generell haben, weshalb man von Tabellen-Layouts so bald wohl nicht wegkommen wird. Es gibt aber einige Optimierungs-Massnahmen, welche für Screenreader hilfreich sein können, etwa leere Zellen mit aria-hidden auszublenden.