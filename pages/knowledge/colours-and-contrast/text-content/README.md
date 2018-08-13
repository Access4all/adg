---
navigation_title: "Text content"
position: 3
changed: "2018-08-12"
---

# Contrast requirements of text content

**There is a general minimal colour contrast level for all kinds of text, and a slightly lower one for large text. The requirement applies to both "real" text and rasterised text on images.**

## Real text

With "real" text, we mean text that is truly available as an arrangement of character codes (like this text here). Some of its inherent characteristics is that you can select it, and copy&paste it between applications. It is machine-readable.

In general, text needs a contrast ratio of at least `4.5:1` against adjacent color(s).

There is a single exception to this rule: "large" text.

### Large text

Large text is considered easier to read. It needs a lower contrast ratio of at least `3:1` against adjacent color(s).

Large text is defined as:

- Either **bold** text of at least 14 points (or 18.5 pixels).
    - For example `font-size: 14pt; font-weight: bold` (or `font-size: 18.5px; font-weight: bold`).
- Or regular text of at least 18 points (or 24 pixels).
    - For example `font-size: 18pt` (or `font-size: 24px`).

Note: the ratio between sizes in points and CSS pixels approximately is `1pt = 1.333px`.

## Text on images

With text on images, we mean text that is printed on a rasterised image (like JPG or PNG). During rasterisation, text loses all its inherent characteristics, so neither you can select it (and copy&paste it), nor is it machine-readable. Admitted, computers may apply optical character recognition (OCR) to it, and some screen readers indeed try to do that; but it remains a rather wobbly process and is not done by default.

In general, for text on images, the same rules apply like for "real" text. Keep in mind though that an image's points per inch (PPI) value may vary, and scaling images up or down in a browser will also influence its display size. Furthermore, do not forget to set the displayed text as the image's alternative text (`alt` attribute).

Compared to "real" text, placing text on images has additional downsides:

- It does not scale as well because it tends to pixelate.
    - To address this issue, consider supplying an image of higher resolution (so it can be scaled up without quality loss to some degree).
- Changing foreground and background contrast and color combinations is hardly possible, but needed by some users (like visually impaired ones).
- It cannot be replaced by the user with a custom font (for example a dyslexia-friendly one).
- It does not reflow and can lead to horizontal scrolling, especially when zoom is applied to the website.
- It is much heavier in file size and triggers an additional server request; as such it slows down rendering.

Alas, we recommend not to use text on images. The usage of pure text images can be seen as a relict of older days where custom fonts could not easily be included and styled as needed. Nowadays, please use custom fonts and CSS styles if possible.

## Exceptions

There are some exceptions to the contrast requirements of text content.

- **Logos** usually must adhere strictly to a corporate's design guidelines and thus may be displayed in its original colours (needless to say that it still is unpleasant if your clients cannot perceive your logo).
- **Decorative** text: this could be the background pattern of an image that is created from random words.
- **Incidental** text: this could be a random street sign somewhere in the background of a photograph.
- **Placeholder** text: this could be a placeholder value in a form control - as long as it is used as intended (namely to give an example for a valid input), and not misused as the replacement for a proper label.
    - TODO: Example for floating labels! Alleine schon wenn ein Hinweis auf ein Format im Placeholder ist, ist es ein Problem!
- **Disabled** text: this could be a disabled button's value.
    - TODO: Example! Hier aufzeigen, dass ungenügende Kontraste auch hier problematisch sein können, weil schlecht sehende Nutzer ggf. nicht sehen, dass da überhaupt ein Button sein könnte (etwa wenn alle Textfelder ausgefüllt sind).
