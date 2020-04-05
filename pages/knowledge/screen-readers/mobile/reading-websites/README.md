---
navigation_title: "Reading websites"
position: 2
changed: "2018-04-13"
---

# How to read websites using a mobile screen reader

## Navigating

### Left/right gestures

Navigation with mobile screen readers is very easy: by swiping right (or left), the cursor is moved to the next (or previous) element. The DOM sequence is used to determine the next (or previous) element.

Whenever the cursor is placed on a new element, the element is announced:

- For plain text, this is only the text content (like `or drop us a line...` in the screenshot above).
- For other elements, this is also their text content (if available), together with additional information (like `AccessibilityDeveloperGuide (link)` in the screenshot above).

This is the default way of navigating.

### Pointing

You can set the cursor to an element by clicking on it. Advanced mobile screen reader users know exactly where the elements are displayed on their screen and access them quickly this way.

This behaviour usually is confusing to new users, as they expect that pointing on an element would activate (click) it.

### Scanning

If you move your finger over the touch screen, any element below your finger will receive the cursor. This is a good way to scan the screen and browse for elements.