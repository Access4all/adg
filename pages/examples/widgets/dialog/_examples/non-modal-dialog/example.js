document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('my-dialog')
  const opener = document.getElementById('my-dialog-opener')

  if (!dialog || !opener) return

  const syncAriaExpanded = () => {
    opener.setAttribute('aria-expanded', dialog.open ? 'true' : 'false')
  }

  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialog.open) {
      event.preventDefault()
      dialog.close()

      opener.focus()
    }
  })

  opener.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close()
    } else {
      dialog.show()
    }
    syncAriaExpanded()
  })

  dialog.addEventListener('close', syncAriaExpanded)
  syncAriaExpanded()
})
