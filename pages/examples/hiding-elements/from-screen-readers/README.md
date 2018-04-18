---
layout: layout
title: "Hiding elements from screen readers using aria-hidden"
navigation_title: "From screen readers"
position: 2
lead: "To hide an element from screen readers means: visually (on a computer screen) it is perceivable, but non-visual clients (for example screen readers) ignore it. This is done easily using ARIA, but you should never try this on focusable elements."
---

# Hiding elements from screen readers using aria-hidden

To hide an element from screen readers, simply set `aria-hidden="true"` on it like this:

@example[Hiding an element using aria-hidden](hiding-an-element-using-aria-hidden){.example}

Important: all child elements will also be hidden! It isn't possible to override this by setting `aria-hidden="false"` on a child element:

@example[Trying to unhide an aria-hidden child](trying-to-unhide-an-aria-hidden-child){.example}

# Don't do this with focusable elements

You shouldn't use `aria-hidden` on focusable elements. While this isn't problematic for screen readers in browse mode, during usage of focus mode, focusable elements are still reachable by the browser (with the `Tab` key), which leads to strange (or missing) announcements of focusable elements with `aria-hidden="true"`.

@example[Problematic attempt of hiding a focusable element using aria-hidden](problematic-attempt-of-hiding-a-focusable-element-using-aria-hidden){.example}
