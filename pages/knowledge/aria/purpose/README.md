---
layout: layout
title: "The purpose behind the WAI-ARIA standard"
navigation_title: "Purpose"
position: 1
lead: "HTML provides standard tags for the very most requirements of a modern website. When it comes to interactive elements, though, sometimes plain HTML may not be enough anymore. The Accessible Rich Internet Application (ARIA) standard was introduced to fill this gap. But careful: there are pitfalls you need to know about."
changed: 2018-02-02
---

# The purpose behind the WAI-ARIA standard

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

But simply presenting something visually isn't enough for screen readers (if you are really curious and want to learn more about this, skip ahead and read [Screen readers don't convey visual attributes](/knowledge/desktop-screen-readers/no-visual-attributes){.page}). For example, though visually the currently active tabitem can be distinguished using `class="active"`, screen readers won't know which tabitem in fact is the active one. True semantical information is missing.

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

First, `role="tablist"` was added to the list container (containing the tabs). The `<ul>` element won't be announced as list now anymore by screen readers, but as something like "tablist" (depending on the screen reader).

Then, `role="presentation"` was added to the list elements of the former list. As the list isn't a list anymore, the specific `<li>` elements must not have specific list semantics anymore. The `presentation` role removes any semantical information: the `<li>` elements are now treated similar to plain `<div>` elements. It may seem silly to use a semantic container and then remove its semantics. But this is generally a good practice for providing backwards compatibility with legacy screen readers that may not support ARIA.

Finally, `role="tab"` was added to each tab element. The `<button>` element won't be announced as button now anymore by screen readers, but as something like "tab" (depending on the screen reader). In addition, some special `aria-*` attributes were added:

- `aria-controls` lets screen readers know, which tabpanel's visibility is toggled upon activation or deactivation of the tab. This allows to quickly jump from tabitem to tabpanel forth and back (depending on the screen reader).
- `aria-selected` lets screen readers know, which tab is currently the active one, and announces this to the user with something like "active" (depending on the screen reader).

Nice and clean. This looks pretty promising, doesn't it?

## A magic all-in-one solution? No.

Are you in hope of ARIA magically solving all the problems with missing semantics?

Don't be over-optimistic: ARIA is a bare set of attributes and their specific values. So in contrast to traditional HTML, the browser doesn't take care of anything itself. You still have to provide all the interactivity yourself using JavaScript! In the current example, you have to:

- Take care of toggling the visibility of the tabpanels.
- Take care of toggling `aria-selected`.

Admitted, a tablist is a rather easy user interface pattern, so it's not too hard to provide this functionality yourself. But there are much more complex patterns (for example, autocompletes), where it can become a major challenge managing all the required attributes and keeping their states and visual representation in sync.

## Non-homogenous support

To make things even less satisfying, ARIA support among browsers and screen readers varies a lot. And both browsers and screen readers are prone to being buggy. This is especially the case regarding ARIA support: as soon as the `role` attribute is used, unexpected things may happen. If you are really curious and want to learn more about this, skip ahead and read [How screen readers work - and why they seem so buggy](/knowledge/desktop-screen-readers/so-buggy){.page}.

As such, there are extremely few truly working examples of ARIA widgets available on the web. And those few ones usually need a lot of complex code to work around known problems.

# Conclusion

Aside from the `role` attribute, there exist `aria-*` attributes that can be used standalone. In a few specific situations, they can be of real help, but you need to know exactly in which cases. Please read on.

But regarding widgets: instead of using complex ARIA semantics and developing all interactivity on one's own, once again, using traditional HTML helps in creating even complex interactive usage patterns. So if you haven't done this yet, go back and read [Widgets simply working for all](/knowledge/semantics/widgets){.page}.
