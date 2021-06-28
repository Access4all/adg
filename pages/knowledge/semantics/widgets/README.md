---
navigation_title: "Widgets"
position: 3
changed: "2018-04-12"
---

# Widgets simply working for all

**HTML supports interactive controls for most requirements. But what about additional interaction patterns that do not offer an HTML equivalent? Surprisingly to many, standard browser behaviour is also a fool-proof way to provide even complex custom functionalities in the style of modern widgets. The trick is to simply use traditional form controls, change their visual design using CSS, and add the needed interactivity using JavaScript.**

[[toc]]

Let's think about the true spirit of a typical widget, for example a tablist: what is its purpose? It offers a list of items that are toggling the visibility of related containers. Only one item can be visible at a time, and if another one is activated, the previously active one gets deactivated automatically.

This sounds a lot like a group of radio buttons, does not it?

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

## Conclusion

This is a huge improvement in every aspect, be it usability, accessibility, readability of code (and thus maintainability), or performance.

## Other patterns

It is not always as easy as with tablists. But the approach of using standard HTML form controls to mimic modern control patterns can be applied to most requirements. In fact, this approach is the basic of most complex interactive code examples in this guide.

If you are really curious and want to learn more about this, skip ahead and read [Interactive widgets](/examples/widgets).