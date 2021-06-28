---
navigation_title: "Presentation"
position: 7
changed: "2018-05-15"
---

# Removing semantics using presentation role

**ARIA provides a role which removes the inherent semantics of an element. While this works in most browsers and screen readers, it is rarely needed.**

[[toc]]

## Background

As we know from [Semantics and their importance for accessibility](/knowledge/semantics), HTML elements all have their inherent role. If for some reason you need to remove this role from an element, you can do this by setting `role="presentation"` (it should be treated like a `<div>` then).

Notice: we know that `role="presentation"` does not work in Internet Explorer. Still we want to talk about it here, as it you may stumble over it during your work as a developer, and it is good for you to know about it.

## Intended use

To a screen reader, the following is no paragraph anymore, and as such cannot be navigated to by pressing the `P` key:

```html
<p role="presentation">
  Hello folks!
</p>
```

[Example](_examples/removing-semantics-using-presentation-role)

## Peculiarities

Using `role="presentation"`, only the role of an element's is removed. Any other inherent feature will remain untouched.

For example, a link with `role="presentation"` neither will be announced as "link" by NVDA nor will it be listed in NVDA's "Elements list" window (`NVDA + F7`). But it will remain being focusable like any other link, and clicking it will still open its `target` location.

[Example](_examples/removing-a-links-role)

## Real world use (and conclusion)

There are only very few edge cases where removing semantics makes sense, usually when fiddling around with ARIA widgets (see [The purpose behind the WAI-ARIA standard](/knowledge/aria/purpose)).

In general, when sticking to this guide's recommendations (especially that widgets should be created using traditional HTML controls, see [Widgets simply working for all](/knowledge/semantics/widgets)), you will not need `role="presentation"` at all.
