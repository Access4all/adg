---
navigation_title: "Interacting with websites"
position: 4
changed: "2020-04-07"
---

# How to interact with websites using a desktop screen reader

**Due to the differences between browse and focus modes in desktop screen readers, interacting with form controls or widgets can be a bit of a challenge at first. In the end, well-built components can always be understood and controlled by screen reader users, regardless of the given complexities.**

[[toc]]

**Important:** For this article you need to know how to read websites using a desktop screen reader. If you haven't done so yet, go back and read [How to read websites using a desktop screen reader](/knowledge/screen-readers/desktop/reading-websites/) thoroughly before you continue here.

## Activating elements

When the screen reader cursor is on an element, press `Enter` to activate it if possible (like links or buttons).

## Interacting with elements

### Forms

Press `Enter` to interact with editable form elements. Use `Space` to expand/collapse comboboxes or to toggle checkboxes. Use `Left/Right/Up/Down` keys to toggle values.

Use cases:

- When reaching a textarea in browse mode, to enter text into it, press `Enter` to activate focus mode, then enter text.
    - To jump to the next input (or any other focusable element), press `Tab`.
    - To look around for non-focusable content instead, leave focus mode by pressing `Esc`, then browse around with the `Up`/`Down` keys.
- When reaching a text input in focus mode, you can immediately enter text.
- To toggle through the values of a combobox, make sure you are in focus mode, then use `Up` or `Down`.
- To toggle the value of a checkbox, simply hit `Space` (regardless of whether you're in browse or focus mode).

If you are really curious and want to learn more about this, skip ahead and read [How to handle forms](/examples/forms/handling).

### Widgets

Interacting with widgets can be tricky, especially when ARIA roles are used (if you haven't done this yet, go back and read [ARIA - when HTML simply is not enough](/knowledge/aria)).

In general, widgets should be controllable similarly to other interactive elements.
