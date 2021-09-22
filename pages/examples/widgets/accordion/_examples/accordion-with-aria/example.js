class AdgAccordion {
  constructor (el) {
    this.element = el
    this.toggles = this.element.querySelectorAll('[aria-controls]')
    this.initToggles()
  }

  initToggles () {
    this.toggles.forEach(toggle => {
      const containerId = toggle.getAttribute('aria-controls')
      const container = document.querySelector(`#${containerId}`)

      this.hide(container, toggle)

      toggle.addEventListener('click', () => {
        if (container.hidden) {
          this.show(container, toggle)
        } else {
          this.hide(container, toggle)
        }
      })
    })
  }

  show (container, toggle) {
    container.hidden = false
    toggle.setAttribute('aria-expanded', 'true')
  }

  hide (container, toggle) {
    container.hidden = true
    toggle.setAttribute('aria-expanded', 'false')
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-accordion]')
  .forEach(element => accordions.push(new AdgAccordion(element)))
