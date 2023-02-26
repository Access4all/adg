---
navigation_title: "Hidden headers"
position: 9
changed: "2020-11-18"
---

# Visually hidden table headers

**Sometimes, table headers are not provided in the visual layout. This is feasible, as visual users often recognise the larger context of tables without the need for visual headers. For screen reader users though, table headers are always necessary.**

There were times when hiding table headers visually by hiding the off-screen (see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually)) used to work perfectly in both JAWS and NVDA. In recent times though (and especially since introducing Firefox Quantum) regressions were reported again and again regarding this topic.

Fortunately though we can fall back on ARIA in this case: simply take our "table of divs" experiment (see [The "table of divs" experiment](/examples/tables/table-of-divs-experiment)) and move its header off-screen.

[Example](_examples/table-with-hidden-headers)

This works for both horizontal and vertical table headers.
