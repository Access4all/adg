import $ from 'jquery'
import contextTrigger from './contextTrigger'

// every module should at least implement two methods
// Module.init = function( HTMLElement )
// Module.destroy = function()
//
// Modules are per se site specific (if necessary).

var moduleInstances = []

var garbageCollectedOnInitialise = false

function initialiseModule (Module, element) {
  // we want old modules garbaged before creating new ones
  if (!garbageCollectedOnInitialise) {
    checkModuleGarbage()
    garbageCollectedOnInitialise = true
    setTimeout(function () {
      garbageCollectedOnInitialise = false
    }, 0)
  }

  var module, moduleInstance
  measureStart()

  // try {
  module = new Module()
  moduleInstance = module.init(element)

  var $element
  if (moduleInstance) {
    $element = $(element)
    $element.data('moduleInstance', moduleInstance)
    moduleInstance.___el = element
    moduleInstances.push(moduleInstance)
    $element.attr('data-has-module', 'true')
  }

  // } catch (error) {
  //  console.error(error.message, error);
  // }

  measureStop(
    moduleInstance ? moduleInstance.ns : module ? module.ns : 'unknown module',
    element
  )
}

function checkModuleGarbage () {
  var elem,
    inst,
    len = moduleInstances.length
  for (var i = len - 1; i >= 0; i--) {
    inst = moduleInstances[i]
    elem = inst.___el
    if (!$.contains(document.documentElement, elem)) {
      try {
        inst.___el = null
        inst.destroy()
      } catch (e) {}
      moduleInstances.splice(i, 1)
    }
  }
}

// an interval to check wether element have been removed from dom
// if so, we'll find the module instance and call its destroy method
if (typeof window !== 'undefined' && window.MutationObserver) {
  ;(function () {
    var target = window.document.body
    var observer = new MutationObserver(function (mutations) {
      var i,
        len = mutations.length
      for (i = 0; i < len; i++) {
        if (mutations[i].removedNodes.length) {
          invalidate()
          break
        }
      }
    })
    var config = { subtree: true, childList: true }
    observer.observe(target, config)

    var timeout
    function invalidate () {
      clearTimeout(timeout)
      timeout = setTimeout(validate, 50)
    }
    function validate () {
      clearTimeout(timeout)
      checkModuleGarbage()
    }
  })()
} else {
  setInterval(checkModuleGarbage, 2500)
}

var measureTime,
  totalTime = 0,
  measureTable = []
function now () {
  return window.performance && performance.now ? performance.now() : new Date()
}
function measureStart () {
  measureTime = now()
}
function measureStop (name, element) {
  totalTime += now() - measureTime
  measureTable.push({
    Module: name,
    Element: element,
    'Time (ms)': Math.round((now() - measureTime) * 10) / 10
  })
}

setTimeout(function () {
  //console.log('Module init took ' + totalTime.toFixed(1) + ' ms')

  if (console.table && measureTable.length > 0) {
    //console.table(measureTable)
  }
  measureTable = []
}, 5000)

export default {
  connect: function (Module, element) {
    initialiseModule(Module, element)
  },
  add: function (M, selector) {
    if (typeof Module === 'string') {
      contextTrigger.add(selector, function () {
        var elem = this
        require([M], function (Module) {
          initialiseModule(Module, elem)
        })
      })
    } else {
      contextTrigger.add(selector, function () {
        var elem = this
        initialiseModule(M, elem)
      })
    }
  },
  checkGarbage: checkModuleGarbage
}
