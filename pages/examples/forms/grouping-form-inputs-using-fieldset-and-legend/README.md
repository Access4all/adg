---
layout: layout
title: "Grouping form inputs using fieldset and legend"
navigation_title: "Grouping form inputs using fieldset and legend"
position: 4
lead: "Grouping form inputs in a meaningful way can make forms much easier to handle for everyone. Be sure to use the correct mechanism(s) for it!"
---

# Grouping form inputs using fieldset and legend

# Where to use the fieldset / legend combination

The `<fieldset>`/`<legend>` combination can be used for two things.

## Grouping multiple radio buttons or checkboxes

**Multiple radio buttons always must be grouped**. Yes, that's exactly how it is. No exceptions.

@code(/examples/forms/grouping-form-inputs-using-fieldset-and-legend/_examples/grouped-radio-buttons/){.code}

Also, **multiple check boxes always must be grouped**.

@code(/examples/forms/grouping-form-inputs-using-fieldset-and-legend/_examples/grouped-checkboxes/){.code}

You may have noticed that NVDA doesn't activate focus mode when jumping to a checkbox using `Tab` key. More info here: [Why do radio buttons trigger focus mode, but checkboxes don't?](https://github.com/nvaccess/nvda/issues/7578).

(A single checkbox, like "Accept Terms and Conditions", doesn't need to be grouped.)

## Grouping any combination of form inputs

Especially in complex forms, **thematically related form inputs should be grouped**.

@code(/examples/forms/grouping-form-inputs-using-fieldset-and-legend/_examples/grouping-thematically-related-form-inputs/){.code}

# Nesting fieldset / legend combinations

Nesting `<fieldset>`/`<legend>` combinations is absolutely possible, especially when radio buttons or checkboxes play a role.

@code(/examples/forms/grouping-form-inputs-using-fieldset-and-legend/_examples/nested-fieldset-legend-combinations/){.code}

# Difference between Firefox and Internet Explorer

Regarding `<fieldset>` / `<legend>` combinations, **Internet Explorer is much wordier than Firefox**:

- **Internet Explorer attaches the `<legend>`'s text to the label of each contained form input**
    - For a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, First Name" and "Personal Details, Last Name".
- **Firefox only announces the `<legend>`'s text when entering the `<fieldset>`**
    - Again, for a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, Grouping", then "First Name" and "Last Name".

@code(/examples/forms/grouping-form-inputs-using-fieldset-and-legend/_examples/grouped-form-inputs-with-way-too-long-legend/){.code}

Conclustion: **Never put long texts into the `<legend>` element** to prevent wordiness in Internet Explorer! If you really need to put long text into a form, use one of the following approaches: [Placing non-interactive content into forms](/examples/forms/non-interactive-content-in-forms){.page}

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