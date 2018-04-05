---
layout: layout
title: "Hiding elements from all devices"
navigation_title: "From all devices"
position: 3
lead: "To hide an element from all devices means just that: no single device will perceive it anymore (although the element still is present in the DOM). This can be achieved using either a CSS or an HTML technique."
---

# Hiding elements from all devices

Elements can be hidden completely from all devices (including screen readers). For this, the HTML attribute `hidden` can be set on an element directly. Or using CSS, either `display: none` or `visibility: hidden` can be set.

@example[Hiding elements from all devices](hiding-elements-from-all-devices){.example}

# Cross browser compatibility

To make the `hidden` attribute work in older browsers, simply do:

```css
[hidden] {
   display: none;
}
```

# Which one to use?

We strongly suggest using the HTML attribute `hidden`, as it separates content clearly from presentation. Notice: hiding an element from all channels is a question of content, not of visual presentation.

In addition, it makes obvious in the DOM already what elements are hidden, so it leads to better readable code.

# Marginal note about ARIA references

Elements hidden with the techniques shown on this page can still provide content when being referenced using `aria-labelledby` or `aria-describedby`. More info here: [ARIA label, describedby and labelledby Attributes](/examples/sensible-usage-of-aria-roles-and-attributes/aria-label-describedby-and-labelledby-attributes){.page}.