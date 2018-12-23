---
navigation_title: "Requirements for text"
position: 3
changed: "2018-08-12"
---

# Contrast requirements of text content

**There is a general minimal colour contrast level for all kinds of text. As an exception, large text can have slightly lower contrast. This requirement applies to both “real” text and rasterised text on images.**

## Real text

With "real" text, we mean text that is truly available as an arrangement of character codes (like this text here). Some of its inherent characteristics is that you can select it, and copy&paste it between applications. It is machine-readable.

In general, text needs a contrast ratio of at least `4.5:1` against adjacent color(s) (source: [WCAG 2.1 guidelines for text contrast, level AA](https://www.w3.org/TR/WCAG21/#contrast-minimum)).

For example, the following image has a white background and shows a text with a colour gradient overlay from white to black.

![Text with colour gradient overlay](_media/lazy-dog.png)

The white on the left has a contrast ratio of `1:1`. The black to the right has a contrast ratio of `21:1`. Somewhere around the `m`, the required contrast of `4.5:1` is reached.

### Large text

There is a single exception to the general rule: "large" text. It is considered easier to read and can therefore be set in a lower contrast ratio of at least `3:1` against adjacent colour(s) (source: [WCAG 2.1 guidelines for text contrast, level AA](https://www.w3.org/TR/WCAG21/#contrast-minimum))

Large text is defined as:

- Either **bold** text of at least 14 points (or 18.5 pixels). For example `font-size: 14pt; font-weight: bold` (or `font-size: 18.5px; font-weight: bold`).
- Or regular text of at least 18 points (or 24 pixels). For example `font-size: 18pt` (or `font-size: 24px`).

(source: [WCAG 2.1 definition of “large scale(text)”](https://www.w3.org/TR/WCAG21/#dfn-large-scale))

Note: the ratio between sizes in points and CSS pixels approximately is `1pt = 1.333px`.

Let us look again at the previous image’s text with gradient overlay.

![Text with colour gradient overlay](_media/lazy-dog.png)

Somewhere around the `x`, the required contrast of `3:1` is reached (compared to the `m` with a ratio of `4.5:1`).

Look at the following image that displays both large and default text with contrasts of exactly `3:1` and `4.5:1`.

![Small and large text](_media/small-and-large-text.png)

It may not seem like much of a difference, but in fact it heavily enlargens the number of possible colour combinations.

## Exceptions

There are some exceptions to the contrast requirements of text content.

- **Logos** usually must adhere strictly to corporate design guidelines and thus may be displayed in those colours regardless of contrast ratios (needless to say that it still is unpleasant if your clients cannot perceive your logo).
- **Decorative** text: this could be the background pattern of an image that is created from random words.
- **Incidental** text: this could be a random street sign somewhere in the background of a photograph.
- **Disabled** text: this could be the label of a disabled element in an online form.

## Enhancing text contrast

Besides directly changing the colour of the text or the background there are some additional options to improve contrast.

### Increasing contrast using shadow

Drop shadow around text can make up for insufficient contrast between text colour and background.

For example, look at the following image. It shows two words, both with a red fill that has an insufficient contrast of `2.1:1` to the white background.

![A word without and a word with shadow](_media/words-without-and-with-shadow.png)

The shadow of the second word results in a contrast of appropriately `4.5:1`.

In CSS, the appropriate property would be something like `text-shadow: 0 0 2px #000`.

### Enhancing non-homogeneous backgrounds

In some cases, text is displayed on non-homogeneous backgrounds. Depending on the heterogeneity of the background, the text may be very hard to read.

For example, look at the following image. It shows a white text "Welcome to the beach!" on blue sky with some white clouds. While there is decent contrast between white text and blue sky there is almost no contrast between white text and white clouds. Overall it’s very hard to read.

![White text on blue sky and white clouds](_media/beach.png)

You could increase contrast by adding a text shadow as described above. Or you could add a semi-transparent darkening layer between text and background

![White text with semi-transparent darkening background](_media/beach-with-background.png)

Of course you can also combine different solutions to add up their effects.

### Adding graphical information

Sometimes, colour gets used as the only differentiating factor. For example, the following image shows a gray text, and some of the words are highlighted red to mark spelling mistakes.

![Spelling mistakes marked with colour](_media/spelling-mistakes.png)

The colour contrast ratio between the gray and the red is `1:1`! A colour-blind person will not be able to spot any difference.

In such situations, it is useful to add some additional graphical information. For example, simple underlining of the mistakes solves the problem.

![Spelling mistakes underlined](_media/spelling-mistakes-underlined.png)

Or add an icon to it, in the following case an exclamation mark.

![Spelling mistakes with signals](_media/spelling-mistakes-with-signals.png)

By the way, make sure to not just focus on the visual appearance but also on the underlying markup. It should provide adequate semantic information to clearly differentiate elements also on a non-visual level. (For more information take a look at [Semantics and their importance for accessibility](/knowledge/semantics/))

## Text images

With “text images”, we mean rasterised text that is part of an pixel-based image like a JPG or PNG. In general, the contrast requirements for “real” text also apply for text on images. Excluded is incidental typography on pictures which isn’t meant to convey important information (e.g. as decoration or as part of a scene).

As an aside: Due to the many limitations of text images in terms of flexibility, usability and file size we generally recommend against using it. However, if you *have* to use text images make sure that the displayed text is set as the image’s alternative text (`alt` attribute) so that it is accessible for screen reader users.