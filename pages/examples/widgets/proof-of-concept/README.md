---
navigation_title: "Proof of concept?"
position: 3
changed: "2018-05-15"
---

# What is a "Proof of concept"?

**All our widgets are so called "Proofs of concepts" (POCs), meaning they show how an interaction pattern can be implemented in an accessible way. As such, they are intended to serve as inspiration for your own implementations, but are not meant to be copied 1:1 into real projects.**

## Proofing a concept

Our POCs are exact that: proofs of a given concept with main focus on accessibility, optimised for the most widely used combinations of browsers and screen readers.

## Not meant for real world use

Our POCs have the purpose to give you an idea about how an accessible widget should behave like, so you can implement your own one. As such, they are not intended to be copied & pasted 1:1 into "real world" projects.

## Simple and straight to the point

Many of them are also lacking a lot of functionality that generally are expected from such implementations.

For example, most of our POCs are optimised for being used either with a mouse or with a keyboard, while certain edge cases of interactions of the two is not taken care of.

Also touch usage with gestures are not implemented in any way.

## ARIA only when inevitable

According to our credo of [Widgets simply working for all](/pages/knowledge/semantics/widgets), ARIA roles and states were relinquished wherever possible, and traditional HTML elements are used.

In certain well-reasoned situations though, ARIA is used according to the principles of [Sensible usage of ARIA roles and attributes](/pages/examples/sensible-aria-usage) to optimise the user experience for screen readers.

## Requirements

Our POCs are the "icing on the cake" of our guide. All skills and knowledge described throughout this guide converge in their implementations.

To really understand our POCs, be sure you have thoroughly read and understood the 3rd part of this guide, [Knowledge about accessibility](/pages/knowledge).