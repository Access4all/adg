---
layout: layout
title: "Bad beadings example"
---

# Bad beadings example

To be meaningful, heading outlines must be coherent on both a technical and textual level.

This headings outline in the following example has three problems.

[**Bad Headings Example**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.GEdbqO.small.bc1ebb80-58de-45b7-9f56-864c97182ae8.png)](https://codepen.io/accessibility-developer-guide/pen/GEdbqO){.code}

The problems are:

1. A heading level is skipped: "Playing Soccer" is on level 4, but should be on level 3
2. A heading belongs to the wrong parent: "Gardening" doesn't belong to "Dancing", it should be on level 3 instead of level 4
3. A heading isn't marked up properly: "Meditate" is marked up as `<strong>` paragraph instead of an `<h#>`

The first and the third problems are technical ones, the second problem is a textual one.

# Technical problems

Most technical problems can be evaluated automatically: It's no problem for a computer to make sure that there's no heading level skipped. Also, a computer can make a guess whether a paragraph that contains only a few words and is displayed in **bold** should rather be a heading.

# Textual problems

Textual problems, however, always must be examined manually by a human who has certain knowledge about the presented content.

First, one has to know what "Gardening" means and conclude that this isn't a dancing style (so it can't belong to "Dancing").

Furthermore, one must know whether "Gardening" is a physical activity or not, so one can decide whether it belongs to "Physical Activities" as a heading level 3, or whether it makes more sense to put it directly under "My Hobbies" as a heading level 2.