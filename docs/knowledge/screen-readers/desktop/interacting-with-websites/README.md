---
navigation_title: "Interacting with websites"
position: 4
changed: "2018-04-13"
---

# How to interact with websites using a desktop screen reader

**Modern websites offer a lot of interactivity - long gone are the times of static pages. Complex interactions can become quite a challenge using a screen reader, but if done properly, there are no limits.**

Beneath simple reading of information, most modern websites offer a lot of interactivity.

**Important:** For this article you need to know how to read websites using a desktop screen reader. If you haven't done so yet, go back and read [How to read websites using a desktop screen reader](/knowledge/desktop-screen-readers/reading-websites) thoroughly before you continue here.

## Activating links

Press `Enter` to activate links.

## Interacting with forms

Press `Enter` to interact with editable form elements, or to submit a form. Use `Space` to expand/collapse comboboxes or to toggle checkboxes. Use `Left/Right/Up/Down` keys to toggle values. Press `Enter` to activate buttons.

Use cases:

- When reaching a textarea in browse mode, to enter text into it, press `Enter` to activate focus mode, then enter text.
    - To jump to the next input (or any other focusable element), press `Tab`.
    - To look around for non-focusable content instead, leave focus mode by pressing `Esc`, then browse around with the arrow keys.
- When reaching a text input in focus mode, you can immediately enter text.
- To toggle through the values of a combobox, make sure you are in focus mode, then use `Up` or `Down`.
- To toggle the value of a checkbox, simply hit `Space` (regardless of whether you're in browse or focus mode).

If you are really curious and want to learn more about this, skip ahead and read [How to handle forms](/examples/forms/handling).

## Interacting with widgets

Interacting with widgets can be tricky, especially when ARIA roles are used (if you haven't done this yet, go back and read [ARIA - when HTML simply is not enough](/knowledge/aria)).

In general, widgets should be controllable similarly to other interactive elements.
