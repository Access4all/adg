---
layout: layout
title: "Screen reader interaction modes"
---

# Screen reader interaction modes

Screen readers offer two different ways to interact with the underlying application: browse mode and focus mode. It's very important to know the differences!

# Browse mode

Reading through a website by moving the screen reader's caret through a page's information fragments is called "browse" mode:

- In browse mode, the user typically reads content sequentially line by line using the `Up` or `Down` keys
- In addition, screen readers offer more sophisticated ways of moving the caret, for example:
    - By pressing the `H` key, the caret is moved to the next heading
    - By pressing the `K` key, the caret is moved to the next link
- This allows quick navigation through different elements of a website
- In browse mode, the screen reader caret can be placed on every element on a website, even on those which aren't inherently focusable, e.g. headings (`<h1>`, `<h2>`, etc.) or paragraphs (`<p>`)

Notice: In other resources, browse mode may sometimes also be called "read" mode.

# Focus mode

While browse mode allows reading elements, it doesn't allow interaction with them (e.g. entering text into a field or choosing a value from a list).

Suppose you are on a text edit field (`<input type="text">`) where you want to enter your first name "Herbert"

- If you type the `H` key while being in browse mode, the screen reader would move its caret to the next heading - not what you intended to do!
- So you need to tell the screen reader not to intercept your key strokes anymore but to pass it to the browser, so a typed `H`, `E`, `R`, `B`, `E`, `R`, `T` won't trigger screen reader specific actions anymore, but simply reach the edit field and result in typed text "Herbert"

This mode - where key strokes aren't intercepted anymore but sent directly to the active application - is called "focus" mode:

- When the screen reader's caret is on an editable element, it allows to switch to focus mode using `Enter` key
    - When focus mode is active, a "beep" sound is played
    - By pressing `Esc`, browse mode is activated again (announced by a different "beep" sound)
- If you use the `Tab` key to jump from focusable element to focusable element, focus mode is activated automatically when appropriate:
    - For element allowing only basic interaction (e.g. links or checkboxes), focus mode isn't activated
        - Basic interaction means that only the `Enter` or `Space` key triggers some interaction
    - If the element allows complex interaction (e.g. text inputs or select lists), focus mode is activated
        - Complex interaction means that there are additional ways to interact, e.g. by pressing an arrow key or by entering a value directly

Notice: In other resources, focus mode may sometimes also be called "forms" mode.

## Focus mode vs. keyboard-only

Focus mode in screen readers is exactly the same like tabbing through a page with keyboard-only (see [Introduction to keyboard-only usage](/knowledge-about-developing-and-testing-accessible-websites/introduction-to-keyboard-only-usage){.page}).

Looked at it this way, screen readers in fact simply introduce only one special interaction mode: the browse mode. And when using the `Tab` key, everything is plain ol' keyboard-only navigation (handled by the underlying browser).

# Side note: Application mode

This is a rather rare mode: it is triggered under certain circumstances and is very similar to focus mode:

- Most of the time, application mode feels exactly the same like focus mode, e.g. when interacting with an ARIA widget (see [Creating an ARIA widget - and why we usually advise against it](/code-examples/sensible-usage-of-aria-roles-and-attributes/creating-an-aria-widget---and-why-we-usually-advise-against-it){.page})
- When a widget is implemented using `role="application"`, application mode needs some special attention
    - If you're tempted to implement a widget with `role="application"`, before doing it, please thoroughly read [Why using ARIA role="application" is never a good idea](/code-examples/sensible-usage-of-aria-roles-and-attributes/why-using-aria-role-application-is-never-a-good-idea){.page}! (We're pretty sure you'll change your opinion reading it.)

# Which one to choose?

It's important to know under which circumstances which interaction mode is used:

- When reading a page, browse mode is used
- When interacting with an element, focus mode is used

So when a user reaches a page, he typically starts reading it from top to bottom using `Down` key. Only when he reaches an element he wants to interact with, he switches to focus mode. This typically happens in forms - after interacting with the element (e.g. typing his name), the user has two options:

- Either he uses the `Tab` key to move the focus to the next interactive element
    - If entering data into a form, usually the user expects to come more form elements until a submit button is reached
- Or he switches back to browse mode by pressing `Esc` and reads on using `Down` key
    - This usually is only necessary if a form isn't structured well (to read more about well structured forms, see [Forms, validations, and error messages](/code-examples/forms--validations--and-error-messages){.page})