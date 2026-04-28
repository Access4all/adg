class AdgAccordion {
  constructor(el) {
    this.element = el
    this.triggers = Array.from(
      this.element.querySelectorAll('.accordion-trigger')
    )
    this.initTriggers()
  }

  initTriggers() {
    this.triggers.forEach(trigger => {
      const panelId = trigger.getAttribute('aria-controls')
      const panel = document.getElementById(panelId)

      const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
      panel.hidden = !isExpanded

      trigger.addEventListener('click', () => {
        this.toggle(panel, trigger)
      })
    })
  }

  toggle(panel, trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
    trigger.setAttribute('aria-expanded', String(!isExpanded))
    panel.hidden = isExpanded
  }
}

const accordions = []

document
  .querySelectorAll('[data-adg-accordion]')
  .forEach(element => accordions.push(new AdgAccordion(element)))
