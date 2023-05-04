class AdgCheckboxAccordion {
  constructor(el) {
    this.element = el
    this.triggers = this.element.querySelectorAll('.trigger')
    this.initTriggers()
  }

  initTriggers() {
    this.triggers.forEach(trigger => {
      const panelId = `${trigger.id}_panel`
      const panel = document.getElementById(panelId)
      this.updatePanelVisibility(panel, trigger)

      trigger.addEventListener('keydown', event => {
        if (event.keyCode === 13 || event.key === 'Enter') {
          event.preventDefault()
          trigger.checked = !trigger.checked
          this.updatePanelVisibility(panel, trigger)
        }
      })

      trigger.addEventListener('change', () => {
        this.updatePanelVisibility(panel, trigger)
      })
    })
  }

  updatePanelVisibility(panel, trigger) {
    panel.style.display = trigger.checked === true ? 'block' : 'none'
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-checkbox-accordion]')
  .forEach(element => accordions.push(new AdgCheckboxAccordion(element)))
