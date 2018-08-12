---
navigation_title: "Colors & contrast"
position: 1
changed: "2018-08-11"
---

# Colors and contrast

**In a typical project's life cycle, accessibility is crucial long before the first line of code is written: namely when the visual design is created. During this process, a number of visual aspects are to be defined: the palette of available colours, their combinations and resulting contrasts, and their possible meanings.**

. As the used color palette directly affects the readability of content, it needs to be composed wisely and according to some basic rules


- Wenn eine Farbe eine Statusänderung anzeigt => 3:1?
    - Alternative: ein Icon dazu (z.B. dessen Form ändern bei aktivem Element)
- Kontrast ist wichtig bei:
    - Text
    - Interaktive Elemente (z.B. Formularbegrenzungen)
    - Bilder (z.B. Diagramme)
- Logos sind nicht betroffen von Anforderungen
    - Corporate visual guidelines beyond logo and logotype are not included in the exception
- High Contrast Mode (HCM)
- "Real" vs. "decorative" visual data
    - Real: border, outline, bold, underline, etc.
    - Decorative (not visible in HCM): shadow, background-color/image, color, etc.
- text auf uneinheitlichem hintergrund
    - (semitransparente) box hinter text?
- kontrast erhöhen mit leichtem schatten um text?
- Text that is decorative and conveys no information is excluded, e.g. random words for background
    - What about disabled text in an edit field??
    - What about placeholders??
- contrast is calculated in such a way that color is not a key factor so that people who have a color vision deficit will also have adequate contrast
- Text that is larger and has wider character strokes is easier to read at lower contrast. The contrast requirement for larger text is therefore lower (18 point text or 14 point bold text)
    - The ratio between sizes in points and CSS pixels is 1pt = 1.333px, therefore 14pt and 18pt are equivalent to approximately 18.5px and 24px
    - this also holds true for text on images
        - be sure to keep in mind that different PPI (pixels per inch) values and scaling an image may have an impact on the font size
        - Images of text do not scale as well as text because they tend to pixelate. It is also harder to change foreground and background contrast and color combinations for images of text, which is necessary for some users. Therefore, we suggest using text wherever possible, and when not, consider supplying an image of higher resolution.
- Incidental text, such as in photographs that happen to include a street sign, are not included.
- Anti alias Problematik!
- Automatisierte Kontrastchecker sind problematisch
