;(function () {
  // Tested in JAWS+IE/FF, NVDA+FF

  // Known issues:
  // - JAWS leaves the input when using up/down without entering something (I guess this is due to screen layout and can be considered intended)
  // - Alert not perceivable upon opening options using up/down
  //     - Possible solution 1: always show options count when filter focused?
  //     - Possible solution 2: wait a moment before adding the alert?
  // - VoiceOver/iOS announces radio buttons as disabled?!
  // - iOS doesn't select all text when option was chosen

  // In general: alerts seem to be most robust in all relevant browsers, but aren't polite. Maybe we'll find a better mechanism to serve browsers individually?
  var AdgAutocomplete

  AdgAutocomplete = (function () {
    var config, uniqueIdCount

    class AdgAutocomplete {
      constructor (el, options = {}) {
        var jsonOptions, key, val
        this.$el = $(el)
        this.config = config
        for (key in options) {
          val = options[key]
          this.config[key] = val
        }
        jsonOptions = this.$el.attr(this.adgDataAttributeName())
        if (jsonOptions) {
          for (key in jsonOptions) {
            val = jsonOptions[key]
            this.config[key] = val
          }
        }
        this.debugMessage('start')
        this.initFilter()
        this.initOptions()
        this.initAlerts()
        this.applyCheckedOptionToFilter()
        this.announceOptionsNumber('')
        this.attachEvents()
      }

      // Prints the given message to the console if config['debug'] is true.
      debugMessage (message) {
        if (this.config.debugMessage) {
          return console.log(`Adg debug: ${message}`)
        }
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
        return 'adg-autosuggest'
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

      uniqueId (name) {
        return [this.name(), name, uniqueIdCount++].join('-')
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

      initFilter () {
        this.$filter = this.findOne('input[type="text"]')
        this.addAdgDataAttribute(this.$filter, 'filter')
        this.$filter.attr('autocomplete', 'off')
        return this.$filter.attr('aria-expanded', 'false')
      }

      initOptions () {
        this.$optionsContainer = this.findOne(this.config.optionsContainer)
        this.addAdgDataAttribute(this.$optionsContainer, 'options')
        this.$optionsContainerLabel = this.findOne(
          this.config.optionsContainerLabel
        )
        this.$optionsContainerLabel.addClass(this.config.hiddenCssClass)
        this.$options = this.$optionsContainer.find('input[type="radio"]')
        this.addAdgDataAttribute(this.labelOfInput(this.$options), 'option')
        return this.$options.addClass(this.config.hiddenCssClass)
      }

      initAlerts () {
        this.$alertsContainer = $(
          `<div id='${this.uniqueId(this.config.alertsContainerId)}'></div>`
        )
        this.$optionsContainerLabel.after(this.$alertsContainer)
        this.$filter.attr(
          'aria-describedby',
          [
            this.$filter.attr('aria-describedby'),
            this.$alertsContainer.attr('id')
          ]
            .join(' ')
            .trim()
        )
        return this.addAdgDataAttribute(this.$alertsContainer, 'alerts')
      }

      attachEvents () {
        this.attachClickEventToFilter()
        this.attachChangeEventToFilter()
        this.attachEscapeKeyToFilter()
        this.attachEnterKeyToFilter()
        this.attachTabKeyToFilter()
        this.attachUpDownKeysToFilter()
        this.attachChangeEventToOptions()
        return this.attachClickEventToOptions()
      }

      attachClickEventToFilter () {
        return this.$filter.click(() => {
          this.debugMessage('click filter')
          if (this.$optionsContainer.is(':visible')) {
            return this.hideOptions()
          } else {
            return this.showOptions()
          }
        })
      }

      attachEscapeKeyToFilter () {
        return this.$filter.keydown(e => {
          if (e.which === 27) {
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToFilterAndResetOptions()
              return e.preventDefault()
            } else if (this.$options.is(':checked')) {
              this.$options.prop('checked', false)
              this.applyCheckedOptionToFilterAndResetOptions()
              return e.preventDefault() // Needed for automatic testing only
            } else {
              return $('body').append('<p>Esc passed on.</p>')
            }
          }
        })
      }

      attachEnterKeyToFilter () {
        return this.$filter.keydown(e => {
          if (e.which === 13) {
            this.debugMessage('enter')
            if (this.$optionsContainer.is(':visible')) {
              this.applyCheckedOptionToFilterAndResetOptions()
              return e.preventDefault() // Needed for automatic testing only
            } else {
              return $('body').append('<p>Enter passed on.</p>')
            }
          }
        })
      }

      attachTabKeyToFilter () {
        return this.$filter.keydown(e => {
          if (e.which === 9) {
            this.debugMessage('tab')
            if (this.$optionsContainer.is(':visible')) {
              return this.applyCheckedOptionToFilterAndResetOptions()
            }
          }
        })
      }

      attachUpDownKeysToFilter () {
        return this.$filter.keydown(e => {
          if (e.which === 38 || e.which === 40) {
            if (this.$optionsContainer.is(':visible')) {
              if (e.which === 38) {
                this.moveSelection('up')
              } else {
                this.moveSelection('down')
              }
            } else {
              this.showOptions()
            }
            return e.preventDefault() // TODO: Test!
          }
        })
      }

      showOptions () {
        this.debugMessage('(show options)')
        this.show(this.$optionsContainer)
        return this.$filter.attr('aria-expanded', 'true')
      }

      hideOptions () {
        this.debugMessage('(hide options)')
        this.hide(this.$optionsContainer)
        return this.$filter.attr('aria-expanded', 'false')
      }

      moveSelection (direction) {
        var $upcomingOption,
          $visibleOptions,
          currentIndex,
          maxIndex,
          upcomingIndex
        $visibleOptions = this.$options.filter(':visible')
        maxIndex = $visibleOptions.length - 1
        currentIndex = $visibleOptions.index(
          $visibleOptions.parent().find(':checked')
        ) // TODO: is parent() good here?!
        upcomingIndex =
          direction === 'up'
            ? currentIndex <= 0 ? maxIndex : currentIndex - 1
            : currentIndex === maxIndex ? 0 : currentIndex + 1
        $upcomingOption = $($visibleOptions[upcomingIndex])
        return $upcomingOption.prop('checked', true).trigger('change')
      }

      attachChangeEventToOptions () {
        return this.$options.change(e => {
          this.debugMessage('option change')
          this.applyCheckedOptionToFilter()
          return this.$filter.focus().select()
        })
      }

      applyCheckedOptionToFilterAndResetOptions () {
        this.applyCheckedOptionToFilter()
        this.hideOptions()
        return this.filterOptions()
      }

      applyCheckedOptionToFilter () {
        var $checkedOption, $checkedOptionLabel, $previouslyCheckedOptionLabel
        this.debugMessage('(apply option to filter)')
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
          this.$filter.val($.trim($checkedOptionLabel.text()))
          return this.addAdgDataAttribute(
            $checkedOptionLabel,
            'option-selected'
          )
        } else {
          return this.$filter.val('')
        }
      }

      attachClickEventToOptions () {
        return this.$options.click(e => {
          this.debugMessage('click option')
          return this.hideOptions()
        })
      }

      attachChangeEventToFilter () {
        return this.$filter.on('input propertychange paste', e => {
          this.debugMessage('(filter changed)')
          this.filterOptions(e.target.value)
          return this.showOptions()
        })
      }

      filterOptions (filter = '') {
        var fuzzyFilter, visibleNumber
        fuzzyFilter = this.fuzzifyFilter(filter)
        visibleNumber = 0
        this.$options.each((i, el) => {
          var $option, $optionContainer, regex
          $option = $(el)
          $optionContainer = $option.parent()
          regex = new RegExp(fuzzyFilter, 'i')
          if (regex.test($optionContainer.text())) {
            visibleNumber++
            return this.show($optionContainer)
          } else {
            return this.hide($optionContainer)
          }
        })
        return this.announceOptionsNumber(filter, visibleNumber)
      }

      announceOptionsNumber (
        filter = this.$filter.val(),
        number = this.$options.length
      ) {
        var message
        this.$alertsContainer.find('p').remove() // Remove previous alerts (I'm not sure whether this is the best solution, maybe hiding them would be more robust?)
        message =
          filter === ''
            ? this.text('numberInTotal', {
              number: number
            })
            : this.text('numberFiltered', {
              number: number,
              total: this.$options.length,
              filter: `<kbd>${filter}</kbd>`
            })
        return this.$alertsContainer.append(`<p role='alert'>${message}</p>`)
      }

      fuzzifyFilter (filter) {
        var escapedCharacter, fuzzifiedFilter, i
        i = 0
        fuzzifiedFilter = ''
        while (i < filter.length) {
          escapedCharacter = filter
            .charAt(i)
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // See https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
          fuzzifiedFilter += `${escapedCharacter}.*?`
          i++
        }
        return fuzzifiedFilter
      }
    }

    uniqueIdCount = 1

    config = {
      debugMessage: false,
      hiddenCssClass: 'adg-visually-hidden',
      optionsContainer: 'fieldset',
      optionsContainerLabel: 'legend',
      alertsContainerId: 'alerts',
      numberInTotalText: '[number] options in total',
      numberFilteredText: '[number] of [total] options for [filter]'
    }

    return AdgAutocomplete
  }.call(this))

  $(document).ready(function () {
    return $('[data-adg-autosuggest]').each(function () {
      return new AdgAutocomplete(this)
    })
  })
}.call(this))
