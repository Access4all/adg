---
layout: layout
title: "Screen readers don't convey visual attributes"
navigation_title: "No visual attributes"
position: 4
lead: "Similar to reading a text book, screen readers only announce plain content, enriched with semantical info. Visual attributes are totally ignored. Interestingly, this still doesn't mean that CSS doesn't have any influence at all on screen readers!"
---

# Screen readers don't convey visual attributes

Screen readers don't announce visual attributes of elements (for example that a text's font-size is big and its color is red). Only plain text and semantical info (for example "heading level 3" or "link") is announced.

So if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics){.page}.

# Disabled CSS equals screen reader? No.

Some resources propose disabling CSS in the browser, holding the opinion that this should provide a sort-of-similar view to the one of a screen reader.

But although this in fact may give a rudimentary feeling of what the website "looks" to a screen reader, it's by no means identical to the real output! First of all, images are still displayed. And then, there are a few CSS rules that in fact have a critical influence on what info is perceivable by screen readers (and how), so disabling CSS can have radical impacts.

Most of all, special attention needs to be paid to the different values of the `display` attribute:

- Some can hide elements from screen readers.
    - If you are really curious and want to learn more about this, skip ahead and read [Hiding elements correctly](/examples/hiding-elements){.page}.
- Some can change how screen readers split blocks of information.
    - If you are really curious and want to learn more about this, skip ahead and read [Block vs. Inline Elements](/examples/block-vs-inline-elements){.page}.
- Some can change the role of an element.
    - If you are really curious and want to learn more about this, skip ahead and read [Changing a table's visual display](/examples/tables/changing-a-tables-visual-display){.page}.
- Fiddling around with the `content` attribute and pseudo elements sometimes may have unexpected side effects.

So if you know its shortcomings, disabling CSS sometimes can be a useful "poor man's screen reader substitute". But it will never be a real replacement!