;(function () {
  function ensureHintText(button) {
    if (button.querySelector('.adg-visually-hidden')) return
    const hint = document.createElement('span')
    hint.className = 'adg-visually-hidden'
    hint.textContent = ' (dialog)'
    button.append(hint)
  }

  function initDialog(opener) {
    const dialogId = opener.getAttribute('data-adg-native-dialog')
    const dialog = document.getElementById(dialogId)
    if (!dialog) return

    const closeButton = dialog.querySelector('[data-adg-dialog-close]')
    const confirmButton = dialog.querySelector('[data-adg-dialog-confirm]')
    if (!closeButton || !confirmButton) return

    opener.setAttribute('aria-expanded', 'false')
    opener.setAttribute('aria-haspopup', 'dialog')
    ensureHintText(opener)

    const show = () => {
      if (!dialog.open) dialog.showModal()
      opener.setAttribute('aria-expanded', 'true')
      closeButton.focus()
    }

    const hide = () => {
      if (dialog.open) dialog.close()
      opener.setAttribute('aria-expanded', 'false')
      opener.focus()
    }

    opener.addEventListener('click', () => {
      if (dialog.open) hide()
      else show()
    })
    closeButton.addEventListener('click', hide)
    confirmButton.addEventListener('click', hide)

    dialog.addEventListener('cancel', e => {
      e.preventDefault()
      hide()
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-adg-native-dialog]').forEach(initDialog)
  })
})()
