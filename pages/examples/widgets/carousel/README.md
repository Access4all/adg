---
navigation_title: "Carousel"
position: 7
changed: "2018-05-14"
---

# Carousels (or: slideshow, slider)

**Very similar to tablists, carousels also help to split up a page's content into smaller and thus more digestible parts which can be toggled visible one at a time.**

Carousels offer a list of controls (usually on top of the element) which allow to toggle the visibility of corresponding panels. Only a single control can be active at a time, so exactly one panel is visible and all others are hidden.

![Typical carousel](_media/typical-carousel.png)

We do not call carousels "sliders" so the difference to the slider pattern (selecting a value in a min/max range) is obvious.

Before you continue, please read [Tablist widgets (or: tab panels, tabs)](/pages/examples/widgets/tablists) to understand why carousels are extended variants of tablists, simply providing additional controls like previous/next buttons, and autoplay functionality.

## General requirements

In addition to the tablists' requirements:

- Previous/next buttons allow to toggle through available slides (optional).
- Autoplay functionality toggles through available slides automatically (optional).
    - Autoplay functionality must be pauseable.

Unlike most other common widget patterns, the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) don't offer a section about carousels.

## Proof of concept

Based on the tablists' proof of concept, with additional controls:

[Example](_examples/carousel-with-radio-buttons)

### Implementation details

Some interesting peculiarities:

- Previous/next controls are implemented as buttons and simply change the currently active radio button.
- Autoplay functionality does not exist yet, but could easily be implemented using a button with `aria-pressed` or a checkbox, see [Marking elements activatable using aria-pressed](/pages/examples/sensible-aria-usage/pressed).