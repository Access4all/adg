---
navigation_title: "Purpose"
position: 1
changed: "2018-05-14"
---

# The purpose behind the WAI-ARIA standard

**When it comes to requirements of modern interactive websites, sometimes the semantic vocabulary of HTML may not be enough anymore. To fill this gap, the Accessible Rich Internet Application (ARIA) specification was introduced: it describes how to add semantics to HTML content in order to make user controls and dynamic content more accessible. However, there are pitfalls you need to know about.**

## Handling HTML shortcomings

Over the last 10 to 20 years, not much has changed to the way content is laid out and marked up in HTML. But since its early days, many de-facto standard user interface patterns have made their way into the collective awareness of the internet, often generally referred to as widgets or rich internet applications (RIAs). Many of those lack native HTML equivalents, typical examples being tablists, dropdown menus, and autocompletes.

### Fictional tablist example

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

It would be great to have something like this natively in HTML, where the browser would provide all behaviour of toggling visibility of elements when activating a tabitem. But this did not happen yet, and maybe never will.

### Mimicking a tablist visually

Visually, it is not a problem to mimic a tablist. Just use some appropriate standard HTML, then apply some visual attributes and custom JavaScript behaviour to resemble a tablist's look and feel:

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

But simply presenting something visually is not enough for screen readers (if you are really curious and want to learn more about this, skip ahead and read [Screen readers do not convey visual attributes](/knowledge/desktop-screen-readers/no-visual-attributes)). For example, although the currently active tabitem can be distinguished visually using `class="active"` and some CSS styling, screen readers will not know which tabitem in fact is the active one. Proper semantical information is missing.

## ARIA to the rescue (?)

