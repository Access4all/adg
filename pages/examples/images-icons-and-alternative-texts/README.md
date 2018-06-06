---
navigation_title: "Images, Icons, and Alternative Texts"
position: 9
changed: "2018-05-29"
---

# Images, Icons, and Alternative Texts

**TODO**

A lot of information on the internet is conveyed through graphical objects - which a screen reader is unable to interprete. How can adequate alternatives be provided in textual form?

- **Browsing images <sup>to do</sup>** - browse images of different types
  - **Purely decorative images <sup>to do</sup>** - how to hide them from screenreaders
  - **Complex images <sup>to do</sup>** - explore different ways of describing them properly
  - **Browsing scalable vector graphics (SVG) <sup>to do</sup>** - these cool things can be very accessible
  - **Images in links <sup>to do</sup>** - what alternative text is appropriate?
  - **Logos / home page links <sup>to do</sup>** - two purposes in one!
  - **HTML5 figure/figcaption <sup>to do</sup>** - how to make sure it's backwards compatible
  - **A lot more to come here soon (hopefully)**

- Font Icons shouldn't be used anymore!
    - <https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/>
    - If you still need to use it, follow these instructions: <https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html>

## Additional notes

Cooles schlechtes Beispiel: eine Tabelle mit Icons ohne Alternativtext, wie etwa hier: <https://ticketfrog.ch/de/index.html>

- In general, do rather not use `::before`/`::after` elements for putting `content` in them!
    - This will be announced by screen readers, and CSS is NOT meant to be used for "real" content!
    - Although putting visual indicators like `►` is tempting, this seems to be problematic with NVDA and `aria-expanded`, see <https://github.com/nvaccess/nvda/issues/8341>.