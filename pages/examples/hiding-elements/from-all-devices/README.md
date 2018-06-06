---
navigation_title: "From all devices"
position: 3
changed: "2018-05-13"
---

# Hiding elements from all devices

**To hide an element from all devices means just that: no single device will perceive it anymore (although the element still is present in the DOM). This can be achieved using either an HTML attribute or CSS attributes.**

Elements can be hidden completely from all devices (including screen readers).

## Using hidden attribute

In HTML 5, the `hidden` attribute was introduced. It can be set on an element directly and makes it completely invisible to any device.

[Example](_examples/hiding-elements-from-all-devices-using-hidden-attribute)

### Cross browser compatibility

To make the `hidden` attribute work in older browsers, simply do:

```css
[hidden] {
   display: none;
}
```

## Using CSS properties

Setting `display: none` to an element has the same effect like the `hidden` attribute:

[Example](_examples/hiding-elements-from-all-devices-using-display-none)

The same applies for `visibility: hidden`:

[Example](_examples/hiding-elements-from-all-devices-using-visibility-hidden)

## Which one to use?

We strongly suggest using the HTML attribute `hidden`, as it separates content clearly from presentation. Notice: hiding an element from all channels is a question of content, not of visual presentation.

In addition, it makes obvious in the DOM already what elements are hidden, so it leads to better readable and maintainable code.

## Note about ARIA references

Elements hidden with the techniques shown on this page can still provide content when being referenced using `aria-labelledby` or `aria-describedby`. More info here: [Labelling elements using aria-label and aria-labelledby](/examples/sensible-aria-usage/label-labelledby).

## Additional notes

`display: none` wird ignoriert im Fokus Mode!

```html
<a href="...">
  Google
  <span style="display: none">sucks!</span>
</a>
```

Im Browse Mode: "Google". Im Fokus Mode: "Google sucks!"

Vielleicht sollte man noch etwas stärker darauf eingehen, dass es wenig "harte" Standards gibt bez. solcher Edge-Cases (allgemein: welche Infos mit welchen Sichtbarkeits-Stati werden im Focus-Mode wie berücksichtigt?), und dass Screenreader da ziemlich opinionated sind. Am besten all das einfach umgehen mit sauberem HTML, ohne ARIA, ohne zuviel Verstecken, etc.

- Zeigen Element Liste auch Links an, die in `aria-hidden` sind?!
    - Wie am besten vor Screenreadern Maps ausblenden bzw. warnen?! Skip Link darüber?

Formular-Eingabefelder werden trotzdem geschickt, auch wenn sie per CSS versteckt sind! Und wie sieht es hier mit dem `hidden` Attribut aus?