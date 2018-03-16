---
layout: layout
title: "Screen reader interaction modes"
navigation_title: "Interaction modes"
position: 5
lead: "Windows desktop screen readers offer different ways of interacting with the underlying application. The most common ones are browse mode and focus mode. We can't underestimate the importance of thoroughly knowing their differences!"
---

# Screen reader interaction modes

# Browse mode

Reading through a website by moving the screen reader's cursor through a page's information fragments is called "browse" mode:

- In browse mode, the user typically reads content sequentially line by line using the `Down` key (or `Up` for reading backwards).
- In addition, screen readers offer more sophisticated ways of moving the cursor, for example:
    - By pressing the `H` key, the cursor is moved to the next heading.
    - By pressing the `K` key, the cursor is moved to the next link.
- This allows quick navigation through different elements of a website.
- In browse mode, the screen reader cursor can be placed on every element on a website, even on those which aren't inherently focusable, e.g. headings (`<h1>`, `<h2>`, etc.) or paragraphs (`<p>`).
    - Just to make it clear: the web browser's focus is not the same thing as the screen reader cursor (although they often move synchronously)

Notice: in other resources, browse mode may sometimes also be called "read" mode.

# Focus mode

While browse mode allows reading elements, it doesn't allow interaction with them (for example entering text into a field or choosing a value from a combobox).

Suppose you are on a text field (`<input type="text">`) where you want to enter your first name "Herbert":

- If you type the `H` key while being in browse mode, the screen reader would move its cursor to the next heading - not what you intended to do!
- So you need to tell the screen reader not to intercept your keystrokes anymore. Instead, they should be passed to the browser, so typing `H`, `E`, `R`, `B`, `E`, `R`, `T` wouldn't trigger screen reader specific actions anymore, but simply go to the edit field and result in typed text "Herbert".

This mode - where keystrokes aren't intercepted anymore but sent directly to the active application - is called "focus" mode:

- When the screen reader's cursor is on an editable element, it allows to switch to focus mode using `Enter` key.
    - When focus mode is active, a "beep" sound is played.
    - By pressing `Esc`, focus mode can be left (announced by a different "beep" sound) and browse mode is active again.
- If you use the `Tab` key to jump from focusable element to focusable element, focus mode is activated automatically when appropriate:
    - For elements allowing only basic interaction (for example links or checkboxes), focus mode isn't activated.
        - Basic interaction means that only the `Enter` or `Space` key triggers some interaction.
    - If the element allows complex interaction (for example textareas or comboboxes), focus mode is activated.
        - Complex interaction means that there are additional ways to interact, for example by pressing an arrow key or by entering a value directly.

Notice: in other resources, focus mode may sometimes also be called "forms" or "interaction" mode.

## Focus mode vs. keyboard only

Focus mode in screen readers is exactly the same like tabbing through a page with keyboard only.

Looked at it this way, screen readers in fact simply introduce only one special interaction mode: the browse mode. So when using the `Tab` key, everything is just plain ol' keyboard only navigation (handled by the underlying browser).

# Side note: application mode

The so called "application" mode is rather rare. It is only triggered under certain circumstances and is very similar to focus mode:

- Most of the time, application mode feels exactly the same like focus mode, for example when interacting with an ARIA widget.
- When a widget is implemented using `role="application"`, application mode needs some special attention.
    - If you are tempted to implement a widget with `role="application"`, before doing it, please thoroughly read this: [If you use the WAI-ARIA role "application", please do so wisely! (MarcoZehe.de)](https://www.marcozehe.de/2012/02/06/if-you-use-the-wai-aria-role-application-please-do-so-wisely/)!

# Which mode to use when?

It's important to know under which circumstances which interaction mode is used:

- When reading a page, browse mode is used.
- When interacting with an element, focus mode is used.

So when a user reaches a page, they typically start reading it from top to bottom using `Down` key. Only when they reach an element they want to interact with, they switch to focus mode. This typically happens in forms. And after interacting with the element (for example typing their name), the user has two options:

- Either they use the `Tab` key to move the focus to the next interactive element.
    - If entering data into a form, usually the user expects more form elements to come until sometime a submit button is reached.
- Or they switch back to browse mode by pressing `Esc` and read on using `Down` key.
    - This usually is only necessary if a form isn't structured well (if you are really curious and want to learn more about this, skip ahead and read [Forms, validations, and error messages](/part--examples-of-accessibility-patterns---introduction/forms--validations--and-error-messages){.page}).