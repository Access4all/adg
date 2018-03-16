---
layout: layout
title: "How to implement keyboard only ready websites"
navigation_title: "How to implement"
position: 4
lead: "Fortunately, to make sure a website is ready to be used by keyboard only, there's very little you need to consider. Still, a lot can go wrong if not paying attention, and bad old habits of some web developers seem to be hard to be exterminated."
---

# How to implement keyboard only ready websites

# HTML is keyboard only ready

All standard HTML controls offer built-in support for keyboard interaction. This is provided by the browser. So if you stick to using proper semantic HTML markup, you're all fine.

So if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics){.page}.

# Special attention regarding custom functionalities

If you need to provide custom functionalities on your website (for example a fancy JavaScript widget), you may need to optimise it specifically for keyboard interaction.

## Making interactive elements focusable

First, be sure any relevant element is focusable by keyboard:

- Either by using an HTML element that inherently is focusable (for example a link or a button).
    - Whenever an element should be interacted with, this is the proper way to go.
- Or by adding a `tabindex="0"` attribute, for example `<div tabindex="0">`
    - This should only be used in situations when an element should be focusable, but not interactive (a very rare case).

## Adding custom keyboard functionality

Then, implement any functionality as needed by adding appropriate events, for example `onclick` or similar:

- Be sure to use browser-independent events.
    - An `onclick` event is triggered by all sorts of devices (regardless whether it's fired upon a mouse click or by pressing a keyboard's `Enter` key).
    - On the other side, a `hover` event can only be triggered by some devices (e.g. mouse) and not by others (e.g. keyboard)
        - A well-known accessibility problem is dropdown menus opening on `hover` only, so no keyboard user will ever be able to open it.
- Avoid listening to specific keyboard keys, unless you really want to provide device-specific functionality.
    - For example, listening to a `keypress` event and looking for a key code `13` (`Enter` key) will only catch a real keyboard's `Enter` key.
        - But it won't catch a screen reader's `Enter` key, as pressing `Enter` with a screen reader running will typically fire a `click` event instead.
        - As described above, it's usually better to listen to a `click` event here.

# Careful with custom functionalities!

In our opinion, there are very few cases which really need optimisation for keyboard interaction. If you are really curious and want to learn more about this, skip ahead and read [Our codex about clean and maintainable accessibility](/knowledge/codex){.page}.