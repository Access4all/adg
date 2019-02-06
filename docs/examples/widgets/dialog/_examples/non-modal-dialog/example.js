;(function () {
  var AdgDialog

  AdgDialog = class AdgDialog {
    constructor (el) {
      this.$openButton = $(el)
      this.initContainer(this.$openButton.attr('data-adg-dialog'))
      this.initOpenButton()
    }

    initOpenButton () {
      this.$openButton.attr('aria-expanded', false)
      this.$openButton.append(
        '<span class="adg-visually-hidden"> (dialog)</span>'
      )
      return this.$openButton.click(e => {
        if (this.$container.is(':visible')) {
          return this.hide()
        } else {
          return this.show()
        }
      })
    }

    initContainer (id) {
      this.$container = $(`#${id}`)
      this.$container.attr('data-adg-dialog-container', true)
      this.initCloseButton()
      return this.initConfirmButton()
    }

    initConfirmButton () {
      this.$confirmButton = $(
        '<button>Confirm<span class="adg-visually-hidden"> (close)</span></button>'
      )
      this.$container.append(this.$confirmButton)
      return this.$confirmButton.click(() => {
        return this.hide()
      })
    }

    initCloseButton () {
      this.$closeButton = $(
        '<button class="adg-dialog-icon"><svg class="icon" focusable="false"><use xlink:href="#tooltip" /></svg></span><span class="adg-visually-hidden">Close dialog</span></button>'
      )
      this.$container.prepend(this.$closeButton)
      return this.$closeButton.click(() => {
        return this.hide()
      })
    }

    show () {
      this.$container.attr('hidden', false)
      this.$openButton.attr('aria-expanded', true)
      return this.$closeButton.focus()
    }

    hide () {
      this.$container.attr('hidden', true)
      this.$openButton.attr('aria-expanded', false)
      return this.$openButton.focus()
    }
  }

  $(document).ready(function () {
    return $('[data-adg-dialog]').each(function () {
      return new AdgDialog(this)
    })
  })
}.call(this))
