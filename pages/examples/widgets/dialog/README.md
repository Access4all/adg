---
navigation_title: "Dialog"
position: 12
---

# Dialog widget (modal, popup, lightbox, overlay)

**Dialogs display contextual content above the page. Use them for confirmations, short tasks, or additional details.**

[[_TOC_]]

![Dialog](_media/dialog.png)

## General requirements

The following requirements are based on established best practices and the WAI-ARIA Authoring Practices [Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

To fulfil WCAG 2.2 standards, accessible dialogs must meet these criteria:

- **Predictable Focus:** Focus moves into the dialog when it opens and returns to the triggering element when it closes (SC 2.4.3).
- **Keyboard Control:** The dialog is fully operable via keyboard, including `Tab` navigation and a clear mechanism to close it (e.g. `Esc`) (SC 2.1.1).
- **Focus Trapping:** Modal dialogs keep focus within the dialog while open.
- **Semantics:** The dialog has a clear accessible name (e.g. via `aria-labelledby`) and uses either the native `<dialog>` element or `role="dialog"`.

### Native or Custom solution

<table>
  <caption class="visuallyhidden">Dialog implementation decision matrix</caption>
  <thead>
    <tr>
      <th scope="col">Aspect</th>
      <th scope="col">Native <code>&lt;dialog&gt;</code></th>
      <th scope="col">Custom dialog (ARIA)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Effort</th>
      <td>Low</td>
      <td>High</td>
    </tr>
    <tr>
      <th scope="row">Activation</th>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API">Invoker Commands</a> (<code>command</code> / <code>commandfor</code>) with optional polyfill</td>
      <td>Custom JavaScript</td>
    </tr>
    <tr>
      <th scope="row">Focus handling</th>
      <td>Mostly handled by browser</td>
      <td>Must be implemented manually</td>
    </tr>
    <tr>
      <th scope="row">Top layer</th>
      <td>Automatic</td>
      <td>Manual (<code>z-index</code> management required)</td>
    </tr>
    <tr>
      <th scope="row">Background interaction</th>
      <td>Automatically blocked via <code>showModal()</code></td>
      <td>Requires <code>inert</code> or equivalent</td>
    </tr>
  </tbody>
</table>

### Choosing the right native variant

<table class="variants-matrix">
  <caption>Comparison of native <code>&lt;dialog&gt;</code> implementation methods</caption>
  <thead>
    <tr>
      <th scope="col">Feature / Behavior</th>
      <th scope="col">Native Modal (<code>showModal()</code>)</th>
      <th scope="col">Non-Modal (<code>show()</code>)</th>
      <th scope="col">Dialog + Popover API</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Top Layer Promotion</th>
      <td><strong>Yes</strong> (Guaranteed on top of everything)</td>
      <td>No (Stays in normal document flow)</td>
      <td><strong>Yes</strong> (Promoted to top layer)</td>
    </tr>
    <tr>
      <th scope="row">Page Interaction</th>
      <td><strong>Blocks background</strong> (Rest of page is <code>inert</code>)</td>
      <td>Interactive (Background remains fully usable)</td>
      <td>Interactive (Background remains fully usable)</td>
    </tr>
    <tr>
      <th scope="row">Focus Management</th>
      <td><strong>Automatic Focus Trap</strong> (Tab stays inside)</td>
      <td>No Trap (Natural page tab order)</td>
      <td>No Trap (Follows sequential popover order)</td>
    </tr>
    <tr>
      <th scope="row">Light Dismiss</th>
      <td>No (Only via <code>Esc</code> or explicit close)</td>
      <td>No (Requires explicit close)</td>
      <td><strong>Yes</strong> (Closes on backdrop click or <code>Esc</code> via <code>popover="auto"</code>)</td>
    </tr>
    <tr>
      <th scope="row">Declarative Open (Invokers)</th>
      <td><strong>Supported</strong> (<code>command="show-modal"</code>)</td>
      <td>No (Requires JavaScript <code>.show()</code>)</td>
      <td><strong>Supported</strong> (<code>command="toggle-popover"</code>)</td>
    </tr>
  </tbody>
</table>


Before you continue, please read [What is a "Proof of concept"?](/examples/widgets/proof-of-concept).


## Proofs of concept

### Modal dialog

This variant uses the native HTML `<dialog>` element and should be the default choice for modern projects.
Use this variant when you need modal behaviour with low implementation effort and reliable built-in browser handling.

[Example](_examples/modal-dialog)

#### Implementation details

- **Activation:** Use Invoker Commands (`command="show-modal"` and `command="close"` with `commandfor`) to open and close the dialog. The example page loads [`invoker.min.js`](https://www.npmjs.com/package/invokers-polyfill) from a CDN where Invoker Commands are not supported yet.
- **Backdrop:** Style using the `::backdrop` pseudo-element.
- **Keyboard behaviour:** Browsers generally keep focus within the dialog and support closing via `Esc`, consistent with platform conventions.
- **Focus return:** Browsers typically restore focus to the previously focused element when the dialog closes.
- **Initial focus:** Use `autofocus` on a meaningful control inside the dialog (for example the close button), or follow the guidance in [Initial focus positioning](#initial-focus-positioning) below.
- **State:** Do not rely on the `open` attribute alone for modal behaviour.


### Non-modal dialog

This variant uses the native `<dialog>` element opened with [`HTMLDialogElement.show()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show). The page stays interactive: no top-layer inertness, no `::backdrop`, and no focus trap.

Use this when you need a floating panel that behaves like a classic non-modal dialog and you are fine calling `show()` / `close()` from script (Invoker Commands only define `show-modal` and `close`, not `show`).

[Example](_examples/non-modal-dialog)

#### Implementation details

- **Activation:** Call `.show()` to open and `.close()` to dismiss, or use Invoker Commands for close only (`command="close"` with `commandfor`) plus a small script for the opener. The example page loads [`invoker.min.js`](https://www.npmjs.com/package/invokers-polyfill) from a CDN for close controls where Invoker Commands are not supported yet.
- **State indication:** Set `aria-expanded` on the trigger when you toggle open/closed from script.
- **Focus handling:** Move focus to a meaningful element when opened (for example via `autofocus`). Note that while the strict WAI-ARIA APG pattern suggests containing the tab sequence inside non-modal dialogs (with explicit means to exit), a `<dialog>` opened with `.show()` typically allows users to tab out naturally into the document order.
- **Keyboard:** `Esc` does not close a non-modal dialog by default; provide an explicit close control or handle `cancel` if you need it.
- **DOM position:** Place markup close to the trigger to preserve logical tab order.


### Dialog with Popover API

This variant also keeps the page interactive, but it is **not** the same as `.show()`: you add the `popover` attribute to `<dialog>` (or another element) and use the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). Declarative open/close is available via Invoker Commands (`command="toggle-popover"` / `command="hide-popover"` with `commandfor`) or `popovertarget` / `popovertargetaction`.

Use this when you want top-layer promotion, optional light dismiss, and invoker-driven toggling without writing open/close logic yourself.

[Example](_examples/dialog-popover)

#### Implementation details

- **Activation:** Set `popover` on the `<dialog>` (for example `popover="auto"` for light dismiss, or `popover="manual"` to require an explicit close control).
- **Invoker Commands:** `toggle-popover`, `show-popover`, and `hide-popover` map to the Popover API; the example page loads [`invoker.min.js`](https://www.npmjs.com/package/invokers-polyfill) from a CDN where needed.
- **Light dismiss:** With `popover="auto"`, clicking outside or pressing `Esc` closes the popover by default.
- **Focus handling:** Popover semantics differ from `.show()`; invoker buttons may receive implicit `aria-expanded` / `aria-details`. Tab order follows popover and browser conventions rather than the non-modal dialog APG focus loop.
- **Semantics:** The element remains a `<dialog>` in the DOM, but runtime behaviour follows the Popover API once `popover` is set.


### Custom modal dialog (Legacy)

This variant recreates modal dialog behaviour with ARIA semantics and custom JavaScript logic.
Use this only when native `<dialog>` cannot be used. Prefer the [modal dialog](#modal-dialog) example for new projects.

[Example](_examples/custom-modal-dialog) *(Legacy — for reference only)*

#### Implementation details

- **Role and name:** Use `role="dialog"` and `aria-labelledby`.
- **Focus trap:** Implement manual focus management for `Tab` and `Shift + Tab`.
- **Keyboard interaction:** Provide an explicit `Esc` handler.
- **Inertness:** Mark background content as `inert` (or equivalent) while open.


### Alert dialogs

For brief, important messages that require a response (for example confirming deletion), use the WAI-ARIA [Alert Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) with `role="alertdialog"`.

- Set `aria-describedby` on the element that contains the alert message.
- For destructive or hard-to-reverse actions, set initial focus on the least destructive control (for example **Cancel** rather than **Delete**). See [Initial focus positioning](#initial-focus-positioning) below.

The Terms and conditions examples on this page are informational modals, not alert dialogs.


## Best practices & edge cases

### Headings in dialogs

- **Modal dialogs:** May act as self-contained contexts; `<h2>` is usually a safe default.
- **Non-modal dialogs and dialog popovers:** Should follow the existing page hierarchy.

### Positioning in the DOM

- **Native `<dialog>`:** Placement is flexible, but proximity to the trigger improves maintainability.
- **Custom dialogs:** Often placed at the end of `<body>` to avoid layout issues.

### Initial focus positioning

By default, focus the first focusable element in the dialog. Consider these exceptions:

- **Destructive actions:** For confirmation dialogs (e.g. deletion), focus `Cancel` rather than `Delete` to reduce accidental data loss. See [Alert dialogs](#alert-dialogs).
- **Long content:** Focus the dialog title (`tabindex="-1"`) so screen readers start reading from the top of the content.

### Backdrop interaction

Users often expect a modal to close when they click the backdrop. This is a common UX preference, not a requirement of the [Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

- **Implementation:** With native modal `<dialog>`, listen for clicks on the dialog element and call `.close()` only when the click lies outside the dialog panel. The backdrop is part of the dialog’s box model; comparing click coordinates to `getBoundingClientRect()` avoids closing the dialog when the user clicks inside the content.

```js
const dialog = document.querySelector('dialog')

dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect()
  const isInDialog =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom

  // Click was outside the dialog panel (on the backdrop)
  if (!isInDialog) {
    dialog.close()
  }
})
```

### Preventing background scrolling

When a modal is open, background page content should not be scrollable.

- **Native:** `.showModal()` makes the background inert, but to reliably prevent scroll chaining, add a CSS rule like `body:has(dialog[open]:modal) { overflow: hidden; }`.
- **Custom:** Use `inert` on background content and a visual backdrop; avoid relying on `overflow: hidden` alone when `inert` is available.
