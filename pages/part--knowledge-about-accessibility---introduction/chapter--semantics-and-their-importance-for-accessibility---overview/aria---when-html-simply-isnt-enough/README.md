---
layout: layout
title: "ARIA - when HTML simply isn't enough"
navigation_title: "ARIA"
position: 3
lead: "HTML provides standard tags for the very most requirements of a modern website. When it comes to interactive elements, though, sometimes plain HTML may not be enough anymore. The Accessible Rich Internet Application (ARIA) standard was introduced to fill this gap. But careful: there are pitfalls you need to know about."
---

# ARIA - when HTML simply isn't enough

# Handling HTML shortcomings

During the last 10 to 20 years, not much has changed to the way content is laid out and marked up in HTML. But since its early days, many de-facto standard user interface patterns have made its way into the collective awareness of the internet, often generally referred to as widgets. Many of those lack native HTML equivalents, typical examples being tablists, dropdown menus, and autocompletes.

## Fictional tablist example

Take a look at the following fictional code:

```html
<!-- Fictional example! Will not work in real life. -->
<tablist>
  <tabitem target="dancing">Dancing</tabitem>
  <tabitem target="soccer">Soccer</tabitem>

  <tabpanel id="dancing">...</tabpanel>
  <tabpanel id="soccer">...</tabpanel>
</tablist>
```

It would be great to have something like this natively in HTML, where the browser would provide all behaviour of toggling visibility of elements when activating a tabitem. But this didn't happen yet, and maybe never will.

## Mimicking a tablist visually

Visually, it isn't a problem to mimic a tablist. Just use some appropriate standard HTML, then apply some visual attributes and custom JavaScript behaviour to resemble a tablist's look and feel:

```css
.tablist {
  /* Some nice visual attributes */
}
```

```javascript
$(".tablist [data-target]").click(function() {
  // Some fancy JavaScript to toggle tabpanel visibility
});
```

```html
<div class="tablist">
  <ul>
    <li>
      <button data-target="#dancing" class="active">Dancing</button>
    </li>

    <li>
      <button data-target="#soccer">Soccer</button>
    </li>
  </ul>

  <div id="dancing">...</div>
  <div id="soccer" hidden>...</div>
</div>
```

But as it should be clear by now, simply presenting something visually isn't enough. For example, though visually the currently active tabitem can be distinguished using `class="active"`, screen readers won't know which tabitem in fact is the active one. True semantical information is missing.

# ARIA to the rescue?

