---
navigation_title: "Proof of concept?"
position: 3
changed: "2018-05-31"
---

# What is a "Proof of concept"?

**All our widgets are so called "Proofs of concepts" (POCs), meaning they show how an interaction pattern can be implemented in an accessible way. As such, they are intended to serve as inspiration for your own implementations, but are not meant to be copied 1:1 into real projects.**

[[toc]]

## Proofing collectively accepted patterns

There are many patterns of interactive controls that have made its way into the collective awareness of the web, but for which no native HTML standard element is available (they are generally referred to as "widgets"). Alas, there exist no strict requirements, and most implementations of the pattern vary greatly regarding their functionalities and target audiences.

With our POCs we aim to deliver a proof of a given concept for these patterns. The main focus is on accessibility, optimised for the most widely used combinations of browsers and screen readers, see [Relevant combinations of screen readers and browsers](/knowledge/screen-readers/relevant-combinations).

For each POC, we base our requirements on well established best practices, and on its respective section of the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) (if available).

## General characteristics

### Not meant for real world use

Our POCs can be compared with HTML-prototypes: they give a first general impression of how a concept will look and feel. They specifically have the purpose to give you an idea about how an accessible widget should behave like. This enables you to implement your own one on top of this experience.

As such, our POCs are not intended to be copied & pasted 1:1 into "real world" projects.

### Simple and straight to the point

Many of our POCs are lacking a lot of functionality that generally would be expected from "real world" implementations.

For example, most of our POCs are optimised for being used either with a mouse or with a keyboard, while certain edge cases of interactions of the two of them is not taken care of. Also, touch usage with gestures are not implemented in any way.

And while the semantics are well chosen (see [Semantics and their importance for accessibility](/knowledge/semantics)), the visual design of the POCs is very sparse.

### ARIA only when inevitable

According to our credo of [Widgets simply working for all](/knowledge/semantics/widgets), ARIA roles and states were relinquished wherever possible, and traditional HTML elements are used.

In certain well-reasoned situations though, ARIA is used according to the principles of [Sensible usage of ARIA roles and attributes](/examples/sensible-aria-usage) to optimise the user experience for screen readers.

## Icing on the cake

The POCs are the "icing on the cake" of our guide. All skills and knowledge described throughout it converge in their implementations. To really understand our POCs, be sure you have thoroughly read and understood the 3rd part of this guide: [Knowledge about accessibility](/knowledge).
