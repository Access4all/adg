---
navigation_title: "How to calculate"
position: 1
changed: "2019-12-15"
---

# How to calculate colour contrast

**There is a mathematical formula to calculate the contrast ratio between two colours. Using this formula for contrast evaluation is always better than relying only on your eyes.**

[[toc]]

Please note that we are keeping technical explanations simple here. If you want to read a detailed definition of the colour contrast formula, please go to [contrast ratio (W3.org)](https://www.w3.org/TR/WCAG20/#contrast-ratiodef).

## Relative luminance

Contrast is calculated using "relative luminance", which is defined as:

> The relative brightness of any point in a colorspace, normalized to `0` for darkest black and `1` for lightest white.

Quote: [relative luminance (W3.org)](https://www.w3.org/TR/WCAG20/#relativeluminancedef)

![Relative luminance gradient](_media/relative-luminance-gradient.png)

The relative luminance can be calculated from any colour code (like HEX or RGB).

## The formula

To calculate the contrast ratio, the relative luminance of the lighter colour (`L1`) is divided through the relative luminance of the darker colour (`L2`):

    (L1 + 0.05) / (L2 + 0.05)

This results in a value ranging from `1:1` (no contrast at all) to `21:1` (the highest possible contrast). While high contrast is generally good, higher is not always better. Research indicates that a moderate contrast somewhere between the extremes may be best.

As an aside: In everyday practice we don't have to do this calculation manually, there are many helper tools available. More on that on the next page.

## Tone is not a key factor

For relative luminance, the tone of a colour (whether it is red, green, blue, yellow...) is not a key factor. After all, adequate contrast is also necessary for people who can't perceive certain colours or people who don't see colours at all.

This means that visually distinct colours don't automatically have a high contrast ratio. The following example demonstrates this.

![Colour tiles in the colours blue, red and green](_media/three-colours-tiles.png)

Contrast results:

- Red/blue = `1.1:1`
- Blue/green = `1.0:1`
- Green/red = `1.2:1`

While visually non-impaired users might be able to easily perceive the green and red words on the blue background of the following image...

![The words "Hello" in green and "Goodbye" in red written on a blue background](_media/three-colours-words.png)

... others will have a very hard time differentiating between text and background. This is how it might look for someone who sees in grayscale:

![The same picture with the words "Hello" and "Goodbye" but in grayscale](_media/three-colours-words-grayscale.png)

It's therefore impotant to remember:
- Always examine contrast ratios as calculated values, don't just rely on your eyes. More on that in the next [chapter "How to exampine colour contrast"](/knowledge/colours-and-contrast/how-to-examine/).
- Colour contrast has its limits, especially when multiple objects have to be clearly distinguishable not just from the background but also from each other. More on that in the [chapter "Colour is not enough"](/knowledge/colours-and-contrast/colour-is-not-enough/).
