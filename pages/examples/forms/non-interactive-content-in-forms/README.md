---
layout: layout
title: "Placing non-interactive content into forms"
navigation_title: "Non-interactive Content In Forms"
position: 7
lead: "As forms are generally interacted with using focus mode in screen readers, purely non-interacitve content needs some special treatment to prevent it from being ignored."
---

# Placing non-interactive content into forms

# A problematic approach: putting more content into the label

It's very tempting to simply span the `<label>` element around additional content:

@code(/pages/examples/forms/non-interactive-content-in-forms/_examples/more-content-in-form-labels/){.code}

For mouse users, this enlarges the clickable area: for example, click on the descriptive text below an input field, and the focus will be set into the input.

Sadly, browser support is buggy:

- In Firefox this works like a charm (both JAWS and NVDA)
- In Internet Explorer things are messed up as elements are packed into a `<fieldset>`/`<legend>` combination
    - In the example above, the radio buttons for gender are announced as "Full name. Please tell us your name."

This is the reason, why we recommend to separate form inputs and their `<label>` elements strictly, as pointed out here: [General forms example](/examples/forms/general-forms-example){.page}.

# Another problematic approach: having more than one label per input

While it's perfectly valid HTML to associate more than a single `<label>` element to an input, Internet Explorer sadly connects one of them through the Accessibility IP.

So the following is no recommended solution:

@code(/pages/examples/forms/non-interactive-content-in-forms/_examples/associating-content-to-form-inputs-using-multiple-labels/){.code}

# A better approach: describing inputs using ARIA

It's easy to attach descriptive text to any form element using `aria-describedby`:

@code(/pages/examples/forms/non-interactive-content-in-forms/_examples/associating-content-to-form-inputs-using-aria/){.code}

This works very well.

## Referencing structured text

You can use `aria-describedby` on structured text (as you see in the example above, where a list is being referenced). But don't overdo this: 

- Screen readers announce all referenced content in one go
- This can become overstraining

### Avoid too much referenced info

Take a look at the following example which overdoes the usage of `aria-describedby`:

@code(/pages/examples/forms/non-interactive-content-in-forms/_examples/associating-too-much-content-to-form-inputs-using-aria/){.code}

Admittedly, this example feels a bit artificial. But you get the point:

- Listening to too much info at a time is tirening
- In addition, a lot of semantic info about the referenced elements isn't announced this way
    - While lists (sort of) are announced with the prefix "bullet"...
    - ...other semantic info isn't announced at all (e.g. occurrences of links)

### Giving a clue about additional info instead

Instead of referencing all the info, simply give the user a clue that there is more info somewhere (below a form field, at the end of the page, or wherever):

@code(/pages/examples/forms/non-interactive-content-in-forms/_examples/giving-clue-about-additional-content-in-a-form/){.code}

The example above shows three ways to give a user clue about additional info:

1. For "Full name", a clue was appended to the `<label>` and (hidden visually, for more info see: [Hiding elements correctly](/examples/hiding-elements){.page})
2. For "Biography", a clue was added somewhere else (and hidden completely, for more info see: [Hiding elements correctly](/examples/hiding-elements){.page}) and referenced to the input using `aria-describedby`
3. For "Terms and conditions", the label text was changed so it already gives a clue itself (making it "self speaking")

# One last problematic approach: making browsable content focusable

When navigating using the `Tab` key, the easiest way to prevent non-focusable (i.e. browsable) content from being skipped may seem to simply make it focusable: add a `tabindex="0"` to a heading, paragraph, list, or whatever, and you're fine!

While this may be tempting, it's bad style: only elements that provide some interaction (buttons, links, form inputs, etc.) should be focusable. Otherwise keyboard-only users may be confused, as they may think that a paragraph can be interacted with, although it can't.