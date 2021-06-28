---
navigation_title: "How to implement"
position: 3
changed: "2018-05-30"
---

# How to implement websites that are ready for keyboard only usage

**Fortunately, to make sure a website is ready to be used by keyboard only, there is very little you need to consider. Still, a lot can go wrong if not paying attention, and bad old habits of some web developers seem to be hard to overcome.**

[[toc]]

## Standard functionality

As HTML is fully keyboard only ready, all standard HTML controls offer built-in support for keyboard interaction. This is provided by the browser. So if you stick to using proper semantic HTML markup, you're all fine.

Thus, if you haven't done this yet, go back and read [Semantics and their importance for accessibility](/knowledge/semantics).

## Custom functionality

If you need to provide custom functionality on your website (for example a fancy JavaScript widget that does not have an HTML equivalent), you may need to optimise it specifically for keyboard interaction.

### Focusability

First, be sure any relevant element is focusable by keyboard:

- Either by using an HTML element that inherently is focusable (for example a link or a button).
    - Whenever an element should be interacted with, this is the proper way to go.
- Or by adding the `tabindex="0"` attribute, for example `<div tabindex="0">`
    - This should only be used in situations when an element shall be focusable, but not interactive (a very rare case).
- A special case are `<a>` tags: if they have an `href` attribute, they are focusable; otherwise, in most browsers they are not.

### Keyboard operability

Then, implement any functionality as needed by adding appropriate events, for example `onclick` or similar:

- Be sure to use browser-independent events.
    - An `onclick` event is triggered by all sorts of devices (regardless whether it's fired upon a mouse click or by pressing a keyboard's `Enter` key).
    - On the other side, a `hover` event can only be triggered by some devices (for example mouse) and not by others (for example keyboard)
        - A well-known accessibility problem is dropdown menus opening on `hover` only, so no keyboard user will ever be able to open it.
- Avoid listening to specific keyboard keys, unless you really want to provide device-specific functionality.
    - For example, listening to a `keypress` event and looking for a key code `13` (`Enter` key) will only catch a real keyboard's `Enter` key.
        - But it won't catch a screen reader's `Enter` key, as pressing `Enter` with a screen reader running will typically fire a `click` event instead.
        - As described above, it's usually better to listen to a `click` event here.
    - Be aware that many keys are only available on full-fledged keyboards of desktop computers.
        - Be sure not to bind functionality to such specific keys (for example modifier keys like `Alt`), or provide alternative ways to use the functionality.
        - Even arrow keys aren't available on many devices, for example touch screen smartphones.
        - Especially combinations of keys can be really hard (if not impossible) to be pressed by motor impaired people.

### Standards over custom

In our opinion, there are very few cases which really need optimisation for keyboard interaction. Always think twice and look for a standard behaviour first that may fit your need (even if it looks very different on first sight).

## Focus management

Another facet of keyboard optimisation is setting the focus properly if needed.

This can be explained especially well by looking at the dialog pattern. Indeed, our guide has such a dialog implementaion available as a fully working example, so if you are really curious and want to learn more about this, skip ahead and read [Dialog widget (or: modal, popup, lightbox, alert)](/examples/widgets/dialog).

### Setting focus to an element

For example, when a user clicks on a button "Show terms and conditions (dialog)", then it is important that the keyboard focus is set into the dialog properly. Otherwise, the keyboard focus usually is hidden somewhere "behind" the dialog. If users then want to interact with the dialog (be it filling out some displayed form elements, clicking a link within its content, or simply pressing its close button), they are forced to press `Tab` again and again until (hopefully) the focus suddenly appears in the dialog.

Specifically, the first content element of the dialog should be focused, due to the following reason: users usually make their way from top to bottom of a page, be it while reading content or moving the keyboard focus. Placing the focus on the first content element does not interrupt this workflow. It usually is a good practice to define the dialog's close button to be this first element:

```javascript
$("button#show-dialog").click(function() {
  $("div#dialog button.close").focus();
});
```

```html
<button id="show-dialog">
  Show terms and conditions (dialog)
</button>

<div id="dialog">
  <button class="close">Close dialog</button>

  <p>Here is some content...</p>
</div>
```

### Avoiding focus on background elements

Dialogs typically are placed on top of the page's other content, often darkening the background. As explained above, keeping the focus placed in the background after opening a dialog is nasty for keyboard users. So we should take care that this does not happen by accident again when the user is interacting with the dialog.

One way is to trap the focus within the dialog: this means that after the last focusable element of the dialog loses focus, the first element is focused again. This way, if users have interacted with the form and then want to close it again using the close button on top of the dialog, they do not have to tab back to the top (using `Shift + Tab`), but intuitively reach the close button again automatically.

But there is a big disadvantage with this technique: users will not be able at all to leave the page content using `Tab` key, for example if they want to reach the address bar. Sure, there are other ways to do this (for example pressing `F6` or `Ctrl + L`), but some users do not know about this.

A better solution is to not trap the focus, but to offer another close button at the bottom of the dialog. This way, the user won't have the need anymore to press `Tab` again, in hope to reach the close button at the top.

```html
<div id="dialog">
  <button class="close">Close dialog</button><!-- Usually an X symbol on the top right -->

  <p>Here is some content...</p>

  <button class="confirm">Confirm</button><!-- This confirms the dialog -->
  <button class="cancel">Cancel</button><!-- This cancels the dialog (like the X symbol) -->
</div>
```

### Resetting focus

As soon as the user closes the dialog, the focus needs to be set back to the element it initially had been before opening the dialog. In our example, this was the "Show terms and conditions (dialog)" button. Otherwise, the focus gets "lost", and it is automatically set by the browser to the very beginning of the page.

In some cases, the initial element may not be available anymore. For example, in a shopping cart, when removing an item opens a dialog, asking "Are you sure you want to delete this item?". If confirmed, the page would do some AJAX, removing the item from the page, then closing the confirmation dialog. In this case, you should place the focus somewhere that is still reasonable to the user. For example, place it on the next item's remove button. Or if you are displaying some notification like "Item successfully removed from shopping cart" or "No items left in shopping cart".

### Be careful with setting focus

Only set focus if it clearly is not feasible to leave it where it currently is. So you never want to bug your users by moving focus around nervously!

An example for bad focus management is a tablist like the following: after activating a tab, the focus would be automatically set to the selected tab's content. This may seem useful at the first glance: users selecting a tab typically want to interact with its content directly, do not they? But at the second glance, if visual users simply want to toggle through the available tabs' contents quickly, they really need the focus to stay on the tabs.

However, in our dialog example above, leaving the focus in the darkened (or even invisible) background surely is no option. Thus, in this case, moving the focus into the dialog definitely is the right way to go.

## Conclusion

Optimising a website for keyboard only usage needs some awareness of the typical pitfalls. Providing proper HTML elements helps truly a lot already, but the full deal requires some additional developer skills.

All of the code examples in our guide are fully accessible to the most common assistive software and devices and can provide you a lot of inspiration. If you are really curious and want to learn more about this, skip ahead and read [Examples of accessibility patterns](/examples).
