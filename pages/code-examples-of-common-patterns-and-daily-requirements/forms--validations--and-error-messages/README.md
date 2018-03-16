---
layout: layout
title: "Forms, validations, and error messages"
navigation_title: "Forms"
position: 5
lead: "Forms provide interactivity with websites. If coded properly, basic forms are natively accessible. And to achieve advanced functionalities, more sophisticated techniques are available."
---

# Forms, validations, and error messages

![](_media/1510750568808.png){.image}

When not simply reading websites, users are interacting with them. The most common use case is entering data and selecting options in a form.

# TL;DR - Too long, didn't read

First things first: you need to [learn how to handle form elements](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/how-to-browse-forms){.page title="How to browse forms"} - using screen readers, keyboard-only, and other tools!

We then prove that [HTML delivers you everything you need](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/general-forms-example){.page title="General forms example"} to create basic accessible forms:

- A pretty exhaustive list of controls like text input, file upload, radio buttons, checkboxes, etc.
- Labels to describe the inputs
- Fieldsets to group inputs and legends to describe them

This is followed by a [demonstration about what typically can go wrong](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/bad-forms-example){.page title="Bad forms example"} when developers aren't mindful and forget about proper semantics.

Further on, we show [how fieldsets and legends should be used](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/grouping-form-inputs-using-fieldset-and-legend){.page title="Grouping form inputs using fieldset and legend"} and [how to fake them - if necessary - using ARIA](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/faking-fieldset--legend-using-aria){.page title="Faking fieldset / legend using ARIA"}. Sometimes it's also desirable to [mix headings](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/grouping-form-inputs-using-headings){.page title="Grouping form inputs using headings"} and [other non-interactive content](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/placing-non-interactive-content-into-forms){.page title="Placing non-interactive content into forms"} into forms.

![](_media/1510822647695.png){.image}

User input validation is an important topic: we show [how to display validation errors and associate them to inputs](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/validations-and-error-messages){.page title="Validations and error messages"}, [how to mark inputs as "required"](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/marking-inputs-as-required-using-asterisks---){.page title="Marking inputs as required using asterisks (*)"}, and [how to use HTML5 client-side validations](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/html5-client-side-validations){.page title="HTML5 client-side validations"}.

We agree that sometimes it's desirable to [mix form elements into tables](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/forms-in-tables){.page title="Forms in tables"}.

Think you need a fancy widget? Read this first, we show [how to transform basic form controls into fancy looking (and feeling) custom controls](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/advanced-visual-stylings-of-basic-form-controls){.page title="Advanced visual stylings of basic form controls"} - all without using JavaScript!

Talking about JavaScript: sometimes it's necessary that [form controls adapt to user input](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/changing-form-fields-dynamically-based-on-user-input){.page title="Changing form fields dynamically based on user input"}.

Finally, the [FAQ](/code-examples-of-common-patterns-and-daily-requirements/forms--validations--and-error-messages/faq---frequently-asked-questions){.page title="FAQ - frequently asked questions"} gives answers to many more everyday questions.