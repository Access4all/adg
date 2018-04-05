// Template for a typical site module

/*
BaseModule
 ---
Description of the main functionality/purpose of the javascript
implementation of this module in a very few words.

e.g. Makes sure of touch interactivity.
*/

define(['jquery'], function ($) {
  var BaseModule
  var namespaces = {}

  BaseModule = function () {
    this.$el = null
  }

  BaseModule.ns = function (name) {
    if (!namespaces[name]) {
      namespaces[name] = 0
    }
    return '.' + name + ++namespaces[name]
  }

  BaseModule.prototype.init = BaseModule.prototype._init = function (element) {
    this.$el = $(element)
    if (this.config && this.config.logging) {
      this.logAllFn(this.constructor)
    }
    return this
  }

  BaseModule.prototype.destroy = BaseModule.prototype._destroy = function () {
    this.off()
    if (this.$el) {
      // remove event listeners
      this.$el = null
    }
  }

  BaseModule.prototype.logAllFn = function (obj) {
    console.log(this.ns, 'logAll - activated')
    var functions = Object.getOwnPropertyNames(obj.prototype).filter(function (
      p
    ) {
      return typeof obj.prototype[p] === 'function'
    })

    for (var i = 0; i < functions.length; i++) {
      var functionName = functions[i]
      this.extentLogToFn(functionName)
    }
  }

  BaseModule.prototype.extentLogToFn = function (functionName) {
    var self = this,
      _fn = this[functionName]
    self[functionName] = function () {
      console.log(self.ns, functionName)
      return _fn.apply(self, arguments)
    }
  }

  // on(event, selector, handler)
  // on(element, event, selector, handler)
  // on(event, handler)
  // on(element, event, handler)
  BaseModule.prototype.on = function () {
    var event,
      selector,
      handler,
      target,
      args = []
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i]
    }
    switch (arguments.length) {
      case 2:
        target = this.$el
        event = args.shift()
        handler = args.shift()
        break
      case 3:
        event = args.shift()
        if (typeof event === 'string') {
          target = this.$el
          selector = args.shift()
          handler = args.shift()
        } else {
          target = $(event)
          event = args.shift()
          handler = args.shift()
        }
        break
      case 4:
        target = $(args.shift())
        event = args.shift()
        selector = args.shift()
        handler = args.shift()
        break
    }

    handler = this.bind(handler)

    if (selector) {
      target.on(event + this.ns, selector, handler)
    } else {
      target.on(event + this.ns, handler)
    }
  }

  BaseModule.prototype.off = function () {
    if (this.$el) {
      this.$el.off(this.ns)
    }
    $(document).off(this.ns)
    $(window).off(this.ns)
    if (this.nstemp) {
      if (this.$el) {
        this.$el.off(this.nstemp)
      }
      $(document).off(this.nstemp)
      $(window).off(this.nstemp)
    }
  }

  BaseModule.prototype.bind = function (method) {
    var self = this
    return function () {
      method.apply(self, arguments)
    }
  }

  return BaseModule
})
