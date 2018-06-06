import $ from 'jquery'

export default class ADGBase {
  // Constructor. Should not be overridden; use @init() instead.

  // - Arg1: The DOM element on which the script should be applied (will be saved as @$el)
  // - Arg2: An optional hash of options which will be merged into the global default config
  constructor (el, options = {}) {
    var key, val
    this.$el = $(el)

    this.config = {
      debugMessage: true,
      hiddenCssClass: 'adg-visually-hidden'
    }

    this.uniqueIdCount = null

    // this.config = config
    for (key in options) {
      val = options[key]
      this.config[key] = val
    }
    this.init()
  }

  // Dummy, must be overridden in inheriting classes.
  init () {
    return this.throwMessageAndPrintObjectsToConsole(
      'Classes extending App must implement method init()!'
    )
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
    return `adg-${this.constructor.name.toLowerCase()}`
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
    return [this.name(), name, this.uniqueIdCount++].join('-')
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
}
