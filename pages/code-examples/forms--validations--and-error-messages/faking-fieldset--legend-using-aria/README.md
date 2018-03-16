---
layout: layout
title: "Faking fieldset / legend using ARIA"
---

# Faking fieldset / legend using ARIA

If for any reason you don't want to use fieldset and legend, you can fake them using ARIA.

Admittedly, **browsers have a quite peculiar opinion on how to style the `<fieldset>`/`<legend>` combination**, and it is quite **hard to override their preferences**.

So if for visual (or any other serious) reason you can't use the `<fieldset>`/`<legend>` combination, you may **take ARIA to the rescue**:

- Use `role="group"` to give a `<div>` container the semantics of a `<fieldset>`
- Associate any other text to the grouping container using `aria-describedby`

[**Faking Fieldset / Legend Using ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.gxNyGp.small.85b0d421-58a1-4e23-90fc-8845a45a3918.png)](https://codepen.io/accessibility-developer-guide/pen/gxNyGp){.code}