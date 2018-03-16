---
layout: layout
title: "How to implement widgets working for all"
navigation_title: "Widgets"
position: 4
lead: ""
---

# How to implement widgets working for all

Once again, standard browser behaviour - based on traditional HTML - is a fool-proof way to provide even complex custom functionality.

Let's think again about the true spirit of tablists: what is their purpose? They offer a list of items that are toggling the visibility of related containers. Only one item can be visible at a time, and if another one is activated, the previously active one gets deactivated automatically.

This sounds a lot like a group of radio buttons, doesn't it?

# Tablist using radio buttons

Instead of re-inventing the wheel by creating our own tablist implementation using loads of more of less meaningful custom HTML containers and JavaScript, why not simply re-use existing standard behaviour:

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

With this approach, we only need to react on the change of a radio button group using JavaScript and toggle the visibility of the respective tabpanel. Everything else works perfectly out of the box, also for keyboard only and screen reader users. And sure, we can change the visual properties to anything we like to resemble a tablist. If you are really curious and want to learn more about this, skip ahead and read [Tablist widgets (a.k.a. tab panels, tabs)](/part--examples-of-accessibility-patterns---introduction/interactive-javascript-and-widgets/tablist-widgets--a-k-a--tab-panels--tabs-){.page}.

# Conclusion

This is a huge improvement in every thinkable aspect, be it usability, accessibility, readability of code (and thus maintainability), or performance. In our guide, we favour this approach over using ARIA whenever possible.