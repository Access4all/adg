---
navigation_title: "Browse & focus modes"
position: 1
changed: "2020-04-07"
---

# Browse and focus modes

**The relevant desktop screen readers on Windows offer different ways of interacting with the underlying application. The most common ones are browse mode and focus mode. We cannot overestimate the importance of thoroughly knowing their differences.**

[[toc]]

## Browse mode

Reading through a website by moving the screen reader's cursor through a page's information fragments is called "browse" mode:

- In browse mode, the user typically reads content sequentially line by line using the `Down` arrow key (or `Up` for going back).
- In addition, screen readers offer more sophisticated ways of moving the cursor, for example:
    - By pressing the `H` key, the cursor is moved to the next heading (`<h1>`, `<h2>`, etc.).
    - By pressing the `K` key, the cursor is moved to the next link (`<a>`).
    - This allows quick navigation through different elements of a website.
- In browse mode, the screen reader cursor can be placed on every element on a website, even on those which aren't inherently focusable by keyboard, for example headings or paragraphs.
    - Just to make it clear: the web browser's **focus is not the same thing as the cursor** of the screen reader (although they often move synchronously).

Notice: in other resources, browse mode may sometimes also be called "read" mode.

## Focus mode

While browse mode allows reading elements, it does not allow interaction with them (for example entering text into a field or choosing a value from a combobox).

Suppose you're reading a website's content using your screen reader, by moving its cursor from element to element. After a while, you reach a text field (`<input type="text">`), and you want to enter your first name "Herbert" into it:

- If you would type the `H` key now (while being in browse mode), the screen reader would move its cursor to the next heading - not what you intended to do!
- So you need to tell the screen reader not to intercept your keystrokes anymore. Instead, they should be passed to the browser, so typing `H`, `E`, `R`, `B`, `E`, `R`, `T` wouldn't trigger screen reader specific actions anymore, but simply result in the typed text "Herbert".

This mode - where keystrokes aren't intercepted but sent directly to the controlled application - is called "focus" mode:

- When the screen reader's cursor is on an editable element, it allows to switch to focus mode using the `Enter` key.
    - When focus mode is active, a "beep" sound is played.
    - By pressing `Esc`, focus mode can be left (announced by a different "beep" sound) and browse mode is active again.
    - Notice: JAWS behaves a little different in this respect because of its "Auto Forms Mode", see below for more details.
- If you use the `Tab` key to jump from focusable element to focusable element like a keyboard-only user (if you haven't done this yet, go back and read [Controlling a computer with a keyboard only](/knowledge/keyboard-only/controlling-a-computer/)), focus mode is activated automatically when appropriate:
    - For elements allowing only basic interaction (for example links, buttons, and checkboxes), focus mode is not activated.
        - Basic interaction means that only the `Enter` or `Space` key triggers some interaction.
    - If the element allows complex interaction (for example textareas or comboboxes), focus mode is activated.
        - Complex interaction means that there are additional ways to interact, for example by pressing an arrow key or by entering a value directly.

Notice: in other resources, focus mode may sometimes also be called "forms" or "interaction" mode.

### JAWS' auto forms mode

When browsing line by line (using `Up` and `Down` keys), NVDA's default settings require the user to manually switch to focus mode (as explained above).

JAWS by default has a special setting called "Auto Forms Mode": it tries to automatically switch between browse and focus mode whenever appropriate. For example:

- When reaching a text input by pressing the `Down` key, JAWS automatically switches to focus mode (indicated by a "beep" sound). You can now immediately start to enter some text.
- Pressing the `Down` key once again will now move the text input's cursor to the end of the input's value (if there is a value). Obviously, you can still enter text.
- If then the `Down` key is pressed again, this will lead JAWS to leave the text input and switch back to browse mode (indicated by a different "beep" sound).

This seems like a minor detail, but this behaviour indicates clearly that even in focus mode screen readers may intercept some keys. This can be relevant if you bind custom JavaScript behaviour to such keys (if you are really curious and want to learn more about this, skip forward and read [Autosuggest widget (or: autocomplete, lookahead, typeahead)](/examples/widgets/autosuggest)).

If you want to disable "Auto Forms Mode", read [JAWS installation and configuration](/setup/screen-readers/jaws).

### Associated information

In contrast to browse mode, when in focus mode, screen readers do not only announce the element on which the cursor currently is placed. In addition, they also try to find any information that is in some way associated to it.

For example, when focusing an `<input>` field, its `<label>` is announced, and (if available) also the surrounding `<fieldset>`'s `<legend>`. But also any other reasonable information that can be programmatically determined, like content associated using ARIA's `aria-describedby` (if you haven't done this yet, go back and read [ARIA - when HTML simply is not enough](/knowledge/aria)).

### Focus mode vs. keyboard only

Focus mode in screen readers is practically the same like tabbing through a page with keyboard only (if you haven't done this yet, go back and read [Introduction to keyboard only usage](/knowledge/keyboard-only)).

Looked at it this way, screen readers in fact simply introduce only one special interaction mode: the browse mode. So when using the `Tab` key, everything is just plain keyboard only navigation (handled by the underlying browser).

## Side note: application mode

The so called "application" mode is rather rare. If implemented properly, it feels very similar to focus mode to the user.

Application mode's premise is that no basic functionality is offered at all by the browser. So while in focus mode the browser offers basic functionality like tabbing in and out of controls, in application mode nothing like that is available anymore.

In the following example, being in focus mode, the screen reader user will be able to tab into the text input. But as soon as the focus is placed within the `role="application"` element, application mode will be triggered, tabbing won't be available anymore.

```html
<div role="application">
  <input type="text" />
</div>
```

To make listening to the `Tab` key work again, a corresponding functionality needs to be implemented manually using JavaScript.

Also, while leaving focus mode is always possible using the `Esc` key, this option (like many others) is not available in application mode. In the worst case, screen readers get trapped within such an element and will not be able to get out of it anymore. So again, this needs to be implemented using JavaScript - together with each and every other needed interactivity.

All in all, this does not sound promising at all, does it? So why should anyone ever want to use application mode? Well, it is intended to be used for rather complex interactive widgets where browser standard functionality needs to be avoided. And honestly, we did not see a single case yet where a traditional JavaScript widget (run using focus mode) would not have done the job at least equally well.

So if you are tempted to implement a widget with `role="application"`, before doing it, please thoroughly read this: [If you use the WAI-ARIA role "application", please do so wisely! (MarcoZehe.de)](https://www.marcozehe.de/2012/02/06/if-you-use-the-wai-aria-role-application-please-do-so-wisely/).

## Which mode to use when?

It's important to know under which circumstances which interaction mode is used:

- When reading a page, browse mode is used.
- When interacting with an element, focus mode is used.

When users reach a page, they typically start reading it from top to bottom using the `Down` key. Only when they reach an element they want to interact with, they switch to focus mode. This typically happens in forms. And after interacting with the element (for example typing their name), the user has two options:

- Either they use the `Tab` key to move the focus to the next interactive element.
    - If entering data into a form, usually the user expects more form elements to come until a submit button is reached at the end of the process.
- Or they switch back to browse mode by pressing `Esc` and read on using `Down` key.
    - This usually is only necessary if a form is not structured well (if you are really curious and want to learn more about this, skip ahead and read [Forms](/examples/forms)).
