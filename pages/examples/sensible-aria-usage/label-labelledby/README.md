---
navigation_title: "Label & labelledby"
position: 1
changed: "2018-05-14"
---

# Labelling elements using aria-label and aria-labelledby

**ARIA provides attributes which override the accessible label of an element. As they are treated differently in modern browsers and screen readers, they must be used with caution. They also have some noticeable side effects. There exist alternative techniques that are much more robust.**

[[toc]]

## Background

How an element is announced by a screen reader is usually determined by its content. For example, the following link's label is "Google":

```html
<a href="...">
  Google
</a>
```

So a screen reader will announce:

> Google. Link.

## Intended use

ARIA provides two attributes that allow to override these labels.

### Setting a label

Using `aria-label`, an element's label can be set directly. For example, the following link's label is "No, Bing!":

```html
<a href="..." aria-label="No, Bing!">
  Google
</a>
```

So a screen reader will announce:

> No, Bing! Link.

[Example](_examples/labelling-an-element-using-aria-label)

### Referencing a label

Using `aria-labelledby`, an element's label can be set by referencing the ID of another element. For example, the following link's label is "No, Bing!":

```html
<a href="..." aria-labelledby="bing">
  Google
</a>

<div id="bing">
  No, Bing!
</div>
```

By the way, elements hidden using CSS can still be referenced:

```css
#bing {
  display: none;
}
```

Again, a screen reader will announce:

> No, Bing! Link.

[Example](_examples/labelling-an-element-using-aria-labelledby)

## Peculiarities and side effects

### Differences between browsers

While Firefox respects `aria-label` and `aria-labelledby` in both browse and focus mode, Internet Explorer only respects it in focus mode.

### Text not searchable

Text added with `aria-label` is not searchable in browsers. This is confusing to screen reader users, as they are not aware of any difference between "normal" text and `aria-label` text. The same applies for text hidden with `display: none` but referenced using `aria-labelledby`.

## Real world use

In general, HTML elements provide their own way of labelling:

- Many elements like links or buttons are labelled through their content: `<button>This is the label</button>`
- Images are labelled using the `alt` attribute: `<img src="..." alt="This is the label" />`.
- Tables are labelled using the `caption` attribute, see [General good table example](/examples/tables/good-example).
- Form controls are labelled using `<label>` elements, see [General good form example](/examples/forms/good-example).
- Page regions are labelled best using headings, see [Alternative techniques for labelling page regions](/examples/headings/alternative-techniques).
- Etc.

As such, there are very rare cases (if any) where `aria-label` and `aria-labelledby` are truly the only way to go. For example, a valid usage of `aria-label` could be to override an existing label with additional, more precise information specifically for screen reader users:

```html
<button aria-label="Zoom image: opens a high resolution version, press Esc to close">
  Zoom image
</button>
```

However, why not present this information to every user, for example using a tooltip (see [Tooltip widgets (or: screen tip, balloon)](/examples/widgets/tooltips))?

```html
<button>
  Zoom image
  <span class="tooltip">Opens a high resolution version, press Esc to close</span>
</button>
```

So if you are thinking about enhancing existing information, in most cases there are better ways than using ARIA - ways that are more robust and gives profit to all users.

## Conclusion

If you aim at providing a user experience that is the same for all audiences, you will probably never need `aria-label` and `aria-labelledby`. And due to the described peculiarities and side effects, we do not recommend to use them anyway.

Instead, aim to find labels that are working for all audiences. And if you really need to attach additional information for screen readers, better use visually hidden text (see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually)).
