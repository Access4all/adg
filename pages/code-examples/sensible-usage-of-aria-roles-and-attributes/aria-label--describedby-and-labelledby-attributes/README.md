---
layout: layout
title: "ARIA label, describedby and labelledby Attributes"
---

# ARIA label, describedby and labelledby Attributes



- `aria-describedby`, but only on focusable elements! `display: none` bleibt dafür sichtbar! [Short note on aria-labelledby and aria-describedby](https://developer.paciellogroup.com/blog/2015/05/short-note-on-aria-labelledby-and-aria-describedby/)
- `aria-labelledby`

TODO: Beispiele wie bei Paciellogroup!

# Side effects

- `aria-label` Text is not be searchable in browsers! This is confusing to screen reader users, as they aren't aware of any difference between "normal" text and `aria-label` text.

# Further possibilities

If your need is to add text content specifically for screen readers, see [Hiding elements visually by moving them off-screen](/code-examples/hiding-elements-correctly/hiding-elements-visually-by-moving-them-off-screen){.page}. We recommend using this technique instead of ARIA.