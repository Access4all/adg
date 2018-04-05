---
layout: layout
title: "Tooltip widgets"
navigation_title: "Tooltip widgets"
position: 4
lead: "Tooltips present additional information in a kind of \"mini dialog\", typically when hovering over or focusing an element. They offer different levels of complexity."
---

# Tooltip widgets

# Simple tooltips

![Simple tooltip](_media/simple-tooltip.png){.image}

Simple tooltips offer content that's just non-structured plain text.

Examples:

- A tooltip attached to a text input, describing it as a "required"
- A tooltip attached to a link "Read more...", describing it as "read more about the article XYZ"

Simple tooltips usually appear automatically when hovering or focusing the described element. Their contents are announced immediately by the screen reader.

# Complex tooltips

![Complex tooltip](_media/complex-tooltip.png){.image}

Complex tooltips offer content that can be (nearly) everything that HTML provides, e.g. links, lists, etc. As such, the content can't be digested "in one go" by screen reader users, and there's the need to browse the content line by line (or even to interact with certain interactive elements).

Examples:

- A tooltip attached to a password input, describing complex requirements for appropriate password strength, structured as a list containing a list item for each individual requirement (min. 8 characters, upper and lower case, min. 1 special character, etc.).
- A tooltip attached to an avatar thumbnail image, describing its file characteristics (width, height, size), showing a bigger version of the image, and offering a link to the "Avatar options" page

Complex tooltips usually require manual activation to appear: for this, they need their own focusable element. Upon activation, their contents need to be browsed manually by a screen reader.

Complex tooltips sort of are the "little brothers" of non-modal dialogs, see [Dialog widgets (a.k.a. modal, popup, lightbox, alert)](/examples/widgets/dialog-widgets-a-k-a-modal-popup-lightbox-alert-){.page}.

# Requirements

- Tooltip content must be displayed automatically or manually
- The tooltip content must be accessible
    - Interactive elements must be reachable using keyboard
    - Complex content must be browsable line by line using screen readers
- If tooltips are separately focusable elements, they must come before any element they describe (or they have to be referred at on the first described element)

Find more detailed requirements here: [WAI-ARIA Authoring Practices: Tooltip Widget (widget)](https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tooltip).

# Proofs of concept

See: [What is a "Proof of concept"?](/examples/widgets/what-is-a-proof-of-concept){.page}

## Simple tooltip

@code(/examples/widgets/tooltip-widgets/_examples/tooltips-proof-of-concept/){.code}

Features:

- Screen readers announce the tooltip's content in both browse and focus mode
- Visibility can be toggled by pressing `Esc` (when the described element is focused)
- Tooltip can be hidden by clicking on it

## Complex tooltip

TODO: Tooltip soll ein eigener Container sein, welcher absolut platziert wird. Er wird nicht automatisch vorgelesen, sondern muss manuell getogglet werden (Hover könnte ihn aber automatisch anzeigen); dann kann man manuell den Inhalt durchlesen.

# 3rd party widgets

Find below some ready-to-use 3rd party widgets that satisfy our requirements regarding to accessibility. See [How we evaluate JavaScript widgets](/examples/widgets/how-we-evaluate-javascript-widgets){.page}.

TODO
