---
navigation_title: "Widgets"
position: 3
changed: "2021-09-22"
---

# Widgets simply working for all

**HTML supports interactive controls for most requirements. But what about additional interaction patterns that do not offer an HTML equivalent? Surprisingly to many, standard browser behaviour is also a fool-proof way to provide even complex custom functionalities in the style of modern widgets. The trick is to simply use traditional form controls, change their visual design using CSS, and add the needed interactivity using JavaScript.**

[[_TOC_]]

Let's think about the true spirit of a typical widget, for example a tablist: what is its purpose? It offers a list of items that are toggling the visibility of related containers. Only one item can be visible at a time, and if another one is activated, the previously active one gets deactivated automatically.

This sounds a lot like a group of radio buttons, does it not?

## Tablist using radio buttons

Instead of re-inventing the wheel by creating our own tablist implementation using lots of more or less meaningful custom HTML containers and lots of JavaScript, why not simply re-use existing standard behaviour?

```html
<div class="tablist">
  <fieldset>
    <legend>Tablist controls</legend>
    <input type="radio" name="tablist" value="dancing" id="dancing_label" checked />
    <label for="dancing_label">Dancing</label>

    <input type="radio" name="tablist" value="soccer" id="soccer_label" />
    <label for="soccer_label">Soccer</label>
  </fieldset>

  <div id="dancing_panel">...</div>
  <div id="soccer_panel" hidden>...</div>
</div>
```

With this approach, we only need to react on the change of a radio button group using JavaScript and toggle the visibility of the respective tabpanel. Everything else works perfectly out of the box, also for keyboard only and screen reader users. And sure, we can change the visual properties to anything we like to resemble a tablist.

## Other user interface patterns

It is not always as easy as with tablists. But the approach of using standard HTML form controls to mimic modern control patterns can be applied to most requirements. In fact, this approach is the base of many complex interactive code examples in this guide. If you are really curious and want to learn more about this, skip ahead and read [Interactive widgets](/examples/widgets).

## But isn't this wrong?

It may feel a bit weird (if not to say: blasphemic) to use radio buttons as a tablist. But actually, the majority of users (those with good vision) will never even become aware of the radio buttons, as these are acting completely behind the scenes, and it "just works", out of the box, with minimal effort. So in the end, this is a huge plus in many aspects, be it usability, accessibility, readability of code (and thus maintainability), or performance.

For screen reader users, this approach may be a bit surprising in the first place. They might wonder: "Why is there a group of radio buttons? I'm not inside a form, am I?" To alleviate this, we can make the element more self-explanatory by improving the label texts for screen readers, ie. "Show panel Dancing" (instead of just "Dancing"). And as radio buttons are not tied to a `<form>` element, they can exist anywhere in a website anyway. In general we can say: screen reader users are so much used to encounter inaccessible widgets on a daily basis that they will be very happy that our implementation just does the job for them.
  
## ARIA - Pushing accessibility to the max

If you want to provide an even more accessible experience to screen reader users, you are welcome to use the Accessible Rich Internet Application (ARIA) standard which is aimed to implement widgets that are 100% optimised for screen readers. Just read on, please.