To fill this gap, the [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) has introduced the [ARIA](https://www.w3.org/WAI/intro/aria) standard. It provides special HTML attributes (`role` and `aria-*`) that allow to attach or override specific semantical meaning to existing HTML elements.

Many de-facto standard user interface patterns do have an ARIA specification, and so do tablists, see [Accessible Rich Internet Applications (WAI-ARIA) 1.1 - Tablist](https://www.w3.org/TR/wai-aria-1.1/#tablist).

## Tablist using ARIA

Marked up with ARIA, our tablist example would look something like this:

```html
<div class="tablist">
  <ul role="tablist">
    <li role="presentation">
      <button role="tab" aria-controls="dancing" aria-selected="true">Dancing</button>
    </li>

    <li role="presentation">
      <button role="tab" aria-controls="soccer" aria-selected="false">Soccer</button>
    </li>
  </ul>

  <div role="tabpanel" id="dancing">...</div>
  <div role="tabpanel" id="soccer" hidden>...</div>
</div>
```

Some general explanations:

- `role="tablist"` was added to the list container (containing the tabs).
    - The `<ul>` element won't be announced as list now anymore by screen readers, but as something like "tablist" (depending on the screen reader).
- `role="presentation"` was added to the list elements of the former list.
    - As the list isn't a list anymore, the specific `<li>` elements must not have specific list semantics anymore.
    - The `presentation` role removes any semantical information: the `<li>` elements are now treated similar to plain `<div>` elements.
    - It may seem silly to use a semantic container and then remove its semantics. But this is generally a good practice for providing backwards compatibility with legacy screen readers that may not support ARIA.
- `role="tab"` was added to each tab element.
    - The `<button>` element won't be announced as button now anymore by screen readers, but as something like "tab" (depending on the screen reader).
    - In addition, some special `aria-*` attributes were added:
        - `aria-controls` lets screen readers know, which tabpanel's visibility is toggled upon activation or deactivation of the tab. This allows to quickly jump from tabitem to tabpanel forth and back (depending on the screen reader).
        - `aria-selected` lets screen readers know, which tab is currently the active one, and announces this to the user with something like "active" (depending on the screen reader).

Nice and clean. This looks pretty promising, doesn't it?

## A magic all-in-one solution? No.

Are you in hope of ARIA magically solving all the problems with missing semantics?

Don't be over-optimistic: ARIA is a bare set of attributes and their specific values. So in contrast to traditional HTML, the browser doesn't take care of anything itself. You still have to provide all the interactivity yourself using JavaScript! In the current example, you have to:

- Take care of toggling the visibility of the tabpanels.
- Take care of toggling `aria-selected`.

Admitted, a tablist is a rather easy user interface pattern, so it's not too hard to provide this functionality yourself. But there are much more complex patterns (for example, autocompletes), where it can become a major challenge managing all the required attributes and keeping their states and visual representation in sync.

## Heterogenous support

To make things even less satisfying, ARIA support among browsers and screen readers varies a lot. And both browsers and screen readers are prone to being buggy. This is especially the case regarding ARIA support. If you are really curious and want to learn more about this, skip ahead and read [How screen readers work - and why they seem so buggy](/part--knowledge-about-accessibility---introduction/chapter--introduction-to-desktop-screen-reader-usage---overview/how-screen-readers-work---and-why-they-seem-so-buggy){.page}.

As such, there are extremely few truly working examples of ARIA widgets available on the web. And those few ones usually need a lot of complex code to work around known problems.

But don't worry, read on, and we will provide you with alternative techniques that are very easy to implement and work reliably.

# Safe use of ARIA

There are a few `aria-*` attributes that fill some gaps HTML doesn't provide a native solution for. Working pretty reliably in modern browsers and screen readers, the following attributes can be recommended as safe to use:

- `aria-label` and `aria-labelledby` are used to label an element
- `aria-describedby` is used to add description to an element
- `aria-expanded` is used to describe an element's expand/collapse status
- `aria-hidden` is used to hide non-focusable elements (including children) from screen readers

## Discretion advised

There are only very rare situations where HTML isn't enough. In those (and only those) situations, using ARIA is advised. In any other situation, when using a clean and semantically correct HTML structure can provide for a situation, using ARIA is strongly discouraged. This is due to its heterogenous support among browsers and screen readers (see above).

If you are really curious and want to learn more about this, skip ahead and read [Sensible Usage of ARIA Roles and Attributes](/part--examples-of-accessibility-patterns---introduction/sensible-usage-of-aria-roles-and-attributes){.page}.

# Mis-use of ARIA

One last problematic topic with ARIA is that it is often misunderstood as "general repair kit" for accessibility problems. Developers new to accessibility usually think that ARIA that can be used to fix accessibility problems for all sorts of bad HTML code. In general though, throwing some ARIA attributes into the mix of bad semantics doesn't leverage any problem. Most of the time, the exact opposite is the case.

## Fixing broken semantics

ARIA isn't meant to be used to "fix" standard elements that lack semantical meaning.

Let's look again at an example of a link that isn't properly marked up as such. But this time, it is spiced up with `role="link"`:

```html
<span class="link" onclick="..." role="link">
  Google
</span>
```

Admittedly, this makes screen readers announce the element as link. But still, this approach is missing a lot of standard functionality: it isn't focusable, it needs custom JavaScript, browser history may be broken, just to name a few. And legacy screen readers may have no support for `role="link"` anyway.

So remember: adding ARIA to add missing semantical meaning is never a good solution. Always use the proper HTML tag itself!

## Adding redundant semantics

We also sometimes see overzealous developers adding redundant ARIA roles to elements, thinking it would enhance accessibility:

```html
<form role="form">
  ...
</form>

<a href="..." role="link">
  Google
</a>
```

It doesn't - quite the contrary often is the case, as screen readers seem to behave buggy from stuff like this.

## Providing missing content

TODO: always use "real" content! If you face a situation where a screen reader user needs different information, you're on the wrong track. only if you're adding additional info (enhancing existing), usage of ARIA may be a good idea.