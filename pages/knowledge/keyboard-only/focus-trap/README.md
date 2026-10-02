---
navigation_title: "Focus traps"
position: 5
---

# Focus traps and the browser UI

**A proper focus trap keeps keyboard focus off the rest of the page. Users must still be able to reach the browser UI.**

[[_TOC_]]

## What the trap is for

A modal dialog sits on top of the page. The content behind it is unavailable.

Keyboard users move with `Tab`. Without a trap, `Tab` lands on links and buttons behind the dialog. Those controls are dimmed or covered. Focusing them is confusing. Activating them can change the page under the dialog.

The trap limits the page's tab order to the dialog. The rest of the page stays out of reach until the dialog closes.

## The browser UI stays reachable

The address bar, tabs, bookmarks, and menus belong to the browser. They are not part of the page.

A mouse user can click the address bar while a modal is open. A keyboard user needs the same access.

With a proper trap:

- `Tab` moves through the focusable controls inside the dialog.
- After the last control, the next `Tab` moves focus to the browser UI. The address bar is a typical first stop.
- `Shift + Tab` on the first control also moves focus to the browser UI.
- Tabbing back into the page returns focus to the dialog. The background page stays skipped.
- `Esc`, and a visible close control, still close the dialog.

Users can open a new tab, copy the URL, or change a browser setting with the dialog still open.

`Ctrl + L` and `F6` also move focus to the address bar. See [How to browse websites using a keyboard only](/knowledge/keyboard-only/browsing-websites/). Those shortcuts are extra paths. `Tab` still needs to reach the browser UI on its own. Some users only know `Tab`.

The W3C Accessible Platform Architectures Working Group reviewed the native `<dialog>` element and kept this behaviour. Tabbing from the dialog to the browser UI is the intended behaviour. See the [APA comment on WHATWG HTML issue 8339](https://github.com/whatwg/html/issues/8339#issuecomment-1822591131).

## The outdated strict loop

Older custom dialogs wrapped focus in script:

- On the last control, the script cancelled `Tab` and moved focus to the first control.
- On the first control, the script cancelled `Shift + Tab` and moved focus to the last control.

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

`preventDefault()` stops the browser from moving focus onwards. The loop never releases `Tab` to the address bar or the browser tabs.

Authors used this wrap as a workaround. Before `inert` and `<dialog>`, it was the practical way to stop focus falling onto the page behind a custom dialog. The same wrap also blocked the browser UI. Blocking the browser UI is not the goal of a focus trap.

WCAG does not require the wrap. [Understanding Success Criterion 2.1.2: No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) shows a scripted dialog. In that example, `Tab` jumps from the last control to the first. The text is informative. It describes one way to avoid a keyboard trap inside a custom dialog. Locking users out of the browser is a separate, unwanted effect.

The [APG modal dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/) still wraps `Tab`. The APG demonstrates ARIA for custom widgets. The example predates broad support for `<dialog>` and [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert). Copying that wrap onto a native modal blocks the browser UI.

## How to do it

Let the browser run sequential focus navigation. The tab order is the focusable controls in the document, then the browser's own controls. See [Sequential focus navigation](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation) in the HTML specification.

For a modal:

1. Open it with [`HTMLDialogElement.showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal), or with the invoker command `show-modal`.
2. The browser marks the rest of the same document as [`inert`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert). Background controls drop out of the tab order.
3. Leave `Tab` alone. A script must not call `preventDefault()` on `Tab`, and must not move focus from the last control back to the first.

Move focus into the dialog when it opens. Return focus to the trigger when it closes. See [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement/#focus-management).

Without `<dialog>`, set `inert` on the rest of the page while the dialog is open. Still leave `Tab` to the browser.

A close button at the bottom of a long dialog remains useful. The browser UI stays in the tab order either way.

## Examples

Proper trap. `Tab` skips the rest of the page and can still reach the browser UI:

- [Modal dialog](/examples/widgets/dialog/#modal-dialog) in this guide. A native `<dialog>` opens with `show-modal`. No script wraps `Tab`.
- [MDN: `showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal)
- [MDN: the dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [There is No Need to Trap Focus on a Dialog Element (CSS-Tricks)](https://css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element/)

Outdated strict loop. These cancel `Tab` at the edges of the dialog:

- [Custom modal dialog (legacy)](/examples/widgets/dialog/#custom-modal-dialog-legacy) in this guide.
- [APG: Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) in the APG. The keyboard section still describes the wrap.

## You could also be interested in

- [Dialog widget](/examples/widgets/dialog/)
- [How to implement websites that are ready for keyboard only usage](/knowledge/keyboard-only/how-to-implement/)
- [How to browse websites using a keyboard only](/knowledge/keyboard-only/browsing-websites/)
