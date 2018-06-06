import $ from 'jquery'

import ADGBase from './ADGBase'

export default class ADGAutocomplete extends ADGBase {
  // Need to override the base class method
  // TODO: make this explicit
  name () {
    return 'adg-autocomplete'
  }

  init () {
    var jsonOptions, key, val
    // Merge config into existing one (not nice, see https://stackoverflow.com/questions/47721699/)
    // for (key in config) {
    //   val = config[key]
    //   this.config[key] = val
    // }

    // This should be passed at init
    this.config = {
      optionsContainer: '#unibox-suggest-box',
      optionsContainerLabel: 'h3',
      alertsContainerId: 'alerts',
      numberInTotalText: '[number] options in total',
      numberFilteredText: '[number] of [total] options for [filter]'
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
    return this.attachEvents()
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
      [this.$filter.attr('aria-describedby'), this.$alertsContainer.attr('id')]
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
      var $checkedOption
      if (e.which === 13) {
        this.debugMessage('enter')
        if (this.$optionsContainer.is(':visible')) {
          $checkedOption = this.$options.filter(':checked')
          if ($checkedOption.length === 1) {
            this.$filter.trigger('adg-autocomplete-option-selected', [
              $checkedOption
            ])
          }
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
    var $upcomingOption, $visibleOptions, currentIndex, maxIndex, upcomingIndex
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
      return this.addAdgDataAttribute($checkedOptionLabel, 'option-selected')
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
