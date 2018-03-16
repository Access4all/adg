---
layout: layout
title: "Grouping form inputs using fieldset and legend"
position: 4
lead: "Grouping form inputs in a meaningful way can make forms much easier to handle for everyone. Be sure to use the correct mechanism(s) for it!"
---

# Grouping form inputs using fieldset and legend

# Where to use the fieldset / legend combination

The `<fieldset>`/`<legend>` combination can be used for two things.

## Grouping multiple radio buttons or checkboxes

**Multiple radio buttons always must be grouped**. Yes, that's exactly how it is. No exceptions.

[**Grouped Radio Buttons**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.WEqVdR.small.42ecc2c1-e754-4794-89b9-786505d6a14e.png)](https://codepen.io/accessibility-developer-guide/pen/WEqVdR){.code}

Also, **multiple check boxes always must be grouped**.

[**Grouped Checkboxes**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.aygeqR.small.3ffd5ff3-8f4f-4be4-aaa5-8af164ffe541.png)](https://codepen.io/accessibility-developer-guide/pen/aygeqR){.code}

You may have noticed that NVDA doesn't activate focus mode when jumping to a checkbox using `Tab` key. More info here: [Why do radio buttons trigger focus mode, but checkboxes don't?](https://github.com/nvaccess/nvda/issues/7578).

(A single checkbox, like "Accept Terms and Conditions", doesn't need to be grouped.)

## Grouping any combination of form inputs

Especially in complex forms, **thematically related form inputs should be grouped**.

[**Grouping Thematically Related Form Inputs**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.gxNVjP.small.77657ba4-7acc-4a6b-b67b-d8b1226eafac.png)](https://codepen.io/accessibility-developer-guide/pen/gxNVjP){.code}

# Nesting fieldset / legend combinations

Nesting `<fieldset>`/`<legend>` combinations is absolutely possible, especially when radio buttons or checkboxes play a role.

[**Nested Fieldset / Legend Combinations**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.BdgXqL.small.726ce237-59c6-4f47-acd9-8e428b7d8f18.png)](https://codepen.io/accessibility-developer-guide/pen/BdgXqL){.code}

# Difference between Firefox and Internet Explorer

Regarding `<fieldset>` / `<legend>` combinations, **Internet Explorer is much wordier than Firefox**:

- **Internet Explorer attaches the `<legend>`'s text to the label of each contained form input**
    - For a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, First Name" and "Personal Details, Last Name".
- **Firefox only announces the `<legend>`'s text when entering the `<fieldset>`**
    - Again, for a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, Grouping", then "First Name" and "Last Name".

[**Grouped Form Inputs with Way too Long Legend**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.aygePP.small.549cb8f2-4bc8-47e4-9b7a-bb25882152b9.png)](https://codepen.io/accessibility-developer-guide/pen/aygePP){.code}

Conclustion: **Never put long texts into the `<legend>` element** to prevent wordiness in Internet Explorer! If you really need to put long text into a form, use one of the following approaches: [Placing non-interactive content into forms](/part--examples-of-accessibility-patterns---introduction/forms--validations--and-error-messages/placing-non-interactive-content-into-forms){.page}

# Other things to note

## Legend must be a direct child of fieldset

Screen readers seem to have difficulties associating the `<legend>` correctly to its `<fieldset>` if it's not a direct child.

This is correct:

```html
<fieldset>
  <legend>Gender</legend>
</fieldset>
```

This is problematic:

```html
<fieldset>
  <div>
    <legend>Gender</legend>
  </div>
</fieldset>
```

This is also problematic:

```html
<fieldset>
  <div></div>
  <legend>Gender</legend>
</fieldset>
```

More info see [HTML5: The legend element (w3.org)](http://www.w3.org/TR/html5/forms.html#the-legend-element).