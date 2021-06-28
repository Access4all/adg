---
navigation_title: "Datepicker"
position: 13
changed: "2020-04-30"
---

# Datepicker widget

**Datepickers are an easy and intuitive way to let users pick a date. They usually offer their options below their respective form control in a table-like design which can be toggled visible. Some date pickers also offer time settings.**

[[toc]]

![Datepicker](_media/datepicker.png)

## General requirements

The following requirements are based on well established best practices; unlike most other common widget patterns, the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) do not offer a section about datepickers.

Besides many other requirements, we want to stress out explicitly the following:

- The meaning and usage of the datepicker must be clear.
- Proper feedback must be given upon selecting a date.
- The datepicker must be operable using both keyboard only and desktop screen readers (with a reasonable interplay of default keys like `Tab`, `Enter`/`Space`, `Esc`, `Arrow` keys), as well as mobile screen readers.

## Proof of concept

Before you go on, please read [What is a "Proof of concept"?](/examples/widgets/proof-of-concept).

According to our credo [Widgets simply working for all](/knowledge/semantics/widgets), we advise to create datepickers as combination of a text input, and a group of radio buttons (acting as the options). They can be styled visually as needed using CSS, and spiced up with (very little) JavaScript, so they behave like perfect datepickers.

Sensible naming of elements (and a few specifically added visually hidden texts) guarantees that screen reader users know how to handle the element - even if they have not seen any other datepicker before.

[Example](_examples/datepicker-with-radio-buttons)

### Implementation details

Some interesting peculiarities:

- The filter input has:
    - A descriptive text attached to it using `aria-describedby` (see [Adding descriptions to elements using aria-describedby](/examples/sensible-aria-usage/describedby)), giving a clue that the element provides a datepicker upon click and arrow key usage.
    - An `aria-expanded` attribute (see [Marking elements expandable using aria-expanded](/examples/sensible-aria-usage/expanded)), giving a clue that there is something to be expanded (the datepicker).
    - An `autocomplete="off"` attribute so it does not trigger the browser's autocomplete feature (which remembers previous user input and offers it again).
- The datepicker appears upon clicking into the input, pressing `Up`/`Down` or `Arrow` keys.
    - As soon as the datepicker appears, its group of radio buttons gains focus: from now on, the user interacts only with the radio buttons.
- Using `Left`/`Right` keys, the date changes by one day, and using `Up`/`Down` keys, the date changes by one week.
    - The default toggling behaviour of radio buttons is overridden using JavaScript.
- The radio buttons are inside a `<fieldset>`/`<legend>` structure, giving context to them (see [Grouping form controls with fieldset and legend](/examples/forms/grouping-with-fieldset-legend)).
    - For visual users, the legend is hidden (see [Hiding elements visually by moving them off-screen](/examples/hiding-elements/visually).
- The radio buttons are laid out inside a `<table>`, see [Forms within tables](/examples/forms/in-tables).
    - This does not only serve visual purposes, but also allows screen reader users to manually browse the table.

Adding more sophisticated features like controls for choosing a day, month, or year directly, or enhancing the datepicker with time options, would be easy. For simplicity though, we refrained from doing this.

## Further discussions

### Manual input vs. date selection

Some datepickers allow manual input, others do not. The difficult thing with allowing manual input is parsing the input given: one user may provide an input like `2018/11/19`, another one may provide `19.11.2018`.

If you allow manual input of a date, you need to provide its required format, for example right inside the input's label, like `Birthday (YYYY/MM/DD)`, or in a descriptive text next to the input (see [Placing non-interactive content between form controls](/examples/forms/non-interactive-content)).

Besides simply allowing manual input of a full date, your datepicker can offer nice features depending on the user's input. For example, if the user inputs `2016`, the datepicker could offer the days of the current month of the year 2016; or if the user inputs `2016/10`, the datepicker could offer the days of October 2016. This way the user can narrow the desired date quickly and then can use the datepicker to choose a day.

### Tooltip / dialog style

In our implementation, the datepicker is attached directly to the text input, and usage of the `Arrow` keys triggers date selection. This means that the `Arrow` keys are not available for text editing anymore, which can be confusing.

To prevent this, you could attach the datepicker to a dedicated button next to the text input instead, similar to a complex tooltip, see [Tooltip widgets (or: screen tip, balloon)](/examples/widgets/tooltips), or even to a dialog, see [Dialog widget (or: modal, popup, lightbox, alert)](/examples/widgets/dialog). Be sure to give this button a proper name, like `Birthday datepicker`.

### HTML 5 date input

In HTML 5 exist date and time specific inputs, like `<input type="date">` or `<input type="time">`.

While some browsers provide nice datepickers themselves for such inputs, this is not yet supported by some major browsers. So from an accessibility point of view: if you do not want to force some of your users to input dates manually, you are better off using an custom datepicker instead of these HTML 5 features (yet).
