/******/ ;(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__ (moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    ) {
      return value
    }
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    })
    /******/ if (mode & 2 && typeof value !== 'string') {
      for (var key in value) {
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key]
          }.bind(null, key)
        )
      }
    }
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault () {
          return module['default']
        }
        : /******/ function getModuleExports () {
          return module
        }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '/' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 7))
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      'use strict'

      // CONCATENATED MODULE: ./src/js/sxQuery/SxQueryObject.js

      var SxQueryObject_SxQueryObject = function SxQueryObject (elems) {
        var _self = this

        var makePureArray = function makePureArray () {
          var pureArray = []

          for (var g = 0; g < elems.length; g++) {
            pureArray.push(elems[g])
          }

          return pureArray
        }

        var _elems = makePureArray()

        var CSS_TO_PIXEL = {
          width: true,
          height: true,
          minWidth: true,
          minHeight: true,
          maxWidth: true,
          padding: true,
          paddingLeft: true,
          paddingRight: true,
          paddingTop: true,
          paddingBottom: true,
          left: true,
          right: true,
          top: true,
          bottom: true,
          borderWidth: true
        }

        this._it = function (callback) {
          for (var i = 0; i < _elems.length; i++) {
            var elem = _elems[i]

            if (elem && callback) {
              callback(elem, i == _elems.length - 1)
            }
          }
        }

        this._canMatch = function (elem) {
          return elem.matches || elem.matchesSelector || elem.msMatchesSelector
        }

        this._match = function (elem, querySelector) {
          return elem.matches
            ? elem.matches(querySelector)
            : elem.matchesSelector
              ? elem.matchesSelector(querySelector)
              : elem.msMatchesSelector(querySelector)
        }
        /* Append or prepend an element */

        this._addNode = function (content, append) {
          var result = []

          if (typeof content === 'string') {
            // parseHtml and append
            result = result.concat(
              this._addNode(js_sxQuery_sxQuery.parseHTML(content), append)
            )
            return result
          } else if (
            content instanceof Array ||
            content instanceof HTMLCollection ||
            content instanceof NodeList
          ) {
            // append each element
            for (
              var i = append ? 0 : content.length - 1;
              append ? i < content.length : i >= 0;
              append ? i++ : i--
            ) {
              result = result.concat(this._addNode(content[i], append))
            }

            return result
          } else if (content instanceof SxQueryObject) {
            // get elements and append those
            result = result.concat(this._addNode(content.get(), append))
            content.clear()
            content.push(result)
            return result
          } else if (
            content instanceof Node ||
            (content !== undefined && content.appendChild && content.cloneNode)
          ) {
            // finally really append
            this._it(function (elem, isLast) {
              var node = !isLast ? content.cloneNode(true) : content
              result.push(node)

              try {
                if (append || !elem.firstChild) {
                  elem.appendChild(node)
                } else {
                  elem.insertBefore(node, elem.firstChild)
                }
              } catch (ex) {
                console.log(ex)
              }
            })

            return result
          }
        }

        this._init = function () {
          for (var i = 0; i < _elems.length; i++) {
            this[i] = _elems[i]
          }
        }

        this._init() // api

        this.length = _elems.length

        this.push = function (arr) {
          _elems = _elems || []
          _elems = _elems.concat(arr)
          this.length = _elems.length
        }

        this.clear = function () {
          _elems = []
          this.length = 0
        }

        this.get = function (idx) {
          if (idx !== undefined) {
            return _elems[idx]
          }

          return _elems
        }

        this.remove = function () {
          this._it(function (elem) {
            if (elem.parentNode) {
              elem.parentNode.removeChild(elem)
            }
          })
        }

        this.each = function (callback) {
          var idx = 0

          this._it(function (elem) {
            callback.call(elem, elem, idx)
            idx++
          })
        }

        this._trigger = function (eventName) {
          var e = undefined

          if (window.CustomEvent) {
            try {
              e = new CustomEvent(eventName)
            } catch (ex) {}
          }

          if (e === undefined) {
            e = document.createEvent('CustomEvent')
            e.initCustomEvent(eventName, true, true, {})
          }

          this._it(function (elem) {
            elem.dispatchEvent(e)
          })
        }

        this.on = function (event, selector, callback) {
          if (callback === undefined) {
            this.on(event, undefined, selector) // selector is actually callback
          } else {
            if (!selector) {
              this._it(function (elem) {
                var events = event.split(',')

                for (var i = 0; i < events.length; i++) {
                  var eventName = events[i]

                  if (eventName.indexOf('.') !== -1) {
                    var nameToKey = eventName.split('.')

                    if (nameToKey.length == 2) {
                      eventName = eventName.trim() // save callback

                      if (!js_sxQuery_sxQuery._callbacksByName[eventName]) {
                        js_sxQuery_sxQuery._callbacksByName[eventName] = []
                      }

                      js_sxQuery_sxQuery._callbacksByName[eventName].push(
                        callback
                      )

                      eventName = nameToKey[0]
                    }
                  }

                  elem.addEventListener(eventName.trim(), callback)
                }
              })
            } else {
              var matches = this._match
              var canMatch = this._canMatch

              var handler = function (canMatch, matches, selector, callback, e) {
                if (!e || !e.target) {
                  return
                }

                if (canMatch(e.target) && matches(e.target, selector)) {
                  // elem triggered the event
                  callback.bind(e.target, e).call()
                } else {
                  // check whether elem child triggered the event
                  var node = e.target

                  while (node.parentNode && canMatch(node.parentNode)) {
                    node = node.parentNode

                    if (canMatch(node) && matches(node, selector)) {
                      callback.bind(e.target, e).call()
                      break
                    }
                  }
                }
              }.bind(this, canMatch, matches)

              this._it(function (elem) {
                var events = event.split(',')

                for (var i = 0; i < events.length; i++) {
                  elem.addEventListener(
                    events[i].trim(),
                    handler.bind(this, selector, callback)
                  )
                }
              })
            }
          }

          return _self
        }

        this.off = function (event, listener) {
          var events = event.split(',')

          if (!events || events.length == 0) {
            return _self
          }

          this._it(function (elem) {
            events.map(function (e) {
              if (e.indexOf('.') === -1) {
                elem.removeEventListener(e.trim(), listener)
              } else if (js_sxQuery_sxQuery._callbacksByName[e.trim()]) {
                var eventName = e.split('.')[0].trim()

                js_sxQuery_sxQuery._callbacksByName[e.trim()].map(function (
                  callback
                ) {
                  elem.removeEventListener(eventName, callback)
                })
              }
            })
          })

          return _self
        }

        this.mouseenter = function (callback) {
          return this.on('mouseenter', callback)
        }

        this.mousedown = function (callback) {
          return this.on('mousedown', callback)
        }

        this.mouseup = function (callback) {
          return this.on('mouseup', callback)
        }

        this.click = function (callback) {
          return this.on('click', callback)
        }

        this.scroll = function (callback) {
          return this.on('scroll', callback)
        }

        this.focus = function (callback) {
          if (callback === undefined) {
            this._it(function (elem) {
              if (elem.focus) {
                elem.focus()
              } else {
                js_sxQuery_sxQuery(elem)._trigger('focus')
              }
            })
          } else {
            this.on('focus', callback)
          }

          return _self
        }

        this.blur = function (callback) {
          if (callback === undefined) {
            this._it(function (elem) {
              if (elem.blur) {
                elem.blur()
              } else {
                js_sxQuery_sxQuery(elem)._trigger('blur')
              }
            })
          } else {
            this.on('blur', callback)
          }

          return _self
        }

        this.keydown = function (callback) {
          return this.on('keydown', callback)
        }

        this.keyup = function (callback) {
          return this.on('keyup', callback)
        }

        this.focusout = function (callback) {
          return this.on('focusout', callback)
        }

        this.find = function (querySelector) {
          var result = []

          this._it(function (elem) {
            var found = js_sxQuery_sxQuery.querySelectorAll(querySelector, elem)

            for (var i = 0; i < found.length; i++) {
              result.push(found[i])
            }
          })

          return js_sxQuery_sxQuery(result)
        }

        this.children = function () {
          var result = []

          this._it(function (elem) {
            for (var i = 0; i < elem.childElementCount; i++) {
              result.push(elem.children[i])
            }
          })

          return js_sxQuery_sxQuery(result)
        }

        this.is = function (node) {
          for (var i = 0; i < _elems.length; i++) {
            var el = _elems[i]

            if (el === node) {
              return true
            }
          }

          return false
        }

        this.text = function (text) {
          if (text == undefined) {
            var result = ''

            this._it(function (elem) {
              result += elem.textContent || ''
            })

            return result
          } else {
            this._it(function (elem) {
              elem.innerText = text
            })

            return _self
          }
        }

        this.position = function () {
          if (_elems.length > 0) {
            var elem = _elems[0]
            var $elem = js_sxQuery_sxQuery(elem)
            var offset

            if ($elem.css('position') == 'fixed') {
              offset = elem.getBoundingClientRect()
            } else {
              var offsetParent = elem.offsetParent
              var $offsetParent = js_sxQuery_sxQuery(offsetParent)
              var parentOffset = {
                top: 0,
                left: 0
              }
              offset = $elem.offset()

              if (offsetParent.nodeName != 'html') {
                parentOffset = $offsetParent.offset()
              }

              parentOffset.top += parseFloat(
                $offsetParent.css('borderTopWidth')
              )
              parentOffset.left += parseFloat(
                $offsetParent.css('borderLeftWidth')
              )
              offset.top =
                offset.top -
                parentOffset.top -
                parseFloat($elem.css('marginTop'))
              offset.left =
                offset.left -
                parentOffset.left -
                parseFloat($elem.css('marginLeft'))
            }

            return offset
          }
        }

        this.attr = function (key, value) {
          if (value === undefined) {
            if (_elems.length > 0) {
              return _elems[0].getAttribute(key)
            }
          } else {
            this._it(function (elem) {
              if (value !== null) {
                elem.setAttribute(key, value)
              } else {
                elem.removeAttribute(key)
              }
            })
          }
        }

        this.removeAttribute = function (key) {
          if (key) {
            this._it(function (el) {
              if (el.removeAttribute) {
                el.removeAttribute(key)
              }
            })
          }
        }

        this.hide = function () {
          this._it(function (elem) {
            elem.style.display = 'none'
          })
        }

        this.show = function () {
          this._it(function (elem) {
            elem.style.display = ''
          })
        }

        this.data = function (key, value) {
          if (value === undefined) {
            if (_elems.length > 0) {
              return _elems[0].dataset[key]
            }

            return undefined
          } else {
            this._it(function (el) {
              if (value === null) {
                delete el.dataset[key]
              } else {
                el.dataset[key] = value
              }
            })

            return this
          }
        }

        this.addClass = function (className) {
          var classElems = className.split(' ')

          this._it(function (elem) {
            for (var i = 0; i < classElems.length; i++) {
              if (elem.classList) {
                elem.classList.add(classElems[i])
              } else {
                elem.className += ' ' + classElems[i]
              }
            }
          })

          return this
        }

        this.removeClass = function (className) {
          var classElems = className.split(' ')

          this._it(function (elem) {
            for (var i = 0; i < classElems.length; i++) {
              if (elem.classList) {
                elem.classList.remove(classElems[i])
              } else {
                elem.className = elem.className.replace(
                  new RegExp(
                    '(^|\\b)' + classElems[i].split(' ').join('|') + '(\\b|$)',
                    'gi'
                  ),
                  ' '
                )
              }
            }
          })

          return this
        }

        this.toggleClass = function (className) {
          if (this.hasClass(className)) {
            this.removeClass(className)
          } else {
            this.addClass(className)
          }
        }

        this.hasClass = function (className) {
          for (var i = 0; i < _elems.length; i++) {
            // not using _it to be able to break the loop
            var elem = elems[i]

            if (!elem) {
              continue
            }

            if (elem.classList) {
              if (elem.classList.contains(className)) {
                return true
              }
            } else {
              if (
                new RegExp('(^| )' + className + '( |$)', 'gi').test(
                  elem.className
                )
              ) {
                return true
              }
            }
          }

          return false
        }
        /* Returns new SxQueryObject containing filtered elements */

        this.filter = function (validator) {
          return js_sxQuery_sxQuery(this.get().filter(validator))
        }

        this.val = function (value) {
          if (value !== undefined) {
            this._it(function (elem) {
              elem.value = value
            })

            return this
          } else if (_elems.length > 0) {
            return _elems[0].value
          }
        }

        this.css = function (key, value) {
          key = key.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase()
          })

          if (value !== undefined) {
            if (value !== null) {
              var valueString = value.toString()

              if (
                CSS_TO_PIXEL[key] &&
                valueString !== 'auto' &&
                valueString.indexOf('px') === -1 &&
                valueString.indexOf('%') === -1 &&
                valueString.indexOf('calc') === -1 &&
                value !== 0 &&
                value !== ''
              ) {
                value = value.toString()
                value += 'px'
              }
            }

            this._it(function (elem) {
              elem.style[key] = value
            })
          } else if (_elems.length > 0) {
            for (var i = 0; i < _elems.length; i++) {
              try {
                return window.getComputedStyle(_elems[i])[key]
              } catch (e) {}
            }

            return null
          }
        }

        this.append = function (content) {
          this._addNode(content, true)

          return this
        }

        this.prepend = function (content) {
          this._addNode(content, false)

          return this
        }

        this.parent = function () {
          var result = []

          this._it(function (elem) {
            result.push(elem.parentNode)
          })

          return js_sxQuery_sxQuery(result)
        }

        this.parents = function (querySelector) {
          var result = []
          var scope = this

          this._it(function (elem) {
            var parent = elem.parentNode

            while (parent && scope._canMatch(parent)) {
              if (
                querySelector === undefined ||
                scope._match(parent, querySelector)
              ) {
                result.push(parent)
              }

              parent = parent.parentNode
            }
          })

          return result
        }

        this.prev = function () {
          var result = []

          this._it(function (elem) {
            result.push(elem.previousElementSibling)
          })

          return js_sxQuery_sxQuery(result)
        }

        this.next = function () {
          var result = []

          this._it(function (elem) {
            result.push(elem.nextElementSibling)
          })

          return js_sxQuery_sxQuery(result)
        }

        this.closest = function (querySelector) {
          var result = []
          var scope = this

          this._it(function (elem) {
            var tested = elem

            while (
              tested &&
              scope._canMatch(tested) &&
              !scope._match(tested, querySelector)
            ) {
              tested = tested.parentNode
            }

            if (!scope._canMatch(tested)) {
              tested = undefined
            }

            result.push(tested)
          })

          return js_sxQuery_sxQuery(result)
        }

        this.index = function (htmlNode) {
          for (var i = 0; i < _elems.length; i++) {
            if (_elems[i] === htmlNode) {
              return i
            }
          }

          return -1
        }

        this.offset = function () {
          if (_elems.length > 0) {
            var elem = _elems[0]

            if (!elem.getClientRects().length) {
              return {
                top: 0,
                left: 0
              }
            }

            var rect = elem.getBoundingClientRect()
            var win = elem.ownerDocument.defaultView
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            }
          }
        }

        this.outerWidth = function () {
          if (_elems.length > 0) {
            return _elems[0].offsetWidth
          }
        }

        this.height = function (val) {
          if (val !== null && val !== undefined) {
            if (
              val.toString().indexOf('px') == -1 &&
              val.toString().indexOf('%') == -1 &&
              val !== 'auto'
            ) {
              val = val.toString() + 'px'
            }

            this.css('height', val)
          } else {
            return parseFloat(this.css('height'))
          }
        }

        this.outerHeight = function () {
          if (_elems.length > 0) {
            return _elems[0].offsetHeight
          }
        }

        this.html = function (data) {
          if (data !== undefined) {
            this.empty()
            this.append(data)
          } else if (_elems.length > 0) {
            return _elems[0].innerHTML
          }
        }

        this.empty = function () {
          this._it(function (elem) {
            while (elem.firstChild) {
              elem.removeChild(elem.firstChild)
            }
          })
        }

        this.scrollTop = function (val) {
          if (val !== undefined) {
            this._it(function (elem) {
              if (elem.scrollTop !== undefined) {
                elem.scrollTop = val
              } else if (
                elem.scrollY !== undefined &&
                elem.scrollTo !== undefined
              ) {
                elem.scrollTo(elem.scrollX, val)
              }
            })
          } else if (_elems.length > 0) {
            return _elems[0].scrollTop !== undefined
              ? _elems[0].scrollTop
              : _elems[0].scrollY
          }
        }

        this.ready = function (fn) {
          this._it(function (elem) {
            if (
              elem.attachEvent
                ? elem.readyState === 'complete'
                : elem.readyState !== 'loading'
            ) {
              fn()
            } else {
              elem.addEventListener('DOMContentLoaded', fn)
            }
          })
        }
        /**
         * ~ jQuery(elem).is(":visible");
         */

        this.isVisible = function () {
          if (_elems.length > 0) {
            return js_sxQuery_sxQuery(_elems[0]).css('display') !== 'none'
          }
        }

        this.map = function (callback) {
          var result = []
          var i = 0

          this._it(function (elem) {
            result.push(callback(i, elem))
            i++
          })

          return result
        }

        this._animate = function (
          el,
          animationType,
          duration,
          cosParameter,
          setter,
          callback
        ) {
          var count = 0
          var last = +new Date()

          var tick = function tick () {
            var current = new Date()
            count += Math.PI / (duration / (current - last))
            var val = cosParameter + cosParameter * Math.cos(count)
            setter(el, val)
            last = +new Date()

            if (count >= Math.PI) {
              if (callback !== undefined && typeof callback === 'function') {
                callback(el)
              }
            } else {
              js_sxQuery_sxQuery._notifyAnimation(
                el,
                animationType,
                js_sxQuery_sxQuery._requestAnimation(tick)
              )
            }
          }

          js_sxQuery_sxQuery._notifyAnimation(
            el,
            animationType,
            js_sxQuery_sxQuery._requestAnimation(tick)
          )
        } // animations

        this._fade = function (out, duration, callback) {
          var factor = out ? -1 : 1

          var setter = function setter (el, val) {
            if (el == undefined || val == undefined) {
              return
            }

            el.style.opacity = factor > 0 ? 1 - val : val
          }

          var completeCallback = function completeCallback (el) {
            var $el = js_sxQuery_sxQuery(el)
            $el.css('opacity', '')

            if (out) {
              $el.hide()
            }

            if (callback && typeof callback === 'function') {
              callback.bind($el).call()
            }
          }

          var scope = this

          this._it(function (el) {
            js_sxQuery_sxQuery._clearAnimation(el, 'fade')

            if (duration != 0 && !js_sxQuery_sxQuery.prefersReducedMotion()) {
              scope._animate(
                el,
                'fade',
                duration || 400,
                0.5,
                setter,
                completeCallback
              )
            } else {
              completeCallback(el)
            }
          })
        }

        this.fadeIn = function (duration, callback, displayType) {
          if (displayType === undefined || displayType != 'flex') {
            this.css('display', 'block')
          } else {
            this._it(function (el) {
              var $el = js_sxQuery_sxQuery(el)
              var style = $el.attr('style')

              if (style.length > 0 && style[style.length - 1] != ';') {
                style += ';'
              }

              style +=
                'display: -ms-flexbox;display: -webkit-flex;display: flex;'
              $el.attr('style', style)
            })
          }

          this._it(function (el) {
            el.style.opacity = 0
          })

          this._fade(false, duration, callback)
        }

        this.fadeOut = function (duration, callback) {
          this._it(function (el) {
            el.style.opacity = 1
          })

          this._fade(true, duration, callback)
        }

        this._slide = function (up, duration, callback) {
          var scope = this

          var completeCallback = function completeCallback (el) {
            var $el = js_sxQuery_sxQuery(el)
            $el.css('height', '')

            if (up) {
              $el.hide()
            }

            if (callback && typeof callback === 'function') {
              callback.bind($el).call()
            }
          } // .bind(this, up, callback);

          var setter = function setter (up, height, el, val) {
            if (el == undefined || val == undefined) {
              return
            }

            var nHeight = up ? val : height - val
            el.style.height = nHeight + 'px'
          }

          this._it(function (el) {
            js_sxQuery_sxQuery._clearAnimation(el, 'slide')

            if (duration != 0 && !js_sxQuery_sxQuery.prefersReducedMotion()) {
              var $el = js_sxQuery_sxQuery(el)
              var height = $el.outerHeight()
              $el.css('height', 0)
              var cosParam = height / 2

              scope._animate(
                el,
                'slide',
                duration || 400,
                cosParam,
                function (el, val) {
                  setter(up, height, el, val)
                },
                completeCallback
              )
            } else {
              completeCallback(el)
            }
          })
        }

        this.slideDown = function (duration, callback) {
          this.css('display', 'block')

          this._slide(false, duration, callback)
        }

        this.slideUp = function (duration, callback) {
          this._it(function (el) {
            var $el = js_sxQuery_sxQuery(el)
            $el.css('height', $el.outerHeight())
          })

          this._slide(true, duration, callback)
        }

        this.animateScrollTop = function (target, duration) {
          var scope = this
          duration = duration || 400

          var setter = function setter (startVal, target, el, newVal) {
            if (target >= startVal) {
              el.scrollTop = startVal + (Math.abs(startVal - target) - newVal)
            } else {
              el.scrollTop = target + newVal
            }
          }

          this._it(function (el) {
            var startVal = el.scrollTop
            var range = Math.abs(startVal - target)

            js_sxQuery_sxQuery._clearAnimation(el, 'scrollTop')

            if (
              range < 1 ||
              duration == 0 ||
              js_sxQuery_sxQuery.prefersReducedMotion()
            ) {
              el.scrollTop = target
              return
            }

            var cosParameter = range / 2

            scope._animate(
              el,
              'scrollTop',
              duration || 400,
              cosParameter,
              setter.bind(this, startVal, target)
            )
          })
        }

        this.animateTop = function (target, duration) {
          var scope = this

          var completeCallback = function (target, el) {
            js_sxQuery_sxQuery(el).css('top', target)
          }.bind(this, target)

          var setter = function setter (startVal, trgt, el, nVal) {
            var val

            if (trgt >= startVal) {
              val = nVal

              if (startVal < 0) {
                val *= -1
              }
            } else {
              if (trgt < 0) {
                val = trgt + nVal
              } else {
                val = nVal + startVal
              }
            }

            js_sxQuery_sxQuery(el).css('top', val + 'px')
          }

          this._it(function (el) {
            js_sxQuery_sxQuery._clearAnimation(el, 'positionTop')

            if (duration == 0 || js_sxQuery_sxQuery.prefersReducedMotion()) {
              completeCallback(el)
              return
            }

            var $el = js_sxQuery_sxQuery(el)
            var crnt = parseFloat($el.css('top'))
            var isInPercent = target.indexOf('%') !== 0
            var trgt

            if (isInPercent) {
              var parentHeight
              var position = $el.css('position')

              if (position == 'fixed') {
                parentHeight = window.innerHeight
              } else {
                parentHeight = parseFloat($el.parent().css('height'))
              }

              var multiplier = parseFloat(target) / 100
              trgt = multiplier * parentHeight
            } else {
              trgt = parseFloat(target)
            }

            var range = Math.abs(crnt - trgt)
            var cosParameter = range / 2

            scope._animate(
              el,
              'positionTop',
              duration || 400,
              cosParameter,
              setter.bind(this, crnt, trgt),
              completeCallback
            )
          })
        } // highlighting function

        this.highlight = function (pat, className) {
          function innerHighlight (node, pat) {
            if (
              js_sxQuery_sxQuery(node).parents('.' + className).length !== 0
            ) {
              return 1
            }

            var skip = 0

            if (node.nodeType == 3) {
              var pos = node.data.toUpperCase().indexOf(pat)
              pos -=
                node.data.substr(0, pos).toUpperCase().length -
                node.data.substr(0, pos).length

              if (pos >= 0) {
                var spannode = document.createElement('span')
                spannode.className = className
                var middlebit = node.splitText(pos)
                var endbit = middlebit.splitText(pat.length) //  don't delete this line!

                var middleclone = middlebit.cloneNode(true)
                spannode.appendChild(middleclone)
                middlebit.parentNode.replaceChild(spannode, middlebit)
                skip = 1
              }
            } else if (
              node.nodeType == 1 &&
              node.childNodes &&
              !/(script|style)/i.test(node.tagName)
            ) {
              for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat)
              }
            }

            return skip
          }

          return this.length && pat && pat.length && pat.length > 2
            ? this._it(function (elem) {
              innerHighlight(elem, pat.toUpperCase())
            })
            : this
        }
      }

      /* harmony default export */ var sxQuery_SxQueryObject = SxQueryObject_SxQueryObject
      // CONCATENATED MODULE: ./src/js/sxQuery/sxQuery.js

      function _typeof (obj) {
        if (
          typeof Symbol === 'function' &&
          typeof Symbol.iterator === 'symbol'
        ) {
          _typeof = function _typeof (obj) {
            return typeof obj
          }
        } else {
          _typeof = function _typeof (obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }
        }
        return _typeof(obj)
      }

      var sxQuery_sxQuery = function sxQuery (data) {
        var isWindow = false

        try {
          isWindow = data instanceof Window || data === window
        } catch (e) {
          isWindow = window.constructor
            ? data instanceof window.constructor
            : data === window
        }

        if (typeof data === 'string') {
          var parsedHTML = sxQuery.parseHTML(data)

          if (parsedHTML.length === 0) {
            return new sxQuery_SxQueryObject(sxQuery.querySelectorAll(data))
          } else {
            return new sxQuery_SxQueryObject(parsedHTML)
          }
        } else if (
          data instanceof Node ||
          data === document ||
          (data !== undefined && data.appendChild && data.cloneNode)
        ) {
          return new sxQuery_SxQueryObject([data])
        } else if (
          data instanceof Array ||
          data instanceof HTMLCollection ||
          data instanceof NodeList
        ) {
          if (
            data instanceof Array &&
            data.reduce(function (acc, node) {
              return acc && typeof node === 'string'
            }, true)
          ) {
            // array of html strings
            return new sxQuery_SxQueryObject(
              data.map(function (item) {
                return sxQuery.parseHTML(item)
              })
            )
          } else {
            return new sxQuery_SxQueryObject(data)
          }
        } else if (isWindow) {
          return new sxQuery_SxQueryObject([data])
        } else if (data instanceof sxQuery_SxQueryObject) {
          return new sxQuery_SxQueryObject(data.get())
        } else {
          return new sxQuery_SxQueryObject([]) //
        }
      } // private methods and properties

      sxQuery_sxQuery._animations = {}
      sxQuery_sxQuery._callbacksByName = {}
      sxQuery_sxQuery._animationNodeFlag = 0

      sxQuery_sxQuery._notifyAnimation = function (node, type, id) {
        if (!node.sxQueryAnimationFlag) {
          node.sxQueryAnimationFlag = sxQuery_sxQuery._animationNodeFlag
          sxQuery_sxQuery._animationNodeFlag++
          sxQuery_sxQuery._animations[node.sxQueryAnimationFlag] = {}
        }

        sxQuery_sxQuery._animations[node.sxQueryAnimationFlag][type] = id
      }

      sxQuery_sxQuery._clearAnimation = function (node, type) {
        var flg = node.sxQueryAnimationFlag

        if (
          flg !== undefined &&
          sxQuery_sxQuery._animations[flg] !== undefined &&
          type in sxQuery_sxQuery._animations[flg]
        ) {
          sxQuery_sxQuery._stopAnimation(sxQuery_sxQuery._animations[flg][type])
        }
      }

      sxQuery_sxQuery._requestAnimation = function (tick) {
        return (
          (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
          setTimeout(tick, 16)
        )
      }

      sxQuery_sxQuery._stopAnimation = function (id) {
        if (!window.cancelAnimationFrame || !window.cancelAnimationFrame(id)) {
          clearTimeout(id)
        }
      } // dom independent public methods

      sxQuery_sxQuery.inArray = function (item, array) {
        return array.indexOf(item)
      }
      /**
       * Loops through array or object keys and calls the callback - with index and value in case of array, with key and value in case of object.
       *
       * @param data - object or array
       * @param callback - callback to call
       * @returns {*} - data
       */

      sxQuery_sxQuery.each = function (data, callback) {
        if (data instanceof Array) {
          // array
          data.forEach(function (item, i) {
            if (callback && typeof callback === 'function') {
              callback(i, item)
            }
          })
        } else {
          // object
          var idx = 0

          for (var i in data) {
            if (data.hasOwnProperty && data.hasOwnProperty(i)) {
              if (callback && typeof callback === 'function') {
                callback(i, data[i], idx)
              }

              idx++
            }
          }
        }

        return data
      }

      sxQuery_sxQuery.indexInNodeList = function (el, arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == el) {
            return i
          }
        }

        return -1
      } // creating and reading cookies

      sxQuery_sxQuery.createCookie = function (name, value, days) {
        var expires

        if (days) {
          var date = new Date()
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
          expires = '; expires=' + date.toGMTString()
        } else {
          expires = ''
        }

        document.cookie =
          encodeURIComponent(name) +
          '=' +
          encodeURIComponent(value) +
          expires +
          '; path=/'
      }

      sxQuery_sxQuery.readCookie = function (name) {
        var nameEQ = encodeURIComponent(name) + '='
        var ca = document.cookie.split(';')

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]

          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
          }

          if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length))
          }
        }

        return null
      }

      sxQuery_sxQuery.linkOpensInNewTab = function (event) {
        return (
          event.ctrlKey || // CTRL
          event.which == 2 ||
          event.button == 4 || // middle mouse click
          (event.target &&
            event.target.target &&
            event.target.target == '_blank')
        ) // target="_blank"
      }
      /**
       * @param type - one of ['max','min']
       */

      sxQuery_sxQuery.matchesMediaQuery = function (type, breakpoint) {
        if (window.matchMedia) {
          var mQuery =
            type == 'max'
              ? '(max-width: ' + breakpoint + 'px)'
              : '(min-width: ' + breakpoint + 'px)'
          return window.matchMedia(mQuery).matches
        }

        var w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth

        if (type == 'max') {
          return w <= parseInt(breakpoint)
        }

        return w >= parseInt(breakpoint)
      }

      sxQuery_sxQuery.parseHTML = function (str) {
        var tmp = document.implementation.createHTMLDocument('')
        tmp.body.innerHTML = str
        var res = []

        for (var i = 0; i < tmp.body.children.length; i++) {
          res.push(document.importNode(tmp.body.children[i], true))
        }

        return res
      }
      /**
       * Deep extend
       * @param out the output object
       * @param [,object1][,objectN]
       */

      sxQuery_sxQuery.extend = function (out) {
        var output = out || {}

        for (var i = 1; i < arguments.length; i++) {
          if (arguments[i]) {
            for (var key in arguments[i]) {
              if (
                arguments[i].hasOwnProperty(key) &&
                arguments[i][key] !== undefined
              ) {
                if (
                  sxQuery_sxQuery.isObject(output[key]) &&
                  sxQuery_sxQuery.isObject(arguments[i][key])
                ) {
                  output[key] = sxQuery_sxQuery.extend(
                    output[key],
                    arguments[i][key]
                  )
                } else {
                  output[key] = arguments[i][key]
                }
              }
            }
          }
        }

        return output
      }

      sxQuery_sxQuery.isObject = function (el) {
        return (
          el !== undefined && _typeof(el) == 'object' && !(el instanceof Array)
        )
      }

      sxQuery_sxQuery.ajax = function (dataObject) {
        dataObject = dataObject || {}
        var method = dataObject.method || 'GET'
        var dataType = dataObject.dataType
        var url = dataObject.url

        var success = dataObject.success || function () {}

        var error = dataObject.error || function () {}

        var forceXDR = 'XDomainRequest' in window
        var request = forceXDR ? new XDomainRequest() : new XMLHttpRequest()
        request.open(
          method,
          forceXDR ? url.replace('https://', '//') : url,
          true
        )

        request.onload = function () {
          if (forceXDR || (request.status >= 200 && request.status < 400)) {
            var response = request.responseText

            if (!dataType || dataType === 'json') {
              try {
                success(JSON.parse(response))
              } catch (e) {
                console.warn(e)
                success(response)
              }
            }
          } else {
            // mmmmm...
          }
        }

        request.onerror = function () {
          error(request.status, request.statusText)
        }

        var send = function send () {
          try {
            if (method !== 'POST') {
              request.send()
            } else {
              var data = ''
              sxQuery_sxQuery.each(dataObject.data, function (key, value) {
                data += key + '=' + value + '&'
              })

              if (data.length > 0) {
                data = data.substring(0, data.length - 1)
              }

              request.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded; charset=UTF-8'
              )
              request.send(data)
            }
          } catch (e) {
            error(request.status, request.statusText, e)
          }
        }

        if (forceXDR) {
          setTimeout(send, 0)
        } else {
          send()
        }
      }

      sxQuery_sxQuery.get = function (url, success, error, dataType) {
        sxQuery_sxQuery.ajax({
          url: url,
          success: success,
          error: error,
          dataType: dataType
        })
      }

      sxQuery_sxQuery.post = function (url, data, success, dataType) {
        sxQuery_sxQuery.ajax({
          url: url,
          success: success,
          dataType: dataType,
          method: 'POST',
          data: data
        })
      } // no invert support

      sxQuery_sxQuery.grep = function (array, filter) {
        var result = []

        for (var i = 0; i < array.length; i++) {
          if (filter(array[i])) {
            result.push(array[i])
          }
        }

        return result
      }

      sxQuery_sxQuery.querySelectorAll = function (data, node) {
        node = node || document
        var matches = [] // get just first element for id-only query - same behavior as jQuery

        if (
          data.indexOf('#') === 0 &&
          data.indexOf(' ') == -1 &&
          data.indexOf('.') == -1 &&
          data.indexOf(':') == -1 &&
          data.indexOf('>') !== -1
        ) {
          var found = node.getElementById
            ? node.getElementById(data.replace('#', ''))
            : node.querySelector(data)

          if (found) {
            matches.push(found)
          }

          return matches
        }

        if (data.indexOf(':first') !== -1 || data.indexOf(':visible') !== -1) {
          // handle jQuery-like :first and :visible
          var partialQueries = data.split(' ')

          for (var i = 0; i < partialQueries.length; i++) {
            var query = partialQueries[i]
            var justFirst = false
            var justVisible = false

            if (query.indexOf(':first') !== -1) {
              justFirst = true
              query = query.replace(':first', '')
            } else if (query.indexOf(':visible') !== -1) {
              justVisible = true
              query = query.replace(':visible', '')
            }

            matches =
              matches.length === 0
                ? sxQuery_sxQuery(node).find(query)
                : matches.find(query)

            if (justFirst && matches.length > 0) {
              matches = sxQuery_sxQuery(matches[0])
            } else if (justVisible && matches.length > 0) {
              matches = matches.filter(function (m) {
                return sxQuery_sxQuery(m).isVisible()
              })
            }
          }

          matches = matches.get()
        } else if (data) {
          matches = node.querySelectorAll(data)
        }

        return matches
      }

      sxQuery_sxQuery.prefersReducedMotion = function () {
        return (
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
      }

      sxQuery_sxQuery.srOnlyCss =
        'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0'
      var sxQuery_handler = {
        set: function set (obj, prop, value) {
          sxQuery_SxQueryObject.prototype[prop] = value
          return true
        }
      }

      try {
        sxQuery_sxQuery.fn = new Proxy({}, sxQuery_handler)
      } catch (e) {
        // proxy not supported --> IE
        sxQuery_sxQuery.fn = sxQuery_SxQueryObject.prototype
      }

      /* harmony default export */ var js_sxQuery_sxQuery = (__webpack_exports__[
        'a'
      ] = sxQuery_sxQuery)

      /***/
    },
    /* 1 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      var SvgMagnifierIcon = {
        ICON:
          '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
      }
      /* harmony default export */ __webpack_exports__['a'] = SvgMagnifierIcon

      /***/
    },
    /* 2 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      /* harmony import */ var _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        0
      )
      /* harmony import */ var _siteSearch_ui_SvgMagnifierIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        1
      )

      var UniBox = function UniBox () {
        /// / common vars
        // index of selected entry
        var selectedEntryIndex = -1 // the search box

        var searchBox // the search box's parent

        var searchBoxParent // the suggest box

        var suggestBox // the URL where to get the search suggests

        var suggestUrl = '' // the root path to the instant visual feedback images

        var ivfImagePath = '' // the vertical offset of the ivf images

        var ivfImageOffset = -80 // if an image is missing, hide it (undefined) or show a placeholder image

        var missingErrorImage // the number of ms before the update of the search box is triggered

        var throttleTime // the list of all selectable divs

        var selectables = [] // whether the search words should be highlighted in the results

        var highlight = true // extra HTML code that is shown in each search suggest

        var extraHtml // extra HTML code by key, overrides extraHtml

        var dataPoints // callback function to run code on each suggest line, parameters are lineCallback(currentLineString, index, suggestObject)

        var lineCallback // general animation speed

        var animationSpeed = 300 // the headline of the query visualization

        var queryVisualizationHeadline = '' // the minimum input before the suggest pops up

        var minChars = 2 // the action that should happen if enter is pressed, takes three arguments - query, the pressed search button and function which hides the mobile suggestions

        var enterCallback // the action that should happen if enter is pressed when a suggest result is selected

        var enterCallbackResult // the action that should happen after each registered key stroke in the search field (other than enter)

        var typeCallback // a callback for on focus events on the search box

        var focusCallback // a callback for on blur events on the search box

        var blurCallback // a callback called after the suggestion block is built (and not rendered yet), takes the suggestion box and server response as arguments

        var suggestsBuiltCallback // a mapping of callback type to certain callback intended for external tracking (callback types: 'select', 'show', 'abandon')

        var trackingCallbacks // the placeholder for the input field

        var placeholder // the words that were highlighted above the search bar

        var ivfWords = [] // where to show the ivf

        var instantVisualFeedback = 'all' // remember the last key stroke to avoid showing the suggests after enter

        var lastKeyCode = -1 // remember the last data object we got from the server in case we need to reuse it

        var lastData = undefined // remember the last input, this is important because requests are asynchronous,
        // if we search for "sam" (takes 2 seconds) and then keep typing to search for "samsonite" (takes 1 second) the
        // results for the previous input will come in later and replace the results for "samsonite"

        var currentInput = '' // show 'delete all' (x) button when focus hits back to input field

        var showDeleteAllButton = false // sort suggests by this array, if empty, use given array order

        var suggestOrder = [] // move through selectables by this cluster order. if empty, use naturally given order by selectables

        var suggestSelectionOrder = [] // the maximum width of the suggest box, default: as wide as the input box

        var maxWidth = undefined // the content to show when no suggests are available, if undefined, no suggests will be shown

        var noSuggests = undefined // whether to show images

        var showImagesSuggestions = true // empty query suggests, if someone clicks in the search field, we can show suggests

        var emptyQuerySuggests = undefined // the content to show if there exist another more complete search page

        var showMoreResults = undefined // disable click event propagation to HTML element

        var disableEventPropagationHtml = true // whether to scroll the page in order for the search box to be to the top of the window (on screens below 768 px)

        var mobileScrollOnFocus = true // whether to show fullscreen search box + suggest box on search field focus when the viewport width is below specified breakpoint, default: false

        var useSpecialMobileSuggest = undefined // the maximum width of device, where special mobile suggestion should be shown, default: 768

        var specialMobileSuggestBreakpoint = undefined // html/string to be shown when there are no suggest results in special mobile suggest box

        var specialMobileSuggestPlaceholder = undefined // special search box placeholder text

        var specialMobileSearchBoxPlaceholder = undefined // html/string to be shown at the top of the page when special mobile suggests are visible

        var specialMobileSuggestLogoTemplate = undefined // whether to animate transition into special mobile suggestions

        var animateSpecialMobileSuggestTransitions = undefined // whether to resize mobile special input block (search field + icons) on special mobile suggest box scroll

        var resizeSpecialMobileSuggestOnScroll = undefined // whether to hide the mobile layer automatically on search submission, if set to false, the enterCallback becomes a hideLayer callback as 3rd parameter, which has to be called in order to hide the mobile suggestions

        var autoHideSpecialMobileSuggest = true // a callback that is called after the special mobile suggestions have been hidden

        var specialMobileHiddenCallback = undefined // holds default special unibox values relevant for scrolling behavior (initialized when unibox special is shown by getting css properties)

        var specialScrollSettings = {} // whether to keep searchSuggestions on focus out (intended to keep suggestions open on longer selectable click)

        var keepSuggests = false // callback to trigger after suggestion set is changed

        var suggestChangeCallback = undefined // markup for heading element

        var headingElement = 'h4' // label for search field

        var searchFieldLabel = '' // Apple iOS bug: no keyCode in keyup event, we save it here on keyDown event

        var savedKeyCodeOnKeyDown = undefined // text to announce @screenreader after search suggestions have been hidden

        var srSuggestionsHiddenText = 'Search suggestions are hidden' // text to announce @screenreader if no suggestions are available

        var srNoSuggestionsText = 'No search suggestions' // text to announce @screenreader after search suggestions have been shown

        var srSuggestionsCountText = '#COUNT# search suggestions shown' // text to announce @screenreader after search suggestion have been shown

        var srOneSuggestionText = '#COUNT# search suggestion shown' // text to announce @screenreader after search input is focused - describes controls

        var srSuggestBoxControlDescription =
          'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.' // callback to trigger before search suggests are fetched

        var preSuggestCallback = undefined // label of the 'View All' button

        var viewAllLabel = undefined // whether to show suggestions @767px and smaller

        var showOnMobile = true // the loader selector

        var loaderSelector = undefined // mapping of suggestion group key to view key

        var viewKeyMappings = undefined // theme color, used for magnifier icon when using 'View All' button

        var themeColor = undefined
        var isEnabled = true
        var forceBelow = false // selector for special mobile suggest trigger

        var specialMobileTrigger = undefined
        var entityMap = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;'
        } // hide the search suggests

        function resetSuggests (event) {
          event = event || window.event

          if (event !== undefined) {
            var keyCode = event.keyCode || event.which

            if (
              keyCode !== undefined &&
              keyCode === 0 &&
              savedKeyCodeOnKeyDown !== undefined
            ) {
              keyCode = savedKeyCodeOnKeyDown
              savedKeyCodeOnKeyDown = undefined
            }

            var inputText = getSearchBox().val() // hide if escape, or enter was pressed

            if (
              keyCode === 27 ||
              keyCode === 13 ||
              (inputText.length < minChars && emptyQuerySuggests === undefined)
            ) {
              savedKeyCodeOnKeyDown = undefined // reset

              hideSuggests(event)

              if (
                keyCode === 13 &&
                enterCallback !== undefined &&
                selectedEntryIndex === -1
              ) {
                if (
                  shouldUseSpecialSuggestBox() &&
                  loaderSelector !== undefined &&
                  autoHideSpecialMobileSuggest === false
                ) {
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(loaderSelector).css('z-index', '9999999')
                }

                enterCallback.call(
                  this,
                  inputText,
                  undefined,
                  shouldUseSpecialSuggestBox() &&
                  autoHideSpecialMobileSuggest === false
                    ? function () {
                      hideSpecialSuggest()

                      if (loaderSelector !== undefined) {
                        Object(
                          _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                          ]
                        )(loaderSelector).css('z-index', '')
                      }
                    }
                    : undefined
                )

                if (autoHideSpecialMobileSuggest !== false) {
                  hideSpecialSuggest()
                }
              }

              selectedEntryIndex = -1
            }
          } else {
            hideSuggests(event)
            selectedEntryIndex = -1
          }
        }

        function hideSuggests (e) {
          var suggestBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-suggest-box')

          if (isEnabled) {
            searchBox.attr('aria-expanded', 'false')
            var statusElement = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-status-message')
            var contentText = srSuggestionsHiddenText

            if (statusElement.text() !== contentText) {
              statusElement.text(contentText)
            }

            searchBox.removeAttribute('aria-activedescendant')
          } // only call blur callback here when suggest box was really shown

          if (
            blurCallback !== undefined &&
            suggestBox.hasClass('uniboxActive')
          ) {
            try {
              blurCallback.call(this, e, searchBox.val(), false)
            } catch (ex) {
              console.log(ex)
            }
          }

          suggestBox.removeClass('uniboxActive')

          if (!shouldUseSpecialSuggestBox()) {
            // do nothing for mobile suggest box
            suggestBox.slideUp(animationSpeed)
          }

          clearIvf()
        }

        function throttle (f, delay) {
          var timer = null
          return function () {
            var context = this,
              args = arguments
            clearTimeout(timer)
            timer = window.setTimeout(function () {
              f.apply(context, args)
            }, delay || 50)
          }
        } // highlight search words

        function highlightSearchWords (string, searchString) {
          if (
            !highlight ||
            string === undefined ||
            searchString === undefined
          ) {
            return string
          }

          var words = searchString
            .replace(/[^a-zA-Z0-9Ã¤Ã¶Ã¼Ã„Ã–ÃœÃŸ]|\s+|\r?\n|\r/gim, ' ')
            .replace(/[^a-zA-Z0-9Ã¤Ã¶Ã¼Ã„Ã–ÃœÃŸ]/g, ' ')
            .split(' ') // sort words by length, longest first

          words.sort(function (a, b) {
            return b.length - a.length // ASC -> a - b; DESC -> b - a
          })
          var markers = {}
          _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a'].each(
            words,
            function (idx, word) {
              if (word.length < 1) {
                return
              }

              var matches = string.match(
                new RegExp('((' + word + ')(?!#<##|-\\d+#<##))(?!.*\\1)', 'gi')
              )

              if (matches != null) {
                for (var i = 0; i < matches.length; i++) {
                  var match = matches[i]
                  var matchEsc = match.replace(
                    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                    '\\$&'
                  )
                  string = string.replace(
                    new RegExp('(' + matchEsc + ')(?!#<##|-\\d+#<##)', 'g'),
                    '##>#' + idx + '-' + i + '#<##'
                  )
                  markers['##>#' + idx + '-' + i + '#<##'] =
                    '<span class="unibox-highlight">' + match + '</span>'
                }
              }
            }
          )
          var reversedMarkerKeys = Object.keys(markers).reverse()

          for (var i = 0; i < reversedMarkerKeys.length; i++) {
            var singleMarker = reversedMarkerKeys[i]
            var replacement = markers[singleMarker]
            string = string.replace(new RegExp(singleMarker, 'gi'), replacement)
          }

          return string
        }

        function makeCssKey (key) {
          return key.replace(/[ "Â§$%&/(){}+*,.;|]/g, '_').toLowerCase()
        }

        function escapeHtml (string) {
          return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s]
          })
        } // update suggest box when new data is given

        function updateSuggestBox (data) {
          var suggestBox = getSuggestBox()
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox') // don't do anything if the last key was enter

          if (
            lastKeyCode === 13 ||
            data === undefined ||
            !data.hasOwnProperty('suggests')
          ) {
            resetSuggests()
            return
          }

          var searchString = getSearchBox().val()
          var searchStringXss = escapeHtml(searchString) /// / fill the box

          suggestBox.html('')
          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-suggest-box-special').html('') // find out whether we have something to show in the first place

          var showSuggestBox = false

          if (
            !showOnMobile &&
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].matchesMediaQuery('max', 767)
          ) {
            return
          } // set state if no suggestions notice is visible

          var showNoSuggestions = false // suggest

          var suggestOrderToUse = Object.keys(data['suggests'])

          if (suggestOrder && suggestOrder.length > 0) {
            suggestOrderToUse = suggestOrder
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].each(Object.keys(data['suggests']), function (i, o) {
              if (
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                ].inArray(o, suggestOrderToUse) < 0
              ) {
                suggestOrderToUse.push(o)
              }
            })
          }

          var totalCount = 0

          if (shouldUseSpecialSuggestBox()) {
            specialSearchBox.removeAttribute('aria-activedescendant')
          } else {
            searchBox.removeAttribute('aria-activedescendant')
          }

          _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a'].each(
            suggestOrderToUse,
            function (idx, key) {
              var values = data['suggests'][key]

              if (!values || values.length === 0) {
                return true
              } // check if other arrays have content, if this suggestion-block is the only one, mark it via css class

              var countOtherSuggestionValues = 0
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].each(suggestOrderToUse, function (idx, sKey) {
                var values = data['suggests'][sKey]

                if (!values || key === sKey || values.length === 0) {
                  return true
                }

                countOtherSuggestionValues += values.length
              })

              if (countOtherSuggestionValues > 0 && key == '_') {
                key = viewKeyMappings['_'] || '_'
              }

              var cssKey = makeCssKey(key)
              var labelledBy = ''

              if (cssKey != '_') {
                labelledBy =
                  'aria-labelledby="unibox-suggest-cluster-heading-' +
                  cssKey +
                  '"'
              }

              var suggestSet = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(
                '<div class="unibox-suggest-cluster unibox-suggest-' +
                  cssKey +
                  ' ' +
                  ('unibox-' + values.length + '-entries') +
                  ' ' +
                  (countOtherSuggestionValues === 0
                    ? 'unibox-single-suggestion-block'
                    : '') +
                  '" ' +
                  labelledBy +
                  '></div>'
              )

              if (key.replace(/_/, '').length > 0 && values.length > 0) {
                var visibleKey = key

                if (visibleKey in viewKeyMappings) {
                  visibleKey = viewKeyMappings[visibleKey]

                  if (visibleKey === undefined) {
                    visibleKey = ''
                  }
                }

                if (visibleKey.length > 0) {
                  var keyNode = Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(
                    '<' +
                      headingElement +
                      ' class="unibox-suggest-heading" id="unibox-suggest-cluster-heading-' +
                      cssKey +
                      '">' +
                      visibleKey +
                      '</' +
                      headingElement +
                      '>'
                  )
                  suggestSet.append(keyNode)
                }
              }

              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].each(values, function (index, suggest) {
                var suggestLine =
                  '<div class="unibox-selectable" aria-selected="false" role="option">'

                if (
                  suggest['image'] !== undefined &&
                  suggest['image'] !== null &&
                  showImagesSuggestions
                ) {
                  var imageUrl =
                    suggest['image'].length === 0 && missingErrorImage
                      ? missingErrorImage
                      : suggest['image'].length === 0 ||
                        suggest['image'].indexOf('/') === 0 ||
                        suggest['image'].indexOf('http') === 0
                        ? suggest['image']
                        : ivfImagePath + suggest['image']
                  suggestLine +=
                    '<div class="unibox-selectable-img-container"><img src="' +
                    imageUrl +
                    '"'
                  var img = new Image()
                  img.src = imageUrl

                  if (!img.complete) {
                    suggestLine +=
                      ' style="display: none;" onload="this.style.display=null;"'
                  }

                  suggestLine +=
                    ' alt aria-hidden="true" role="presentation"/></div>'
                }

                if (suggest['link'] != undefined && suggest['link'] != '') {
                  suggestLine +=
                    '<a class="uniboxSearchContent" href="' +
                    suggest['link'] +
                    '">'
                  suggestLine += highlightSearchWords(
                    suggest['name'],
                    searchStringXss
                  )
                  suggestLine += '</a>'
                } else if (
                  suggest['name'] != undefined &&
                  suggest['name'] != ''
                ) {
                  suggestLine +=
                    '<span class="uniboxSearchContent">' +
                    highlightSearchWords(suggest['name'], searchStringXss) +
                    '</span>'
                }

                if (
                  suggest['content'] != undefined &&
                  suggest['content'] != ''
                ) {
                  suggestLine +=
                    '<p class="unibox-result-content">' +
                    highlightSearchWords(suggest['content'], searchStringXss) +
                    '</p>'
                }

                if (
                  suggest['suggestionHtml'] != undefined &&
                  suggest['suggestionHtml'] != ''
                ) {
                  suggestLine +=
                    '<span class="uniboxSearchContent">' +
                    suggest['suggestionHtml'] +
                    '</span>'
                } else if (suggest['html'] != undefined) {
                  // no suggestionHtml but only HTML -> we don't show this empty result line
                  return
                }

                var missedMatch = false
                var extraHtmlFilled = undefined

                var templateLineCallback = function templateLineCallback (
                  template,
                  replacement
                ) {
                  if (template === undefined || template.length === 0) {
                    return ''
                  }

                  var matches = template.match(/#(.*?)#/gi)

                  if (matches !== null) {
                    for (var i = 0; i < matches.length; i++) {
                      var match = matches[i]

                      if (match === undefined || match.length === 0) {
                        continue
                      }

                      var variable = match.replace(/#/g, '')
                      var replacement = undefined

                      // DEV: Manually added the second part of the condition
                      if (replacement === undefined && suggest['dataPoints']) {
                        for (var d = 0; d < suggest['dataPoints'].length; d++) {
                          var dpo = suggest['dataPoints'][d]

                          if (dpo.key == variable) {
                            replacement = dpo.value
                            break
                          }
                        }
                      }

                      if (replacement === undefined) {
                        missedMatch = true
                        continue
                      }

                      var re = new RegExp(match, 'g')
                      template = template.replace(re, replacement)
                    }
                  }

                  return template
                }

                if (dataPoints !== undefined) {
                  var usedKeys = {}
                  var filledByKey = suggest['dataPoints'].reduce(function (
                    acc,
                    dataPoint
                  ) {
                    if (dataPoints[dataPoint.key] !== undefined) {
                      if (acc[dataPoint.key] === undefined) {
                        acc[dataPoint.key] = []
                      }

                      acc[dataPoint.key].push(
                        templateLineCallback(
                          dataPoints[dataPoint.key].html,
                          dataPoint.value
                        )
                      )
                      usedKeys[dataPoint.key] = true
                    }

                    return acc
                  },
                  {})
                  extraHtmlFilled = Object.keys(usedKeys)
                    .sort(function (a, b) {
                      var posA =
                        dataPoints[a].position !== undefined
                          ? parseInt(dataPoints[a].position)
                          : -1
                      var posB =
                        dataPoints[b].position !== undefined
                          ? parseInt(dataPoints[b].position)
                          : -1

                      if (posA === posB) {
                        return 0
                      }

                      if (posA === -1) {
                        return 1
                      }

                      if (posB === -1) {
                        return -1
                      }

                      return posA - posB
                    })
                    .reduce(function (acc, key) {
                      acc.push(filledByKey[key].join(''))
                      return acc
                    }, [])
                    .join('')
                } else if (extraHtml != undefined) {
                  var matches = extraHtml.match(/#(.*?)#/gi)

                  if (matches != null) {
                    extraHtmlFilled = templateLineCallback(extraHtml)
                  }
                }

                if (extraHtmlFilled !== undefined) {
                  if (missedMatch) {
                    extraHtmlFilled = extraHtmlFilled.replace(/#(.*?)#/gi, '')
                  }

                  suggestLine +=
                    '<div class="unibox-extra">' + extraHtmlFilled + '</div>'
                }

                suggestLine += '<div class="unibox-ca"></div></div>'

                if (lineCallback !== undefined) {
                  suggestLine = lineCallback.call(
                    this,
                    suggestLine,
                    key,
                    index,
                    suggest
                  )
                }

                var suggestNode = Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(suggestLine)
                suggestSet.append(suggestNode)
                showSuggestBox = true
                totalCount++
              })
              getSuggestBox().append(suggestSet)
            }
          ) // accessibility extension

          var statusText = srNoSuggestionsText

          if (totalCount > 0) {
            if (viewAllLabel !== undefined && !shouldUseSpecialSuggestBox()) {
              var showAllButton = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(
                "<button class='unibox-show-all unibox-selectable'><span>" +
                  viewAllLabel +
                  '</span><i>' +
                  _siteSearch_ui_SvgMagnifierIcon__WEBPACK_IMPORTED_MODULE_1__[
                    /* default */ 'a'
                  ].ICON.replace(/#FILL#/g, themeColor)
                    .replace('width="24"', 'width="16"')
                    .replace('height="24"', 'height="16"') +
                  '</i></button>'
              )
              showAllButton.on('click', function (e) {
                enterCallback.call(
                  this,
                  getSearchBox().val(),
                  showAllButton.get()[0]
                )
              })
              getSuggestBox().append(showAllButton)
            }

            statusText = (totalCount > 1
              ? srSuggestionsCountText
              : srOneSuggestionText
            )
              .split('#COUNT#')
              .join(totalCount)
          }

          var statusElement = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-status-message')

          if (statusElement.text() !== statusText) {
            statusElement.text(statusText)
          }

          if (
            suggestsBuiltCallback !== undefined &&
            typeof suggestsBuiltCallback === 'function'
          ) {
            suggestsBuiltCallback(suggestBox, data)
          } /// / update selectables for cursor navigation, use given order

          var selectablesScope = shouldUseSpecialSuggestBox()
            ? Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-special')
            : searchBoxParent
          selectables = selectablesScope.find('.unibox-selectable')

          if (suggestSelectionOrder && suggestSelectionOrder.length > 0) {
            selectables = []
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].each(suggestSelectionOrder, function (idx, item) {
              selectables = selectables.concat(
                selectablesScope
                  .find(
                    '.unibox-suggest-' +
                      makeCssKey(item) +
                      ':first .unibox-selectable'
                  )
                  .get()
              )
            })
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].each(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].grep(Object.keys(data.suggests), function (elem) {
                if (suggestSelectionOrder.indexOf(elem) < 0) return true
              }),
              function (idx, item) {
                selectables = selectables.concat(
                  selectablesScope
                    .find(
                      '.unibox-suggest-' +
                        makeCssKey(item) +
                        ':first .unibox-selectable'
                    )
                    .get()
                )
              }
            )
          }

          selectedEntryIndex = -1 // click handler on selectables

          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(selectables).click(function (e) {
            e.preventDefault()
            e.stopPropagation()
            var prevVal = getSearchBox().val()
            var q = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(this)
              .find('.uniboxSearchContent:first')
              .text()
            var isShowAllButton =
              viewAllLabel !== undefined &&
              (Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(e.target).hasClass('unibox-show-all') ||
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(e.target).parents('.unibox-show-all').length !== 0)

            if (!isShowAllButton) {
              getSearchBox().val(q)
            }

            var href = undefined

            try {
              href = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(this)
                .find('a:first')
                .attr('href')
            } catch (e) {}

            if (enterCallbackResult != undefined && !isShowAllButton) {
              try {
                if (trackingCallbacks['select'] !== undefined) {
                  var sugBox = getSuggestBox()
                  var sField = getSearchBox()
                  var items = getSuggestBox().find('.unibox-selectable')
                  trackingCallbacks['select'](
                    sField.get()[0],
                    sugBox.get()[0],
                    e.target,
                    prevVal,
                    items,
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ].indexInNodeList(this, items.get()) + 1,
                    href
                  )
                }

                enterCallbackResult.call(this, q, href, e.ctrlKey, prevVal)
              } catch (ex) {
                console.log(ex)
              }
            }

            if (!e.ctrlKey) {
              resetSuggests()
              hideSuggests(e)
              hideSpecialSuggest()
            }
          }) // Don't hide suggests on long click

          selectables.mousedown(function (e) {
            keepSuggests = true
          })
          selectables.mouseup(function (e) {
            keepSuggests = false
          })

          if (data['words'] != undefined && !shouldUseSpecialSuggestBox()) {
            // trigger words / visualization
            if (
              data['words'].length > 0 &&
              queryVisualizationHeadline.length > 0 &&
              (instantVisualFeedback == 'all' ||
                instantVisualFeedback == 'bottom')
            ) {
              suggestBox.append(
                '<' +
                  headingElement +
                  '>' +
                  queryVisualizationHeadline +
                  '</' +
                  headingElement +
                  '>'
              )
              showSuggestBox = true
            }

            var newIvfWords = []
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].each(data['words'], function (key, word) {
              if (
                instantVisualFeedback == 'all' ||
                instantVisualFeedback == 'bottom'
              ) {
                if (
                  word['overlayImage'] != undefined &&
                  word['overlayImage'] != null &&
                  word['overlayImage'].length > 0
                ) {
                  suggestBox.append(
                    '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                      ivfImagePath +
                      word['overlayImage'] +
                      '" style="background-image: url(\'' +
                      ivfImagePath +
                      word['image'] +
                      '\');background-size: 75%;background-repeat: no-repeat;background-position: center;">'
                  )
                } else if (
                  word['image'] != undefined &&
                  word['image'] != null &&
                  word['image'].length > 0
                ) {
                  suggestBox.append(
                    '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                      ivfImagePath +
                      word['image'] +
                      '">'
                  )
                }
              }

              var invisibleBox = searchBoxParent.find('#unibox-invisible')
              invisibleBox.css('padding', searchBox.css('padding'))
              invisibleBox.html(
                searchStringXss.replace(
                  new RegExp(word['name'], 'gi'),
                  '<span>' + word['name'] + '</span>'
                )
              ) // show visuals above search bar

              if (
                (instantVisualFeedback == 'all' ||
                  instantVisualFeedback == 'top') &&
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                ].inArray(word['image'], ivfWords) == -1
              ) {
                var span = searchBoxParent.find('#unibox-invisible span')[0]

                if (
                  span != undefined &&
                  word['name'].length > 0 &&
                  word['image'] != undefined &&
                  word['image'] != null &&
                  word['image'].length > 0
                ) {
                  var posLeft = Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(span).position().left
                  var visImage = Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(
                    '<div class="unibox-ivf"><img  alt aria-hidden="true" role="presentation" src="' +
                      ivfImagePath +
                      word['image'] +
                      '" alt="' +
                      word['name'] +
                      '"></div>'
                  )
                  visImage.css('left', getSearchBoxOffset().left + posLeft - 10)
                  visImage.css(
                    'top',
                    getSearchBoxOffset().top -
                      searchBox.outerHeight() +
                      ivfImageOffset
                  ) // searchBoxParent.find('#unibox').append(visImage);

                  searchBoxParent.append(visImage)
                  setTimeout(function () {
                    searchBoxParent
                      .find('.unibox-ivf')
                      .find('img')
                      .addClass('l')
                  }, 10) // visImage.find('img').addClass('l');

                  newIvfWords.push(word['image'])
                }
              } else if (
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                ].inArray(word['image'], ivfWords) > -1
              ) {
                newIvfWords.push(word['image'])
              }
            })
            ivfWords = newIvfWords
          }

          if (!suggestionsBelow() && !shouldUseSpecialSuggestBox()) {
            // remove images if suggestion box is on top (otherwise slow loading images move the box down and it covers the search box)
            getSuggestBox()
              .find('img')
              .remove()
          } else {
            // hide broken images
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].each(
              getSuggestBox()
                .find('img')
                .get(),
              function (i, item) {
                var src = item.src
                var image = new Image()

                image.onerror = function () {
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(item).hide()
                }

                image.src = src
              }
            )
          } /// / position it

          resizeAndReposition()

          if (noSuggests != undefined && !showSuggestBox) {
            showSuggestBox = true
            showNoSuggestions = true
            suggestBox.append(noSuggests)
          }

          var trackSuggestShown = function trackSuggestShown () {
            if (trackingCallbacks['show'] !== undefined) {
              trackingCallbacks['show'](
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-special-searchbox').hasClass('active')
                  ? Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                    ]
                  )('#unibox-special-searchbox').get()[0]
                  : searchBox.get()[0],
                suggestBox.get()[0],
                suggestBox.find('.unibox-selectable').get()[0],
                searchString,
                suggestBox.find('.unibox-selectable')
              )
            }
          } /// / show it

          if (showSuggestBox) {
            if (isEnabled) {
              searchBox.attr('aria-expanded', 'true')
            } // if already visible, just update position and set class

            if (suggestBox.isVisible()) {
              suggestBox.addClass('uniboxActive') /// / re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
              // suggestBox.css('left', getSearchBoxOffset().left);
              // suggestBox.css('top', getSearchBoxOffset().top);

              resizeAndReposition()
            } else {
              if (!shouldUseSpecialSuggestBox()) {
                // do nothing for mobile suggest box
                if (suggestionsBelow()) {
                  // if suggestbox currently not visible, slide down
                  suggestBox.slideDown(animationSpeed, function () {
                    suggestBox.addClass('uniboxActive') /// / re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                    // suggestBox.css('left', getSearchBoxOffset().left);
                    // suggestBox.css('top', getSearchBoxOffset().top);

                    resizeAndReposition()
                    trackSuggestShown()
                  })
                } else {
                  suggestBox.css('display', 'block')
                  suggestBox.addClass('uniboxActive')
                  resizeAndReposition()
                  trackSuggestShown()
                }
              }
            }

            if (shouldUseSpecialSuggestBox()) {
              trackSuggestShown()
            }

            if (showMoreResults && !showNoSuggestions) {
              suggestBox.append(showMoreResults)
            }
          } else {
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-status-message').text(srNoSuggestionsText)
            resetSuggests()
            showSpecialSuggestPlaceholder()
          } /// / indicate suggestions changed

          if (
            suggestChangeCallback !== undefined &&
            typeof suggestChangeCallback === 'function'
          ) {
            suggestChangeCallback.call(this, showSuggestBox)
          }
        }

        function getSearchBoxOffset () {
          return {
            left: searchBox.offset().left - searchBoxParent.offset().left,
            top:
              searchBox.offset().top -
              searchBoxParent.offset().top +
              searchBox.outerHeight()
          }
        }

        function updateIvf () {
          var shownWords = searchBoxParent
            .find('.unibox-ivf img')
            .map(function (el) {
              return Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(el).attr('src')
            })

          for (var i = 0; i < shownWords.length; i++) {
            if (
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].inArray(shownWords[i].replace(ivfImagePath, ''), ivfWords) == -1
            ) {
              searchBoxParent
                .find('.unibox-ivf:has(img[src*="' + shownWords[i] + '"])')
                .remove()
            }
          }
        }

        function clearIvf () {
          ivfWords = []
          searchBoxParent.find('.unibox-ivf').remove()
        }

        function scrollList (event) {
          savedKeyCodeOnKeyDown = event.keyCode || event.which

          if (searchBox.val().length <= 1) {
            clearIvf()
          }

          if (trackingCallbacks['change']) {
            setTimeout(function () {
              trackingCallbacks['change'](
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-special-searchbox').hasClass('active')
                  ? Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                    ]
                  )('#unibox-special-searchbox').get()[0]
                  : searchBox.get()[0]
              )
            }, 1)
          }

          if (typeCallback != undefined) {
            try {
              typeCallback.call(this, event, searchBox.val())
            } catch (ex) {
              console.log(ex)
            }
          } // return if NO arrow key is pressed

          if (
            event.keyCode != 37 &&
            event.keyCode != 38 &&
            event.keyCode != 39 &&
            event.keyCode != 40 &&
            event.keyCode != 13
          ) {
            updateIvf()
            return
          } // if arrows are pressed move selected entry

          if (event.keyCode == 38 && selectedEntryIndex > 0) {
            // up key: move up one entry
            selectedEntryIndex--
          } else if (event.keyCode == 40) {
            // down key: move up one entry
            selectedEntryIndex++
          } else if (event.keyCode == 38 && selectedEntryIndex <= 0) {
            selectedEntryIndex =
              (selectedEntryIndex != -1
                ? selectedEntryIndex - 1
                : selectedEntryIndex) + selectables.length
          } else if (
            (event.keyCode == 37 || event.keyCode == 39) &&
            selectedEntryIndex > -1
          ) {
            // left/right key: move left/up or right/down one content group if we are in the selected entries (selectedEntryIndex > -1)
            selectedEntryIndex = selectedEntryIndex % selectables.length
            var currentSelection = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(selectables[selectedEntryIndex])
            var currentCluster = currentSelection.closest(
              '.unibox-suggest-cluster'
            )
            var otherCluster

            if (event.keyCode == 37) {
              otherCluster = currentCluster.prev()
            } else if (event.keyCode == 39) {
              otherCluster = currentCluster.next()
            }

            if (otherCluster.hasClass('unibox-suggest-cluster')) {
              var firstSelectableInCluster = otherCluster.find(
                'div.unibox-selectable'
              )[0]
              selectedEntryIndex = getSuggestBox()
                .find('div.unibox-selectable')
                .index(firstSelectableInCluster)
            }
          } // mark the selected selectable

          if (selectables.length > 0 && selectedEntryIndex > -1) {
            selectedEntryIndex = selectedEntryIndex % selectables.length
            var $selectables = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(selectables)
            $selectables.removeClass('active')
            var selected = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(selectables[selectedEntryIndex])
            selected.addClass('active')
            $selectables.attr('aria-selected', 'false')
            $selectables.attr('id', '')
            selected.attr('id', 'unibox-active')
            selected.attr('aria-selected', 'true')

            if (selected.length > 0) {
              var box = shouldUseSpecialSuggestBox()
                ? Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                  ]
                )('#unibox-special-searchbox')
                : searchBox
              box.attr('aria-activedescendant', 'unibox-active')
            }
          }

          if (event.keyCode == 13) {
            event.preventDefault()
            event.stopPropagation()
            var selectablesScope = shouldUseSpecialSuggestBox()
              ? Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
                ]
              )('#unibox-special')
              : searchBoxParent

            if (enterCallbackResult != undefined) {
              var selectedText = getSearchBox().val()
              var prevVal = selectedText
              var href = undefined

              if (selectedEntryIndex != -1) {
                if (
                  selectablesScope.find(
                    '.unibox-selectable.active.unibox-show-all'
                  ).length > 0
                ) {
                  enterCallback.call(
                    this,
                    selectedText,
                    selectablesScope.find('.unibox-show-all').get()[0]
                  )
                } else {
                  selectedText = selectablesScope
                    .find(
                      '.unibox-selectable.active .uniboxSearchContent:first'
                    )
                    .text()
                  getSearchBox().val(selectedText)

                  try {
                    href = Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(selectablesScope.find('.unibox-selectable.active')[0])
                      .find('a')
                      .attr('href')
                  } catch (e) {}

                  if (trackingCallbacks['select'] !== undefined) {
                    var sugBox = getSuggestBox()
                    var sField = getSearchBox()
                    var items = getSuggestBox().find('.unibox-selectable')
                    trackingCallbacks['select'](
                      sField.get()[0],
                      sugBox.get()[0],
                      event.target,
                      prevVal,
                      items,
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ].indexInNodeList(this, items.get()),
                      href
                    )
                  }

                  try {
                    enterCallbackResult.call(
                      this,
                      selectedText,
                      href,
                      event.ctrlKey,
                      prevVal
                    )
                  } catch (ex) {
                    console.log(ex)
                  }
                }
              }
            } else if (selectedEntryIndex != -1) {
              window.location.href = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(searchBoxParent.find('.unibox-selectable.active')[0])
                .find('a')
                .attr('href')
              hideSpecialSuggest()
            }

            return false
          }

          if (selectedEntryIndex > -1) {
            event.preventDefault()
          }
        } // provide search suggests

        function searchSuggest (event) {
          // don't show suggests if alt + something is pressed
          if (lastKeyCode == 18) {
            lastKeyCode = event.keyCode
            return
          }

          lastKeyCode = event.keyCode // if event keycode = -1 it means the box should just open, if we queried before, we do not need to update the box

          if (lastKeyCode == -1 && lastData != undefined) {
            updateSuggestBox(lastData)
            return
          } // do nothing at ESC

          if (event.keyCode == 27) {
            return
          } // scroll list when up or down is pressed

          if (
            ((event.keyCode == 37 || event.keyCode == 39) &&
              selectedEntryIndex > -1) ||
            event.keyCode == 38 ||
            event.keyCode == 40 ||
            event.keyCode == 13 ||
            event.keyCode == 9
          ) {
            return
          }

          var inputText = getSearchBox().val()

          if (lastKeyCode == 46 && inputText.length == 0) {
            clearIvf()
          }

          if (preSuggestCallback != undefined) {
            var keepGoing = true

            try {
              keepGoing = preSuggestCallback.call(
                this,
                inputText,
                searchBox.get()[0]
              )
            } catch (ex) {
              console.log(ex)
            }

            if (!keepGoing) {
              return
            }
          }

          if (
            inputText.length >= minChars &&
            suggestUrl != '' &&
            (showOnMobile ||
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].matchesMediaQuery('min', 768))
          ) {
            currentInput = inputText
            var lInputText = inputText
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].ajax({
              usedQuery: inputText,
              url: suggestUrl + encodeURIComponent(inputText),
              dataType: 'json',
              success: function success (data) {
                if (lInputText == currentInput) {
                  updateSuggestBox(data)
                }

                lastData = data
              }
            })
          } else {
            showSpecialSuggestPlaceholder()
          }
        } // should we open to top or bottom?

        function suggestionsBelow () {
          if (forceBelow) {
            return true
          }

          if (
            mobileScrollOnFocus &&
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
              /* default */ 'a'
            ].matchesMediaQuery('max', 767)
          ) {
            return true
          }

          var bb = searchBox[0].getBoundingClientRect()
          var vph = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          )
          var spaceAbove = bb.y || bb.top
          var spaceBelow = vph - spaceAbove - bb.height
          return spaceBelow >= spaceAbove
        } // should we overflow to the right or to the left

        function suggestionsLeft (sbWidth) {
          var bb = searchBox[0].getBoundingClientRect()
          var w = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          )
          return (bb.x || bb.left) + sbWidth > w
        }

        function resizeAndReposition () {
          var suggestBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-suggest-box')
          var borderSize = (suggestBox.css('border-width') || '0px').replace(
            'px',
            ''
          )
          var minWidth =
            maxWidth == 'auto' || !parseInt(maxWidth)
              ? searchBox.outerWidth() - 2 * borderSize
              : maxWidth - 2 * borderSize
          suggestBox.css('min-width', minWidth)
          var uniboxMaxWidth = undefined

          if (maxWidth == 'auto' || !parseInt(maxWidth)) {
            uniboxMaxWidth = Math.max(
              275 - 2 * borderSize,
              searchBox.outerWidth() - 2 * borderSize
            )
          } else {
            uniboxMaxWidth = maxWidth - 2 * borderSize
          }

          suggestBox.css('max-width', uniboxMaxWidth)

          if (suggestionsLeft(uniboxMaxWidth)) {
            var bb = searchBox[0].getBoundingClientRect()
            var r = (bb.x || bb.left) + bb.width
            var l = r - uniboxMaxWidth

            if (searchBox.parent().css('position') == 'relative') {
              var pBB = searchBox.parent()[0].getBoundingClientRect()
              l -= pBB.x || pBB.left // would go out of the client? --> move to the right

              var wo = (pBB.x || pBB.left) + l

              if (l < 0 && wo < 0) {
                l -= wo
              }
            } else {
              l = Math.max(0, l)
            }

            suggestBox.css('left', l)
          } else {
            suggestBox.css('left', getSearchBoxOffset().left)
          }

          if (suggestionsBelow()) {
            suggestBox.css('top', getSearchBoxOffset().top)
          } else {
            suggestBox.css(
              'top',
              getSearchBoxOffset().top -
                suggestBox.outerHeight() -
                searchBox.outerHeight()
            )
          }

          resizeSpecialSuggestBox()
        } // check whether special mobile suggest box should be used

        function shouldUseSpecialSuggestBox () {
          var matchesBreakpoint = _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
            /* default */ 'a'
          ].matchesMediaQuery('max', specialMobileSuggestBreakpoint)
          var isSpecialActive = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox').hasClass('active') // check for active class to stay in context after window has been resized

          return (
            useSpecialMobileSuggest && (matchesBreakpoint || isSpecialActive)
          )
        } // special mobile suggestions bottom space

        function resizeSpecialSuggestBox () {
          var uniboxSpecial = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special')
          var specialSuggestBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-suggest-box-special')

          if (uniboxSpecial && specialSuggestBox) {
            var uniboxLogoHeight = hasSpecialLogoTemplate()
              ? uniboxSpecial.find('.unibox-special-logo').height()
              : 0
            var inputContainerHeight = uniboxSpecial
              .find('.input-container')
              .height()
            var heightSum = uniboxLogoHeight + inputContainerHeight
            var suggestHeight = 'calc(100% - ' + heightSum + 'px)'
            specialSuggestBox.css('height', suggestHeight)
            specialSuggestBox.css('top', heightSum + 'px')
          }
        } // get search box that is used as query input ('normal' x 'special' depending on useSpecialMobileSuggest setting and device width)

        function getSearchBox () {
          var uniboxSpecial = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special')

          if (shouldUseSpecialSuggestBox()) {
            if (!uniboxSpecial || uniboxSpecial.length === 0) {
              initSpecialSuggestBox()
            }

            return Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-special-searchbox')
          }

          return searchBox
        } // get suggest box that is used as suggestions holder ('normal' x 'special' depending on useSpecialMobileSuggest setting and device width)

        function getSuggestBox () {
          if (shouldUseSpecialSuggestBox()) {
            if (
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-suggest-box-special').length === 0
            ) {
              initSpecialSuggestBox()
            }

            return Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-suggest-box-special')
          }

          return Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-suggest-box')
        } // initialize DOM elements and callbacks for special mobile suggest box

        function initSpecialSuggestBox () {
          if (
            !useSpecialMobileSuggest ||
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-suggest-box-special').length > 0
          ) {
            return
          }

          var currentQuery = searchBox.val()
          var inputFieldString =
            '<input type="search" id="unibox-special-searchbox" class="unibox-special-searchbox" value="' +
            currentQuery +
            '" ' +
            'autocomplete="off" role="combobox" aria-describedby="unibox-controls-description" aria-owns="unibox-suggest-box-special" aria-controls="unibox-suggest-box-special"' +
            'aria-expanded="false"/>'
          var specialSuggestBoxString =
            '<div id="unibox-suggest-box-special" class="unibox-special-box">' +
            specialMobileSuggestPlaceholder +
            '</div>'
          var searchButtonString =
            '<button id="unibox-mobile-search-btn" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
          var closeButtonString =
            '<button class="unibox-special-close unibox-special-icon" aria-label="Close"></button>'
          var uniboxSpecial = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(
            '<section role="search" id="unibox-special" style="display: none;"></section>'
          )
          var inputContainer = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('<section class="input-container"></section>')

          if (searchFieldLabel) {
            var labelFieldString =
              "<label style='" +
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
                .srOnlyCss +
              "' class='unibox-sr-only' for='unibox-special-searchbox'>" +
              searchFieldLabel +
              '</label>'
            inputContainer.append(
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(labelFieldString)
            )
          }

          var closeButton = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(closeButtonString)
          inputContainer.append(closeButton)
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(inputFieldString)
          var placeholder =
            searchBox.attr('placeholder') || specialMobileSearchBoxPlaceholder
          specialSearchBox.attr('placeholder', placeholder)
          inputContainer.append(specialSearchBox)
          var searchButton = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(searchButtonString)
          inputContainer.append(searchButton)
          var specialSuggestBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(specialSuggestBoxString)

          if (hasSpecialLogoTemplate()) {
            uniboxSpecial.append(
              '<div class="unibox-special-logo">' +
                specialMobileSuggestLogoTemplate +
                '</div>'
            )
          }

          uniboxSpecial.append(inputContainer)
          uniboxSpecial.append(specialSuggestBox) // prepend special mobile suggest box to body

          var body = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('body')
          body.prepend(uniboxSpecial)
          body.append(
            '<div id="unibox-special-hidden-content" style="overflow: hidden;"></div>'
          ) // bind listeners

          specialSearchBox.keydown(throttle(searchSuggest, throttleTime))
          specialSearchBox.keydown(scrollList) // to update suggestions after search event is triggered (especially on delete button in input[type='search']

          specialSearchBox.on('search', function (e) {
            searchSuggest(e)
          })

          if (enterCallback) {
            searchButton.on('click', function () {
              var query = specialSearchBox.val() || ''

              if (
                loaderSelector !== undefined &&
                autoHideSpecialMobileSuggest === false
              ) {
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(loaderSelector).css('z-index', '9999999')
              }

              enterCallback.call(
                this,
                query,
                searchButton.get()[0],
                autoHideSpecialMobileSuggest === false
                  ? function () {
                    hideSpecialSuggest(function () {
                      if (loaderSelector !== undefined) {
                        Object(
                          _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                          ]
                        )(loaderSelector).css('z-index', '')
                      }
                    })
                  }
                  : undefined
              )

              if (autoHideSpecialMobileSuggest !== false) {
                hideSpecialSuggest()
              }
            })
          } else if (autoHideSpecialMobileSuggest !== false) {
            searchButton.on('click', hideSpecialSuggest)
          }

          specialSearchBox.keyup(resetSuggests)
          specialSearchBox.keyup(function (e) {
            var keyCode = e.keyCode || e.which // hide on esc

            if (keyCode == 27) {
              hideSpecialSuggest()
            }
          })
          closeButton.on('click', hideSpecialSuggest) // init scroll callback to resize the input container when user scrolls

          if (resizeSpecialMobileSuggestOnScroll) {
            // resize input elements on scroll
            specialSuggestBox.scroll(function (e) {
              var scrollTop = e.target.scrollTop
              var resizeFactor = scrollTop / 100 / 2 // 200px for complete transition

              if (resizeFactor > 1 || resizeFactor < 0) {
                return
              } // simulate slightly smoother scroll feeling (especially for slow scroll)

              resizeFactor = Math.log1p(resizeFactor)
              var maxResizeFactorValue = Math.log1p(1)
              resizeFactor *= 1 / maxResizeFactorValue
              resizeSpecialInputField(resizeFactor)
              resizeSpecialSuggestBox()
            })
          } // element for transition animation

          if (animateSpecialMobileSuggestTransitions) {
            var animationDuration = parseFloat(animationSpeed)
            var existingBackground = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-special-transition-background')
            var specialMobileSuggestAnimationElem =
              existingBackground.length > 0
                ? existingBackground
                : Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                  ]
                )(
                  '<div id="unibox-special-transition-background" style="background: #fff; position: fixed; width: 100%; height: 100%; z-index: 1000001; left: 100%; top: 0; display: none;"></div>'
                )
            specialMobileSuggestAnimationElem.css(
              'transition',
              'transform ' + animationDuration + 'ms'
            )

            if (existingBackground.length === 0) {
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('body').append(specialMobileSuggestAnimationElem)
            }
          }
        }

        function resizeSpecialInputField (resizeFactor) {
          // calculate new special search box height and font size
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox')
          var uniboxSpecial = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special')
          var maxHeight = specialScrollSettings.box.height
          var fontSizeProportion =
            specialScrollSettings.box.fontSize / maxHeight
          var minHeight = 32
          var heightDif = maxHeight - minHeight
          var effectiveHeightDif = heightDif * resizeFactor
          var newHeight = Math.round(maxHeight - effectiveHeightDif)
          var newFontSize = Math.round(fontSizeProportion * newHeight)
          specialSearchBox.css('height', newHeight)
          specialSearchBox.css('font-size', newFontSize) // calculate icon dimension

          var maxWidthIcon = specialScrollSettings.icons.width
          var maxHeightIcon = specialScrollSettings.icons.height
          var minDimensionIcon = minHeight + 2
          var widthDifIcon = maxWidthIcon - minDimensionIcon
          var heightDifIcon = maxHeightIcon - minDimensionIcon
          var effectiveWidthDifIcon = widthDifIcon * resizeFactor
          var effectiveHeightDifIcon = heightDifIcon * resizeFactor
          var newWidthIcon = Math.round(maxWidthIcon - effectiveWidthDifIcon)
          var newHeightIcon = Math.round(maxHeightIcon - effectiveHeightDifIcon)
          var icons = uniboxSpecial.find('.unibox-special-icon')
          icons.css('height', newHeightIcon)
          icons.css('width', newWidthIcon) // calculate new special search box width and margins

          var defaultMargin = specialScrollSettings.box.marginLeft
          var newMargin = defaultMargin - (maxWidthIcon - newWidthIcon)
          var newWidht = 'calc(100% - 2*' + newMargin + 'px)'
          specialSearchBox.css('width', newWidht)
          specialSearchBox.css('margin-left', newMargin)
          specialSearchBox.css('margin-right', newMargin)
        } // show special mobile suggest box

        function showSpecialSuggest () {
          if (!useSpecialMobileSuggest) {
            return
          }

          if (shouldPreventIosBounce()) {
            registerIosBouncePreventer()
          } else {
          }

          var uniboxSpecial = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special')

          if (!uniboxSpecial || uniboxSpecial.length === 0) {
            initSpecialSuggestBox()
            uniboxSpecial = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-special')
          } // iPhone 5 fix

          uniboxSpecial.get()[0].scrollTop = 0
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox')
          specialSearchBox.addClass('active')

          if (isEnabled) {
            specialSearchBox.attr('aria-expanded', 'true')
          }

          if (specialSearchBox.val() == '') {
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-suggest-box-special').html('')
          }

          var resizeCallback = function resizeCallback () {
            uniboxSpecial.get()[0].scrollTop = 0 // fix layout if logo template is being shown

            var icons = uniboxSpecial.find('.unibox-special-icon')

            if (hasSpecialLogoTemplate()) {
              var uniboxLogoHeight = uniboxSpecial
                .find('.unibox-special-logo')
                .height()
              var iconMarginTop =
                uniboxLogoHeight +
                parseFloat(specialSearchBox.css('margin-top') || '0')
              icons.css('top', iconMarginTop)
            } // reset scroll behavior

            if (resizeSpecialMobileSuggestOnScroll) {
              icons.css('width', '')
              icons.css('height', '')
              specialSearchBox.css('height', '')
              specialSearchBox.css('width', '')
              specialSearchBox.css('margin-left', '')
              specialSearchBox.css('margin-right', '')
              specialSearchBox.css('font-size', '')
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-suggest-box-special').scrollTop(0) // read and save initial scroll settings

              specialScrollSettings.icons = {}
              specialScrollSettings.icons.width = parseFloat(icons.css('width'))
              specialScrollSettings.icons.height = parseFloat(
                icons.css('height')
              )
              specialScrollSettings.box = {}
              specialScrollSettings.box.height = parseFloat(
                specialSearchBox.css('height')
              )
              specialScrollSettings.box.marginLeft = parseFloat(
                specialSearchBox.css('margin-left')
              )
              specialScrollSettings.box.fontSize = parseFloat(
                specialSearchBox.css('font-size')
              )
            }
          } // hide all visible content except of suggestions

          var bodyElems = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(
            '#unibox-special ~ *:not(#unibox-special-transition-background):not(#unibox-special-hidden-content):not(.ss360-sr-only):not(.unibox-sr-only)'
          )
          bodyElems = bodyElems.filter(function (el) {
            return Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(el).isVisible()
          })
          var hiddenContainer = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-hidden-content')
          var body = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('body')
          body.append(hiddenContainer)
          hiddenContainer.append(bodyElems) // make sure the html and body element do have full height

          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('html, body').addClass('unibox-stretch') // run blend-in animation

          if (animateSpecialMobileSuggestTransitions) {
            animateSpecial(
              hiddenContainer,
              uniboxSpecial,
              resizeCallback,
              function () {
                specialSearchBox.focus()
              }
            )
          } else {
            hiddenContainer.hide()
            uniboxSpecial.show()
            specialSearchBox.focus()
            resizeCallback()
          }
        }

        function hideSpecialSuggest (callback) {
          if (!shouldUseSpecialSuggestBox()) {
            return
          }

          if (shouldPreventIosBounce()) {
            removeIosBouncePreventer()
          }

          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox')

          if (
            trackingCallbacks['abandon'] !== undefined &&
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(this).hasClass('unibox-special-close')
          ) {
            trackingCallbacks['abandon'](
              specialSearchBox.val(),
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-special .unibox-selectable').length,
              specialSearchBox.get()[0]
            )
          }

          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special').hide()
          var wasSpecialUsed = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox').hasClass('active')
          specialSearchBox.removeClass('active')
          specialSearchBox.attr('aria-expanded', 'false')
          specialSearchBox.removeAttribute('aria-activedescendant')
          var hiddenContainer = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-hidden-content')
          var bodyElems = hiddenContainer.children()
          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('body').append(bodyElems)

          if (wasSpecialUsed) {
            syncSearchBoxQuery()
          }

          var callbackWrapper = function (callback) {
            // remove changes from body and html element
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('html, body').removeClass('unibox-stretch')

            if (callback !== undefined && typeof callback === 'function') {
              callback()
            }

            if (
              specialMobileHiddenCallback !== undefined &&
              typeof specialMobileHiddenCallback === 'function'
            ) {
              specialMobileHiddenCallback()
            }
          }.bind(this, callback) // run animation

          if (animateSpecialMobileSuggestTransitions) {
            animateSpecial(
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-special'),
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(
                '#unibox-special ~ *:not(#unibox-special-transition-background)'
              ).filter(function (el) {
                return Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(el).isVisible()
              }),
              undefined,
              callbackWrapper
            )
          } else {
            callbackWrapper()
          }
        }

        var shouldIosBounceBePrevented = undefined // check whether to prevent iOS Safari bounce effect, which tends to break mobile suggestions scrolling by moving the whole viewport

        function shouldPreventIosBounce () {
          if (shouldIosBounceBePrevented === undefined) {
            var elem = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(
              "<div id='ios-bounce-test' style='-webkit-overflow-scrolling: touch;'></div>"
            )
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('body').append(elem)
            shouldIosBounceBePrevented = !!elem.css(
              '-webkit-overflow-scrolling'
            )
            elem.remove()
          }

          return shouldIosBounceBePrevented
        }

        function registerIosBouncePreventer () {
          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(window).on('touchstart.iosPreventer', function (e) {
            var y = e.touches ? e.touches[0].screenY : e.screenY

            if (!y && window.event) {
              y = window.event.touches
                ? window.event.touches[0].screenY
                : window.event.screenY
            }

            var boundPreventer = preventIosBounce.bind(this, y)
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(window).on('touchmove.iosPreventer', boundPreventer)
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(window).on('touchend.iosPreventer', function () {
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(window).off('touchmove.iosPreventer,touchend.iosPreventer')
            })
          })
        }

        function removeIosBouncePreventer () {
          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(window).off(
            'touchstart.iosPreventer, touchmove.iosPreventer, touchend.iosPreventer'
          )
        } // prevent iOS Safari bounce effect, which tends to break mobile suggestions scrolling by moving the whole viewport

        function preventIosBounce (yStart, e) {
          Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )(window).off('touchmove.iosPreventer') // we only need to prevent the bounce once after touchstart --> performance

          var target = e.target || window.event.target // get touch start position

          var yNow = e.touches ? e.touches[0].screenY : e.screenY

          if (!yNow && window.event) {
            yNow = window.event.touches
              ? window.event.touches[0].screenY
              : window.event.screenY
          } // loop through all DOM parents of touchemove target until scrollable element is found

          while (target !== document.body) {
            var $target = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(target)
            var overflowY = $target.css('overflow-y') // check whether the target is scrollable and has enough height to be scrolled

            var isScrollable =
              $target.css('-webkit-overflow-scrolling') === 'touch' &&
              (overflowY === 'auto' || overflowY === 'scroll')
            var canScroll = target.scrollHeight > target.offsetHeight

            if (isScrollable && canScroll) {
              if (yStart <= yNow && target.scrollTop === 0) {
                // prevent bounce - the element which is completely scrolled to top is tried to be scrolled up
                e.preventDefault()
              } else {
                var height = $target.height()

                if (
                  yStart >= yNow &&
                  target.scrollHeight - target.scrollTop === height
                ) {
                  // prevent bounce  - the element which is completely scrolled to bottom is tried to be scrolled upwards
                  e.preventDefault()
                }
              }

              return // allow scroll
            }

            target = target.parentNode // move up the DOM
          } // no scrollable element was found, prevent bounce

          e.preventDefault()
        }

        function animateSpecial (
          elemToHide,
          elemToShow,
          afterElemShownCallback,
          finishCallback
        ) {
          var backgroundElem = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-transition-background') // start with content to be shown hidden and content to be hidden visible

          elemToShow.hide()
          elemToHide.show()
          backgroundElem.show()
          var animationOffset = 140 // animate blend-in (move animation element to the left)

          setTimeout(
            function (backgroundElem) {
              backgroundElem.addClass('move--left')
            }.bind(this, backgroundElem),
            animationOffset
          ) // this little offset helps to boost animation performance
          // move animation element back to the right and show the content

          setTimeout(
            function (
              elemToShow,
              elemToHide,
              elemToMove,
              firstCallback,
              finishCallback
            ) {
              elemToHide.hide()
              elemToShow.show() // the element was shown, notify this

              if (firstCallback) {
                firstCallback()
              }

              elemToMove.removeClass('move--left')
              elemToMove.addClass('move--right') // notify animation is completed

              setTimeout(
                function (elemToHide, callback) {
                  elemToMove.hide()
                  elemToMove.removeClass('move--left')
                  elemToMove.removeClass('move--right')

                  if (
                    callback !== undefined &&
                    typeof callback === 'function'
                  ) {
                    callback()
                  }
                }.bind(this, elemToMove, finishCallback),
                parseFloat(animationSpeed)
              )
            }.bind(
              this,
              elemToShow,
              elemToHide,
              backgroundElem,
              afterElemShownCallback,
              finishCallback
            ),
            parseFloat(animationSpeed) + animationOffset
          )
        }

        function syncSearchBoxQuery () {
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox')

          if (specialSearchBox && searchBox) {
            searchBox.val(specialSearchBox.val())
          }
        }

        function syncSpecialSearchBoxQuery () {
          var specialSearchBox = Object(
            _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
          )('#unibox-special-searchbox')

          if (searchBox) {
            specialSearchBox.val(searchBox.val())
          }
        }

        function showSpecialSuggestPlaceholder () {
          if (shouldUseSpecialSuggestBox()) {
            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-suggest-box-special').html(
              specialMobileSuggestPlaceholder
            )
          }
        }

        function hasSpecialLogoTemplate () {
          return (
            specialMobileSuggestLogoTemplate &&
            specialMobileSuggestLogoTemplate.length > 0
          )
        } // return an object, through closure all methods keep bound to returned object

        return {
          updateSuggests: function updateSuggests (data) {
            updateSuggestBox(data)
          },
          updateSuggestUrl: function updateSuggestUrl (newUrl) {
            suggestUrl = newUrl
          },
          hideSuggestBox: function hideSuggestBox () {
            resetSuggests()
            hideSpecialSuggest()
          },
          setIvfImagePath: function setIvfImagePath (path) {
            ivfImagePath = path

            if (ivfImagePath.charAt(ivfImagePath.length - 1) != '/') {
              ivfImagePath += '/'
            }
          },
          changeInstantVisualFeedbackState: function changeInstantVisualFeedbackState (
            state
          ) {
            instantVisualFeedback = state
          },
          render: function render () {
            resizeAndReposition()
          },
          getText: function getText () {
            return getSearchBox().val()
          },
          getSearchBox: function getSearchBox () {
            return searchBox
          },
          init: function init (searchBoxObject, options) {
            searchBox = searchBoxObject
            searchBoxParent = options.searchBoxContainer
            highlight = options.highlight
            extraHtml = options.extraHtml
            dataPoints = options.dataPoints
            lineCallback = options.callbacks.line
            suggestUrl = options.suggestUrl
            ivfImagePath = options.ivfImagePath
            ivfImageOffset = options.ivfImageOffset
            missingErrorImage = options.missingErrorImage
            throttleTime = options.throttleTime
            animationSpeed = options.animationSpeed
            minChars = options.minChars
            enterCallback = options.callbacks.enter
            enterCallbackResult = options.callbacks.enterResult
            typeCallback = options.callbacks.type
            focusCallback = options.callbacks.focus
            blurCallback = options.callbacks.blur
            suggestsBuiltCallback = options.callbacks.suggestsBuilt
            trackingCallbacks = options.trackingCallbacks || {}
            placeholder = options.placeholder
            instantVisualFeedback = options.instantVisualFeedback
            queryVisualizationHeadline = options.queryVisualizationHeadline
            showDeleteAllButton = options.showDeleteAllButton
            showImagesSuggestions = options.showImagesSuggestions
            suggestOrder = options.suggestOrder
            suggestSelectionOrder = options.suggestSelectionOrder
            maxWidth = options.maxWidth
            noSuggests = options.noSuggests
            emptyQuerySuggests = options.emptyQuerySuggests
            showMoreResults = options.showMoreResults
            disableEventPropagationHtml = options.disableEventPropagationHtml
            preSuggestCallback = options.callbacks.preSuggest
            viewAllLabel = options.viewAllLabel
            showOnMobile =
              options.showOnMobile !== undefined ? options.showOnMobile : true
            forceBelow = options.forceBelow
            loaderSelector = options.loaderSelector
            viewKeyMappings = options.viewKeyMappings || {}
            themeColor = options.themeColor
            mobileScrollOnFocus = options.mobileScrollOnFocus
            isEnabled = options.enabled
            var sms = options.specialMobileSuggest
            useSpecialMobileSuggest = sms.enabled
            specialMobileSuggestBreakpoint = sms.breakpoint || 768
            specialMobileSuggestPlaceholder = sms.placeholder || ''
            specialMobileSuggestLogoTemplate = sms.customTopHtml || ''
            animateSpecialMobileSuggestTransitions =
              sms.animateTransitions &&
              !_sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                /* default */ 'a'
              ].prefersReducedMotion()
            resizeSpecialMobileSuggestOnScroll = sms.resizeSearchBoxOnScroll
            specialMobileSearchBoxPlaceholder =
              sms.searchBoxPlaceholder || 'Search'
            specialMobileTrigger = sms.trigger
            autoHideSpecialMobileSuggest =
              sms.autoHide !== undefined ? sms.autoHide : true
            specialMobileHiddenCallback = sms.hiddenCallback
            suggestChangeCallback = options.callbacks.suggestChange
            var acConfig = options.accessibility
            headingElement =
              'h' + Math.min(Math.max(1, acConfig.headingLevel || 4), 6)
            searchFieldLabel = acConfig.searchFieldLabel
            srSuggestionsHiddenText = acConfig.srSuggestionsHiddenText
            srNoSuggestionsText = acConfig.srNoSuggestionsText
            srSuggestionsCountText = acConfig.srSuggestionsCountText
            srOneSuggestionText = acConfig.srOneSuggestionText
            srSuggestBoxControlDescription =
              acConfig.srSuggestBoxControlDescription // insert necessary values for inputfield

            searchBox.attr('autocomplete', 'off') // append invisible label for search field (if no label is defined)

            if (
              searchFieldLabel &&
              (!searchBox.attr('id') ||
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )("label[for='" + searchBox.attr('id') + "']").length === 0)
            ) {
              if (!searchBox.attr('id')) {
                if (!window.uniboxCounter) {
                  window.uniboxCounter = 0
                }

                window.uniboxCounter++
                searchBox.attr(
                  'id',
                  'unibox-search-box-' + window.uniboxCounter
                )
              }

              var forId = searchBox.attr('id')
              var sbLabel =
                "<label style='" +
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
                  .srOnlyCss +
                "' class='unibox-sr-only' for='" +
                forId +
                "'>" +
                searchFieldLabel +
                '</label>'
              searchBox.parent().prepend(sbLabel)
            }

            if (isEnabled) {
              if (
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-controls-description').length === 0
              ) {
                var controlDescriptionText = srSuggestBoxControlDescription
                var controlDescription =
                  "<span id='unibox-controls-description' style='" +
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ].srOnlyCss +
                  "' class='unibox-sr-only' tabindex='-1'>" +
                  controlDescriptionText +
                  '</span>'
                searchBox.parent().append(controlDescription)
              }

              if (
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-status-message').length === 0
              ) {
                // add aria-live region to announce search results
                var ariaLive = Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(
                  '<span id="unibox-status-message" style="' +
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ].srOnlyCss +
                    '" tabindex="-1" aria-live="polite" aria-atomic="true" role="status" class="unibox-sr-only">'
                )
                searchBox.parent().append(ariaLive)
              }

              searchBox.attr('role', 'combobox')
              searchBox.attr('aria-describedby', 'unibox-controls-description')
              searchBox.attr('aria-owns', 'unibox-suggest-box')
              searchBox.attr('aria-controls', 'unibox-suggest-box')
              searchBox.attr('aria-expanded', 'false')
            } // position and size the suggest box

            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-suggest-box').remove()
            suggestBox = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )(
              '<div id="unibox-suggest-box" class="normal-suggest-box" role="listbox" aria-label="Search Suggestions"></div>'
            )
            searchBoxParent.prepend(suggestBox)
            var pos = searchBoxParent.css('position')

            if (pos != 'absolute') {
              searchBoxParent.css('position', 'relative')
            }

            var borderSize = (suggestBox.css('border-width') || '0px').replace(
              'px',
              ''
            )
            suggestBox.css('min-width', searchBox.outerWidth() - 2 * borderSize)
            suggestBox.css('max-width', options.maxWidth - 2 * borderSize) // add event listeners

            searchBox.keydown(scrollList)
            searchBox.keydown(throttle(searchSuggest, throttleTime))
            searchBox.keyup(resetSuggests)
            searchBox.focusout(function (e) {
              if (keepSuggests) {
                return
              }

              hideSuggests(e)

              if (blurCallback != undefined && !shouldUseSpecialSuggestBox()) {
                blurCallback.call(
                  this,
                  e,
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(this).val(),
                  true
                )
              }
            })

            if (specialMobileTrigger !== undefined) {
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(specialMobileTrigger).click(function () {
                showSpecialSuggest()
              })
            }

            var moveUnibox = options.hasMultipleSearchBoxes
            searchBox.focus(function (e) {
              e = e || window.event
              e.stopPropagation() // if(show)

              var showMobileLayer = shouldUseSpecialSuggestBox()

              if (showMobileLayer) {
                showSpecialSuggest()
                syncSpecialSearchBoxQuery()
              } else if (moveUnibox) {
                // move unibox to current sb context (if multiple search boxes and not using special mobile)
                var isUniboxFirstLevelChild = function isUniboxFirstLevelChild (
                  parentNode
                ) {
                  if (parentNode.children) {
                    for (var i = 0; i < parentNode.children.length; i++) {
                      if (
                        parentNode.children[i].getAttribute('id') ==
                        'unibox-suggest-box'
                      ) {
                        return true
                      }
                    }
                  }

                  return false
                }

                var parent = Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )(e.target).parent()

                if (
                  parent.length > 0 &&
                  (parent.find('#unibox-suggest-box').length === 0 ||
                    !isUniboxFirstLevelChild(parent))
                ) {
                  parent.prepend(
                    Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )('#unibox-suggest-box')
                  )
                  parent.append(
                    Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )('#unibox-invisible')
                  )
                }
              }

              if (
                isEnabled &&
                !showMobileLayer &&
                mobileScrollOnFocus &&
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                  /* default */ 'a'
                ].matchesMediaQuery('max', 767)
              ) {
                var offsetTop =
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(e.target).offset().top -
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )('body').offset().top
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('html, body').animateScrollTop(offsetTop, 2 * animationSpeed)
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-suggest-box').addClass('unibox--fullwidth')
              } else {
                Object(
                  _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                    /* default */ 'a'
                  ]
                )('#unibox-suggest-box').removeClass('unibox--fullwidth')
              }

              var curSbVal = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(this).val()

              if (curSbVal.length > 0) {
                searchSuggest({
                  keyCode: currentInput === curSbVal ? -1 : -2
                }) // should we only show the suggest box or fetch new suggests?
              } else if (emptyQuerySuggests != undefined) {
                updateSuggestBox(emptyQuerySuggests)
              }

              if (focusCallback !== undefined) {
                try {
                  focusCallback.call(
                    this,
                    e,
                    Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(this).val()
                  )
                } catch (ex) {
                  console.log(ex)
                }
              }
            })
            suggestBox.mouseenter(function () {
              suggestBox.find('.unibox-selectable.active').removeClass('active')
            }) // click outside of suggest div closes it

            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('html').click(function (e) {
              try {
                if (
                  e != undefined &&
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(e.target).attr('id') == searchBox.attr('id')
                ) {
                  return
                }
              } catch (ex) {
                console.log(ex)
              }

              if (suggestBox.hasClass('uniboxActive')) {
                hideSuggests(e)
              }
            }) // special for tab key (because if shift+tab when getting focus back)

            searchBox.keydown(function (e) {
              e = e || window.event
              var keyCode = e.keyCode || e.which

              if (keyCode == 9) {
                hideSuggests(e)
              }
            })
            searchBox.focusout(function (e) {
              if (keepSuggests) {
                return
              }

              e = e || window.event
              setTimeout(function () {
                if (
                  Object(
                    _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                      /* default */ 'a'
                    ]
                  )(document.activeElement).parents('#unibox-suggest-box')
                    .length === 0
                ) {
                  hideSuggests(e)
                }
              }, 10)
            }) // disable click event propagation to html element

            if (disableEventPropagationHtml) {
              searchBox.click(function (event) {
                event.stopPropagation()
              })
              suggestBox.click(function (event) {
                event.stopPropagation()
              })
            } // handling the placeholder
            // check if original input has placeholder attribute

            var originalPlaceholder = searchBox.attr('placeholder') // if so, then assign to placeholder and use from now on

            placeholder =
              originalPlaceholder && originalPlaceholder.length > 0
                ? originalPlaceholder
                : placeholder // if placeholder is now undefined and length > 0 go on, else no placeholder at all

            if (placeholder && placeholder.length > 0) {
              // check if browser supports HTML5 placeholder
              var testInput = document.createElement('input') // emulate HTML5 placeholder behaviour

              if (!('placeholder' in testInput)) {
                searchBox
                  .focus(function () {
                    var localPlaceholder = Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(this).attr('placeholder')

                    if (
                      localPlaceholder &&
                      localPlaceholder.length > 0 &&
                      localPlaceholder != '' &&
                      Object(
                        _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                        ]
                      )(this).val() == localPlaceholder
                    ) {
                      Object(
                        _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                        ]
                      )(this)
                        .val('')
                        .removeClass('hasPlaceholder')
                    }
                  })
                  .blur(function () {
                    var localPlaceholder = Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(this).attr('placeholder')

                    if (
                      localPlaceholder &&
                      localPlaceholder.length > 0 &&
                      localPlaceholder != '' &&
                      (Object(
                        _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                        ]
                      )(this).val() == '' ||
                        Object(
                          _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                            /* default */ 'a'
                          ]
                        )(this).val() == localPlaceholder)
                    ) {
                      Object(
                        _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                          /* default */ 'a'
                        ]
                      )(this)
                        .val(localPlaceholder)
                        .addClass('hasPlaceholder')
                    }
                  }) // set placeholder if defined, remove input of the search box

                searchBox.val(placeholder)
              }

              searchBox.attr('placeholder', placeholder)
            } // copy search box styles to an invisible element so we can determine the text width

            Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('#unibox-invisible').remove()
            var invisible = Object(
              _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
            )('<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>')
            searchBoxParent.append(invisible) // if showDeleteAllButton == true, prepare button

            if (showDeleteAllButton) {
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-dab-holder').remove()
              var dab = Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>')
              searchBoxParent.append(dab) // Events:
              // if clicking the deleteAllButton erase the search field

              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )(dab).mousedown(function (e) {
                ;(e || window.event).stopPropagation()
                searchBox.val('')
                searchBox.focus()
                return false
              })
              searchBox
                .focus(function () {
                  if (searchBox.val().length > 0) {
                    dab.show()
                  } else {
                    dab.hide()
                  }
                })
                .blur(function () {
                  dab.hide()
                })
                .keydown(function () {
                  if (
                    Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(this).val().length > 0
                  ) {
                    Object(
                      _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[
                        /* default */ 'a'
                      ]
                    )(dab).show()
                  }
                }) // CSS:
              // css height for dab: respect border width and height of search field and box shadow

              var sbPaddingTop = parseInt(
                searchBox
                  .css('paddingTop')
                  .replace('px', '')
                  .trim()
              )
              var heightOfSb = searchBox.outerHeight()
              var borderWidthOfSb = parseInt(
                searchBox
                  .css('borderTopWidth')
                  .replace('px', '')
                  .trim()
              )
              var shadowInfo = searchBox.css('boxShadow').match(/\d{1,3}px/g)
              var shadowOfSb =
                shadowInfo && shadowInfo.length > 2
                  ? parseInt(shadowInfo[2].replace('px', '').trim())
                  : 0
              dab.height(
                heightOfSb - 2 * borderWidthOfSb - shadowOfSb - sbPaddingTop
              ) // put some padding to the right of the search field

              var sbPaddingRight = parseInt(
                searchBox
                  .css('paddingRight')
                  .replace('px', '')
                  .trim()
              )
              sbPaddingRight = sbPaddingRight > 25 ? sbPaddingRight : 25
              searchBox.css('paddingRight', sbPaddingRight) // calc position of dab inside parent of searchbox

              var topDistance =
                borderWidthOfSb +
                shadowOfSb +
                (searchBox.offset().top -
                  searchBox.parent().offset().top -
                  searchBox.parent().scrollTop())
              var leftDistance =
                Math.abs(
                  searchBox[0].getBoundingClientRect().left -
                    searchBox.parent()[0].getBoundingClientRect().left
                ) +
                searchBox.outerWidth() -
                dab.outerWidth() -
                borderWidthOfSb -
                sbPaddingRight
              dab.css('top', topDistance)
              dab.css('left', leftDistance)
            }

            if (instantVisualFeedback == 'none') {
              Object(
                _sxQuery_sxQuery__WEBPACK_IMPORTED_MODULE_0__[/* default */ 'a']
              )('#unibox-invisible').css('display', 'none')
            }

            initSpecialSuggestBox()
          }
        }
      }

      /* harmony default export */ __webpack_exports__['a'] = UniBox

      /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {
      // css-to-string-loader: transforms styles from css-loader to a string output

      // Get the styles
      var styles = __webpack_require__(4)

      if (typeof styles === 'string') {
        // Return an existing string
        module.exports = styles
      } else {
        // Call the custom toString method from css-loader module
        module.exports = styles.toString()
      }

      /***/
    },
    /* 4 */
    /***/ function (module, exports) {
      module.exports =
        '@charset "UTF-8";@-webkit-keyframes ss360-bi{0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(.9);transform:scale(.9)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ss360-bi{0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(.9);transform:scale(.9)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes ss360-bo{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(.95);transform:scale(.95)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}to{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}}@keyframes ss360-bo{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(.95);transform:scale(.95)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}to{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}}@-webkit-keyframes ss360-fid{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes ss360-fid{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes sk-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}@keyframes sk-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px);transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg);transform:perspective(120px) rotateY(180deg)}to{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg);transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px);transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg);transform:perspective(120px) rotateY(180deg)}to{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg);transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@-webkit-keyframes ss360-recording{0%{background-color:rgba(224,83,80,0)}50%{background-color:#e05350}to{background-color:rgba(224,83,80,0)}}@keyframes ss360-recording{0%{background-color:rgba(224,83,80,0)}50%{background-color:#e05350}to{background-color:rgba(224,83,80,0)}}.ss360-search-term-highlight{background-color:#b5f948;padding:0 3px}.ss360-highlight{font-weight:700}.ss360-hidden{display:none}.ss360-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.ss360-skip-link{border:1px solid #aaa;position:absolute;background:#fff;pointer-events:none;left:-999em;z-index:9999}.ss360-skip-link:focus{left:0}.ss360-ca{clear:both}.ss360-flex{display:flex;flex-direction:row}.ss360-flex--column{flex-direction:column}.ss360-flex--align-stretch{align-items:stretch}.ss360-flex--align-center{align-items:center}.ss360-flex--justify-center{justify-content:center}.ss360-flex--wrap{flex-wrap:wrap}.ss360-flex--nowrap{flex-wrap:nowrap}.ss360-close-button,.ss360-close-button:focus,.ss360-close-button:hover{-webkit-transform-origin:center;transform-origin:center;cursor:pointer;position:absolute;z-index:99999;top:8px;right:8px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAG0ElEQVR4nN2bT0wTWRzHf78ZaLUBS0Cx07Ba3YBmJ5YwPZhdTCAevKinPTRoYtRE1wRuKicT5bK7SVc8ccEEbxIPGw/owSVp8LQX2mpNd1NOYFbGgmR3goHMxPa3h85rCgz9+2ZAPrd50/nN+3773pv3F8FmZFlucrvdJwAgBAASAPjLPLIIACoAxHRdT6dSqc925g/tCNrT09OHiP2QF11OcDkWASBGRDOJROJ13ZnbBDcDQqGQREQXiWgAEZt5xS2GiFYRcRIRp2KxmMojZt0GhEIhKZfLDSDiJR4ZqhQieioIwmS9RtRlQE9PzwAA3LTrHy8HEa0CwHgikZisNUZNBnR3d3cJgnAfEU/U+mKeEFE6l8uNvH37dq7aZ8VqH1AU5QIi/oyI9TZu3EDEg4h4zu/3r6iqWpUJVRmgKMpNALiNiO6qcugAZp76JUkCVVVjlT5XsQGKotwHAEcbuhoJSZIkqapa0SezIgPMf/5rEM84UWlJKGuAoigXAOA2l2w5S0iSpMVybUJJA0zxD3jmymH6y5mwrQHd3d1dZmu/6xq8aiCi0OHDh//MZDIrVvct+wGyLDe5XK6pnerg8IaIVg3DuGg1sBKsHnC5XA/2ingAAERsdrlcD6zubakCZkfnqt2ZchpEDFi1BxuqwF4r+puxqgobqoDb7b60V8UD5KuC2+3e0J8pGCDLchMRDTifLWchogFZlpvYdcEAl8u1Y8Pachw5csTFK5bZIN5k18VV4CKvl3i9XvH8+fNeHrHC4XDb8+fPT4XD4TYe8UwKWkWAwhweNwMeP37cGQ6HJU3TjFQqtV5rnHA43DY8PBwAAOjt7W2pNx4DEd0+ny/98ePHBcFM6K83KCMSiRyVZbkZAGB4eDhw48aN9lriBIPB/UNDQx3FaUNDQx1er7fqOQwrmGYBAICI+nkEBQCYnZ3d0Nu6devWN5FI5Gg1MYLB4P6xsbEuj8fTwNLW1ta+DA4OzmmaluWRT6ZZNKe3uA11U6nUuqZpRm9vbwtLO3bsmKezs9M1PT2tlXu+lPhkMll38Wcgoru9vX1G9Pv95xDxB16BAWo3wSnxDEScFyVJOoeIp3gHr9YEp8WbzIt+v/8q1L96Y0kqlVr/8OHD2unTpw80NjYKAHkTzpw50xyNRv/TdZ0A8p/NR48efXvo0KHC0NsB8YCIhkBETeV/WjsvX77UBgcH59bW1r6wNFmWmycmJrq8Xq/o9XrFiYmJrkAg4GH3nRAPAEBETagoyqydL2FYFfH5+fk1AICdEM9wzAAAaxOKcVo8wDYTInaRTCbXN1cHxk6IB3DYAACAhYUFY2lpydicvrS0ZCwsLGxJtxtHDbBq8BiBQMDDGkYn8+SYAaXEM5gJwWBwv1P5EogobfdLthMfjUY/Xbt27a/iNiEQCHjGxsYcMYGI0gIi2roHp5T4u3fvLlg1jB6Pp8EJExDxs+0l4N69ex3biWfXyWRy/fLly3+zfgGAMyYQUVqA/I4sW4hEIkfPnj17sDhts3jG+/fvjevXr885bIIq5HK5itfSq6Ea8QxN07JWJjx58uQ7zlNiAACQy+ViYiaTWfH5fAM81wBrEc/QdZ1evXr1b19f34GWlpZGls5zSgwgv0bw5s2bUfYZ5FYK6hHPYCUhlUqtFqfznBIDUzObE5zhEdHr9YrHjx8v2eBViqZp2StXrsxFo9FPAPynxJhmEQCgtbV1URTFH+utBqz4njx5cl9HR8e+WsUXMz09rfl8PnF0dPQfXuMEc4nsl+XlZaOwNmjuAeI2NR4Oh9uePXtmuSa/C5iKx+MjAEVdYUQc5/mGXSx+g9aCAbFYTCWimR3JkYMQ0Uzx9toNgyFBEB46nyVn2axxwydFVdXPPp+vyY5Z4t0AET2Nx+PTxWlbhsOGYYxDfo/+XmPR1LaBLQaYuydGHMmSs4xYbZKy7FWpqqpKkgSQP/GxFxiPx+MvrG5s261UVTUm5V3YFVvi62AqHo+Pbnez5JSYrusPnZgxsgsiSuu6XvLLVnJgsby8bLS1tf0hiuL3iHiw1G93G0SUNgzjp3Knzio+McK7q2wzha5uOSoeWqqq+voraRMqFg9Q5YkRVVVf+3y+JgAI7LZN1OYBqt8TicSv1TxX86EpURR/A5uW1WtgMZvN3nHk0BQAQCaTWWltbZ1qaGhog52vElO6rt959+5dTZO7dR+cNEvDbXC+0xTLZrMPa/nXi+F2dFZRlBAAXAD7vxRTAPAiHo9zmcfkfnja3HF+EREHgF8bsUhEk4ZhTPE+TW7L6XGGeaA6RERd5inTSqtJjIjSiDiHiDFeB6Wt+B91omKdGqz3hAAAAABJRU5ErkJggg==") no-repeat;background-size:32px;background-color:transparent!important;box-sizing:border-box;border:none;width:64px;height:64px;background-position-x:16px;background-position-y:16px}.ss360-close-button:hover{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-name:rotate;animation-name:rotate;-webkit-animation-iteration-count:1;animation-iteration-count:1}#ss360Darken,#ss360Darken-input{background-color:rgba(0,0,0,.65)!important;width:100%;height:100%;position:fixed;top:0;left:0;cursor:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADo0lEQVRYhb1XP2gbZxR/7ztFR4OCWp2wfMa1RUF24BwLdF4aYxAatIjMovVQ0KAMhoJd2XO2DmrwEDzEg0d1Kh6yxSC0eckd2M4NFrVQPeQ4Lh6ubi/osPQ6VBKyIuVOspLfdu973/f73fv+/hA8QpKkgN/vlwFARsTFIWnvAEBpNBoVTdP+8TIuuiXIsiwSUZ6Ikoj4wKtgAHjVbDZ/Pzk5qY4lQJKkAM/zvwDAkxFIPwIRVRzHeTasItygYDweX/D5fL8h4uO7kAMAIGKU47jvI5HIW8Mwrj5q7w/Isiy2Wq3SiOV2BRFdM8Z+VBRF743fqoAkSQHG2AtEnJkkOQAAIvJEJAuC8No0TacTZ71JPM8//8QKn4SIRZ7nn/fGuhVIJBJ5uOOC84gZURRB13UFoL0G2lvt1Rcg7wIRnyiKojMAACLKf0nyXk5OkqSAz+f71a3D8vLyV5FI5J5hGDfDcoLBIFcqlR7Ozs7eOz4+djsJF0OhUInxPJ/0orhQKHy7t7e3kMlkgsPIDw4OFqLR6P3V1dWvg8HgwDOmFzzPJ7np6ek8Ikbdki8uLuxMJiOk0+mwZVmOpmkfett3d3e/W1paelCv1+1cLle1LKvpNiYRASeK4k+IGHZLNgzjRlGUv9Pp9DfJZDJERE1VVf8FACgWi/Nra2uhUcjbaGAikXjjMRkAbpe6XC6/BwBIpVLhMcgBAGBkAf0iAADGJQfoOwm9wrKsZq1WszvftVrNHod8bAHFYnG+U/Z6vW6nUqlwsVicH0sAEZ2P0mFra0vsnfNcLlcdVwQRnTMA0F0z28hms8L6+vqMaZqNzpxbltXM5XJVTdOuxxChc6IoCl4eHtlsVtjZ2Ynatn2zubn55+XlZfdKbTQadHh4eBWLxfypVCoci8X8R0dHlgcBfzDGWMWL1JWVlYBt2zcbGxvV09PTD4Nytre3/yqXy+91XXcGtfeDMVZBAIBEIvESAGS3DnNzc/7eP78jFFVVn3Z2wb6XHhMk73IyAABVVRUiqkxw8E+CiCqqqipdAQAAjuM8g/+NxefGuzYXAPQ8yUzTdKamphRETCMi/zmYiei61Wr9fHZ21t36t+5swzCuIpHIMSIuebkhRyQ/b7VahX6nNNAZtX3gy0m9kIno3HGcp4Pc0cBXi2majiAIrzmO8yPiozuSVxzHKQyzZq7mNB6PLzDG8oiYHJFbAYD9zmofBlcBHbQt2w/gwZ4j4n6/BRuG/wA9X65CnAC2oQAAAABJRU5ErkJggg==") 12 12,auto;z-index:999998}#ss360-searchbox-spinner{width:80px;height:80px;position:fixed;left:49.5%;top:49.5%;z-index:999999;display:none}.ss360-double-bounce1,.ss360-double-bounce2{width:100%;height:100%;border-radius:50%!important;background-color:#1c5d7d;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce 2s ease-in-out infinite;animation:sk-bounce 2s ease-in-out infinite}.ss360-double-bounce2{-webkit-animation-delay:-1s;animation-delay:-1s}.ss360-spinner-square{width:60px;height:60px;background-color:#1c5d7d;-webkit-animation:sk-rotateplane 1.2s ease-in-out infinite;animation:sk-rotateplane 1.2s ease-in-out infinite}.ss360-more-results{border:1px solid #1c5d7d;color:#1c5d7d;font-weight:700;padding:10px 20px;border-radius:12px;margin-bottom:25px;margin-left:auto;margin-right:auto;text-align:center;cursor:pointer;display:block;background:none;width:252px;max-width:100%;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-more-results:hover{color:#fff;background:#1c5d7d}#ss360-layer .content-group-heading{background-color:#1c5d7d;padding:5px;color:#fff;font-size:20px;margin-bottom:0;margin-top:0}section.ss360-group{margin-top:0;margin-bottom:0}section.ss360-group ul{padding-left:0;list-style:none}#ss360-custom-search{position:relative;max-width:calc(100% - 50px);padding:8px 0;margin-top:-19px;margin-bottom:0}#ss360-custom-searchbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0;max-width:calc(100% - 70px);height:44px;font-size:21px;padding-left:14px;padding-right:0;border:1px solid #d4d4d4;width:100%;box-sizing:border-box;margin:0}#ss360-custom-searchbutton{height:44px;width:44px;border:1px solid #1c5d7d;margin-top:0;cursor:pointer;background:#1c5d7d;padding:10px;border-radius:0;box-sizing:border-box}#ss360-custom-searchbutton:hover{-webkit-filter:brightness(80%);filter:brightness(80%)}@media (max-width:680px){#ss360-custom-search{margin-top:0}}#ss360-search-console{z-index:999998;position:fixed;top:-100%;left:0;width:100%;height:100%;background-color:#f5f5f5;overflow:auto}#ss360-search-console>h2{text-align:center;padding:0 72px}#ss360-query{display:block;box-sizing:border-box;padding:0 .4em;margin-left:auto;margin-right:auto;margin-bottom:.5em;border-radius:3px;min-width:50px;max-width:635px;width:100%;min-height:32px;background-color:#fff;border:2px solid #c9c9c9;color:#484848;font-size:24px;font-weight:300;height:54px;line-height:54px}#ss360-query:focus{border:2px solid #1c5d7d;outline:0}#ss360-results{width:100%;max-width:1000px;margin-left:auto;margin-right:auto}@media (min-width:992px){.ss360-layer-content.ss360-grid--lg .ss360-group>ul{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:wrap;flex:0 1 auto}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li{box-sizing:border-box;flex-basis:calc(33.33333% - 1px);max-width:calc(33.33333% - 1px)}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li>article{padding:.5em}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li>article header span:not(.ss360-highlight){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:90%}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container{display:flex;flex-direction:column}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container img{width:100%;max-height:150px}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container>a.ss360--object-fit-polyfill{width:100%;height:150px}}@media (min-width:1200px){.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li{flex-basis:calc(25% - 1px);max-width:calc(25% - 1px)}}@media (max-width:991px){.ss360-layer-content.ss360-grid--sm .ss360-group>ul{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:wrap;flex:0 1 auto}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li{box-sizing:border-box;flex-basis:calc(50% - 1px);max-width:calc(50% - 1px)}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li>article{padding:.5em}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li>article header span:not(.ss360-highlight){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:90%}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container{display:flex;flex-direction:column}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container img{width:100%;max-height:150px}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container>a.ss360--object-fit-polyfill{width:100%;height:150px}}@media (max-width:767px){.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li{flex-basis:calc(100% - 1px);max-width:calc(100% - 1px)}}#ss360-layer{padding:10px;text-align:left}#ss360-layer.ss360-overlay{position:fixed;width:80%;padding:30px 20px 30px 30px;background-color:#fff;color:#333;z-index:999999;left:calc(10% - 40px);top:calc(10% - 30px);height:80%;overflow:auto;overflow-y:hidden;box-sizing:content-box;max-width:800px}#ss360-layer.ss360-overlay p{text-align:left;margin:0}@media (min-width:1000px){#ss360-layer.ss360-overlay{left:calc(50% - 400px)}}@media (max-width:680px){#ss360-layer.ss360-overlay{position:fixed;width:100%;padding:10px 0 10px 10px;box-shadow:none;left:0;top:0;height:100%}}.ss360-animated{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.ss360-fid{-webkit-animation-name:ss360-fid;animation-name:ss360-fid}.ss360-bo{-webkit-animation-name:ss360-bo;animation-name:ss360-bo}.ss360-bi{-webkit-animation-name:ss360-bi;animation-name:ss360-bi}.ss360-layer-content{position:relative;outline:none;margin:0}.ss360-layer-content #ss360-search-result-heading{margin-top:0;font-size:1.5em;margin-bottom:.5em}.ss360-layer-content #ss360-search-result-heading a{color:inherit;text-decoration:none;cursor:default;outline:none;pointer-events:none}.ss360-layer-content>section>ul{margin-left:0}@media (max-width:991px){.ss360-layer-content.ss360-hide-dataPoints--sm .ss360-content-container>table,.ss360-layer-content.ss360-hide-images--sm .ss360-content-container img,.ss360-layer-content.ss360-hide-snippet--sm .ss360-content-container>p,.ss360-layer-content.ss360-hide-title--sm article>header,.ss360-layer-content.ss360-hide-url--sm .ss360-result-link{display:none}}@media (min-width:992px){.ss360-layer-content.ss360-hide-dataPoints--lg .ss360-content-container>table,.ss360-layer-content.ss360-hide-images--lg .ss360-content-container img,.ss360-layer-content.ss360-hide-snippet--lg .ss360-content-container>p,.ss360-layer-content.ss360-hide-title--lg article>header,.ss360-layer-content.ss360-hide-url--lg .ss360-result-link{display:none}}@media (prefers-reduced-motion:reduce){.ss360-close-button:hover,div#ss360-searchbox-spinner>*{-webkit-animation-duration:0;animation-duration:0;-webkit-animation-duration:0s;animation-duration:0s}}.ss360-nav-entry{display:inline-block;padding:10px;background:#fff;color:#333;margin-right:10px;border:1px solid #1c5d7d;cursor:pointer}.ss360-nav-entry:hover{border-bottom:3px solid #1c5d7d;padding-bottom:8px}.ss360-result-count{margin-left:5px}.ss360-result-count:after{content:")"}.ss360-result-count:before{content:"("}.ss360-nav ul{padding-left:0;list-style:none;margin-top:5px}.ss360-top-nav{padding-bottom:0}.ss360-top-nav ul{margin-left:0;margin-bottom:1em}.ss360-top-nav ul li{display:inline-block;margin-top:5px}.ss360-top-nav button{margin-right:5px}.ss360-left-nav{float:left;width:20%}.ss360-left-nav .nav-entry{margin-bottom:10px}.ss360-layer-content.ss360-left-nav{float:right;width:80%}nav.ss360-tabbed+.ss360-layer-content .ss360-group:not(.ss360-active),nav.ss360-tabbed+section .content-group-heading{display:none}nav.ss360-tabbed.ss360-left-nav ul{margin-top:0}nav.ss360-tabbed.ss360-left-nav li{border-right:1px solid #1c5d7d;text-align:right;margin-right:0}nav.ss360-tabbed.ss360-left-nav li button{border-bottom-left-radius:3px;border-top-left-radius:3px;margin-right:0}nav.ss360-tabbed.ss360-left-nav li button:hover{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-left-nav li:first-of-type button{margin-top:0}nav.ss360-tabbed.ss360-left-nav li:not(last-of-type) button{margin-bottom:5px}nav.ss360-tabbed.ss360-left-nav li.ss360-active{border-right:none}nav.ss360-tabbed.ss360-left-nav li.ss360-active button.ss360-nav-entry{margin-bottom:0}nav.ss360-tabbed.ss360-left-nav li.ss360-active+li{padding-top:6px}nav.ss360-tabbed.ss360-left-nav+section{padding:.5em .5em .5em 1em}nav.ss360-tabbed.ss360-left-nav .ss360-nav-post,nav.ss360-tabbed.ss360-left-nav .ss360-nav-pre{border-right:1px solid #1c5d7d}nav.ss360-tabbed.ss360-left-nav .ss360-nav-pre{height:3em}nav.ss360-tabbed.ss360-left-nav .ss360-nav-entry{border-right:none}nav.ss360-tabbed.ss360-top-nav li{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-top-nav li button{border-top-left-radius:3px;border-top-right-radius:3px;margin-bottom:0}nav.ss360-tabbed.ss360-top-nav li:first-of-type button{margin-left:0}nav.ss360-tabbed.ss360-top-nav li:not(last-of-type) button{margin-right:5px}nav.ss360-tabbed.ss360-top-nav li.ss360-active{border-bottom:none;margin-left:-1px;margin-right:-1px}nav.ss360-tabbed.ss360-top-nav li.ss360-active button.ss360-nav-entry{margin-right:0}nav.ss360-tabbed.ss360-top-nav li.ss360-active+li{padding-left:6px}nav.ss360-tabbed.ss360-top-nav+section{padding:1em .5em .5em}nav.ss360-tabbed.ss360-top-nav .ss360-nav-post,nav.ss360-tabbed.ss360-top-nav .ss360-nav-pre{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-top-nav .ss360-nav-pre{flex-grow:1}nav.ss360-tabbed.ss360-top-nav .ss360-nav-entry{border-bottom:none}nav.ss360-tabbed li.ss360-active button,nav.ss360-tabbed li:not(.ss360-active) button:hover{color:#000;background:#fff;padding-bottom:10px}nav.ss360-tabbed li:not(.ss360-active) button{background:#1c5d7d;color:#fff}nav.ss360-tabbed ul{margin-bottom:0;margin-right:0}nav.ss360-tabbed .ss360-nav-post{flex-grow:6}.ss360-select-wrapper{cursor:pointer;position:relative;width:100%;max-width:20em}.ss360-nav-select{width:100%;position:absolute;top:0;padding:5px 0;height:40px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";border:0}.ss360-nav-label{position:relative;padding:5px 10px;cursor:pointer}.ss360-nav-label.open:after{content:"â–²"}.ss360-nav-label:after{content:"â–¼";font-size:12px;position:absolute;right:0;top:0;padding:5px 15px;border-left:5px solid #fff}.ss360-nav-label.ss360-focus{outline:1px dotted #000;outline:5px auto -webkit-focus-ring-color}.ss360-nav-label option{color:#414141;background:#fff}.ss360-nav-label,.ss360-nav-select{display:block;font:400 17px/2em Source Sans Pro,sans-serif;background:#1c5d7d;color:#fff}@media (max-width:680px){nav.ss360-left-nav{clear:both;margin-bottom:1em}nav.ss360-left-nav ul li{display:inline-block;margin-top:5px}nav.ss360-left-nav button{margin-right:5px}nav.ss360-left-nav .nav-entry{margin-bottom:0}.ss360-layer-content.ss360-left-nav,.ss360-left-nav{float:left;width:100%}}.ss360-suggests{margin-bottom:25px;margin-top:5px}.ss360-suggests a{font-size:1.2em}.ss360-suggests>article>header{position:relative;padding:0;text-align:left}.ss360-suggests>article>header>*{margin:0}.ss360-content-container p{margin-top:.5em;font-size:1em;line-height:1.5em;padding-right:1em;margin-bottom:25px}.ss360-content-container>a,.ss360-content-container>a:hover{border:none}.ss360-content-container img{width:125px;float:left;margin:6px 15px 6px 0;max-height:200px;-o-object-fit:contain;object-fit:contain}.ss360-content-container img.ss360-document-icon{max-height:75px}.ss360-content-container>a.ss360--object-fit-polyfill{display:block;width:125px;height:200px;float:left;margin:6px 15px 6px 0}.ss360-content-container table{width:auto;border:0;margin-left:0;margin-right:0}.ss360-content-container table tr{border:0}.ss360-content-container table tr td{border:0;padding:0}.ss360-content-container table tr td:first-of-type{font-weight:700;padding-right:10px}a.ss360-result-link{display:block;font-size:14px;color:#006621;word-break:break-word;padding-right:1em}#ss360-404-layer #ss360-sorting-selection{display:none}#ss360-search-result-heading+#ss360-sorting{margin-top:-.5em;margin-bottom:.25em}@media (max-width:680px){#ss360-sorting-selection{margin-right:15px}}.unibox-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}#unibox-suggest-box,#unibox-suggest-box-special{position:absolute;display:none;border:1px solid #e5e5e5;background-color:#fff;color:#333;overflow:hidden;z-index:1500}#unibox-suggest-box-special a,#unibox-suggest-box a{text-decoration:none;color:#1c5d7d}#unibox-suggest-box-special .unibox-suggest-heading,#unibox-suggest-box .unibox-suggest-heading{margin-left:8px;margin-top:6px;margin-bottom:6px;font-size:18px;text-align:left;color:#000}#unibox-suggest-box-special>*>div,#unibox-suggest-box>*>div{padding:6px 8px}#unibox-suggest-box-special .unibox-selectable.active a,#unibox-suggest-box-special .unibox-selectable:hover a,#unibox-suggest-box .unibox-selectable.active a,#unibox-suggest-box .unibox-selectable:hover a{color:#fff}#unibox-suggest-box-special.unibox--fullwidth,#unibox-suggest-box.unibox--fullwidth{width:100%!important;max-width:100%!important;min-width:100%!important;left:0!important}#unibox-suggest-box-special.unibox--fullwidth .unibox-selectable,#unibox-suggest-box.unibox--fullwidth .unibox-selectable{padding:1em}.unibox-stretch{height:100%!important}#unibox-special section,section#unibox-special{margin:0;padding:0}#unibox-special{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000000;overflow:hidden}#unibox-special .input-container{width:calc(100% - 2px);border:1px solid #bbb;background:#fff}#unibox-special .unibox-special-searchbox{width:calc(100% - 126px);height:48px;font-size:19px;margin:16px 63px;border:1px solid #bbb;border-radius:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 .5rem}#unibox-special .unibox-special-icon{position:absolute;top:16px;height:50px;width:50px;padding:0;background:transparent;border:none;cursor:pointer}#unibox-special .unibox-special-close{left:0;border-right:1px solid #bbb;background:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+") no-repeat 50%;background-size:24px}#unibox-special .unibox-special-searchbutton{right:0;border-left:1px solid #bbb;background:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0E2LjQ3MSA2LjQ3MSAwIDAgMCAxNiA5LjUgNi41IDYuNSAwIDEgMCA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=") no-repeat 50%;background-size:24px}#unibox-special #unibox-suggest-box-special{overflow-y:scroll;-webkit-overflow-scrolling:touch;position:absolute;overflow-x:hidden;display:block;width:100%;height:100%;margin-top:2px}#unibox-special #unibox-suggest-box-special .unibox-selectable{min-height:50px}.move--left{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.move--left,.move--right{transition-timing-function:ease-out;pointer-events:none;transition-delay:0s}.move--right{-webkit-transform:translateZ(0);transform:translateZ(0)}.unibox-selectable{clear:both;position:relative;font-size:14px;text-align:left;display:flex}.unibox-selectable .unibox-selectable-img-container{width:60px;float:left;margin-right:6px}.unibox-selectable img{max-width:60px;max-height:60px}.unibox-selectable img.unibox-vis{width:70px}.unibox-selectable a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.unibox-selectable .unibox-highlight,.unibox-selectable span span{font-weight:700}.unibox-selectable p.unibox-result-content{margin-top:5px;margin-bottom:15px}.unibox-selectable .unibox-extra{position:absolute;top:25px;left:75px}.unibox-selectable .unibox-ca{clear:both}.unibox-selectable.active,.unibox-selectable:hover{background-color:#1c5d7d;color:#fff;cursor:pointer}.unibox-selectable.active .unibox-extra,.unibox-selectable.active a,.unibox-selectable.active span,.unibox-selectable:hover .unibox-extra,.unibox-selectable:hover a,.unibox-selectable:hover span{color:#fff}#unibox-suggest-box.unibox--fullwidth .unibox-extra{top:calc(25px + 1em);left:calc(70px + 1em)}#unibox-invisible{visibility:hidden;position:relative;text-align:left;height:0;display:none}.unibox-ivf{width:76px;height:76px;position:absolute;top:-89px;left:-15px}.unibox-ivf img{max-width:76px;position:absolute;top:0;bottom:0;margin:auto;transition:.3s ease-out;-webkit-transition:.3s ease-out;-webkit-transform:rotateX(-90deg) translateY(100%);transform:rotateX(-90deg) translateY(100%)}.unibox-ivf img.l{-webkit-transform:rotateX(0) translateY(0);transform:rotateX(0) translateY(0)}.unibox-selectable.unibox-show-all{width:100%;background:none;border:none;color:#1c5d7d;display:flex;flex-direction:row;justify-content:center;align-items:center}.unibox-selectable.unibox-show-all.active,.unibox-selectable.unibox-show-all:hover{text-decoration:underline}.unibox-selectable.unibox-show-all i{margin-left:9px;margin-top:2px}.unibox-selectable.unibox-show-all span{color:#1c5d7d}.ss360-voice-search{border-color:transparent;border-radius:50%;background:transparent;cursor:pointer;z-index:2;padding:0}.ss360-recording{background-color:#e05350;-webkit-animation-name:ss360-recording;animation-name:ss360-recording;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.ss360-sldr-handle{position:absolute;width:30px;height:30px;border-radius:15px!important;border:2px solid #1c5d7d;cursor:pointer;box-shadow:.5px .5px 2px 1px rgba(28,93,125,.32);background:#fff;box-sizing:border-box;left:0;transition:left .05s ease-in-out;touch-action:pan-x}.ss360-sldr-handle.ss360-focus,.ss360-sldr-handle:focus{outline:none;border-color:#fff;background:#1c5d7d}.ss360-sldr-bar,.ss360-sldr-handle{user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;-ms-user-select:none}.ss360-sldr-bar{width:calc(100% - 30px);position:absolute;height:6px;top:12px;background:#aaa;margin-left:15px;margin-right:15px;box-sizing:border-box;left:0}.ss360-sldr--a{transition:left .05s ease-in-out,width .05s ease-in-out;background:#1c5d7d}.ss360-sldr-input{font-size:1em;width:50px;border-radius:2px;border:1px solid #aaa;text-align:center;vertical-align:middle;line-height:1em;padding:2px 0;margin-top:0;margin-bottom:0}.ss360-sldr-value-wrap{position:absolute;top:40px}.ss360-sldr-value-wrap.ss360-sldr--rw{left:calc(100% - 52px)}.ss360-sldr-unit{font-size:1em;line-height:1em;padding:3px 6px;border:1px solid #aaa;border-radius:2px;border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}.ss360-sldr-unit.ss360-sldr--unit-r{left:calc(100% - 41px)}#ss360-filter{margin-bottom:1em}.ss360-filter-group{position:relative;padding-right:1em}.ss360-filter-group.ss360-active .ss360-filter-btn{color:#1c5d7d}.ss360-filter-group fieldset{border:none;max-height:350px;overflow-y:auto}.ss360-filter-group fieldset::-webkit-scrollbar-track{border-radius:4px;box-shadow:inset 0 0 4px rgba(0,0,0,.1);background-color:#fefefe}.ss360-filter-group fieldset::-webkit-scrollbar{width:8px;background-color:#fefefe}.ss360-filter-group fieldset::-webkit-scrollbar-thumb{border-radius:4px;box-shadow:inset 0 0 4px rgba(0,0,0,.1);background-color:#888}.ss360-slider-wrapper{display:block;position:relative;width:100%;max-width:300px}.ss360-filter-content{opacity:0;transition:opacity .3s ease-in-out;box-sizing:content-box}.ss360-filter-btn{font-size:1.1em;font-weight:700;cursor:pointer;transition:color .3s ease-in-out;border:none;background:#fff;color:#080808}.ss360-filter-btn i{width:24px;height:100%;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out;line-height:normal}.ss360-filter-btn i.ss360-active{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ss360-multiselect-filter fieldset>div{width:100%}.ss360-checker-row{width:auto;min-width:150px;position:relative;padding-left:30px;cursor:pointer;font-size:1em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:.5em 0}.ss360-checker-row input[type=checkbox]{position:absolute;opacity:0;cursor:pointer}.ss360-checker-row label{cursor:pointer;margin:0}.ss360-checker-row .checkmark{position:absolute;top:-1px;left:0;height:20px;width:20px;background-color:#aaa;transition:all .3s ease-in-out}.ss360-checker-row:hover .checkmark{background-color:#626262}.ss360-checker-row .checkmark:after{content:"";position:absolute;display:none;left:6px;top:2px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);box-sizing:content-box}.ss360-checker-row input[type=checkbox]:checked~label .checkmark{background-color:#1c5d7d}.ss360-checker-row input[type=checkbox]:checked~label .checkmark:after{display:block}.ss360-checker-row input[type=checkbox]:focus~label .checkmark{outline:1px dotted #1c5d7d;outline:5px auto -webkit-focus-ring-color}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-group .ss360-filter-content{position:absolute;background:hsla(0,0%,100%,.99);min-height:120px;height:auto;z-index:1499;padding:0 .5em 30px;box-shadow:0 10px 20px -10px rgba(0,0,0,.25)}.ss360-layer-content:not(.ss360-filter--left) .ss360--long .ss360-checker-row{width:25%;max-width:25%;margin-right:1em}.ss360-layer-content:not(.ss360-filter--left) .ss360--long .ss360-checker-row label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-break:break-word}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-group:not(.ss360-active) .ss360-filter-content{display:none}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active{position:relative;border:2px solid #ccc}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active:after{width:100%;content:"";position:absolute;height:4px;background:#fff;bottom:-4px;left:0;z-index:9999}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active+.ss360-filter-content{border:2px solid #ccc}@media (min-width:992px){.ss360-layer-content.ss360-filter--left.ss360-grid--lg .ss360-group>ul>.ss360-suggests>article>header>span{max-width:500px}}.ss360-layer-content.ss360-filter--left #ss360-search-result-heading,.ss360-layer-content.ss360-filter--left .ss360-query-correction{width:100%}.ss360-layer-content.ss360-filter--left fieldset{border:none;margin:0;padding:0}.ss360-layer-content.ss360-filter--left fieldset .ss360-checker-row label{white-space:nowrap;text-overflow:ellipsis;word-break:break-word;max-width:150px;overflow:hidden}.ss360-layer-content.ss360-filter--left #ss360-filter{flex:1;min-width:240px;max-width:300px;padding:0 1em}.ss360-layer-content.ss360-filter--left .ss360-filter-group{padding:0 1em 0 0}.ss360-layer-content.ss360-filter--left #ss360-filtered-results{flex:3}.ss360-layer-content.ss360-filter--left .ss360-range-filter.ss360-active{min-height:100px}.ss360-layer-content.ss360-filter--left .ss360-filter-group{padding:0}.ss360-layer-content.ss360-filter--left .ss360-filter-group:not(:last-of-type){margin-bottom:2em;transition:margin-bottom .3s ease-out}.ss360-layer-content.ss360-filter--left .ss360-filter-group:not(:last-of-type):not(.ss360-active){margin-bottom:0}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content{display:block;opacity:1;overflow:hidden;width:100%;transition:height .3s ease-out}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content .ss360-slider-wrapper{min-height:70px}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content .ss360-slider-wrapper.ss360-histogram{min-height:140px}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-btn{width:100%;margin-bottom:.8em;padding-right:1em;justify-content:space-between;align-items:baseline}.ss360-show-mobile-filter{display:none;position:absolute;right:0;top:-6px;width:24px;height:24px;padding:8px;box-sizing:content-box;background:#f6f6f6;border:none;border-radius:2px;cursor:pointer}#ss360-filter .ss360-close-button,.ss360-filter-heading{display:none}@media (max-width:991px){.ss360-filter-heading,.ss360-show-mobile-filter{display:block}#ss360-filter .ss360-close-button{top:0;right:0;display:block}.ss360-filter-backdrop{position:fixed;width:100%;height:100%;background:rgba(0,0,0,.25);top:0;left:0;display:none;opacity:0;transition:opacity .3s ease-in-out;z-index:1}.ss360-filter-backdrop.ss360-open{display:block;opacity:1}.ss360-filter--left #ss360-search-result-heading{padding-right:40px}.ss360-filter--left #ss360-filter{position:fixed;background:#fff;z-index:99999;top:0;right:0;height:100%;overflow-y:auto;width:400px;max-width:400px;-webkit-transform:matrix(1,0,0,1,400,0);transform:matrix(1,0,0,1,400,0);-webkit-overflow-scrolling:touch;box-shadow:0 0 20px 2px rgba(0,0,0,.25);transition:.3s ease-in;box-sizing:border-box;display:none;visibility:hidden}.ss360-filter--left #ss360-filter.ss360-open{visibility:visible;-webkit-transform:translateX(0);transform:translateX(0)}}@media (max-width:680px){.ss360-filter--left #ss360-filter{width:350px;-webkit-transform:matrix(1,0,0,1,350,0);transform:matrix(1,0,0,1,350,0)}}@media (max-width:425px){.ss360-filter--left #ss360-filter{width:300px;-webkit-transform:matrix(1,0,0,1,300,0);transform:matrix(1,0,0,1,300,0)}}@media (max-width:360px){.ss360-filter--left #ss360-filter{width:250px;-webkit-transform:matrix(1,0,0,1,250,0);transform:matrix(1,0,0,1,250,0)}}.ss360-filter--count{margin-left:6px;color:#aaa}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-bar{top:67px}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-handle{top:55px}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-value-wrap{top:95px}.ss360-delete-filter-bar{width:100%}.ss360-delete-filter-bar button{border:2px solid #1c5d7d;background:#fff;padding:6px;margin-bottom:1em;cursor:pointer;margin-left:1em;color:#080808;line-height:normal}.ss360-delete-filter-bar button>*{line-height:normal}.ss360-delete-filter-bar button i{line-height:1.2em;font-size:1.2em;color:#1c5d7d;font-weight:700;margin-left:.5em;font-style:normal;height:18px;width:18px;border-radius:9px;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-delete-filter-bar button:hover i{background:#1c5d7d;color:#fff}.ss360-delete-filter-bar button.ss360-filter--delete-all{color:#1c5d7d;font-weight:700;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-delete-filter-bar button.ss360-filter--delete-all:hover{color:#fff;background:#1c5d7d}@media (max-width:767px){.ss360-delete-filter-bar{flex-wrap:nowrap;overflow-x:auto}.ss360-delete-filter-bar button{flex:0 0 auto}.ss360-delete-filter-bar button:first-of-type{margin-left:0}}@media (max-width:991px){.ss360-layer-content.ss360-filter--left .ss360-delete-filter-bar~#ss360-filtered-results{flex:none;width:100%}}'

      /***/
    },, /* 7 */ /* 6 */,

    /* 5 */ /***/ function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)

      // EXTERNAL MODULE: ./src/js/sxQuery/sxQuery.js + 1 modules
      var sxQuery_sxQuery = __webpack_require__(0)

      // CONCATENATED MODULE: ./src/js/siteSearch/configuration/DefaultConfig.js

      var DefaultConfig = {
        showErrors: true,
        // whether to show implementation errors, set to false for production
        allowCookies: true,
        // whether to allow the javascript to set cookies
        suggestions: {
          show: true,
          // whether to show search suggestions
          showOnMobile: true,
          // whether to show seearch suggestions on mobile devices (less than 768px), disables specialMobileSuggestions if set to false, default: true
          url: '',
          // the URL that provides the data for the suggest
          maxQuerySuggestions: 3,
          // the maximum number of query suggestions
          querySuggestionHeadline: undefined,
          // the headline of the query suggestions, leave blank if no headline should be shown
          emptyQuerySuggestions: undefined,
          showImages: true,
          // show images in search suggestions
          equalSearch: false,
          // whether suggestions should be handled separately or whether the search results should be the suggestions
          num: 6,
          // the maximum number of search suggestions to be shown
          minChars: 3,
          // minimum number of characters before the suggestions shows, default: 3,
          maxWidth: 'auto',
          // the maximum width of the suggest box, default: as wide as the input box, at least 275px
          throttleTime: 300,
          // the number of milliseconds before the suggest is triggered after finished input, default: 300ms
          instantVisualFeedback: 'none',
          // where the instant visual feedback should be shown, 'top', 'bottom', 'all', or 'none', default: 'none'
          extraHtml: undefined,
          // extra HTML code that is shown in each search suggest, you can even show values of datapoints here
          highlight: true,
          // whether matched words should be highlighted, default: true
          queryVisualizationHeadline: '',
          // a headline for the image visualization, default: empty
          dataPoints: undefined,
          // mapping of data point names to extraHtml, overrides extraHtml setting, e.g. {price: {html: '<span>#price# $</span>', position: 1}, category: {html: '<b>#category#</b>', position: 2}}
          viewAllLabel: undefined,
          // the label of a 'View All' button shown at the end of the suggestion list, default: undefined - no 'View All' button will be added
          forceBelow: false,
          // whether to force the suggestions to be shown below the search box (default: false)
          mobileScrollOnFocus: true // whether to scroll the page in order for the search box to be to the top of the window (on screens below 768 px)
        },
        style: {
          themeColor: '#1C5D7D',
          // the theme color affecting headlines, buttons, and links
          suggestions: undefined,
          defaultCss: true,
          // whether to include the default CSS,
          searchBox: undefined,
          loaderType: 'circle',
          // can be "circle" or "square"
          animationSpeed: 250,
          // speed of the animations in milliseconds
          additionalCss: undefined // additional CSS to add to the plugin's stylesheets: e.g. '#ss360-layer{background: red;}'
        },
        searchBox: {
          placeholder: undefined,
          autofocus: false,
          // if true, the search box will get focus after initialization
          selector: '#searchBox',
          // the selector to the search box,
          searchButton: undefined,
          // CSS selector of search buttons
          focusLayer: false // if true, a layer will be shown when the user focuses on the search input
        },
        results: {
          embedConfig: undefined,
          // {'url':undefined,'contentBlock':'.page-content-body'}, // if url is given the page will change to that URL and look for the content block there to insert the results
          fullScreenConfig: undefined,
          // {trigger: '#ss360-search-trigger', caption: 'Search this site'}, trigger is the CSS selector to the element that starts the search full screen overlay and searchCaption the caption on the full screen search page
          caption: 'Found #COUNT# search results for "#QUERY#"',
          // the caption of the search results
          group: true,
          // whether results should be grouped if content groups are available
          filters: undefined,
          num: 96,
          // the maximum number of search results to be shown
          highlightQueryTerms: true,
          // whether to highlight the query terms in search results
          moreResultsButton: 'Show more results',
          // HTML for the more results button, all results will be shown if this is null
          noResultsText: 'Sorry, we have not found any matches for your query.',
          // the text to show when there are no results
          queryCorrectionText: 'Did you mean "#CORRECTION#"?',
          // #CORRECTION# will be replace automatically by the corrected query
          searchQueryParamName: 'ss360Query',
          // the name of the search query parameter
          linksOpenNewTab: false,
          // should clicking on the result links open a new tab/window?
          showSearchBoxLayover: true,
          // whether to show search box in search result layover
          moreResultsPagingSize: 12,
          // the number of new results to show each time the more results button is pressed (max: 24)
          orderByRelevanceText: 'Relevance',
          // the text to be shown in order select box to describe 'order by relevance' option
          redirectOnSingle: false,
          // whether to redirect instead of showing a single search result
          collapseDataPoints: undefined,
          // the (html) string to be used when merging rows of the structured data table having the same key, default: undefined (rows won't be merged), e.g. '<br/>'
          limitPerGroup: true,
          // if set to true, the maximum number of search results will be applied to every single content group, otherwise the limit will be spread across all groups, default: true
          stripHttp: false,
          // if set to true the protocol part (http:// or https://) will be removed from the visible url shown in the search results
          highlightSearchTerms: true,
          // whether to highlight parts of the query after redirect to a specific search result
          layoverTrigger: undefined // a CSS selector that points to an element which should trigger the showing of the layover search layer
        },
        contentGroups: {
          include: undefined,
          // json array of content group names to be included in the search result
          exclude: undefined,
          // json array of content group names to be excluded from the search result
          otherName: '',
          // the name of the results not in any other content group
          ignoreOther: false // whether or not to ignore the "other" content group
        },
        tracking: {
          providers: [],
          // how to track, supported values: 'GA' (Google Analytics), 'GTM' (Google Tag Manager)
          searchCallback: undefined,
          // callback before SERP is reported, SERP events aren't reported if this returns false, you'll get the query as the parameter for the callback
          enhanced: true,
          logQueries: true
        },
        callbacks: {
          suggestChange: undefined,
          // callback triggered after suggestion set is changed, takes boolean indicating whether suggestions are visible as argument
          redirect: undefined,
          // callback to handle search redirects, takes redirect url as parameter, window.location.href is changed by default
          preSearch: undefined,
          // a callback that is triggered before the search is executed, e.g. to catch empty queries
          postSearch: undefined,
          // a callback that is triggered after the search results have been populated
          preSuggest: undefined,
          // a callback that is triggered before the search suggest is executed, takes the query and search box reference as arguments
          searchResult: undefined,
          // a callback that is triggered after the search is executed, e.g. to build your own result page from the response
          closeLayer: undefined,
          init: undefined,
          // function to call after initialization is complete
          moreResults: undefined // a callback to call when the 'Show More Results' button is clicked
        },
        accessibility: {
          isMainContent: false,
          // whether to mark ss360 layer as main content of the page
          resultTopHeadingLevel: 2,
          // heading level to start with in search result (default h2)
          suggestHeadingLevel: 2,
          // heading level to use in search suggestions, for content group heading
          searchFieldLabel: 'Search',
          // invisible label to be used with screen readers when search field is focused, will only be used if value is not empty and there is no label element associated to the search field,default: 'Search'
          srSuggestionsHiddenText: 'Search suggestions are hidden',
          // text to announce @screen reader after search suggestions have been hidden
          srNoSuggestionsText: 'No search suggestions',
          // text to announce @screen reader if no suggestions are available
          srSuggestionsCountText: '#COUNT# search suggestions shown',
          // text to announce @screen reader after search suggestions have been shown, #COUNT# will be replaced with the suggestion count
          srOneSuggestionText: 'One search suggestion shown',
          // text to announce @screen reader after search suggestions have been shown
          srSuggestBoxControlDescription:
            'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.' // text to announce @screen reader after search input is focused - describes keyboard controls
        },
        specialMobileSuggest: {
          enabled: false,
          // whether to show special mobile suggests, default: false
          breakpoint: 768,
          // css breakpoint to show mobile suggests (max-width: breakpoint)
          placeholder: '',
          // placeholder for empty suggestions
          searchBoxPlaceholder: '',
          // the special search box placeholder
          customTopHtml: '',
          // additional html/text content to be shown above special mobile search field
          animateTransitions: true,
          // whether to animate special mobile transitions
          resizeSearchBoxOnScroll: true,
          // whether to resize search field when user scrolls special mobile suggests
          trigger: '.ss360-special-mobile-trigger'
        },
        smart404: {
          identifier: 'Page not found',
          // the string in the title that identifies the page as a 404 page
          resultSelector: '#ss360-404',
          // a CSS selector that points to the area in which the alternative links should be shown
          caption: 'Try going here instead:' // caption for 404 results
        },
        layout: {
          mobile: {
            // below 992px
            type: 'list',
            // can be "grid" or "list", default: "list"
            showImages: true,
            // whether to show images in search result, default: true
            showSnippet: true,
            // whether to show text snippet in search result, default: true
            showTitle: true,
            // whether to show title in search result, default: true
            showDataPoints: true,
            // whether to show data points in search result, default: true
            showUrl: false,
            // whether to show link in search result, default: false
            gridColsMd: 2,
            // grid layout column count for devices between 768px and 991px, default: 2
            gridColsSm: 1 // grid layout column count for devices below 768px, default: 1
          },
          desktop: {
            // 992 px and larger
            type: 'list',
            //  can be "grid" or "list", default: "list"
            showImages: true,
            // whether to show images in search result, default: true
            showSnippet: true,
            // whether to show text snippet in search result, default: true
            showTitle: true,
            // whether to show title in search result, default: true
            showDataPoints: true,
            // whether to show data points in search result, default: true
            showUrl: false,
            // whether to show link in search result, default: false
            gridColsXl: 4,
            // grid layout column count for devices larger than 1200px, default: 4
            gridColsLg: 3 // grid layout column count for devices between 992px and 1199px, default: 3
          },
          navigation: {
            position: 'none',
            // navigation "top", "left", or "none"
            type: 'scroll',
            // the navigation layout 'scroll' or 'tabs', for more then 6 (position: 'top') or 10 (position: 'left') content groups the 'scroll' navigation will be used
            tabSpacingPx: 5,
            // spacing between tabs
            borderRadiusPx: 3,
            // tab border radius
            tabTitle: "Found #COUNT# #NAME# for '#QUERY#'",
            // e.g. 'Found 43 Recipes for "curry"'
            showGroupResultCount: true,
            // whether to show the count of results in specific content group in the navigation
            forceTabs: true,
            // whether to force tabs to be shown (even for high content group count or a single content group), applied to desktop only
            fallbackToScroll: false // whether to use scroll navigation instead of tabs on desktop devices (992px and more) when more than 5 (top navigation) or 10 (left navigation) content groups are shown
          }
        },
        voiceSearch: {
          enabled: false,
          // whether to enable voice search for supported browsers (an microphone icon will be added to your search field if Speech Recognition API is supported)
          lang: 'en-US' // the input language (BCP 47 language tag)
        },
        filters: {
          enabled: false,
          // whether to generate and show filter options, default: false
          position: 'left',
          // where to place the filter view, one of the following: "top", "left"; "top" - filters will be shown above the search results, "left" - filters will be shown to the left of search results + "show filter" button will be added for mobile devices; default: "left" for embeded or fullscreen search results, "top" otherwise
          label: 'Filter',
          // the label of the filter column, will be also used as screen reader text
          showCounts: true,
          // whether to show result counts for multiple choice filters
          showQuickDelete: true,
          // whether to show a "Quick Delete" bar summarizing active filter options and providing a "delete all" option
          deleteAllLabel: 'Clear All',
          // the label of the "delete all" option
          settings: {} // range filter settings, e.g. {Price: {unit: '$', step: 1, drawHistogram: false}}
        },
        dataPoints: {
          exclude: [],
          // data points that should not be shown in the UI
          single: [] // data points where only the first one should be shown (if multiple values are present)
        }
      }
      /* harmony default export */ var configuration_DefaultConfig = DefaultConfig
      // EXTERNAL MODULE: ./src/js/siteSearch/ui/SvgMagnifierIcon.js
      var SvgMagnifierIcon = __webpack_require__(1)

      // CONCATENATED MODULE: ./src/js/siteSearch/ui/UiHelper.js

      var SvgMagnifierIconString =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
      var SvgMicrophoneIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>'
      var base64Prefix = 'data:image/svg+xml;base64,'
      var Ss360DocIcons = [
        'pdf.svg',
        'xls.svg',
        'javascript.svg',
        'odp.svg',
        'ods.svg',
        'odt.svg',
        'ppt.svg'
      ]
      var UiHelper = {
        showLoadingAnimation: function showLoadingAnimation () {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-searchbox-spinner'
          ).fadeIn()
        },
        hideLoadingAnimation: function hideLoadingAnimation () {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-searchbox-spinner'
          ).fadeOut()
        },
        showError: function showError (message) {
          Object(sxQuery_sxQuery['a' /* default */])('.ss360DevError').remove()
          var errorMessage = Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360DevError" style="padding:10px;width:100%;position:fixed;bottom:0;left:0;background-color:#C1063F;color:white;"><b>Site Search 360 Error:</b> ' +
              message +
              '</div>'
          )
          Object(sxQuery_sxQuery['a' /* default */])('body').append(
            errorMessage
          )
        },
        showFullscreenLayer: function showFullscreenLayer (
          searchBoxSelector,
          animationSpeed
        ) {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).addClass('active')
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).animateTop('0%', animationSpeed)
          Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).focus()
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360CloseLayerButton'
          ).css('position', 'fixed')

          if (
            sxQuery_sxQuery['a' /* default */].matchesMediaQuery('min', 968)
          ) {
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360CloseLayerButton'
            ).css('right', '20px')
          }

          Object(sxQuery_sxQuery['a' /* default */])('body').css(
            'overflow',
            'hidden'
          )
        },
        hideFullscreenLayer: function hideFullscreenLayer (animationSpeed) {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).removeClass('active')
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).animateTop('-100%', animationSpeed)
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360CloseLayerButton'
          ).css('position', 'absolute')
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360CloseLayerButton'
          ).css('right', '8px')
          Object(sxQuery_sxQuery['a' /* default */])('body').css(
            'overflow',
            'initial'
          )
        },
        hideLayoverLayer: function hideLayoverLayer (callback) {
          var layer = Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer')
          Object(sxQuery_sxQuery['a' /* default */])('#ss360Darken').remove()
          layer.removeClass('ss360-animated ss360-bi ss360-fid')
          layer.addClass('ss360-animated ss360-bo')
          setTimeout(callback, 500)
        },
        addDarkenInputLayer: function addDarkenInputLayer (selectedSearchBox) {
          UiHelper.removeDarkenInputLayer()
          var darkBg = Object(sxQuery_sxQuery['a' /* default */])(
            '<div id="ss360Darken-input"></div>'
          )
          selectedSearchBox.parent().css('z-index', '999999')
          selectedSearchBox
            .parent()
            .parent()
            .append(darkBg)
        },
        removeDarkenInputLayer: function removeDarkenInputLayer () {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360Darken-input'
          ).remove()
        },
        isDocIcon: function isDocIcon (imagePath) {
          return imagePath !== undefined
            ? Ss360DocIcons.indexOf(
              imagePath
                .replace('https://sitesearch360.com/cdn/', '')
                .replace('https://cdn.sitesearch360.com/', '')
            ) !== -1
            : false
        },

        /**
         *Get parts of the layout that should be hidden, modify layer if only on desktop or mobile
         *
         * @param {object} layoutMobile - the mobile layout configuration object
         * @param {object} layoutDesktop - the desktop layout configuration object
         * @param {SxQueryObject} layerContent - the layer to modify
         */
        getHiddenParts: function getHiddenParts (layoutMobile, layoutDesktop) {
          var visibilityKeys = [
            'images',
            'snippet',
            'title',
            'dataPoints',
            'url'
          ]
          return visibilityKeys.reduce(function (acc, key) {
            var settingKey =
              'show' + key.charAt(0).toUpperCase() + key.substring(1)
            var hidden = 'none'

            if (!layoutMobile[settingKey] && !layoutDesktop[settingKey]) {
              hidden = 'all'
            } else if (!layoutMobile[settingKey]) {
              hidden = 'mobile'
            } else if (!layoutDesktop[settingKey]) {
              hidden = 'desktop'
            }

            acc[key] = hidden
            return acc
          }, {})
        },
        updateLayerByHiddenParts: function updateLayerByHiddenParts (
          hiddenParts,
          layerContent
        ) {
          if (layerContent === undefined) {
            return
          }

          Object.keys(hiddenParts).forEach(function (key) {
            if (hiddenParts[key] === 'all') {
              return
            }

            if (hiddenParts[key] === 'mobile') {
              layerContent.addClass('ss360-hide-' + key + '--sm')
            }

            if (hiddenParts[key] === 'desktop') {
              layerContent.addClass('ss360-hide-' + key + '--lg')
            }
          })
        },
        getSvgMagnifier: function getSvgMagnifier (fill) {
          return SvgMagnifierIconString.replace(/#FILL#/g, fill)
        },
        getSvgMicrophone: function getSvgMicrophone () {
          return SvgMicrophoneIcon
        },
        svgToBase64: function svgToBase64 (svgString) {
          return base64Prefix + btoa(svgString)
        },
        getBase64Magnifier: function getBase64Magnifier (fill) {
          return this.svgToBase64(this.getSvgMagnifier(fill))
        },
        getLogoSrc: function getLogoSrc (allowCookies) {
          return allowCookies
            ? 'https://cdn.sitesearch360.com/ss360-logo.svg'
            : 'https://nc.sitesearch360.com/ss360-logo.svg'
        },
        hideBrokenImages: function hideBrokenImages (imgNodeArr) {
          var _loop = function _loop () {
            var item = imgNodeArr[i]
            var src = item.src
            var image = new Image()

            image.onerror = function () {
              Object(sxQuery_sxQuery['a' /* default */])(item).hide()
            }

            image.src = src
          }

          for (var i = 0; i < imgNodeArr.length; i++) {
            _loop()
          }
        },
        highlightQueryTermsInResult: function highlightQueryTermsInResult (
          query
        ) {
          var parts = query.split(' ')

          for (var p = 0; p < parts.length; p++) {
            try {
              Object(sxQuery_sxQuery['a' /* default */])(
                'div.ss360-content-container > p, .ss360-suggests header a'
              ).highlight(parts[p], 'ss360-highlight')
            } catch (e) {
              console.log(e)
            }
          }
        }
      }
      /* harmony default export */ var ui_UiHelper = UiHelper
      // CONCATENATED MODULE: ./src/js/siteSearch/configuration/ConfigurationHelper.js

      var ConfigurationHelper = {
        /**
         * Update the ss360Settings object
         *
         * @param {object} ss360Settings the object to be updated
         * @param {string} key the key of the target property
         * @param {*} value the value to be set
         */
        updateConfig: function updateConfig (ss360Settings, key, value) {
          var parts = key.split('.')
          var target = ss360Settings

          for (var i = 0; i < parts.length; i++) {
            if (i < parts.length - 1) {
              target = target[parts[i]]
            } else {
              target[parts[i]] = value
            }

            if (!target) {
              break
            }
          }
        },
        assert: function assert (config, settings) {
          config = config || {}

          if (config['smart404'] === undefined) {
            settings['smart404'] = undefined
          }

          settings['results']['moreResultsPagingSize'] = Math.min(
            24,
            settings['results']['moreResultsPagingSize']
          ) // reverse for unibox

          settings['emptyQuerySuggests'] =
            settings['suggestions']['emptyQuerySuggestions'] // set default value for special mobile suggest

          if (settings['specialMobileSuggest']['enabled'] == undefined) {
            settings['specialMobileSuggest']['enabled'] =
              settings['style']['defaultCss']
          }

          if (
            settings['suggestions']['show'] === false ||
            settings['suggestions']['showOnMobile'] === false
          ) {
            settings['specialMobileSuggest']['enabled'] = false
          } // don't allow left navigation on mobile devices

          if (
            settings['layout']['navigation']['position'] == 'left' &&
            sxQuery_sxQuery['a' /* default */].matchesMediaQuery('max', 991)
          ) {
            settings['layout']['navigation']['position'] = 'top'
          } // don't allow navigation if filters are enabled

          if (settings['filters']['enabled']) {
            settings['layout']['navigation']['position'] = 'none'
          }
        },
        extendUniboxOptions: function extendUniboxOptions (settings, options) {
          options.callbacks = {}
          options.callbacks['enterResult'] = settings.callbacks['enterResult']
          options.callbacks['type'] = settings.callbacks['type']
          options.callbacks['focus'] = settings.callbacks['focus']
          options.callbacks['blur'] = settings.callbacks['blur']
          options.callbacks['preSuggest'] = settings.callbacks['preSuggest']

          options.callbacks['enter'] = function (query, button, hideHandler) {
            settings['callbacks']['enter'](
              query,
              undefined,
              undefined,
              undefined,
              button,
              hideHandler
            )
          }

          options.callbacks.suggestsBuilt = function (suggestBox, data) {
            if (data['plan'] == 'FREE') {
              suggestBox.append(
                '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:150px!important;float:right;" src="' +
                  ui_UiHelper.getLogoSrc(settings['allowCookies']) +
                  '"></a></div>'
              )
            }
          }

          var suggestSettings = settings['suggestions']
          options.maxWidth = suggestSettings['maxWidth']
          options.throttleTime = suggestSettings['throttleTime']
          options.instantVisualFeedback =
            suggestSettings['instantVisualFeedback']
          options.extraHtml = suggestSettings['extraHtml']
          options.highlight = suggestSettings['highlight']
          options.queryVisualizationHeadline =
            suggestSettings['queryVisualizationHeadline']
          options.suggestUrl = suggestSettings['url']
          options.showImagesSuggestions = suggestSettings['showImages']
          options.minChars = suggestSettings['minChars']
          options.placeholder = settings['searchBox']['placeholder']
          options.animationSpeed = settings['style']['animationSpeed']
          options.dataPoints = suggestSettings['dataPoints']
          options.viewAllLabel = suggestSettings['viewAllLabel']
          options.showOnMobile = suggestSettings['showOnMobile']
          options.mobileScrollOnFocus = suggestSettings['mobileScrollOnFocus']
          options.enabled = settings['suggestions']['show']
          options.loaderSelector = '#ss360-searchbox-spinner'
          options.viewKeyMappings = {
            ss360QuerySuggestions:
              'ss360Config' in window && 'suggestions' in window.ss360Config
                ? window.ss360Config['suggestions']['querySuggestionHeadline']
                : undefined,
            _: settings['contentGroups']['otherName'] || undefined
          }
          options.themeColor = settings['style']['themeColor']
          options.forceBelow = settings['suggestions']['forceBelow']
          options['accessibility']['headingLevel'] =
            settings['accessibility']['suggestHeadingLevel']
          options.specialMobileSuggest['autoHide'] = false

          options.specialMobileSuggest['hiddenCallback'] = function () {
            // focus layer header
            setTimeout(function () {
              Object(sxQuery_sxQuery['a' /* default */])(
                '#ss360-search-result-heading a'
              ).focus()
            }, 200)
          }

          options.trackingCallbacks = {
            select: function select (
              searchBox,
              suggestBox,
              target,
              query,
              suggestions,
              position,
              link
            ) {
              if ('SS360Insights' in window) {
                Object(sxQuery_sxQuery['a' /* default */])(window).off(
                  'beforeunload.ss360Insights'
                )
                window.SS360Insights.trackSelectSuggest(
                  searchBox,
                  suggestBox,
                  target,
                  query,
                  suggestions.length,
                  position,
                  link
                )
              }
            },
            show: function show (
              searchBox,
              suggestBox,
              suggestion,
              query,
              suggestions
            ) {
              if ('SS360Insights' in window) {
                window.SS360Insights.trackShowSuggests(
                  searchBox,
                  suggestBox,
                  suggestion,
                  query,
                  suggestions.length
                )
              }
            },
            change: function change (searchBox) {
              if ('SS360Insights' in window) {
                window.SS360Insights.collectSearchBoxChange(searchBox)
              }
            },
            abandon: function abandon (query, suggestionCount, searchBox) {
              if ('SS360Insights' in window) {
                SS360Insights.trackSearchBoxAbandon(
                  query,
                  suggestionCount,
                  searchBox
                )
              }
            }
          }
        }
      }
      /* harmony default export */ var configuration_ConfigurationHelper = ConfigurationHelper
      // EXTERNAL MODULE: ./src/js/unibox/unibox.js
      var unibox_unibox = __webpack_require__(2)

      // CONCATENATED MODULE: ./src/js/insights/insights.js

      var insights_SSInsights = function SSInsights (siteId, allowCookies) {
        var searchQueryCache = {}
        var suggestionQueryCache = {}

        var getStringValue = function getStringValue (val) {
          if (val === undefined) {
            return '---'
          }

          return val.trim()
        }

        var encodeComponent = function encodeComponent (component) {
          return encodeURIComponent(
            component.split ? component.split('/').join('___') : component
          )
        }

        var apiConfig = {
          baseUrl: 'https://insights.sitesearch360.com/insights',
          // baseUrl: "http://localhost:3600/insights",
          endpoints: {
            serpSelect:
              '/serp/select/##siteId##/##sessionId##/##timestamp##/##query##/##clientWidth##/##resultOffsetX##/##resultOffsetY##/##resultWidth##/##resultHeight##/##resultBlockWidth##/##resultBlockHeight##/##resultCount##/##position##/##positionInContentGroup##/##link##/##searchResultType##/##referrer##',
            searchBoxFocus: '/searchbox/focus',
            searchBoxBulkChange: '/searchbox/change/bulk',
            searchBoxAbandon: '/searchbox/abandon',
            searchSubmit:
              '/search/submit/##siteId##/##sessionId##/##timestamp##/##query##/##searchBoxWidth##/##searchBoxHeight##/##clientWidth##/##searchBoxOffsetX##/##searchBoxOffsetY##/##searchBoxId##/##searchButtonId##/##referrer##',
            suggestShow: '/suggests/show',
            suggestSelect:
              '/suggests/select/##siteId##/##sessionId##/##timestamp##/##query##/##searchBoxWidth##/##searchBoxHeight##/##clientWidth##/##resultCount##/##suggestOffsetX##/##suggestOffsetY##/##searchBoxId##/##resultWidth##/##resultHeight##/##resultBlockWidth##/##resultBlockHeight##/##position##/##link##/##referrer##',
            serpShow: '/serp/show',
            serpAbandon:
              '/serp/abandon/##siteId##/##sessionId##/##timestamp##/##query##/##clientWidth##/##serpBlockOffsetX##/##serpBlockOffsetY##/##resultWidth##/##resultHeight##/##resultBlockWidth##/##resultBlockHeight##/##resultCount##/##searchResultType##/##referrer##',
            filterInteraction: '/filter/interaction'
          }
        }
        var aDay = 24 * 60 * 60 * 1000 // day in ms

        var sessionDurationMs = 10 * 60 * 1000 // session duration after last interaction

        var searchBoxChanges = {}
        var latestSearchBoxVales = {}

        var getSessionId = function getSessionId () {
          if (!allowCookies) {
            return generateSessionId()
          }

          var sessionId = loadSessionId()

          if (sessionId === null) {
            return generateSessionId()
          } else {
            var lastInteraction = loadLastInteraction()

            if (
              lastInteraction === undefined ||
              new Date().getTime() - lastInteraction > sessionDurationMs
            ) {
              return generateSessionId(sessionId)
            } else {
              return sessionId
            }
          }
        }

        var loadSessionId = function loadSessionId () {
          return sxQuery_sxQuery['a' /* default */].readCookie('ssi--sessionId')
        }

        var loadLastInteraction = function loadLastInteraction () {
          return sxQuery_sxQuery['a' /* default */].readCookie(
            'ssi--lastInteraction'
          )
        }

        var sendPost = function sendPost (url, data) {
          if (navigator.sendBeacon !== undefined) {
            var dataToSend = Object.keys(data).reduce(function (acc, key) {
              if (acc != '') {
                acc += '&'
              }

              if (data[key] !== undefined) {
                acc =
                  acc + encodeComponent(key) + '=' + encodeComponent(data[key])
              }

              return acc
            }, '')
            navigator.sendBeacon(url, dataToSend)
          } else {
            sxQuery_sxQuery['a' /* default */].post(url, data)
          }
        }

        var updateLastInteractionTime = function updateLastInteractionTime () {
          sxQuery_sxQuery['a' /* default */].createCookie(
            'ssi--lastInteraction',
            new Date().getTime(),
            sessionDurationMs / aDay
          )
        }

        var pretrack = function pretrack () {
          updateLastInteractionTime()
        }

        var sendRequest = function sendRequest (request) {
          if (request.type === 'IMAGE') {
            var i = new Image(1, 1)
            i.src = request.url
          } else if (request.type === 'GET') {
            sxQuery_sxQuery['a' /* default */].get(request.url)
          } else if (request.type === 'POST') {
            sendPost(request.url, request.data)
          }
        }

        var generateSessionId = function generateSessionId (previousSessionId) {
          function s4 () {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
          }

          var sessionId =
            s4() +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            s4() +
            s4()
          var sessionLog = {
            type: 'POST',
            url: apiConfig.baseUrl + '/session',
            data: {
              siteId: siteId,
              sessionId: sessionId,
              timestamp: new Date().getTime(),
              isPersistent: allowCookies,
              referrer: getStringValue(window.location.href)
            }
          }

          if (previousSessionId !== undefined) {
            sessionLog['data']['prevSessionId'] = previousSessionId
          }

          sendRequest(sessionLog)

          if (allowCookies) {
            sxQuery_sxQuery['a' /* default */].createCookie(
              'ssi--sessionId',
              sessionId,
              365
            )
            updateLastInteractionTime() // generating session id counts as interaction
          }

          return sessionId
        }

        this.sessionId = getSessionId()

        var createImageRequest = function createImageRequest (
          endpoint,
          sessionId,
          data
        ) {
          Object.keys(data).forEach(function (key) {
            endpoint = endpoint.replace(
              '##' + key + '##',
              encodeComponent(data[key])
            )
          })
          endpoint = endpoint.replace('##siteId##', encodeComponent(siteId))
          endpoint = endpoint.replace(
            '##sessionId##',
            encodeComponent(sessionId)
          )
          endpoint = endpoint.replace(
            '##timestamp##',
            encodeComponent(new Date().getTime())
          )
          endpoint = endpoint.replace(
            '##clientWidth##',
            encodeComponent(getClientWidth())
          )
          endpoint = endpoint.replace(/##.+?##/g, '', null)
          return {
            type: 'IMAGE',
            url: apiConfig.baseUrl + endpoint
          }
        }

        var getClientWidth = function getClientWidth () {
          return getNumberValue(
            document.documentElement.clientWidth || window.innerWidth
          )
        }

        var getNumberValue = function getNumberValue (val) {
          if (val === undefined || isNaN(val)) {
            return -1
          }

          return val
        }

        var getOffsetX = function getOffsetX (el) {
          return getNumberValue(
            el
              ? Math.floor(el.getBoundingClientRect().left + window.scrollX)
              : undefined
          )
        }

        var getOffsetY = function getOffsetY (el) {
          return getNumberValue(
            el
              ? Math.floor(el.getBoundingClientRect().top + window.scrollY)
              : undefined
          )
        }

        var getWidth = function getWidth (el) {
          return getNumberValue(
            el ? Math.floor(el.getBoundingClientRect().width) : undefined
          )
        }

        var getHeight = function getHeight (el) {
          return getNumberValue(
            el ? Math.floor(el.getBoundingClientRect().height) : undefined
          )
        }

        var generateElementSelector = function generateElementSelector (
          el,
          checkParent
        ) {
          if (!el) {
            return undefined
          }

          var className = el.className
            ? '.' + el.className.split(' ').join('.')
            : ''
          var id = el.getAttribute('id') ? '#' + el.getAttribute('id') : ''
          var parentEl = el.parentNode
          var selector = ''

          if (parentEl && checkParent) {
            selector = generateElementSelector(parentEl, false) + ' '
          }

          selector += el.tagName.toLowerCase() + id + className
          return selector
        }

        this.trackSerpClick = function (
          query,
          eventTarget,
          resultBlock,
          resultCount,
          position,
          positionInContentGroup,
          link,
          searchResultType
        ) {
          pretrack()
          var resultOffsetX = getOffsetX(eventTarget)
          var resultOffsetY = getOffsetY(eventTarget)
          var resultWidth = getWidth(eventTarget)
          var resultHeight = getHeight(eventTarget)
          var resultBlockWidth = getWidth(resultBlock)
          var resultBlockHeight = getHeight(resultBlock)
          var request = createImageRequest(
            apiConfig.endpoints.serpSelect,
            this.sessionId,
            {
              query: getStringValue(query),
              resultOffsetX: getNumberValue(resultOffsetX),
              resultOffsetY: getNumberValue(resultOffsetY),
              resultWidth: getNumberValue(resultWidth),
              resultHeight: getNumberValue(resultHeight),
              resultBlockWidth: getNumberValue(resultBlockWidth),
              resultBlockHeight: getNumberValue(resultBlockHeight),
              resultCount: getNumberValue(resultCount),
              position: getNumberValue(position),
              positionInContentGroup: getNumberValue(positionInContentGroup),
              link: getStringValue(link),
              searchResultType: getStringValue(searchResultType),
              referrer: getStringValue(window.location.href)
            }
          )
          sendRequest(request)
        }

        this.trackSearchBoxFocus = function (searchBox) {
          pretrack()
          var sessionId = this.sessionId
          var data = {
            siteId: siteId,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            searchBoxWidth: getWidth(searchBox),
            searchBoxHeight: getHeight(searchBox),
            clientWidth: getClientWidth(),
            searchBoxOffsetX: getOffsetX(searchBox),
            searchBoxOffsetY: getOffsetY(searchBox),
            searchBoxId: generateElementSelector(searchBox, true),
            referrer: getStringValue(window.location.href),
            query: getStringValue(searchBox.value)
          }
          sendRequest({
            url: apiConfig.baseUrl + apiConfig.endpoints.searchBoxFocus,
            type: 'POST',
            data: data
          })
        }

        this.collectSearchBoxChange = function (searchBox) {
          pretrack()
          var sessionId = this.sessionId
          var sbSelector = generateElementSelector(searchBox, true)

          if (
            !(sbSelector in searchBoxChanges) ||
            searchBoxChanges[sbSelector] === undefined
          ) {
            searchBoxChanges[sbSelector] = {
              data: [],
              siteId: siteId,
              sessionId: sessionId,
              searchBoxWidth: getNumberValue(getWidth(searchBox)),
              searchBoxHeight: getNumberValue(getHeight(searchBox)),
              searchBoxOffsetX: getNumberValue(getOffsetX(searchBox)),
              searchBoxOffsetY: getNumberValue(getOffsetY(searchBox)),
              clientWidth: getClientWidth(),
              searchBoxId: sbSelector,
              referrer: getStringValue(window.location.href)
            }
          }

          var val = getStringValue(searchBox.value)

          if (latestSearchBoxVales[sbSelector] === val) {
            return // no need to track empty change
          }

          suggestionQueryCache.query = searchBox.value
          suggestionQueryCache.timestamp = new Date().getTime()
          latestSearchBoxVales[sbSelector] = val
          clearTimeout(searchBoxChanges[sbSelector]['timeoutId'])
          searchBoxChanges[sbSelector]['data'].push({
            timestamp: new Date().getTime(),
            query: getStringValue(
              Object(sxQuery_sxQuery['a' /* default */])(searchBox).val()
            )
          })
          searchBoxChanges[sbSelector]['timeoutId'] = setTimeout(function () {
            var data = searchBoxChanges[sbSelector]
            data['data'] = JSON.stringify(data['data'])
            sendRequest({
              url: apiConfig.baseUrl + apiConfig.endpoints.searchBoxBulkChange,
              type: 'POST',
              data: data
            })
            searchBoxChanges[sbSelector] = undefined
          }, 300)
        }

        this.trackSubmitSearch = function (
          query,
          searchBox,
          searchButton,
          searchBoxId
        ) {
          pretrack()
          searchQueryCache.query = query
          searchQueryCache.timestamp = new Date().getTime()
          var request = createImageRequest(
            apiConfig.endpoints.searchSubmit,
            this.sessionId,
            {
              query: getStringValue(query),
              searchBoxWidth: getNumberValue(getWidth(searchBox)),
              searchBoxHeight: getNumberValue(getHeight(searchBox)),
              searchBoxOffsetX: getNumberValue(getOffsetX(searchBox)),
              searchBoxOffsetY: getNumberValue(getOffsetY(searchBox)),
              searchBoxId:
                searchBoxId !== undefined
                  ? getStringValue(searchBoxId)
                  : getStringValue(generateElementSelector(searchBox, true)),
              searchButtonId: getStringValue(
                generateElementSelector(searchButton, true)
              ),
              referrer: getStringValue(window.location.href)
            }
          )
          sendRequest(request)
        }

        this.trackSearchBoxAbandon = function (query, resultCount, searchBox) {
          pretrack()
          var sessionId = this.sessionId
          var data = {
            siteId: siteId,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            query: query,
            searchBoxWidth: getWidth(searchBox),
            searchBoxHeight: getHeight(searchBox),
            clientWidth: getClientWidth(),
            resultCount: getNumberValue(resultCount),
            searchBoxOffsetX: getOffsetX(searchBox),
            searchBoxOffsetY: getOffsetY(searchBox),
            searchBoxId: generateElementSelector(searchBox, true),
            referrer: getStringValue(window.location.href)
          }
          sendRequest({
            url: apiConfig.baseUrl + apiConfig.endpoints.searchBoxAbandon,
            type: 'POST',
            data: data
          })
        }

        this.trackShowSuggests = function (
          searchBox,
          suggestBlock,
          suggestItem,
          query,
          resultCount
        ) {
          pretrack()
          var queryDuration =
            suggestionQueryCache.query === query
              ? new Date().getTime() - suggestionQueryCache.timestamp
              : undefined
          var sessionId = this.sessionId
          var data = {
            siteId: siteId,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            query: query,
            searchBoxWidth: getWidth(searchBox),
            searchBoxHeight: getHeight(searchBox),
            clientWidth: getClientWidth(),
            resultCount: getNumberValue(resultCount),
            suggestBoxOffsetX: getOffsetX(suggestBlock),
            suggestBoxOffsetY: getOffsetY(suggestBlock),
            searchBoxId: generateElementSelector(searchBox, true),
            resultWidth: getWidth(suggestItem),
            resultHeight: getHeight(suggestItem),
            resultBlockHeight: getHeight(suggestBlock),
            resultBlockWidth: getWidth(suggestBlock),
            referrer: getStringValue(window.location.href)
          }

          if (queryDuration !== undefined) {
            data['queryDuration'] = queryDuration
          }

          sendRequest({
            url: apiConfig.baseUrl + apiConfig.endpoints.suggestShow,
            type: 'POST',
            data: data
          })
        }

        this.trackSelectSuggest = function (
          searchBox,
          suggestBlock,
          suggestItem,
          query,
          resultCount,
          position,
          link
        ) {
          pretrack()
          var request = createImageRequest(
            apiConfig.endpoints.suggestSelect,
            this.sessionId,
            {
              query: getStringValue(query),
              searchBoxWidth: getNumberValue(getWidth(searchBox)),
              searchBoxHeight: getNumberValue(getHeight(searchBox)),
              searchBoxOffsetX: getNumberValue(getOffsetX(searchBox)),
              searchBoxOffsetY: getNumberValue(getOffsetY(searchBox)),
              searchBoxId: getStringValue(
                generateElementSelector(searchBox, true)
              ),
              resultCount: getNumberValue(resultCount),
              suggestOffsetX: getNumberValue(getOffsetX(suggestItem)),
              suggestOffsetY: getNumberValue(getOffsetY(suggestItem)),
              resultWidth: getNumberValue(getWidth(suggestItem)),
              resultHeight: getNumberValue(getHeight(suggestItem)),
              resultBlockWidth: getNumberValue(getWidth(suggestBlock)),
              resultBlockHeight: getNumberValue(getHeight(suggestBlock)),
              position: getNumberValue(position),
              link: getStringValue(link),
              referrer: getStringValue(window.location.href)
            }
          )
          sendRequest(request)
        }

        this.trackSerpShow = function (
          resultBlock,
          resultItem,
          query,
          resultCount,
          resultType,
          filterValues
        ) {
          pretrack()
          var sessionId = this.sessionId
          var queryDuration =
            searchQueryCache.query === query
              ? new Date().getTime() - searchQueryCache.timestamp
              : undefined
          var data = {
            siteId: siteId,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            query: query,
            clientWidth: getClientWidth(),
            resultCount: getNumberValue(resultCount),
            serpBlockOffsetX: getOffsetX(resultBlock),
            serpBlockOffsetY: getOffsetY(resultBlock),
            resultWidth: getWidth(resultItem),
            resultHeight: getHeight(resultItem),
            resultBlockWidth: getWidth(resultBlock),
            resultBlockHeight: getHeight(resultBlock),
            searchResultType: resultType,
            referrer: getStringValue(window.location.href),
            filters: getStringValue(filterValues)
          }

          if (queryDuration !== undefined) {
            data['queryDuration'] = queryDuration
          }

          sendRequest({
            url: apiConfig.baseUrl + apiConfig.endpoints.serpShow,
            type: 'POST',
            data: data
          })
        }

        this.trackSerpLeave = function (
          resultBlock,
          resultItem,
          query,
          resultCount,
          resultType
        ) {
          pretrack()
          var request = createImageRequest(
            apiConfig.endpoints.serpAbandon,
            this.sessionId,
            {
              query: getStringValue(query),
              serpBlockOffsetX: getNumberValue(getOffsetX(resultBlock)),
              serpBlockOffsetY: getNumberValue(getOffsetY(resultBlock)),
              resultWidth: getNumberValue(getWidth(resultItem)),
              resultHeight: getNumberValue(getHeight(resultItem)),
              resultBlockWidth: getNumberValue(getWidth(resultBlock)),
              resultBlockHeight: getNumberValue(getHeight(resultBlock)),
              resultCount: getNumberValue(resultCount),
              searchResultType: getStringValue(resultType),
              referrer: getStringValue(window.location.href)
            }
          )
          sendRequest(request)
        }

        this.trackFilterInteraction = function (query, filterBlock, filterData) {
          pretrack()
          var sessionId = this.sessionId
          var data = {
            siteId: siteId,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            query: query,
            clientWidth: getClientWidth(),
            targetOffsetX: getOffsetX(filterBlock),
            targetOffsetY: getOffsetY(filterBlock),
            filterBlockWidth: getWidth(filterBlock),
            filterBlockHeight: getHeight(filterBlock),
            referrer: getStringValue(window.location.href),
            filters: getStringValue(filterData)
          }
          sendRequest({
            url: apiConfig.baseUrl + apiConfig.endpoints.filterInteraction,
            type: 'POST',
            data: data
          })
        }
      }

      /* harmony default export */ var insights = insights_SSInsights
      // CONCATENATED MODULE: ./src/js/siteSearch/reporter/Reporter.js

      var Reporter_Reporter = new function () {
        // remember when typing a query started
        var actionStartTime = 0
        var siteId = undefined
        var tracking = true

        var setPage = function setPage (trackingConfig, queryParamName, query) {
          // build URL
          if (queryParamName === undefined || queryParamName === '') {
            queryParamName = 'ss360Query'
          }

          var currentUrl =
            '?' + queryParamName + '=' + encodeURI(query).toLowerCase() // now inform tracking systems

          if (trackingConfig.providers.indexOf('GA') > -1) {
            setPageGa(currentUrl)
          }

          if (trackingConfig.providers.indexOf('GTM') > -1) {
            setPageGtm(currentUrl)
          }
        } // Google Analytics

        var setPageGa = function setPageGa (currentUrl) {
          if (window.ga) {
            ga('set', 'page', currentUrl)
          }
        } // Google Tag Manager

        var setPageGtm = function setPageGtm (currentUrl) {
          if (window.dataLayer) {
            dataLayer.push({
              event: 'VirtualPageview',
              category: 'search',
              virtualPageURL: currentUrl,
              virtualPageTitle: document.title
            })
          }
        }
        /* PUBLIC API */

        this.initActionStartTime = function () {
          if (actionStartTime > 0) {
            return
          }

          actionStartTime = new Date().getTime()
        }

        this.getTimeToAction = function () {
          var tta = new Date().getTime() - actionStartTime
          actionStartTime = 0
          return tta
        }

        this.logQuery = function (query, action) {
          if (query === undefined) {
            return
          }

          if (actionStartTime === 0 || query.trim().length < 3) {
            return
          }

          if (!tracking) {
            return
          }

          var tta = Reporter_Reporter.getTimeToAction() // avoid consecutive events, and tab is keydown + blur

          if (tta < 50) {
            return
          }

          sxQuery_sxQuery['a' /* default */].post(
            'https://global.sitesearch360.com/sites/queries/log',
            {
              query: query,
              site: siteId,
              timeToAction: tta,
              action: action
            }
          )
        }
        /* External providers */

        this.reportSerp = function (trackingConfig, queryParamName, query) {
          if (trackingConfig === undefined) {
            return
          }

          var shouldReport = true

          if (
            !!trackingConfig.searchCallback &&
            typeof trackingConfig.searchCallback === 'function'
          ) {
            shouldReport =
              trackingConfig.searchCallback.call(this, query) !== false
          }

          if (!shouldReport) {
            return
          }

          setPage(trackingConfig, queryParamName, query)

          if (trackingConfig.providers.indexOf('GA') > -1 && !!window.ga) {
            ga('send', 'pageview')
            ga(function (tracker) {
              // log once again, ga('send','pageview') is not sufficient
              if (tracker === undefined) {
                ga.getAll().forEach(function (tr) {
                  tr.set('page', pageToSet)
                  tr.send('pageview')
                })
              }
            })
          }
        }
        /* CONFIGURATION */

        this.setSiteId = function (newSiteId) {
          return (siteId = newSiteId)
        }

        this.getSiteId = function () {
          return siteId
        }

        this.setTracking = function (newTracking) {
          return (tracking = newTracking)
        }

        this.getTracking = function () {
          return tracking
        }
      }()
      /* harmony default export */ var reporter_Reporter = Reporter_Reporter
      // CONCATENATED MODULE: ./src/js/siteSearch/utils/StringHelper.js

      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      }
      var StringHelper = {
        escapeHtml: function escapeHtml (string) {
          return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s]
          })
        },
        getSafeKey: function getSafeKey (key) {
          return key
            .replace(/[ "Â§$%&/(){}+*,.;|]/g, '_')
            .replace(/#/g, '__')
            .replace(/'/g, '---')
            .toLowerCase()
        }
      }
      /* harmony default export */ var utils_StringHelper = StringHelper
      // CONCATENATED MODULE: ./src/js/siteSearch/utils/NavigatorHelper.js

      var _hasHistoryAPI = function hasHistoryAPI () {
        return 'history' in window && typeof history.pushState !== 'undefined'
      }

      var buildState = function buildState (queryDict) {
        var searchString =
          '?' +
          Object.keys(queryDict)
            .reduce(function (acc, key) {
              return (
                acc +
                '&' +
                encodeURIComponent(key) +
                '=' +
                encodeURIComponent(queryDict[key])
              )
            }, '')
            .substring(1)
        var newUrl =
          window.location.href.split('?')[0].replace(window.location.hash, '') +
          searchString +
          window.location.hash
        var obj = {
          Page: document.title,
          Url: newUrl
        }
        return obj
      }

      var createQueryDict = function createQueryDict () {
        return window.location.search
          .substring(1)
          .split('&')
          .reduce(function (acc, item) {
            if (item && item.split && item.split('=').length == 2) {
              acc[decodeURIComponent(item.split('=')[0])] = decodeURIComponent(
                item.split('=')[1]
              )
            }

            return acc
          }, {})
      }

      var NavigatorHelper = {
        removeSearchQueryParam: function removeSearchQueryParam (paramName) {
          try {
            if (
              window.history.replaceState &&
              document.location.search.indexOf(paramName + '=') > -1
            ) {
              var queryDict = createQueryDict()

              if (paramName in queryDict) {
                delete queryDict[paramName]
                var searchPath = Object.keys(queryDict).reduce(function (
                  acc,
                  qpName
                ) {
                  return ''
                    .concat(acc, '&')
                    .concat(encodeURIComponent(qpName), '=')
                    .concat(encodeURIComponent(queryDict[qpName]))
                },
                '')

                if (searchPath.length > 0) {
                  searchPath = '?' + searchPath.substring(1)
                }

                window.history.replaceState(
                  {},
                  document.title,
                  document.location.pathname + searchPath + window.location.hash
                )
              }
            }
          } catch (e) {}
        },
        buildQueryDict: function buildQueryDict () {
          return createQueryDict()
        },
        hasHistoryAPI: function hasHistoryAPI () {
          return _hasHistoryAPI()
        },
        pushState: function pushState (queryDict) {
          if (!_hasHistoryAPI()) {
            return
          }

          var obj = buildState(queryDict)

          try {
            history.pushState(obj, obj.Page, obj.Url)
          } catch (ex) {
            console.warn(ex)
          }
        },
        replaceState: function replaceState (queryDict) {
          if (!_hasHistoryAPI()) {
            return
          }

          var obj = buildState(queryDict)

          try {
            history.replaceState(obj, obj.Page, obj.Url)
          } catch (ex) {
            console.warn(ex)
          }
        },
        redirectToSearchResultPage: function redirectToSearchResultPage (
          selectedText,
          redirectUrl,
          paramName,
          allowCookies
        ) {
          if (allowCookies) {
            sxQuery_sxQuery['a' /* default */].createCookie(
              'ss360LastQuery',
              selectedText,
              1
            )
          }

          var re = new RegExp('[?&]' + paramName + '=[^ &]*')
          redirectUrl = redirectUrl.replace(re, '')

          if (redirectUrl.indexOf('?') > -1) {
            // only redirect if we're not already at the result page
            redirectUrl += '&'
          } else {
            redirectUrl += '?'
          }

          document.location.href =
            redirectUrl +
            encodeURIComponent(paramName) +
            '=' +
            encodeURIComponent(selectedText)
        },
        handleRedirect: function handleRedirect (
          red,
          selectedText,
          escapedQuery,
          highlightSearchTerms,
          redirectCallback
        ) {
          if (highlightSearchTerms) {
            if (red.indexOf('?') > -1) {
              red += '&'
            } else {
              red += '?'
            }

            red += 'ss360SearchTerm=' + escapedQuery
          }

          Object(sxQuery_sxQuery['a' /* default */])(window).off(
            'beforeunload.ss360Insights'
          )

          if ('SS360Insights' in window) {
            window.SS360Insights.trackSerpClick(
              selectedText,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              red,
              'redirect'
            )
          }

          if (
            redirectCallback != undefined &&
            typeof redirectCallback === 'function'
          ) {
            redirectCallback.call(this, red)
          } else {
            window.location.href = red
          }
        },
        redirectToFirst: function redirectToFirst (data) {
          var firstKey = Object.keys(data['suggests'])[0]
          window.location.href = data['suggests'][firstKey][0].link
        }
      }
      /* harmony default export */ var utils_NavigatorHelper = NavigatorHelper
      // CONCATENATED MODULE: ./src/js/siteSearch/ui/Handlers.js

      var Handlers = {
        onSearchButtonClick: function onSearchButtonClick (
          event,
          unibox,
          enterCallback
        ) {
          try {
            var searchQuery = unibox.getText() // does the button reference a search field it should take the query from?

            var selectedSearchBox = undefined
            var searchBoxReference = this.getAttribute('ss360-search-box-id')

            if (
              searchBoxReference !== null &&
              searchBoxReference !== undefined
            ) {
              selectedSearchBox = Object(sxQuery_sxQuery['a' /* default */])(
                '#' + searchBoxReference
              )
            }

            if (
              selectedSearchBox !== undefined &&
              selectedSearchBox.length > 0
            ) {
              searchQuery = selectedSearchBox.val()
            }

            enterCallback.call(
              this,
              searchQuery,
              undefined,
              undefined,
              true,
              this,
              undefined,
              undefined,
              selectedSearchBox !== undefined && selectedSearchBox.length > 0
                ? selectedSearchBox
                : undefined
            )
          } catch (ex) {
            console.log(ex)
          }

          event.preventDefault()
          event.stopPropagation()
        },
        onBodyKeyDown: function onBodyKeyDown (
          e,
          areResultsVisible,
          fullScreenOpen,
          searchResultType
        ) {
          if (e.keyCode == 27) {
            if (areResultsVisible || fullScreenOpen) {
              e.preventDefault()
              e.stopPropagation()
            }

            if (
              (searchResultType === 'fullscreen' && fullScreenOpen) ||
              searchResultType === 'layover'
            ) {
              SS360.closeLayer()
            }
          }
        },
        onBodyClick: function onBodyClick (e, searchBoxSelector) {
          if (
            searchBoxSelector &&
            Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).is(
              e.target
            )
          ) {
            // don't hide on search box focus
            return
          }

          if (
            Object(sxQuery_sxQuery['a' /* default */])(e.target).attr('id') ==
            'unibox-mobile-search-btn'
          ) {
            // don't hide on mobile suggestions submit
            return
          }

          SS360.closeLayer()
        },
        popstate: function popstate (
          e,
          qparam,
          searchResultType,
          searchBoxSelector
        ) {
          var hasQuery =
            e.state !== undefined &&
            e.state !== null &&
            e.state.Url &&
            qparam &&
            e.state.Url.indexOf(qparam + '=') !== -1
          var isLayover = searchResultType === 'layover'

          if (!hasQuery && isLayover) {
            SS360.closeLayer()
          } else if (!hasQuery) {
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer').fadeOut()
          } else if (hasQuery) {
            var queryDict = utils_NavigatorHelper.buildQueryDict()
            var searchQuery = queryDict[qparam]
            var filters = undefined

            if (queryDict['ss360Filter'] !== undefined) {
              try {
                filters = JSON.parse(queryDict['ss360Filter'])
              } catch (ex) {}
            }

            SS360.showResults(
              searchQuery,
              undefined,
              filters,
              false,
              undefined,
              undefined,
              'popstate'
            )
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-custom-searchbox, #ss360-search-console #ss360-query'
            ).val(searchQuery)
            Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).val(
              searchQuery
            )
          }

          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-custom-searchbox'
          ).val('')
          Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).val('')
        },
        searchBoxBlur: function searchBoxBlur (
          event,
          selectedText,
          logAbandon,
          autoBlurTime,
          searchButtonSelector,
          lbctGetter,
          context
        ) {
          ui_UiHelper.removeDarkenInputLayer()

          if (!logAbandon || new Date().getTime() - autoBlurTime <= 200) {
            return
          }

          var delay = 200 // was search button clicked? increase the log delay

          if (event.relatedTarget && searchButtonSelector !== undefined) {
            var searchButtons = Object(sxQuery_sxQuery['a' /* default */])(
              searchButtonSelector
            ).get()
            var relatedSb = searchButtons.filter(function (sb) {
              return sb == event.relatedTarget
            })

            if (relatedSb.length > 0) {
              delay = 1000
            }
          } // delay logging

          setTimeout(
            function (td) {
              var lbct = lbctGetter()

              if (lbct !== -1 && td < lbct && td + delay > lbct) {
                // check whether search button was clicked in recent time
                return
              }

              context.logQuery(selectedText, 'abandon')

              if ('SS360Insights' in window) {
                SS360Insights.trackSearchBoxAbandon(
                  selectedText,
                  Object(sxQuery_sxQuery['a' /* default */])(
                    '#unibox-suggest-box .unibox-selectable'
                  ).length,
                  event.target
                )
              }
            }.bind(this, new Date().getTime()),
            delay
          )
        },
        layoverResize: function layoverResize () {
          // update layover height to fixed value - ie11 fix
          var lC = Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-layer .ss360-layer-content'
          )
          var bufferHeight = 0
          var marginTop = 0
          var hasTopNavigation =
            Object(sxQuery_sxQuery['a' /* default */])('nav.ss360-top-nav')
              .length > 0
          var hasSearchField =
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-custom-search')
              .length > 0

          if (hasTopNavigation && hasSearchField) {
            bufferHeight = 95
          } else if (hasTopNavigation) {
            bufferHeight = 60
          } else if (hasSearchField) {
            bufferHeight = 40
          } else {
            bufferHeight = 25
            marginTop = 40
          }

          var targetSize = lC.parent().height() - bufferHeight

          if (targetSize) {
            lC.css('max-height', targetSize + 'px')
          }

          if (marginTop) {
            lC.css('margin-top', marginTop + 'px')
          }
        },
        layoverScroll: function layoverScroll (e) {
          e.preventDefault()
          e.stopPropagation()
          e.target.scrollTop = 0
        },
        queryCorrection: function queryCorrection (
          event,
          correctedQuery,
          enterCallback,
          searchBoxSelector
        ) {
          try {
            enterCallback.call(this, correctedQuery)
            Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).val(
              correctedQuery
            )
          } catch (ex) {
            console.log(ex)
          }

          event.preventDefault()
          event.stopPropagation()
          return false
        }
      }
      /* harmony default export */ var ui_Handlers = Handlers
      // CONCATENATED MODULE: ./src/js/siteSearch/ui/UiBuilder.js

      var UiBuilder_UiBuilder = function UiBuilder (
        captionHeadingLevel,
        resultHeadingLevel,
        contentGroupHeadingLevel,
        hiddenParts,
        linksOpenNewTab,
        collapseDataPoints,
        excludedDataPoints,
        singleDataPoints,
        groupResults,
        searchResultType,
        allowCookies,
        stripHttp
      ) {
        var _this = this

        /**
         * Build a single search result item.
         *
         * @param {boolean} isHidden whether to add ss360-hidden class
         * @param {object} suggest the suggestion object
         * @param {string} query the query
         */
        this.buildSuggestItem = function (isHidden, suggest, query) {
          var suggestLine =
            '<li class="ss360-suggests' +
            (isHidden ? ' ss360-hidden' : '') +
            '"><article>' // custom suggest?

          if (suggest['type'] == 'custom') {
            suggestLine = suggestLine.replace(
              'ss360-suggests',
              'ss360-suggests ss360-custom-result'
            )
            suggestLine += suggest['html']
          } else {
            // link and name
            if (
              suggest['link'] != undefined &&
              (hiddenParts['title'] != 'all' || hiddenParts['url'] != 'all')
            ) {
              if (hiddenParts['title'] != 'all') {
                suggestLine +=
                  '<header><span role="heading" aria-level="' +
                  resultHeadingLevel +
                  '"><a href="' +
                  suggest['link'] +
                  '"'

                if (linksOpenNewTab) {
                  suggestLine += ' target="_blank"'
                }

                suggestLine += '>'
                suggestLine += suggest['name']
                suggestLine += '</a></span></header>'
              } // show link?

              if (hiddenParts['url'] != 'all') {
                // TODO: strip http from url?
                var link = decodeURI(suggest['link'])

                if (stripHttp) {
                  if (link.toLowerCase().indexOf('https://') === 0) {
                    link = link.substring(8)
                  } else if (link.toLowerCase().indexOf('http://') === 0) {
                    link = link.substring(7)
                  }
                }

                suggestLine +=
                  '<a tabindex="-1" href="' +
                  suggest['link'] +
                  '" class="ss360-result-link"'

                if (linksOpenNewTab) {
                  suggestLine += ' target="_blank"'
                }

                suggestLine += ' aria-hidden="true">'
                suggestLine += link
                suggestLine += '</a>'
              }
            } // content and image

            suggestLine += '<div class="ss360-content-container">'

            if (
              suggest['image'] != undefined &&
              hiddenParts['images'] != 'all'
            ) {
              if (suggest['link'] != undefined) {
                suggestLine +=
                  '<a aria-hidden="true" tabindex="-1" href="' +
                  suggest['link'] +
                  '"'

                if (linksOpenNewTab) {
                  suggestLine += ' target="_blank"'
                }

                suggestLine += '>'
              }

              suggestLine += '<img src="'
                .concat(
                  suggest['image'],
                  '" alt aria-hidden="true" role="presentation" aria-label="'
                )
                .concat(suggest['name'], '" class="')
                .concat(
                  ui_UiHelper.isDocIcon(suggest['image'])
                    ? 'ss360-document-icon'
                    : '',
                  '"/>'
                )

              if (suggest['link'] != undefined) {
                suggestLine += '</a>'
              }
            }

            if (
              suggest['content'] != undefined &&
              hiddenParts['snippet'] != 'all'
            ) {
              var taggedContent = suggest['content']
              suggestLine += '<p>' + taggedContent + '</p>'
            }

            if (
              suggest['kvtable'] != undefined &&
              suggest['kvtable'].length > 16 &&
              hiddenParts['dataPoints'] != 'all'
            ) {
              if (
                collapseDataPoints !== undefined ||
                excludedDataPoints.length > 0 ||
                singleDataPoints.length > 0
              ) {
                var keys = []
                var groupedDataPoints = suggest['dataPoints'].reduce(function (
                  acc,
                  dataPoint
                ) {
                  if (
                    dataPoint.show &&
                    excludedDataPoints.indexOf(dataPoint.key) === -1
                  ) {
                    if (acc[dataPoint.key] === undefined) {
                      acc[dataPoint.key] = []
                    }

                    if (keys.indexOf(dataPoint.key) === -1) {
                      // to keep order
                      keys.push(dataPoint.key)
                    }

                    if (
                      acc[dataPoint.key].length === 0 ||
                      singleDataPoints.indexOf(dataPoint.key) === -1
                    ) {
                      acc[dataPoint.key].push(dataPoint.value)
                    }
                  }

                  return acc
                },
                {})
                var kvTableRows = keys.map(function (key) {
                  if (collapseDataPoints !== undefined) {
                    return (
                      '<tr><td>' +
                      key +
                      '</td><td>' +
                      groupedDataPoints[key].join(collapseDataPoints) +
                      '</td></tr>'
                    )
                  } else {
                    return groupedDataPoints[key].reduce(function (acc, value) {
                      return (
                        acc +
                        '<tr><td>'
                          .concat(key, '</td><td>')
                          .concat(value, '</td></tr>')
                      )
                    }, '')
                  }
                })
                suggestLine += '<table>' + kvTableRows.join('') + '</table>'
              } else {
                suggestLine += suggest['kvtable']
              }
            }

            suggestLine += '</div>'
          }

          suggestLine += '<div class="ss360-ca"></div></article></li>' // bind events

          var $item = Object(sxQuery_sxQuery['a' /* default */])(suggestLine)

          if ('SS360Insights' in window) {
            $item.find('a').on('click', function (e) {
              Object(sxQuery_sxQuery['a' /* default */])(window).off(
                'beforeunload.ss360Insights'
              )
              var cgItems = $item
                .parent()
                .find('.ss360-suggests:not(.ss360-hidden)')
                .get()
              var allItems = Object(sxQuery_sxQuery['a' /* default */])(
                '.ss360-suggests:not(.ss360-hidden)'
              ).get()
              var itemEl = $item.get()[0]
              var contentGroupPosition =
                sxQuery_sxQuery['a' /* default */].indexInNodeList(
                  itemEl,
                  cgItems
                ) + 1
              var position =
                sxQuery_sxQuery['a' /* default */].indexInNodeList(
                  itemEl,
                  allItems
                ) + 1
              window.SS360Insights.trackSerpClick(
                query,
                itemEl,
                Object(sxQuery_sxQuery['a' /* default */])(
                  '.ss360-layer-content'
                ).get()[0],
                allItems.length,
                position,
                contentGroupPosition,
                suggest['link'],
                $item.parents('#ss360-404-layer').length > 0
                  ? 'smart404'
                  : searchResultType
              )
            })
          }

          $item.find('a').on('click', function (e) {
            if (sxQuery_sxQuery['a' /* default */].linkOpensInNewTab(e)) {
              return
            }

            var $target = Object(sxQuery_sxQuery['a' /* default */])(e.target)
            var $parentGroup = Object(sxQuery_sxQuery['a' /* default */])(
              $target.parents('.ss360-group')[0]
            )
            var headingNode = $parentGroup.find('.content-group-heading')
            var contentGroup = groupResults
              ? headingNode.length === 0 ||
                headingNode.attr('id').replace('ss360-heading-', '') == '_'
                ? '_'
                : headingNode.text()
              : ''
            var liNode = $target.parents('li')[0]
            var liNodes = $parentGroup.find('li.ss360-suggests').get()
            var idx = liNodes.indexOf(liNode)

            if (allowCookies) {
              sxQuery_sxQuery['a' /* default */].createCookie(
                'ss360-cg--c',
                contentGroup,
                1 / 24
              )
              sxQuery_sxQuery['a' /* default */].createCookie(
                'ss360-offset--c',
                idx,
                1 / 24
              )
              sxQuery_sxQuery['a' /* default */].createCookie(
                'ss360-query--c',
                query,
                1 / 24
              )
            } else if (utils_NavigatorHelper.hasHistoryAPI()) {
              var searchParams = utils_NavigatorHelper.buildQueryDict()

              if (contentGroup) {
                searchParams['ss360ContentGroup'] = contentGroup
              }

              searchParams['ss360Offset'] = idx
              utils_NavigatorHelper.pushState(searchParams)
            }
          })
          return $item
        }

        this.appendSearchConsole = function (caption) {
          var searchConsole = Object(sxQuery_sxQuery['a' /* default */])(
            '<div id="ss360-search-console">'
          )
          searchConsole.append(
            '<h' +
              captionHeadingLevel +
              '>' +
              caption +
              '</h' +
              captionHeadingLevel +
              '>'
          )
          searchConsole.append(
            '<section role="search"><input id="ss360-query" type="text"></section>'
          )
          searchConsole.append('<div id="ss360-results"></div>')

          _this.prependCloseButton(searchConsole)

          Object(sxQuery_sxQuery['a' /* default */])('body').append(
            searchConsole
          )
        }

        this.prependCloseButton = function (target) {
          target.prepend(
            '<button id="ss360CloseLayerButton" aria-label="Close Search Results" title="Close Search Results" type="button" class="ss360-close-button"></button>'
          )
        }

        this.buildLayer = function (isMain) {
          var layerString = isMain
            ? '<main role="main" id="ss360-layer" style="display:none" aria-label="Search Results"></main>'
            : '<section id="ss360-layer" style="display:none" aria-label="Search Results"></section>'
          return Object(sxQuery_sxQuery['a' /* default */])(layerString)
        }

        this.buildLayoverSearchField = function (
          searchFieldLabel,
          searchBoxSelector,
          defaultPlaceholder,
          lastSearchTerm,
          enterCallback
        ) {
          var ss360SearchWrapper = Object(sxQuery_sxQuery['a' /* default */])(
            '<section role="search" id="ss360-custom-search" class="ss360-flex">'
          )

          if (searchFieldLabel !== undefined) {
            var ss360Label = Object(sxQuery_sxQuery['a' /* default */])(
              '<label style="' +
                sxQuery_sxQuery['a' /* default */].srOnlyCss +
                '" for="ss360-custom-searchbox" class="ss360-sr-only">' +
                searchFieldLabel +
                '</label>'
            )
            ss360SearchWrapper.append(ss360Label)
          }

          var ss360SearchField = Object(sxQuery_sxQuery['a' /* default */])(
            '<input type="search" id="ss360-custom-searchbox" class="ss360-flex ss360-flex--justify-center ss360-flex--align-center">'
          )

          if (searchBoxSelector !== undefined) {
            var placeholder =
              Object(sxQuery_sxQuery['a' /* default */])(
                searchBoxSelector
              ).attr('placeholder') ||
              defaultPlaceholder ||
              'Search'
            ss360SearchField.attr('placeholder', placeholder)
            ss360SearchField.val(lastSearchTerm)
            ss360SearchField.on('change', function (e) {
              Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).val(
                e.target.value
              )
            })
          }

          var ss360SearchButton = Object(sxQuery_sxQuery['a' /* default */])(
            '<button id="ss360-custom-searchbutton" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
          ) // icon

          var icon =
            '<img role="presentation" alt="" style="height:24px;width:24px" src="' +
            ui_UiHelper.getBase64Magnifier('#ffffff') +
            '"/>'
          ss360SearchButton.append(icon)

          var performSearch = function performSearch (query, searchButton) {
            if (query == undefined || query.length === 0) {
              return
            }

            if (
              enterCallback != undefined &&
              typeof enterCallback === 'function'
            ) {
              enterCallback(query, undefined, undefined, searchButton)
            } else {
              SS360.showResults(
                query,
                undefined,
                undefined,
                undefined,
                searchButton
              )
            }
          }

          ss360SearchField.on('keyup', function (e) {
            if (e.keyCode === 13) {
              performSearch(e.target.value)
            }
          })
          ss360SearchButton.on('click', function (e) {
            performSearch(ss360SearchField.val(), e.target)
          })
          ss360SearchWrapper.append(ss360SearchField)
          ss360SearchWrapper.append(ss360SearchButton)
          return ss360SearchWrapper
        }

        this.buildHeadlineNode = function (caption, query, total, plan) {
          var formattedTotal =
            'Intl' in window ? new Intl.NumberFormat().format(total) : total
          var headlineNode = Object(sxQuery_sxQuery['a' /* default */])(
            '<h' +
              captionHeadingLevel +
              ' id="ss360-search-result-heading"><a tabindex="-1" href="#">' +
              caption
                .replace('#QUERY#', query)
                .replace('#COUNT#', formattedTotal) +
              '</a></h' +
              captionHeadingLevel +
              '>'
          )
          headlineNode.find('a').click(function (e) {
            e.preventDefault()
            e.stopPropagation()
          })

          if (plan === 'FREE' || plan === 'COLUMBO') {
            headlineNode.css('paddingTop', '26px')
          }

          return headlineNode
        }

        this.buildQueryCorrectionNode = function (
          caption,
          correction,
          enterCallback,
          searchBoxSelector
        ) {
          var queryCorrectionText = caption.replace(
            '#CORRECTION#',
            '<a id="ss360-query-correction" href="#">' + correction + '</a>'
          )
          var didYouMeanNode = Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360-query-correction">' +
              queryCorrectionText +
              '</div>'
          )
          didYouMeanNode.on('click', function (e) {
            ui_Handlers.queryCorrection(
              e,
              correction,
              enterCallback,
              searchBoxSelector
            )
          })
          return didYouMeanNode
        }

        this.renderSearchResults = function (
          data,
          navigation,
          layerContent,
          contentGroupsConfig,
          query,
          totalResults,
          resultConfig,
          moreResultsCallback,
          limitPerGroup,
          context
        ) {
          var limit = resultConfig['num']
          var moreResultsButton = resultConfig['moreResultsButton']
          var pagingSize = resultConfig['moreResultsPagingSize']
          var highlight = resultConfig['highlightQueryTerms']
          var self = _this
          var totalCounter = 0

          if (moreResultsButton === undefined) {
            moreResultsButton = null
          }

          var groupCount = Object.keys(data['suggests']).length
          var shouldRenderNav =
            groupCount > 1 ||
            (navigation.isTabbed() && !navigation.isDropdown()) // don't show scroll or dropdown navigation for one-item entries

          if (navigation.isDropdown()) {
            if (shouldRenderNav) {
              navigation.show()
            } else {
              navigation.hide()
            }
          }

          sxQuery_sxQuery['a' /* default */].each(data['suggests'], function (
            key,
            values,
            idx
          ) {
            var safeKey = utils_StringHelper.getSafeKey(key)

            if (values === null || values === undefined) {
              values = []
            } // the view key

            var viewKey = key

            if (viewKey == '_') {
              if (contentGroupsConfig['ignoreOther']) {
                return
              }

              viewKey = contentGroupsConfig['otherName']
            } // result count

            var resultsAvailable =
              data['totalResultsPerContentGroup'] !== undefined &&
              data['totalResultsPerContentGroup'][key] !== undefined
                ? data['totalResultsPerContentGroup'][key]
                : totalResults

            if (!limitPerGroup && groupResults) {
              resultsAvailable = data['suggests'][key].length
            }

            if (resultsAvailable === 0 && values.length > 0) {
              resultsAvailable = values.length
            }

            resultsAvailable = resultsAvailable || totalResults
            var maxResultsCount = Math.min(resultsAvailable, limit)

            if (shouldRenderNav) {
              navigation.addEntry(
                viewKey,
                safeKey,
                query,
                maxResultsCount,
                idx,
                searchResultType
              )
            } // all results that belong under the given caption

            var labelledBy =
              safeKey !== '_' || contentGroupsConfig['otherName'] !== ''
                ? 'aria-labelledby="ss360-heading-' + safeKey + '"'
                : ''
            var groupedNode = Object(sxQuery_sxQuery['a' /* default */])(
              '<section class="ss360-group ss360-group-' +
                safeKey +
                '" ' +
                labelledBy +
                '></section>'
            )

            if (navigation.isTabbed() && idx === 0) {
              groupedNode.addClass('ss360-active')
            }

            if (viewKey.length > 0 && values.length > 0) {
              var keyNode = Object(sxQuery_sxQuery['a' /* default */])(
                '<h' +
                  contentGroupHeadingLevel +
                  ' id="ss360-heading-' +
                  safeKey +
                  '" class="content-group-heading">' +
                  viewKey +
                  '</h' +
                  contentGroupHeadingLevel +
                  '>'
              )
              groupedNode.append(keyNode)
            }

            groupedNode.append('<ul></ul>')
            var resultCounter = 0
            sxQuery_sxQuery['a' /* default */].each(values, function (
              index,
              suggest
            ) {
              var suggestNode = self.buildSuggestItem(
                moreResultsButton !== null
                  ? resultCounter >= pagingSize
                  : false,
                suggest,
                query
              )
              groupedNode.find('ul').append(suggestNode)
              resultCounter++
            })
            totalCounter += resultCounter

            if (values.length > 0) {
              layerContent.append(groupedNode) // highlight stuff

              if (highlight) {
                ui_UiHelper.highlightQueryTermsInResult(query)
              }

              if (
                moreResultsButton !== null &&
                Object(sxQuery_sxQuery['a' /* default */])(
                  '.ss360-group-' +
                    safeKey +
                    '.ss360-group .ss360-suggests.ss360-hidden'
                ).length > 0
              ) {
                // render search button if defined and results left
                var $moreResultsButton = Object(
                  sxQuery_sxQuery['a' /* default */]
                )(
                  '<button type="button" class="ss360-more-results">' +
                    moreResultsButton +
                    '</button>'
                )
                groupedNode.append($moreResultsButton) // ss360-more-results

                $moreResultsButton.on('click', function (e) {
                  var hidden = Object(sxQuery_sxQuery['a' /* default */])(
                    e.target
                  )
                    .closest('.ss360-group')
                    .find('.ss360-suggests.ss360-hidden')

                  if (hidden.length > 0) {
                    // focus first
                    var $toFocus = Object(sxQuery_sxQuery['a' /* default */])(
                      hidden[0]
                    ).find('a:first')
                    setTimeout(function () {
                      $toFocus.focus()
                    }, 5)
                  }

                  var visibleCount = Object(sxQuery_sxQuery['a' /* default */])(
                    e.target
                  )
                    .closest('.ss360-group')
                    .find('.ss360-suggests:not(.ss360-hidden)').length
                  var toggleCount = Math.min(pagingSize, hidden.length)

                  for (var i = 0; i < toggleCount; i++) {
                    var elem = hidden.get(i)
                    visibleCount++
                    Object(sxQuery_sxQuery['a' /* default */])(
                      hidden.get(i)
                    ).fadeIn(
                      300,
                      function (elem, e) {
                        // show
                        Object(sxQuery_sxQuery['a' /* default */])(
                          elem
                        ).removeClass('ss360-hidden')
                      }.bind(this, elem)
                    )
                  }

                  var offset = Object(sxQuery_sxQuery['a' /* default */])(
                    e.target
                  )
                    .closest('.ss360-group')
                    .find('.ss360-suggests').length

                  if (
                    moreResultsCallback !== undefined &&
                    typeof moreResultsCallback === 'function'
                  ) {
                    try {
                      moreResultsCallback
                        .bind(e.target, visibleCount, maxResultsCount, viewKey)
                        .call()
                    } catch (ex) {
                      console.error(ex)
                    }
                  } // highlight stuff

                  if (highlight) {
                    ui_UiHelper.highlightQueryTermsInResult(query)
                  } // prefetch

                  if (offset < maxResultsCount) {
                    var _self = this

                    context.prefetchResults(
                      offset,
                      key,
                      query,
                      function () {
                        var hiddenPrefetched = Object(
                          sxQuery_sxQuery['a' /* default */]
                        )(e.target)
                          .closest('.ss360-group')
                          .find('.ss360-suggests.ss360-hidden')
                          .get()
                          .filter(function (item) {
                            return hidden.get().indexOf(item) === -1
                          })

                        if (hiddenPrefetched.length === 0) {
                          Object(sxQuery_sxQuery['a' /* default */])(
                            _self
                          ).remove()
                        }
                      },
                      undefined,
                      data['activeFilterOptions']
                    )
                  } else if (
                    resultConfig['limitPerGroup'] ||
                    hidden.length - toggleCount <= 0
                  ) {
                    // results already rendered and all shown
                    Object(sxQuery_sxQuery['a' /* default */])(this).remove()
                  }
                })
              }
            }
          })
          return totalCounter
        }

        this.renderNoResultsText = function (layerContent, text, query) {
          var inner = (text || '').replace('#QUERY#', query)
          var noResultsText = Object(sxQuery_sxQuery['a' /* default */])(
            '<div id="ss360-no-results">' + inner + '</div>'
          )
          layerContent.append(noResultsText)
        }

        this.renderWatermark = function (layerContent, plan, allowCookies) {
          if (plan == 'FREE' || plan == 'COLUMBO') {
            var isIe = !('objectFit' in document.documentElement.style)
            layerContent.append(
              '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:120px!important;float:right;position:absolute;top:0;right:5px;'
                .concat(isIe ? 'width:120px;' : '', '" src="')
                .concat(ui_UiHelper.getLogoSrc(allowCookies), '"></a></div>')
            )
          }
        }
      }

      /* harmony default export */ var ui_UiBuilder = UiBuilder_UiBuilder
      // CONCATENATED MODULE: ./src/js/siteSearch/utils/Helper.js

      var Helper = {
        getInitializationErrors: function getInitializationErrors (
          searchBoxSelector,
          is404,
          hasLayoverTrigger
        ) {
          var res = []

          if (
            document.querySelectorAll(
              'script[src*=sitesearch360-v]:not([type="module"])'
            ).length > 1 ||
            document.querySelectorAll(
              'script[src*=sitesearch360-v][type="module"]'
            ).length > 1
          ) {
            res.push(
              'There is more than one sitesearch360 script on this page. Please remove one.'
            )
          }

          if (
            !is404 &&
            !hasLayoverTrigger &&
            Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector)
              .length === 0
          ) {
            res.push(
              'There is no input element for the searchBoxSelector "' +
                searchBoxSelector +
                '". Please update your ss360Config object.'
            )
          }

          return res
        },
        enhanceCallback: function enhanceCallback (
          callback,
          expected,
          enhanceType,
          core
        ) {
          if (callback === undefined) {
            return expected
          }

          if (enhanceType === 'enterResult' || enhanceType === 'type') {
            return callback
          }

          if (callback != expected) {
            if (enhanceType === 'enter') {
              return function (text) {
                core.logQuery(text, 'search')

                try {
                  callback.call(this, text)
                } catch (ex) {
                  console.log(ex)
                }
              }
            } else if (enhanceType === 'focus') {
              return function (event, selectedText) {
                core.focus(event, selectedText)

                try {
                  callback.call(this, event, selectedText)
                } catch (ex) {
                  console.log(ex)
                }
              }
            } else if (enhanceType === 'blur') {
              return function (event, selectedText) {
                core.blur(event, selectedText)

                try {
                  callback.call(this, event, selectedText)
                } catch (ex) {
                  console.log(ex)
                }
              }
            }
          } else {
            return callback
          }
        },
        copyObject: function copyObject (obj) {
          return JSON.parse(JSON.stringify(obj))
        },
        getTotalCount: function getTotalCount (
          data,
          limitPerGroup,
          groupResults,
          ignoreOther,
          exclude,
          limit
        ) {
          var totalResults = data['totalResults']

          if (!limitPerGroup && groupResults) {
            totalResults = Object.keys(data['suggests']).reduce(function (
              acc,
              key
            ) {
              if (key == '_' && ignoreOther) {
                return acc
              } else {
                return acc + data['suggests'][key].length
              }
            },
            0)
          } else if (
            data['totalResultsPerContentGroup'] &&
            Object.keys(data['totalResultsPerContentGroup']).length > 0
          ) {
            totalResults = Object.keys(
              data['totalResultsPerContentGroup']
            ).reduce(function (acc, key) {
              if (
                (key == '_' && ignoreOther) ||
                (exclude !== undefined && exclude.indexOf(key) !== -1)
              ) {
                return acc
              } else {
                return (
                  acc +
                  Math.min(limit, data['totalResultsPerContentGroup'][key])
                )
              }
            }, 0)
          } else if (!groupResults) {
            totalResults = Math.min(totalResults, limit)
          }

          return totalResults
        }
      }
      /* harmony default export */ var utils_Helper = Helper
      // CONCATENATED MODULE: ./src/js/siteSearch/components/Smart404.js

      var Smart404 = {
        checkAndHandle: function checkAndHandle (ss360Settings, context) {
          // check whether title contains identifier
          if (
            document
              .querySelector('title')
              .text.toLowerCase()
              .indexOf(ss360Settings.smart404.identifier.toLowerCase()) > -1
          ) {
            var configCache = {
              showErrors: ss360Settings.showErrors,
              results: utils_Helper.copyObject(ss360Settings.results),
              layout: utils_Helper.copyObject(ss360Settings.layout),
              contentGroups: utils_Helper.copyObject(
                ss360Settings.contentGroups
              )
            }
            ss360Settings.showErrors = false
            context.changeConfig('results.embedConfig', {
              contentBlock: ss360Settings.smart404.resultSelector
            })
            ss360Settings.results.caption = ss360Settings.smart404.caption
            ss360Settings.layout.navigation.position = 'none'
            ss360Settings.results.group = false
            ss360Settings.results.queryCorrectionText = ''
            ss360Settings.contentGroups.otherName = ''
            ss360Settings.results.num = 12
            ss360Settings.results.moreResultsPagingSize = 12
            ss360Settings.results.highlightQueryTerms = true
            ss360Settings.layout.desktop.showDataPoints = false
            ss360Settings.layout.desktop.showUrl = true
            ss360Settings.layout.mobile.showDataPoints = false
            ss360Settings.layout.mobile.showUrl = true // get and clean up URL to form search query

            var pathParts = document.location.pathname
              .split('/')
              .filter(function (part) {
                return part != ''
              })

            if (pathParts.length > 0) {
              var pathQuery = pathParts[Math.max(0, pathParts.length - 1)]
                .replace('.html', '')
                .replace('404', '')
                .replace(/[/-]/gi, ' ') // create target layer to avoid conflicts

              Object(sxQuery_sxQuery['a' /* default */])('body').append(
                '<section id="ss360-404-layer" style="display: block;" aria-label="Link Suggestions"></section>'
              ) // show and set config to previous settings

              context.showResults(
                pathQuery,
                '_relevance',
                undefined,
                false,
                undefined,
                function () {
                  Object.keys(configCache).forEach(function (key) {
                    ss360Settings[key] = configCache[key]
                  })
                  context.changeConfig(
                    'results.embedConfig',
                    configCache['results']['embedConfig']
                  )
                },
                'smart404'
              )
            }

            return true
          }

          return false
        }
      }
      /* harmony default export */ var components_Smart404 = Smart404
      // CONCATENATED MODULE: ./src/js/siteSearch/components/StyleApplier.js

      var StyleApplier_applySearchBoxStyles = function applySearchBoxStyles (
        sbs,
        searchBoxSelector,
        searchButtonSelector,
        searchResultType
      ) {
        if (sbs === undefined) {
          return
        }

        var searchBox = Object(sxQuery_sxQuery['a' /* default */])(
          searchBoxSelector
        )
        var sbut = Object(sxQuery_sxQuery['a' /* default */])(
          searchButtonSelector
        )
        applySearchBoxTextStyles(sbs['text'], searchBox, sbut)
        applySearchBoxBorderStyles(sbs['border'], searchBox, sbut)
        applyPadding(searchBox, sbs['padding'])
        applyPadding(sbut, sbs['padding'])
        var iconPaddingLeft = sbs['padding'] ? sbs['padding'] : '5px'
        var defaultColor = '#666666'

        for (var i = 0; i < searchBox.length; i++) {
          StyleApplier_addSearchBoxIcon(
            Object(sxQuery_sxQuery['a' /* default */])(searchBox[i]),
            sbs['icon'],
            iconPaddingLeft,
            defaultColor,
            searchResultType
          )
        }

        if (sbs['button'] !== undefined && sbut.length > 0) {
          var sbutStyle = sbs['button']
          applyStyle(sbut, 'cursor', 'pointer')

          if (sbutStyle['text'] !== undefined) {
            sbut.val(sbutStyle['text'])
            sbut.html(sbutStyle['text'])
            applyColor(sbut, sbutStyle['textColor'])
          } else {
            sbut.val(' ')
            sbut.html(' ')
          }

          StyleApplier_addSearchButtonIcon(
            sbut,
            sbutStyle['icon'],
            iconPaddingLeft,
            sbutStyle['color'] || defaultColor,
            sbutStyle['iconPadding']
          )
        }

        var backgroundColor = sbs['background']
          ? sbs['background']['color']
          : undefined
        applyBackground(searchBox, backgroundColor)
        applyBackground(sbut, backgroundColor)
      }

      var StyleApplier_applySearchSuggestionStyles = function applySearchSuggestionStyles (
        sbs
      ) {
        if (sbs === undefined) {
          return
        }

        var sugBox = Object(sxQuery_sxQuery['a' /* default */])(
          '#unibox-suggest-box'
        )
        applyPadding(sugBox, sbs['padding'])
        applyStyle(sugBox, 'margin-top', sbs['distanceFromTop'])

        if (sbs['text'] !== undefined) {
          applyColor(sugBox, sbs['text']['color'])
        }

        if (sbs['background'] !== undefined) {
          applyBackground(sugBox, sbs['background']['color'])
        }

        if (sbs['border'] !== undefined) {
          applyBorderRadius(sugBox, sbs['border']['radius'])
          applyBorderColor(sugBox, sbs['border']['color'])
        }
      }

      var applySearchBoxTextStyles = function applySearchBoxTextStyles (
        style,
        sb,
        sbut
      ) {
        if (style === undefined) {
          return
        }

        applyColor(sb, style['color'])
        applyColor(sbut, style['color'])
        applySize(sb, style['size'])
        applySize(sbut, style['size'])
      }

      var applySearchBoxBorderStyles = function applySearchBoxBorderStyles (
        style,
        sb,
        sbut
      ) {
        if (style === undefined) {
          return
        }

        applyBorderRadius(sb, style['radius'])
        applyBorderRadius(sbut, style['radius'])
        applyBorderColor(sb, style['color'])
        applyBorderColor(sbut, style['color'])
      }

      var applyColor = function applyColor (elem, color) {
        applyStyle(elem, 'color', color)
      }

      var applySize = function applySize (elem, size) {
        applyStyle(elem, 'font-size', size)
      }

      var applyBorderRadius = function applyBorderRadius (elem, radius) {
        if (radius === undefined) {
          return
        }

        applyStyle(elem, 'border', '1px solid')
        applyStyle(elem, 'border-radius', radius)
      }

      var applyBorderColor = function applyBorderColor (elem, color) {
        applyStyle(elem, 'border-color', color)
      }

      var applyPadding = function applyPadding (elem, padding) {
        applyStyle(elem, 'padding', padding)
      }

      var applyBackground = function applyBackground (elem, color) {
        applyStyle(elem, 'background-color', color)
      }

      var applyStyle = function applyStyle (elem, key, value) {
        if (value !== undefined) {
          elem.css(key, value)
        }
      }

      var StyleApplier_addSearchBoxIcon = function addSearchBoxIcon (
        sb,
        icon,
        iconPaddingLeft,
        defaultColor,
        searchResultType
      ) {
        if (icon === undefined || icon['image'] !== 'magnifier') {
          return
        }

        var isFullScreenField =
          searchResultType === 'fullscreen' && sb.attr('id') === 'ss360-query'
        var sbHeight = isFullScreenField ? 54 : sb.outerHeight()
        var positionTop = 0
        var size = 0
        size = sbHeight - 18 // set to css value because the input is not fully visible at this point

        positionTop = (sbHeight - size) / 2
        var sIcon = ui_UiHelper.getBase64Magnifier(icon.color || defaultColor)
        sb.css(
          'background',
          "url('" +
            sIcon +
            "') no-repeat " +
            iconPaddingLeft +
            ' ' +
            positionTop +
            'px'
        )
        sb.css('background-size', size + 'px ' + size + 'px')
        sb.css(
          'padding-left',
          size + 1 * iconPaddingLeft.replace('px', '') + 2 + 'px'
        )
      }

      var StyleApplier_addSearchButtonIcon = function addSearchButtonIcon (
        sbut,
        icon,
        iconPaddingLeft,
        color,
        iconPadding
      ) {
        if (icon !== 'magnifier') {
          return
        }

        var yPadding = 9

        if (iconPadding !== undefined) {
          yPadding = parseInt(iconPadding)
        }

        var size = sbut.outerHeight() - 2 * yPadding
        var sbutIc = ui_UiHelper.getBase64Magnifier(color)
        var sbutStyle = 'width:' + size + 'px; height:' + size + 'px'
        var areButtons = true
        var els = sbut.get()

        for (var i = 0; i < els.length; i++) {
          if (els[i].nodeName !== 'BUTTON') {
            areButtons = false
            break
          }
        }

        if (!areButtons) {
          var paddingTop = (sbut.outerHeight() - size) / 2
          sbut.css(
            'background',
            "url('" +
              sbutIc +
              "') no-repeat " +
              (iconPadding !== undefined ? iconPadding : iconPaddingLeft) +
              ' ' +
              paddingTop +
              'px'
          )
          sbut.css('background-size', size + 'px')
        } else {
          sbut.html(
            '<img role="presentation" alt="" style="' +
              sbutStyle +
              '" src="' +
              sbutIc +
              '"/>'
          )
        }

        sbut.css('min-width', sbut.outerHeight() + 'px')
      }

      var StyleApplier = {
        apply: function apply (
          styles,
          searchBoxSelector,
          searchButtonSelector,
          searchResultType
        ) {
          try {
            StyleApplier_applySearchBoxStyles(
              styles['searchBox'],
              searchBoxSelector,
              searchButtonSelector,
              searchResultType
            )
          } catch (e) {
            console.warn(e)
          } // suggest box styles

          try {
            StyleApplier_applySearchSuggestionStyles(styles['suggestions'])
          } catch (e) {
            console.warn(e)
          }
        }
      }
      /* harmony default export */ var components_StyleApplier = StyleApplier
      // CONCATENATED MODULE: ./src/js/siteSearch/components/VoiceSearch.js

      var isAvailable = 'webkitSpeechRecognition' in window

      var VoiceSearch_VoiceSearch = function VoiceSearch (
        targetSbNode,
        lang,
        callback
      ) {
        if (!isAvailable) {
          return
        }

        var voiceButton = Object(sxQuery_sxQuery['a' /* default */])(
          "<button aria-label='Search by speech' class='ss360-voice-search ss360-flex ss360-flex--align-center ss360-flex--justify-center' style='display: none;position:absolute'>" +
            ui_UiHelper.getSvgMicrophone() +
            "</button>'"
        )
        var timeoutId = -1 // position

        var sBox = Object(sxQuery_sxQuery['a' /* default */])(targetSbNode)

        if (sBox.attr('id') == 'ss360-custom-searchbox') {
          voiceButton.show()
        }

        var resizeCallback = function resizeCallback () {
          var sbHeight = sBox.outerHeight()
          var voicePadding =
            sbHeight >= 40 ? 10 : sbHeight >= 30 ? sbHeight - 30 : 0
          var voiceButtonDimension = sbHeight - voicePadding
          var topOffset = sBox.offset().top - sBox.parent().offset().top
          var leftOffset = sBox.offset().left - sBox.parent().offset().left
          var sbPadding = voiceButtonDimension + voicePadding / 2
          var stylesheetPadding = parseInt(
            sBox.css('paddingRight').replace('px', '')
          )
          voiceButton.css('position', 'absolute')
          voiceButton.css('top', topOffset + voicePadding / 2)
          voiceButton.css('height', voiceButtonDimension)
          voiceButton.css('width', voiceButtonDimension)
          voiceButton.css(
            'left',
            leftOffset +
              sBox.outerWidth() -
              voiceButtonDimension -
              voicePadding / 2
          )

          if (sBox.css('boxSizing') !== 'border-box') {
            sBox.css(
              'width',
              parseFloat(sBox.css('width').replace('px', '')) -
                sbPadding +
                stylesheetPadding
            )
          }

          sBox.css('paddingRight', sbPadding)
          voiceButton.show()
        }

        var resizeVoiceButton = function resizeVoiceButton () {
          clearTimeout(timeoutId)
          sBox.get()[0].style.paddingRight = null
          sBox.get()[0].style.width = null
          timeoutId = setTimeout(resizeCallback, 250)
        }

        resizeCallback()
        resizeVoiceButton()
        Object(sxQuery_sxQuery['a' /* default */])(window).on(
          'resize',
          resizeVoiceButton
        ) // recognition

        var isVoiceSearchRunning = false
        var recognition = undefined

        var stop = function stop () {
          isVoiceSearchRunning = false
          voiceButton.removeClass('ss360-recording')

          if (recognition !== undefined) {
            recognition.stop()
            recognition = undefined
          }
        } // bind listener and render

        voiceButton.click(function (e) {
          e.preventDefault()
          e.stopPropagation()

          if (recognition !== undefined) {
            stop()
          } else {
            recognition = new webkitSpeechRecognition()
            isVoiceSearchRunning = true
            recognition.continuous = false
            recognition.interimResults = false
            recognition.lang = lang

            recognition.onstart = function () {
              voiceButton.addClass('ss360-recording')

              if (voiceButton.find('svg').find('line').length > 0) {
                var svgCopy = Object(sxQuery_sxQuery['a' /* default */])(
                  voiceButton.find('svg').get()[0].outerHTML
                )
                svgCopy.find('line').remove()
                voiceButton.get()[0].innerHTML = svgCopy.get()[0].outerHTML
              }
            }

            recognition.onresult = function (e) {
              var query = e.results[0][0].transcript
              Object(sxQuery_sxQuery['a' /* default */])(targetSbNode).val(
                query
              )
              callback(
                query,
                undefined,
                undefined,
                true,
                Object(sxQuery_sxQuery['a' /* default */])(
                  voiceButton
                ).get()[0],
                undefined
              )
              stop()
            }

            recognition.onerror = function (e) {
              var err = e.error

              if (err == 'not-allowed') {
                if (voiceButton.find('svg').find('line').length === 0) {
                  var svgCopy = Object(sxQuery_sxQuery['a' /* default */])(
                    voiceButton.find('svg').get()[0].outerHTML
                  )
                  svgCopy.append(
                    '<line y1="24" x2="24.5" y2="0" stroke="#E05350" x1="-0.5" stroke-width="3"></line>'
                  ) // voiceButton.find("svg").remove();

                  voiceButton.get()[0].innerHTML = svgCopy.get()[0].outerHTML
                }

                voiceButton.attr(
                  'title',
                  'Permission to use microphone is blocked. Please go to your browser settings to enable microphone usage.'
                )
              }

              stop()
            }

            recognition.onend = function () {
              stop()
            }

            recognition.start()
          }
        })
        sBox.parent().append(voiceButton)
      }

      /* harmony default export */ var components_VoiceSearch = VoiceSearch_VoiceSearch
      // CONCATENATED MODULE: ./src/js/siteSearch/components/Results.js

      var Results = {
        fetch: function fetch (url, callback, failCallback) {
          sxQuery_sxQuery['a' /* default */].get(url, callback, failCallback)
        },
        prefetchAndRender: function prefetchAndRender (
          s,
          rest,
          uiBuilder,
          callback,
          context
        ) {
          var queryUrl = context.buildQueryUrl(
            s.siteId,
            s.limit,
            undefined,
            s.contentGroup && s.groupResults ? [s.contentGroup] : [],
            [],
            false,
            s.query,
            s.offset,
            false,
            s.filters
          )
          Results.fetch(queryUrl, function (data) {
            var results = data['suggests'][s.contentGroup]

            if (results !== undefined) {
              var safeKey = utils_StringHelper.getSafeKey(s.contentGroup)
              var resultTarget = Object(sxQuery_sxQuery['a' /* default */])(
                '.ss360-group-' + safeKey + ' ul'
              )
              results.forEach(function (suggest, idx) {
                var $item = uiBuilder.buildSuggestItem(
                  rest <= idx,
                  suggest,
                  s.query
                )
                resultTarget.append($item)
              })
            }

            if (callback !== undefined && typeof callback === 'function') {
              callback()
            }
          })
        },
        wasBackPressed: function wasBackPressed (allowCookies, query) {
          return allowCookies
            ? sxQuery_sxQuery['a' /* default */].readCookie(
              'ss360-query--c'
            ) === query
            : window.location.search.indexOf('ss360Offset=') !== -1
        },
        handleBackPress: function handleBackPress (
          allowCookies,
          navigation,
          query,
          searchResultType,
          pageSize,
          context
        ) {
          var queryDict = utils_NavigatorHelper.buildQueryDict()
          var offset = parseInt(
            allowCookies
              ? sxQuery_sxQuery['a' /* default */].readCookie('ss360-offset--c')
              : queryDict['ss360Offset']
          )
          var cg = allowCookies
            ? sxQuery_sxQuery['a' /* default */].readCookie('ss360-cg--c')
            : queryDict['ss360ContentGroup']
          var cgKey = utils_StringHelper.getSafeKey(cg)
          var groupWrapper = cg
            ? Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-group-' + cgKey
            )
            : Object(sxQuery_sxQuery['a' /* default */])('.ss360-group-_:first')

          var performScroll = function performScroll () {
            // switch content group if necessary
            navigation.focusTab(cgKey) // perform the scroll

            var relevantResult = Object(sxQuery_sxQuery['a' /* default */])(
              groupWrapper.find('.ss360-suggests:not(.ss360-hidden)')[offset]
            )
            navigation.scrollTo(relevantResult, searchResultType)
            setTimeout(function () {
              relevantResult.find('a:first').focus()
            }, 5)
          }

          var filterOptions = undefined

          if (queryDict['ss360Filter'] !== undefined) {
            try {
              filterOptions = JSON.parse(queryDict['ss360Filter'])
            } catch (ex) {}
          }

          if (
            offset <
            groupWrapper.find('.ss360-suggests:not(.ss360-hidden)').length
          ) {
            // the relevant result is visible
            performScroll()
          } else if (offset < groupWrapper.find('.ss360-suggests').length) {
            context.prefetchResults(
              groupWrapper.find('.ss360-suggests').length,
              cg,
              query,
              function () {
                // the relevant result is not visible but is loaded
                if (groupWrapper.find('.ss360-hidden').length === 0) {
                  groupWrapper.find('.ss360-more-results').remove()
                }
              },
              undefined,
              filterOptions
            ) // prefetch more results

            groupWrapper
              .find('.ss360-suggests.ss360-hidden')
              .removeClass('ss360-hidden') // show all loaded results

            performScroll()
          } else {
            // the relevant result has to be fetched
            ui_UiHelper.showLoadingAnimation()
            var toPreloadCount =
              offset + 1 - groupWrapper.find('.ss360-suggests').length
            var pagesToPreload = Math.ceil(toPreloadCount / pageSize) + 1
            var overrides = {
              num: offset + pagesToPreload * pageSize,
              pageSize: pagesToPreload * pageSize
            }
            groupWrapper.find('.ss360-suggests').removeClass('ss360-hidden')
            var loadedResultCount = groupWrapper.find('.ss360-suggests').length
            context.prefetchResults(
              loadedResultCount,
              cg,
              query,
              function () {
                var expectedResultCount =
                  pageSize * pagesToPreload + loadedResultCount
                var allExpectedResultsLoaded =
                  groupWrapper.find('.ss360-suggests').length >=
                  expectedResultCount
                var allSuggests = groupWrapper.find('.ss360-suggests')

                for (var i = 0; i < allSuggests.length; i++) {
                  if (
                    !allExpectedResultsLoaded ||
                    i < allSuggests.length - pageSize
                  ) {
                    Object(sxQuery_sxQuery['a' /* default */])(
                      allSuggests.get()[i]
                    ).removeClass('ss360-hidden')
                  } else {
                    Object(sxQuery_sxQuery['a' /* default */])(
                      allSuggests.get()[i]
                    ).addClass('ss360-hidden')
                  }
                }

                if (groupWrapper.find('.ss360-hidden').length === 0) {
                  groupWrapper.find('.ss360-more-results').remove()
                }

                ui_UiHelper.hideLoadingAnimation()
                performScroll()
              },
              overrides,
              filterOptions
            )
          } // cleanup

          if (!allowCookies) {
            delete queryDict['ss360ContentGroup']
            delete queryDict['ss360Offset']
            utils_NavigatorHelper.replaceState(queryDict)
          } else {
            sxQuery_sxQuery['a' /* default */].createCookie(
              'ss360-cg--c',
              '',
              1 / 24
            )
            sxQuery_sxQuery['a' /* default */].createCookie(
              'ss360-offset--c',
              -1,
              1 / 24
            )
            sxQuery_sxQuery['a' /* default */].createCookie(
              'ss360-query--c',
              '',
              1 / 24
            )
          }
        }
      }
      /* harmony default export */ var components_Results = Results
      // CONCATENATED MODULE: ./src/js/siteSearch/components/Navigation.js

      var DROPDOWN_MARKUP =
        '<div class="ss360-select-wrapper"><label class="ss360-nav-label" for="ss360-nav-dropdown"><span></span></label><select class="ss360-nav-select" id="ss360-nav-dropdown"></select></div>'
      var MENU_BAR_MARKUP = '<ul role="menubar"></ul>'
      var PRE_MARKUP = '<div class="ss360-nav-pre" role="presentation"></div>'
      var POST_MARKUP = '<div class="ss360-nav-post" role="presentation"></div>'

      var Navigation_build = function build (position, isTabbed, isDropdown) {
        if (position !== 'left' && position !== 'top') {
          // invalid position
          return null
        } // class name

        var className = 'ss360-nav ss360-' + position + '-nav'

        if (isTabbed) {
          className += ' ss360-tabbed ss360-flex ss360-flex--wrap'

          if (position === 'left') {
            className += ' ss360-flex--column'
          }
        }

        if (isDropdown) {
          className +=
            ' ss360-dropdown ss360-flex--align-center ss360-flex--justify-center'
        }

        var markup =
          '<nav role="navigation" class="' +
          className +
          '" aria-label="Search Result Navigation">'

        if (!isDropdown) {
          markup +=
            (isTabbed ? PRE_MARKUP : '') +
            MENU_BAR_MARKUP +
            (isTabbed ? POST_MARKUP : '')
        } else {
          markup += DROPDOWN_MARKUP
        }

        markup += '</nav>'
        return Object(sxQuery_sxQuery['a' /* default */])(markup)
      }

      var Navigation_bindDropdown = function bindDropdown (
        nav,
        headings,
        layer
      ) {
        var $select = nav.find('select')
        var $label = nav.find('label')
        $select.on('focus', function () {
          $label.addClass('ss360-focus')
        })
        $select.on('focusout', function () {
          $label.removeClass('ss360-focus open')
        })
        $select.on('change', function (e) {
          var text = Object(sxQuery_sxQuery['a' /* default */])(
            e.target.options[e.target.selectedIndex]
          ).text()
          $label.text(text)
        })
        $select.on('click', function () {
          if (
            Object(sxQuery_sxQuery['a' /* default */])($label).hasClass('open')
          ) {
            $label.removeClass('open')
          } else {
            $label.addClass('open')
          }
        })
        $select.on('change', function (e) {
          var group = Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-group-' + e.target.value
          )
          Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-group, #ss360-layer nav li'
          ).removeClass('ss360-active')
          group.addClass('ss360-active')
          layer
            .find('#ss360-search-result-heading a')
            .text(headings[e.target.value])
        })
      }

      var Navigation_createNavigationEntry = function createNavigationEntry (
        aid,
        viewKey,
        safeKey,
        shouldShowCount,
        isDropdown,
        count
      ) {
        if (isDropdown) {
          var selectOptionText =
            viewKey + (shouldShowCount ? ' (' + count + ')' : '')
          return Object(sxQuery_sxQuery['a' /* default */])(
            '<option value="' + safeKey + '">' + selectOptionText + '</option>'
          )
        } else {
          var entry = Object(sxQuery_sxQuery['a' /* default */])(
            '<li data-cgkey="' +
              safeKey +
              '"><button type="button" id="navelement' +
              aid +
              '" class="ss360-nav-entry" role="menuitem">' +
              viewKey +
              '</button></li>'
          )

          if (shouldShowCount) {
            entry
              .find('button')
              .append('<span class="ss360-result-count">' + count + '</span>')
          }

          return entry
        }
      }

      var Navigation_bindClickHandler = function bindClickHandler (
        navEntry,
        safeKey,
        isTabbed,
        heading,
        searchResultType,
        animationSpeed
      ) {
        navEntry.find('button').on('click', function (e) {
          var group = Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-group-' + safeKey
          )
          var $toFocus = group.find('li:first').find('a:first') // toggle tab if tabbed

          if (isTabbed) {
            if (
              Object(sxQuery_sxQuery['a' /* default */])(navEntry).hasClass(
                'ss360-active'
              )
            ) {
              // same tab
              return
            }

            Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-group, #ss360-layer nav li'
            ).removeClass('ss360-active')
            group.addClass('ss360-active')
            navEntry.addClass('ss360-active')
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer')
              .find('#ss360-search-result-heading a')
              .text(heading)
          }

          if (!isTabbed) {
            Navigation_scrollTo(group, animationSpeed, searchResultType)
          } // focus first result

          setTimeout(function () {
            $toFocus.focus()
          }, 5)
        })
      }

      var Navigation_scrollTo = function scrollTo (
        to,
        animationSpeed,
        searchResultType
      ) {
        // scroll to first result if not tabbed
        if (searchResultType == 'layover') {
          var top =
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-layer .ss360-layer-content'
            ).scrollTop() + to.position().top
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-layer .ss360-layer-content'
          ).animateScrollTop(top, 2 * animationSpeed)
        }

        if (searchResultType === 'fullscreen') {
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).animateScrollTop(to.offset().top, 2 * animationSpeed)
        }

        if (searchResultType === 'embed') {
          Object(sxQuery_sxQuery['a' /* default */])(
            'html, body'
          ).animateScrollTop(to.offset().top, 2 * animationSpeed)
        }
      }

      var Navigation_Navigation = function Navigation (
        navigationConfig,
        data,
        animationSpeed
      ) {
        var position = navigationConfig.position
        var maxTabs = position === 'top' ? 5 : 10
        var isTabbed = navigationConfig.type === 'tabs'
        var forceTabs = navigationConfig.forceTabs
        var entryCount = Object.keys(data['suggests']).length
        var isDropdown =
          isTabbed &&
          ((!forceTabs && entryCount > maxTabs) ||
            sxQuery_sxQuery['a' /* default */].matchesMediaQuery('max', 991))

        if (
          navigationConfig['fallbackToScroll'] &&
          isDropdown &&
          sxQuery_sxQuery['a' /* default */].matchesMediaQuery('min', 992)
        ) {
          isTabbed = false
          isDropdown = false
        }

        var forceFlex = isTabbed && !isDropdown && position === 'left'
        var nav = null
        var headings = {}

        this.getNav = function () {
          return nav
        }

        this.shouldForceFlex = function () {
          return forceFlex
        }

        this.getPosition = function () {
          return position
        }

        this.isTabbed = function () {
          return isTabbed
        }

        this.getPosition = function () {
          return position
        }

        this.isDropdown = function () {
          return isDropdown
        }

        this.show = function () {
          if (nav !== null) {
            nav.show()
          }
        }

        this.hide = function () {
          if (nav !== null) {
            nav.hide()
          }
        }

        this.build = function (layer, layerContent) {
          nav = Navigation_build(position, isTabbed, isDropdown)

          if (nav === null) {
            return
          }

          if (!isDropdown && position !== 'top') {
            layerContent.addClass('ss360-left-nav')
          }

          if (isDropdown) {
            Navigation_bindDropdown(nav, headings, layer)
          }

          if (!forceFlex) {
            layer.append(nav)
          } else {
            layer.append(
              '<div class="ss360-flex ss360-flex--align-stretch" id="ss360-flex-wrapper"></div>'
            )
            layer.find('#ss360-flex-wrapper').append(nav)
          }
        }

        this.scrollTo = function (el, searchResultType) {
          Navigation_scrollTo(el, animationSpeed, searchResultType)
        }

        this.focusTab = function (contentGroupKey) {
          if (nav === null || !isTabbed) {
            return
          }

          if (isDropdown) {
            var navSelect = Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-nav-select'
            )
            Object(sxQuery_sxQuery['a' /* default */])('.ss360-nav-label').text(
              navSelect.find("option[value='" + contentGroupKey + "']").text()
            )
            navSelect.val(contentGroupKey)
          } else {
            Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-tabbed li'
            ).removeClass('ss360-active')
            Object(sxQuery_sxQuery['a' /* default */])(
              ".ss360-tabbed li[data-cgkey='" + contentGroupKey + "'"
            ).addClass('ss360-active')
          }

          Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-group'
          ).removeClass('ss360-active')
          Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-group-' + contentGroupKey
          ).addClass('ss360-active')
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-result-heading a'
          ).text(headings[contentGroupKey])
        }

        this.addEntry = function (
          viewKey,
          safeKey,
          query,
          resultCount,
          idx,
          searchResultType
        ) {
          if (nav === null || viewKey.length === 0) {
            return
          }

          var aid = Math.round(10000 * Math.random()) // heading

          var headingTemplate =
            navigationConfig['tabTitle'] ||
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-search-result-heading a'
            ).text()
          var heading = headingTemplate
            .split('#COUNT#')
            .join(resultCount)
            .split('#NAME#')
            .join(viewKey)
            .split('#QUERY#')
            .join(query)
          headings[safeKey] = heading
          var navEntry = Navigation_createNavigationEntry(
            aid,
            viewKey,
            safeKey,
            navigationConfig['showGroupResultCount'],
            isDropdown,
            resultCount
          ) // is current entry active?

          if (idx === 0 && isTabbed) {
            if (isDropdown) {
              nav.find('label').text(navEntry.text())
            }

            Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer')
              .find('#ss360-search-result-heading a')
              .text(heading)
            navEntry.addClass('ss360-active')
          }

          if (!isDropdown) {
            Navigation_bindClickHandler(
              navEntry,
              safeKey,
              isTabbed,
              heading,
              searchResultType,
              animationSpeed
            )
          }

          nav.find(isDropdown ? 'select' : 'ul').append(navEntry)
        }
      }

      /* harmony default export */ var components_Navigation = Navigation_Navigation
      // CONCATENATED MODULE: ./src/js/siteSearch/components/Sorting.js

      var Sorting_Sorting = function Sorting (relevanceText) {
        this.render = function (
          layerContent,
          sortingOptions,
          appliedSorting,
          callback,
          selectedText
        ) {
          var sorting = Object(sxQuery_sxQuery['a' /* default */])(
            '<section style="width:100%;min-height:1.5em;" id="ss360-sorting" role="search" aria-label="Sort Search Results"><select id="ss360-sorting-selection" style="max-width:150px;float:right;"></section> '
          )
          var relevanceLabel = relevanceText || 'Relevance'
          sorting
            .find('select')
            .append(
              Object(sxQuery_sxQuery['a' /* default */])(
                '<option value="_relevance">' + relevanceLabel + '</option>'
              )
            )

          for (var i = 0; i < sortingOptions.length; i++) {
            sorting
              .find('select')
              .append(
                Object(sxQuery_sxQuery['a' /* default */])(
                  '<option value="' +
                    sortingOptions[i] +
                    '">' +
                    sortingOptions[i] +
                    '</option>'
                )
              )
          }

          var $heading = layerContent.find('#ss360-search-result-heading')
          var appended = false

          if ($heading.length > 0) {
            var headingNode = $heading.get()[0]

            if (headingNode) {
              var parent = headingNode.parentNode

              if (parent) {
                parent.insertBefore(sorting.get()[0], parent.children[1])
                appended = true
              }
            }
          }

          if (!appended) {
            layerContent.append(sorting)
          }

          sorting.find('select').val(appliedSorting || '_relevance')

          var changeHandler = function changeHandler () {
            callback(
              selectedText,
              Object(sxQuery_sxQuery['a' /* default */])(this).val(),
              undefined,
              true,
              this,
              undefined,
              'order'
            )
          }

          sorting.find('select').on('change', changeHandler)
        }
      }

      /* harmony default export */ var components_Sorting = Sorting_Sorting
      // CONCATENATED MODULE: ./src/js/siteSearch/polyfills/ObjectFitPolyfill.js

      var ObjectFitPolyfill = {
        apply: function apply (selector) {
          if ('objectFit' in document.documentElement.style) {
            return
          }

          Object(sxQuery_sxQuery['a' /* default */])(selector)
            .get()
            .forEach(function (el) {
              var $el = Object(sxQuery_sxQuery['a' /* default */])(el)
              var $imgEl = $el.find('img')
              var imageSource = $imgEl.attr('src')
              $imgEl.hide()
              $el.addClass('ss360--object-fit-polyfill')
              el.style.backgroundSize = 'cover'
              el.style.backgroundImage = 'url(' + imageSource + ')'
              el.style.backgroundPosition = 'center center'
            })
        }
      }
      /* harmony default export */ var polyfills_ObjectFitPolyfill = ObjectFitPolyfill
      // CONCATENATED MODULE: ./src/js/siteSearch/api/apiConfig.js

      var ApiConfig = {
        baseUrl: 'https://global.sitesearch360.com' // baseUrl: "http://localhost:3600"
      }
      /* harmony default export */ var api_apiConfig = ApiConfig
      // CONCATENATED MODULE: ./src/js/siteSearch/api/UrlBuilder.js

      var UrlBuilder = {
        buildQueryUrl: function buildQueryUrl (
          siteId,
          limit,
          sort,
          include,
          exclude,
          tracking,
          selectedText,
          offset,
          limitPerGroup,
          groupResults,
          highlightQueryTerms,
          searchResultCallback,
          filters,
          Reporter,
          generateFilterOptions
        ) {
          var queryUrl =
            api_apiConfig.baseUrl +
            '/sites?site=' +
            siteId +
            '&timeToAction=' +
            Reporter.getTimeToAction() +
            '&includeContent=true&limit=' +
            limit

          if (sort != undefined) {
            queryUrl += '&sort=' + encodeURIComponent(sort)
          }

          if (groupResults === false) {
            queryUrl += '&groupResults=false'
          }

          if (limitPerGroup) {
            queryUrl += '&limitPerGroup=true'
          } // if post search callback is set we let the API highlight query terms

          if (
            highlightQueryTerms == true &&
            searchResultCallback != undefined
          ) {
            queryUrl += '&highlightQueryTerms=true'
          }

          if (include !== undefined) {
            queryUrl +=
              '&includeContentGroups=' +
              encodeURIComponent(JSON.stringify(include))
          }

          if (exclude !== undefined) {
            queryUrl +=
              '&excludeContentGroups=' +
              encodeURIComponent(JSON.stringify(exclude))
          }

          if (filters !== undefined) {
            queryUrl +=
              '&filters=' + encodeURIComponent(JSON.stringify(filters))
          }

          if (!tracking) {
            queryUrl += '&log=false'
          }

          if (generateFilterOptions) {
            queryUrl += '&filterOptions=true'
          }

          queryUrl += '&offset=' + offset
          queryUrl += '&query=' + encodeURIComponent(selectedText)
          return queryUrl
        },
        buildSuggestionUrl: function buildSuggestionUrl (
          siteId,
          show,
          limit,
          equalSearch,
          include,
          exclude,
          groupResults,
          maxQuerySuggestions
        ) {
          if (!show) {
            return ''
          }

          var queryUrl =
            api_apiConfig.baseUrl +
            '/sites/suggest?site=' +
            siteId +
            '&limit=' +
            limit

          if (equalSearch) {
            queryUrl = queryUrl.replace('/sites/suggest', '/sites')
            queryUrl += '&includeContent=true&log=false'
          }

          if (include !== undefined) {
            queryUrl +=
              '&includeContentGroups=' +
              encodeURIComponent(JSON.stringify(include))
          }

          if (exclude !== undefined) {
            queryUrl +=
              '&excludeContentGroups=' +
              encodeURIComponent(JSON.stringify(exclude))
          }

          if (groupResults === false) {
            queryUrl += '&groupResults=false'
          }

          if (maxQuerySuggestions > 0) {
            queryUrl += '&maxQuerySuggestions=' + maxQuerySuggestions
          }

          queryUrl += '&query='
          return queryUrl
        }
      }
      /* harmony default export */ var api_UrlBuilder = UrlBuilder
      // CONCATENATED MODULE: ./src/js/siteSearch/components/RangeSlider.js

      var HISTOGRAM_BUCKET_COUNT = 50

      var RangeSlider_RangeSlider = function RangeSlider (
        wrapper,
        config,
        valueDistribution,
        changeCallback
      ) {
        var _this = this

        config = config || {} // configuration

        var min = config.min !== undefined ? config.min : 1
        var max = config.max !== undefined ? config.max : 100
        var step = config.step
          ? Math.round(config.step) === config.step
            ? config.step
            : Math.round(config.step * 100) / 100
          : Math.abs(max - min) / 100
        var unit = config.unit
        var drawHistogram =
          config.drawHistogram && valueDistribution !== undefined // current values

        var lVal = min
        var rVal = max
        var valCache = undefined // ui elements

        var lId = 'ss360-sldr--' + Math.round(10000 * Math.random())
        var rId = 'ss360-sldr--' + Math.round(10000 * Math.random())

        var createHandle = function createHandle (controls, type) {
          return Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360-sldr--'
              .concat(
                type,
                ' ss360-sldr-handle" tabindex="0" unselectable="on" draggable="false" ondragstart="return false" aria-role="slider" aria-controls="'
              )
              .concat(controls, '" aria-valuemin="')
              .concat(min, '" aria-valuemax="')
              .concat(max, '" aria-valuenow="')
              .concat(min, '"></div>')
          )
        }

        var createBar = function createBar (type) {
          return Object(sxQuery_sxQuery['a' /* default */])(
            '<div role="presentation" class="ss360-sldr--'.concat(
              type,
              ' ss360-sldr-bar" unselectable="on" draggable="false" ondragstart="return false"></div>'
            )
          )
        }

        var createInput = function createInput (id, val, type) {
          return Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360-sldr--'
              .concat(
                type,
                'w ss360-sldr-value-wrap ss360-flex"><input aria-label="Min Value" type="number" class="ss360-sldr--input-'
              )
              .concat(type, ' ss360-sldr-input" min="')
              .concat(min, '" max="')
              .concat(max, '" step="')
              .concat(Math.round(step * 100) / 100, '" value="')
              .concat(val, '" id="')
              .concat(id, '"></div>')
          )
        }

        var createUnit = function createUnit (type) {
          return unit !== undefined
            ? Object(sxQuery_sxQuery['a' /* default */])(
              '<span class="ss360-sldr--unit-'
                .concat(type, ' ss360-sldr-unit">')
                .concat(unit, '</span>')
            )
            : undefined
        }

        var lHandle = createHandle(lId, 'l')
        var rHandle = createHandle(rId, 'r')
        var emptyBar = createBar('e')
        var activeBar = createBar('a')
        var lInput = createInput(lId, min, 'l')
        var rInput = createInput(rId, max, 'r')
        var lUnit = createUnit('l')
        var rUnit = createUnit('r') // other

        var activeHandle = undefined
        var startX = undefined
        var fullWidth = undefined
        var dStep = undefined
        var isMounted = false
        var lBlurTime = 0
        var rBlurTime = 0 // api

        this.mount = function () {
          if (!isMounted) {
            wrapper.html('')
            wrapper
              .append(emptyBar)
              .append(activeBar)
              .append(lHandle)
              .append(rHandle)
              .append(lInput)
              .append(rInput)
          }

          if (unit !== undefined) {
            lInput.append(lUnit)
            rInput.append(rUnit)
          }

          var expectedNumberLength =
            max.toString().length +
            (Math.round(step) === step
              ? 0
              : Math.min(2, step.toString().split('.')[1].length))
          var inputWidth = Math.min(
            100,
            Math.min(50 + (expectedNumberLength - 3) * 10, 70)
          )

          if (expectedNumberLength > 3) {
            lInput.find('input').css('width', inputWidth)
            rInput.find('input').css('width', inputWidth)
            rInput.css('left', 'calc(100% - '.concat(inputWidth, 'px - 2px)'))
          }

          if (unit !== undefined) {
            lInput.find('input').css('borderTopRightRadius', '0')
            rInput.find('input').css('borderTopRightRadius', '0')
            lInput.find('input').css('borderBottomRightRadius', '0')
            rInput.find('input').css('borderBottomRightRadius', '0')
            var isLongUnit = unit.length > 3
            rInput.css(
              'left',
              'calc(100% - '
                .concat(inputWidth, 'px - ')
                .concat(isLongUnit ? 51 : 42, 'px)')
            )
          }

          if (drawHistogram && !isMounted) {
            var buckets = new Array(HISTOGRAM_BUCKET_COUNT)
            var bucketStep = (max - min) / (HISTOGRAM_BUCKET_COUNT - 1)
            Object.keys(valueDistribution).forEach(function (key) {
              var count = parseInt(valueDistribution[key])
              var dVal = parseFloat(key)
              var bucketIdx = Math.floor((dVal - min) / bucketStep)

              if (buckets[bucketIdx] === undefined) {
                buckets[bucketIdx] = 0
              }

              buckets[bucketIdx] += count
            })
            var maxBucketSize = buckets.reduce(function (acc, val) {
              return Math.max(acc, val)
            }, 0)
            var svgLines = buckets.reduce(function (acc, val, idx) {
              if (val !== undefined) {
                var x = idx * 2 + 1 + '%'
                var y1 = 100 - Math.round(val / maxBucketSize * 100) + '%'
                var y2 = '100%'
                acc.push(
                  '<line x1="'
                    .concat(x, '" x2="')
                    .concat(x, '" y1="')
                    .concat(y1, '" y2="')
                    .concat(y2, '" stroke="#aaaaaa" stroke-width="2%"/>')
                )
              }

              return acc
            }, [])
            wrapper.prepend(
              '<svg role="presentation" aria-label="Histogram" style="margin-left:15px; width: calc(100% - 30px)" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">'.concat(
                svgLines.join(''),
                '</svg>'
              )
            )
            wrapper.addClass('ss360-histogram')
          }

          updateFullWidth()
          setTimeout(updateFullWidth, 5)
          setTimeout(updateFullWidth, 200)

          if (!isMounted) {
            bindEventStart(lHandle, 'l')
            bindEventStart(rHandle, 'r')
            bindArrowKeys(lHandle, 'l')
            bindArrowKeys(rHandle, 'r')
            bindBarClicks()
            bindInputChanges()
            Object(sxQuery_sxQuery['a' /* default */])(window).on(
              'resize.ss360Slider',
              _this.mount.bind(_this)
            )
          }

          isMounted = true
        }

        this.setCurrentMin = function (min) {
          if (lVal < rVal) {
            lVal = min
            clamp(lVal)
          } else {
            rVal = min
            clamp(rVal)
          }

          updateAll()
        }

        this.setCurrentMax = function (max) {
          if (lVal > rVal) {
            lVal = max
            clamp(lVal)
          } else {
            rVal = max
            clamp(rVal)
          }

          updateAll()
        } // updaters

        var updateFullWidth = function updateFullWidth () {
          var fWidthCache = fullWidth
          var tempEmptyBar = wrapper.find('.ss360-sldr--e')
          fullWidth =
            tempEmptyBar.outerWidth() -
            parseInt(tempEmptyBar.css('padding-left')) -
            parseInt(tempEmptyBar.css('padding-right'))

          if (fWidthCache !== fullWidth) {
            var range = max - min
            var stepCount = range / step
            dStep = fullWidth / stepCount
            updateAll()
            activeHandle = 'r'
            updateHandlePosition()
            activeHandle = 'l'
            updateHandlePosition()
            activeHandle = undefined
          }
        }

        var updateValue = function updateValue (deltaX) {
          var diff = deltaX / dStep * step
          diff = diff - diff % step
          var updatedValue = clamp(valCache + diff)

          if (activeHandle === 'l') {
            lVal = updatedValue
          } else if (activeHandle === 'r') {
            rVal = updatedValue
          }

          updateAll()
        }

        var notificationTimeout = -1

        var notifyChangeThrotteled = function notifyChangeThrotteled () {
          clearTimeout(notificationTimeout)
          notificationTimeout = setTimeout(notifyChange, 600)
        }

        var notifyChange = function notifyChange () {
          clearTimeout(notificationTimeout)
          notificationTimeout = -1

          if (
            changeCallback !== undefined &&
            typeof changeCallback === 'function'
          ) {
            changeCallback.call(
              wrapper,
              Math.min(lVal, rVal),
              Math.max(lVal, rVal)
            )
          }
        }

        var updateAll = function updateAll () {
          updateHandlePosition()
          updateActiveBar()
          updateInputs()
        }

        var updateHandlePosition = function updateHandlePosition () {
          var aHandle =
            activeHandle === 'l'
              ? lHandle
              : activeHandle === 'r' ? rHandle : undefined
          var aVal =
            activeHandle === 'l'
              ? lVal
              : activeHandle === 'r' ? rVal : undefined

          if (aHandle === undefined || aVal === undefined) {
            return
          }

          var newPosition = getValuePositionInPx(aVal)
          aHandle.css('left', newPosition)
          aHandle.attr('aria-valuenow', aVal)
          lHandle.attr('aria-controls', lVal < rVal ? lId : rId)
          rHandle.attr('aria-controls', lVal < rVal ? rId : lId)
        }

        var updateActiveBar = function updateActiveBar () {
          var minVal = Math.min(lVal, rVal)
          var maxVal = Math.max(lVal, rVal)
          var minX = getValuePositionInPx(minVal)
          var maxX = getValuePositionInPx(maxVal)
          activeBar.css('width', Math.max(0, maxX - minX))
          activeBar.css('left', minX)
        }

        var updateInputs = function updateInputs () {
          var min = Math.min(lVal, rVal)
          var max = Math.max(lVal, rVal)
          lInput.find('input').val(Math.round(min * 100) / 100) // round to two decimals

          rInput.find('input').val(Math.round(max * 100) / 100)
        } // handlers

        var bindEventStart = function bindEventStart (handle, which) {
          handle.on('mousedown.ss360Slider', function (e) {
            if (e.which !== 1) {
              return
            } // e.preventDefault();

            e.stopPropagation()
            activeHandle = which
            valCache = which === 'l' ? lVal : rVal
            var mousePosition = getMousePosition(e)
            startX = mousePosition.x
            bindEventHandler('mousemove')
          })
          handle.on('touchstart.ss360Slider', function (e) {
            if (e.touches.length !== 1) {
              return
            }

            activeHandle = which
            valCache = which === 'l' ? lVal : rVal
            var touchPosition = getTouchPosition(e)
            startX = touchPosition.x
            bindEventHandler('touchmove')
            handle.addClass('ss360-focus')
          })
        }

        var bindArrowKeys = function bindArrowKeys (handle, which) {
          var downKeyCodes = [34, 37, 40]
          var upKeyCodes = [33, 38, 39]
          var downKeys = ['PageDown', 'ArrowLeft', 'ArrowDown']
          var upKeys = ['PageUp', 'ArrowRight', 'ArrowUp']
          handle.on('keydown', function (e) {
            var by = undefined

            if (
              downKeyCodes.indexOf(e.which) !== -1 ||
              downKeys.indexOf(e.key) !== -1 ||
              downKeys.indexOf(e.code) !== -1
            ) {
              by = step * -1
            } else if (
              upKeyCodes.indexOf(e.which) !== -1 ||
              upKeys.indexOf(e.key) !== -1 ||
              upKeys.indexOf(e.code) !== -1
            ) {
              by = step
            } else if (
              e.which === 36 ||
              e.key === 'Home' ||
              e.code === 'Home'
            ) {
              by = (max - min) * -1
            } else if (e.which === 35 || e.key === 'End' || e.code === 'End') {
              by = max - min
            }

            if (by !== undefined) {
              e.preventDefault()
              e.stopPropagation()

              if (which === 'l') {
                lVal = clamp(lVal + by)
              } else if (which === 'r') {
                rVal = clamp(rVal + by)
              }

              activeHandle = which
              updateAll()
              notifyChangeThrotteled()
              activeHandle = undefined
            }
          })
        }

        var bindInputChanges = function bindInputChanges () {
          lInput.find('input').on('change', inputChangeHandler.bind(_this, 'l'))
          rInput.find('input').on('change', inputChangeHandler.bind(_this, 'r'))
        }

        var inputChangeHandler = function inputChangeHandler (which, e) {
          var newValue = clamp(e.target.value)

          if (which === 'l') {
            if (lVal < rVal) {
              lVal = newValue
              which = 'l'
            } else {
              rVal = newValue
              which = 'r'
            }
          } else if (which === 'r') {
            if (lVal > rVal) {
              lVal = newValue
              which = 'l'
            } else {
              rVal = newValue
              which = 'r'
            }
          } // const toUpdate = which === "l" ? (lVal<rVal ? "lVal" : rVal) : (lVal < )
          // which === "l" ? lVal = newValue : (which === "r" ? rVal = newValue : 1===1);

          activeHandle = which
          updateHandlePosition()
          updateActiveBar()
          notifyChangeThrotteled()
          activeHandle = undefined // console.log(which, newValue);
        }

        var bindBarClicks = function bindBarClicks () {
          lHandle.on('blur', function () {
            lBlurTime = new Date().getTime()
          })
          rHandle.on('blur', function () {
            rBlurTime = new Date().getTime()
          })
          activeBar.on('click', barClickHandler)
          emptyBar.on('click', barClickHandler)
        }

        var barClickHandler = function barClickHandler (e) {
          var clickPosition = getMousePosition(e)
          var clickOfffset = clickPosition.x - emptyBar.offset().left
          var lValueOffset = getValuePositionInPx(lVal)
          var rValueOffset = getValuePositionInPx(rVal)
          var distanceToL = Math.abs(clickOfffset - lValueOffset)
          var distanceToR = Math.abs(clickOfffset - rValueOffset) // console.log(`Time elapsed since blur l=${new Date().getTime() - lBlurTime}; r=${new Date().getTime() - rBlurTime}.`)

          var curMs = new Date().getTime()
          var closerValue =
            distanceToL < distanceToR ? lValueOffset : rValueOffset
          var deltaX = clickOfffset - closerValue

          if (lBlurTime > curMs - 300) {
            activeHandle = 'l'
            valCache = lVal
            deltaX = (clickOfffset < lValueOffset ? -1 : 1) * distanceToL
          } else if (rBlurTime > curMs - 300) {
            activeHandle = 'r'
            valCache = rVal
            deltaX = (clickOfffset < rValueOffset ? -1 : 1) * distanceToR
          } else if (activeHandle === undefined || valCache === undefined) {
            activeHandle = distanceToL < distanceToR ? 'l' : 'r'
            valCache = activeHandle === 'l' ? lVal : rVal
          } // console.log(`Moving by ${deltaX}, targetValue=${closerValue}`);
          // console.log(`Distance to r=${distanceToR} and l=${distanceToL}; dx=${deltaX}.`);

          updateValue(deltaX)
          notifyChange()
          activeHandle = undefined
          valCache = undefined
        }

        var bindEventHandler = function bindEventHandler (type) {
          if (type === 'mousemove') {
            Object(sxQuery_sxQuery['a' /* default */])(window).on(
              'mousemove.ss360Slider',
              function (e) {
                e.preventDefault()
                e.stopPropagation()
                var mousePosition = getMousePosition(e)
                updateValue(mousePosition.x - startX)
              }
            )
            Object(sxQuery_sxQuery['a' /* default */])(window).on(
              'mouseup.ss360Slider',
              function (e) {
                e.preventDefault()
                e.stopPropagation()
                activeHandle = undefined
                valCache = undefined
                Object(sxQuery_sxQuery['a' /* default */])(window).off(
                  'mousemove.ss360Slider, mouseup.ss360Slider'
                )
                notifyChange()
              }
            )
          } else if (type === 'touchmove') {
            Object(sxQuery_sxQuery['a' /* default */])(window).on(
              'touchmove.ss360Slider',
              function (e) {
                if (e.touches.length !== 1) {
                  return
                }

                try {
                  e.preventDefault()
                } catch (ex) {}

                e.stopPropagation()
                var touchPosition = getTouchPosition(e)
                updateValue(touchPosition.x - startX)
              }
            )
            Object(sxQuery_sxQuery['a' /* default */])(window).on(
              'touchend.ss360Slider',
              function (e) {
                // e.preventDefault();
                e.stopPropagation()
                Object(sxQuery_sxQuery['a' /* default */])(window).off(
                  'touchend.ss360Slider, touchmove.ss360Slider'
                )
                lHandle.removeClass('ss360-focus')
                rHandle.removeClass('ss360-focus')
                activeHandle = undefined
                valCache = undefined
                notifyChange()
              }
            )
          }
        } // helpers

        var getMousePosition = function getMousePosition (event) {
          return {
            x: event.clientX,
            y: event.clientY
          }
        }

        var getTouchPosition = function getTouchPosition (event) {
          return {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
          }
        }

        var getValuePositionInPx = function getValuePositionInPx (value) {
          return (value - min) / step * dStep
        }

        var clamp = function clamp (value) {
          return Math.min(max, Math.max(min, value))
        }
      }

      /* harmony default export */ var components_RangeSlider = RangeSlider_RangeSlider
      // CONCATENATED MODULE: ./src/js/siteSearch/components/Filter.js

      function _toConsumableArray (arr) {
        return (
          _arrayWithoutHoles(arr) ||
          _iterableToArray(arr) ||
          _nonIterableSpread()
        )
      }

      function _nonIterableSpread () {
        throw new TypeError('Invalid attempt to spread non-iterable instance')
      }

      function _iterableToArray (iter) {
        if (
          Symbol.iterator in Object(iter) ||
          Object.prototype.toString.call(iter) === '[object Arguments]'
        ) {
          return Array.from(iter)
        }
      }

      function _arrayWithoutHoles (arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i]
          }
          return arr2
        }
      }

      var Filter_toggleGroup = function toggleGroup (key, wrapper, onExpand) {
        var wasActive = wrapper.hasClass('ss360-active')

        if (wasActive) {
          wrapper.find('.ss360-filter-content').css('opacity', '0')
          wrapper
            .find('.ss360-filter-btn i, .ss360-filter-btn')
            .removeClass('ss360-active')
          setTimeout(function () {
            wrapper.removeClass('ss360-active')
            wrapper.find('.ss360-filter-content').css('opacity', null)
          }, 300)
          window.ss360ActiveGroup = undefined
          Object(sxQuery_sxQuery['a' /* default */])(
            'body, .ss360-layer-content'
          ).off('click.ss360ToggleGroup')
          return
        }

        window.ss360ActiveGroup = key
        Object(sxQuery_sxQuery['a' /* default */])(
          'body, .ss360-layer-content'
        ).off('click.ss360ToggleGroup')
        var activeGroups = Object(sxQuery_sxQuery['a' /* default */])(
          '#ss360-filter .ss360-filter-group.ss360-active, .ss360-filter-btn.ss360-active'
        )
        wrapper.addClass('ss360-active')
        wrapper
          .find('.ss360-filter-btn i, .ss360-filter-btn')
          .addClass('ss360-active')

        if (activeGroups.length > 0) {
          activeGroups.removeClass('ss360-active')
          activeGroups.find('.ss360-filter-btn i').removeClass('ss360-active')
          activeGroups.find('.ss360-filter-content').css('opacity', null)
        } // else { //don't animate too much :)

        wrapper.find('.ss360-filter-content').css('opacity', '1') // }

        var contentLayer = wrapper.find('.ss360-filter-content')
        var layer = Object(sxQuery_sxQuery['a' /* default */])('#ss360-filter')
        var layerWidth =
          layer.outerWidth() -
          parseInt(layer.css('paddingRight').replace('px', '')) -
          parseInt(layer.css('paddingLeft').replace('px', ''))
        var offsetLeft = layer.offset().left - wrapper.offset().left
        var paddingLeft = parseInt(contentLayer.css('paddingLeft'))
        var paddingRight = parseInt(contentLayer.css('paddingRight'))
        contentLayer.css('width', layerWidth - paddingLeft - paddingRight)
        contentLayer.css('left', offsetLeft)
        Object(sxQuery_sxQuery['a' /* default */])(
          'body, .ss360-layer-content'
        ).on('click.ss360ToggleGroup', function (e) {
          if (
            Object(sxQuery_sxQuery['a' /* default */])(e.target).is(wrapper) ||
            Object(sxQuery_sxQuery['a' /* default */])(e.target).parents(
              '.ss360-filter-content'
            ).length > 0
          ) {
            return // self click
          }

          toggleGroup(key, wrapper, onExpand)
        })

        if (onExpand !== undefined && typeof onExpand === 'function') {
          onExpand()
        }

        wrapper.off('click.ss360PreventBubble')
        wrapper.on('click.ss360PreventBubble', function (e) {
          if (
            Object(sxQuery_sxQuery['a' /* default */])(e.target).parents(
              '.ss360-filter-content'
            ).length === 0
          ) {
            e.preventDefault()
            e.stopPropagation()
          }
        })
      }

      var Filter_FilterGroupBuilder = function FilterGroupBuilder (
        position,
        onExpand,
        onChange
      ) {
        var createWrapper = function createWrapper (key, label, type) {
          var filterId = 'ss360-filter-' + utils_StringHelper.getSafeKey(key)
          var shouldShow =
            position === 'left' && window.ss360CFG.indexOf(key) === -1
          var wrapper = Object(sxQuery_sxQuery['a' /* default */])(
            '<section  id="'
              .concat(filterId, '" class="ss360-filter-group ss360-')
              .concat(type, '-filter ')
              .concat(shouldShow ? 'ss360-active' : '', '" aria-label="')
              .concat(label, '"></section>')
          )
          var icon = '<i class="'.concat(
            shouldShow ? 'ss360-active' : '',
            '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></i>'
          )
          wrapper.append(
            '<button class="ss360-filter-btn ss360-flex ss360-flex--align-center ss360-flex--justify-center">'
              .concat(label)
              .concat(icon, '</button>')
          )
          wrapper.append(
            '<div class="ss360-filter-content ss360-flex ss360-flex--align-center ss360-flex--justify-center"></div>'
          )
          var skipButton = Object(sxQuery_sxQuery['a' /* default */])(
            '<button class="ss360-skip-link">Skip Filter Group</button>'
          )
          skipButton.on('click', function (e) {
            var groupParent = e.target.parentNode.parentNode

            if (groupParent.nextSibling === null) {
              Object(sxQuery_sxQuery['a' /* default */])(
                '.ss360-suggests:first header a'
              ).focus()
            } else {
              Object(sxQuery_sxQuery['a' /* default */])(
                groupParent.nextSibling
              )
                .find('.ss360-filter-btn')
                .focus()
            }
          })
          wrapper.find('.ss360-filter-content').append(skipButton)

          if (position === 'top') {
            wrapper.find('.ss360-filter-btn').on('click', function (e) {
              e.preventDefault()
              e.stopPropagation()
              Filter_toggleGroup(key, wrapper, onExpand) // const layerWidth = sxQuery($0).outerWidth();
            }) // wrapper.append(toggleButton);
          } else if (position === 'left') {
            var disableKeyboardActions = function disableKeyboardActions () {
              wrapper
                .find('button:not(.ss360-filter-btn), input')
                .attr('tabindex', '-1')
              wrapper.find("div[tabindex='0']").attr('tabindex', '-1')
            }

            var enableKeyboardActions = function enableKeyboardActions () {
              wrapper
                .find('button:not(.ss360-filter-btn), input')
                .attr('tabindex', null)
              wrapper.find("div[tabindex='-1']").attr('tabindex', '0')
            }

            if (!shouldShow) {
              disableKeyboardActions()
              var fc = wrapper.find('.ss360-filter-content')
              fc.css('height', 0)
              fc.data('heightcache', 'auto')
            }

            wrapper
              .find(
                '.ss360-filter-group:not(.ss360-active) .ss360-filter-content'
              )
              .attr('aria-hidden', 'true')
            wrapper
              .find('.ss360-filter-group.ss360-active .ss360-filter-content')
              .attr('aria-hidden', 'false')
            wrapper.find('.ss360-filter-btn').on('click', function (e) {
              e.preventDefault()
              e.stopPropagation()
              var cb = wrapper.find('.ss360-filter-content')

              if (wrapper.hasClass('ss360-active')) {
                // hide
                wrapper.removeClass('ss360-active')
                wrapper.find('.ss360-filter-btn i').removeClass('ss360-active')
                var outerHeight = cb.outerHeight()

                if (cb.data('heightcache') === undefined) {
                  // don't cache if the animation wasn't completed
                  cb.data('heightcache', outerHeight)
                }

                cb.css('height', outerHeight)
                cb.attr('aria-hidden', 'true')
                setTimeout(function () {
                  cb.css('height', 0)
                }, 0)
                window.ss360CFG.push(key)
                disableKeyboardActions()
              } else {
                // show
                wrapper.addClass('ss360-active')
                wrapper.find('.ss360-filter-btn i').addClass('ss360-active')
                cb.attr('aria-hidden', 'false')
                cb.css('height', cb.data('heightcache'))
                setTimeout(function () {
                  cb.css('height', 'auto')
                  cb.data('heightcache', null)
                }, 300)

                if (window.ss360CFG.indexOf(key) !== -1) {
                  window.ss360CFG.splice(window.ss360CFG.indexOf(key), 1)
                }

                enableKeyboardActions()
              }
            })
          }

          return wrapper
        }

        var MultipleChoiceFilter = function MultipleChoiceFilter (
          key,
          label,
          options,
          activeOptions,
          counts,
          showCounts,
          position
        ) {
          activeOptions = activeOptions || []
          var wrapper = createWrapper(key, label, 'multiselect')
          var inputWrapper = Object(sxQuery_sxQuery['a' /* default */])(
            '<fieldset></fieldset>'
          )
          var checkboxWrapper = Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360-flex '.concat(
              position === 'left'
                ? 'ss360-flex--nowrap ss360-flex--column'
                : 'ss360-flex--wrap',
              '"></div>'
            )
          )
          var selectedValues = activeOptions || []
          var hasLongName = false
          options.forEach(function (option) {
            var id = 'ss360-checkbox-' + Math.round(10000 * Math.random())
            var checkerRow = Object(sxQuery_sxQuery['a' /* default */])(
              '<div class="ss360-checker-row ss360-flex ss360-flex--align-center"><input id="'
                .concat(id, '" type="checkbox" value="')
                .concat(option, '" ')
                .concat(
                  selectedValues.indexOf(option) !== -1 ? 'checked' : '',
                  '/><label for="'
                )
                .concat(id, '"  title="')
                .concat(
                  option,
                  '" class="ss360-flex ss360-flex--align-center"><span role="presentation" aria-controls="'
                )
                .concat(id, '" class="checkmark"></span>')
                .concat(option, '</label></div>')
            )

            if (showCounts && counts[option] !== undefined) {
              checkerRow
                .find('label')
                .append(
                  '<span class="ss360-filter--count">('.concat(
                    counts[option],
                    ')</span>'
                  )
                )
            }

            checkboxWrapper.append(checkerRow)
            hasLongName = hasLongName || option.length > 14
          })

          if (hasLongName) {
            inputWrapper.addClass('ss360--long')
          }

          inputWrapper.append(checkboxWrapper)
          wrapper.find('.ss360-filter-content').append(inputWrapper)
          wrapper.find('input').on('change', function (e) {
            var idx = selectedValues.indexOf(e.target.value)

            if (e.target.checked && idx === -1) {
              selectedValues.push(e.target.value)
            } else if (!e.target.checked && idx !== -1) {
              selectedValues.splice(idx, 1)
            }

            if (onChange !== undefined && typeof onChange === 'function') {
              onChange(key || label, selectedValues)
            }
          })

          this.append = function (filterLayer) {
            filterLayer.append(wrapper)
          }

          this.mount = function () {
            // just a dummy
          }
        }

        var RangeFilter = function RangeFilter (
          key,
          label,
          min,
          max,
          step,
          unit,
          activeValues,
          counts,
          showCounts
        ) {
          var wrapper = createWrapper(key, label, 'range')
          var sliderWrapper = Object(sxQuery_sxQuery['a' /* default */])(
            '<div class="ss360-slider-wrapper"></div>'
          )
          var minCache = activeValues !== undefined ? activeValues['min'] : min
          var maxCache = activeValues !== undefined ? activeValues['max'] : max
          wrapper.find('.ss360-filter-content').append(sliderWrapper)
          var slider = new components_RangeSlider(
            sliderWrapper,
            {
              min: min,
              max: max,
              step: step,
              unit: unit,
              drawHistogram: showCounts
            },
            counts,
            function (newMin, newMax) {
              if (minCache !== newMin || maxCache !== newMax) {
                minCache = newMin
                maxCache = newMax

                if (onChange !== undefined && typeof onChange === 'function') {
                  var obj =
                    min === newMin && max === newMax
                      ? undefined
                      : {
                        min: newMin,
                        max: newMax
                      } // empty object to notify that we can ignore this filter

                  onChange(key || label, obj)
                }
              }
            }
          )

          if (activeValues !== undefined) {
            slider.setCurrentMin(Math.max(activeValues.min, min))
            slider.setCurrentMax(Math.min(activeValues.max, max))
          }

          this.append = function (filterLayer) {
            filterLayer.append(wrapper)
          }

          this.mount = function () {
            slider.mount()
          }
        }

        this.multipleChoice = function (
          key,
          label,
          options,
          activeOptions,
          counts,
          showCounts
        ) {
          return new MultipleChoiceFilter(
            key,
            label,
            options,
            activeOptions,
            counts,
            showCounts,
            position
          )
        }

        this.range = function (
          key,
          label,
          min,
          max,
          step,
          unit,
          activeValues,
          counts,
          showCounts
        ) {
          return new RangeFilter(
            key,
            label,
            min,
            max,
            step,
            unit,
            activeValues,
            counts,
            showCounts
          )
        }
      }

      var Filter_Filter = function Filter (
        filterConfig,
        filterGroups,
        activeOptions,
        query,
        onChange,
        totalResults
      ) {
        if (!('ss360CFG' in window)) {
          window.ss360CFG = []
        }

        var position = filterConfig.position
        var activeFilter = (activeOptions || []).reduce(function (acc, obj) {
          var key = Object.keys(obj)[0]
          acc[key] = obj[key]
          return acc
        }, {})
        var filterLayer = Object(sxQuery_sxQuery['a' /* default */])(
          '<section id="ss360-filter" class="ss360-flex ss360-flex--wrap" role="search" aria-label="'.concat(
            filterConfig.label,
            '"></section>'
          )
        )

        if (position === 'left') {
          var hl = filterConfig['headingLevel']
          filterLayer.append(
            '<button id="ss360CloseFilterButton" aria-label="Close Filter" title="Close Filter" class="ss360-close-button"></button>'
          )
          filterLayer.append(
            '<h'
              .concat(hl, ' class="ss360-filter-heading">')
              .concat(filterConfig.label, '</h')
              .concat(hl, '>')
          )
        }

        var filters = []
        var keyToName = filterGroups.reduce(function (acc, filterGroup) {
          acc[filterGroup.key] = filterGroup.name
          return acc
        }, {})

        var changeHandler = function changeHandler (key, val) {
          activeFilter[key] = val

          if (val === undefined || val.length === 0) {
            delete activeFilter[key]
          }

          if ('SS360Insights' in window) {
            var data =
              key +
              '<#>' +
              keyToName[key] +
              '=>' +
              (activeFilter[key] !== undefined
                ? JSON.stringify(activeFilter[key])
                : '--')
            window.SS360Insights.trackFilterInteraction(
              query,
              Object(sxQuery_sxQuery['a' /* default */])(
                '#ss360-filter'
              ).get()[0],
              data
            )
          }

          if (onChange === undefined || typeof onChange !== 'function') {
            return
          }

          onChange(activeFilter)
          Object(sxQuery_sxQuery['a' /* default */])(window).off(
            'resize.ss360FilterResize'
          )
        }

        var getSetting = function getSetting (filterGroup) {
          return (
            filterConfig['settings'][filterGroup.name] ||
            filterConfig['settings'][filterGroup.key] ||
            {}
          )
        }

        var expandHandler = function expandHandler () {
          filters.forEach(function (filter) {
            return filter.mount()
          })
        }

        var builder = new Filter_FilterGroupBuilder(
          position,
          expandHandler,
          changeHandler
        )

        for (
          var i = 0;
          i < (filterConfig.limit || 9999) && i < filterGroups.length;
          i++
        ) {
          var filterGroup = filterGroups[i]
          var singleFilterConfig = getSetting(filterGroup)

          if ('min' in filterGroup) {
            if (filterGroup.min === filterGroup.max) {
              continue
            }

            filters.push(
              builder.range(
                filterGroup.key,
                filterGroup.name,
                filterGroup.min,
                filterGroup.max,
                singleFilterConfig['step'],
                singleFilterConfig['unit'],
                activeFilter[filterGroup.key],
                filterGroup.counts || {},
                singleFilterConfig['drawHistogram'] !== undefined
                  ? singleFilterConfig['drawHistogram']
                  : true
              )
            )
          } else {
            if (filterGroup.values.length === 0) {
              continue
            }

            if (
              filterGroup.values.length === 1 &&
              (filterGroup.counts || {})[filterGroup.values[0]] === totalResults
            ) {
              // don't show this group, if there is only one option which is available for all results
              continue
            }

            filters.push(
              builder.multipleChoice(
                filterGroup.key,
                filterGroup.name,
                filterGroup.values,
                activeFilter[filterGroup.key],
                filterGroup.counts || {},
                filterConfig['showCounts']
              )
            )
          }
        }

        var firstGroup = Object(sxQuery_sxQuery['a' /* default */])(
          '#ss360-layer .ss360-group, #ss360-no-results'
        )
        var showMobileButton =
          position === 'left'
            ? Object(sxQuery_sxQuery['a' /* default */])(
              '<button class="ss360-show-mobile-filter" aria-label="Show Filter" title="Show Filter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg></button>'
            )
            : undefined
        var mobileBackdrop =
          position === 'left'
            ? Object(sxQuery_sxQuery['a' /* default */])(
              '<div class="ss360-filter-backdrop" role="presentation"></div>'
            )
            : undefined

        var showMobile = function showMobile () {
          filterLayer.css('display', 'block')
          expandHandler()
          setTimeout(function () {
            filterLayer.addClass('ss360-open')
            mobileBackdrop.addClass('ss360-open')
          }, 0)
          window.ss360AreMobileSuggestsOpen = true
        }

        var hideMobile = function hideMobile () {
          filterLayer.removeClass('ss360-open')
          mobileBackdrop.removeClass('ss360-open')
          window.ss360AreMobileSuggestsOpen = false
          setTimeout(function () {
            filterLayer.css('display', null)
          }, 300)
        }

        if (window.ss360AreMobileSuggestsOpen === true) {
          filterLayer.css('transitionDuration', '0s')
          showMobile()
          setTimeout(function () {
            filterLayer.css('transitionDuration', null)
          }, 300)
        }

        if (position === 'left') {
          showMobileButton.on('click', showMobile)
          mobileBackdrop.on('click', function (e) {
            e.preventDefault()
            e.stopPropagation()
            hideMobile()
          })
          filterLayer.find('.ss360-close-button').on('click', hideMobile)
          var skipFilterButton = Object(sxQuery_sxQuery['a' /* default */])(
            '<button class="ss360-skip-link">Skip Filter</button>'
          )
          skipFilterButton.on('click', function () {
            Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-suggests:first header a'
            ).focus()
          })
          filterLayer.prepend(skipFilterButton)
        }

        if (firstGroup.length > 0) {
          var firstGroupNode = firstGroup.get()[0]

          if (showMobileButton !== undefined) {
            firstGroupNode.parentNode.insertBefore(
              mobileBackdrop.get()[0],
              firstGroupNode
            )
            firstGroupNode.parentNode.insertBefore(
              showMobileButton.get()[0],
              firstGroupNode
            )
          }

          firstGroupNode.parentNode.insertBefore(
            filterLayer.get()[0],
            firstGroupNode
          )
        } else {
          if (showMobileButton !== undefined) {
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer').append(
              mobileBackdrop
            )
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer').append(
              showMobileButton
            )
          }

          Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer').append(
            filterLayer
          )
        }

        if (showMobileButton !== undefined) {
          var repositionMobileButton = function repositionMobileButton () {
            var mobileButtonHeight =
              parseInt(showMobileButton.css('height')) +
              parseInt(showMobileButton.css('paddingBottom')) +
              parseInt(showMobileButton.css('paddingTop'))
            var headingHeight = Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-search-result-heading'
            ).outerHeight()

            if (headingHeight && headingHeight > mobileButtonHeight) {
              showMobileButton.css(
                'top',
                (headingHeight - mobileButtonHeight) / 2
              )
            } else {
              showMobileButton.css('top', 0)
            }
          }

          repositionMobileButton()
          setTimeout(repositionMobileButton, 200)
          Object(sxQuery_sxQuery['a' /* default */])(window).on(
            'resize.ss360FilterResize',
            repositionMobileButton
          )
        }

        filters.forEach(function (filter) {
          filter.append(filterLayer)
        })
        filters.forEach(function (filter) {
          return filter.mount()
        })

        if (position !== 'left' && window.ss360ActiveGroup !== undefined) {
          var activeGroupNode = Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-filter-'.concat(
              utils_StringHelper.getSafeKey(window.ss360ActiveGroup)
            )
          )

          if (activeGroupNode.length > 0) {
            Filter_toggleGroup(
              window.ss360ActiveGroup,
              activeGroupNode,
              expandHandler
            )
          }
        }

        if (position === 'left') {
          var layerContent = Object(sxQuery_sxQuery['a' /* default */])(
            '.ss360-layer-content'
          )
          layerContent.addClass(
            'ss360-filter--left ss360-flex ss360-flex--wrap'
          )
          layerContent.append(
            "<div id='ss360-filtered-results' class='ss360-flex ss360-flex--column'></div>"
          )
          layerContent
            .find('#ss360-filtered-results')
            .append(Object(sxQuery_sxQuery['a' /* default */])('.ss360-group'))
          filterLayer.addClass('ss360-flex--column ss360-flex--nowrap')
        }

        if (filterConfig.showQuickDelete && activeOptions.length > 0) {
          var quickDeleteBar = Object(sxQuery_sxQuery['a' /* default */])(
            '<section role="search" aria-label="Selected Filter Options" class="ss360-delete-filter-bar ss360-flex ss360-flex--wrap ss360-flex--align-center"></section>'
          )
          quickDeleteBar.append(
            '<button aria-label="'
              .concat(
                filterConfig.deleteAllLabel,
                '" class="ss360-filter--delete-all ss360-flex ss360-flex--align-center">'
              )
              .concat(filterConfig.deleteAllLabel, '</button>')
          )
          activeOptions.forEach(function (activeOption) {
            var afkey = Object.keys(activeOption)[0]
            var afname = keyToName[afkey]

            if (afname === undefined) {
              // the view name is not available (probably unselecting the option wouldn't influence the result set) --> ignore
              return
            }

            if (
              activeOption[afkey].min !== undefined &&
              !isNaN(parseFloat(activeOption[afkey].min))
            ) {
              var tempObj = {
                name: afname,
                key: afkey
              }
              var afunit =
                getSetting(tempObj).unit !== undefined
                  ? ' ' + getSetting(tempObj).unit
                  : ''
              var minVal = activeOption[afkey].min
              var maxVal = activeOption[afkey].max
              var afmin =
                minVal.toFixed(minVal === Math.round(minVal) ? 0 : 2) + afunit
              var afmax =
                maxVal.toFixed(maxVal === Math.round(maxVal) ? 0 : 2) + afunit
              quickDeleteBar.append(
                '<button data-key="'
                  .concat(afkey, '" aria-label="Clear ')
                  .concat(
                    afname,
                    ' filter" class="ss360-flex ss360-flex--align-center"><strong>'
                  )
                  .concat(afname, ':</strong><span>&nbsp;')
                  .concat(afmin, ' - ')
                  .concat(afmax, '</span><i>&times;</i></button>')
              )
            } else {
              activeOption[afkey].forEach(function (afval) {
                quickDeleteBar.append(
                  '<button data-key="'
                    .concat(afkey, '" data-value="')
                    .concat(afval, '" aria-label="Clear ')
                    .concat(afval, ' filter option of ')
                    .concat(
                      afname,
                      '" class="ss360-flex ss360-flex--align-center"><strong>'
                    )
                    .concat(afname, ':</strong><span>&nbsp;')
                    .concat(afval, '</span><i>&times;</i></button>')
                )
              })
            }
          })
          quickDeleteBar.find('button').on('click', function (e) {
            var $btn =
              e.target.nodeName === 'BUTTON'
                ? Object(sxQuery_sxQuery['a' /* default */])(e.target)
                : Object(sxQuery_sxQuery['a' /* default */])(
                  Object(sxQuery_sxQuery['a' /* default */])(
                    e.target
                  ).parents('button')[0]
                )
            var dkey = $btn.data('key')
            var dval = $btn.data('value')
            $btn.fadeOut()

            if (dkey === undefined) {
              quickDeleteBar.find('button').fadeOut()
              Object.keys(activeFilter).forEach(function (key) {
                delete activeFilter[key]
              })
              changeHandler(0, undefined) // delete all filter
            } else if (dval === undefined) {
              changeHandler(dkey, undefined) // remove range filter
            } else {
              var vcopy = _toConsumableArray(activeFilter[dkey])

              if (vcopy.indexOf(dval) !== -1) {
                vcopy.splice(vcopy.indexOf(dval), 1)
              }

              changeHandler(dkey, vcopy) // remove multiselect filter
            }
          })
          var wrpr = Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-layer .ss360-layer-content'
          ).get()[0]
          var prevSibling =
            position === 'left'
              ? Object(sxQuery_sxQuery['a' /* default */])(
                '#ss360-search-result-heading'
              ).get()[0]
              : Object(sxQuery_sxQuery['a' /* default */])(
                '#ss360-filter'
              ).get()[0]

          if (prevSibling.nextElementSibling !== null) {
            wrpr.insertBefore(
              quickDeleteBar.get()[0],
              prevSibling.nextElementSibling
            )
          } else {
            Object(sxQuery_sxQuery['a' /* default */])(wrpr).append(
              quickDeleteBar
            )
          }
        }
      }

      /* harmony default export */ var components_Filter = Filter_Filter
      // CONCATENATED MODULE: ./src/js/siteSearch/core.js

      var core_SiteSearch360Core = function SiteSearch360Core (ss360Settings) {
        var _this = this

        var siteId = ss360Settings['siteId'] || document.location.host

        var getSearchResultType = function getSearchResultType () {
          return ss360Settings['results']['fullScreenConfig'] !== undefined &&
            ss360Settings['results']['fullScreenConfig']['trigger'] !==
              undefined
            ? 'fullscreen'
            : ss360Settings['results']['embedConfig'] !== undefined
              ? 'embed'
              : 'layover'
        }

        var searchResultType = getSearchResultType()
        var searchBoxSelector = ss360Settings['searchBox']['selector']
        var layoverTrigger = ss360Settings['results']['layoverTrigger'] // accessibility

        var captionHeadingLevel = Math.max(
          1,
          parseInt(ss360Settings.accessibility.resultTopHeadingLevel) || 2
        )
        var contentGroupHeadingLevel = captionHeadingLevel + 1
        var searchResultHeadingLevel = contentGroupHeadingLevel + 1
        var searchResultConfig
        var searchBoxes = []
        var selectedSearchBox
        var suggestionUrl
        var tracking =
          ss360Settings.tracking.logQueries &&
          sxQuery_sxQuery['a' /* default */].readCookie('ss360-tracking') != '0'
        reporter_Reporter.setTracking(tracking)

        if (ss360Settings['tracking']['enhanced']) {
          window.SS360Insights = new insights(
            siteId,
            ss360Settings['allowCookies']
          )
          Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).focus(
            function (e) {
              window.SS360Insights.trackSearchBoxFocus(e.target)
            }
          )
        }

        var successInit = undefined
        var fullScreenOpen = false
        reporter_Reporter.setSiteId(siteId)
        var hiddenParts = ui_UiHelper.getHiddenParts(
          ss360Settings.layout.mobile,
          ss360Settings.layout.desktop
        )

        var createUiBuilder = function createUiBuilder () {
          return new ui_UiBuilder(
            captionHeadingLevel,
            searchResultHeadingLevel,
            contentGroupHeadingLevel,
            hiddenParts,
            ss360Settings.results.linksOpenNewTab,
            ss360Settings.results.collapseDataPoints,
            ss360Settings.dataPoints.exclude,
            ss360Settings.dataPoints.single,
            ss360Settings.results.group,
            searchResultType,
            ss360Settings.allowCookies,
            ss360Settings.results.stripHttp
          )
        }

        var uiBuilder = createUiBuilder() // store timestamp (in ms) of last search button click

        var lastSearchButtonClickTime = -1
        var autoBlurTime = -1
        var lastSearchTerm = ''
        var areResultsVisible = false
        var is404 = false

        var updateConfig = function updateConfig (key, value) {
          configuration_ConfigurationHelper.updateConfig(
            ss360Settings,
            key,
            value
          )

          if (key == 'siteId') {
            setSiteId(value)
          } else if (key == 'results.embedConfig') {
            searchResultConfig = value
          } else if (key == 'results.fullscreenConfig.caption') {
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-search-console > h' + captionHeadingLevel
            ).html(value)
          } else if (key == 'searchBox.placeholder') {
            Object(sxQuery_sxQuery['a' /* default */])('#ss360-query').attr(
              'placeholder',
              value
            )
          } else if (key.indexOf('contentGroups.') === 0) {
            updateSuggestionUrl(buildSuggestionUrl())
          }

          searchResultType = getSearchResultType()

          if (key.indexOf('layout') !== -1) {
            hiddenParts = ui_UiHelper.getHiddenParts(
              ss360Settings.layout.mobile,
              ss360Settings.layout.desktop
            )
          }

          if (key.indexOf('layout') !== -1 || key.indexOf('results') !== -1) {
            uiBuilder = createUiBuilder()
          }
        }

        var setSiteId = function setSiteId (newSiteId) {
          reporter_Reporter.setSiteId(newSiteId)

          if (suggestionUrl != undefined) {
            updateSuggestionUrl(
              suggestionUrl.replace('site=' + siteId, 'site=' + newSiteId)
            )
          }

          siteId = newSiteId
          ss360Settings['siteId'] = siteId

          if (window.SS360Insights !== undefined) {
            window.SS360Insights = new insights(
              siteId,
              ss360Settings['allowCookies']
            )
          }
        }

        var updateSuggestionUrl = function updateSuggestionUrl (newUrl) {
          suggestionUrl = newUrl

          for (var i = 0; i < searchBoxes.length; i++) {
            searchBoxes[i].updateSuggestUrl(newUrl)
          }
        }

        var buildSuggestionUrl = function buildSuggestionUrl () {
          return api_UrlBuilder.buildSuggestionUrl(
            siteId,
            ss360Settings['suggestions']['show'],
            ss360Settings['suggestions']['num'],
            ss360Settings['suggestions']['equalSearch'],
            ss360Settings['contentGroups']['include'],
            ss360Settings['contentGroups']['exclude'],
            ss360Settings['results']['group'],
            ss360Settings['suggestions']['maxQuerySuggestions']
          )
        }

        var buildQueryUrl = function buildQueryUrl (
          siteId,
          limit,
          sort,
          include,
          exclude,
          tracking,
          selectedText,
          offset,
          limitPerGroup,
          filters
        ) {
          return api_UrlBuilder.buildQueryUrl(
            siteId,
            limit,
            sort,
            include,
            exclude,
            tracking,
            selectedText,
            offset,
            limitPerGroup,
            ss360Settings['results']['group'],
            ss360Settings['results']['highlightQueryTerms'],
            ss360Settings['callbacks']['searchResult'],
            filters || ss360Settings['results']['filters'],
            reporter_Reporter,
            ss360Settings['filters']['enabled']
          )
        }

        var prepareLayoverLayer = function prepareLayoverLayer (layer) {
          Object(sxQuery_sxQuery['a' /* default */])('#ss360Darken').remove()
          layer.addClass('ss360-overlay')
          layer.fadeIn()
          layer.scrollTop(0)
          layer.removeClass('ss360-animated ss360-bo')
          layer.addClass('ss360-animated ss360-fid') // darken background

          var darkBg = Object(sxQuery_sxQuery['a' /* default */])(
            '<div id="ss360Darken"></div>'
          )
          Object(sxQuery_sxQuery['a' /* default */])('body').append(darkBg) // add close layer button

          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360CloseLayerButton'
          ).remove()
          uiBuilder.prependCloseButton(layer) // attach event handler

          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360CloseLayerButton'
          ).click(_this.closeLayer)
          var $window = Object(sxQuery_sxQuery['a' /* default */])(window)
          $window.off('resize.ss360Resize')
          $window.on('resize', ui_Handlers.layoverResize)
          ui_Handlers.layoverResize() // prevent scrolling the whole when search results are focused by keyboard

          layer.off('scroll.ss360Scroll')
          layer.on('scroll.ss360Scroll', ui_Handlers.layoverScroll)
        }

        var addSearchFieldToLayover = function addSearchFieldToLayover (
          layer,
          lastSearchTerm
        ) {
          var ss360SearchWrapper = uiBuilder.buildLayoverSearchField(
            ss360Settings['accessibility']['searchFieldLabel'],
            searchBoxSelector,
            ss360Settings['searchBox']['placeholder'],
            lastSearchTerm,
            ss360Settings['callbacks']['enter']
          )

          if (ss360Settings['voiceSearch']['enabled'] === true) {
            new components_VoiceSearch(
              ss360SearchWrapper.find('#ss360-custom-searchbox'),
              ss360Settings['voiceSearch']['lang'],
              _this.showResults
            )
          }

          layer.append(ss360SearchWrapper)
        }
        /* API */

        this.VERSION = '12.1.49'

        this.isInitialized = function () {
          return successInit !== undefined && successInit
        }

        this.changeConfig = updateConfig
        this.setSiteId = setSiteId
        this.buildQueryUrl = buildQueryUrl

        this.showFullscreenLayer = function (event) {
          if (event != undefined) {
            event.stopPropagation()
          }

          fullScreenOpen = true
          ui_UiHelper.showFullscreenLayer(
            ss360Settings['searchBox']['selector'],
            ss360Settings['style']['animationSpeed']
          )
        }

        this.closeLayer = function () {
          var wereResultsVisible = areResultsVisible
          areResultsVisible = false

          if (wereResultsVisible) {
            Object(sxQuery_sxQuery['a' /* default */])(window).off(
              'beforeunload.ss360Insights'
            )

            if ('SS360Insights' in window) {
              var allItems = Object(sxQuery_sxQuery['a' /* default */])(
                '.ss360-suggests:not(.ss360-hidden)'
              ).get()
              window.SS360Insights.trackSerpLeave(
                Object(sxQuery_sxQuery['a' /* default */])(
                  '.ss360-layer-content'
                ).get()[0],
                allItems[0],
                lastSearchTerm,
                allItems.length,
                Object(sxQuery_sxQuery['a' /* default */])('#ss360-404-layer')
                  .length > 0
                  ? 'smart404'
                  : searchResultType
              )
            }
          } // fullscreen mode?

          if (searchResultType === 'fullscreen' && fullScreenOpen) {
            fullScreenOpen = false
            ui_UiHelper.hideFullscreenLayer(
              ss360Settings['style']['animationSpeed']
            )
            utils_NavigatorHelper.removeSearchQueryParam(
              ss360Settings['results']['searchQueryParamName']
            )
          } else if (searchResultType === 'layover') {
            ui_UiHelper.hideLayoverLayer(function () {
              Object(sxQuery_sxQuery['a' /* default */])(
                '#ss360-layer'
              ).fadeOut()
            })
            utils_NavigatorHelper.removeSearchQueryParam(
              ss360Settings['results']['searchQueryParamName']
            )

            if (ss360Settings['filters']['enabled']) {
              utils_NavigatorHelper.removeSearchQueryParam('ss360Filter')
            }
          }

          if (ss360Settings['callbacks']['closeLayer'] != undefined) {
            ss360Settings['callbacks']['closeLayer'].call(_this)
          }
        }

        this.init = function () {
          var self = _this
          successInit = true // initialize search console for full screen mode

          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-search-console'
          ).remove()

          if (searchResultType === 'fullscreen') {
            ss360Settings['searchBox']['selector'] = '#ss360-query'
            searchBoxSelector = '#ss360-query'
            ss360Settings['results']['embedConfig'] = {
              contentBlock: '#ss360-results'
            }
            uiBuilder.appendSearchConsole(
              ss360Settings['results']['fullScreenConfig']['caption']
            ) // attach event handler

            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360CloseLayerButton'
            ).click(_this.closeLayer)
            Object(sxQuery_sxQuery['a' /* default */])(
              ss360Settings['results']['fullScreenConfig']['trigger']
            ).click(function (event) {
              self.showFullscreenLayer(event)
            })
          }

          if (searchResultType === 'layover' && layoverTrigger !== undefined) {
            Object(sxQuery_sxQuery['a' /* default */])(layoverTrigger).on(
              'click',
              function (e) {
                e.preventDefault()
                e.stopPropagation()
                var layer = Object(sxQuery_sxQuery['a' /* default */])(
                  '#ss360-layer'
                )
                layer.html('')
                prepareLayoverLayer(layer)
                addSearchFieldToLayover(layer, '')
              }
            )
          } // initialize uniboxes

          var uniboxes = Object(sxQuery_sxQuery['a' /* default */])(
            searchBoxSelector
          ).unibox(ss360Settings)

          if (uniboxes instanceof Array) {
            searchBoxes = uniboxes
          } else {
            searchBoxes = searchBoxes.concat(uniboxes)
          }

          updateSuggestionUrl(buildSuggestionUrl()) // attach search to buttons?

          if (ss360Settings['searchBox']['searchButton'] != undefined) {
            Object(sxQuery_sxQuery['a' /* default */])(
              ss360Settings['searchBox']['searchButton']
            ).click(function (event) {
              lastSearchButtonClickTime = new Date().getTime()
              var relevantSearchBox = searchBoxes[0]

              if (searchBoxes.length > 1 && selectedSearchBox !== undefined) {
                relevantSearchBox =
                  searchBoxes.reduce(function (acc, sb) {
                    if (acc !== undefined) {
                      return acc
                    }

                    if (
                      sb.getSearchBox().get()[0] === selectedSearchBox.get()[0]
                    ) {
                      return sb
                    }

                    return undefined
                  }, undefined) || searchBoxes[0]
              }

              ui_Handlers.onSearchButtonClick.call(
                this,
                event,
                relevantSearchBox,
                ss360Settings['callbacks']['enter']
              )
            })
          } // handle autofocus

          if (ss360Settings['searchBox']['autofocus']) {
            setTimeout(function () {
              Object(sxQuery_sxQuery['a' /* default */])(
                searchBoxSelector
              ).focus()
            }, 200)
          } // add the search layer

          Object(sxQuery_sxQuery['a' /* default */])('#ss360-layer').remove()
          var layer = uiBuilder.buildLayer(
            ss360Settings.accessibility.isMainContent
          )
          var htmlBody = Object(sxQuery_sxQuery['a' /* default */])('body')
          htmlBody.append(layer) // click handlers to close search layer

          htmlBody.keydown(function (e) {
            ui_Handlers.onBodyKeyDown(
              e,
              areResultsVisible,
              fullScreenOpen,
              searchResultType
            )
          })
          htmlBody.click(function (e) {
            ui_Handlers.onBodyClick(e, searchBoxSelector)
          })
          Object(sxQuery_sxQuery['a' /* default */])(
            '#ss360-layer, #ss360-search-console'
          ).click(function (event) {
            event.stopPropagation()
          }) // prepare config object

          searchResultConfig = ss360Settings['results']['embedConfig']

          if (searchResultConfig instanceof Object) {
          } else if (searchResultConfig === '') {
            searchResultConfig = undefined
          } // handle history

          Object(sxQuery_sxQuery['a' /* default */])(window).on(
            'popstate',
            function (e) {
              ui_Handlers.popstate(
                e,
                ss360Settings['results']['searchQueryParamName'],
                searchResultType.searchBoxSelector
              )
            }
          ) // are we at 404?

          if (
            ss360Settings.smart404 != undefined &&
            document.querySelector('title') !== null
          ) {
            is404 = components_Smart404.checkAndHandle(ss360Settings, _this)
          } // apply styles

          components_StyleApplier.apply(
            ss360Settings['style'],
            searchBoxSelector,
            ss360Settings['searchBox']['searchButton'],
            searchResultType
          ) // voice search

          if (ss360Settings['voiceSearch']['enabled'] === true) {
            Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector)
              .get()
              .forEach(function (sbNode) {
                return new components_VoiceSearch(
                  sbNode,
                  ss360Settings['voiceSearch']['lang'],
                  self.showResults
                )
              })
          } // check whether everything is setup correctly

          var errors = utils_Helper.getInitializationErrors(
            searchBoxSelector,
            is404,
            ss360Settings['results']['layoverTrigger'] !== undefined
          )
          successInit = errors.length === 0

          if (successInit) {
            console.log(
              'SiteSearch360 ' +
                _this.VERSION +
                ' initialized to ' +
                searchBoxSelector
            )
          } else {
            if (ss360Settings['showErrors'] === true) {
              ui_UiHelper.showError(errors.join('<br/>'))
              ui_UiHelper.hideLoadingAnimation()
            }

            console.error(
              'SiteSearch360 ' +
                _this.VERSION +
                ' FAILED to initialize to ' +
                searchBoxSelector +
                (errors !== undefined ? '\n\t' + errors.join('\n\t') : '')
            )
          } // notify plugin initialization

          if (ss360Settings.callbacks.init != undefined) {
            try {
              ss360Settings.callbacks.init()
            } catch (ex) {
              console.log(ex)
            }
          }
        }
        /** We only try to find out when somebody starts typing a query. */

        this.recordTyping = reporter_Reporter.initActionStartTime
        /** On leaving the search field we log the abandoned query. */

        this.blur = function (event, selectedText, logAbandon) {
          var lbctGetter = function lbctGetter () {
            return lastSearchButtonClickTime
          }

          ui_Handlers.searchBoxBlur(
            event,
            selectedText,
            logAbandon,
            autoBlurTime,
            ss360Settings['searchBox']['searchButton'],
            lbctGetter,
            _this
          )
        }
        /** When focusing on the search field we remember that it is selected. */

        this.focus = function (event, selectedText) {
          selectedSearchBox = Object(sxQuery_sxQuery['a' /* default */])(
            event.target
          ) // add focus layer

          var focusLayer = ss360Settings['searchBox']['focusLayer']

          if (focusLayer !== undefined && focusLayer) {
            ui_UiHelper.addDarkenInputLayer(selectedSearchBox)
          }
        }

        this.logQuery = reporter_Reporter.logQuery

        this.followLink = function (selectedText, link, ctrlModifier, query) {
          if (link !== undefined) {
            _this.logQuery(selectedText, 'select')

            reporter_Reporter.reportSerp(
              ss360Settings['tracking'],
              ss360Settings['results']['searchQueryParamName'],
              selectedText
            )

            if (ctrlModifier) {
              window.open(link, '_blank')
            } else {
              var qparam = ss360Settings['results']['searchQueryParamName']

              if (qparam != '') {
                var queryDict = utils_NavigatorHelper.buildQueryDict()

                if (queryDict[qparam] !== query.trim()) {
                  queryDict[qparam] = query
                  delete queryDict['ss360Filter']
                  utils_NavigatorHelper.pushState(queryDict)
                }
              }

              window.location.href = link
            }
          } else {
            _this.showResults(selectedText)
          }
        }

        this.prefetchResults = function (
          offset,
          contentGroup,
          query,
          callback,
          overrides,
          filters
        ) {
          var safeKey = utils_StringHelper.getSafeKey(contentGroup)
          var num =
            overrides !== undefined && overrides['num'] !== undefined
              ? overrides['num']
              : ss360Settings['results']['num']
          var pagingSize =
            overrides !== undefined && overrides['pageSize']
              ? overrides['pageSize']
              : ss360Settings['results']['moreResultsPagingSize']
          var limit = Math.min(num - offset, pagingSize)
          var preloadedResultCount =
            offset -
            Object(sxQuery_sxQuery['a' /* default */])(
              '.ss360-group-' +
                safeKey +
                ' ul li.ss360-suggests:not(.ss360-hidden)'
            ).length
          var rest = pagingSize - preloadedResultCount
          components_Results.prefetchAndRender(
            {
              siteId: siteId,
              limit: limit,
              contentGroup: contentGroup,
              groupResults: ss360Settings['results']['group'],
              query: query,
              offset: offset,
              highlightQueryTerms:
                ss360Settings['results']['highlightQueryTerms'],
              searchResultCallback: ss360Settings['callbacks']['searchResult'],
              filters:
                filters !== undefined
                  ? filters
                  : ss360Settings['results']['filters'],
              //
              reporter: reporter_Reporter
            },
            rest,
            uiBuilder,
            callback,
            _this
          )
        }

        this.showResults = function (
          selectedText,
          sort,
          filters,
          shouldPushState,
          searchButton,
          callback,
          submitSource,
          sbRef
        ) {
          lastSearchTerm = selectedText
          var self = _this

          if (sbRef !== undefined) {
            selectedSearchBox = sbRef
          }

          var preSearch = ss360Settings['callbacks']['preSearch']
          var keepGoing =
            (preSearch !== undefined && typeof preSearch === 'function'
              ? preSearch.call(_this, selectedText, sort, selectedSearchBox)
              : true) && selectedText.trim().length !== 0

          if (!keepGoing) {
            return
          }

          selectedText = selectedText.trim()
          ui_UiHelper.showLoadingAnimation()
          var hasSpecificResultPage =
            searchResultType === 'embed' &&
            searchResultConfig !== undefined &&
            searchResultConfig['url'] !== undefined &&
            searchResultConfig['url'] != ''
          var shouldRedirect =
            hasSpecificResultPage &&
            document.location.href.indexOf(searchResultConfig['url']) === -1
          var hasJustBeenRedirected =
            hasSpecificResultPage &&
            selectedSearchBox === undefined &&
            shouldPushState === undefined
          var shouldTrack =
            'SS360Insights' in window && (!hasJustBeenRedirected || is404)

          if (shouldTrack) {
            SS360Insights.trackSubmitSearch(
              selectedText,
              selectedSearchBox !== undefined
                ? selectedSearchBox.get()[0]
                : undefined,
              searchButton,
              submitSource
            )
          } // do we have to redirect?

          if (shouldRedirect) {
            utils_NavigatorHelper.redirectToSearchResultPage(
              selectedText,
              searchResultConfig['url'],
              ss360Settings['results']['searchQueryParamName'],
              ss360Settings['allowCookies']
            )
            return
          }

          var pagingSize =
            ss360Settings['results']['moreResultsPagingSize'] || 12
          var maxResults = ss360Settings['results']['num']
          var limit = ss360Settings['results']['moreResultsButton']
            ? 2 * pagingSize
            : maxResults
          var hasMoreResultsButton = !!ss360Settings['results'][
            'moreResultsButton'
          ]
          var limitPerGroup =
            hasMoreResultsButton &&
            ss360Settings['results']['limitPerGroup'] &&
            (ss360Settings['contentGroups']['include'] === undefined ||
              ss360Settings['contentGroups']['include'].length !== 1) &&
            ss360Settings['results']['group']
          limit = ss360Settings['results']['limitPerGroup']
            ? Math.min(limit, maxResults)
            : maxResults
          var queryUrl = buildQueryUrl(
            siteId,
            limit,
            sort,
            ss360Settings['contentGroups']['include'],
            ss360Settings['contentGroups']['exclude'],
            tracking,
            selectedText,
            0,
            limitPerGroup,
            filters
          )
          var escapedQuery = utils_StringHelper.escapeHtml(selectedText)
          components_Results.fetch(
            queryUrl,
            function (data) {
              var layer = Object(sxQuery_sxQuery['a' /* default */])(
                is404 ? '#ss360-404-layer' : '#ss360-layer'
              )
              is404 = false
              var navigation

              if (ss360Settings.callbacks.searchResult != undefined) {
                // user builds its own search result?
                try {
                  ss360Settings.callbacks.searchResult.call(_this, data)
                } catch (ex) {
                  console.log(ex)
                }
              } else {
                // default layout
                // redirect?
                var red = data['redirect']

                if (red != undefined && red.length > 0) {
                  utils_NavigatorHelper.handleRedirect(
                    red,
                    selectedText,
                    escapedQuery,
                    ss360Settings['results']['highlightSearchTerms'],
                    ss360Settings['callbacks']['redirect']
                  )
                  return
                }

                layer.html('')
                var layerContent // append search field to layover search result

                if (
                  searchResultConfig == undefined &&
                  ss360Settings.results.showSearchBoxLayover
                ) {
                  addSearchFieldToLayover(layer, lastSearchTerm)
                } // layover vs embed

                if (searchResultConfig == undefined) {
                  layerContent = Object(sxQuery_sxQuery['a' /* default */])(
                    '<section class="ss360-layer-content" tabindex="-1" aria-labelledby="ss360-search-result-heading" style="overflow-x:auto;overflow-y:auto;max-height:calc(100%-25px)">'
                  )
                } else {
                  layerContent = Object(sxQuery_sxQuery['a' /* default */])(
                    '<section class="ss360-layer-content" aria-labelledby="ss360-search-result-heading">'
                  )
                } // grid layout?

                var layoutMobile = ss360Settings.layout.mobile
                var layoutDesktop = ss360Settings.layout.desktop

                if (layoutDesktop.type == 'grid') {
                  layerContent.addClass('ss360-grid--lg')
                }

                if (layoutMobile.type == 'grid') {
                  layerContent.addClass('ss360-grid--sm')
                } // are there parts of the content we show only on certain devices?

                ui_UiHelper.updateLayerByHiddenParts(hiddenParts, layerContent) // build navigation

                navigation = new components_Navigation(
                  ss360Settings['layout']['navigation'],
                  data,
                  ss360Settings['style']['animationSpeed']
                )
                navigation.build(layer, layerContent) // append layer content

                var contentWrapper =
                  navigation.getNav() === null || !navigation.shouldForceFlex()
                    ? layer
                    : layer.find('#ss360-flex-wrapper')
                contentWrapper.append(layerContent)

                if (
                  navigation.getNav() !== null &&
                  navigation.getPosition() === 'left'
                ) {
                  layer.append(
                    Object(sxQuery_sxQuery['a' /* default */])(
                      '<div style="clear:both">'
                    )
                  )
                }

                var headlineNode = null
                var totalResults = utils_Helper.getTotalCount(
                  data,
                  limitPerGroup,
                  ss360Settings['results']['group'],
                  ss360Settings['contentGroups']['ignoreOther'],
                  ss360Settings['contentGroups']['exclude'],
                  ss360Settings['results']['num']
                )

                if (ss360Settings['results']['caption'] != undefined) {
                  headlineNode = uiBuilder.buildHeadlineNode(
                    ss360Settings['results']['caption'],
                    escapedQuery,
                    totalResults,
                    data['plan']
                  )
                  layerContent.append(headlineNode)
                }

                if (
                  data['queryCorrection'] != undefined &&
                  data['queryCorrection'] != null
                ) {
                  layerContent.append(
                    uiBuilder.buildQueryCorrectionNode(
                      ss360Settings['results']['queryCorrectionText'],
                      data['queryCorrection'],
                      ss360Settings['callbacks']['enter'],
                      ss360Settings['searchBox']['selector']
                    )
                  )
                }

                var totalResultsShown = uiBuilder.renderSearchResults(
                  data,
                  navigation,
                  layerContent,
                  ss360Settings['contentGroups'],
                  escapedQuery,
                  totalResults,
                  ss360Settings['results'],
                  ss360Settings['callbacks']['moreResults'],
                  limitPerGroup,
                  self
                )

                if (
                  totalResultsShown === 1 &&
                  ss360Settings['results']['redirectOnSingle']
                ) {
                  utils_NavigatorHelper.redirectToFirst(data)
                  return
                }

                if (navigation.getPosition() == 'top') {
                  // XXX CSS dependent (51px, height of navigation)
                  Object(sxQuery_sxQuery['a' /* default */])(
                    '.ss360-layer-content'
                  ).css('max-height', 'calc(100% - 80px)')
                }

                if (totalResultsShown == 0) {
                  uiBuilder.renderNoResultsText(
                    layerContent,
                    ss360Settings['results']['noResultsText'],
                    escapedQuery
                  )
                } // sitesearch360 watermark in search result pages

                uiBuilder.renderWatermark(
                  layerContent,
                  data['plan'],
                  ss360Settings['allowCookies']
                ) // sorting options

                if (
                  data['sortingOptions'] != undefined &&
                  data['sortingOptions'].length > 0
                ) {
                  new components_Sorting(
                    ss360Settings['results']['orderByRelevanceText']
                  ).render(
                    layerContent,
                    data['sortingOptions'],
                    data['sorting'],
                    self.showResults,
                    selectedText
                  )
                } // polyfill for object-fit (IE)

                polyfills_ObjectFitPolyfill.apply(
                  '.ss360-content-container > a'
                )
              }

              ui_UiHelper.hideLoadingAnimation() // lose focus on input to hide virtual keyboards

              try {
                autoBlurTime = new Date().getTime()
                Object(sxQuery_sxQuery['a' /* default */])(
                  ss360Settings['searchBox']['selector']
                ).blur()
              } catch (e) {
                console.log(e)
              }

              layer.removeClass('ss360-animated ss360-bo')
              layer.removeClass('ss360-overlay')

              var renderFilter = function renderFilter () {
                // render filter
                if (
                  ss360Settings['filters']['enabled'] &&
                  (Object.keys(data['suggests']).length > 0 ||
                    (data.activeFilterOptions &&
                      data.activeFilterOptions.length > 0)) &&
                  data['filterOptions'].length > 0
                ) {
                  ss360Settings['filters']['headingLevel'] =
                    captionHeadingLevel + 1
                  new components_Filter(
                    ss360Settings['filters'],
                    data['filterOptions'],
                    data['activeFilterOptions'],
                    selectedText.trim(),
                    function (activeFilterValues) {
                      var filterArr = Object.keys(activeFilterValues).reduce(
                        function (acc, key) {
                          var obj = {}
                          obj[key] = activeFilterValues[key]
                          acc.push(obj)
                          return acc
                        },
                        []
                      )
                      self.showResults(
                        selectedText,
                        sort,
                        filterArr,
                        true,
                        undefined,
                        undefined,
                        'filter'
                      )
                    },
                    data['totalResults']
                  )
                }
              } // layover vs embed

              if (searchResultType === 'layover') {
                /// / layover
                prepareLayoverLayer(layer)
                renderFilter()
              } else {
                /// / embed
                renderFilter()
                layer.fadeIn()
                Object(sxQuery_sxQuery['a' /* default */])(
                  searchResultConfig['contentBlock']
                ).html(layer)
              } // focus layer header

              setTimeout(function () {
                Object(sxQuery_sxQuery['a' /* default */])(
                  '#ss360-search-result-heading a'
                ).focus()
              }, 5) // hide broken images

              ui_UiHelper.hideBrokenImages(layer.find('img')) // change the URL so that we can deep link or go back to this result page

              var qparam = ss360Settings['results']['searchQueryParamName']

              if (qparam !== '' && shouldPushState !== false) {
                var queryDict = utils_NavigatorHelper.buildQueryDict()
                queryDict[qparam] = selectedText

                if (filters !== undefined && filters.length > 0) {
                  filters.forEach(function (filter) {
                    var keys = Object.keys(filter)
                    var key = keys[0]

                    if (
                      keys.length > 0 &&
                      filter[key].min !== undefined &&
                      filter[key].max !== undefined &&
                      !isNaN(filter[key].min) &&
                      !isNaN(filter[key].max)
                    ) {
                      // round up to two decimals
                      var min = filter[key].min
                      var max = filter[key].max

                      if (min * 100 !== Math.round(min * 100)) {
                        filter[key].min = parseFloat(min.toFixed(2))
                      }

                      if (max * 100 !== Math.round(max * 100)) {
                        filter[key].max = parseFloat(max.toFixed(2))
                      }
                    }
                  })
                  queryDict['ss360Filter'] = JSON.stringify(filters)
                } else {
                  delete queryDict['ss360Filter']
                }

                utils_NavigatorHelper.pushState(queryDict)
              } // back click from search result

              if (
                components_Results.wasBackPressed(
                  ss360Settings['allowCookies'],
                  selectedText
                )
              ) {
                components_Results.handleBackPress(
                  ss360Settings['allowCookies'],
                  navigation,
                  selectedText,
                  searchResultType,
                  ss360Settings['results']['moreResultsPagingSize'],
                  _this
                )
              }

              if (ss360Settings.callbacks.postSearch !== undefined) {
                try {
                  ss360Settings.callbacks.postSearch.call(_this, data)
                } catch (ex) {
                  console.log(ex)
                }
              }

              if (callback !== undefined) {
                try {
                  callback.call(_this, data)
                } catch (ex) {
                  console.log(ex)
                }
              } // log query for analytics

              reporter_Reporter.reportSerp(
                ss360Settings['tracking'],
                ss360Settings['results']['searchQueryParamName'],
                selectedText
              )
              areResultsVisible = true

              if ('SS360Insights' in window) {
                var allItems = Object(sxQuery_sxQuery['a' /* default */])(
                  '.ss360-suggests:not(.ss360-hidden)'
                ).get()
                var resultType =
                  ss360Settings['results']['embedConfig'] !== undefined
                    ? 'embed'
                    : ss360Settings['results']['fullScreenConfig'] !== undefined
                      ? 'fullscreen'
                      : 'layover'

                if (
                  Object(sxQuery_sxQuery['a' /* default */])('#ss360-404-layer')
                    .length > 0
                ) {
                  resultType = 'smart404'
                }

                Object(sxQuery_sxQuery['a' /* default */])(window).off(
                  'beforeunload.ss360Insights'
                )
                Object(sxQuery_sxQuery['a' /* default */])(window).on(
                  'beforeunload.ss360Insights',
                  function () {
                    var allItems = Object(sxQuery_sxQuery['a' /* default */])(
                      '.ss360-suggests:not(.ss360-hidden)'
                    ).get()
                    window.SS360Insights.trackSerpLeave(
                      Object(sxQuery_sxQuery['a' /* default */])(
                        '.ss360-layer-content'
                      ).get()[0],
                      allItems[0],
                      selectedText,
                      allItems.length,
                      resultType
                    )
                  }
                )
                var filterData = undefined

                if (
                  ss360Settings['filters']['enabled'] &&
                  data['filterOptions']
                ) {
                  filterData = []
                  data['filterOptions'].forEach(function (filterGroup) {
                    filterData.push(filterGroup.key + '<#>' + filterGroup.name)
                  })
                  filterData = JSON.stringify(filterData)
                }

                window.SS360Insights.trackSerpShow(
                  Object(sxQuery_sxQuery['a' /* default */])(
                    '.ss360-layer-content'
                  ).get()[0],
                  allItems[0],
                  selectedText,
                  allItems.length,
                  resultType,
                  filterData
                )
              }
            },
            function () {
              if (ss360Settings['showErrors'] === true) {
                ui_UiHelper.showError(
                  'There is no siteId "' +
                    siteId +
                    '", so no results can be retrieved. Please update your ss360Config object.'
                )
              }

              ui_UiHelper.hideLoadingAnimation()
            }
          )
        }

        this.showLoading = ui_UiHelper.showLoadingAnimation
        this.hideLoading = ui_UiHelper.hideLoadingAnimation

        this.getSearchResultType = function () {
          return searchResultType
        }
      }

      /* harmony default export */ var siteSearch_core = core_SiteSearch360Core
      // CONCATENATED MODULE: ./src/js/siteSearch/configuration/UniboxDefaultConfig.js

      var UniboxDefaultConfig = {
        // these are the defaults.
        suggestUrl: '',
        showImagesSuggestions: true,
        ivfImagePath: '',
        ivfImageOffset: -80,
        missingErrorImage: undefined,
        queryVisualizationHeadline: '',
        highlight: true,
        throttleTime: 50,
        animationSpeed: 300,
        instantVisualFeedback: 'all',
        placeholder: undefined,
        extraHtml: undefined,
        lineCallback: undefined,
        noSuggests: undefined,
        emptyQuerySuggests: undefined,
        minChars: 3,
        maxWidth: 'auto',
        showDeleteAllButton: false,
        suggestOrder: [],
        suggestSelectionOrder: [],
        headingLevel: 4,
        enabled: true,
        mobileScrollOnFocus: true
      }
      /* harmony default export */ var configuration_UniboxDefaultConfig = UniboxDefaultConfig
      // CONCATENATED MODULE: ./src/js/siteSearch/styles/Styles.js

      var Styles = {
        renderDefaultStyles: function renderDefaultStyles (ss360Settings) {
          var css = __webpack_require__(3) // load the default css

          Object(sxQuery_sxQuery['a' /* default */])('head').append(
            '<style type="text/css">' + css + '</style>'
          ) // Grid

          var innerStyle = ''

          if (
            ss360Settings['layout']['mobile']['type'] === 'grid' ||
            ss360Settings['layout']['desktop']['type'] === 'grid'
          ) {
            var overridenGridStyles = []
            var colSm = Math.min(
              ss360Settings.layout.mobile.gridColsSm || 1,
              10
            ).toString()
            var colMd = Math.min(
              ss360Settings.layout.mobile.gridColsMd || 2,
              10
            ).toString()
            var colLg = Math.min(
              ss360Settings.layout.desktop.gridColsLg || 3,
              10
            ).toString()
            var colXl = Math.min(
              ss360Settings.layout.desktop.gridColsXl || 4,
              10
            ).toString()
            var extraFlex =
              '@media (#M_QUERY#){.ss360-layer-content.ss360-grid--#SZ# .ss360-group>ul>li{-ms-flex-preferred-size:calc(100% / #COLS# - 1px);-webkit-flex-basis:calc(100% / #COLS# - 1px);flex-basis:calc(100% / #COLS# - 1px);max-width:calc(100% / #COLS# - 1px)}}'

            if (ss360Settings.layout.mobile.type === 'grid') {
              if (colSm !== 1) {
                overridenGridStyles.push(
                  extraFlex
                    .replace('#M_QUERY#', 'max-width: 767px')
                    .replace('#SZ#', 'sm')
                    .replace(/#COLS#/g, colSm)
                )
              }

              if (colMd !== 2) {
                overridenGridStyles.push(
                  extraFlex
                    .replace('#M_QUERY#', 'max-width: 991px')
                    .replace('#SZ#', 'sm')
                    .replace(/#COLS#/g, colMd)
                )
              }
            }

            if (ss360Settings.layout.desktop.type === 'grid') {
              if (colLg !== 3) {
                overridenGridStyles.push(
                  extraFlex
                    .replace('#M_QUERY#', 'min-width: 992px')
                    .replace('#SZ#', 'lg')
                    .replace(/#COLS#/g, colLg)
                )
              }

              if (colXl !== 4) {
                overridenGridStyles.push(
                  extraFlex
                    .replace('#M_QUERY#', 'min-width: 1200px')
                    .replace('#SZ#', 'lg')
                    .replace(/#COLS#/g, colXl)
                )
              }
            }

            innerStyle += overridenGridStyles.join('')
          } // theme color

          if (
            ss360Settings['style']['themeColor'] !==
            configuration_DefaultConfig['style']['themeColor']
          ) {
            var themeColor = ss360Settings['style']['themeColor']
            var backgroundThemeColor = [
              '.ss360-double-bounce1',
              '.ss360-double-bounce2',
              '.ss360-spinner-square',
              '#ss360-layer .content-group-heading',
              '#ss360-custom-searchbutton',
              'nav.ss360-tabbed li:not(.ss360-active) button',
              '.ss360-nav-select',
              '.ss360-nav-label',
              '.unibox-selectable.active',
              '.unibox-selectable:not(.unibox-show-all):hover',
              '.ss360-sldr--l:focus',
              '.ss360-sldr--l.ss360-focus',
              '.ss360-sldr--r:focus',
              '.ss360-sldr--r.ss360-focus',
              '.ss360-sldr--a',
              ".ss360-checker-row input[type='checkbox']:checked~label .checkmark",
              '.ss360-delete-filter-bar button:hover i',
              '.ss360-delete-filter-bar button.ss360-filter--delete-all:hover',
              '.ss360-more-results:hover'
            ]
            var borderThemeColor = [
              '.ss360-more-results',
              '#ss360-custom-searchbutton',
              '#ss360-query:focus',
              '.ss360-nav-entry',
              '.ss360-sldr--r',
              '.ss360-sldr--l',
              '.ss360-delete-filter-bar button'
            ]
            var certainBorderThemeColor = {
              bottom: [
                '.ss360-nav-entry:hover',
                'nav.ss360-tabbed.ss360-left-nav li button:hover',
                'nav.ss360-tabbed.ss360-top-nav li',
                'nav.ss360-tabbed.ss360-top-nav .ss360-nav-post',
                'nav.ss360-tabbed.ss360-top-nav .ss360-nav-pre'
              ],
              right: [
                'nav.ss360-tabbed.ss360-left-nav li',
                'nav.ss360-tabbed.ss360-left-nav .ss360-nav-post',
                'nav.ss360-tabbed.ss360-left-nav .ss360-nav-pre'
              ]
            }
            var colorThemeColor = [
              '.ss360-more-results',
              '#unibox-suggest-box a',
              '#unibox-suggest-box-special a',
              '.unibox-selectable.unibox-show-all',
              '.unibox-selectable.unibox-show-all span',
              '#ss360-filter .ss360-filter-group.ss360-active .ss360-filter-btn',
              '.ss360-delete-filter-bar button i',
              '.ss360-delete-filter-bar button.ss360-filter--delete-all'
            ]
            innerStyle +=
              backgroundThemeColor.join(',') +
              '{background-color: ' +
              themeColor +
              '}'
            innerStyle +=
              borderThemeColor.join(',') + '{border-color: ' + themeColor + '}'
            innerStyle +=
              certainBorderThemeColor['bottom'].join(',') +
              '{border-bottom-color: ' +
              themeColor +
              '}'
            innerStyle +=
              certainBorderThemeColor['right'].join(',') +
              '{border-right-color: ' +
              themeColor +
              '}'
            innerStyle +=
              colorThemeColor.join(',') + '{color: ' + themeColor + '}'

            if (ss360Settings['filters']['enabled'] === true) {
              var hexToRgb = function hexToRgb (hex) {
                if (hex.length === 4) {
                  hex =
                    '#' +
                    Array(3).join(hex[1]) +
                    Array(3).join(hex[2]) +
                    Array(3).join(hex[3])
                }

                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                  hex
                )
                return result
                  ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                  }
                  : null
              }

              var rgbThemeColor = hexToRgb(themeColor)

              if (rgbThemeColor !== null) {
                innerStyle += '.ss360-sldr--r, .ss360-sldr--l{0.5px 0.5px 2px 1px rgba('
                  .concat(rgbThemeColor.r, ', ')
                  .concat(rgbThemeColor.g, ', ')
                  .concat(rgbThemeColor.b, ', .32)}')
              }
            }
          } // tabbed navigation

          var navigationLayout = ss360Settings.layout.navigation

          if (
            parseInt(navigationLayout.tabSpacingPx) !==
            configuration_DefaultConfig['layout']['navigation']['tabSpacingPx']
          ) {
            var tabSpacingPx = parseInt(navigationLayout.tabSpacingPx)
            innerStyle +=
              'nav.ss360-tabbed.ss360-left-nav li:not(:last-of-type) button{margin-bottom: ' +
              tabSpacingPx +
              'px}'
            innerStyle +=
              'nav.ss360-tabbed.ss360-top-nav li:not(:last-of-type) button{margin-right: ' +
              tabSpacingPx +
              'px}'
            innerStyle +=
              'nav.ss360-tabbed.ss360-top-nav li.ss360-active+li{padding-left: ' +
              (tabSpacingPx + 1) +
              'px}'
            innerStyle +=
              'nav.ss360-tabbed.ss360-left-nav li.ss360-active+li{padding-top: ' +
              (tabSpacingPx + 1) +
              'px}'
          }

          if (
            parseInt(navigationLayout.borderRadiusPx) !==
            configuration_DefaultConfig['layout']['navigation'][
              'borderRadiusPx'
            ]
          ) {
            var borderRadiusPx = parseInt(navigationLayout.borderRadiusPx)
            innerStyle +=
              'nav.ss360-tabbed.ss360-top-nav li button{border-top-left-radius:' +
              borderRadiusPx +
              'px;border-top-right-radius:' +
              borderRadiusPx +
              'px}'
            innerStyle +=
              'nav.ss360-tabbed.ss360-left-nav li button{border-bottom-left-radius:' +
              borderRadiusPx +
              'px;border-top-left-radius:' +
              borderRadiusPx +
              'px}'
          }

          if (ss360Settings.style.additionalCss) {
            innerStyle += ss360Settings.style.additionalCss
          }

          var body = Object(sxQuery_sxQuery['a' /* default */])('body')

          if (innerStyle !== '') {
            body.append(
              '<style id="ss360-default-css">' + innerStyle + '</style>'
            )
          } // ss360 spinner

          body.append(
            '<div id="ss360-searchbox-spinner"><div class="ss360-double-bounce1"></div><div class="ss360-double-bounce2"></div></div>'
          )
          var animationDurationS =
            parseInt(ss360Settings['style']['animationSpeed']) / 1000

          if (ss360Settings.style.loaderType == 'square') {
            var $spinner = Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-searchbox-spinner'
            )
            $spinner.html('')
            $spinner.addClass('ss360-spinner-square')
            $spinner.css('animationDuration', 1 + animationDurationS + 's')
          } else if (ss360Settings.style.loaderType == 'none') {
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-searchbox-spinner'
            ).html('')
          } else {
            Object(sxQuery_sxQuery['a' /* default */])(
              '#ss360-searchbox-spinner > *'
            ).css('animationDuration', 2 + animationDurationS + 's')
          }
        }
      }
      /* harmony default export */ var styles_Styles = Styles
      // CONCATENATED MODULE: ./src/js/sitesearch360.js

      var sitesearch360_enhanceCallbacks = function enhanceCallbacks (
        settings,
        core
      ) {
        var callbacks = settings['callbacks']
        callbacks['enter'] = utils_Helper.enhanceCallback(
          callbacks['enter'],
          core.showResults,
          'enter',
          core
        )
        callbacks['focus'] = utils_Helper.enhanceCallback(
          callbacks['focus'],
          core.focus,
          'focus',
          core
        )
        callbacks['blur'] = utils_Helper.enhanceCallback(
          callbacks['blur'],
          core.blur,
          'blur',
          core
        )
        callbacks['enterResult'] = utils_Helper.enhanceCallback(
          callbacks['enterResult'],
          core.followLink,
          'enterResult',
          core
        )
        callbacks['type'] = utils_Helper.enhanceCallback(
          callbacks['type'],
          core.recordTyping,
          'type',
          core
        )
      }

      var sitesearch360_initializeUnibox = function initializeUnibox (
        ss360Settings
      ) {
        ;(function (sxQuery) {
          sxQuery.fn.unibox = function (options) {
            options = utils_Helper.copyObject(options || {})
            options.hasMultipleSearchBoxes = this.length > 1
            configuration_ConfigurationHelper.extendUniboxOptions(
              ss360Settings,
              options
            )
            var boxesArray = this.map(function (idx, searchBox) {
              searchBox = sxQuery(searchBox) // settings with default options.

              var settings = sxQuery.extend(
                utils_Helper.copyObject(configuration_UniboxDefaultConfig),
                options
              )

              if (settings.searchBoxContainerSelector == undefined) {
                settings.searchBoxContainer = searchBox.parent()
              } else {
                settings.searchBoxContainer = sxQuery(
                  settings.searchBoxContainerSelector
                )
              }

              var individualUnibox = new unibox_unibox['a' /* default */]()
              individualUnibox.init(searchBox, settings)
              return individualUnibox
            })

            if (boxesArray.length == 1) {
              return boxesArray[0]
            }

            return boxesArray
          }
        })(sxQuery_sxQuery['a' /* default */])
      }

      var sitesearch360_handleQueryParams = function handleQueryParams (
        searchParamName,
        filtersEnabled,
        searchBoxSelector,
        highlightSearchTerms,
        populateSearchBox,
        core
      ) {
        var queryDict = utils_NavigatorHelper.buildQueryDict() // have we gotten redirected here? maybe we need to highlight something?

        if (
          queryDict['ss360SearchTerm'] !== undefined &&
          highlightSearchTerms
        ) {
          try {
            Object(sxQuery_sxQuery['a' /* default */])('div').highlight(
              queryDict['ss360SearchTerm'],
              'ss360-search-term-highlight'
            )
          } catch (e) {
            console.log(e)
          }
        } // is this a search page deep link? Also should be triggered if the user presses back

        if (queryDict[searchParamName] !== undefined) {
          var paramQuery =
            queryDict[searchParamName] ||
            sxQuery_sxQuery['a' /* default */].readCookie('ss360LastQuery')

          if (paramQuery !== undefined && paramQuery !== null) {
            if (core.getSearchResultType() === 'fullscreen') {
              Object(sxQuery_sxQuery['a' /* default */])('#ss360-query').val(
                paramQuery
              )

              if (
                Object(sxQuery_sxQuery['a' /* default */])(
                  '#ss360-search-console'
                ).css('top') != '0px'
              ) {
                core.showFullscreenLayer()
              }
            }

            if (populateSearchBox) {
              Object(sxQuery_sxQuery['a' /* default */])(searchBoxSelector).val(
                paramQuery
              )
            }

            var filters = undefined

            if (filtersEnabled) {
              try {
                if (queryDict['ss360Filter'] !== undefined) {
                  filters = JSON.parse(queryDict['ss360Filter'])
                }
              } catch (ex) {
                console.warn(ex)
              }
            }

            core.showResults(
              paramQuery,
              undefined,
              filters,
              false,
              undefined,
              undefined,
              'pageload'
            )
          }
        }
      }

      var sitesearch360_init = function init (config) {
        var ss360Settings = sxQuery_sxQuery['a' /* default */].extend(
          utils_Helper.copyObject(configuration_DefaultConfig),
          config
        )

        if (
          ss360Settings['filters']['enabled'] &&
          config.filters.position === undefined &&
          ss360Settings['results']['embedConfig'] === undefined &&
          ss360Settings['results']['fullScreenConfig'] === undefined
        ) {
          // filter position top, if layover
          ss360Settings['filters']['position'] = 'top'
        }

        configuration_ConfigurationHelper.assert(config, ss360Settings)
        var core = new siteSearch_core(ss360Settings) // make sure all calbacks work as expected

        sitesearch360_enhanceCallbacks(ss360Settings, core) // init

        Object(sxQuery_sxQuery['a' /* default */])(document).ready(function () {
          sitesearch360_initializeUnibox(ss360Settings)
          core.init()

          if (ss360Settings.style.defaultCss) {
            styles_Styles.renderDefaultStyles(ss360Settings)
          }

          var shouldPopulateSearchBox =
            ss360Settings['results']['embedConfig'] === undefined ||
            ss360Settings['results']['embedConfig'][
              'populateSearchBoxOnRedirect'
            ] === undefined ||
            ss360Settings['results']['embedConfig'][
              'populateSearchBoxOnRedirect'
            ] !== false
          sitesearch360_handleQueryParams(
            ss360Settings['results']['searchQueryParamName'],
            ss360Settings['filters']['enabled'],
            ss360Settings['searchBox']['selector'],
            ss360Settings['results']['highlightSearchTerms'],
            shouldPopulateSearchBox,
            core
          )
        }) // expose public methods

        window.SS360 = {
          changeConfig: core.changeConfig,
          setSiteId: core.setSiteId,
          init: core.init,
          showResults: core.showResults,
          showFullscreenLayer: core.showFullscreenLayer,
          closeLayer: core.closeLayer,
          showLoading: core.showLoading,
          hideLoading: core.hideLoading,
          isInitialized: core.isInitialized,
          getVersion: function getVersion () {
            return core.VERSION
          }
        }
      }

      window.initializeSs360 = function (config) {
        config = config || window.ss360Config
        sitesearch360_init(config)
      }
      /** SS360 ends here **/

      if (
        !('ss360Config' in window) ||
        window.ss360Config['autoInit'] !== false
      ) {
        // TOD: provide public API and init over here
        initializeSs360()
      }

      window.sxQuery = sxQuery_sxQuery['a' /* default */] // make sxQuery public

      /***/
    }
    /******/
  ]
)
