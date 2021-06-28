---
navigation_title: "Current"
position: 5
changed: "2018-05-14"
---

# Marking elements as the current one using aria-current

**ARIA provides an attribute which allows to mark an element in a set of elements as the current one. It works pretty uniformly in modern browsers and screen readers. Still, for most situations there exist alternative techniques that are more robust.**

[[toc]]

## Background

In modern web applications there are often situations where the user needs to know which one in a set of elements is the current one.

On a visual level, this status typically is indicated using icons, for example a "bullet" icon for the currently selected navigation item. But this information needs to be available also on the semantical level, so screen readers can announce it.

## Intended use

On a semantical level, the `aria-current` attribute is a good choice to convey that an element is the current one:

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

## Peculiarities and side effects

While NVDA announces most of the possible values accurately, it does not make a difference between `aria-current="true"` and `aria-current="false"`. So instead of using the latter, you should simply remove the whole attribute.

## Real world use

Although `aria-current` looks very promising, it was awaited for a long time, and as such is a rather new player in the field of accessibility. While many modern browsers and screen readers seem to have picked it up quite well, there may be a lot of older software that does not yet know about it though.

So instead of using it, for the time being, we recommend using a more traditional technique using visually hidden text.

### Alternative technique using visually hidden text

Instead of fiddling around with ARIA, you can achieve the same result using visually hidden text, see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).

[Example](_examples/marking-elements-using-visually-hidden-text)

While this may seem like a little more work, it is very robust and leaves you much more freedom in choosing adequate labels for describing your current elements.

### Do not confuse with aria-selected

There is another, similarly appealing ARIA attribute called `aria-selected`: it can only be used together with certain roles (for example `role="tablist"`) and as such should not be confused with `aria-current`.

## Conclusion

Due to the described peculiarities, we do not recommend to use `aria-current`.

Instead, stick to the alternative technique using visually hidden text.
