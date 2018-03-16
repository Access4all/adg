---
layout: layout
title: "Placing non-interactive content into forms"
---

# Placing non-interactive content into forms

As forms are generally interacted with using focus mode in screen readers, purely non-interacitve content needs some special treatment to prevent it from being ignored.

# A problematic approach: putting more content into the label

It's very tempting to simply span the `<label>` element around additional content:

[**More Content in Form Labels**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.rzXMLG.small.bf8c2078-c0af-460d-966a-d9d60c478eca.png)](https://codepen.io/accessibility-developer-guide/pen/rzXMLG){.code}

For mouse users, this enlarges the clickable area: for example, click on the descriptive text below an input field, and the focus will be set into the input.

Sadly, browser support is buggy:

- In Firefox this works like a charm (both JAWS and NVDA)
- In Internet Explorer things are messed up as elements are packed into a `<fieldset>`/`<legend>` combination
    - In the example above, the radio buttons for gender are announced as "Full name. Please tell us your name."

This is the reason, why we recommend to separate form inputs and their `<label>` elements strictly, as pointed out here: [General forms example](/code-examples/forms--validations--and-error-messages/general-forms-example){.page}.

# Another problematic approach: having more than one label per input

While it's perfectly valid HTML to associate more than a single `<label>` element to an input, Internet Explorer sadly connects one of them through the Accessibility IP.

So the following is no recommended solution:

[**Associating Content to Form Inputs Using Multiple Labels**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.gxVzLN.small.a8318052-9415-468b-aa66-2ffe945b0ceb.png)](https://codepen.io/accessibility-developer-guide/pen/gxVzLN){.code}

# A better approach: describing inputs using ARIA

It's easy to attach descriptive text to any form element using `aria-describedby`:

[**Associating Content to Form Inputs Using ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.xLvEaQ.small.2c42e7f7-9b7e-4d65-9515-97b47e7d300e.png)](https://codepen.io/accessibility-developer-guide/pen/xLvEaQ){.code}

This works very well.

## Referencing structured text

You can use `aria-describedby` on structured text (as you see in the example above, where a list is being referenced). But don't overdo this: 

- Screen readers announce all referenced content in one go
- This can become overstraining

### Avoid too much referenced info

Take a look at the following example which overdoes the usage of `aria-describedby`:

[**Associating Too Much Content to Form Inputs Using ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.wqVzLJ.small.9e91c9df-9eea-4579-87e2-b811b361f8e1.png)](https://codepen.io/accessibility-developer-guide/pen/wqVzLJ){.code}

Admittedly, this example feels a bit artificial. But you get the point:

- Listening to too much info at a time is tirening
- In addition, a lot of semantic info about the referenced elements isn't announced this way
    - While lists (sort of) are announced with the prefix "bullet"...
    - ...other semantic info isn't announced at all (e.g. occurrences of links)

### Giving a clue about additional info instead

Instead of referencing all the info, simply give the user a clue that there is more info somewhere (below a form field, at the end of the page, or wherever):

[**Giving Clue About Additional Content in a Form**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.eEqBJP.small.ad4dcde6-0288-4c7c-bf43-144ab1287305.png)](https://codepen.io/accessibility-developer-guide/pen/eEqBJP){.code}

The example above shows three ways to give a user clue about additional info:

1. For "Full name", a clue was appended to the `<label>` and (hidden visually, for more info see: [Hiding elements correctly](/code-examples/hiding-elements-correctly){.page})
2. For "Biography", a clue was added somewhere else (and hidden completely, for more info see: [Hiding elements correctly](/code-examples/hiding-elements-correctly){.page}) and referenced to the input using `aria-describedby`
3. For "Terms and conditions", the label text was changed so it already gives a clue itself (making it "self speaking")

# One last problematic approach: making browsable content focusable

When navigating using the `Tab` key, the easiest way to prevent non-focusable (i.e. browsable) content from being skipped may seem to simply make it focusable: add a `tabindex="0"` to a heading, paragraph, list, or whatever, and you're fine!

While this may be tempting, it's bad style: only elements that provide some interaction (buttons, links, form inputs, etc.) should be focusable. Otherwise keyboard-only users may be confused, as they may think that a paragraph can be interacted with, although it can't.