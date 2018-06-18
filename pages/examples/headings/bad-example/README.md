---
navigation_title: "Bad example"
position: 3
changed: "2018-04-03"
---

# General bad headings example

**To be meaningful, heading outlines must be coherent on both a technical and textual level. While headings often are omitted completely by naive web developers, existing heading outlines can suffer of various accessibility problems on both a syntactical and a semantical level.**

This heading outline in the following example has three problems.

[Example](_examples/generally-bad-headings)

On the visual level, the problems are hard to spot. So let's take a closer look at the document outline.

![Document outline of NVDA](_media/document-outline-of-nvda.png)

The problems are:

1. A heading level is skipped: "Playing Soccer" is on level 4, but should be on level 3.
2. A heading belongs to the wrong parent: "Gardening" does not belong to "Dancing", it should be on level 3 instead of level 4.
3. A heading is not marked up properly: "Meditate" is marked up as a `<strong>` paragraph instead of an `<h#>`.

The first problem is clearly a syntactical ones, the second and third problems are semantical ones.

By the way, while NVDA does not propagate the first problem to the user, the bookmarklet [h123](/setup/browsers/bookmarklets/h123) does so by marking it visually:

![Document outline of h123](_media/document-outline-of-h123.png)

## Syntactical problems

Most syntactical problems can be evaluated automatically: it's no problem for a computer to make sure that there's no heading level skipped. So the first problem in our list above is an easy one to examine.

## Semantical problems

Semantical problems, however, usually must be examined manually by a human who has certain knowledge about the presented content.

Regarding our example, to examine the second problem in our list above, one has to know what "Gardening" means. And based on this knowledge, one can conclude that this is not a dancing style (so it shouldn't belong to "Dancing"). Furthermore, to place it correctly, one needs to decide:

- Whether it belongs to "Physical Activities" as a heading level 3.
- Or whether it makes more sense to put it directly under "My Hobbies" as a heading level 2.
- Or whether it does not belong to the listed hobbies at all, and as such would be a heading level 1.

A computer probably will never be able to do that.

Finally, to examine the third problem in our list above, one has to conclude that a very short paragraph that is displayed in **bold** (and is placed above at least one following paragraph) might be meant as a heading, but has been marked up improperly. A computer can make an assumption about this alike, but it will never be a 100% certain.

To find out more about this, see [Semantics and their importance for accessibility](/knowledge/semantics).