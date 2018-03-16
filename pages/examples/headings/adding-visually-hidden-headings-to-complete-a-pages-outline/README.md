---
layout: layout
title: "Adding visually hidden headings to complete a page's outline"
navigation_title: "Adding visually hidden headings to complete a page's outline"
position: 4
lead: "Not only the main content of a web page needs to be marked up using headings, but also other elements like header, navigation, footer, etc."
---

# Adding visually hidden headings to complete a page's outline

# Additional regions on a web page

In addition the main content, a web page usually consists of many additional regions: a header, navigation(s), related sections (like advertisements), and a footer.

On the visual level, these regions typically are designed very succinct:

- The header usually sits on top of the page, consuming the full page width
- The navigation may be part of the header, or on the left side of the main content
- Related sections may be at the right side of the main content, or below it
- The footer usually sits at the bottom of the page

@code(/examples/headings/adding-visually-hidden-headings-to-complete-a-pages-outline/_examples/headings-example-with-additional-page-regions-without-headings-/){.code}

Visual website users are able to recognise these elements within the first glance at a page. (If not, the visual design is pretty bad.)

# Adding headings to those additional regions

Screen reader users don't perceive any visual attributes like size, shape, colour, etc. They rely solely on semantic info and descriptive text labels. For them, additional descriptive elements are needed to give a page region a label: and again, the best way to do provide such labels is using headings.

@code(/examples/headings/adding-visually-hidden-headings-to-complete-a-pages-outline/_examples/headings-example-with-additional-page-regions-with-headings-/){.code}

# Hiding additional headings visually

To make sure these additional headings don't mess up the visual design, they can be hidden visually.

@code(/examples/headings/adding-visually-hidden-headings-to-complete-a-pages-outline/_examples/headings-example-with-additional-page-regions-with-visually-hidden-headings-/){.code}

The technique used for this is described here: [Hiding elements correctly](/examples/hiding-elements){.page}.
