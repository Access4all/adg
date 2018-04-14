---
layout: layout
title: "Tables with fixed or hidden headers"
navigation_title: "Sticky & hidden headers"
position: 7
lead: "In some situations, table headers need to be placed at a specific place on screen - or even be hidden visually completely. There are ways to achieve that and keep accessibility intact."
changed: "2018-04-14"
---

# Tables with fixed or hidden headers

# Table with sticky headers

If tables are very long, it is useful to make the table header sticky on top so visual users always see it, even when scrolling vertically.

Using a bit of CSS magic, this is easily possible:

@example[Table with fixed headers](table-with-fixed-headers){.example}

This is also possible for horizontally scrolling tables.

# Table with visually hidden headers

Sometimes, table headers are not provided in the visual layout. This is feasible, as visual users often recognise the larger context of tables without the need for visual headers.

For screen reader users though, table headers are always necessary. Simply add them, and hide them visually (if you haven't done this yet, go back and read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually){.page}).

@example[Table with hidden headers](table-with-hidden-headers){.example}

This works for both horizontal and vertical table headers.

# A note about ARIA

These easy examples work without the need to change any of the elements' `display` properties. However, if you have more advanced requirements, you may feel the need to change some `display` properties. As we know, this may also change the element's semantics, which you will potentially have to add back to it using ARIA (if you haven't done this yet, go back and read [Accessible responsive tables using ARIA](/examples/tables/responsive-with-aria){.page}).

In general: fiddling around with table's visual attributes is especially finicky. Be sure to take nothing for granted and always validate your work thoroughly for accessibility.