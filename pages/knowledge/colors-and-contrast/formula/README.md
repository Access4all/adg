---
navigation_title: "Formula"
position: 1
changed: "2018-08-11"
---

# The color contrast formula

**Visual content (like text, icons, form controls, charts, etc.) needs to be easily perceivable. As such, it must clearly stand out visually from its background. There is a dedicated formula to examine the contrast ratio between two colours: it can be used to reveal whether an element's color offers enough contrast to its background.**

Please note that we are keeping technical explanations simple here. So if you want to read a detailed definition of the color contrast formula, please go to [contrast ratio (W3.org)](https://www.w3.org/TR/WCAG20/#contrast-ratiodef).

Every color has a "relative luminance", defined as:

> The relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white.
>
> Quote: [relative luminance (W3.org)](https://www.w3.org/TR/WCAG20/#relativeluminancedef)

The relative luminance can be calculated from any colour code (like HEX or RGB).

To calculate the contrast ratio, the relative luminance of the lighter color (`L1`) is divided through the relative luminance of the darker color (`L2`), like so:

    (L1 + 0.05) / (L2 + 0.05)

This results in a value ranging from `1:1` (no contrast, which is bad) to `21:1` (highest contrast, which is awesome). Depending on the kind of visual content and its size, a contrast ratio of at least `3:1` or `4.5:1` is required.

Fortunately, we do not need to calculate anything of this manually ourselves when using an appropriate tool. Read on for more details.
