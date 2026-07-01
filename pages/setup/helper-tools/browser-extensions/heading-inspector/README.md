---
navigation_title: "Heading Inspector"
position: 3
---

# Heading Inspector

**Inspired by the bookmarklet [h123](https://www.accessibility-developer-guide.com/setup/helper-tools/bookmarklets/h123/), this Chrome extension displays the heading structure of a webpage based on Chrome's accessibility tree. As a result, the outline shown by the extension reliably matches the outline announced by screen readers. Similar tools mostly rely on a page's DOM to outline headings, which can cause headings to be missed or misreported. The Heading Structure extension is built and maintained by [Quantico](https://github.com/quatico-solutions/heading-inspector).**

[[_TOC_]]

## Installation

Go to the [Chrome Web Store](https://chromewebstore.google.com/detail/heading-inspector/adneglmkionfaljjmoaedemiahchfjej) and install the extension.

## Usage

Toggle the heading outline panel for that page with one click on the toolbar icon
- The panel lists all headings with their level, indented by depth.
- Green square = correct heading order.
- Red octagon = sequence error (e.g. h4 directly after h2) — distinguished by both colour and shape so it is robust under colour-blindness and greyscale.
- Click a heading to scroll to it on the page with a highlight flash.
- Click Close or the extension icon again to hide.
- Follows navigation within the same site. Once you open the panel on a tab it stays with you as you walk that site — following links, submitting forms, or navigating a single-page app all re-populate the outline for the new page automatically.
- Leaving the site (a different origin) stops the follow, and the panel does not reopen until you click the icon again on the new site. This keeps the audit loop going without re-clicking on every page.

![The h123 bookmarklet in action](_media/the-h123-bookmarklet-in-action.png)

tbd useful features:

- tbd
- tbd
- tbd

