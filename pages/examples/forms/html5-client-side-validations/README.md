---
layout: layout
title: "HTML5 client-side validations"
navigation_title: "HTML5 client-side validations"
position: 10
lead: "HTML5 client side validations are very useful feature and (thank heavens!) are supported to a high degree by screen readers."
---

# HTML5 client-side validations

# General thoughts

HTML5 client side validations have a lot of benefits, for example:

- They make resolving validation errors faster and more understandable, thus resulting in better user experience
- They can also reduce network and server load

Validations can be added in two ways:

- Implicitly by setting the `type` of an input to a value that comes with some validations by itself (e.g. `type="email"`)
- Explicitly by adding validations manually through the respective attributes (e.g. `required` or ` pattern`)

# Demonstration

The following example demonstrates a few of those validations:

- The "Full name" input is required (using `required` attribute)
- The "Email" input checks for a valid input format (using `type="email"` attribute)
- The "Password" input checks for a custom pattern (using `pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"` attribute)
    - This requires an input of at least six characters with at least one number, one lowercase and one uppercase letter
    - To make the pattern available to the user in a human readable form, you can use the `title` attribute: ` title="Minimum 6 characters containing lowercase, uppercase, and at least one number"`
- The "Gender" radio buttons are required (again using `required` attribute)
- The "Terms and conditions" checkbox now also is required (again using `required` attribute)

@code(/examples/forms/html5-client-side-validations/_examples/forms-validation-example-with-html5-client-side-validation/){.code}

# Same same but different

All browsers handle these validations to their likings. In general, they work quite similar:

- When the user submits the form, the browser sets the focus automatically to the first invalid input
- The validation error is announced by the screen reader

A few notes though:

- Some screen readers announce missing required values automatically as "invalid", others don't
- Some screen readers announce both an input's name and validation error, others only announce the validation error
    - The latter case is a minor inconvenience, as the user may have to find out the input's name manually (which is easy, but still an annoyance)

# Using the invalid attribute

If you like, you can manually set the attribute `invalid` to an invalid input:

```html
<input type="text" invalid />
```

But please do so only after the user has already interacted with the input: it's annoying to visit a "fresh" form and have all required (but initially empty) fields announced as "invalid" by default!

# Always provide a title when requiring a custom pattern!

It's general a good practice to provide a human readable explanation of a required `pattern` using the `title` attribute:

- This will be displayed together with the browser's validation error
- This doesn't work for other validation types (so it's not possible to override the standard message for inputs that have only a `required` attribute)

From an accessibility point of view, for Internet Explorer it's not only good practice, but it's a clear requirement. Because if an input requires a specific `pattern`, but has no `title`, JAWS doesn't announce any validation error in Internet Explorer:

- A visual user at least sees a small popup "You must use this format" (admittedly not being of much help)
- But a JAWS user will feel totally frustrated as there's no clue about a specific format

The following example is especially problematic, as the field not only requires a specific pattern - it's also marked up as `required`: so the user feels like he has done everything right after filling something into the input, but still he can't submit the form.

@code(/examples/forms/html5-client-side-validations/_examples/forms-validation-example-with-html5-client-side-validation-pattern-without-title/){.code}

# Never trust user data!

Just a note for completeness: while HTML5 client side validations are a cool feature, they certainly are no replacement for server side validations! Because: you never trust user data - do you?!

More info: [Validations and error messages](/examples/forms/validations-and-error-messages){.page}.