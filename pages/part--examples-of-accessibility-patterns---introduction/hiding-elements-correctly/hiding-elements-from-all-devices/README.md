---
layout: layout
title: "Hiding elements from all devices"
position: 3
lead: "Hiding elements from all devices means just that: no single device will perceive it anymore (although the element still is present in the DOM)."
---

# Hiding elements from all devices

Using the HTML attribute `hidden`, CSS `display: none` or `visibility: hidden`, elements can be hidden completely from all devices (including screen readers).

[**Hiding elements from all devices**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.yomMJg.small.e3a2ae5d-655d-4eee-9c18-efd5c53a75c9.png)](https://codepen.io/accessibility-developer-guide/pen/yomMJg){.code}

# Cross browser compatibility of the hidden attribute

To make the `hidden` attribute work in older browsers, simply do:

```css
[hidden] {
   display: none;
}
```

# Which one to use?

We strongly suggest using the HTML attribute `hidden`:

- It separates content clearly from presentation
    - Hiding an element from all channels is a question of content, not of visual presentation
- It makes obvious in the DOM already what elements are hidden

As such, it adheres very close to this: [Our codex about clean and maintainable accessibility](/part--knowledge-about-accessibility---introduction/our-codex-about-clean-and-maintainable-accessibility){.page}.

# A note on hidden elements and ARIA labels / descriptions

Elements hidden with the techniques shown on this page can still provide content when being referenced using `aria-labelledby` or `aria-describedby`. More info here: [ARIA label, describedby and labelledby Attributes](/part--examples-of-accessibility-patterns---introduction/sensible-usage-of-aria-roles-and-attributes/aria-label--describedby-and-labelledby-attributes){.page}.