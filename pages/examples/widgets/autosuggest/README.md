---
navigation_title: "Autosuggest"
position: 9
changed: "2020-04-30"
---

# Autosuggest widget (or: autocomplete, lookahead, typeahead)

**Autosuggests offer a number of possible values, usually presented as some sort of a dropdown element, allowing to select one. By entering a filter string, the possible values are filtered.**

[[toc]]

Best known from search fields (like [Google](https://www.google.com) or [YouTube](https://www.youtube.com)), autocompletes immediately offer suggestions based on the user's input.

![Autosuggest](_media/autosuggest.png)

We do not call autosuggests "autocompletes" so the difference to HTML's `autocomplete` attribute is obvious.

## General requirements

The following requirements are based on well established best practices; unlike most other common widget patterns, the [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) do not offer a section about autosuggests.

Besides many other requirements, we want to stress out explicitly the following:

- The meaning and usage of the autosuggest must be clear.
- If possible, the total number of suggestions should be perceivable ("3 suggestions in total" or similar).
- Proper feedback must be given upon entering a filter ("2 suggestions available for X" or similar).
- The autosuggest must be operable using both keyboard only and desktop screen readers (with a reasonable interplay of default keys like `Tab`, `Enter`/`Space`, `Esc`, `Arrow` keys), as well as mobile screen readers.

## Proof of concept

Before you go on, please read [What is a "Proof of concept"?](/examples/widgets/proof-of-concept).

According to our credo [Widgets simply working for all](/knowledge/semantics/widgets), we advise to create autosuggests as combination of a text input, acting as filter, and a group of radio buttons, acting as the options. They can be styled visually as needed using CSS, and spiced up with (very little) JavaScript, so they behave like perfect autosuggests.

Sensible naming of elements (and a few specifically added visually hidden texts and alerts) guarantees that screen reader users know how to handle the element - even if they have not seen any other autosuggest before.

[Example](_examples/autosuggest-with-radio-buttons)

### Implementation details

Some interesting peculiarities:

- The filter input has:
    - A descriptive text attached to it using `aria-describedby` (see [Adding descriptions to elements using aria-describedby](/examples/sensible-aria-usage/describedby)), giving a clue that the element provides suggestions upon entering text, and how many options there are available.
    - An `aria-expanded` attribute (see [Marking elements expandable using aria-expanded](/examples/sensible-aria-usage/expanded)), giving a clue that there is something to be expanded (the suggestions).
    - An `autocomplete="off"` attribute so it does not trigger the browser's autocomplete feature (which remembers previous user input and offers it again).
- The suggestions appear upon pressing `Up`/`Down`, `Esc`, or upon a first character is entered into the filter input.
- The suggestions are filtered by the characters entered by the user.
    - The individual radio buttons are hidden from all devices using `display: none`, see [Hiding elements from all devices](/examples/hiding-elements/from-all-devices).
- The number of available options is always announced by the screen reader.
    - This is done using `role="alert"`, see [Noticing screen readers using alert role](/examples/sensible-aria-usage/alert).
- Using `Up`/`Down`, an option can be selected.
    - In the background, the radio button values are toggled using JavaScript, and the currently selected radio button's label is entered into the filter (which itself leads screen readers to announce the filter's new value).
- The suggestions can be hidden by pressing `Esc`.

### JAWS' auto forms mode

As we know from [Screen readers' browse and focus modes](/knowledge/screen-readers/desktop/browse-focus-modes), JAWS' "Auto Forms Mode" can lead to leaving a text input upon pressing `Up` and `Down`.

In our autosuggest widget we have bound these keys to toggle through the displayed results. And although preventing the default action upon pressing those keys (using JavaScript's `event.preventDefault()`), JAWS (sometimes) does not respect this and leaves the text input.

This is an unpleasant situation, but definitely an expected behaviour from the screen reader perspective. Sadly, most screen reader users are not aware of such subtleties and can be very confused in situations like this.

In our case, the situation is mitigated because:

- The suggested options are displayed right below the text input, so when JAWS "accidentally" leaves the text input, the options are found immediately.
- The suggested options are a group of radio buttons that can be interacted with perfectly.