To fill this gap, the [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) - which belongs to the [World Wide Web Consortium (W3)](https://www.w3.org/) - has introduced the [ARIA](https://www.w3.org/WAI/intro/aria) technical specification. It provides specific HTML attributes (`role` and `aria-*`) that allow adding specific semantical meaning to existing HTML elements:

- `role` attributes add (or override) a semantical role of an element, for example `<span role="button">`.
- `aria-*` attributes provide statuses to the current semantical role, for example `<span role="button" aria-pressed="true">`.
    - Those statuses can have specific values, depending on the role of the element.

Many de-facto standard user interface patterns do have an ARIA specification, and so do tablists, see [Accessible Rich Internet Applications (WAI-ARIA) 1.1 - Tablist](https://www.w3.org/TR/wai-aria-1.1/#tablist).

### Tablist using ARIA

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

We will take a closer look at what these attributes do (or better: what they should do) later in this chapter. For the time being, just take the following for granted.

First, `role="tablist"` was added to the list container (containing the tabs). The `<ul>` element won't be announced as list now anymore by screen readers, but as something like "tablist" (depending on the screen reader).

Then, `role="presentation"` was added to the list elements of the former list. As the list is not a list anymore, the specific `<li>` elements must not have specific list semantics anymore. The `presentation` role removes any semantical information: the `<li>` elements are now treated similar to plain `<div>` elements. It may seem silly to use a semantic container and then remove its semantics. But this is generally a good practice for providing backwards compatibility with legacy screen readers that may not support ARIA.

Finally, `role="tab"` was added to each tab element. The `<button>` element won't be announced as button now anymore by screen readers, but as something like "tab" (depending on the screen reader). In addition, some special `aria-*` attributes were added:

- `aria-controls` lets screen readers know, which tabpanel's visibility is toggled upon activation or deactivation of the tab. This allows to quickly jump from tabitem to tabpanel forth and back (depending on the screen reader).
- `aria-selected` lets screen readers know, which tab is currently the active one, and announces this to the user with something like "active" (depending on the screen reader).

Nice and clean. This looks pretty promising, does not it?

### A magic all-in-one solution? No.

Are you in hope of ARIA "magically" solving all the problems with missing semantics?

Do not be too optimistic: ARIA is a bare set of attributes and their specific values. So in contrast to traditional HTML, the browser does not take care of anything itself. You still have to provide all the interactivity yourself using JavaScript! In the current example, you need to:

- Implement an intuitive keyboard control pattern (or provide clear instruction of how to control the widget with keyboard only and screen readers).
- Take care of toggling the visibility of the tabpanels.
- Take care of toggling `aria-selected`.

Admitted, a tablist is a rather easy user interface pattern, so it is not too hard to provide this functionality yourself. But there are much more complex patterns (for example, autocompletes), where it can become a major challenge managing all the required attributes and keeping their states and visual representation in sync.

#### Varying support

To make things even trickier, ARIA support among browsers and screen readers varies a lot. While some may support an autocomplete or tablist pattern, others may not. And even those claiming to support a pattern are prone to being buggy. This is particularly true regarding ARIA roles: as soon as the `role` attribute is used, unexpected things may happen (if you are really curious and want to learn more about this, skip ahead and read [How screen readers work - and why they seem so buggy](/knowledge/desktop-screen-readers/so-buggy)).

As such, there are extremely few truly working examples of ARIA widgets available on the web. And those few ones usually need a lot of complex code to work around known problems.

#### Non-homogenous behaviour

Besides bugs and many unsupported features, the ARIA specification also often is not strictly black or white, leaving it up to the manufacturers of browsers and screen readers to decide how certain functionalities should behave.

So screen reader behaviour varies a lot regarding ARIA, especially regarding differences between browse and focus modes (if you haven't done this yet, go back and read [Screen readers' browse and focus modes](/knowledge/desktop-screen-readers/browse-focus-modes)).

For example, while all screen readers announce content associated using `aria-describedby` in focus mode, some ignore it in browse mode. And while some screen readers announce the associated content right away, others leave it up to the user whether they want to hear it (by pressing a keyboard shortcut). If you are really curious and want to learn more about this, skip forward and read [Adding descriptions to elements using aria-describedby](/examples/sensible-aria-usage/describedby).

Another example is `aria-hidden`. Its specification promises to hide elements from screen readers. The first surprise is that `aria-hidden` simply does not work on focusable elements in most browsers. The next surprise is that `aria-hidden` does not have any effect on elements that are referenced using `aria-describedby`. If you are really curious and want to learn more about this, skip forward and read [Hiding elements from screen readers using aria-hidden](/examples/sensible-aria-usage/hidden).

All this is not because of varying support degrees among modern screen readers or browsers (all of them claim to fully support `aria-describedby` and `aria-hidden`), but because of non-homogenous behaviour caused by the manufacturers' different opinions.

And as long as no quasi-standard, no ubiquitous convention has been established, working with ARIA will keep being risky.

## Conclusion

The intention behind ARIA is intriguing: it could be a big help in making the web a more accessible place. And knowing that ARIA was released in 2014, it is a real shame that browsers and screen readers still by far aren't capable of truly handling it in a homogenous and robust way. Alas, even if developers use ARIA in perfect accordance to its technical specification, this often will not be of much use for the targeted users. So at the time being, in most cases we do not recommend the use of ARIA. Let us hope that the situation will change for the better some time in the future.

Aside from the `role` attribute (which you should try to avoid in most cases), after all there exist some `aria-*` attributes that can be used standalone and are supported by all modern browsers and screen readers - more or less both homogeneously and robustly. So in some specific situations, these attributes can be of real help, but you need to know exactly in which cases. You will learn more about these in this chapter.

In our guide, we stick to traditional HTML solutions wherever possible to avoid shaky ARIA ground. And if we do suggest ARIA once in a while, you can be confident that it is based on years of experience, so the proposed solution is known to work and has stood the test of time.

And regarding widgets: instead of using complex ARIA semantics and developing all interactivity on one's own, once again, the usage of traditional HTML helps in creating even complex interactive usage patterns. So if you haven't done this yet, go back and read [Widgets simply working for all](/knowledge/semantics/widgets).