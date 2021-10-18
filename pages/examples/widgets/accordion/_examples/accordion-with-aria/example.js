class AdgAccordion {
  constructor (el) {
    this.element = el
    this.toggles = this.element.querySelectorAll('[aria-controls]')
    this.initToggles()
  }

  initToggles () {
    this.toggles.forEach((toggle, toggleIndex, toggleArray) => {
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

      toggle.addEventListener('keydown', event => {
        if (toggle === document.activeElement) {
          let focusTarget
          switch (event.keyCode) {
            case 38:
              focusTarget = toggleIndex > 0 ? toggleIndex - 1 : toggleArray.length - 1
              break
            case 40:
              focusTarget = toggleIndex < toggleArray.length - 1 ? toggleIndex + 1 : 0
              break
          }
          if (toggleArray[focusTarget]) {
            toggleArray[focusTarget].focus()
          }
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
