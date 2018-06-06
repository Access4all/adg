;(function () {
  var AdgTooltipSimple

  AdgTooltipSimple = class AdgTooltipSimple {
    constructor (el) {
      this.$el = $(el)
      this.value = this.$el.attr('data-adg-tooltip-simple')
      this.$el.attr('data-adg-tooltip-simple', null)
      this.initContainer()
      this.attachContentToEl()
      this.initElEvents()
      this.initContainerEvents()
    }

    initContainer () {
      this.$container = $(
        "<span class='adg-tooltip-simple' aria-hidden='true'></span>"
      )
      this.$el.after(this.$container)
      this.initIcon()
      return this.initBalloon()
    }

    initIcon () {
      // Set focusable="false" for IE, see https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element
      this.$icon = $(
        "<span class='adg-tooltip-simple-icon'><svg class='icon' focusable='false'><use xlink:href='#tooltip' /></svg></span>"
      )
      return this.$container.append(this.$icon)
    }

    initBalloon () {
      this.$balloon = $(
        `<span class='adg-tooltip-simple-balloon' hidden>${this.value}</span>`
      )
      this.$balloon.attr('id', `${this.$el.attr('id')}-balloon`)
      return this.$container.append(this.$balloon)
    }

    attachContentToEl () {
      var valueElement
      valueElement = $(
        `<span class='adg-visually-hidden'> (${this.value})</span>`
      )
      if (this.$el.is('input, textarea, select')) {
        return $(`label[for='${this.$el.attr('id')}'`).append(valueElement)
      } else {
        return this.$el.append(valueElement)
      }
    }

    initElEvents () {
      this.$el.focusin(() => {
        return this.show()
      })
      this.$el.focusout(() => {
        if (!this.$container.is(':hover')) {
          return this.hide()
        }
      })
      this.$el.mouseenter(() => {
        return this.show()
      })
      this.$el.mouseleave(() => {
        if (!this.$el.is(':focus')) {
          return this.hide()
        }
      })
      return this.$el.keyup(e => {
        if (e.keyCode === 27) {
          // Esc
          if (this.$balloon.is(':visible')) {
            return this.hide()
          } else {
            return this.show()
          }
        }
      })
    }

    initContainerEvents () {
      this.$container.mouseenter(() => {
        return this.show()
      })
      return this.$container.mouseleave(() => {
        if (!this.$el.is(':focus')) {
          return this.hide()
        }
      })
    }

    show () {
      return this.$balloon.attr('hidden', false)
    }

    hide () {
      return this.$balloon.attr('hidden', true)
    }
  }

  $(document).ready(function () {
    return $('[data-adg-tooltip-simple]').each(function () {
      return new AdgTooltipSimple(this)
    })
  })
}.call(this))
