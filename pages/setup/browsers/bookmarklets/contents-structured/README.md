---
navigation_title: "Contents Structured"
position: 1
changed: "2019-01-31"
---

# Contents Structured

**This bookmarklet highlights a lot of typical semantic HTML elements, conveying their tag names. This makes inspection of the current page's semantic structure pretty easy.**

## Installation

Import the ["Contents structured" bookmarklet](/js/snippets/content-structured-bookmarklet.js) into you web page and add a click event handler on any element, like a link

&#x3C;a href=&#x22;javascript:CSBookmarklet.highlight(window);&#x22;&#x3E;Highlight structure&#x3C;/a&#x3E;

## Usage

Activate the bookmarklet by clicking on it. Then inspect the displayed results and make sure the used tags are semantically meaningful.

![Results after firing "Contents structured" bookmarklet](_media/results-after-firing-contents-structured-bookmarklet.png)

## Credits

This is a slightly enriched version of the bookmarklet [Inhalte gegliedert](http://testen.bitv-test.de/bookmarklets.html). Our version highlights some more elements like lists, tables, links, and forms.
