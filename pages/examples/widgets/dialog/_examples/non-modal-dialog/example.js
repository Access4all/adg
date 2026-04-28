class AdgNonModalDialog {
  constructor(opener) {
    this.opener = opener
    this.container = document.getElementById(opener.dataset.adgDialog)

    if (!this.container) return

    this.init()
  }

  init() {
    this.cacheControls()
    this.bindEvents()
  }

  cacheControls() {
    this.closeBtn = this.container.querySelector('[data-adg-dialog-close]')
    this.confirmBtn = this.container.querySelector('[data-adg-dialog-confirm]')
  }

  show() {
    this.container.removeAttribute('hidden')
    this.opener.setAttribute('aria-expanded', 'true')
    this.closeBtn.focus()
  }

  hide() {
    this.container.setAttribute('hidden', '')
    this.opener.setAttribute('aria-expanded', 'false')
    this.opener.focus()
  }

  bindEvents() {
    if (!this.closeBtn || !this.confirmBtn) return

    // Toggle the non-modal dialog without trapping focus.
    this.opener.addEventListener('click', () => {
      this.container.hasAttribute('hidden') ? this.show() : this.hide()
    })

    // Keep both dialog actions aligned with the same close behavior.
    this.closeBtn.addEventListener('click', () => this.hide())
    this.confirmBtn.addEventListener('click', () => this.hide())

    // Support Esc as a standard way to dismiss the dialog.
    this.container.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.preventDefault()
        this.hide()
      }
    })
  }
}

// Enhance all non-modal dialog triggers on the page.
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-adg-dialog]')
    .forEach(opener => new AdgNonModalDialog(opener))
})
