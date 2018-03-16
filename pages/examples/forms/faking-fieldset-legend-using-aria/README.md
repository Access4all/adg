---
layout: layout
title: "Faking fieldset / legend using ARIA"
navigation_title: "Faking fieldset / legend using ARIA"
position: 5
lead: "If for any reason you don't want to use fieldset and legend, you can fake them using ARIA."
---

# Faking fieldset / legend using ARIA

Admittedly, **browsers have a quite peculiar opinion on how to style the `<fieldset>`/`<legend>` combination**, and it is quite **hard to override their preferences**.

So if for visual (or any other serious) reason you can't use the `<fieldset>`/`<legend>` combination, you may **take ARIA to the rescue**:

- Use `role="group"` to give a `<div>` container the semantics of a `<fieldset>`
- Associate any other text to the grouping container using `aria-describedby`

@code(/pages/examples/forms/faking-fieldset-legend-using-aria/_examples/faking-fieldset-legend-using-aria/){.code}