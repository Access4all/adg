class AdgRadioAccordion {
  constructor(el) {
    this.element = el
    this.triggers = this.element.querySelectorAll('.trigger')
    this.initTriggers()
  }

  initTriggers() {
    this.triggers.forEach(trigger => {
      const panelId = `${trigger.id}_panel`
      const panel = document.getElementById(panelId)
      panel.style.display = trigger.checked ? 'block' : 'none'

      trigger.addEventListener('change', () => {
        this.element.querySelectorAll('.panel').forEach(p => {
          p.style.display = p.id === panel.id ? 'block' : 'none'
        })
      })
    })
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-radio-accordion]')
  .forEach(element => accordions.push(new AdgRadioAccordion(element)))
