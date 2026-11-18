/**
 * Disclosure
 *
 * Turns the links to an example's code and compatibility panels into
 * disclosure buttons. Opening a panel closes the others, activating the open
 * one closes it again. Without JavaScript the links jump to the panels, which
 * then all stay visible.
 *
 * @selector .js-disclosure
 * @enabled true
 */
export default class Disclosure {
  constructor() {
    this.onClick = this.onClick.bind(this)
  }

  init(element) {
    this.el = element

    this.el
      .querySelectorAll('.disclosure--toggle')
      .forEach(link => this.replaceWithButton(link))

    this.el.addEventListener('click', this.onClick)

    return this
  }

  destroy() {
    this.el.removeEventListener('click', this.onClick)
  }

  replaceWithButton(link) {
    const button = document.createElement('button')

    button.type = 'button'
    button.className = link.className
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-controls', link.hash.slice(1))
    button.append(...link.childNodes)

    link.replaceWith(button)
  }

  onClick(event) {
    const button = event.target.closest('.disclosure--toggle')

    if (!button) return

    const isExpanded = button.getAttribute('aria-expanded') === 'true'

    this.el
      .querySelectorAll('.disclosure--toggle')
      .forEach(toggle => this.setExpanded(toggle, false))

    this.setExpanded(button, !isExpanded)
  }

  setExpanded(button, isExpanded) {
    button.setAttribute('aria-expanded', String(isExpanded))
    button.classList.toggle('is-active', isExpanded)

    this.getPanel(button).classList.toggle('is-active', isExpanded)
  }

  getPanel(button) {
    return document.getElementById(button.getAttribute('aria-controls'))
  }
}
