---
navigation_title: "How JavaScript and accessibility improve usability together"
position: 11
changed: "2018-03-16"
---

# How JavaScript and accessibility improve usability together

**TODO**

While the most common accessibility issues can solved by fixing unclean HTML code, JavaScript widgets always have to be enhanced with special information to make them accessible.

## Additional notes

(Dies war zuerst als Overview-Seite in den Examples gedacht, aber JavaScript lässt sich eigentlich gar nicht gut trennen als einzelnes Thema. Deshalb besser eine entsprechende Seite im Knowledge-Teil, wo auf die wichtigsten Punkte aufmerksam gemacht wird, am besten mit Links zu den entsprechenden Examples.)

- Every interaction needs to result in some useful feedback
    - Natively (e.g. changing a checkbox value)
    - Using ARIA live region
    - By setting focus to another element
    - By changing an attribute, e.g. `aria-expanded` or `aria-pressed`
    - When something needs time, give "loading" feedback
- Man kann "herausfinden", ob jemand mit SR unterwegs ist, indem man ihn z.B. bei einem Widget mittels verstecktem Text auffordert, mit "Shift-Hoch/Runter" zu interagieren, statt intuitiv nur mit Hoch/Runter alleine. Bei "Shift-Hoch/Runter" könnte dann spezieller Code ausgeführt werden, welcher die Zugänglichkeit optimiert, etwa eine Live-Region, welche bei einem Autocomplete die Anzahl Vorschläge ausgibt. => Aber ist diese Technik sinnvoll bzw. zuverlässig?? Oder sollen auch hier möglichst alle gleich behandelt werden?
- Input Anton: `<a>` ohne `href` ist auf Windows nicht fokussierbar, auf Mac scheinbar schon (zumindest im FF)!