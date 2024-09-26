class DateFormatted extends HTMLElement {
  connectedCallback() {
    // Note: Our target is located in `.shadowRoot`
    const target = this.shadowRoot.querySelector('time')
    const isoDateString = this.innerText.trim()
    const localizedDateString = new Date(isoDateString).toLocaleDateString()

    target.setAttribute('datetime', isoDateString)
    target.innerText = localizedDateString
  }
}

customElements.define('date-formatted', DateFormatted)
