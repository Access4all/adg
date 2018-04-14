---
layout: layout
title: "Adding visually hidden headings to complete a page's outline"
navigation_title: "Visually hidden headings"
position: 4
lead: "Not only the main content of a web page needs to be marked up using headings, but also other elements like header, navigation, footer, etc. As the visual design usually doesn't include those headings, they need to be visually hidden by moving them off-screen."
changed: "2018-04-03"
---

# Adding visually hidden headings to complete a page's outline

# Additional regions on a web page

Besides the main content, a web page usually consists of many additional regions: a header, navigation(s), related sections (like advertisements), and a footer.

On the visual level, these regions typically are designed very distinct:

- The header usually sits on top of the page, consuming the full page width.
- The navigation may be part of the header, or on the left side of the main content.
- Related sections may be at the right side of the main content, or below it.
- The footer usually sits at the bottom of the page.

@example[Page with additional page regions, without headings](page-with-additional-page-regions-without-headings){.example}

Visual website users are able to recognise these elements within the first glance at a page (if not, the visual design would be pretty bad). As a contrast, see [Screen readers process contents in a linear way](/knowledge/desktop-screen-readers/linear-processing){.page}.

Screen reader users don't perceive any visual attributes like size, shape, colour, etc., see [Screen readers don't convey visual attributes](/knowledge/desktop-screen-readers/no-visual-attributes){.page}. They rely solely on semantic info and descriptive text labels. The above example is missing all additional regions in the document outline.

![Incomplete document outline](_media/incomplete-document-outline.png){.image}

# Adding headings to additional regions

For screen reader users, descriptive elements are needed to give a page region a label. Again, the best way to provide such labels is using headings. So let's add those missing headings.

@example[Page with additional page regions, with headings](page-with-additional-page-regions-with-headings){.example}

To screen reader users, the document outline now is complete.

![Complete document outline](_media/complete-document-outline.png){.image}

But the additional headings mess up the visual design. How awkward!

# Hiding additional headings visually

To make sure that the additional headings don't mess up the visual design, they can be hidden visually.

@example[Page with additional page regions, with visually hidden headings](page-with-additional-page-regions-with-visually-hidden-headings){.example}

This way, all users benefit from a proper and exhaustive document outline. The technique used for this is described here: [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually){.page}.