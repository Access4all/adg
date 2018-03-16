---
layout: layout
title: "Hiding elements from screen readers using aria-hidden"
navigation_title: "Hiding elements from screen readers using aria-hidden"
position: 2
lead: "Hiding elements from screen readers means that an element visually is perceivable, but screen readers ignore it."
---

# Hiding elements from screen readers using aria-hidden

This can be achieved by using `aria-hidden="true"` on an element like this:

@code(/pages/examples/hiding-elements/hiding-elements-from-screen-readers-using-aria-hidden/_examples/hiding-elements-from-screen-readers-using-aria-hidden/){.code}

Important: all child elements will also be hidden! So it's not possible to change this manually by setting `aria-hidden="false"` on a child element:

@code(/pages/examples/hiding-elements/hiding-elements-from-screen-readers-using-aria-hidden/_examples/hiding-elements-from-screen-readers-using-aria-hidden-2-/){.code}

# Danger: Don't try this with focusable elements!

You shouldn't use `aria-hidden` on focusable elements, as during usage of a screen reader's focus mode, focusable elements are still reachable by the browser, which leads to strange (or missing) announcements of focusable elements with `aria-hidden="true"`.

For more info, see [Fourth Rule of ARIA Use (vanseodesign.com)](http://vanseodesign.com/web-design/five-rules-aria-html/).

@code(/pages/examples/hiding-elements/hiding-elements-from-screen-readers-using-aria-hidden/_examples/hiding-elements-from-screen-readers-using-aria-hidden-3-/){.code}