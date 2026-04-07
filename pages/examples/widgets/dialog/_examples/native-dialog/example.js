class AdgNativeDialog {
  constructor(opener) {
    this.opener = opener
    this.dialog = document.getElementById(opener.dataset.adgNativeDialog)

    if (!this.dialog) return

    this.closeBtn = this.dialog.querySelector('[data-adg-dialog-close]')
    this.confirmBtn = this.dialog.querySelector('[data-adg-dialog-confirm]')

    this.init()
  }

  init() {
    this.bindEvents()
  }

  show() {
    if (!this.dialog.open) {
      this.dialog.showModal()
    }
    if (this.closeBtn) this.closeBtn.focus()
  }

  hide() {
    if (this.dialog.open) {
      this.dialog.close()
    }
    this.opener.focus()
  }

  handleBackdropClick(e) {
    // Treat clicks outside the dialog box as backdrop clicks.
    const rect = this.dialog.getBoundingClientRect()
    const clickedInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom

    if (!clickedInside) {
      this.hide()
    }
  }

  bindEvents() {
    this.opener.addEventListener('click', () => {
      this.dialog.open ? this.hide() : this.show()
    })

    if (this.closeBtn)
      this.closeBtn.addEventListener('click', () => this.hide())
    if (this.confirmBtn)
      this.confirmBtn.addEventListener('click', () => this.hide())

    this.dialog.addEventListener('cancel', e => {
      e.preventDefault()
      this.hide()
    })

    this.dialog.addEventListener('click', e => this.handleBackdropClick(e))
  }
}

// Enhance all native dialog triggers on the page.
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-adg-native-dialog]')
    .forEach(opener => new AdgNativeDialog(opener))
})
