---
layout: layout
title: "Is CSS discriminating people with special needs?"
position: 6
lead: "It seems that CSS is all about targeting the visual channel. Can this be interpreted as discrimination towards people with special needs?"
---

# Is CSS discriminating people with special needs?

# Some things to think about

Think about the following: although `visibility: hidden` makes a specific point about hiding something from the visual channel, it doesn't say anything about the auditive channel, but still:

- Elements set to `visibility: hidden` aren't perceivable by screen readers (which deliver the auditive channel)
- And there is no such thing as an `audibility` attribute in CSS

Also, there's no support for suggested attributes like `display: aural` (see below), and the famous work-around of placing elements off-screen for hiding them visually but keeping them reachable to screen readers (see [Hiding elements visually by moving them off-screen](/part--examples-of-accessibility-patterns---introduction/hiding-elements-correctly/hiding-elements-visually-by-moving-them-off-screen){.page}) is exactly that: a dirty work-around.

# Ambitions in the past

In the past, there have been suggestions to incorporate additional attributes into CSS for targeting other output channels:

- The [Aural style sheets](https://www.w3.org/TR/CSS2/aural.html) spec offer attributes like `display: aural` or `display: braille`, but no main stream browser offers support so far
- In Media Queries level 3, specific types like `@media aural` or `@media braille` were introduced
    - But then they were deprecated in level 4

# Conclusion

So it seems that CSS simply isn't meant to target specific sensory channels: it's all about the visual channel. To us this feels like a clear discrimination.

We really hope this will be addressed in the near future by the promising EPUB 3 format (see [EPUB 3](/part--knowledge-about-accessibility---introduction/epub-3){.page}).