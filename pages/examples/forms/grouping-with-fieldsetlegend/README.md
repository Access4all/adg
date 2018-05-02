---
layout: layout
title: "Grouping form controls with fieldset and legend"
navigation_title: "Grouping with fieldset/legend"
position: 4
lead: "Grouping form controls in a meaningful way can make them much easier to handle for everyone. While most controls can be grouped, some must be grouped. The fieldset/legend structure is available for exact that - it can even be nested. And if its visual limitations are a problem, ARIA can be of help."
changed: "2018-05-02"
---

# Grouping form controls with fieldset and legend

**Grouping form controls in a meaningful way can make them much easier to handle for everyone. While most controls can be grouped, some must be grouped. The fieldset/legend structure is available for exact that - it can even be nested. And if its visual limitations are a problem, ARIA can be of help.**

# When to use

The `<fieldset>`/`<legend>` structure is used for the following situations.

## Multiple radio buttons or checkboxes

Multiple radio buttons always must be grouped. Yes, that's exactly how it is. No exceptions.

@example[Grouped radio buttons](grouped-radio-buttons){.example}

Also, multiple check boxes always must be grouped.

@example[Grouped checkboxes](grouped-checkboxes){.example}

Notice: a single checkbox, like "Accept terms and conditions", does not need to be grouped.

## Thematically related controls

Especially in complex forms, thematically related form controls should be grouped.

@example[Grouped thematically related form controls](grouped-thematically-related-form-controls){.example}

# Nesting

Nesting `<fieldset>`/`<legend>` structures is absolutely possible, especially when groups of radio buttons or checkboxes play a role.

@example[Nested fieldset/legend structures](nested-fieldsetlegend-structures){.example}

# Keeping legends short

Regarding `<fieldset>`/`<legend>` structures, Internet Explorer is much wordier than Firefox.

Internet Explorer attaches the `<legend>`'s text to the label of each contained form control. For a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, First Name", then "Personal Details, Last Name".

Firefox only announces the `<legend>`'s text when entering the `<fieldset>`. Again, for a `<legend>` with the text "Personal Details" and two fields "First Name" and "Last Name", it literally announces "Personal Details, Grouping" and "First Name", then "Last Name".

@example[Grouped form controls with too long legend](grouped-form-controls-with-too-long-legend){.example}

Conclusion: never put long texts into the `<legend>` element. If you really need to put long text into a form, there are other approaches (if you are really curious and want to learn more about this, skip ahead and read [Placing non-interactive content between form controls](/examples/forms/non-interactive-content){.page}).

# Legend must be a direct child of fieldset

HTML requires the `<legend>` element to be the first child of `<fieldset>`.

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
  <div>...</div>
  <legend>Gender</legend>
</fieldset>
```

As a result, some screen readers seem to have difficulties associating the `<legend>` correctly to its `<fieldset>` if it is not its first child.

# Overcoming visual limitations using ARIA

Admittedly, browsers have a quite peculiar opinion on how to visually style `<fieldset>`/`<legend>` structures, and it is quite hard to override their preferences.

So if for visual (or any other serious) reason you can't use standard `<fieldset>`/`<legend>`, you may take ARIA to the rescue:

- Use `role="group"` to give a `<div>` container the semantics of a `<fieldset>`.
- Associate any other text to the grouping container using `aria-describedby`.

@example[Faked fieldset/legend using ARIA](faked-fieldsetlegend-using-aria){.example}

As always, we highly recommend to use traditional solutions over ARIA, so if you haven't done this yet, go back and read [ARIA - when HTML simply isn't enough](/knowledge/aria){.page}.