---
layout: layout
title: "Bad forms example"
navigation_title: "Bad forms example"
position: 3
lead: "There can be a lot messed up in a form, making it hardly accessible in many ways. The most common ones are shown here."
---

# Bad forms example

The following example shows a basic form which (technically) is **perfect HTML code, but lacking a lot of standard features** needed for setting elements in relationship with each other properly and triggering browser standard functionality.

[**Bad Forms Example**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.JyQmgb.small.22f3865d-d744-4b69-bead-d744b2c6d43b.png)](https://codepen.io/accessibility-developer-guide/pen/JyQmgb){.code}

# Missing form container

The inputs aren't surrounded by a `<form>` tag: thus, the form isn't submittable by hitting the `Enter` key when focusing an input.

Especially when doing fancy stuff with JavaScript, `<form>` tags often are forgotten, as developers are messing around with `onclick` events or similar. But please: whenever form inputs need to be submittable, they should be placed in a `<form>` tag!

# Wrong input labels

There are several problems with the input labels:

- Some **label texts are marked up as plain `<div>` elements**, lacking any semantic information
    - While a `<label>` tells the browser: "This is a label for a form element", a `<div>` doesn't tell anything at all - it's just a plain element with no specific meaning
- Some label texts are marked up properly as **`<label>` elements, but are missing the `for` attribute** needed to associate the label with its form input
    - The `for` attribute's value must be the **ID of the belonging form input**

In both cases **screen readers aren't able to announce the form inputs with their respective names**. In such a situation, a screen reader user has to **guess** which label may correspond to which input - or they **miss** the labels completely (when navigating from input to input using **Tab** key).

Also mouse user have a disadvantage: they can't click on the label to set the focus into the corresponding input.

## JAWS and its label-guessing-mechanism

You may have noticed that for the first input "Full name", JAWS surprisingly announces the label! This is due to JAWS' tendency to try to associate HTML elements on its own by guessing which element could belong to which other element. For more info, see [Why JAWS Isn't a Developer's Best Friend](/knowledge/desktop-screen-readers/why-jaws-isnt-a-developers-best-friend){.page}.

# Wrong fieldset and legends

The radio buttons are **grouped by a combination of plain `<div>` elements** instead of proper `<fieldset>` and `<legend>`:

- Visually it's pretty evident that those `<div>` elements have the function of grouping and naming the contained form inputs
- But the **browser doesn't recognise this structure** and won't associate it to the inputs

So a screen reader user has to **guess** what the provided plain text element may stand for - or will **miss** it completely (again, when navigating using `Tab` key only).

(By the way: if for some reason you can't use `<fieldset>` and/or `<legend>`, take a look at this page: [Grouping form inputs using fieldset and legend](/examples/forms/grouping-form-inputs-using-fieldset-and-legend){.page}.)

# Wrong submit button

Remember the days when `<input type="submit" />` elements were impossible to style the way fancy designers wanted them to look? These times are gone:

- `<input type="submit" />` can be styled as fancy as most other HTML elements
- As an alternative, you can even use `<button>` elements

Still, instead of "real" buttons different substitutes are used:

- `<a>` tags with an `onclick` JavaScript handler
    - While links sort of resemble buttons a bit (which means: you can press them), they're a completely different kind of element
- `<div>` or `<span>` tags with an `onclick` JavaScript handler

All of these substitutes have the same accessibility problems:

- First of all, they aren't focusable
    - The example above is due to this (and because it's lacking a `<form>` tag) not submittable by keyboard alone, and screen readers need to switch to browse mode to find the pseudo-button and interact with it
    - Sure, you could make them focusable with some hacks:
        - Add a `href="#"` to the `<a>` tag
        - Or add a `tabindex="0"`
- Secondly, they're lacking a lot of visual and functional features that real buttons offer for free
    - Sure, you can add those functionality with some more hacks:
        - For example, add `:hover`, `:focus`, and `:pressed` states with distinctive CSS attributes
        - Add JavaScript events like `onclick`, so the button responds properly to the user's action
        - You could even override the element's role using ARIA: `role="button"`
- Last but not least: a screen reader user won't find it when looking for buttons using `B` key
    - And if in fact the user finds the pseudo-button by browsing around manually, he can't be sure whether it really is the submit button without clicking it and hoping for the best

All this hassle because of the long gone urge to avoid real buttons due to visual style reasons...!

# Conclusion

Plain old HTML provides (nearly) everything you need to create basic accessible forms, so you only need to be careful to use the elements properly:

- Use proper elements
    - Surround your inputs with a `<form>` tag
    - Implement the submit button as an `<input type="submit" />` (or as a `<button>`)
- Associate labels with their inputs
- Group everything properly

## But what if I need to do something more complex?

Admittedly, there are a few more complex requirements to forms: e.g. marking up elements as required, validating inputs, or the need to associate additional text to an input (when it doesn't fit into the label).

The upcoming pages explain a lot of these requirements in depth. So be sure to read all relevant pages of this section!