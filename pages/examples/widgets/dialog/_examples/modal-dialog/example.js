class AdgDialog {
  constructor(opener) {
    this.opener = opener
    this.container = document.getElementById(opener.dataset.adgDialog)
    if (!this.container) return

    this.curtain = null
    this.originalOverflow = ''
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

  toggleInert(isActive) {
    // Make background content unavailable while the modal is open.
    Array.from(document.body.children).forEach(node => {
      if (node === this.container || node === this.curtain) return
      isActive ? node.setAttribute('inert', '') : node.removeAttribute('inert')
    })
  }

  show() {
    if (!this.curtain) {
      // The curtain provides a visual backdrop behind the custom modal.
      this.curtain = document.createElement('div')
      this.curtain.className = 'adg-dialog-curtain'
      this.container.before(this.curtain)
    }
    this.toggleInert(true)

    this.originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    this.container.removeAttribute('hidden')
    this.opener.setAttribute('aria-expanded', 'true')
    this.closeBtn.focus()
  }

  hide() {
    if (this.curtain) {
      this.curtain.remove()
      this.curtain = null
    }
    this.container.setAttribute('hidden', '')
    this.opener.setAttribute('aria-expanded', 'false')
    this.toggleInert(false)

    document.body.style.overflow = this.originalOverflow
    this.opener.focus()
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      this.hide()
      return
    }

    if (e.key === 'Tab') {
      // Keep focus cycling inside the modal while it is active.
      const focusables = Array.from(
        this.container.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  bindEvents() {
    if (!this.closeBtn || !this.confirmBtn) return

    this.opener.addEventListener('click', () => {
      this.container.hasAttribute('hidden') ? this.show() : this.hide()
    })

    this.closeBtn.addEventListener('click', () => this.hide())
    this.confirmBtn.addEventListener('click', () => this.hide())
    this.container.addEventListener('keydown', e => this.handleKeydown(e))
  }
}

// Enhance all custom dialog triggers on the page.
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-adg-dialog]')
    .forEach(opener => new AdgDialog(opener))
})
