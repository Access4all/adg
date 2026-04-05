---
navigation_title: "Dialog"
position: 12
---

# Dialog widget (or: modal, popup, lightbox, overlay, alert)

**Dialogs show contextual content above the page. Use them for confirmations, short tasks, or additional details.**

[[_TOC_]]

![Dialog](_media/dialog.png)

## 1. Decision matrix: native vs custom

Before you start, choose the right technical approach.
**Recommendation:** For new projects, use the native `<dialog>` element.

| Aspect | Native `<dialog>` | Custom dialog (ARIA) |
| --- | --- | --- |
| Conformance | Usually closer to WCAG/APG by default. | Must be built manually and tested intensively. |
| Effect | `showModal()` uses the top layer. | Requires manual focus traps and overlays. |
| Background handling | Makes the rest of the page inert automatically. | Background blocking must be implemented manually in JavaScript. |
| When to use | Default for new features. | Only for strict legacy constraints or explicit custom behavior needs. |

## 2. Core specification (the blueprint)

These rules apply to every dialog. Use them as both implementation guidance and QA acceptance criteria.

### A. Semantics and initial state

- **Trigger button:** Use `aria-haspopup="dialog"` and `aria-expanded` for state feedback.
- **Naming:** Every dialog needs an accessible name via `aria-labelledby` (linked to a heading inside the dialog).
- **Description:** Use `aria-describedby` only for short helper text, not for the entire content.
- **API:** Use `showModal()` for modal dialogs and `show()` for non-modal dialogs.
- **State handling:** Do not use the `open` attribute as your primary JavaScript API.

### B. Focus management (crucial)

- **Open:** Move focus into the dialog to a meaningful element (for example: close button or first form field).
- **Safety:** Never default focus to a destructive action.
- **Containment:** In modal dialogs, `Tab` focus must not leave the dialog.
- **Close:** Return focus to the opener.
- **Do not:** Put focus on the dialog container itself.

### C. Interaction and close behavior

| Behavior | Modal (`showModal`) | Non-modal (`show`) |
| --- | --- | --- |
| Visible close button | Required | Required |
| `Esc` key | Required (native behavior for `<dialog>`) | Recommended |
| Backdrop click | Optional (must be consistent and communicated) | Optional |
| Background interaction | Blocked (inert) | Allowed |

For modal dialogs, align keyboard interaction with APG expectations (`Tab`, `Shift+Tab`, `Escape`): [Modal Dialog Example (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/).

## 3. Proofs of concept

Before you go on, please read [What is a "Proof of concept"?](/examples/widgets/proof-of-concept).

All three examples intentionally show the same dialog content and a very similar visual design. This makes comparison straightforward.

### Native modal

Best-practice implementation using `<dialog>` and `::backdrop` styling.

[Example](_examples/native-dialog)

### Custom non-modal

Useful for persistent overlays where background interaction remains available.

[Example](_examples/non-modal-dialog)

### Custom modal

Reference pattern for legacy systems, including a manual focus trap.

[Example](_examples/modal-dialog)

## 4. WCAG 2.2 compliance mapping

Ensure your dialog implementation meets these criteria:

- `2.1.1 Keyboard (A)`: all actions are keyboard operable.
- `2.1.2 No Keyboard Trap (A)`: users can always exit or close the dialog.
- `2.4.3 Focus Order (A)`: focus flow is logical (in -> within -> back out).
- `2.5.8 Target Size (AA)`: interactive targets should be at least 24x24 CSS pixels.
- `4.1.2 Name, Role, Value (A)`: semantics and state are correctly exposed to assistive technologies.

## References

- APG pattern: [Dialog (Modal) Pattern](https://www.w3.org/TR/wai-aria-practices/#dialog_modal)
- APG example: [Modal Dialog Example (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
