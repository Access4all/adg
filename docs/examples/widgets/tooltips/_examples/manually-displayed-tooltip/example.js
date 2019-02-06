;(function () {
  var AdgTooltipComplex

  AdgTooltipComplex = class AdgTooltipComplex {
    constructor (el) {
      this.$el = $(el)
      this.value = this.$el.attr('data-adg-tooltip-complex')
      this.$el.attr('data-adg-tooltip-complex', null)
      this.initContainer()
      this.attachContentToEl()
      this.initIconEvents()
    }

    initContainer () {
      this.$container = $("<span class='adg-tooltip-complex'></span>")
      this.$el.after(this.$container)
      this.initIcon()
      return this.initBalloon()
    }

    initIcon () {
      // Set focusable="false" for IE, see https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element
      this.$icon = $(
        "<button class='adg-tooltip-complex-icon' aria-expanded='false'><span class='adg-visually-hidden'>Toggle tooltip</span><svg class='icon' focusable='false'><use xlink:href='#tooltip' /></svg></button>"
      )
      return this.$container.append(this.$icon)
    }

    initBalloon () {
      this.$balloon = $(
        `<div class='adg-tooltip-complex-balloon' hidden>${this.value}</div>`
      )
      this.$balloon.attr('id', `${this.$el.attr('id')}-balloon`)
      return this.$container.append(this.$balloon)
    }

    attachContentToEl () {
      var valueElement
      valueElement = $(
        "<span class='adg-visually-hidden'> (for more details, consult adjacent tooltip)</span>"
      )
      if (this.$el.is('input, textarea, select')) {
        return $(`label[for='${this.$el.attr('id')}'`).append(valueElement)
      } else {
        return this.$el.append(valueElement)
      }
    }

    initIconEvents () {
      return this.$icon.click(() => {
        if (this.$balloon.is(':visible')) {
          return this.hide()
        } else {
          return this.show()
        }
      })
    }

    show () {
      this.$balloon.attr('hidden', false)
      return this.$icon.attr('aria-expanded', true)
    }

    hide () {
      this.$balloon.attr('hidden', true)
      return this.$icon.attr('aria-expanded', false)
    }
  }

  $(document).ready(function () {
    return $('[data-adg-tooltip-complex]').each(function () {
      return new AdgTooltipComplex(this)
    })
  })
}.call(this))
