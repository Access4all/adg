---
navigation_title: 'Current'
position: 5
---

# Marking elements as the current one using aria-current

**ARIA provides an attribute which allows to mark an element in a set of elements as the current one.**

[[_TOC_]]

## Background

In modern web applications there are often situations where the user needs to know which one in a set of elements is the current one.

On a visual level, this status typically is indicated using icons, for example a "bullet" icon for the currently selected navigation item. But this information needs to be available also on the semantical level, so screen readers can announce it.

## Intended use

The `aria-current` attribute is a good choice to convey that an element is the current one:

```html
<ul>
  <li><a href="...">Home</a></li>
  <li><a href="..." aria-current="true">Blog</a></li>
  <li><a href="...">Shop</a></li>
  <li><a href="...">Contact</a></li>
</ul>
```

A screen reader will announce:

> Home. Link
> Blog. Current link.

[Example](_examples/marking-an-element-as-current-using-aria-current)

### Possible values

There are various possible values for `aria-current`:

- `page`: current page within a set of pages.
- `step`: current step within a process.
- `location`: current location within an environment or context.
- `date`: current date within a collection of dates.
- `time`: current time within a set of times.
- `true`: current item within a set.
- `false`: no an item within a set.

[Example](_examples/marking-elements-using-different-aria-current-values)

### Alternative technique using visually hidden text

Instead of using ARIA, you can achieve the same result using visually hidden text, see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).

[Example](_examples/marking-elements-using-visually-hidden-text)

This is a useful alternative when attempting to support old browsers which might be lacking support for `aria-current`.

### Do not confuse with aria-selected

There is another, similarly appealing ARIA attribute called `aria-selected`: it can only be used together with certain roles (for example `role="tablist"`) and as such should not be confused with `aria-current`.
