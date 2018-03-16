---
layout: layout
title: "Hiding elements from screen readers using aria-hidden"
navigation_title: "Hiding elements from screen readers using aria-hidden"
position: 2
lead: "Hiding elements from screen readers means that an element visually is perceivable, but screen readers ignore it."
---

# Hiding elements from screen readers using aria-hidden

This can be achieved by using `aria-hidden="true"` on an element like this:

[**Hiding elements from screen readers using aria-hidden**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.YrzMWY.small.d1d8ee52-5498-4cac-95de-16520d8758e3.png)](https://codepen.io/accessibility-developer-guide/pen/YrzMWY){.code}

Important: all child elements will also be hidden! So it's not possible to change this manually by setting `aria-hidden="false"` on a child element:

[**Hiding elements from screen readers using aria-hidden (2)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.NaWmrJ.small.ca7d19a7-b217-4e25-94e4-6fc08c7cd257.png)](https://codepen.io/accessibility-developer-guide/pen/NaWmrJ){.code}

# Danger: Don't try this with focusable elements!

You shouldn't use `aria-hidden` on focusable elements, as during usage of a screen reader's focus mode, focusable elements are still reachable by the browser, which leads to strange (or missing) announcements of focusable elements with `aria-hidden="true"`.

For more info, see [Fourth Rule of ARIA Use (vanseodesign.com)](http://vanseodesign.com/web-design/five-rules-aria-html/).

[**Hiding elements from screen readers using aria-hidden (3)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.yzLraL.small.c0201372-25b3-48bb-a2c2-82d412bf5ea2.png)](https://codepen.io/accessibility-developer-guide/pen/yzLraL){.code}