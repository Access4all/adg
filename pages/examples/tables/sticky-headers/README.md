---
navigation_title: "Sticky headers"
position: 10
changed: "2018-04-16"
---

# Sticky table headers

**In some situations, table headers need to be placed at a specific place on screen, and remain there, even when scrolling. Especially when tables are very long, it is useful to make the table header sticky on top so visual users always see it, even when scrolling vertically.**

There were times when detaching table headers visually used to work perfectly in both JAWS and NVDA. In recent times though (and especially since introducing Firefox Quantum) regressions were reported again and again regarding this topic.

Thankfully though we can fall back on ARIA in this case: simply take our "table of divs" experiment (see [The "table of divs" experiment](/examples/tables/table-of-divs-experiment)) and move its header off-screen.

[Example](_examples/table-with-fixed-headers)

This is also possible for horizontally scrolling tables.
