class DateFormatted extends HTMLElement {
  connectedCallback() {
    const target = this.querySelector('time')
    const isoDateString = this.innerText.trim()
    const localizedDateString = new Date(isoDateString).toLocaleDateString()

    target.setAttribute('datetime', isoDateString)
    target.innerText = localizedDateString
  }
}

customElements.define('date-formatted', DateFormatted)
