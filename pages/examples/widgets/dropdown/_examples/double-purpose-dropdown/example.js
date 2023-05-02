class AdgDropdown {
  constructor(element) {
    this.element = element
    this.buttons = this.element.querySelectorAll('[aria-expanded]')

    this.init()
  }

  init() {
    this.buttons.forEach(button => {
      const containerId = button.getAttribute('aria-controls')
      const container = document.querySelector(`#${containerId}`)

      this.hide(button, container)

      button.addEventListener('click', event => {
        const button = event.target

        if (!container.hidden) {
          this.hide(button, container)
        } else {
          this.show(button, container)
        }
      })
    })
  }

  show(button, container) {
    container.hidden = false
    button.setAttribute('aria-expanded', true)
  }

  hide(button, container) {
    container.hidden = true
    button.setAttribute('aria-expanded', false)
  }
}

// Init dropdowns and keep track of them
const dropdowns = []

document.querySelectorAll('[data-adg-dropdown]').forEach(element => {
  dropdowns.push(new AdgDropdown(element))
})
