---
navigation_title: "Accordion"
position: 8
---

# Accordions

**Accordions contain of a number of content panels, each of wich can be expanded or collapsed vertically by the user.**

[[_TOC_]]

Accordions help to save vertical space and prevent from visual noise. Some accordions allow only a single panel to be expanded at a time, others allow multiple.

![Accordion](_media/accordion.png)

Before you continue, please read [Tablist widgets (or: tab panels, tabs)](/examples/widgets/tablists) to understand why accordions simply are extended variants of tablists, providing a slightly different layout and (sometimes) expandability of multiple panels.

## General requirements

The following requirements are based on well established best practices and [WAI-WAI-ARIA Authoring Practices: Accordion (widget)](https://www.w3.org/TR/wai-aria-practices/#accordion).

In addition to the tablists’ requirements, and besides many other requirements, we want to stress out explicitly the following:

- Multiple slides can be visible (optional).

## Proofs of concept

**Update 2020:** Due to the fact that Internet Explorer doesn’t need to be supported anymore (see [Relevant combinations of screen readers and browsers](/knowledge/screen-readers/relevant-combinations)), we now favor the [Simple ARIA implementation](#simple-aria-implementation).

### Simple ARIA implementation

It is relatively simple to create a custom accordion implementation with ARIA:

[Example](_examples/accordion-with-aria)

#### Implementation details

This implementation follows the current APG approach and uses a real `button` in each header.

- The button toggles `aria-expanded` (`true`/`false`).
- The button uses `aria-controls` to reference the associated panel.
- The panel uses `role="region"` and `aria-labelledby` to expose a clear relationship back to the controlling header button.
- The panel visibility is synchronized with the semantic state using JavaScript.

### Native HTML implementation (`<details>` / `<summary>`)

For simple disclosure-like use cases, native HTML can be a solid option:

- A `<summary>` works as the interactive header.
- The surrounding `<details>` element manages expanded/collapsed state natively.
- This can reduce JavaScript and complexity compared to fully custom widgets.

For more complex behaviours and full APG-style keyboard interaction parity, prefer the ARIA implementation above.

[Example](_examples/accordion-with-details-summary)

### Radio buttons implementation (Legacy)

**Note:** This approach is deprecated and provided for reference only.

The ARIA-based implementation above should be used for all new projects, as it offers more appropriate semantics and more reliable support for modern assistive technologies.

This implementation is based on the [tablists’ proof of concept](/examples/widgets/tablists/#proof-of-concept), only the layout is different.

[Example](_examples/accordion-with-radio-buttons)  
*(Legacy — for reference only)*

#### Implementation details

- Uses native radio button selection mechanics to keep exactly one panel open at a time.
- Requires additional scripting/CSS to emulate accordion semantics and behaviour.
- Kept for historical reference only.

### Checkboxes implementation (Legacy)

**Note:** This approach is deprecated and provided for reference only.

The ARIA-based implementation above should be used for all new projects, as it offers more appropriate semantics and more reliable support for modern assistive technologies.

This implementation is based on the [tablists’ proof of concept](/examples/widgets/tablists/#proof-of-concept), with a slightly different layout:

[Example](_examples/multi-accordion-with-checkboxes)  
*(Legacy — for reference only)*

#### Implementation details

- Uses checkbox controls to allow multiple panels open at once.
- Requires additional scripting/CSS to approximate expected accordion behaviour.
- Kept for historical reference only.
