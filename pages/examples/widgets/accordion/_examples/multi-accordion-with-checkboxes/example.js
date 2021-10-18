class AdgCheckboxAccordion {
  constructor (el) {
    this.element = el
    this.triggers = this.element.querySelectorAll('.trigger')
    this.initTriggers()
  }

  initTriggers () {
    this.triggers.forEach(trigger => {
      const triggerCheckbox = trigger.querySelector('input[type="checkbox"]')
      const panelId = `${triggerCheckbox.id}_panel`
      const panel = document.getElementById(panelId)
      this.updatePanelVisibility(panel, triggerCheckbox)

      triggerCheckbox.addEventListener('keydown', event => {
        if (event.keyCode === 13 || event.key === 'Enter') {
          event.preventDefault()
          triggerCheckbox.checked = !triggerCheckbox.checked
          this.updatePanelVisibility(panel, triggerCheckbox)
        }
      })

      triggerCheckbox.addEventListener('change', () => {
        this.updatePanelVisibility(panel, triggerCheckbox)
      })
    })
  }

  updatePanelVisibility (panel, triggerCheckbox) {
    panel.style.display = triggerCheckbox.checked === true ? 'block' : 'none'
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-checkbox-accordion]')
  .forEach(element => accordions.push(new AdgCheckboxAccordion(element)))
