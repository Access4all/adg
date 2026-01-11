class AdgDialog {
  constructor (el) {
    this.openButton = el
    this.elementToOpenId = this.openButton.getAttribute('data-adg-dialog')
    this.initContainer(this.elementToOpenId)
    this.initOpenButton()
    this.hide()
  }

  initOpenButton () {
    this.openButton.setAttribute('aria-expanded', 'false')

    const dialogHintElement = document.createElement('span')
    dialogHintElement.classList.add('adg-visually-hidden')
    dialogHintElement.innerText = ' (dialog)'

    this.openButton.appendChild(dialogHintElement)

    this.openButton.addEventListener('click', () => {
      if (this.container.hidden) {
        this.show()
      } else {
        this.hide()
      }
    })
  }

  initContainer (id) {
    this.container = document.getElementById(id)
    this.container.setAttribute('data-adg-dialog-container', '')
    this.initCloseButton()
    this.initConfirmButton()
  }

  initConfirmButton () {
    this.confirmButton = document.createElement('button')
    this.confirmButton.setAttribute('type', 'button')
    this.confirmButton.innerHTML = 'Confirm<span class="adg-visually-hidden"> (close)</span>'

    this.confirmButton.addEventListener('click', () => this.hide())

    this.container.append(this.confirmButton)
  }

  initCloseButton () {
    this.closeButton = document.createElement('button')
    this.closeButton.setAttribute('type', 'button')
    this.closeButton.classList.add('adg-dialog-icon')
    this.closeButton.innerHTML = '<svg class="icon" focusable="false"><use xlink:href="#tooltip" /></svg></span><span class="adg-visually-hidden">Close dialog</span>'

    this.closeButton.addEventListener('click', () => this.hide())

    this.container.prepend(this.closeButton)
  }

  show () {
    this.container.hidden = false
    this.openButton.setAttribute('aria-expanded', 'true')
    this.closeButton.focus()
  }

  hide () {
    this.container.hidden = true
    this.openButton.setAttribute('aria-expanded', 'false')
    this.openButton.focus()
  }
}

const dialogs = []

document
  .querySelectorAll('[data-adg-dialog]')
  .forEach((element) => dialogs.push(new AdgDialog(element)))
