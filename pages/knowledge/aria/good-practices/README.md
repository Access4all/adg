---
navigation_title: "Good practices"
position: 2
changed: "2018-04-13"
---

# Good ARIA practices

**There are a few ARIA features that truly fill some gaps HTML doesn't provide a solution for. Working pretty reliably in modern browsers and screen readers, the following techniques can be recommended as safe to use.**

## Standalone ARIA attributes

The following `aria-*` attributes can be used on most HTML elements. No `role` attribute is needed.

### Labelling elements

To label an element, `aria-label` and `aria-labelledby` can be used.

First things first: for "big" elements like page regions, it's better to use headings as labelling technique. If you are really curious and want to learn more about this, skip ahead and read [Alternative techniques for labelling page regions](/examples/headings/alternative-techniques). And for "small" elements like links, images or buttons though, there usually exist traditional ways for labelling.

There are very rare cases (if any) where ARIA is truly the only way to go. For example, a valid usage of `aria-label` could be to override an existing label with additional, more precise information specifically for screen reader users:

```html
<button aria-label="Zoom image: opens a high resolution version, press Esc to close">
  Zoom image <!-- The original label is overridden -->
</button>
```

However, why not present this information to every user, for example using a tooltip that displays on focus/hover?

```html
<button>
  Zoom image
  <span class="tooltip">Opens a high resolution version, press Esc to close</span>
</button>
```

So if you are thinking about enhancing existing information, in most cases there are better ways than using ARIA - ways that provide use to all users.

### Describing elements

To describe an element, `aria-describedby` can be used.

When using a simple label isn't enough and you need to connect additional information to a form input, this is the way to go. For example, a paragraph with information about terms and conditions needs to be connected to its respective "I have read the terms and conditions" checkbox. If you are really curious and want to learn more about this, skip ahead and read [Placing non-interactive content between form controls](/examples/forms/non-interactive-content).

### Delivering expandable status

To deliver an expandable/collapsible status of an element, `aria-expanded` can be used.

This is especially useful for interactive dropdown menus. If you are really curious and want to learn more about this, skip ahead and read [Dropdown widgets (a.k.a. menu)](/examples/widgets/dropdown-widgets-a-k-a-menu-).

### Delivering selected and pressed status

To describe an element's selected or pressed status, `aria-selected` and `aria-pressed` can be used.

This may seem useful for buttons that can be toggled, like a "Mute sound" button. Usually though, a checkbox offers the same interactivity without the need of ARIA.

Caution though: neither `aria-selected` nor `aria-pressed` are intended to be used for marking active items in a link list! For this, `aria-current` is an option, but browser support still isn't fully provided, so we don't recommend using it (yet). The best way to provide information like this to screen readers, is using visually hidden text; if you are really curious and want to learn more about this, skip ahead and read [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).

### Hiding non-focusable elements

To hide a non-focusable element (including children) from screen readers, `aria-hidden` can be used.

If you are really curious and want to learn more about this, skip ahead and read [Hiding elements from screen readers using aria-hidden](/examples/hiding-elements/from-screen-readers).

## ARIA examples

In this guide, we are carefully using ARIA here and there to optimise some of our proposed examples:

- [HTML 5's headings outline algorithm](/examples/headings/html-5-outline)
- [](@page-81)
- [](@page-106)
- [Validation messages](/examples/forms/validation-messages)
- [Interactive JavaScript and widgets](/examples/widgets)
- [Live Regions And Alerts](/examples/live-regions-and-alerts)

## Conclusion: be careful with ARIA!

There are only rare situations where HTML isn't enough. In those (and only those) situations, using ARIA is advised. In other situations, when the use of a clean and semantically correct HTML structure can provide a solution, usage of ARIA is (currently) strongly discouraged. This is due to its non-homogenous support among browsers and screen readers.