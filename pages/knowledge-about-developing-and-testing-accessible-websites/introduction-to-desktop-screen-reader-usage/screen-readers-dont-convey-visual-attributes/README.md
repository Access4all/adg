---
layout: layout
title: "Screen readers don't convey visual attributes"
position: 4
lead: "Similar to reading a text-only book, screen readers only announce plain content and semantics."
---

# Screen readers don't convey visual attributes

Screen readers don't announce visual attributes of elements (e.g. that a text's font-size is big and its color is red)! Only plain content and semantics (e.g. "heading level 3" or "link") is announced.

So adding proper semantics not only helps to announce elements in such a way that screen reader users know what can be done with them - it also allows to navigate content quickly (e.g. by jumping from heading to heading, see [How to work with headings](/code-examples-of-common-patterns-and-daily-requirements/heading-outlines/how-to-work-with-headings){.page}), providing the opportunity to choose which content should be digested.

For more info see [What are semantics and why are they important for accessibility?](/knowledge-about-developing-and-testing-accessible-websites/what-are-semantics-and-why-are-they-important-for-accessibility){.page}.

# Disabled CSS doesn't equal screen reader output

Although disabling a website's CSS may give a rudimentary feeling of what the website may "look" to a screen reader, it's by no means identical to the real output: There are a few CSS rules that in fact have a critical influence on what info is perceivable by screen readers (and how), so disabling CSS can have radical impacts.

Most of all, special attention needs to be paid to the different values of the `display` attribute:

- Some can hide elements from screen readers (see [Hiding elements correctly](/code-examples-of-common-patterns-and-daily-requirements/hiding-elements-correctly){.page})
- Some can change how screen readers split blocks of information (see [Block vs. Inline Elements](/code-examples-of-common-patterns-and-daily-requirements/block-vs--inline-elements){.page})
- Some can change the role of an element (see [Changing a table's visual display](/code-examples-of-common-patterns-and-daily-requirements/data-and-layout-tables/changing-a-tables-visual-display){.page})
- TODO: Others?