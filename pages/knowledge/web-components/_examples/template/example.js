class DateFormatted extends HTMLElement {
  connectedCallback() {
    // Note: We are creating our shadow root here instead of declaratively on the server
    const template = document.querySelector('#date-formatted-template')
    const shadowRoot = this.attachShadow({ mode: 'open' })

    shadowRoot.appendChild(template.content.cloneNode(true))

    const target = this.shadowRoot.querySelector('time')
    const isoDateString = this.innerText.trim()
    const localizedDateString = new Date(isoDateString).toLocaleDateString()

    target.setAttribute('datetime', isoDateString)
    target.innerText = localizedDateString
  }
}

customElements.define('date-formatted', DateFormatted)
