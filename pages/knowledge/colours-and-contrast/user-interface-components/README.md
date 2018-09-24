---
navigation_title: "UI components"
position: 4
changed: "2018-08-12"
---

# Contrast requirements of user interface components

**The Web Content Accessibility Guidelines (WCAG) 2.0 only required a certain colour contrast level for text. Finally, the recently published version 2.1 has added colour contrast requirements for user interface (UI) components.**

There is not much value to interactive elements on a page, if a user can not perceive them. Alas, UI components need a contrast ratio of at least `3:1` against adjacent color(s).

## Form controls

For example, if the fields of a contact form have borders with low contrast, a user with low vision may not be able to fill (or even find) them.

In the following screenshot, the fields' borders have a contrast ratio of `1.5:1`.

![Low contrast form](_media/low-contrast-form.png)

Strictly speaking, also the submit button is hardly perceivable as a form control: although its label "Send message" is clearly visible, the background color (that should indicate the user that the element is a button) also has a contrast ratio of only `1.5:1`. This can be seen as negligible though, as the label offers a clear invitation to interact with it by using a verb (which is better than a generic label like "OK"), and the label's text is distinct to surrounding text.

## Custom controls

Websites usually contain a lot of visual elements that convey meaning. We talk about "custom controls" when such elements can be interacted with, resulting in some status change that again is reflected in the visual design (either immediately with a JavaScript widget, or after a traditional page reload).

### Tablist

A well known example for this is a tablist: it conveys visually that there is a list of items, and the currently active item's content is displayed below. The button-like style of the items indicates that a user can click on them, making the clicked item the active one and displaying its content.

As the following tablist's borders have low contrast (`1.5:1`), a visually impaired user may miss completely how to interactwith it (or that it should be interacted with it at all).

![Low contrast tablist](_media/low-contrast-tablist.png)

Sometimes, tablist's rely on background colors instead of borders. Although this may look much more obvious, the contrast is still the same, and the same problem happens:

![Low contrast tablist](_media/low-contrast-tablist-with-background.png)

By providing borders with high contrast, the tablist can be recognised easily by all users:

![Low contrast tablist](_media/tablist-with-borders.png)

And while we are at it: providing clear indicators for where an element starts and where it ends is always good style, so please also expand borders around the content area.

![Low contrast tablist](_media/tablist-with-more-borders.png)

### Active indicator

A much simpler example is a symbol that simply conveys whether an element is active or not.

A typical website's navigation consists of a list of links (sometimes even a nested hierarchy). The currently displayed page is usually conveyed using a symbol.

In the following screen shot, the indicator is hardly visible (`1.9:1`):

![Low contrast active indicator](_media/low-contrast-active-indicator.png)

Now it is better:

![High contrast active indicator](_media/high-contrast-active-indicator.png)

## Exceptions

UI components usually consist of text and shape(s). As such, for UI components containing text, the exceptions for contrast requirements of text apply. For shape(s), there are some more exceptions:

- **Placeholder** text: this could be a placeholder value in a form control - as long as it is used as intended (namely to give an example for a valid input), and not misused as the replacement for a proper label.
- **Disabled** components: this could be a disabled edit field or button, but also a custom control.
    - Be careful with components that have low contrast due to having "disabled" status: often, the mere existence of an element conveys something to a user. For example, if a form's submit button is disabled while the user's input is missing (or invalid), and the disabled input (both text and shape) has low contrast, some users may not see the button at all. This could lead them to skip the form, as they may think that it is not to be submitted at all.
    - Also be sure to not mix up `disabled` with `readonly` states.
