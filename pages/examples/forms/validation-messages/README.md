---
navigation_title: "Validation messages"
position: 7
changed: "2020-04-30"
---

# Validation messages

**Data submitted in a form is usually validated in some way. And if there is any unacceptable data, the form is traditionally re-displayed, together with validation messages. In such a case, it is important to immediately inform screen reader users, so they know that they have to look at their data and submit again.**

[[toc]]

As with any other non-interactive content, validation messages need to be associated to the form controls to make sure that screen readers do not miss them when navigating the form. This is done best using ARIA (for more info, see [Placing non-interactive content between form controls](/examples/forms/non-interactive-content)).

We will now show the two typical use cases of displaying validation messages. Both approaches work for full page reloads and AJAX validations.

## Messages next to controls

In this use case, messages are associated to the invalid form inputs using `aria-describedby` (for more info, see [Labelling elements using aria-label and aria-labelledby](/examples/sensible-aria-usage/label-labelledby)):

- For multiple radio buttons or checkboxes, the message is associated to the surrounding `<fieldset>`.
- For all other inputs, the message is associated to the input itself.

[Example](_examples/form-validation-with-messages-next-to-controls)

If there are any validation messages, the focus is set to the first invalid input: this way, a screen reader will immediately announce the associated message, so the user knows that there is at least one invalid input to be fixed.

After fixing the invalid input, the user can search for other invalid ones or simply submit the form again to repeat the process.

## All messages on top

The following example is very similar to the one above, except in this use case, all messages are displayed inside a `<fieldset>`/`<legend>` structure on top of the form. Each message is an in-page link, targeting the respective invalid input.

In addition to this, each invalid input is associated to its message using `aria-describedby`. This is important, as it makes sure that screen readers also announce the messages when navigating through the inputs.

[Example](_examples/form-validation-with-messages-on-top)

If there are any validation messages, the focus is set to the first message: this way, a screen reader will immediately announce it, so the user knows that there is at least one invalid input to be fixed. As the message is also announced as "in-page link", the user can activate it and jump to the respective input; but the user also may decide to stay in the messages block and read the other messages before fixing any of the inputs.

After fixing the invalid input, the user can search for other invalid ones or simply submit the form again to repeat the process

## Combining the two?

There exist hybrids of these two approaches.

Some people may find it useful to display the messages both on top and next to the form control: this has the advantage that visual users will always see the messages, even after scrolling down (which is not the case if the messages are only displayed on top).

Other people may only want to display a general message on top of the form, for example "There are 3 errors, please check your data and submit again". In this case, the focus should be set to this general message. This is one of the rare cases where adding a `tabindex="0"` to make a non-interactive element focusable is reasonable.

## Further optimisations

Our examples above are very simple and created mainly to demonstrate screen reader usage. Please optimise your own form controls and validations for other users, too.

### Visual enhancements

For example, add colours and other visual attributes to invalid fields, for example a thick coloured border, a decent background colour, etc.

Graphical icons can be a useful indicator, too, for example a fancy exclamation mark.

### Meaningfulness of messages

It is also important to provide users with meaningful messages that help them fixing their input: while "Incorrect input format" is not very helpful for a date input, something like "Please enter in format YYYY/MM/DD" is much better.

### Combining with HTML 5 client side validations?

You can easily combine (but not replace) these techniques with HTML 5 client side validations, see [HTML 5 client side validations](/examples/forms/html-5-validations).
