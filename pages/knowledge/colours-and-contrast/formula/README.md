---
navigation_title: "Formula"
position: 1
changed: "2018-08-11"
---

# The colour contrast formula

**Visual content (like text, icons, form controls, charts, etc.) needs to be easily perceivable. As such, it must clearly stand out visually from its background. There is a dedicated formula to examine the contrast ratio between two colours: it can be used to reveal whether an element's colour offers enough contrast to its background.**

Please note that we are keeping technical explanations simple here. So if you want to read a detailed definition of the colour contrast formula, please go to [contrast ratio (W3.org)](https://www.w3.org/TR/WCAG20/#contrast-ratiodef).

## Relative luminance

Contrast is calculated using "relative luminance", which is defined as:

> The relative brightness of any point in a colorspace, normalized to `0` for darkest black and `1` for lightest white.

Quote: [relative luminance (W3.org)](https://www.w3.org/TR/WCAG20/#relativeluminancedef)

![Relative luminance gradient](_media/relative-luminance-gradient.png)

The relative luminance can be calculated from any colour code (like HEX or RGB).

## The formula (and its results)

To calculate the contrast ratio, the relative luminance of the lighter colour (`L1`) is divided through the relative luminance of the darker colour (`L2`), like so:

    (L1 + 0.05) / (L2 + 0.05)

This results in a value ranging:

- From `1:1`, which means no contrast at all (which is bad).
- To `21:1`, which means highest contrast possible (which is good, although research indicates that a moderate contrast somewhere in between may be best).

Fortunately, we do not need to calculate anything of this manually ourselves when using an appropriate tool. Read on for more details.

## Colour is not a key factor

For relative luminance, colour is not a key factor. This way people will also have adequate contrast who have a colour vision deficit (for example, seeing only grayscale).

But it also means that visually distinct colours do not automatically mean they have a high contrast ratio. The following example demonstrates this.

![Three low contrast colours](_media/three-low-contrast-colours.png)

Contrast results:

- Red / blue = `1.1:1`.
- Blue / green = `1.0:1`.
- Green / red = `1.2:1`.

So although visually non-impaired users should be able to easily (?) perceive the green and red words on the blue background of the following image...

![Green and red words on blue background](_media/hello-goodbye.png)

...others will have a very tough time with it, for example those perceiving only grayscale:

![Words and background in grayscale](_media/hello-goodbye-grayscale.png)

Conclusion: do not rely on your eyes only! Always examine contrasts thoroughly with an appropriate tool.
