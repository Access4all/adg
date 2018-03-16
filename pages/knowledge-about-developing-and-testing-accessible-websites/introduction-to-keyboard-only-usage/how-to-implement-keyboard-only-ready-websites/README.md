---
layout: layout
title: "How to implement keyboard-only ready websites"
position: 4
lead: "There's very little to consider to make sure a website is keyboard-only ready. Still, a lot can go wrong if not paying attention."
---

# How to implement keyboard-only ready websites

# HTML is keyboard-only ready

All standard HTML controls offer built-in support for keyboard interaction. This is provided by the browser.

So if you stick to using proper semantic HTML markup, you're all fine.

For more info, see: [What are semantics and why are they important for accessibility?](/knowledge-about-developing-and-testing-accessible-websites/what-are-semantics-and-why-are-they-important-for-accessibility){.page}

# Custom functionalities need special attention

If you need to provide custom functionalities on your website (e.g. a fancy JavaScript widget), you may need to optimise it specifically for keyboard interaction.

## Make interactive elements focusable!

First, be sure any interactive element is focusable by keyboard:

- Either by using an HTML element that inherently is focusable (e.g. a link or a button)
- Or by adding a `tabindex="0"` attribute
    - E.g. `<div tabindex="0">`

## Add custom keyboard functionality yourself!

Then, implement any functionality as needed by adding appropriate events, e.g. `onclick` or similar:

- Be sure to use browser-independent events!
    - An `onclick` event is triggered by all sorts of devices (regardless whether it's fired upon a mouse click or pressing a keyboard's `Enter` key)
    - A `hover` event can only be triggered by some devices (e.g. mouse) and not by others (e.g. keyboard)
        - A well-known accessibility problem is dropdown menus opening on `hover` only: no keyboard user will ever be able to open it!
- Avoid listening to specific keyboard keys, unless you really want to provide device-specific functionality
    - For example, listening to a `keypress` event and looking for a key code `13` (`Enter` key) will only catch a real keyboard's `Enter` key
        - But it won't catch a screen reader's `Enter` key, as pressing `Enter` with a screen reader running will typically fire a `click` event instead!
        - As described above, it's usually better to listen to a `click` event here

# Be careful with custom functionalities!

In our opinion, there are very few cases which really need optimisation for keyboard interaction. Read more here: [Our codex about clean and maintainable accessibility](/knowledge-about-developing-and-testing-accessible-websites/our-codex-about-clean-and-maintainable-accessibility){.page}.