class AdgDialog {
  constructor(opener) {
    this.opener = opener
    this.container = document.getElementById(opener.dataset.adgDialog)
    this.curtain = document.getElementById('my-dialog-curtain')

    if (!this.container || !this.curtain) return

    this.closeBtn = this.container.querySelector('[data-adg-dialog-close]')
    this.confirmBtn = this.container.querySelector('[data-adg-dialog-confirm]')

    this.bindEvents()
  }

  getFocusables() {
    return Array.from(
      this.container.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    )
  }

  toggleInert(isActive) {
    Array.from(document.body.children).forEach(node => {
      if (node === this.container || node === this.curtain) return
      isActive ? node.setAttribute('inert', '') : node.removeAttribute('inert')
    })
  }

  show() {
    this.toggleInert(true)
    this.curtain.removeAttribute('hidden')
    this.container.removeAttribute('hidden')
    if (this.closeBtn) this.closeBtn.focus()
  }

  hide() {
    this.container.setAttribute('hidden', '')
    this.curtain.setAttribute('hidden', '')
    this.toggleInert(false)
    this.opener.focus()
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      this.hide()
      return
    }

    if (e.key !== 'Tab') return

    const focusables = this.getFocusables()
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

  bindEvents() {
    this.opener.addEventListener('click', () => {
      this.container.hasAttribute('hidden') ? this.show() : this.hide()
    })

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide())
    }
    if (this.confirmBtn) {
      this.confirmBtn.addEventListener('click', () => this.hide())
    }

    this.container.addEventListener('keydown', e => this.handleKeydown(e))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-adg-dialog]')
    .forEach(opener => new AdgDialog(opener))
})
