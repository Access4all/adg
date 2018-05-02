---
navigation_title: "From screen readers"
position: 2
changed: "2018-03-24"
---

# Hiding elements from screen readers using aria-hidden

**To hide an element from screen readers means: visually (on a computer screen) it is perceivable, but non-visual clients (for example screen readers) ignore it. This is done easily using ARIA, but you should never try this on focusable elements.**

To hide an element from screen readers, simply set `aria-hidden="true"` on it like this:

[Hiding an element using aria-hidden (example) ![Preview](_examples/hiding-an-element-using-aria-hidden/_preview.png)](_examples/hiding-an-element-using-aria-hidden)

Important: all child elements will also be hidden! It isn't possible to override this by setting `aria-hidden="false"` on a child element:

[Trying to unhide an aria-hidden child (example) ![Preview](_examples/trying-to-unhide-an-aria-hidden-child/_preview.png)](_examples/trying-to-unhide-an-aria-hidden-child)

## Don't do this with focusable elements

You shouldn't use `aria-hidden` on focusable elements. While this isn't problematic for screen readers in browse mode, during usage of focus mode, focusable elements are still reachable by the browser (with the `Tab` key), which leads to strange (or missing) announcements of focusable elements with `aria-hidden="true"`.

[Problematic attempt of hiding a focusable element using aria-hidden (example) ![Preview](_examples/problematic-attempt-of-hiding-a-focusable-element-using-aria-hidden/_preview.png)](_examples/problematic-attempt-of-hiding-a-focusable-element-using-aria-hidden)