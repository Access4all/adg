---
layout: layout
title: "Hiding elements visually by moving them off-screen"
navigation_title: "Visually"
position: 1
lead: "To hide an element visually means: visually (on a computer screen) it isn't perceivable anymore, but non-visual clients (for example screen readers) still perceive it. There is no official technique for doing this, but there's a well proven workaround."
changed: "2018-03-24"
---

# Hiding elements visually by moving them off-screen

It may be surprising, but the only way to hide an element visually while retaining its perceptibility for screen readers is moving them out of the viewport using absolute positioning:

```css
.visually-hidden {
  position: absolute;
  left:     -10000px;
  top:      auto;
  width:    1px;
  height:   1px;
  overflow: hidden;
}
```

There are several implementations of this workaround. The one presented here is from [CSS in Action (WebAIM.org)](https://webaim.org/techniques/css/invisiblecontent/).

@example[Hiding an element visually](hiding-an-element-visually){.example}

For example, this technique is useful to visually hide headings, as described here: [Adding visually hidden headings to complete a page's outline](/examples/headings/visually-hidden-headings){.page}.

# Toggling visibility on focus

If you are hiding focusable elements using the technique above, make sure that they will appear on screen when getting focus. This way keyboard only users don't "lose" focus when tabbing through a website.

In the following example, press the `Tab` key to focus and show the (previously invisible) "Jump to content" link.

@example[Toggling visibility of a hidden element on focus](toggling-visibility-of-a-hidden-element-on-focus){.example}

# Side effects for visual users

The usage of this technique has some side effects for visual users:

- When searching in the browser for text, elements visually hidden with this technique are still found.
    - This can be confusing, as some of the results may not be visible (though the browser scrolls to the correct viewport position when toggling through the results).
- When selecting text (for example for copying it to the clipboard), elements that were visually hidden using this technique are also selected (if they are between the selection start and selection end position).
    - This can be confusing, as the selected text may differ from what is expected.

# Further possibilities using ARIA

Instead of moving elements out of the viewport, it is possible to replace or add text content specifically for screen readers using ARIA: [ARIA label, describedby and labelledby Attributes](/examples/sensible-usage-of-aria-roles-and-attributes/aria-label-describedby-and-labelledby-attributes){.page}.