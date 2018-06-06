---
navigation_title: "Focus Handling"
position: 26
changed: "2018-05-14"
---

# Focus Handling

**TODO**



## Additional notes

- Handling focus properly:
    - No focus reset
    - No keyboard trap
- Managing Focus: Fokus muss sich immer da befinden, "wo die Musik spielt" (z.B. AJAX, oder bei Page Reload Fokus auf Nutzer-Hinweis setzen). Was aber, wenn der Fokus "gestohlen" wird, z.B. von einem autom. aufgehenden Dialog ("Session abgelaufen") => wohin soll der danach zurück gesetzt werden? Auf das letzte fokussierte Element? Wenn man etwas gebrowst hat, dann verliert man halt die gebrowste Position... => dafür scheint es keine Lösung zu geben.
    - Generell ist fragwürdig, ob der Fokus "gestohlen" werden darf, z.B. wie damals bei Lufthansa, wo ein Hinweis gekommen ist, dass die Session bald ablaufe, und man verlängern soll => ohne dass der Fokus auf das entsprechende Element gesetzt wurde! Wie kommt man dahin? Mittels Access-Key-Angabe (z.B. "Use access key X to extend session")? Kann davon ausgegangen werden, dass Screenreader Nutzer wissen, was Accesskeys sind?
- Wenn man mit `href="#first_name"` einen in-Page-Link macht, triggert das nicht den Focus Mode! Besser einen onclick Event machen und Fokus mit JS setzen!
    - Wenn man den Fokus auf ein inline Element setzt, dann wird der Rest danach auch vorgelesen! (Auch über die Grenzen des umliegenden Containers hinaus?!)
- [What's the algorithm NVDA uses to decide whether the focus should be placed on the same item after a page refresh?](https://github.com/nvaccess/nvda/issues/4998)
    - [Always read a page from the beginning (even on a re-visit)](https://github.com/nvaccess/nvda/issues/6208#issuecomment-324844957)
    - [Internal focus handling seems quirky](https://github.com/nvaccess/nvda/issues/5831#issuecomment-315729300)
- Sometimes an ARIA region may be an alternative: [Noticing screen readers using alert role](/examples/sensible-aria-usage/alert)
- Aufpassen, dass Fokus nicht unnötig oft gesetzt wird! Z.B. beim Aktivieren eines Tabs auf keinen Fall den Fokus in den Tab-Inhalt setzen, da Keyboard-Nutzer das stören würde (weil sie z.B. einfach nur kurz durch die einzelnen Tabs toggeln wollen)
- Changing content of a focused element: the content isn't announced automatically!
- Changing attributes of a focused element: do screen readers announce this?! (I think in many cases: no, e.g. `aria-describedby`)
- Giving proper feedback to a screen reader upon interaction by setting focus to the element
- Scrolling that works for all (don't forget to move the focus, too!)
- Handling spinners: How are notifications like "Please wait" or "Loading" implemented best?
    - Difference between page reload and pure AJAX?
- `autofocus` vs. `$.focus()`