class AdgRadioAccordion {
  constructor (el) {
    this.element = el
    this.triggers = this.element.querySelectorAll('.trigger')
    this.initTriggers()
  }

  initTriggers () {
    this.triggers.forEach(trigger => {
      const triggerRadio = trigger.querySelector('input[type="radio"]')
      const panelId = `${triggerRadio.id}_panel`
      const panel = document.getElementById(panelId)
      panel.style.display = triggerRadio.checked ? 'block' : 'none'

      triggerRadio.addEventListener('change', () => {
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
