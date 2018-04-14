---
layout: layout
title: "h123"
navigation_title: "h123"
position: 2
lead: "This bookmarklet provides an efficient way to display the current webpage's heading outline, very close to how screen readers do. In addition, it has some pretty useful features like displaying potentially incorrectly hidden headings."
changed: "2018-04-06"
---

# h123

# Installation

Go to [hinderlingvolkart.github.io/h123](https://hinderlingvolkart.github.io/h123) and get the bookmarklet there.

# Usage

Activate the bookmarklet by clicking on it. A popover outlining the page's heading structure is then getting displayed on the top right of the page.

![The h123 bookmarklet in action](_media/the-h123-bookmarklet-in-action.png){.image}

The popover has some very useful options and features:

- Activate "Mark visually hidden" to see which of the present headings are visually hidden (moved out of the viewport).
- Activate "Show hidden" to also display headings that are completely hidden.
    - This is useful to debug headings that maybe have been completely hidden unintentionally.
- Activate "Hover-Highlight" to visually display the heading that corresponds to the element pointed on with the mouse cursor.
    - This is useful to debug whether the current heading hierarchy is sensible: each and every element on the page must belong to a proper heading.

The bookmarklet supports both native `<h#>` tags and `role="heading" aria-level="..."` elements.