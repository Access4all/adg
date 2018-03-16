---
layout: layout
title: "Tablist widgets (a.k.a. tab panels, tabs)"
position: 5
lead: "Tablists help to split up a page's content into smaller and thus more digestible parts which can be toggled visible one at a time. They can be thought of as \"small pages inside a page\"."
---

# Tablist widgets (a.k.a. tab panels, tabs)

![Tablist in Firefox](_media/tablist-in-firefox.png){.image}

Tablists are sometimes also called "tab panels", "tabbed interface controls", or simply "tabs" (in German sometimes: "Reiter" or "Registerkarten"). We call them "tablists" to avoid confusion with the "tab" key on the keyboard.

They are well known as native controls in many operating systems: a list of controls (usually on top of the element) allows to toggle the visibility of corresponding panels.

Only a single control can be active at a time, so exactly one panel is visible and all others are hidden. As such, tablists are pretty identical with the pattern behind standard radio buttons.

# Similarities with accordions and carousels

Maybe you never noticed that tablists, [carousels](/part--examples-of-accessibility-patterns---introduction/interactive-javascript-and-widgets/carousel-widgets--a-k-a--slideshow--slider-){.page title="Carousel widgets (a.k.a. slideshow, slider)"} and [accordions](/part--examples-of-accessibility-patterns---introduction/interactive-javascript-and-widgets/accordion-widgets){.page title="Accordion widgets"} - although looking pretty distinct from each other - all solve a very similar use case: toggling the visibility of contents.

- Tablists are the most basic pattern of them all
- Carousels extend it by providing additional controls
    - Previous/next buttons
    - Autoplay/pause button(s)
- Accordions extend it by stacking all controls and panels on top of each other
    - In addition, some of them allow to display multiple panels at the same time

Because of this, the following texts are written to apply not only to tablists, but also to carousels and accordions.

# Requirements

- The meaning and usage of the tablist/carousel/accordion must be clear
- The state of a control must be perceivable ("active/inactive" or similar)
- Proper feedback must be given upon activating a control ("active" or similar)
- The tablist/carousel/accordion must be operable using keyboard
    - With a reasonable interplay of `Tab`, `Enter`/`Space`, and/or `Arrow` keys
- The panel contents must be accessible, e.g. interactive elements must be reachable using keyboard

Find more detailed requirements here: [WAI-ARIA Authoring Practices: Tab Panel (widget)](https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel).

# Proof of concept

See: [What is a "Proof of concept"?](/part--examples-of-accessibility-patterns---introduction/interactive-javascript-and-widgets/what-is-a-proof-of-concept){.page}

We advise to create tablists as a simple group of radio buttons:

- They can be styled visually as needed using CSS
- Spiced up with (very little) JavaScript, they behave like perfect tablists
- Sensible naming of elements (and a few specifically added visually hidden texts) guarantees that screen reader users know how to handle the element - even if they haven't seen any other tablist before!

[**Proof of concept: Tablist**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.EbowWN.small.349ada9a-1e12-4e68-b335-cd48e77ade4a.png)](https://codepen.io/accessibility-developer-guide/pen/EbowWN){.code}

Features:

- Announces elements properly to screen readers
    - It's clearly perceivable which control is active: the one with the active radio button
- Gives feedback upon interaction
    - Whenever a control is activated, the screen reader announces the respective radio button's state
- Hides collapsed panels effectively from everybody (see [Hiding elements correctly](/part--examples-of-accessibility-patterns---introduction/hiding-elements-correctly){.page})
- Where functionality may not be obvious to screen reader users, descriptive text is given (only visible to screen readers):
    - The tablist/carousel/accordion's main heading has "tablist/carousel/accordion" appended
    - A small help text explains how the tablist/carousel/accordion works
    - The controls are named "tablist/carousel/accordion controls"
    - Each control is named "Show panel XY"
    - Each panel's heading has "panel" appended
- The tablist/carousel/accordion controls come in the DOM before the panels
    - As the whole element is properly marked up with headings, screen reader users can jump very quickly between controls and panels

# 3rd party widgets

Find below some ready-to-use 3rd party widgets that satisfy our requirements regarding to accessibility. See [How we evaluate JavaScript widgets](/part--examples-of-accessibility-patterns---introduction/interactive-javascript-and-widgets/how-we-evaluate-javascript-widgets){.page}.

TODO