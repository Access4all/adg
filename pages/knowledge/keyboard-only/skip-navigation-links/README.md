---
navigation_title: "Skip navigation links"
position: 3
---

# Skip navigation links

**Skip navigation links (also called jump links) are a proven way to improve keyboard navigation on real-world websites. They let keyboard users jump directly to main content instead of tabbing through long headers or navigation on every page.**

[[_TOC_]]

## Who benefits from skip links

Skip links are primarily a feature for keyboard users (with or without assistive technology). They are especially useful when a page starts with many focusable elements, for example:

- A large main navigation
- Utility navigation (language, account, search)
- Multiple repeated links before the content

For screen reader users, skip links can still be helpful, but in many cases they can also navigate efficiently by headings and landmarks.

## Recommended baseline

In most projects, one skip link to the main content is the recommended baseline:

- Add a link as early as possible in the page, usually as the first focusable element.
- Point it to the main content container.
- Keep it visually hidden by default, but make it visible on keyboard focus.
- If the target is not focusable by default, add `tabindex="-1"` so focus can be moved there reliably.

Example:

```html
<a class="visually-hidden" href="#main-content">Skip to main content</a>

<header>
  <!-- site navigation -->
</header>

<main id="main-content" tabindex="-1">
  <!-- main page content -->
</main>
```

This is the most important pattern and should be considered the default for keyboard accessibility.

## Additional skip links (optional)

On complex websites, you can provide additional skip links to relevant areas (for example search, navigation, or footer). This can be useful, but it should be treated as an enhancement, not as a replacement for proper page structure.

If you add multiple jump links:

- Keep labels short and explicit.
- Keep targets stable across pages.
- Do not overload users with too many options.
- Keep one clear link to main content in any case.

Two common patterns are:

- **G123:** skip one repeated block by linking to the first content after that block.
- **G124:** provide a small set of skip links to multiple page areas.

## About accesskey

Some websites combine jump links with `accesskey`. This can work in specific contexts (for example large web applications used daily), but should be applied with care:

- Browser and operating system key combinations differ.
- Shortcuts can conflict with assistive technology commands.
- Discoverability is often poor unless communicated very clearly.

For most websites, regular skip links plus proper headings and landmarks are the safer default.

## Related techniques

- [Skip navigation links example](/examples/hiding-elements/skip-navigation-links/)
- [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually/)
- [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement/)

## WCAG and W3C references

- [WCAG 2.2: 2.4.1 Bypass Blocks (A)](https://www.w3.org/TR/WCAG22/#bypass-blocks)
- [Understanding 2.4.1: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)
- [Technique G1: Adding a link at the top of each page that goes directly to the main content area](https://www.w3.org/WAI/WCAG22/Techniques/general/G1)
- [Technique G123: Adding a link at the beginning of a block of repeated content to go to the end of the block](https://www.w3.org/WAI/WCAG22/Techniques/general/G123)
- [Technique G124: Adding links at the top of the page to each area of the content](https://www.w3.org/WAI/WCAG22/Techniques/general/G124)
- [Technique ARIA11: Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11)

