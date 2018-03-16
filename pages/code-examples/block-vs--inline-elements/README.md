---
layout: layout
title: "Block vs. Inline Elements"
---

# Block vs. Inline Elements

- Show difference of `display: block/inline-block/inline`
- JAWS and NVDA behave differently (because they don't have the same default value for screen layout setting)
- Show problem with many block elements within e.g. a link (teaser) and how to fix
- Show a nav bar with `display:inline-block` vs. `display:block`: the first one only is reachable using tab!
- Use `width: 100%` to have a visual line break for an inline-block element (what about using `<br aria-hidden="true">`?)
- Inhaltlich verwandt: gute Umsetzung von Teasern! <http://www.swissinfo.ch/> könnte man PoC darauf basieren lassen! => `:focus-within` verwenden, um bei Fokus trotzdem ganzes Element fokussiert aussehen zu lassen!