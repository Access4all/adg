;(function () {
  var AdgDatepicker

  AdgDatepicker = (function () {
    var config

    class AdgDatepicker {
      constructor (el, options = {}) {
        this.$el = $(el)
        this.config = config
        this.currentDate = this.config['date']
        this.initInput()
        this.initOptions()
        this.applyCheckedOptionToInput()
      }

      // Executes the given selector on @$el and returns the element. Makes sure exactly one element exists.
      findOne (selector) {
        var result
        result = this.$el.find(selector)
        switch (result.length) {
          case 0:
            return this.throwMessageAndPrintObjectsToConsole(
              `No object found for ${selector}!`,
              {
                result: result
              }
            )
          case 1:
            return $(result.first())
          default:
            return this.throwMessageAndPrintObjectsToConsole(
              `More than one object found for ${selector}!`,
              {
                result: result
              }
            )
        }
      }

      name () {
        return 'adg-datepicker'
      }

      addAdgDataAttribute ($target, name, value = '') {
        return $target.attr(this.adgDataAttributeName(name), value)
      }

      removeAdgDataAttribute ($target, name) {
        return $target.removeAttr(this.adgDataAttributeName(name))
      }

      adgDataAttributeName (name = null) {
        var result
        result = `data-${this.name()}`
        if (name) {
          result += `-${name}`
        }
        return result
      }

      labelOfInput ($inputs) {
        return $inputs.map((i, input) => {
          var $input, $label, id
          $input = $(input)
          id = $input.attr('id')
          $label = this.findOne(`label[for='${id}']`)[0]
          if ($label.length === 0) {
            $label = $input.closest('label')
            if ($label.length === 0) {
              this.throwMessageAndPrintObjectsToConsole(
                'No corresponding input found for input!',
                {
                  input: $input
                }
              )
            }
          }
          return $label
        })
      }

      show ($el) {
        $el.removeAttr('hidden')
        return $el.show()
      }

      // TODO Would be cool to renounce CSS and solely use the hidden attribute. But jQuery's :visible doesn't seem to work with it!?
      // @throwMessageAndPrintObjectsToConsole("Element is still hidden, although hidden attribute was removed! Make sure there's no CSS like display:none or visibility:hidden left on it!", element: $el) if $el.is(':hidden')
      hide ($el) {
        $el.attr('hidden', '')
        return $el.hide()
      }

      throwMessageAndPrintObjectsToConsole (message, elements = {}) {
        console.log(elements)
        throw message
      }

      text (text, options = {}) {
        var key, value
        text = this.config[`${text}Text`]
        for (key in options) {
          value = options[key]
          text = text.replace(`[${key}]`, value)
        }
        return text
      }

      initInput () {
        this.$input = this.findOne('input[type="text"]')
        this.$input.attr('autocomplete', 'off')
        this.$input.attr('aria-expanded', 'false')
        return this.attachInputEvents()
      }

      initOptions () {
        this.$optionsContainer = this.findOne('fieldset')
        this.addAdgDataAttribute(this.$optionsContainer, 'options')
        this.$optionsContainerLabel = this.findOne('legend')
        this.$optionsContainerLabel.addClass('adg-visually-hidden')
        this.initDate()
        return this.setSelection(this.currentDate.getDate() - 1, false)
      }

      getFirstMonthDay (date) {
        var m, y
        y = date.getFullYear()
        m = date.getMonth()
        return new Date(y, m, 1)
      }

      getLastMonthDay (date) {
        var m, y
        y = date.getFullYear()
        m = date.getMonth()
        return new Date(y, m + 1, 0)
      }

      initDate () {
        var $dateTable,
          $tr,
          day,
          daysOfMonth,
          firstDay,
          i,
          id,
          j,
          k,
          lastDay,
          len,
          len1,
          ref,
          value,
          weekday
        this.$optionsContainer.find('table').remove()
        $dateTable = $(
          `<table border='1'><caption>${
            this.config['monthNames'][this.currentDate.getMonth()]
          } ${this.currentDate.getFullYear()}</caption><thead></thead></table>`
        )
        ref = this.config['dayNames']
        for (j = 0, len = ref.length; j < len; j++) {
          weekday = ref[j]
          $dateTable.find('thead').append(`<th>${weekday}</th>`)
        }
        this.$optionsContainer.append($dateTable)
        firstDay = this.getFirstMonthDay(this.currentDate)
        lastDay = this.getLastMonthDay(this.currentDate)
        daysOfMonth = []
        day = firstDay
        while (day <= lastDay) {
          daysOfMonth.push(new Date(day))
          day.setDate(day.getDate() + 1)
        }

        // Add empty days at beginning
        i = 1
        firstDay = daysOfMonth[0].getDay()
        while (i < firstDay) {
          daysOfMonth.unshift(null)
          i++
        }

        // Add empty days at end
        i = daysOfMonth[daysOfMonth.length - 1].getDay()
        while (i > 0 && i < 6) {
          daysOfMonth.push(null)
          i++
        }
        $tr = null
        for (i = k = 0, len1 = daysOfMonth.length; k < len1; i = ++k) {
          day = daysOfMonth[i]
          if (i % 7 === 0) {
            $tr = $('<tr></tr>')
            $dateTable.append($tr)
          }
          value = day
            ? ((id = `favorite_hobby_${i}`),
              `<input type='radio' name='hobby' id='${id}' /><label for='${id}'><span class='adg-visually-hidden'>${this.getDayName(
                day.getDay()
              )}, </span>${day.getDate()}<span class='adg-visually-hidden'> of ${
                this.config['monthNames'][day.getMonth()]
              } ${day.getFullYear()}</span></label>`)
            : ''
          $tr.append(`<td class='control'>${value}</td>`)
        }
        this.$options = this.$optionsContainer.find('input[type="radio"]')
        this.attachOptionsEvents()
        this.addAdgDataAttribute(this.labelOfInput(this.$options), 'option')
        return this.$options.addClass('adg-visually-hidden')
      }

      getDayName (day) {
        if (day === 0) {
          day = 6
        }
        return this.config['dayNames'][day - 1]
      }

      attachInputEvents () {
        this.attachClickEventToInput()
        this.attachEscapeKeyToInput()
        this.attachEnterKeyToInput()
        this.attachTabKeyToInput()
        return this.attachUpDownKeysToInput()
      }

      attachOptionsEvents () {
        this.attachArrowKeysToOptions()
        this.attachChangeEventToOptions()
        this.attachClickEventToOptionLabels()
        this.attachEnterEventToOptions()
        return this.attachTabEventToOptions()
      }

      attachClickEventToInput () {
        return this.$input.click(() => {
          if (this.$optionsContainer.is(':visible')) {
            return this.hideOptions()
          } else {
            return this.showOptions()
          }
        })
      }

      attachEscapeKeyToInput () {
        return this.$input.keydown(e => {
          if (e.which === 27) {
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToInputAndResetOptions()
              return e.preventDefault()
            } else if (this.$options.is(':checked')) {
              this.$options.prop('checked', false)
              this.applyCheckedOptionToInputAndResetOptions()
              return e.preventDefault() // Needed for automatic testing only
            } else {
              return $('body').append('<p>Esc passed on.</p>')
            }
          }
        })
      }

      attachEnterKeyToInput () {
        return this.$input.keydown(e => {
          if (e.which === 13) {
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToInputAndResetOptions()
              return e.preventDefault() // Needed for automatic testing only
            } else {
              return $('body').append('<p>Enter passed on.</p>')
            }
          }
        })
      }

      attachTabKeyToInput () {
        return this.$input.keydown(e => {
          if (e.which === 9) {
            if (this.$optionsContainer.is(':visible')) {
              return this.applyCheckedOptionToInputAndResetOptions()
            }
          }
        })
      }

      attachUpDownKeysToInput () {
        return this.$input.keydown(e => {
          if (e.which === 38 || e.which === 40) {
            this.showOptions()
            return e.preventDefault() // TODO: Test!
          }
        })
      }

      showOptions () {
        this.show(this.$optionsContainer)
        this.$input.attr('aria-expanded', 'true')
        if (this.$options.filter(':checked').length === 0) {
          this.currentDate = this.config['date']
          this.initDate()
          this.setSelection(this.currentDate.getDate() - 1)
        }
        return this.$options.filter(':checked').focus()
      }

      hideOptions () {
        this.hide(this.$optionsContainer)
        this.$input.attr('aria-expanded', 'false')
        return this.$input.focus()
      }

      moveSelection (direction) {
        var currentIndex, maxIndex, upcomingIndex
        maxIndex = this.$options.length - 1
        currentIndex = this.$options.index(
          this.$options.parent().find(':checked')
        ) // TODO: is parent() good here?!
        upcomingIndex =
          direction === 'left'
            ? currentIndex <= 0
              ? ((this.currentDate = this.previousMonth(this.currentDate)),
                this.initDate(),
                -1)
              : currentIndex - 1
            : direction === 'up'
              ? currentIndex - 7 < 0
                ? ((this.currentDate = this.previousMonth(this.currentDate)),
                  this.initDate(),
                  -1)
                : currentIndex - 7
              : direction === 'right'
                ? currentIndex === maxIndex
                  ? ((this.currentDate = this.nextMonth(this.currentDate)),
                    this.initDate(),
                    0)
                  : currentIndex + 1
                : direction === 'down'
                  ? currentIndex + 7 > maxIndex
                    ? ((this.currentDate = this.nextMonth(this.currentDate)),
                      this.initDate(),
                      0)
                    : currentIndex + 7
                  : void 0 // TODO: Calculate index for the current week day // TODO: Calculate index for the current week day
        return this.setSelection(upcomingIndex)
      }

      setSelection (current, change = true) {
        var $currentOption
        if (current === -1) {
          current = this.$options.length - 1
        }
        $currentOption = $(this.$options[current])
        $currentOption.prop('checked', true)
        if (change) {
          $currentOption.trigger('change')
          return $currentOption.focus()
        }
      }

      previousMonth (now) {
        if (now.getMonth() === 0) {
          return new Date(now.getFullYear() - 1, 11, 1)
        } else {
          return new Date(now.getFullYear(), now.getMonth() - 1, 1)
        }
      }

      nextMonth (now) {
        if (now.getMonth() === 11) {
          return new Date(now.getFullYear() + 1, 11, 1)
        } else {
          return new Date(now.getFullYear(), now.getMonth() + 1, 1)
        }
      }

      attachArrowKeysToOptions () {
        return this.$options.keydown(e => {
          if (
            e.which === 37 ||
            e.which === 38 ||
            e.which === 39 ||
            e.which === 40
          ) {
            if (e.which === 37) {
              this.moveSelection('left')
            } else if (e.which === 38) {
              this.moveSelection('up')
            } else if (e.which === 39) {
              this.moveSelection('right')
            } else if (e.which === 40) {
              this.moveSelection('down')
            }
            return e.preventDefault() // TODO: Test!
          }
        })
      }

      attachChangeEventToOptions () {
        return this.$options.change(e => {
          return this.applyCheckedOptionToInput()
        })
      }

      applyCheckedOptionToInputAndResetOptions () {
        this.applyCheckedOptionToInput()
        return this.hideOptions()
      }

      applyCheckedOptionToInput () {
        var $checkedOption, $checkedOptionLabel, $previouslyCheckedOptionLabel
        $previouslyCheckedOptionLabel = $(
          `[${this.adgDataAttributeName('option-selected')}]`
        )
        if ($previouslyCheckedOptionLabel.length === 1) {
          this.removeAdgDataAttribute(
            $previouslyCheckedOptionLabel,
            'option-selected'
          )
        }
        $checkedOption = this.$options.filter(':checked')
        if ($checkedOption.length === 1) {
          $checkedOptionLabel = this.labelOfInput($checkedOption)
          this.$input.val($.trim($checkedOptionLabel.text()))
          return this.addAdgDataAttribute(
            $checkedOptionLabel,
            'option-selected'
          )
        } else {
          return this.$input.val('')
        }
      }

      attachClickEventToOptionLabels () {
        return this.labelOfInput(this.$options).click(e => {
          return this.hideOptions()
        })
      }

      attachEnterEventToOptions () {
        return this.$options.keydown(e => {
          if (e.which === 13) {
            this.hideOptions()
            e.preventDefault()
            return e.stopPropagation()
          }
        })
      }

      attachTabEventToOptions () {
        return this.$options.keydown(e => {
          if (e.which === 9) {
            return this.hideOptions()
          }
        })
      }
    }

    config = {
      date: new Date(),
      dayNames: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }

    return AdgDatepicker
  }.call(this))

  $(document).ready(function () {
    return $('[data-adg-datepicker]').each(function () {
      return new AdgDatepicker(this)
    })
  })
}.call(this))
