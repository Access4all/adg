;(function () {
  function ensureHintText(button) {
    if (button.querySelector('.adg-visually-hidden')) return
    const hint = document.createElement('span')
    hint.className = 'adg-visually-hidden'
    hint.textContent = ' (dialog)'
    button.append(hint)
  }

  function ensureDialogSemantics(container) {
    const heading = container.querySelector('h2')
    const description = container.querySelector('p')
    if (!heading || !description) return

    if (!heading.id) heading.id = `${container.id}-title`
    if (!description.id) description.id = `${container.id}-description`

    container.setAttribute('role', 'dialog')
    container.setAttribute('aria-labelledby', heading.id)
    container.setAttribute('aria-describedby', description.id)
    container.setAttribute('data-adg-dialog-container', 'true')
  }

  function buildCloseButton() {
    const button = document.createElement('button')
    button.className = 'adg-dialog-icon'
    button.innerHTML =
      '<svg class="icon" focusable="false"><use xlink:href="#tooltip"></use></svg><span class="adg-visually-hidden">Close dialog</span>'
    return button
  }

  function buildConfirmButton() {
    const wrapper = document.createElement('p')
    wrapper.innerHTML =
      '<button>Confirm<span class="adg-visually-hidden"> (close)</span></button>'
    return wrapper.firstElementChild
  }

  function initDialog(opener) {
    const containerId = opener.getAttribute('data-adg-dialog')
    const container = document.getElementById(containerId)
    if (!container) return

    ensureDialogSemantics(container)

    const closeButton = buildCloseButton()
    const confirmButton = buildConfirmButton()
    container.prepend(closeButton)
    container.append(confirmButton)

    opener.setAttribute('aria-expanded', 'false')
    opener.setAttribute('aria-haspopup', 'dialog')
    ensureHintText(opener)

    const show = () => {
      container.removeAttribute('hidden')
      opener.setAttribute('aria-expanded', 'true')
      closeButton.focus()
    }

    const hide = () => {
      container.setAttribute('hidden', '')
      opener.setAttribute('aria-expanded', 'false')
      opener.focus()
    }

    opener.addEventListener('click', () => {
      if (container.hasAttribute('hidden')) show()
      else hide()
    })
    closeButton.addEventListener('click', hide)
    confirmButton.addEventListener('click', hide)
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-adg-dialog]').forEach(initDialog)
  })
})()
