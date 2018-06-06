---
navigation_title: "How to determine a user's input and output devices"
position: 10
changed: "2018-03-16"
---

# How to determine a user's input and output devices

**TODO**



## Additional notes

- How to determine the current user's input/output profile - find out whether a user has a mouse, a keyboard only, and whether he's assisted by a screen reader
- Hard to accomplish in most cases
    - Screen reader: need to ask user specifically (with a visually hidden link or checkbox on top of page)
    - Mouse: track for `onMouseMove` event? (But screen readers may emulate some mouse events!?)
    - Keyboard: track for `onPress` event with Tab-key? (But there are a lot of users who use both mouse and tabbing)
- Best bet: A good website doesn't need to know in most cases
    - In edge cases (e.g. screen readers with inaccessible widgets like Select2) just ask the user and display a simpler solution (e.g. standard `<select>` element)