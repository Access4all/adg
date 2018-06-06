---
navigation_title: "Forms"
position: 5
changed: "2018-05-12"
---

# Forms

**Forms provide interactivity with websites. If coded properly, basic forms are natively accessible. And to achieve advanced functionalities, more sophisticated techniques are available.**

TODO

## Additional notes

- Complex labels - how to offer complex labels for radiobuttons or checkboxes (???)
- Placeholders - the reason why they are never a good idea
- Floating labels - a cool alternative to placeholders

---

When not simply reading websites, users are interacting with them. The most common use case is entering data and selecting options in a form.

First things first: you need to [learn how to handle form elements](/examples/forms/handling) - using screen readers, keyboard-only, and other tools!

We then prove that [HTML delivers you everything you need](/examples/forms/good-example) to create basic accessible forms:

- A pretty exhaustive list of controls like text input, file upload, radio buttons, checkboxes, etc.
- Labels to describe the inputs
- Fieldsets to group inputs and legends to describe them

This is followed by a [demonstration about what typically can go wrong](/examples/forms/bad-example) when developers aren't mindful and forget about proper semantics.

Further on, we show [how fieldsets and legends should be used](/examples/forms/grouping-with-fieldsetlegend) and [how to fake them - if necessary - using ARIA](@page-106). Sometimes it's also desirable to [mix headings](/examples/forms/grouping-with-headings) and [other non-interactive content](/examples/forms/non-interactive-content) into forms.

User input validation is an important topic: we show [how to display validation errors and associate them to inputs](/examples/forms/validation-messages), [how to mark inputs as "required"](/examples/forms/required-), and [how to use HTML5 client-side validations](/examples/forms/html-5-validations).

We agree that sometimes it's desirable to [mix form elements into tables](/examples/forms/in-tables).

Think you need a fancy widget? Read this first, we show [how to transform basic form controls into fancy looking (and feeling) custom controls](/examples/forms/advanced-visual-stylings-of-basic-form-controls) - all without using JavaScript!

Talking about JavaScript: sometimes it's necessary that [form controls adapt to user input](/examples/forms/changing-form-fields-dynamically-based-on-user-input).

Finally, the [FAQ](/examples/forms/faq-frequently-asked-questions) gives answers to many more everyday questions.