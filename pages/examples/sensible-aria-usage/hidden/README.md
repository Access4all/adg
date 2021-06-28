---
navigation_title: "Hidden"
position: 6
changed: "2018-05-14"
---

# Hiding elements from screen readers using aria-hidden

**ARIA provides an attribute which allows to hide elements from screen readers. It works pretty uniformly on non-focusable elements in modern browsers and screen readers, but it still has some very odd peculiarities. So you better try to create solutions that do not need it.**

[[toc]]

## Background

While it is only possible using a workaround to hide elements visually but leave it there for screen readers (see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually)), there exists a specific ARIA attribute `aria-hidden` to hide elements from screen readers (but leaving them there visually).

## Intended use

The following paragraph is ignored by screen readers:

```html
<p aria-hidden="true">
  Hello folks!
</p>
```

[Example](_examples/hiding-an-element-using-aria-hidden)

## Peculiarities and side effects

### All children hidden

When setting `aria-hidden="true"` to an element, all children will also be hidden. It is not possible to override this by setting `aria-hidden="false"` to a child element.

[Example](_examples/trying-to-unhide-an-aria-hidden-child)

### Does not work on focusable elements

You must never use `aria-hidden="true"` on any focusable element, or on any element that itself contains focusable children.

This is due to the fact that `aria-hidden` indeed is respected by screen readers even on focusable elements while reading them in browse mode - but during usage of focus mode, focusable elements are still reachable by the browser (with the `Tab` key), which leads to strange (or missing) announcements of hidden elements.

[Example](_examples/hiding-an-element-with-a-focusable-child)

### Not hidden anymore as description

Elements hidden using `aria-hidden` are not hidden anymore when referencing them using `aria-describedby`.

[Example](_examples/elements-hidden-with-aria-hidden-are-not-hidden-when-referenced)

In focus mode, a screen reader's announcement of the link will be:

> Please click me. Link. This link is not great.

But the "not" in the describing paragraph is hidden using `aria-hidden`. Look at it in browse mode, and it will be announced by screen readers like this:

> This link is great.

Very confusing stuff.

## Real world use (and conclusion)

While you can use `aria-hidden="true"` on any element that is not focusable and does not contain any focusable element itself, you must never use it on focusable elements. Also be careful when referencing hidden elements using `aria-describedby`.

In general: whenever you think about hiding something from any audience, better ask yourself whether this is really a good solution. Most of the time it is better to create a solution that works the same way for everybody, and which does not need any shaky ARIA.
