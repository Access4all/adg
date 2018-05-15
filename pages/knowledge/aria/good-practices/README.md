---
navigation_title: "Good practices"
position: 2
changed: "2018-05-15"
---

# Good ARIA practices

**There are a few ARIA features that truly fill some gaps HTML doesn't provide a solution for. Working pretty reliably in modern browsers and screen readers, the following techniques can be recommended as safe to use.**

While ARIA is not needed most of the time when developing accessible websites, it can help in certain situations to make the user experience better for screen readers.

The following will outline a short summary of various ARIA techniques that have proven to be useful and robust. All of them will be explained in detail in the 4th part of this guide, [Examples of accessibility patterns](/pages/examples), specifically in the chapter [Sensible usage of ARIA roles and attributes](/pages/examples/sensible-aria-usage).

## Standalone ARIA attributes

The following `aria-*` attributes can be used on most HTML elements. No `role` attribute is needed.

### Labelling elements

To override an element's label, `aria-label` and `aria-labelledby` can be used.

Browser and screen reader behaviour varies a lot. Thankfully, you will not need this technique, as HTML provides everything for labelling elements itself.

If you are really curious and want to learn more about this, skip forward and read [Labelling elements using aria-label and aria-labelledby](/pages/examples/sensible-aria-usage/label-labelledby).

### Adding descriptions to elements

To add a description (or multiple of them) to an element, `aria-describedby` can be used.

Browser and screen reader behaviour is quite homogenous, and there are a few specific situations where this technique is really helpful.

If you are really curious and want to learn more about this, skip forward and read [Adding descriptions to elements using aria-describedby](/pages/examples/sensible-aria-usage/describedby).

### Marking elements expandable

To deliver an expandable/collapsible status of an element, `aria-expanded` can be used.

Browser and screen reader behaviour is homogenous, and there are situations where this technique is really helpful.

If you are really curious and want to learn more about this, skip forward and read [Marking elements expandable using aria-expanded](/pages/examples/sensible-aria-usage/expanded).

### Marking elements activatable

To describe whether an element is active or not, `aria-pressed` can be used.

While browser and screen reader behaviour is quite homogenous, the same effect usually can be achieved using a traditional checkbox.

If you are really curious and want to learn more about this, skip forward and read [Marking elements activatable using aria-pressed](/pages/examples/sensible-aria-usage/pressed).

### Marking an element as current one in a set

To describe whether an element is the "current" one in a set of elements, `aria-current` can be used.

While browser and screen reader behaviour is quite homogenous, the same effect usually can be achieved using visually hidden text.

If you are really curious and want to learn more about this, skip forward and read [Marking elements as the current one using aria-current](/pages/examples/sensible-aria-usage/current).

### Hiding elements from screen readers

To hide an element (including children) from screen readers, `aria-hidden` can be used.

Browser and screen reader behaviour varies a lot, especially regarding focusable elements. In general, we do not recommend hiding certain elements from certain audiences. And by providing a user experience that works the same for all audiences, you will never need this technique.

If you are really curious and want to learn more about this, skip forward and read [Hiding elements from screen readers using aria-hidden](/pages/examples/sensible-aria-usage/hidden).

## ARIA roles

While in general we explicitly discourage from using ARIA roles, there are certain situations where they are indispensable and where they have proven to be robust.

### Removing semantics

To remove the semantical role of an element, `role="presentation"` can be used.

While browser and screen reader behaviour is quite homogenous, this technique is scarcely needed, except when fiddling around with ARIA widgets (which we highly discourage).

If you are really curious and want to learn more about this, skip forward and read [Removing semantics using role=presentation](/pages/examples/sensible-aria-usage/presentation).

### Noticing screen readers (alerts)

To make screen readers announce an element (regardless where the user currently is on the page), `role="alert"` can be used.

While browser and screen reader behaviour is quite homogenous, this technique must be used with extreme caution as it interrupts the screen reader's current output.

If you are really curious and want to learn more about this, skip forward and read [Noticing screen readers using alert role](/pages/examples/sensible-aria-usage/alert).

### Creating tables (grids)

To create semantical tables from non-table elements (or to fix the semantics of a traditional table), certain roles around `grid` can be used.

While browser and screen reader behaviour is quite homogenous, this technique should only be used if the visual display of a table does not adhere to its traditional layout (like responsive tables).

If you are really curious and want to learn more about this, skip forward and read [Responsive tables](/pages/examples/tables/responsive).

### Creating fieldset/legend structure

To create a custom `fieldset`/`legend` structure, `role="group"` can be used.

While browser and screen reader behaviour is quite homogenous, this technique should only be used if the visual display of a `fieldset`/`legend` structure does not adhere to its traditional layout.

If you are really curious and want to learn more about this, skip forward and read [Grouping form controls with fieldset and legend](/pages/examples/forms/grouping-with-fieldsetlegend).

## More ARIA examples

In this guide, we are carefully using ARIA here and there to optimise some of our proposed examples. This is especially true for our widgets, which are all made of traditional HTML form controls, spiced up with some JavaScript and ARIA.

If you are really curious and want to learn more about this, skip forward and read [Examples of accessibility patterns](/pages/examples).

## Conclusion: be careful with ARIA!

There are only rare situations where HTML is not enough. In those (and only those) situations, using ARIA is advised. In other situations, when the use of a clean and semantically correct HTML structure can provide a solution, usage of ARIA is strongly discouraged. This is due to its non-homogenous support among browsers and screen readers.