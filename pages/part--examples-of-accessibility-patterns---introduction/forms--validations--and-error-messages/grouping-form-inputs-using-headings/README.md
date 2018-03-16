---
layout: layout
title: "Grouping form inputs using headings"
position: 6
lead: "It sometimes feels necessary to group complex forms visually using headings. If you do, be sure to associate them explicitly to the form yourself!"
---

# Grouping form inputs using headings

# Headings are only read in browse mode
As forms are usually navigated in focus mode (using the `Tab` key), any present headings are not announced

# Making headings available when interacting with forms

In general, you should group from inputs using `<fieldset>` / `<legend>` combinations as described here: [Grouping form inputs using fieldset and legend](/part--examples-of-accessibility-patterns---introduction/forms--validations--and-error-messages/grouping-form-inputs-using-fieldset-and-legend){.page}.

If for some reason you need to use headings in a form,  there are two ways how you can do it.

## Associating headings to fake fieldsets using ARIA

In the following example, ARIA is used to group form inputs using headings:

- Each group of form inputs is surrounded by a container with `role="group"`
- Each container as a heading
- The headings are associated to the surrounding container using `aria-describedby`

[**Headings Mixed Into a Form Using ARIA**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.gxVMYe.small.0be9315c-b8d6-4909-a504-c4aa4c498876.png)](https://codepen.io/accessibility-developer-guide/pen/gxVMYe){.code}

More info about faking `<fieldset>` / `<legend>` combinations here: [Faking fieldset / legend using ARIA](/part--examples-of-accessibility-patterns---introduction/forms--validations--and-error-messages/faking-fieldset--legend-using-aria){.page}.

## Placing headings into legends

[In HTML 5.2, headings are allowed within `<legend>`](https://www.w3.org/TR/html52/sec-forms.html#the-legend-element) elements.

[**Headings Mixed Into a Form As Children Of Legends**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.qXeNRm.small.2313b161-8bfd-43af-815c-67c1e6a02c01.png)](https://codepen.io/accessibility-developer-guide/pen/qXeNRm){.code}

By the way, the other way round (placing legends into headings) doesn't work, because a `<legend>` always has to be the first child of its `<fieldset>`.