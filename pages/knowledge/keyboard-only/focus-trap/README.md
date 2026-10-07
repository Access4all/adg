---
navigation_title: "Focus traps"
position: 5
---

# Focus traps

**A focus trap keeps keyboard focus inside one part of the page and off the rest. Users must still reach the browser UI.**

[[_TOC_]]

## What the trap is for

A modal sits on top of the page. The content behind it is unavailable.

Without a trap, `Tab` lands on links and buttons behind the dialog. Those controls are covered. Focusing them is confusing.

The trap keeps the page's tab order inside the dialog until it closes.

## The browser UI stays reachable

The address bar, tabs, and menus belong to the browser. They are not part of the page.

A mouse user can click the address bar while a modal is open. A keyboard user needs the same access.

With a proper trap:

- `Tab` moves through the controls inside the dialog.
- After the last control, the next `Tab` moves to the browser UI, often the address bar.
- `Shift + Tab` on the first control does the same.
- Tabbing back from the browser UI into the page returns straight to the dialog, because the background remains skipped.
- `Esc` closes the dialog. On a `<dialog>`, that key fires [`cancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event). A back gesture on many phones fires the same event.

Users can open a new tab or copy the URL with the dialog still open.

`Ctrl + L` on Windows and `Command + L` on macOS also focus the address bar, and so does `F6`. See [How to browse websites using a keyboard only](/knowledge/keyboard-only/browsing-websites/). Some users only know `Tab`, so `Tab` must reach the browser UI on its own.

The W3C Accessible Platform Architectures Working Group kept this behaviour for the native `<dialog>`. See the [APA comment on WHATWG HTML issue 8339](https://github.com/whatwg/html/issues/8339#issuecomment-1822591131).

## The outdated strict loop

Older scripts wrapped focus by hand:

- On the last control, the script cancelled `Tab` and focused the first control.
- On the first control, the script cancelled `Shift + Tab` and focused the last control.

```javascript
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
})
```

`preventDefault()` stops the browser. `Tab` never reaches the address bar.

The wrap was a workaround from before `inert` and `<dialog>`. It kept focus off the page behind the dialog, and it blocked the browser UI.

WCAG guidelines apply only to the web page itself, not the browser UI. WCAG does not require the wrap. The example in [Understanding 2.1.2: No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) is informative only. The [APG modal dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) still wraps `Tab`, because it shows a custom ARIA dialog from before [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert). Leave that wrap off a native modal.

### Packages that still wrap `Tab`

Many packages still use this loop. Press `Tab` on the last control. If focus jumps straight back to the first control, the package is wrapping `Tab`.

- [`focus-trap`](https://github.com/focus-trap/focus-trap) cycles inside the trap.
- [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) traps focus when `modal` is `true` (the default).
- [Material UI Modal](https://mui.com/material-ui/react-modal/#focus-trap) pulls focus back into the modal.

Use a native `<dialog>` with `showModal()` when the package can render one.

## How to do it

Let the browser move focus. After the controls in the document, `Tab` continues to the browser UI. See [Sequential focus navigation](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation).

For a modal:

1. Open it with [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal), or with the command `show-modal`.
2. The browser marks the rest of the page [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) (making background content non-interactive).
3. Do not handle `Tab` in script.

`showModal()` places focus for you. It focuses the first focusable element in the dialog. Set `autofocus` on another control to override that. Set `autofocus` on the `<dialog>` to focus the dialog itself. On close, focus returns to the control that was focused before. See the [dialog focusing steps](https://html.spec.whatwg.org/multipage/interactive-elements.html#dialog-focusing-steps).

A custom dialog still needs its own focus script. See [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement/#focus-management). Set `inert` on the rest of the page, and still leave `Tab` alone.

`Esc` and a mobile back gesture fire [`cancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event), then the dialog closes and fires [`close`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event). Call `preventDefault()` on `cancel` to keep the dialog open (for example, to ask the user to confirm unsaved changes first). `dialog.close()` fires `close` only.

A close button at the bottom of a long dialog is still useful.

## Examples

Proper trap. `Tab` skips the rest of the page and can still reach the browser UI:

- [Modal dialog](/examples/widgets/dialog/#modal-dialog) in this guide
- [MDN: `showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
- [MDN: the dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [There is No Need to Trap Focus on a Dialog Element (CSS-Tricks)](https://css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element/)

Strict loop. These cancel `Tab` at the edges of the dialog:

- [Custom modal dialog (legacy)](/examples/widgets/dialog/#custom-modal-dialog-legacy) in this guide
- [APG: Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## You could also be interested in

- [Dialog widget](/examples/widgets/dialog/)
- [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement/)
- [How to browse websites using a keyboard only](/knowledge/keyboard-only/browsing-websites/)
