---
navigation_title: "Skip navigation links"
position: 4
---

# Skip navigation links

**A skip link is usually the first interactive element on a page. It is visually hidden by default, appears on keyboard focus, and lets users bypass repeated blocks quickly.**

[[_TOC_]]

This pattern is mainly relevant for keyboard users. It avoids having to tab through repeated links on every page load.

## Recommended baseline: one link to main content

This is the default pattern for most websites:

- A "Skip to main content" link comes first in the DOM.
- The link is visually hidden while not focused.
- On focus, the link becomes visible.
- On activation, users jump to main content.
- If a skip-link target is not focusable by default, set `tabindex="-1"` on that target.

[Example](_examples/skip-to-main-content-link)

## Optional extension: links to multiple page areas

On complex pages, you can provide a small set of skip links to relevant areas (for example search, main content, footer navigation).

[Example](_examples/skip-links-to-page-sections)

If you want to read more background and implementation guidance, see [Skip navigation links](/knowledge/keyboard-only/skip-navigation-links/).

For official standards and techniques, see:

- [WCAG 2.2: 2.4.1 Bypass Blocks (A)](https://www.w3.org/TR/WCAG22/#bypass-blocks)
- [Technique G1: Adding a link at the top of each page that goes directly to the main content area](https://www.w3.org/WAI/WCAG22/Techniques/general/G1)
- [Technique G123: Adding a link at the beginning of a block of repeated content to go to the end of the block](https://www.w3.org/WAI/WCAG22/Techniques/general/G123)
- [Technique G124: Adding links at the top of the page to each area of the content](https://www.w3.org/WAI/WCAG22/Techniques/general/G124)

