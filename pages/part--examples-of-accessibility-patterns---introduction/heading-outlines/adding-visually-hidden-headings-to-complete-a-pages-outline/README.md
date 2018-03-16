---
layout: layout
title: "Adding visually hidden headings to complete a page's outline"
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

[**Headings Example with Additional Page Regions (without Headings)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.EXRYdz.small.e8db3678-1241-420a-ad41-e9a486f141ad.png)](https://codepen.io/accessibility-developer-guide/pen/EXRYdz){.code}

Visual website users are able to recognise these elements within the first glance at a page. (If not, the visual design is pretty bad.)

# Adding headings to those additional regions

Screen reader users don't perceive any visual attributes like size, shape, colour, etc. They rely solely on semantic info and descriptive text labels. For them, additional descriptive elements are needed to give a page region a label: and again, the best way to do provide such labels is using headings.

[**Headings Example with Additional Page Regions (with Headings)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.WOyNXL.small.8d68b216-0e55-4f43-b6ec-cf2f4dd35e61.png)](https://codepen.io/accessibility-developer-guide/pen/WOyNXL){.code}

# Hiding additional headings visually

To make sure these additional headings don't mess up the visual design, they can be hidden visually.

[**Headings Example with Additional Page Regions (with Visually Hidden Headings)**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.yXELKm.small.2178e44f-b538-4516-a000-146de2ffc198.png)](https://codepen.io/accessibility-developer-guide/pen/yXELKm){.code}

The technique used for this is described here: [Hiding elements correctly](/part--examples-of-accessibility-patterns---introduction/hiding-elements-correctly){.page}.