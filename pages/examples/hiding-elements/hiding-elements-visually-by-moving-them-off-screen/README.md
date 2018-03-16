---
layout: layout
title: "Hiding elements visually by moving them off-screen"
position: 1
lead: "Hiding an element visually means that visually it isn't perceivable, but non-visual clients (e.g. screen readers) still perceive it."
---

# Hiding elements visually by moving them off-screen

There is no official technique for doing this, but there's a well proven workaround by moving elements out of the viewport using absolute positioning:

```css
.visually-hidden {
  position: absolute;
  width:    1px;
  height:   1px;
  left:     -10000px;
  overflow: hidden;
}
```

TODO: Beste aktuelle Implementation hier: <https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939>

For example, this technique is useful to visually hide headings, as described here: [Adding visually hidden headings to complete a page's outline](/examples/headings/adding-visually-hidden-headings-to-complete-a-pages-outline){.page}.

[**Hiding elements only visually**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.EwxJgN.small.b8210f2e-a0a8-4e88-860d-44350a67f06b.png)](https://codepen.io/accessibility-developer-guide/pen/EwxJgN){.code}

## Showing visually hidden elements on focus

If you're hiding focusable elements using this technique, make sure that they'll appear on screen when getting focus. This way keyboard only users don't "lose" focus when tabbing through a website.

In the following example, press the `Tab` key to focus and show the (previously invisible) "Jump to content" link.

[**Hiding Elements Only Visually And Showing Them On Focus**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.aydLwr.small.faea00e6-ca14-43e6-b1b3-d68ce46e8b01.png)](https://codepen.io/accessibility-developer-guide/pen/aydLwr){.code}

## VoiceOver/iOS peculiarities

TODO: Scheint unter VoiceOver/iOS "nicht in einem Zug" ausgegeben zu werden, so dass Texte auseinander geschnitten werden!

[**Hiding elements only visually: iOS peculiarities**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.LzEqPd.small.890c3ba3-e6f8-499f-a968-2d7f763b4a5c.png)](https://codepen.io/accessibility-developer-guide/pen/LzEqPd){.code}

Im Zeilen-Lese-Modus wird es aber in einem Zug ausgegeben.

Vielleicht besser, nicht zuviel zu trennen, und stattdessen zwei Info-Blöcke:

[**Hiding elements only visually: iOS peculiarities alternative**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.QqwYdN.small.f0577e05-8f6f-455c-99ad-194f84d6993a.png)](https://codepen.io/accessibility-developer-guide/pen/QqwYdN){.code}

# Side effects for visual users

Using this technique has some side effects for visual users:

- When searching in the browser for text, elements visually hidden with this technique are still found
    - This can be confusing, as some results may not be visible (though the browser scrolls to the correct viewport position when toggling through the results)
- When selecting text (e.g. for copying), elements visually hidden with this technique are also selected (if they are between the selection start and end position)
    - This can be confusing, as the selected text differs from what is expected

# Further possibilities

Instead of moving elements out of the viewport, it's possible to replace or add text content specifically for screen readers using ARIA: [ARIA label, describedby and labelledby Attributes](/examples/sensible-usage-of-aria-roles-and-attributes/aria-label-describedby-and-labelledby-attributes){.page}.

While this sometimes is useful, we recommend to avoid ARIA whenever possible and stick to traditional solutions.