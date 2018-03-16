---
layout: layout
title: "Marking inputs as required using asterisks (*)"
position: 9
lead: "It's a typical technique to add an asterisk (*) to an input's label to mark it as \"required\". Be sure to make this information accessible for screen readers, too!"
---

# Marking inputs as required using asterisks (*)

# Referenced foot notes explaning asterisks

It's a typical technique to add an asterisk (*) to an input label:

- Somewhere else on the page, this asterisk then is explained to imply a required input (in allusion to foot notes in text documents)
- Visual users see both the asterisk and the explanation at a glance and can connect them with each other intuitively
- But screen readers are often configured such that they do not read all special characters such as asterisks.

In the following example, the required input field is only announced as "Full Name Asterisk":

- An experienced user will probably know what this is intended for, but many users will have no clue
- As the text explanation even is below the submit button of the form, a screen reader user probably will never read it, as clicking on the button usually is the last thing a user does after filling a form

[**Bad Forms Example With Required Inputs**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.QqWEMZ.small.50ab804c-ef45-4dd9-a003-eab01f2ddd61.png)](https://codepen.io/accessibility-developer-guide/pen/QqWEMZ){.code}

# Better solution using ARIA (?)

You can use `aria-label`, `aria-labelledby`, `aria-describedby`, and `aria-hidden` to try to solve the problem. Sadly, those are very unpredictable when being used with focus and browse mode... (examples?!):

TODO: Example(s)!

More info see here: [Sensible Usage of ARIA Roles and Attributes](/examples/sensible-usage-of-aria-roles-and-attributes){.page}

# Best solution using SVG

Instead of working around the problem using ARIA, we can use an approach that works perfectly using plain old HTML and SVG:

- Instead of trying to hide the plain text asterisk `*`, replace it with a decent SVG (for more info about SVG, see [Scalable Vector Graphics (SVG)](/examples/images-icons-and-alternative-texts/scalable-vector-graphics-svg-){.page})
- Simply add the text "required" as a visually hidden element (for more info about hiding elements, see [Hiding elements correctly](/examples/hiding-elements){.page})

TODO: SVG sieht noch scheisse aus, siehe <https://stackoverflow.com/questions/46193453/replacing-asterisks-in-a-text-with-svg>. Vielleicht kann der visuell versteckte Text auch in das SVG gesetzt werden?

[**Good Forms Example With Required Inputs**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.wrvNLd.small.4afdf24f-0f9f-475d-86a5-f379a16b6358.png)](https://codepen.io/accessibility-developer-guide/pen/wrvNLd){.code}

This technique can even be enhanced using tooltips: [Tooltip widgets](/examples/widgets/tooltip-widgets){.page}.

# Using HTML5 client side validations

Instead of a applying a visually hidden text "required", one can set a `required` attribute to the input: this makes screen readers announce an input as a required one.

Technically this is much easier and cleaner (more info here: [HTML5 client-side validations](/examples/forms/html5-client-side-validations){.page}). Still, there may be cases where other texts than simply "required" are needed (and where there is no standard HTML attribute available), so it's good to have a flexible solution.