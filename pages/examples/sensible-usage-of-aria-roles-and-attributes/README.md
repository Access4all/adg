---
layout: layout
title: "Sensible Usage of ARIA Roles and Attributes"
navigation_title: "Sensible Usage of ARIA Roles and Attributes"
position: 14
lead: "TODO"
---

# Sensible Usage of ARIA Roles and Attributes

- `aria-expanded`, but only on focusable elements!
- `aria-label`
- `aria-selected` and `aria-pressed` on `<button>`, more inspiration see <https://www.w3.org/WAI/WCAG20/quickref/>
- `aria-current="false"` klappt im NVDA nicht! wird als current angesagt: https://codepen.io/jmuheim/pen/zzyMPp
- Others, see "Entwickler-/Tester-Schulung" Unterlagen!
- `role="presentation"` vs. `aria-hidden`
    - `aria-hidden` versteckt auch child elements, `role="presentation"` überschreibt nur die Rolle des spezifischen elements (ohne children)