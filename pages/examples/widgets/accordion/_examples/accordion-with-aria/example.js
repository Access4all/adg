class AdgAccordion {
  constructor (el) {
    this.element = el
    this.triggers = this.element.querySelectorAll('[aria-controls]')
    this.initTriggers()
  }

  initTriggers () {
    this.triggers.forEach((trigger, triggerIndex, triggerArray) => {
      const panelId = trigger.getAttribute('aria-controls')
      const panel = document.getElementById(panelId)

      this.hide(panel, trigger)

      trigger.addEventListener('click', () => {
        if (panel.hidden) {
          this.show(panel, trigger)
        } else {
          this.hide(panel, trigger)
        }
      })

      trigger.addEventListener('keydown', event => {
        if (trigger === document.activeElement) {
          let focusTarget
          switch (event.keyCode) {
            case 38:
              focusTarget =
                triggerIndex > 0 ? triggerIndex - 1 : triggerArray.length - 1
              break
            case 40:
              focusTarget =
                triggerIndex < triggerArray.length - 1 ? triggerIndex + 1 : 0
              break
          }
          if (triggerArray[focusTarget]) {
            triggerArray[focusTarget].focus()
          }
        }
      })
    })
  }

  show (panel, trigger) {
    panel.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
  }

  hide (panel, trigger) {
    panel.hidden = true
    trigger.setAttribute('aria-expanded', 'false')
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-accordion]')
  .forEach(element => accordions.push(new AdgAccordion(element)))
