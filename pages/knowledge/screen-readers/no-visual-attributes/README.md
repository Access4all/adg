---
navigation_title: "No visual attributes"
position: 4
changed: "2018-04-13"
---

# Screen readers do not convey visual attributes

**Similar to the reading of a traditional book, screen readers only announce plain content, enriched with semantical info. Visual attributes are totally ignored. Interestingly, this still does not mean that CSS does not have any influence on screen readers.**

Screen readers do not announce visual attributes of elements (for example a text's font-size and color). Only plain text and semantical information (for example "heading level 3" or "link") is announced by them.

So if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics).

## Disabled CSS equals screen reader? No.

_**Or:** Does a webpage with disabled CSS correspond to how a screen reader perceives it? No, it does not._

Some resources propose disabling CSS in the browser for accessibility testing, holding the opinion that this should provide a sort-of-similar view to the one of a screen reader.

But even if this may give a rudimentary feeling of what the website "looks" to a screen reader, it's by no means identical to the real output! First of all, images are still perceivable (and not replaced with their alternative texts). And then, there are some CSS rules that in fact have a critical influence on what information is perceivable by screen readers (and how). So disabling CSS can have fundamentally diverging impacts compared to how screen readers perceive a webpage.

Most of all, special attention needs to be paid to the different values of the `display` attribute:

- Some can hide elements from screen readers.
    - If you are really curious and want to learn more about this, skip ahead and read [Hiding elements correctly](/examples/hiding-elements).
- Some can change the way how screen readers split blocks of information.
    - If you are really curious and want to learn more about this, skip ahead and read [Block vs. Inline Elements](/examples/block-vs-inline-elements).
- Some can change the role of an element.
    - If you are really curious and want to learn more about this, skip ahead and read [Responsive tables](/examples/tables/responsive).
- Fiddling around with the `content` attribute and pseudo elements sometimes may have unexpected side effects.

So if you know its shortcomings, disabling CSS sometimes can be a useful "poor man's screen reader substitute". But it will never be a real replacement.