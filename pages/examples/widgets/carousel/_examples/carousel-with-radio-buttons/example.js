class AdgCarousel {
  constructor(el) {
    this.element = el
    this.directionControls = this.element.querySelectorAll(
      'button[data-carousel-direction]'
    )
    this.jumpControls = this.element.querySelectorAll('input[type=radio]')
    this.autoplayControl = this.element.querySelector(
      'button[data-carousel-autoplay]'
    )
    this.alertsContainer = document.querySelector('#alerts')
    this.alertsTimeoutId = null

    this.init()
  }

  init() {
    const changeEvent = new Event('change')
    const clickEvent = new Event('click')

    this.directionControls.forEach(button => {
      button.addEventListener('click', event => {
        const button = event.target
        const carouselId = button.getAttribute('data-carousel-id')
        const direction = button.getAttribute('data-carousel-direction')
        const allPanels = this.element.querySelectorAll(
          `input[name=${carouselId}]`
        )
        const currentIndex = Math.max(
          [...allPanels].findIndex(jumpControl => jumpControl.checked === true),
          0
        )
        const maxIndex = allPanels.length - 1
        const nextIndex =
          direction === 'previous'
            ? currentIndex < 1
              ? maxIndex
              : currentIndex - 1
            : currentIndex >= maxIndex
            ? 0
            : currentIndex + 1
        const nextPanel = allPanels[nextIndex]

        nextPanel.checked = true
        nextPanel.dispatchEvent(changeEvent)
        this.pushAlertMessage(
          `Showing panel ${nextIndex + 1} of ${maxIndex + 1}`
        )
      })
    })

    this.jumpControls.forEach(button => {
      button.addEventListener('change', event => {
        const currentRadio = event.target
        const currentRadioName = currentRadio.getAttribute('name')
        const currentPanelId = `#${currentRadio.getAttribute('value')}_panel`

        this.element
          .querySelectorAll(`[name='${currentRadioName}']`)
          .forEach(radio => {
            const panelId = `#${radio.getAttribute('id')}_panel`
            const panel = this.element.querySelector(panelId)

            if (currentPanelId === panelId) {
              panel.style.display = ''
            } else {
              panel.style.display = 'none'
            }
          })
      })
    })

    setInterval(() => {
      if (this.autoplayControl.getAttribute('aria-pressed') === 'true') {
        this.element
          .querySelector('[data-carousel-direction=next]')
          .dispatchEvent(clickEvent)
      }
    }, 3000)

    this.autoplayControl.addEventListener('click', event => {
      const toggle = event.target
      const autoplayState =
        toggle.getAttribute('aria-pressed') !== 'true' ? 'true' : 'false'

      toggle.setAttribute('aria-pressed', autoplayState)
    })
  }

  pushAlertMessage(text) {
    const alert = document.createElement('div')

    alert.setAttribute('role', 'alert')
    alert.append(text)
    this.alertsContainer.append(alert)
    clearTimeout(this.alertsTimeoutId)
    this.alertsTimeoutId = setTimeout(() => {
      this.alertsContainer.replaceChildren()
    }, 2000)
  }
}

const carousels = []

document
  .querySelectorAll('[data-adg-carousel]')
  .forEach(element => carousels.push(new AdgCarousel(element)))
