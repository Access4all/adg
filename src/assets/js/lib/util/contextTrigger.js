/*
 * contextTrigger
 *
 * Binds functions to a certain context that is defined by a DOM Element.
 *
 * Usage:
 *
 * contextTrigger.add( triggerSelector,callback );
 *
 *
 * ---------------------------------------------------------------------------
 *
 * Example:
 *
 * contextTrigger.add("#main", function(){
 *
 *  require(['uxui/util/Frameplayer'], function(F){
 *    console.log(F);
 *  });
 *
 * });
 *
 */
import $ from 'jquery'

export default (() => {
  var contextTrigger

  contextTrigger = {
    events: []
  }

  function TriggerEvent (selector, callback) {
    this.selector = selector
    this.callback = callback
    this.processed = false
  }

  contextTrigger.add = function (selector, callback) {
    contextTrigger.events.push(new TriggerEvent(selector, callback))
    contextTrigger.invalidate()
  }

  contextTrigger.remove = function (selector, callback) {
    var evt
    for (var i = contextTrigger.events.length - 1; i >= 0; i--) {
      evt = contextTrigger.events[i]
      if (evt.selector === selector && evt.callback === callback) {
        contextTrigger.events.splice(i, 1)
        return true
      }
    }
    return false
  }

  // deprecated
  contextTrigger.run = function (context) {
    // override
    // contextTrigger.validate(context);
  }

  contextTrigger.invalidate = function () {
    var me = this
    if (contextTrigger.events.length) {
      if (!this.validationTimeout) {
        this.validationTimeout = setTimeout(function () {
          me.validationTimeout = null
          checkForNewElements()
        }, 50)
      }
    }
  }

  contextTrigger.validate = function (root) {
    var evnt
    var $context
    root = root || 'body'

    var $root = $(root)
    var $absoluteRoot = $(document.body)

    if (!$root.length) {
      return false
    }

    var i, j, k, contextEl, foundInContext, foundElements

    for (i = 0; i < contextTrigger.events.length; i++) {
      evnt = contextTrigger.events[i]
      $context = evnt.processed ? $root : $absoluteRoot // check all dom for newly added callbacks
      evnt.processed = true

      foundElements = []
      for (j = 0; j < $context.length; j++) {
        contextEl = $context[j]
        foundInContext = contextEl.querySelectorAll(evnt.selector)
        for (k = 0; k < foundInContext.length; k++) {
          foundElements.push(foundInContext[k])
        }
      }
      for (j = 0; j < $root.length; j++) {
        contextEl = $root[j]
        if (matches(contextEl, evnt.selector)) {
          foundElements.push(contextEl)
        }
      }

      for (j = 0; j < foundElements.length; j++) {
        contextEl = foundElements[j]
        if (!contextEl.contextTriggerProcessed) {
          evnt.callback.call(contextEl, contextEl)
        }
      }
    }

    // mark items as processed
    for (i = 0; i < $root.length; i++) {
      contextEl = $root[i]
      contextEl.contextTriggerProcessed = true
      foundInContext = contextEl.querySelectorAll('*')
      for (k = 0; k < foundInContext.length; k++) {
        foundInContext[k].contextTriggerProcessed = true
      }
    }
  }

  function matches (el, selector) {
    return (
      el.matches ||
      el.matchesSelector ||
      el.msMatchesSelector ||
      el.mozMatchesSelector ||
      el.webkitMatchesSelector ||
      el.oMatchesSelector
    ).call(el, selector)
  }

  function checkNode (node, result) {
    if (!node.contextTriggerProcessed) {
      result.push(node)
    } else {
      var c = node.firstChild
      while (c) {
        if (c.nodeType === 1) {
          checkNode(c, result)
        }
        c = c.nextSibling
      }
    }
  }

  function checkForNewElements () {
    // first we loop through all dom elements to see if we find at least
    // one element that's not processed yet
    var i
    var all = document.body.querySelectorAll('*')
    var len = all.length
    var any = !document.body.contextTriggerProcessed // also check body
    for (i = 0; !any && i < len; i++) {
      if (!all[i].contextTriggerProcessed) {
        any = true
      }
    }
    if (!any) {
      return
    }

    // only if we find at least one element we're going into the more
    // costly evaluation to find the top elements inserted and process those
    var found = []
    checkNode(document.body, found)

    contextTrigger.validate(found)
  }

  if (typeof window !== 'undefined' && window.MutationObserver) {
    ;(function () {
      var target = window.document.body
      var observer = new MutationObserver(function (mutations) {
        var i,
          len = mutations.length
        for (i = 0; i < len; i++) {
          if (mutations[i].addedNodes.length) {
            contextTrigger.invalidate()
            break
          }
        }
      })
      var config = { subtree: true, childList: true }
      observer.observe(target, config)
    })()
  } else {
    setInterval(function () {
      contextTrigger.invalidate()
    }, 1000)
  }

  return contextTrigger
})()
