;(function () {
  var AdgTooltip

  AdgTooltip = (function () {
    function AdgTooltip (el) {
      this.$el = $(el)
      this.value = this.$el.attr('data-adg-tooltip')
      this.initIcon()
      this.initBalloon()
      this.initDescription()
      this.initElEvents()
      this.initIconEvents()
    }

    AdgTooltip.prototype.initIcon = function () {
      this.$icon = $("<span aria-hidden='true'>?</span>")
      return this.$el.after(this.$icon)
    }

    AdgTooltip.prototype.initBalloon = function () {
      this.$balloon = $('<span>' + this.value + '</span>')
      this.$icon.append(this.$balloon)
      return this.$balloon.click(
        (function (_this) {
          return function () {
            return _this.hide()
          }
        })(this)
      )
    }

    AdgTooltip.prototype.initDescription = function () {
      var valueElement
      valueElement = '<span data-adg-sr-only> (' + this.value + ')</span>'
      if (this.$el.is('input, textarea, select')) {
        return $("label[for='" + this.$el.attr('id') + "']").append(
          valueElement
        )
      } else {
        return this.$el.append(valueElement)
      }
    }

    AdgTooltip.prototype.initElEvents = function () {
      this.$el.focusin(
        (function (_this) {
          return function () {
            return _this.show()
          }
        })(this)
      )
      this.$el.focusout(
        (function (_this) {
          return function () {
            return _this.hide()
          }
        })(this)
      )
      this.$el.mouseenter(
        (function (_this) {
          return function () {
            return _this.show()
          }
        })(this)
      )
      this.$el.mouseleave(
        (function (_this) {
          return function () {
            if (!_this.$el.is(':focus')) {
              return _this.hide()
            }
          }
        })(this)
      )
      return this.$el.keyup(
        (function (_this) {
          return function (e) {
            if (e.keyCode === 27) {
              if (_this.$balloon.is(':visible')) {
                return _this.hide()
              } else {
                return _this.show()
              }
            }
          }
        })(this)
      )
    }

    AdgTooltip.prototype.initIconEvents = function () {
      this.$icon.mouseenter(
        (function (_this) {
          return function () {
            return _this.show()
          }
        })(this)
      )
      return this.$icon.mouseleave(
        (function (_this) {
          return function () {
            if (!_this.$el.is(':focus')) {
              return _this.hide()
            }
          }
        })(this)
      )
    }

    AdgTooltip.prototype.show = function () {
      return this.$balloon.show()
    }

    AdgTooltip.prototype.hide = function () {
      return this.$balloon.hide()
    }

    return AdgTooltip
  })()

  $(document).ready(function () {
    return $('[data-adg-tooltip]').each(function () {
      return new AdgTooltip(this)
    })
  })
}.call(this))
