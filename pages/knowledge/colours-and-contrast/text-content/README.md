---
navigation_title: "Text content"
position: 3
changed: "2018-08-12"
---

# Contrast requirements of text content

**TODO**

There is a distinction between large text and default text.

## Large text

Large text is defined as:

- Either **bold** text of at least 14 points (or 18.5 pixels).
    - For example `font-size: 14pt; font-weight: bold` or `font-size: 18.5px; font-weight: bold`.
- Or regular text of at least 18 points (or 24 pixels).
    - For example `font-size: 18pt` or `font-size: 24px`.

To offer enough contrast, large text needs a ratio of at least `3:1`.

Note: the ratio between sizes in points and CSS pixels approximately is `1pt = 1.333px`.

## Default text

All other text simply is default text. As per definition it is smaller than large text, it is considered harder to read, needing a higher contrast ratio of at least `4.5:1`.

## Text on images

For text on images, the same rules apply. Keep in mind that an image's points per inch (PPI) value may vary, and scaling images up or down in a browser will also influence its display size.

Text on images in most cases is a relict of older days where custom fonts could not easily be included on a website. They have clear downsides:

- Images of text do not scale as well as text because they tend to pixelate.
- Some users need to to change foreground and background contrast and color combinations for text, which is hardly possible for images of text.

Alas, we recommend not to use text on images; instead use custom fonts if possible.

If for some reaons you still need text on an image, be sure to also add it as the image's alternative text. In addition, consider supplying an image of higher resolution (so it can be scaled to some degree by the browser).

## Exceptions

There are some exceptions to the contrast requirements.

- **Logos** usually must adhere strictly to a corporate's design guidelines and thus may be displayed in its original colours (needless to say that it still is unpleasant if your clients cannot perceive your logo).
- **Decorative** text: this could be the background pattern of an image that is created from random words.
- **Incidental** text: this could be a random street sign somewhere in the background of a photograph.
- **Placeholder** text: this could be a placeholder value in a form control - as long as it is used as intended (namely to give an example for a valid input), and not misused as the replacement for a proper label.
    - TODO: Example for floating labels! Alleine schon wenn ein Hinweis auf ein Format im Placeholder ist, ist es ein Problem!
- **Disabled** text: this could be a disabled button's value.
    - TODO: Example! Hier aufzeigen, dass ungenügende Kontraste auch hier problematisch sein können, weil schlecht sehende Nutzer ggf. nicht sehen, dass da überhaupt ein Button sein könnte (etwa wenn alle Textfelder ausgefüllt sind).
