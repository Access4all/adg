---
layout: layout
title: "Validations and error messages"
---

# Validations and error messages

Data entered into form inputs usually is validated by the server: if there's any inacceptable data, the form usually is re-displayed, together with error messages.

The following examples show the best ways to associate validation errors to form inputs and make sure the user gets to know about them.

# Displaying each error below its input

Error messages are associated to the invalid form inputs using `aria-describedby` (for more info, see [ARIA label, describedby and labelledby Attributes](/code-examples/sensible-usage-of-aria-roles-and-attributes/aria-label--describedby-and-labelledby-attributes){.page}):

- For multiple radio buttons or checkboxes, the error message is associated to the surrounding `<fieldset>`
- For all other inputs, the error message is associated to the input itself

If there are any validation errors, the focus is set to the first invalid input (for more info, see [Focus Handling](/code-examples/focus-handling){.page}):

- This announces the error message, so the user knows that there was at least this one error
- After fixing the invalid input, the user can search for other invalid ones or simply submit the form again to repeat the process

[**Forms Validation Example With Message After The Input**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.LjwyoR.small.e75d8f52-5a33-4c00-b359-37f11a500674.png)](https://codepen.io/accessibility-developer-guide/pen/LjwyoR){.code}

# Displaying all errors on top of the form

The following example is very similar to the one above, except it displays all error messages together on top of the form:

- Each message is an in-page link, targeting the respective invalid input
- It's also associated to it using `aria-describedby`
    - This is important, as it makes sure that screen readers also announce the error messages when navigating through the inputs using `Tab` key!

If there are any validation errors, the focus is set to the first error message (in-page link):

- This announces the error message, so the user knows that there was at least this one error
- As the error is also announced as "in-page link"
    - The user can activate it and jump to the respective input
    - The user also may decide to stay in the error messages block and read the other messages
- Again, after fixing the invalid input, the user can search for other invalid ones or simply submit the form again to repeat the process

[**Forms Validation Example With Messages On Top**![](https://s3-us-west-2.amazonaws.com/i.cdpn.io/1279260.XavEyp.small.3e33e11f-1ee6-4147-ad32-331f6f5602db.png)](https://codepen.io/accessibility-developer-guide/pen/XavEyp){.code}

# What about HTML5 client side validations?

You can easily combine (not replace!) these techniques with HTML5 Client Side Validations, see [HTML5 client-side validations](/code-examples/forms--validations--and-error-messages/html5-client-side-validations){.page}.