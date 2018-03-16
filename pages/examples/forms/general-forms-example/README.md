---
layout: layout
title: "General forms example"
position: 2
lead: "HTML delivers you everything you need to create basic accessible forms."
---

# General forms example

The following example contains all basic HTML form controls:

- Single line text input (`<input type="text">`)
- Multi line text input (`<textarea>`)
- File upload (`<input type="file">`)
- Radio buttons (`<input type="radio">`)
- Multiple checkboxes (`<input type="checkbox">`)
- Single select list (`<select>`)
- Multi select list with multiple (`<select multiple>`)
- Single select list with grouping (`<select>` with `<optgroup>`)
- Multi select list with grouping (`<select multiple>` with `<optgroup>`)
- Single checkbox (`<input type="checkbox">`)
- Submit button (`<input type="submit">`)

Each form control needs a corresponding `<label>` element that is connected to it using the `for` attribute (pointing to the control's ID). This allows screen readers to announce the input correctly.

Each group of radio buttons and checkboxes needs a surrounding `<fieldset>`/`<legend>` combination: in addition to an input's `<label>`, screen readers also announce the `<legend>` of a surrounding `<fieldset>`.

As the inputs are surrounded with a `<form>` tag, the form can be submitted without hitting the submit button: simply press the `Enter` key while you're in an input (except multi line text input and file upload)!

In the example, all attributes that aren't necessary for demonstration (e.g. `name`) are omitted.

[**General Forms Example**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.PKoRLG.small.6a7b1012-93dd-423f-8917-f8a87c7291a0.png)](https://codepen.io/accessibility-developer-guide/pen/PKoRLG){.code}

# Some important notes

## For single line text inputs, why does NVDA announce "has autocomplete" and what does it mean?

HTML offers an [`autocomplete` attribute for single line text inputs](https://www.w3schools.com/tags/att_input_autocomplete.asp), which by default is set to `true`:

- This means that the **browser remembers previous inputs and offers them** in a dropdown
- This doesn't have anything to do with an autocomplete / autosuggest feature like it is offered by e.g. [Google Search](https://www.google.com)

## For file fields, why doesn't NVDA announce the label?

This seems to be a bug in Firefox, see [input type="file" is only read as "browse button" in firefox](https://github.com/nvaccess/nvda/issues/5326).

## For checkboxes, why doesn't NVDA announce the grouping?

For more info, see [Why do radio buttons trigger focus mode, but checkboxes don't?](https://github.com/nvaccess/nvda/issues/7578).

## For selects, why doesn't NVDA announce the multiple option?

For more info, see [For select lists, why is the "multiple" option not announced? ](https://github.com/nvaccess/nvda/issues/7579).

## Can I put form elements into their labels?

HTML allows you to put any form element right into their `<label>`, removing the need of the `for` attribute.

Label associated using `for` attribute:

```html
<label for="name" />
<input type="text" id="name" />
```

Label containing input:

```html
<label>
  <input type="text" />
</label>
```

As described here, this approach is buggy: [Placing non-interactive content into forms](/examples/forms/non-interactive-content-in-forms){.page}.

So we highly recommend to always separate form elements and labels, and using the `for` attribute to associate them.

## TODO: NVDA announces radio buttons including their count

- NVDA: "2 of 3"
- JAWS: Nö!

Ist das auch bei Selects so?