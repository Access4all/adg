---
layout: layout
title: "Screen readers are one-dimensional"
---

# Screen readers are one-dimensional

While sighted users perceive a page as a two-dimensional area, screen reader users convey a page in a linear (one-dimensional) way.

# Screen readers are linear

A sighted user using a traditional display perceives the full layout of a page in a two-dimensional way. Within fractions of a second, the user intuitively recognises the different areas of a page, e.g.:

- Header (typically on top with a logo)
- Navigation (typically part of the header or on the left side)
- Main content (typically the biggest area of the page, enclosed by the other areas)
- Footer (typically at the bottom)
- Etc.

On the other hand, a blind user using a screen reader perceives a page in a linear (one-dimensional) way. Like a book, a page is read aloud by the screen reader line by line from the very top to the very bottom:

- This is due to the nature of spoken information: it's presented in a purely linear fashion, one word after the other
- So a screen reader can "be" always only on one single position in the whole page, similar to the [caret](https://en.wikipedia.org/wiki/Caret_navigation) of a text processor (e.g. [Microsoft Word](https://products.office.com/word))
- The screen reader reads aloud the information fragment within which its caret currently is
    - Depending on how the user navigates, typically either a full line, a word, or a single character is announced.
    - The position of the caret can then be moved (typically with the arrow keys) by the user to another information fragment (e.g. from one line to the next line, or from one word to the next word), each of which then is announced by the screen reader.

This way, the user typically makes his way through the whole document from the very top to the very bottom - or until he finds the information he's looking for.

# Screen readers don't convey visual attributes

Similar to reading a book, screen readers don't announce visual attributes of elements (e.g. that a text's font-size is big and its color is red)! Only plain content and semantics (e.g. "heading level 3" or "link") is announced.

So adding proper semantics not only helps to announce elements in such a way that screen reader users know what can be done with them - it also allows to navigate content quickly (e.g. by jumping from heading to heading, see [How to browse headings](/code-examples/accessible-heading-outlines/how-to-browse-headings){.page}), providing the opportunity to choose which content should be digested.

For more info see [What are semantics and why are they important for accessibility?](/knowledge-about-developing-and-testing-accessible-websites/what-are-semantics-and-why-are-they-important-for-accessibility){.page}.