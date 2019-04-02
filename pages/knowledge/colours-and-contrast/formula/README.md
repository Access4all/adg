---
navigation_title: "Calculate Contrast"
position: 1
changed: "2018-12-26"
---

# How to calculate colour contrast

**There is a mathematical formula to calculate the contrast ratio between two colours. Using this formula for contrast evaluation is always better than relying only on your eyes.**

Please note that we are keeping technical explanations simple here. If you want to read a detailed definition of the colour contrast formula, please go to [contrast ratio (W3.org)](https://www.w3.org/TR/WCAG20/#contrast-ratiodef).

## Relative luminance

Contrast is calculated using “relative luminance”, which is defined as:

> The relative brightness of any point in a colorspace, normalized to `0` for darkest black and `1` for lightest white.

Quote: [relative luminance (W3.org)](https://www.w3.org/TR/WCAG20/#relativeluminancedef)

![Relative luminance gradient](_media/relative-luminance-gradient.png)

The relative luminance can be calculated from any colour code (like HEX or RGB).

## The formula

To calculate the contrast ratio, the relative luminance of the lighter colour (`L1`) is divided through the relative luminance of the darker colour (`L2`), like so:

    (L1 + 0.05) / (L2 + 0.05)

This results in a value ranging from `1:1` (no contrast at all) to `21:1` (the highest possible contrast). While high contrast is generally good, higher is not always better. Research indicates that a moderate contrast somewhere between the extremes may be best.

## Tone is not a key factor

For relative luminance, the tone of a colour (whether it is red, green, blue, yellow…) is not a key factor. After all, adequate contrast is also necessary for people who can’t perceive certain colours or people who don’t see colours at all.

This means that visually distinct colours don’t automatically have a high contrast ratio. The following example demonstrates this.

![Three low contrast colours](_media/three-low-contrast-colours.png)

Contrast results:

- Red / blue = `1.1:1`.
- Blue / green = `1.0:1`.
- Green / red = `1.2:1`.

So, while visually non-impaired users might be able to easily perceive the green and red words on the blue background of the following image…

![Green and red words on blue background](_media/hello-goodbye.png)

… others ill have a very hard time differentiating between text and background. This is how it would look for someone who sees in grayscale:

![Words and background in grayscale](_media/hello-goodbye-grayscale.png)

Conclusion: Do not rely on your eyes only! Always examine contrast ratios as calculated values. Fortunately, we don’t need to do the calculations ourselves. There is a range of available colour evaluation tools for us to use.