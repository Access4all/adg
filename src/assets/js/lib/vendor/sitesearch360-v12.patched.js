!(function (s) {
  var n = {}

  function i (e) {
    if (n[e]) return n[e].exports
    var t = (n[e] = {
      i: e,
      l: !1,
      exports: {}
    })
    return s[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports
  }
  ;(i.m = s),
  (i.c = n),
  (i.d = function (e, t, s) {
    i.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: s
        })
  }),
  (i.r = function (e) {
    typeof Symbol !== 'undefined' &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: 'Module'
        }),
    Object.defineProperty(e, '__esModule', {
      value: !0
    })
  }),
  (i.t = function (t, e) {
    if ((1 & e && (t = i(t)), 8 & e)) return t
    if (4 & e && typeof t === 'object' && t && t.__esModule) return t
    var s = Object.create(null)
    if (
      (i.r(s),
        Object.defineProperty(s, 'default', {
          enumerable: !0,
          value: t
        }),
        2 & e && typeof t !== 'string')
    ) {
      for (var n in t) {
        i.d(
          s,
          n,
          function (e) {
            return t[e]
          }.bind(null, n)
        )
      }
    }
    return s
  }),
  (i.n = function (e) {
    var t =
        e && e.__esModule
          ? function () {
            return e.default
          }
          : function () {
            return e
          }
    return i.d(t, 'a', t), t
  }),
  (i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }),
  (i.p = '/'),
  i((i.s = 7))
})([
  function (e, t, s) {
    'use strict'
    var i = function t (n) {
      var r = this,
        a = (function () {
          for (var e = [], t = 0; t < n.length; t++) e.push(n[t])
          return e
        })(),
        i = {
          width: !0,
          height: !0,
          minWidth: !0,
          minHeight: !0,
          maxWidth: !0,
          padding: !0,
          paddingLeft: !0,
          paddingRight: !0,
          paddingTop: !0,
          paddingBottom: !0,
          left: !0,
          right: !0,
          top: !0,
          bottom: !0,
          borderWidth: !0
        }
      ;(this._it = function (e) {
        for (var t = 0; t < a.length; t++) {
          var s = a[t]
          s && e && e(s, t == a.length - 1)
        }
      }),
      (this._canMatch = function (e) {
        return e.matches || e.matchesSelector || e.msMatchesSelector
      }),
      (this._match = function (e, t) {
        return e.matches
          ? e.matches(t)
          : e.matchesSelector ? e.matchesSelector(t) : e.msMatchesSelector(t)
      }),
      (this._addNode = function (n, i) {
        var o = []
        if (typeof n === 'string') {
          return (o = o.concat(this._addNode(u.parseHTML(n), i)))
        }
        if (
          n instanceof Array ||
            n instanceof HTMLCollection ||
            n instanceof NodeList
        ) {
          for (
            var e = i ? 0 : n.length - 1;
            i ? e < n.length : e >= 0;
            i ? e++ : e--
          ) {
            o = o.concat(this._addNode(n[e], i))
          }
          return o
        }
        return n instanceof t
          ? ((o = o.concat(this._addNode(n.get(), i))),
            n.clear(),
            n.push(o),
            o)
          : n instanceof Node ||
              (void 0 !== n && n.appendChild && n.cloneNode)
            ? (this._it(function (e, t) {
              var s = t ? n : n.cloneNode(!0)
              o.push(s)
              try {
                i || !e.firstChild
                  ? e.appendChild(s)
                  : e.insertBefore(s, e.firstChild)
              } catch (e) {
                console.log(e)
              }
            }),
              o)
            : void 0
      }),
      (this._init = function () {
        for (var e = 0; e < a.length; e++) this[e] = a[e]
      }),
      this._init(),
      (this.length = a.length),
      (this.push = function (e) {
        ;(a = (a = a || []).concat(e)), (this.length = a.length)
      }),
      (this.clear = function () {
        ;(a = []), (this.length = 0)
      }),
      (this.get = function (e) {
        return void 0 !== e ? a[e] : a
      }),
      (this.remove = function () {
        this._it(function (e) {
          e.parentNode && e.parentNode.removeChild(e)
        })
      }),
      (this.each = function (t) {
        var s = 0
        this._it(function (e) {
          t.call(e, e, s), s++
        })
      }),
      (this._trigger = function (e) {
        var t = void 0
        if (window.CustomEvent) {
          try {
            t = new CustomEvent(e)
          } catch (e) {}
        }
        void 0 === t &&
            (t = document.createEvent('CustomEvent')).initCustomEvent(
              e,
              !0,
              !0,
              {}
            ),
        this._it(function (e) {
          e.dispatchEvent(t)
        })
      }),
      (this.on = function (o, n, a) {
        if (void 0 === a) this.on(o, void 0, n)
        else if (n) {
          var e = this._match,
            t = this._canMatch,
            i = function (e, t, s, n, i) {
              if (i && i.target) {
                if (e(i.target) && t(i.target, s)) n.bind(i.target, i).call()
                else {
                  for (var o = i.target; o.parentNode && e(o.parentNode);) {
                    if (e((o = o.parentNode)) && t(o, s)) {
                      n.bind(i.target, i).call()
                      break
                    }
                  }
                }
              }
            }.bind(this, t, e)
          this._it(function (e) {
            for (var t = o.split(','), s = 0; s < t.length; s++) {
              e.addEventListener(t[s].trim(), i.bind(this, n, a))
            }
          })
        } else {
          this._it(function (e) {
            for (var t = o.split(','), s = 0; s < t.length; s++) {
              var n = t[s]
              if (n.indexOf('.') !== -1) {
                var i = n.split('.')
                i.length == 2 &&
                    ((n = n.trim()),
                      u._callbacksByName[n] || (u._callbacksByName[n] = []),
                      u._callbacksByName[n].push(a),
                      (n = i[0]))
              }
              e.addEventListener(n.trim(), a)
            }
          })
        }
        return r
      }),
      (this.off = function (e, n) {
        var t = e.split(',')
        return (
          t &&
              t.length != 0 &&
              this._it(function (s) {
                t.map(function (e) {
                  if (e.indexOf('.') === -1) s.removeEventListener(e.trim(), n)
                  else if (u._callbacksByName[e.trim()]) {
                    var t = e.split('.')[0].trim()
                    u._callbacksByName[e.trim()].map(function (e) {
                      s.removeEventListener(t, e)
                    })
                  }
                })
              }),
          r
        )
      }),
      (this.mouseenter = function (e) {
        return this.on('mouseenter', e)
      }),
      (this.mousedown = function (e) {
        return this.on('mousedown', e)
      }),
      (this.mouseup = function (e) {
        return this.on('mouseup', e)
      }),
      (this.click = function (e) {
        return this.on('click', e)
      }),
      (this.scroll = function (e) {
        return this.on('scroll', e)
      }),
      (this.focus = function (e) {
        return (
          void 0 === e
            ? this._it(function (e) {
              e.focus ? e.focus() : u(e)._trigger('focus')
            })
            : this.on('focus', e),
          r
        )
      }),
      (this.blur = function (e) {
        return (
          void 0 === e
            ? this._it(function (e) {
              e.blur ? e.blur() : u(e)._trigger('blur')
            })
            : this.on('blur', e),
          r
        )
      }),
      (this.keydown = function (e) {
        return this.on('keydown', e)
      }),
      (this.keyup = function (e) {
        return this.on('keyup', e)
      }),
      (this.focusout = function (e) {
        return this.on('focusout', e)
      }),
      (this.find = function (n) {
        var i = []
        return (
          this._it(function (e) {
            for (var t = u.querySelectorAll(n, e), s = 0; s < t.length; s++) {
              i.push(t[s])
            }
          }),
          u(i)
        )
      }),
      (this.children = function () {
        var s = []
        return (
          this._it(function (e) {
            for (var t = 0; t < e.childElementCount; t++) {
              s.push(e.children[t])
            }
          }),
          u(s)
        )
      }),
      (this.is = function (e) {
        for (var t = 0; t < a.length; t++) if (a[t] === e) return !0
        return !1
      }),
      (this.text = function (t) {
        if (t != null) {
          return (
            this._it(function (e) {
              e.innerText = t
            }),
            r
          )
        }
        var s = ''
        return (
          this._it(function (e) {
            s += e.textContent || ''
          }),
          s
        )
      }),
      (this.position = function () {
        if (a.length > 0) {
          var e,
            t = a[0],
            s = u(t)
          if (s.css('position') == 'fixed') e = t.getBoundingClientRect()
          else {
            var n = t.offsetParent,
              i = u(n),
              o = {
                top: 0,
                left: 0
              }
              ;(e = s.offset()),
            n.nodeName != 'html' && (o = i.offset()),
            (o.top += parseFloat(i.css('borderTopWidth'))),
            (o.left += parseFloat(i.css('borderLeftWidth'))),
            (e.top = e.top - o.top - parseFloat(s.css('marginTop'))),
            (e.left = e.left - o.left - parseFloat(s.css('marginLeft')))
          }
          return e
        }
      }),
      (this.attr = function (t, s) {
        if (void 0 === s) {
          if (a.length > 0) return a[0].getAttribute(t)
        } else {
          this._it(function (e) {
            s !== null ? e.setAttribute(t, s) : e.removeAttribute(t)
          })
        }
      }),
      (this.removeAttribute = function (t) {
        t &&
            this._it(function (e) {
              e.removeAttribute && e.removeAttribute(t)
            })
      }),
      (this.hide = function () {
        this._it(function (e) {
          e.style.display = 'none'
        })
      }),
      (this.show = function () {
        this._it(function (e) {
          e.style.display = ''
        })
      }),
      (this.data = function (t, s) {
        return void 0 === s
          ? a.length > 0 ? a[0].dataset[t] : void 0
          : (this._it(function (e) {
            s === null ? delete e.dataset[t] : (e.dataset[t] = s)
          }),
            this)
      }),
      (this.addClass = function (e) {
        var s = e.split(' ')
        return (
          this._it(function (e) {
            for (var t = 0; t < s.length; t++) {
              e.classList
                ? e.classList.add(s[t])
                : (e.className += ' ' + s[t])
            }
          }),
          this
        )
      }),
      (this.removeClass = function (e) {
        var s = e.split(' ')
        return (
          this._it(function (e) {
            for (var t = 0; t < s.length; t++) {
              e.classList
                ? e.classList.remove(s[t])
                : (e.className = e.className.replace(
                  new RegExp(
                    '(^|\\b)' + s[t].split(' ').join('|') + '(\\b|$)',
                    'gi'
                  ),
                  ' '
                ))
            }
          }),
          this
        )
      }),
      (this.toggleClass = function (e) {
        this.hasClass(e) ? this.removeClass(e) : this.addClass(e)
      }),
      (this.hasClass = function (e) {
        for (var t = 0; t < a.length; t++) {
          var s = n[t]
          if (s) {
            if (s.classList) {
              if (s.classList.contains(e)) return !0
            } else if (
              new RegExp('(^| )' + e + '( |$)', 'gi').test(s.className)
            ) {
              return !0
            }
          }
        }
        return !1
      }),
      (this.filter = function (e) {
        return u(this.get().filter(e))
      }),
      (this.val = function (t) {
        return void 0 !== t
          ? (this._it(function (e) {
            e.value = t
          }),
            this)
          : a.length > 0 ? a[0].value : void 0
      }),
      (this.css = function (t, s) {
        if (
          ((t = t.replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase()
          })),
            void 0 !== s)
        ) {
          if (s !== null) {
            var e = s.toString()
            i[t] &&
                e !== 'auto' &&
                e.indexOf('px') === -1 &&
                e.indexOf('%') === -1 &&
                e.indexOf('calc') === -1 &&
                s !== 0 &&
                s !== '' &&
                ((s = s.toString()), (s += 'px'))
          }
          this._it(function (e) {
            e.style[t] = s
          })
        } else if (a.length > 0) {
          for (var n = 0; n < a.length; n++) {
            try {
              return window.getComputedStyle(a[n])[t]
            } catch (e) {}
          }
          return null
        }
      }),
      (this.append = function (e) {
        return this._addNode(e, !0), this
      }),
      (this.prepend = function (e) {
        return this._addNode(e, !1), this
      }),
      (this.parent = function () {
        var t = []
        return (
          this._it(function (e) {
            t.push(e.parentNode)
          }),
          u(t)
        )
      }),
      (this.parents = function (s) {
        var n = [],
          i = this
        return (
          this._it(function (e) {
            for (var t = e.parentNode; t && i._canMatch(t);) {
              ;(void 0 === s || i._match(t, s)) && n.push(t),
              (t = t.parentNode)
            }
          }),
          n
        )
      }),
      (this.prev = function () {
        var t = []
        return (
          this._it(function (e) {
            t.push(e.previousElementSibling)
          }),
          u(t)
        )
      }),
      (this.next = function () {
        var t = []
        return (
          this._it(function (e) {
            t.push(e.nextElementSibling)
          }),
          u(t)
        )
      }),
      (this.closest = function (s) {
        var n = [],
          i = this
        return (
          this._it(function (e) {
            for (var t = e; t && i._canMatch(t) && !i._match(t, s);) {
              t = t.parentNode
            }
            i._canMatch(t) || (t = void 0), n.push(t)
          }),
          u(n)
        )
      }),
      (this.index = function (e) {
        for (var t = 0; t < a.length; t++) if (a[t] === e) return t
        return -1
      }),
      (this.offset = function () {
        if (a.length > 0) {
          var e = a[0]
          if (!e.getClientRects().length) {
            return {
              top: 0,
              left: 0
            }
          }
          var t = e.getBoundingClientRect(),
            s = e.ownerDocument.defaultView
          return {
            top: t.top + s.pageYOffset,
            left: t.left + s.pageXOffset
          }
        }
      }),
      (this.outerWidth = function () {
        if (a.length > 0) return a[0].offsetWidth
      }),
      (this.height = function (e) {
        if (e == null) return parseFloat(this.css('height'))
        e.toString().indexOf('px') == -1 &&
            e.toString().indexOf('%') == -1 &&
            e !== 'auto' &&
            (e = e.toString() + 'px'),
        this.css('height', e)
      }),
      (this.outerHeight = function () {
        if (a.length > 0) return a[0].offsetHeight
      }),
      (this.html = function (e) {
        if (void 0 !== e) this.empty(), this.append(e)
        else if (a.length > 0) return a[0].innerHTML
      }),
      (this.empty = function () {
        this._it(function (e) {
          for (; e.firstChild;) e.removeChild(e.firstChild)
        })
      }),
      (this.scrollTop = function (t) {
        if (void 0 !== t) {
          this._it(function (e) {
            void 0 !== e.scrollTop
              ? (e.scrollTop = t)
              : void 0 !== e.scrollY &&
                  void 0 !== e.scrollTo &&
                  e.scrollTo(e.scrollX, t)
          })
        } else if (a.length > 0) {
          return void 0 !== a[0].scrollTop ? a[0].scrollTop : a[0].scrollY
        }
      }),
      (this.ready = function (t) {
        this._it(function (e) {
          ;(e.attachEvent
            ? e.readyState === 'complete'
            : e.readyState !== 'loading')
            ? t()
            : e.addEventListener('DOMContentLoaded', t)
        })
      }),
      (this.isVisible = function () {
        if (a.length > 0) return u(a[0]).css('display') !== 'none'
      }),
      (this.map = function (t) {
        var s = [],
          n = 0
        return (
          this._it(function (e) {
            s.push(t(n, e)), n++
          }),
          s
        )
      }),
      (this._animate = function (n, i, o, a, r, l) {
        var c = 0,
          d = +new Date()
        u._notifyAnimation(
          n,
          i,
          u._requestAnimation(function e () {
            var t = new Date()
            c += Math.PI / (o / (t - d))
            var s = a + a * Math.cos(c)
            r(n, s),
            (d = +new Date()),
            c >= Math.PI
              ? void 0 !== l && typeof l === 'function' && l(n)
              : u._notifyAnimation(n, i, u._requestAnimation(e))
          })
        )
      }),
      (this._fade = function (s, t, n) {
        var i = s ? -1 : 1,
          o = function (e, t) {
            e != null && t != null && (e.style.opacity = i > 0 ? 1 - t : t)
          },
          a = function (e) {
            var t = u(e)
            t.css('opacity', ''),
            s && t.hide(),
            n && typeof n === 'function' && n.bind(t).call()
          },
          r = this
        this._it(function (e) {
          u._clearAnimation(e, 'fade'),
          t == 0 || u.prefersReducedMotion()
            ? a(e)
            : r._animate(e, 'fade', t || 400, 0.5, o, a)
        })
      }),
      (this.fadeIn = function (e, t, s) {
        void 0 === s || s != 'flex'
          ? this.css('display', 'block')
          : this._it(function (e) {
            var t = u(e),
              s = t.attr('style')
            s.length > 0 && s[s.length - 1] != ';' && (s += ';'),
            (s +=
                    'display: -ms-flexbox;display: -webkit-flex;display: flex;'),
            t.attr('style', s)
          }),
        this._it(function (e) {
          e.style.opacity = 0
        }),
        this._fade(!1, e, t)
      }),
      (this.fadeOut = function (e, t) {
        this._it(function (e) {
          e.style.opacity = 1
        }),
        this._fade(!0, e, t)
      }),
      (this._slide = function (i, o, s) {
        var a = this,
          r = function (e) {
            var t = u(e)
            t.css('height', ''),
            i && t.hide(),
            s && typeof s === 'function' && s.bind(t).call()
          }
        this._it(function (e) {
          if (
            (u._clearAnimation(e, 'slide'),
              o == 0 || u.prefersReducedMotion())
          ) {
            r(e)
          } else {
            var t = u(e),
              s = t.outerHeight()
            t.css('height', 0)
            var n = s / 2
            a._animate(
              e,
              'slide',
              o || 400,
              n,
              function (e, t) {
                !(function (e, t, s, n) {
                  if (s != null && n != null) {
                    var i = e ? n : t - n
                    s.style.height = i + 'px'
                  }
                })(i, s, e, t)
              },
              r
            )
          }
        })
      }),
      (this.slideDown = function (e, t) {
        this.css('display', 'block'), this._slide(!1, e, t)
      }),
      (this.slideUp = function (e, t) {
        this._it(function (e) {
          var t = u(e)
          t.css('height', t.outerHeight())
        }),
        this._slide(!0, e, t)
      }),
      (this.animateScrollTop = function (i, o) {
        var a = this
          ;(o = o || 400),
        this._it(function (e) {
          var t = e.scrollTop,
            s = Math.abs(t - i)
          if (
            (u._clearAnimation(e, 'scrollTop'),
              s < 1 || o == 0 || u.prefersReducedMotion())
          ) {
            e.scrollTop = i
          } else {
            var n = s / 2
            a._animate(
              e,
              'scrollTop',
              o || 400,
              n,
              function (e, t, s, n) {
                s.scrollTop = e <= t ? e + (Math.abs(e - t) - n) : t + n
              }.bind(this, t, i)
            )
          }
        })
      }),
      (this.animateTop = function (a, r) {
        var l = this,
          c = function (e, t) {
            u(t).css('top', e)
          }.bind(this, a)
        this._it(function (e) {
          if (
            (u._clearAnimation(e, 'positionTop'),
              r == 0 || u.prefersReducedMotion())
          ) {
            c(e)
          } else {
            var t,
              s,
              n = u(e),
              i = parseFloat(n.css('top'))
            t =
                a.indexOf('%') !== 0
                  ? ((s =
                      n.css('position') == 'fixed'
                        ? window.innerHeight
                        : parseFloat(n.parent().css('height'))),
                    parseFloat(a) / 100 * s)
                  : parseFloat(a)
            var o = Math.abs(i - t) / 2
            l._animate(
              e,
              'positionTop',
              r || 400,
              o,
              function (e, t, s, n) {
                var i
                e <= t
                  ? ((i = n), e < 0 && (i *= -1))
                  : (i = t < 0 ? t + n : n + e),
                u(s).css('top', i + 'px')
              }.bind(this, i, t),
              c
            )
          }
        })
      }),
      (this.highlight = function (t, c) {
        return this.length && t && t.length && t.length > 2
          ? this._it(function (e) {
            !(function e (t, s) {
              if (u(t).parents('.' + c).length !== 0) return 1
              var n = 0
              if (t.nodeType == 3) {
                var i = t.data.toUpperCase().indexOf(s)
                if (
                  (i -=
                        t.data.substr(0, i).toUpperCase().length -
                        t.data.substr(0, i).length) >= 0
                ) {
                  var o = document.createElement('span')
                  o.className = c
                  var a = t.splitText(i),
                    r = (a.splitText(s.length), a.cloneNode(!0))
                  o.appendChild(r), a.parentNode.replaceChild(o, a), (n = 1)
                }
              } else if (t.nodeType == 1 && t.childNodes && !/(script|style)/i.test(t.tagName)) for (var l = 0; l < t.childNodes.length; ++l) l += e(t.childNodes[l], s)
              return n
            })(e, t.toUpperCase())
          })
          : this
      })
    }

    function n (e) {
      return (n =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (e) {
            return typeof e
          }
          : function (e) {
            return e &&
                typeof Symbol === 'function' &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
              ? 'symbol'
              : typeof e
          })(e)
    }
    var c = function t (s) {
      var n = !1
      try {
        n = s instanceof Window || s === window
      } catch (e) {
        n = window.constructor ? s instanceof window.constructor : s === window
      }
      if (typeof s !== 'string') {
        return s instanceof Node ||
          s === document ||
          (void 0 !== s && s.appendChild && s.cloneNode)
          ? new i([s])
          : s instanceof Array ||
            s instanceof HTMLCollection ||
            s instanceof NodeList
            ? s instanceof Array &&
              s.reduce(function (e, t) {
                return e && typeof t === 'string'
              }, !0)
              ? new i(
                s.map(function (e) {
                  return t.parseHTML(e)
                })
              )
              : new i(s)
            : new i(n ? [s] : s instanceof i ? s.get() : [])
      }
      var e = t.parseHTML(s)
      return e.length === 0 ? new i(t.querySelectorAll(s)) : new i(e)
    }
    ;(c._animations = {}),
    (c._callbacksByName = {}),
    (c._animationNodeFlag = 0),
    (c._notifyAnimation = function (e, t, s) {
      e.sxQueryAnimationFlag ||
          ((e.sxQueryAnimationFlag = c._animationNodeFlag),
            c._animationNodeFlag++,
            (c._animations[e.sxQueryAnimationFlag] = {})),
      (c._animations[e.sxQueryAnimationFlag][t] = s)
    }),
    (c._clearAnimation = function (e, t) {
      var s = e.sxQueryAnimationFlag
      void 0 !== s &&
          void 0 !== c._animations[s] &&
          t in c._animations[s] &&
          c._stopAnimation(c._animations[s][t])
    }),
    (c._requestAnimation = function (e) {
      return (
        (window.requestAnimationFrame && requestAnimationFrame(e)) ||
          setTimeout(e, 16)
      )
    }),
    (c._stopAnimation = function (e) {
      ;(window.cancelAnimationFrame && window.cancelAnimationFrame(e)) ||
          clearTimeout(e)
    }),
    (c.inArray = function (e, t) {
      return t.indexOf(e)
    }),
    (c.each = function (e, s) {
      if (e instanceof Array) {
        e.forEach(function (e, t) {
          s && typeof s === 'function' && s(t, e)
        })
      } else {
        var t = 0
        for (var n in e) {
          e.hasOwnProperty &&
              e.hasOwnProperty(n) &&
              (s && typeof s === 'function' && s(n, e[n], t), t++)
        }
      }
      return e
    }),
    (c.indexInNodeList = function (e, t) {
      for (var s = 0; s < t.length; s++) if (t[s] == e) return s
      return -1
    }),
    (c.createCookie = function (e, t, s) {
      var n
      if (s) {
        var i = new Date()
        i.setTime(i.getTime() + 24 * s * 60 * 60 * 1e3),
        (n = '; expires=' + i.toGMTString())
      } else n = ''
      document.cookie =
          encodeURIComponent(e) + '=' + encodeURIComponent(t) + n + '; path=/'
    }),
    (c.readCookie = function (e) {
      for (
        var t = encodeURIComponent(e) + '=',
          s = document.cookie.split(';'),
          n = 0;
        n < s.length;
        n++
      ) {
        for (var i = s[n]; i.charAt(0) === ' ';) i = i.substring(1, i.length)
        if (i.indexOf(t) === 0) {
          return decodeURIComponent(i.substring(t.length, i.length))
        }
      }
      return null
    }),
    (c.linkOpensInNewTab = function (e) {
      return (
        e.ctrlKey ||
          e.which == 2 ||
          e.button == 4 ||
          (e.target && e.target.target && e.target.target == '_blank')
      )
    }),
    (c.matchesMediaQuery = function (e, t) {
      if (window.matchMedia) {
        var s =
            e == 'max' ? '(max-width: ' + t + 'px)' : '(min-width: ' + t + 'px)'
        return window.matchMedia(s).matches
      }
      var n =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
      return e == 'max' ? n <= parseInt(t) : n >= parseInt(t)
    }),
    (c.parseHTML = function (e) {
      var t = document.implementation.createHTMLDocument('')
      t.body.innerHTML = e
      for (var s = [], n = 0; n < t.body.children.length; n++) {
        s.push(document.importNode(t.body.children[n], !0))
      }
      return s
    }),
    (c.extend = function (e) {
      for (var t = e || {}, s = 1; s < arguments.length; s++) {
        if (arguments[s]) {
          for (var n in arguments[s]) {
            arguments[s].hasOwnProperty(n) &&
                void 0 !== arguments[s][n] &&
                (c.isObject(t[n]) && c.isObject(arguments[s][n])
                  ? (t[n] = c.extend(t[n], arguments[s][n]))
                  : (t[n] = arguments[s][n]))
          }
        }
      }
      return t
    }),
    (c.isObject = function (e) {
      return void 0 !== e && n(e) == 'object' && !(e instanceof Array)
    }),
    (c.ajax = function (e) {
      var t = (e = e || {}).method || 'GET',
        s = e.dataType,
        n = e.url,
        i = e.success || function () {},
        o = e.error || function () {},
        a = 'XDomainRequest' in window,
        r = a ? new XDomainRequest() : new XMLHttpRequest()
      r.open(t, a ? n.replace('https://', '//') : n, !0),
      (r.onload = function () {
        if (a || (r.status >= 200 && r.status < 400)) {
          var t = r.responseText
          if (!s || s === 'json') {
            try {
              i(JSON.parse(t))
            } catch (e) {
              console.warn(e), i(t)
            }
          }
        }
      }),
      (r.onerror = function () {
        o(r.status, r.statusText)
      })
      var l = function () {
        try {
          if (t !== 'POST') r.send()
          else {
            var s = ''
            c.each(e.data, function (e, t) {
              s += e + '=' + t + '&'
            }),
            s.length > 0 && (s = s.substring(0, s.length - 1)),
            r.setRequestHeader(
              'Content-Type',
              'application/x-www-form-urlencoded; charset=UTF-8'
            ),
            r.send(s)
          }
        } catch (e) {
          o(r.status, r.statusText, e)
        }
      }
      a ? setTimeout(l, 0) : l()
    }),
    (c.get = function (e, t, s, n) {
      c.ajax({
        url: e,
        success: t,
        error: s,
        dataType: n
      })
    }),
    (c.post = function (e, t, s, n) {
      c.ajax({
        url: e,
        success: s,
        dataType: n,
        method: 'POST',
        data: t
      })
    }),
    (c.grep = function (e, t) {
      for (var s = [], n = 0; n < e.length; n++) t(e[n]) && s.push(e[n])
      return s
    }),
    (c.querySelectorAll = function (e, t) {
      t = t || document
      var s = []
      if (
        e.indexOf('#') === 0 &&
          e.indexOf(' ') == -1 &&
          e.indexOf('.') == -1 &&
          e.indexOf(':') == -1 &&
          e.indexOf('>') !== -1
      ) {
        var n = t.getElementById
          ? t.getElementById(e.replace('#', ''))
          : t.querySelector(e)
        return n && s.push(n), s
      }
      if (e.indexOf(':first') !== -1 || e.indexOf(':visible') !== -1) {
        for (var i = e.split(' '), o = 0; o < i.length; o++) {
          var a = i[o],
            r = !1,
            l = !1
          a.indexOf(':first') !== -1
            ? ((r = !0), (a = a.replace(':first', '')))
            : a.indexOf(':visible') !== -1 &&
                ((l = !0), (a = a.replace(':visible', ''))),
          (s = s.length === 0 ? c(t).find(a) : s.find(a)),
          r && s.length > 0
            ? (s = c(s[0]))
            : l &&
                  s.length > 0 &&
                  (s = s.filter(function (e) {
                    return c(e).isVisible()
                  }))
        }
        s = s.get()
      } else e && (s = t.querySelectorAll(e))
      return s
    }),
    (c.prefersReducedMotion = function () {
      return (
        window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }),
    (c.srOnlyCss =
        'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0')
    var o = {
      set: function (e, t, s) {
        return (i.prototype[t] = s), !0
      }
    }
    try {
      c.fn = new Proxy({}, o)
    } catch (e) {
      c.fn = i.prototype
    }
    var u = (t.a = c)
  },
  function (e, t, s) {
    'use strict'
    t.a = {
      ICON:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
    }
  },
  function (e, t, s) {
    'use strict'
    var Ve = s(0),
      Xe = s(1)
    t.a = function () {
      var k,
        O,
        S,
        C,
        j,
        I,
        T,
        A,
        B,
        M,
        R,
        L,
        P,
        N,
        D,
        H,
        b = -1,
        F = '',
        z = '',
        E = -80,
        v = [],
        Q = !0,
        U = 300,
        _ = '',
        q = 2,
        m = [],
        G = 'all',
        f = -1,
        i = void 0,
        W = '',
        Y = !1,
        V = [],
        X = [],
        Z = void 0,
        J = void 0,
        K = !0,
        $ = void 0,
        ee = void 0,
        te = !0,
        se = !0,
        ne = void 0,
        ie = void 0,
        oe = void 0,
        ae = void 0,
        re = void 0,
        le = void 0,
        ce = void 0,
        de = !0,
        ue = void 0,
        x = {},
        fe = !1,
        he = void 0,
        pe = 'h4',
        ge = '',
        h = void 0,
        be = 'Search suggestions are hidden',
        ve = 'No search suggestions',
        me = '#COUNT# search suggestions shown',
        xe = '#COUNT# search suggestion shown',
        we =
          'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.',
        ye = void 0,
        ke = void 0,
        Oe = !0,
        Se = void 0,
        Ce = void 0,
        je = void 0,
        Ie = !0,
        Te = !1,
        Ae = void 0,
        w = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;'
        }

      function Be (e) {
        if (void 0 !== (e = e || window.event)) {
          var t = e.keyCode || e.which
          void 0 !== t && t === 0 && void 0 !== h && ((t = h), (h = void 0))
          var s = Qe().val()
          ;(t === 27 || t === 13 || (s.length < q && void 0 === $)) &&
            (Me(e),
              t === 13 &&
              void 0 !== B &&
              b === -1 &&
              (Ee() &&
                void 0 !== Se &&
                !1 === de &&
                Object(Ve.a)(Se).css('z-index', '9999999'),
                B.call(
                  this,
                  s,
                  void 0,
                  Ee() && !1 === de
                    ? function () {
                      Ge(), void 0 !== Se && Object(Ve.a)(Se).css('z-index', '')
                    }
                    : void 0
                ),
                !1 !== de && Ge()),
              (b = -1))
        } else Me(e), (b = -1)
      }

      function Me (e) {
        var t = Object(Ve.a)('#unibox-suggest-box')
        if (Ie) {
          k.attr('aria-expanded', 'false')
          var s = Object(Ve.a)('#unibox-status-message'),
            n = be
          s.text() !== n && s.text(n),
          k.removeAttribute('aria-activedescendant')
        }
        if (void 0 !== P && t.hasClass('uniboxActive')) {
          try {
            P.call(this, e, k.val(), !1)
          } catch (e) {
            console.log(e)
          }
        }
        t.removeClass('uniboxActive'), Ee() || t.slideUp(U), p()
      }

      function Re (s, n) {
        var i = null
        return function () {
          var e = this,
            t = arguments
          clearTimeout(i),
          (i = window.setTimeout(function () {
            s.apply(e, t)
          }, n || 50))
        }
      }

      function y (a, e) {
        if (!Q || void 0 === a || void 0 === e) return a
        var t = e
          .replace(/[^a-zA-Z0-9Ã¤Ã¶Ã¼Ã„Ã–ÃœÃŸ]|\s+|\r?\n|\r/gim, ' ')
          .replace(/[^a-zA-Z0-9Ã¤Ã¶Ã¼Ã„Ã–ÃœÃŸ]/g, ' ')
          .split(' ')
        t.sort(function (e, t) {
          return t.length - e.length
        })
        var r = {}
        Ve.a.each(t, function (e, t) {
          if (!(t.length < 1)) {
            var s = a.match(
              new RegExp('((' + t + ')(?!#<##|-\\d+#<##))(?!.*\\1)', 'gi')
            )
            if (s != null) {
              for (var n = 0; n < s.length; n++) {
                var i = s[n],
                  o = i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
                ;(a = a.replace(
                  new RegExp('(' + o + ')(?!#<##|-\\d+#<##)', 'g'),
                  '##>#' + e + '-' + n + '#<##'
                )),
                (r['##>#' + e + '-' + n + '#<##'] =
                    '<span class="unibox-highlight">' + i + '</span>')
              }
            }
          }
        })
        for (var s = Object.keys(r).reverse(), n = 0; n < s.length; n++) {
          var i = s[n],
            o = r[i]
          a = a.replace(new RegExp(i, 'gi'), o)
        }
        return a
      }

      function Le (e) {
        return e.replace(/[ "Â§$%&/(){}+*,.;|]/g, '_').toLowerCase()
      }

      function Pe (r) {
        var a = Ue(),
          e = Object(Ve.a)('#unibox-special-searchbox')
        if (f !== 13 && void 0 !== r && r.hasOwnProperty('suggests')) {
          var t = Qe().val(),
            h = String(t).replace(/[&<>"'\/]/g, function (e) {
              return w[e]
            })
          a.html(''), Object(Ve.a)('#unibox-suggest-box-special').html('')
          var p = !1
          if (Oe || !Ve.a.matchesMediaQuery('max', 767)) {
            var s = !1,
              l = Object.keys(r.suggests)
            V &&
              V.length > 0 &&
              ((l = V),
                Ve.a.each(Object.keys(r.suggests), function (e, t) {
                  Ve.a.inArray(t, l) < 0 && l.push(t)
                }))
            var g = 0
            Ee()
              ? e.removeAttribute('aria-activedescendant')
              : k.removeAttribute('aria-activedescendant'),
            Ve.a.each(l, function (e, u) {
              var t = r.suggests[u]
              if (!t || t.length === 0) return !0
              var n = 0
              Ve.a.each(l, function (e, t) {
                var s = r.suggests[t]
                if (!s || u === t || s.length === 0) return !0
                n += s.length
              }),
              n > 0 && u == '_' && (u = Ce._ || '_')
              var s = Le(u),
                i = ''
              s != '_' &&
                  (i =
                    'aria-labelledby="unibox-suggest-cluster-heading-' +
                    s +
                    '"')
              var f = Object(Ve.a)(
                '<section class="unibox-suggest-cluster unibox-suggest-' +
                    s +
                    ' unibox-' +
                    t.length +
                    '-entries ' +
                    (n === 0 ? 'unibox-single-suggestion-block' : '') +
                    '" ' +
                    i +
                    '></section>'
              )
              if (u.replace(/_/, '').length > 0 && t.length > 0) {
                var o = u
                if (
                  (o in Ce && void 0 === (o = Ce[o]) && (o = ''),
                    o.length > 0)
                ) {
                  var a = Object(Ve.a)(
                    '<' +
                        pe +
                        ' class="unibox-suggest-heading" id="unibox-suggest-cluster-heading-' +
                        s +
                        '">' +
                        o +
                        '</' +
                        pe +
                        '>'
                  )
                  f.append(a)
                }
              }
              Ve.a.each(t, function (e, c) {
                var t =
                    '<div class="unibox-selectable" aria-selected="false" role="option">'
                if (void 0 !== c.image && c.image !== null && K) {
                  var s =
                      c.image.length === 0 && C
                        ? C
                        : c.image.length === 0 ||
                          c.image.indexOf('/') === 0 ||
                          c.image.indexOf('http') === 0
                          ? c.image
                          : z + c.image
                  t +=
                      '<div class="unibox-selectable-img-container"><img src="' +
                      s +
                      '"'
                  var n = new Image()
                    ;(n.src = s),
                  n.complete ||
                        (t +=
                          ' style="display: none;" onload="this.style.display=null;"'),
                  (t +=
                        ' alt aria-hidden="true" role="presentation"/></div>')
                }
                if (
                  (c.link != null && c.link != ''
                    ? ((t +=
                          '<a class="uniboxSearchContent" href="' +
                          c.link +
                          '">'),
                      (t += y(c.name, h)),
                      (t += '</a>'))
                    : c.name != null &&
                        c.name != '' &&
                        (t +=
                          '<span class="uniboxSearchContent">' +
                          y(c.name, h) +
                          '</span>'),
                    c.content != null &&
                      c.content != '' &&
                      (t +=
                        '<p class="unibox-result-content">' +
                        y(c.content, h) +
                        '</p>'),
                    c.suggestionHtml != null && c.suggestionHtml != '')
                ) {
                  t +=
                      '<span class="uniboxSearchContent">' +
                      c.suggestionHtml +
                      '</span>'
                } else if (c.html != null) return
                var d = !1,
                  i = void 0,
                  o = function (e, t) {
                    if (void 0 === e || e.length === 0) return ''
                    var s = e.match(/#(.*?)#/gi)
                    if (s !== null) {
                      for (var n = 0; n < s.length; n++) {
                        var i = s[n]
                        if (void 0 !== i && i.length !== 0) {
                          var o = i.replace(/#/g, '')
                          if (void 0 === (t = void 0)) {
                            for (var a = 0; a < c.dataPoints.length; a++) {
                              var r = c.dataPoints[a]
                              if (r.key == o) {
                                t = r.value
                                break
                              }
                            }
                          }
                          if (void 0 !== t) {
                            var l = new RegExp(i, 'g')
                            e = e.replace(l, t)
                          } else d = !0
                        }
                      }
                    }
                    return e
                  }
                if (void 0 !== T) {
                  var a = {},
                    r = c.dataPoints.reduce(function (e, t) {
                      return (
                        void 0 !== T[t.key] &&
                            (void 0 === e[t.key] && (e[t.key] = []),
                              e[t.key].push(o(T[t.key].html, t.value)),
                              (a[t.key] = !0)),
                        e
                      )
                    }, {})
                  i = Object.keys(a)
                    .sort(function (e, t) {
                      var s =
                            void 0 !== T[e].position
                              ? parseInt(T[e].position)
                              : -1,
                        n =
                            void 0 !== T[t].position
                              ? parseInt(T[t].position)
                              : -1
                      return s === n
                        ? 0
                        : s === -1 ? 1 : n === -1 ? -1 : s - n
                    })
                    .reduce(function (e, t) {
                      return e.push(r[t].join('')), e
                    }, [])
                    .join('')
                } else I != null && I.match(/#(.*?)#/gi) != null && (i = o(I))
                void 0 !== i &&
                    (d && (i = i.replace(/#(.*?)#/gi, '')),
                      (t += '<div class="unibox-extra">' + i + '</div>')),
                (t += '<div class="unibox-ca"></div></div>'),
                void 0 !== A && (t = A.call(this, t, u, e, c))
                var l = Object(Ve.a)(t)
                f.append(l), (p = !0), g++
              }),
              Ue().append(f)
            })
            var n = ve
            if (g > 0) {
              if (void 0 !== ke && !Ee()) {
                var i = Object(Ve.a)(
                  "<button class='unibox-show-all unibox-selectable'><span>" +
                    ke +
                    '</span><i>' +
                    Xe.a.ICON.replace(/#FILL#/g, je)
                      .replace('width="24"', 'width="16"')
                      .replace('height="24"', 'height="16"') +
                    '</i></button>'
                )
                i.on('click', function (e) {
                  B.call(this, Qe().val(), i.get()[0])
                }),
                Ue().append(i)
              }
              n = (g > 1 ? me : xe).split('#COUNT#').join(g)
            }
            var o = Object(Ve.a)('#unibox-status-message')
            o.text() !== n && o.text(n),
            void 0 !== N && typeof N === 'function' && N(a, r)
            var c = Ee() ? Object(Ve.a)('#unibox-special') : O
            if (
              ((v = c.find('.unibox-selectable')),
                X &&
                X.length > 0 &&
                ((v = []),
                  Ve.a.each(X, function (e, t) {
                    v = v.concat(
                      c
                        .find(
                          '.unibox-suggest-' + Le(t) + ':first .unibox-selectable'
                        )
                        .get()
                    )
                  }),
                  Ve.a.each(
                    Ve.a.grep(Object.keys(r.suggests), function (e) {
                      if (X.indexOf(e) < 0) return !0
                    }),
                    function (e, t) {
                      v = v.concat(
                        c
                          .find(
                            '.unibox-suggest-' +
                            Le(t) +
                            ':first .unibox-selectable'
                          )
                          .get()
                      )
                    }
                  )),
                (b = -1),
                Object(Ve.a)(v).click(function (e) {
                  e.preventDefault(), e.stopPropagation()
                  var t = Qe().val(),
                    s = Object(Ve.a)(this)
                      .find('.uniboxSearchContent:first')
                      .text(),
                    n =
                    void 0 !== ke &&
                    (Object(Ve.a)(e.target).hasClass('unibox-show-all') ||
                      Object(Ve.a)(e.target).parents('.unibox-show-all')
                        .length !== 0)
                  n || Qe().val(s)
                  var i = void 0
                  try {
                    i = Object(Ve.a)(this)
                      .find('a:first')
                      .attr('href')
                  } catch (e) {}
                  if (M != null && !n) {
                    try {
                      if (void 0 !== D.select) {
                        var o = Ue(),
                          a = Qe(),
                          r = Ue().find('.unibox-selectable')
                        D.select(
                          a.get()[0],
                          o.get()[0],
                          e.target,
                          t,
                          r,
                          Ve.a.indexInNodeList(this, r.get()) + 1,
                          i
                        )
                      }
                      M.call(this, s, i, e.ctrlKey, t)
                    } catch (e) {
                      console.log(e)
                    }
                  }
                  e.ctrlKey || (Be(), Me(e), Ge())
                }),
                v.mousedown(function (e) {
                  fe = !0
                }),
                v.mouseup(function (e) {
                  fe = !1
                }),
                O.find('.unibox-selectable .unibox-extra').click(function (e) {
                  e.stopPropagation()
                }),
                r.words != null && !Ee())
            ) {
              r.words.length > 0 &&
                _.length > 0 &&
                (G == 'all' || G == 'bottom') &&
                (a.append('<' + pe + '>' + _ + '</' + pe + '>'), (p = !0))
              var d = []
              Ve.a.each(r.words, function (e, t) {
                ;(G != 'all' && G != 'bottom') ||
                  (t.overlayImage != null &&
                  t.overlayImage != null &&
                  t.overlayImage.length > 0
                    ? a.append(
                      '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                          z +
                          t.overlayImage +
                          '" style="background-image: url(\'' +
                          z +
                          t.image +
                          '\');background-size: 75%;background-repeat: no-repeat;background-position: center;">'
                    )
                    : t.image != null &&
                      t.image != null &&
                      t.image.length > 0 &&
                      a.append(
                        '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                          z +
                          t.image +
                          '">'
                      ))
                var s = O.find('#unibox-invisible')
                if (
                  (s.css('padding', k.css('padding')),
                    s.html(
                      h.replace(
                        new RegExp(t.name, 'gi'),
                        '<span>' + t.name + '</span>'
                      )
                    ),
                    (G != 'all' && G != 'top') || Ve.a.inArray(t.image, m) != -1)
                ) {
                  Ve.a.inArray(t.image, m) > -1 && d.push(t.image)
                } else {
                  var n = O.find('#unibox-invisible span')[0]
                  if (
                    n != null &&
                    t.name.length > 0 &&
                    t.image != null &&
                    t.image != null &&
                    t.image.length > 0
                  ) {
                    var i = Object(Ve.a)(n).position().left,
                      o = Object(Ve.a)(
                        '<div class="unibox-ivf"><img  alt aria-hidden="true" role="presentation" src="' +
                          z +
                          t.image +
                          '" alt="' +
                          t.name +
                          '"></div>'
                      )
                    o.css('left', Ne().left + i - 10),
                    o.css('top', Ne().top - k.outerHeight() + E),
                    O.append(o),
                    setTimeout(function () {
                      O.find('.unibox-ivf')
                        .find('img')
                        .addClass('l')
                    }, 10),
                    d.push(t.image)
                  }
                }
              }),
              (m = d)
            }
            Fe() || Ee()
              ? Ve.a.each(
                Ue()
                  .find('img')
                  .get(),
                function (e, t) {
                  var s = t.src,
                    n = new Image()
                    ;(n.onerror = function () {
                    Object(Ve.a)(t).hide()
                  }),
                  (n.src = s)
                }
              )
              : Ue()
                .find('img')
                .remove(),
            ze(),
            J == null || p || ((s = p = !0), a.append(J))
            var u = function () {
              void 0 !== D.show &&
                D.show(
                  Object(Ve.a)('#unibox-special-searchbox').hasClass('active')
                    ? Object(Ve.a)('#unibox-special-searchbox').get()[0]
                    : k.get()[0],
                  a.get()[0],
                  a.find('.unibox-selectable').get()[0],
                  t,
                  a.find('.unibox-selectable')
                )
            }
            p
              ? (Ie && k.attr('aria-expanded', 'true'),
                a.isVisible()
                  ? (a.addClass('uniboxActive'), ze())
                  : Ee() ||
                    (Fe()
                      ? a.slideDown(U, function () {
                        a.addClass('uniboxActive'), ze(), u()
                      })
                      : (a.css('display', 'block'),
                        a.addClass('uniboxActive'),
                        ze(),
                        u())),
                Ee() && u(),
                ee && !s && a.append(ee))
              : (Object(Ve.a)('#unibox-status-message').text(ve), Be(), We()),
            void 0 !== he && typeof he === 'function' && he.call(this, p)
          }
        } else Be()
      }

      function Ne () {
        return {
          left: k.offset().left - O.offset().left,
          top: k.offset().top - O.offset().top + k.outerHeight()
        }
      }

      function p () {
        ;(m = []), O.find('.unibox-ivf').remove()
      }

      function De (e) {
        if (
          ((h = e.keyCode || e.which),
            k.val().length <= 1 && p(),
            D.change &&
            setTimeout(function () {
              D.change(
                Object(Ve.a)('#unibox-special-searchbox').hasClass('active')
                  ? Object(Ve.a)('#unibox-special-searchbox').get()[0]
                  : k.get()[0]
              )
            }, 1),
            R != null)
        ) {
          try {
            R.call(this, e, k.val())
          } catch (e) {
            console.log(e)
          }
        }
        if (
          e.keyCode == 37 ||
          e.keyCode == 38 ||
          e.keyCode == 39 ||
          e.keyCode == 40 ||
          e.keyCode == 13
        ) {
          if (e.keyCode == 38 && b > 0) b--
          else if (e.keyCode == 40) b++
          else if (e.keyCode == 38 && b <= 0) {
            b = (b != -1 ? b - 1 : b) + v.length
          } else if ((e.keyCode == 37 || e.keyCode == 39) && b > -1) {
            b %= v.length
            var t,
              s = Object(Ve.a)(v[b]).closest('.unibox-suggest-cluster')
            if (
              (e.keyCode == 37
                ? (t = s.prev())
                : e.keyCode == 39 && (t = s.next()),
                t.hasClass('unibox-suggest-cluster'))
            ) {
              var n = t.find('div.unibox-selectable')[0]
              b = Ue()
                .find('div.unibox-selectable')
                .index(n)
            }
          }
          if (v.length > 0 && b > -1) {
            b %= v.length
            var i = Object(Ve.a)(v)
            i.removeClass('active')
            var o = Object(Ve.a)(v[b])
            o.addClass('active'),
            i.attr('aria-selected', 'false'),
            i.attr('id', ''),
            o.attr('id', 'unibox-active'),
            o.attr('aria-selected', 'true'),
            o.length > 0 &&
                (Ee() ? Object(Ve.a)('#unibox-special-searchbox') : k).attr(
                  'aria-activedescendant',
                  'unibox-active'
                )
          }
          if (e.keyCode == 13) {
            e.preventDefault(), e.stopPropagation()
            var a = Ee() ? Object(Ve.a)('#unibox-special') : O
            if (M != null) {
              var r = Qe().val(),
                l = r,
                c = void 0
              if (b != -1) {
                if (
                  a.find('.unibox-selectable.active.unibox-show-all').length > 0
                ) {
                  B.call(this, r, a.find('.unibox-show-all').get()[0])
                } else {
                  ;(r = a
                    .find(
                      '.unibox-selectable.active .uniboxSearchContent:first'
                    )
                    .text()),
                  Qe().val(r)
                  try {
                    c = Object(Ve.a)(a.find('.unibox-selectable.active')[0])
                      .find('a')
                      .attr('href')
                  } catch (e) {}
                  if (void 0 !== D.select) {
                    var d = Ue(),
                      u = Qe(),
                      f = Ue().find('.unibox-selectable')
                    D.select(
                      u.get()[0],
                      d.get()[0],
                      e.target,
                      l,
                      f,
                      Ve.a.indexInNodeList(this, f.get()),
                      c
                    )
                  }
                  try {
                    M.call(this, r, c, e.ctrlKey, l)
                  } catch (e) {
                    console.log(e)
                  }
                }
              }
            } else {
              b != -1 &&
                ((window.location.href = Object(Ve.a)(
                  O.find('.unibox-selectable.active')[0]
                )
                  .find('a')
                  .attr('href')),
                  Ge())
            }
            return !1
          }
          b > -1 && e.preventDefault()
        } else {
          !(function () {
            for (
              var e = O.find('.unibox-ivf img').map(function (e) {
                  return Object(Ve.a)(e).attr('src')
                }),
                t = 0;
              t < e.length;
              t++
            ) {
              Ve.a.inArray(e[t].replace(z, ''), m) == -1 &&
                O.find('.unibox-ivf:has(img[src*="' + e[t] + '"])').remove()
            }
          })()
        }
      }

      function He (e) {
        if (f != 18) {
          if ((f = e.keyCode) != -1 || i == null) {
            if (
              e.keyCode != 27 &&
              !(
                ((e.keyCode == 37 || e.keyCode == 39) && b > -1) ||
                e.keyCode == 38 ||
                e.keyCode == 40 ||
                e.keyCode == 13 ||
                e.keyCode == 9
              )
            ) {
              var t = Qe().val()
              if ((f == 46 && t.length == 0 && p(), ye != null)) {
                var s = !0
                try {
                  s = ye.call(this, t, k.get()[0])
                } catch (e) {
                  console.log(e)
                }
                if (!s) return
              }
              if (
                t.length >= q &&
                F != '' &&
                (Oe || Ve.a.matchesMediaQuery('min', 768))
              ) {
                var n = (W = t)
                Ve.a.ajax({
                  usedQuery: t,
                  url: F + encodeURIComponent(t),
                  dataType: 'json',
                  success: function (e) {
                    n == W && Pe(e), (i = e)
                  }
                })
              } else We()
            }
          } else Pe(i)
        } else f = e.keyCode
      }

      function Fe () {
        if (Te) return !0
        if (se && Ve.a.matchesMediaQuery('max', 767)) return !0
        var e = k[0].getBoundingClientRect(),
          t = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          ),
          s = e.y || e.top
        return s <= t - s - e.height
      }

      function ze () {
        var e = Object(Ve.a)('#unibox-suggest-box'),
          t = (e.css('border-width') || '0px').replace('px', ''),
          s = Z != 'auto' && parseInt(Z) ? Z - 2 * t : k.outerWidth() - 2 * t
        e.css('min-width', s)
        var n,
          i,
          o,
          a = void 0
        if (
          ((a =
            Z != 'auto' && parseInt(Z)
              ? Z - 2 * t
              : Math.max(275 - 2 * t, k.outerWidth() - 2 * t)),
            e.css('max-width', a),
            (n = a),
            (i = k[0].getBoundingClientRect()),
            (o = Math.max(
              document.documentElement.clientWidth || 0,
              window.innerWidth || 0
            )),
            (i.x || i.left) + n > o)
        ) {
          var r = k[0].getBoundingClientRect(),
            l = (r.x || r.left) + r.width - a
          if (k.parent().css('position') == 'relative') {
            var c = k.parent()[0].getBoundingClientRect()
            l -= c.x || c.left
            var d = (c.x || c.left) + l
            l < 0 && d < 0 && (l -= d)
          } else l = Math.max(0, l)
          e.css('left', l)
        } else e.css('left', Ne().left)
        Fe()
          ? e.css('top', Ne().top)
          : e.css('top', Ne().top - e.outerHeight() - k.outerHeight()),
        g()
      }

      function Ee () {
        var e = Ve.a.matchesMediaQuery('max', ie),
          t = Object(Ve.a)('#unibox-special-searchbox').hasClass('active')
        return ne && (e || t)
      }

      function g () {
        var e = Object(Ve.a)('#unibox-special'),
          t = Object(Ve.a)('#unibox-suggest-box-special')
        if (e && t) {
          var s =
              (Ye() ? e.find('.unibox-special-logo').height() : 0) +
              e.find('.input-container').height(),
            n = 'calc(100% - ' + s + 'px)'
          t.css('height', n), t.css('top', s + 'px')
        }
      }

      function Qe () {
        var e = Object(Ve.a)('#unibox-special')
        return Ee()
          ? ((e && e.length !== 0) || _e(),
            Object(Ve.a)('#unibox-special-searchbox'))
          : k
      }

      function Ue () {
        return Ee()
          ? (Object(Ve.a)('#unibox-suggest-box-special').length === 0 && _e(),
            Object(Ve.a)('#unibox-suggest-box-special'))
          : Object(Ve.a)('#unibox-suggest-box')
      }

      function _e () {
        if (ne && !(Object(Ve.a)('#unibox-suggest-box-special').length > 0)) {
          var e =
              '<input type="search" id="unibox-special-searchbox" class="unibox-special-searchbox" value="' +
              k.val() +
              '" autocomplete="off" role="combobox" aria-describedby="unibox-controls-description" aria-owns="unibox-suggest-box-special" aria-controls="unibox-suggest-box-special"aria-expanded="false"/>',
            t =
              '<div id="unibox-suggest-box-special" class="unibox-special-box">' +
              oe +
              '</div>',
            s = Object(Ve.a)(
              '<section role="search" id="unibox-special" style="display: none;"></section>'
            ),
            n = Object(Ve.a)('<section class="input-container"></section>')
          if (ge) {
            var i =
              "<label style='" +
              Ve.a.srOnlyCss +
              "' class='unibox-sr-only' for='unibox-special-searchbox'>" +
              ge +
              '</label>'
            n.append(Object(Ve.a)(i))
          }
          var o = Object(Ve.a)(
            '<button class="unibox-special-close unibox-special-icon" aria-label="Close"></button>'
          )
          n.append(o)
          var a = Object(Ve.a)(e),
            r = k.attr('placeholder') || ae
          a.attr('placeholder', r), n.append(a)
          var l = Object(Ve.a)(
            '<button id="unibox-mobile-search-btn" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
          )
          n.append(l)
          var c = Object(Ve.a)(t)
          Ye() && s.append('<div class="unibox-special-logo">' + re + '</div>'),
          s.append(n),
          s.append(c)
          var d = Object(Ve.a)('body')
          if (
            (d.prepend(s),
              d.append(
                '<div id="unibox-special-hidden-content" style="overflow: hidden;"></div>'
              ),
              a.keydown(Re(He, j)),
              a.keydown(De),
              a.on('search', function (e) {
                He(e)
              }),
              B
                ? l.on('click', function () {
                  var e = a.val() || ''
                  void 0 !== Se &&
                    !1 === de &&
                    Object(Ve.a)(Se).css('z-index', '9999999'),
                  B.call(
                    this,
                    e,
                    l.get()[0],
                    !1 === de
                      ? function () {
                        Ge(function () {
                          void 0 !== Se &&
                                Object(Ve.a)(Se).css('z-index', '')
                        })
                      }
                      : void 0
                  ),
                  !1 !== de && Ge()
                })
                : !1 !== de && l.on('click', Ge),
              a.keyup(Be),
              a.keyup(function (e) {
                ;(e.keyCode || e.which) == 27 && Ge()
              }),
              o.on('click', Ge),
              ce &&
              c.scroll(function (e) {
                var t = e.target.scrollTop / 100 / 2
                t > 1 ||
                  t < 0 ||
                  ((t = Math.log1p(t)),
                    (function (e) {
                      var t = Object(Ve.a)('#unibox-special-searchbox'),
                        s = Object(Ve.a)('#unibox-special'),
                        n = x.box.height,
                        i = x.box.fontSize / n,
                        o = (n - 32) * e,
                        a = Math.round(n - o),
                        r = Math.round(i * a)
                      t.css('height', a), t.css('font-size', r)
                      var l = x.icons.width,
                        c = x.icons.height,
                        d = (l - 34) * e,
                        u = (c - 34) * e,
                        f = Math.round(l - d),
                        h = Math.round(c - u),
                        p = s.find('.unibox-special-icon')
                      p.css('height', h), p.css('width', f)
                      var g = x.box.marginLeft - (l - f),
                        b = 'calc(100% - 2*' + g + 'px)'
                      t.css('width', b),
                      t.css('margin-left', g),
                      t.css('margin-right', g)
                    })((t *= 1 / Math.log1p(1))),
                    g())
              }),
              le)
          ) {
            var u = parseFloat(U),
              f = Object(Ve.a)('#unibox-special-transition-background'),
              h =
                f.length > 0
                  ? f
                  : Object(Ve.a)(
                    '<div id="unibox-special-transition-background" style="background: #fff; position: fixed; width: 100%; height: 100%; z-index: 1000001; left: 100%; top: 0; display: none;"></div>'
                  )
            h.css('transition', 'transform ' + u + 'ms'),
            f.length === 0 && Object(Ve.a)('body').append(h)
          }
        }
      }

      function qe () {
        if (ne) {
          a() &&
            Object(Ve.a)(window).on('touchstart.iosPreventer', function (e) {
              var t = e.touches ? e.touches[0].screenY : e.screenY
              !t &&
                window.event &&
                (t = window.event.touches
                  ? window.event.touches[0].screenY
                  : window.event.screenY)
              var s = function (e, t) {
                Object(Ve.a)(window).off('touchmove.iosPreventer')
                var s = t.target || window.event.target,
                  n = t.touches ? t.touches[0].screenY : t.screenY
                for (
                  !n &&
                  window.event &&
                  (n = window.event.touches
                    ? window.event.touches[0].screenY
                    : window.event.screenY);
                  s !== document.body;

                ) {
                  var i = Object(Ve.a)(s),
                    o = i.css('overflow-y'),
                    a =
                      i.css('-webkit-overflow-scrolling') === 'touch' &&
                      (o === 'auto' || o === 'scroll'),
                    r = s.scrollHeight > s.offsetHeight
                  if (a && r) {
                    if (e <= n && s.scrollTop === 0) t.preventDefault()
                    else {
                      var l = i.height()
                      n <= e &&
                        s.scrollHeight - s.scrollTop === l &&
                        t.preventDefault()
                    }
                    return
                  }
                  s = s.parentNode
                }
                t.preventDefault()
              }.bind(this, t)
              Object(Ve.a)(window).on('touchmove.iosPreventer', s),
              Object(Ve.a)(window).on('touchend.iosPreventer', function () {
                Object(Ve.a)(window).off(
                  'touchmove.iosPreventer,touchend.iosPreventer'
                )
              })
            })
          var s = Object(Ve.a)('#unibox-special')
          ;(s && s.length !== 0) ||
            (_e(), (s = Object(Ve.a)('#unibox-special'))),
          (s.get()[0].scrollTop = 0)
          var n = Object(Ve.a)('#unibox-special-searchbox')
          n.addClass('active'),
          Ie && n.attr('aria-expanded', 'true'),
          n.val() == '' &&
              Object(Ve.a)('#unibox-suggest-box-special').html('')
          var e = function () {
              s.get()[0].scrollTop = 0
              var e = s.find('.unibox-special-icon')
              if (Ye()) {
                var t =
                  s.find('.unibox-special-logo').height() +
                  parseFloat(n.css('margin-top') || '0')
                e.css('top', t)
              }
              ce &&
                (e.css('width', ''),
                  e.css('height', ''),
                  n.css('height', ''),
                  n.css('width', ''),
                  n.css('margin-left', ''),
                  n.css('margin-right', ''),
                  n.css('font-size', ''),
                  Object(Ve.a)('#unibox-suggest-box-special').scrollTop(0),
                  (x.icons = {}),
                  (x.icons.width = parseFloat(e.css('width'))),
                  (x.icons.height = parseFloat(e.css('height'))),
                  (x.box = {}),
                  (x.box.height = parseFloat(n.css('height'))),
                  (x.box.marginLeft = parseFloat(n.css('margin-left'))),
                  (x.box.fontSize = parseFloat(n.css('font-size'))))
            },
            t = Object(Ve.a)(
              '#unibox-special ~ *:not(#unibox-special-transition-background):not(#unibox-special-hidden-content):not(.ss360-sr-only):not(.unibox-sr-only)'
            )
          t = t.filter(function (e) {
            return Object(Ve.a)(e).isVisible()
          })
          var i = Object(Ve.a)('#unibox-special-hidden-content')
          Object(Ve.a)('body').append(i),
          i.append(t),
          Object(Ve.a)('html, body').addClass('unibox-stretch'),
          le
            ? r(i, s, e, function () {
              n.focus()
            })
            : (i.hide(), s.show(), n.focus(), e())
        }
      }

      function Ge (e) {
        if (Ee()) {
          a() &&
            Object(Ve.a)(window).off(
              'touchstart.iosPreventer, touchmove.iosPreventer, touchend.iosPreventer'
            )
          var t = Object(Ve.a)('#unibox-special-searchbox')
          void 0 !== D.abandon &&
            Object(Ve.a)(this).hasClass('unibox-special-close') &&
            D.abandon(
              t.val(),
              Object(Ve.a)('#unibox-special .unibox-selectable').length,
              t.get()[0]
            ),
          Object(Ve.a)('#unibox-special').hide()
          var s = Object(Ve.a)('#unibox-special-searchbox').hasClass('active')
          t.removeClass('active'),
          t.attr('aria-expanded', 'false'),
          t.removeAttribute('aria-activedescendant')
          var n,
            i = Object(Ve.a)('#unibox-special-hidden-content').children()
          Object(Ve.a)('body').append(i),
          s &&
              (n = Object(Ve.a)('#unibox-special-searchbox')) &&
              k &&
              k.val(n.val())
          var o = function (e) {
            Object(Ve.a)('html, body').removeClass('unibox-stretch'),
            void 0 !== e && typeof e === 'function' && e(),
            void 0 !== ue && typeof ue === 'function' && ue()
          }.bind(this, e)
          le
            ? r(
              Object(Ve.a)('#unibox-special'),
              Object(Ve.a)(
                '#unibox-special ~ *:not(#unibox-special-transition-background)'
              ).filter(function (e) {
                return Object(Ve.a)(e).isVisible()
              }),
              void 0,
              o
            )
            : o()
        }
      }
      var t = void 0

      function a () {
        if (void 0 === t) {
          var e = Object(Ve.a)(
            "<div id='ios-bounce-test' style='-webkit-overflow-scrolling: touch;'></div>"
          )
          Object(Ve.a)('body').append(e),
          (t = !!e.css('-webkit-overflow-scrolling')),
          e.remove()
        }
        return t
      }

      function r (e, t, s, n) {
        var i = Object(Ve.a)('#unibox-special-transition-background')
        t.hide(),
        e.show(),
        i.show(),
        setTimeout(
          function (e) {
            e.addClass('move--left')
          }.bind(this, i),
          140
        ),
        setTimeout(
          function (e, t, s, n, i) {
            t.hide(),
            e.show(),
            n && n(),
            s.removeClass('move--left'),
            s.addClass('move--right'),
            setTimeout(
              function (e, t) {
                s.hide(),
                s.removeClass('move--left'),
                s.removeClass('move--right'),
                void 0 !== t && typeof t === 'function' && t()
              }.bind(this, s, i),
              parseFloat(U)
            )
          }.bind(this, t, e, i, s, n),
          parseFloat(U) + 140
        )
      }

      function We () {
        Ee() && Object(Ve.a)('#unibox-suggest-box-special').html(oe)
      }

      function Ye () {
        return re && re.length > 0
      }
      return {
        updateSuggests: function (e) {
          Pe(e)
        },
        updateSuggestUrl: function (e) {
          F = e
        },
        hideSuggestBox: function () {
          Be(), Ge()
        },
        setIvfImagePath: function (e) {
          ;(z = e).charAt(z.length - 1) != '/' && (z += '/')
        },
        changeInstantVisualFeedbackState: function (e) {
          G = e
        },
        render: function () {
          ze()
        },
        getText: function () {
          return Qe().val()
        },
        getSearchBox: function () {
          return k
        },
        init: function (e, t) {
          ;(k = e),
          (O = t.searchBoxContainer),
          (Q = t.highlight),
          (I = t.extraHtml),
          (T = t.dataPoints),
          (A = t.callbacks.line),
          (F = t.suggestUrl),
          (z = t.ivfImagePath),
          (E = t.ivfImageOffset),
          (C = t.missingErrorImage),
          (j = t.throttleTime),
          (U = t.animationSpeed),
          (q = t.minChars),
          (B = t.callbacks.enter),
          (M = t.callbacks.enterResult),
          (R = t.callbacks.type),
          (L = t.callbacks.focus),
          (P = t.callbacks.blur),
          (N = t.callbacks.suggestsBuilt),
          (D = t.trackingCallbacks || {}),
          (H = t.placeholder),
          (G = t.instantVisualFeedback),
          (_ = t.queryVisualizationHeadline),
          (Y = t.showDeleteAllButton),
          (K = t.showImagesSuggestions),
          (V = t.suggestOrder),
          (X = t.suggestSelectionOrder),
          (Z = t.maxWidth),
          (J = t.noSuggests),
          ($ = t.emptyQuerySuggests),
          (ee = t.showMoreResults),
          (te = t.disableEventPropagationHtml),
          (ye = t.callbacks.preSuggest),
          (ke = t.viewAllLabel),
          (Oe = void 0 === t.showOnMobile || t.showOnMobile),
          (Te = t.forceBelow),
          (Se = t.loaderSelector),
          (Ce = t.viewKeyMappings || {}),
          (je = t.themeColor),
          (se = t.mobileScrollOnFocus),
          (Ie = t.enabled)
          var s = t.specialMobileSuggest
          ;(ne = s.enabled),
          (ie = s.breakpoint || 768),
          (oe = s.placeholder || ''),
          (re = s.customTopHtml || ''),
          (le = s.animateTransitions && !Ve.a.prefersReducedMotion()),
          (ce = s.resizeSearchBoxOnScroll),
          (ae = s.searchBoxPlaceholder || 'Search'),
          (Ae = s.trigger),
          (de = void 0 === s.autoHide || s.autoHide),
          (ue = s.hiddenCallback),
          (he = t.callbacks.suggestChange)
          var n = t.accessibility
          if (
            ((pe = 'h' + Math.min(Math.max(1, n.headingLevel || 4), 6)),
              (ge = n.searchFieldLabel),
              (be = n.srSuggestionsHiddenText),
              (ve = n.srNoSuggestionsText),
              (me = n.srSuggestionsCountText),
              (xe = n.srOneSuggestionText),
              (we = n.srSuggestBoxControlDescription),
              k.attr('autocomplete', 'off'),
              ge &&
              (!k.attr('id') ||
                Object(Ve.a)("label[for='" + k.attr('id') + "']").length === 0))
          ) {
            k.attr('id') ||
              (window.uniboxCounter || (window.uniboxCounter = 0),
                window.uniboxCounter++,
                k.attr('id', 'unibox-search-box-' + window.uniboxCounter))
            var i = k.attr('id'),
              o =
                "<label style='" +
                Ve.a.srOnlyCss +
                "' class='unibox-sr-only' for='" +
                i +
                "'>" +
                ge +
                '</label>'
            k.parent().prepend(o)
          }
          if (Ie) {
            if (Object(Ve.a)('#unibox-controls-description').length === 0) {
              var a = we,
                r =
                  "<span id='unibox-controls-description' style='" +
                  Ve.a.srOnlyCss +
                  "' class='unibox-sr-only' tabindex='-1'>" +
                  a +
                  '</span>'
              k.parent().append(r)
            }
            if (Object(Ve.a)('#unibox-status-message').length === 0) {
              var l = Object(Ve.a)(
                '<span id="unibox-status-message" style="' +
                  Ve.a.srOnlyCss +
                  '" tabindex="-1" aria-live="polite" aria-atomic="true" role="status" class="unibox-sr-only">'
              )
              k.parent().append(l)
            }
            k.attr('role', 'combobox'),
            k.attr('aria-describedby', 'unibox-controls-description'),
            k.attr('aria-owns', 'unibox-suggest-box'),
            k.attr('aria-controls', 'unibox-suggest-box'),
            k.attr('aria-expanded', 'false')
          }
          Object(Ve.a)('#unibox-suggest-box').remove(),
          (S = Object(Ve.a)(
            '<div id="unibox-suggest-box" class="normal-suggest-box" role="listbox" aria-label="Search Suggestions"></div>'
          )),
          O.prepend(S),
          O.css('position') != 'absolute' && O.css('position', 'relative')
          var c = (S.css('border-width') || '0px').replace('px', '')
          S.css('min-width', k.outerWidth() - 2 * c),
          S.css('max-width', t.maxWidth - 2 * c),
          k.keydown(De),
          k.keydown(Re(He, j)),
          k.keyup(Be),
          k.focusout(function (e) {
            fe ||
                (Me(e),
                  P == null ||
                  Ee() ||
                  P.call(this, e, Object(Ve.a)(this).val(), !0))
          }),
          void 0 !== Ae &&
              Object(Ve.a)(Ae).click(function () {
                qe()
              })
          var d = t.hasMultipleSearchBoxes
          k.focus(function (e) {
            ;(e = e || window.event).stopPropagation()
            var t,
              s = Ee()
            if (s) {
              qe(),
              (t = Object(Ve.a)('#unibox-special-searchbox')),
              k && t.val(k.val())
            } else if (d) {
              var n = Object(Ve.a)(e.target).parent()
              n.length > 0 &&
                (n.find('#unibox-suggest-box').length === 0 ||
                  !(function (e) {
                    if (e.children) {
                      for (var t = 0; t < e.children.length; t++) {
                        if (
                          e.children[t].getAttribute('id') ==
                          'unibox-suggest-box'
                        ) {
                          return !0
                        }
                      }
                    }
                    return !1
                  })(n)) &&
                (n.prepend(Object(Ve.a)('#unibox-suggest-box')),
                  n.append(Object(Ve.a)('#unibox-invisible')))
            }
            if (Ie && !s && se && Ve.a.matchesMediaQuery('max', 767)) {
              var i =
                Object(Ve.a)(e.target).offset().top -
                Object(Ve.a)('body').offset().top
              Object(Ve.a)('html, body').animateScrollTop(i, 2 * U),
              Object(Ve.a)('#unibox-suggest-box').addClass(
                'unibox--fullwidth'
              )
            } else Object(Ve.a)('#unibox-suggest-box').removeClass('unibox--fullwidth')
            var o = Object(Ve.a)(this).val()
            if (
              (o.length > 0
                ? He({
                  keyCode: W === o ? -1 : -2
                })
                : $ != null && Pe($),
                void 0 !== L)
            ) {
              try {
                L.call(this, e, Object(Ve.a)(this).val())
              } catch (e) {
                console.log(e)
              }
            }
          }),
          S.mouseenter(function () {
            S.find('.unibox-selectable.active').removeClass('active')
          }),
          Object(Ve.a)('html').click(function (e) {
            try {
              if (
                e != null &&
                  Object(Ve.a)(e.target).attr('id') == k.attr('id')
              ) {
                return
              }
            } catch (e) {
              console.log(e)
            }
            S.hasClass('uniboxActive') && Me(e)
          }),
          k.keydown(function (e) {
            ;((e = e || window.event).keyCode || e.which) == 9 && Me(e)
          }),
          k.focusout(function (e) {
            fe ||
                ((e = e || window.event),
                  setTimeout(function () {
                    Object(Ve.a)(document.activeElement).parents(
                      '#unibox-suggest-box'
                    ).length === 0 && Me(e)
                  }, 10))
          }),
          te &&
              (k.click(function (e) {
                e.stopPropagation()
              }),
                S.click(function (e) {
                  e.stopPropagation()
                }))
          var u = k.attr('placeholder')
          ;(H = u && u.length > 0 ? u : H) &&
            H.length > 0 &&
            ('placeholder' in document.createElement('input') ||
              (k
                .focus(function () {
                  var e = Object(Ve.a)(this).attr('placeholder')
                  e &&
                    e.length > 0 &&
                    e != '' &&
                    Object(Ve.a)(this).val() == e &&
                    Object(Ve.a)(this)
                      .val('')
                      .removeClass('hasPlaceholder')
                })
                .blur(function () {
                  var e = Object(Ve.a)(this).attr('placeholder')
                  e &&
                    e.length > 0 &&
                    e != '' &&
                    (Object(Ve.a)(this).val() == '' ||
                      Object(Ve.a)(this).val() == e) &&
                    Object(Ve.a)(this)
                      .val(e)
                      .addClass('hasPlaceholder')
                }),
                k.val(H)),
              k.attr('placeholder', H)),
          Object(Ve.a)('#unibox-invisible').remove()
          var f = Object(Ve.a)(
            '<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>'
          )
          if ((O.append(f), Y)) {
            Object(Ve.a)('#unibox-dab-holder').remove()
            var h = Object(Ve.a)(
              '<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>'
            )
            O.append(h),
            Object(Ve.a)(h).mousedown(function (e) {
              return (
                (e || window.event).stopPropagation(),
                k.val(''),
                k.focus(),
                !1
              )
            }),
            k
              .focus(function () {
                k.val().length > 0 ? h.show() : h.hide()
              })
              .blur(function () {
                h.hide()
              })
              .keydown(function () {
                Object(Ve.a)(this).val().length > 0 && Object(Ve.a)(h).show()
              })
            var p = parseInt(
                k
                  .css('paddingTop')
                  .replace('px', '')
                  .trim()
              ),
              g = k.outerHeight(),
              b = parseInt(
                k
                  .css('borderTopWidth')
                  .replace('px', '')
                  .trim()
              ),
              v = k.css('boxShadow').match(/\d{1,3}px/g),
              m =
                v && v.length > 2 ? parseInt(v[2].replace('px', '').trim()) : 0
            h.height(g - 2 * b - m - p)
            var x = parseInt(
              k
                .css('paddingRight')
                .replace('px', '')
                .trim()
            )
            ;(x = x > 25 ? x : 25), k.css('paddingRight', x)
            var w =
                b +
                m +
                (k.offset().top -
                  k.parent().offset().top -
                  k.parent().scrollTop()),
              y =
                Math.abs(
                  k[0].getBoundingClientRect().left -
                    k.parent()[0].getBoundingClientRect().left
                ) +
                k.outerWidth() -
                h.outerWidth() -
                b -
                x
            h.css('top', w), h.css('left', y)
          }
          G == 'none' &&
            Object(Ve.a)('#unibox-invisible').css('display', 'none'),
          _e()
        }
      }
    }
  },
  function (e, t, s) {
    var n = s(4)
    e.exports = typeof n === 'string' ? n : n.toString()
  },
  function (e, t) {
    e.exports =
      '@charset "UTF-8";@-webkit-keyframes ss360-bi{0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(.9);transform:scale(.9)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes ss360-bi{0%{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05);transform:scale(1.05)}70%{-webkit-transform:scale(.9);transform:scale(.9)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes ss360-bo{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(.95);transform:scale(.95)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}to{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}}@keyframes ss360-bo{0%{-webkit-transform:scale(1);transform:scale(1)}25%{-webkit-transform:scale(.95);transform:scale(.95)}50%{opacity:1;-webkit-transform:scale(1.1);transform:scale(1.1)}to{opacity:0;-webkit-transform:scale(.3);transform:scale(.3)}}@-webkit-keyframes ss360-fid{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes ss360-fid{0%{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes sk-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}@keyframes sk-bounce{0%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px);transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg);transform:perspective(120px) rotateY(180deg)}to{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg);transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px);transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg);transform:perspective(120px) rotateY(180deg)}to{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg);transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}@-webkit-keyframes ss360-recording{0%{background-color:rgba(224,83,80,0)}50%{background-color:#e05350}to{background-color:rgba(224,83,80,0)}}@keyframes ss360-recording{0%{background-color:rgba(224,83,80,0)}50%{background-color:#e05350}to{background-color:rgba(224,83,80,0)}}.ss360-search-term-highlight{background-color:#b5f948;padding:0 3px}.ss360-highlight{font-weight:700}.ss360-hidden{display:none}.ss360-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.ss360-skip-link{border:1px solid #aaa;position:absolute;background:#fff;pointer-events:none;left:-999em;z-index:9999}.ss360-skip-link:focus{left:0}.ss360-ca{clear:both}.ss360-flex{display:flex;flex-direction:row}.ss360-flex--column{flex-direction:column}.ss360-flex--align-stretch{align-items:stretch}.ss360-flex--align-center{align-items:center}.ss360-flex--justify-center{justify-content:center}.ss360-flex--wrap{flex-wrap:wrap}.ss360-flex--nowrap{flex-wrap:nowrap}.ss360-close-button,.ss360-close-button:focus,.ss360-close-button:hover{-webkit-transform-origin:center;transform-origin:center;cursor:pointer;position:absolute;z-index:99999;top:8px;right:8px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAG0ElEQVR4nN2bT0wTWRzHf78ZaLUBS0Cx07Ba3YBmJ5YwPZhdTCAevKinPTRoYtRE1wRuKicT5bK7SVc8ccEEbxIPGw/owSVp8LQX2mpNd1NOYFbGgmR3goHMxPa3h85rCgz9+2ZAPrd50/nN+3773pv3F8FmZFlucrvdJwAgBAASAPjLPLIIACoAxHRdT6dSqc925g/tCNrT09OHiP2QF11OcDkWASBGRDOJROJ13ZnbBDcDQqGQREQXiWgAEZt5xS2GiFYRcRIRp2KxmMojZt0GhEIhKZfLDSDiJR4ZqhQieioIwmS9RtRlQE9PzwAA3LTrHy8HEa0CwHgikZisNUZNBnR3d3cJgnAfEU/U+mKeEFE6l8uNvH37dq7aZ8VqH1AU5QIi/oyI9TZu3EDEg4h4zu/3r6iqWpUJVRmgKMpNALiNiO6qcugAZp76JUkCVVVjlT5XsQGKotwHAEcbuhoJSZIkqapa0SezIgPMf/5rEM84UWlJKGuAoigXAOA2l2w5S0iSpMVybUJJA0zxD3jmymH6y5mwrQHd3d1dZmu/6xq8aiCi0OHDh//MZDIrVvct+wGyLDe5XK6pnerg8IaIVg3DuGg1sBKsHnC5XA/2ingAAERsdrlcD6zubakCZkfnqt2ZchpEDFi1BxuqwF4r+puxqgobqoDb7b60V8UD5KuC2+3e0J8pGCDLchMRDTifLWchogFZlpvYdcEAl8u1Y8Pachw5csTFK5bZIN5k18VV4CKvl3i9XvH8+fNeHrHC4XDb8+fPT4XD4TYe8UwKWkWAwhweNwMeP37cGQ6HJU3TjFQqtV5rnHA43DY8PBwAAOjt7W2pNx4DEd0+ny/98ePHBcFM6K83KCMSiRyVZbkZAGB4eDhw48aN9lriBIPB/UNDQx3FaUNDQx1er7fqOQwrmGYBAICI+nkEBQCYnZ3d0Nu6devWN5FI5Gg1MYLB4P6xsbEuj8fTwNLW1ta+DA4OzmmaluWRT6ZZNKe3uA11U6nUuqZpRm9vbwtLO3bsmKezs9M1PT2tlXu+lPhkMll38Wcgoru9vX1G9Pv95xDxB16BAWo3wSnxDEScFyVJOoeIp3gHr9YEp8WbzIt+v/8q1L96Y0kqlVr/8OHD2unTpw80NjYKAHkTzpw50xyNRv/TdZ0A8p/NR48efXvo0KHC0NsB8YCIhkBETeV/WjsvX77UBgcH59bW1r6wNFmWmycmJrq8Xq/o9XrFiYmJrkAg4GH3nRAPAEBETagoyqydL2FYFfH5+fk1AICdEM9wzAAAaxOKcVo8wDYTInaRTCbXN1cHxk6IB3DYAACAhYUFY2lpydicvrS0ZCwsLGxJtxtHDbBq8BiBQMDDGkYn8+SYAaXEM5gJwWBwv1P5EogobfdLthMfjUY/Xbt27a/iNiEQCHjGxsYcMYGI0gIi2roHp5T4u3fvLlg1jB6Pp8EJExDxs+0l4N69ex3biWfXyWRy/fLly3+zfgGAMyYQUVqA/I4sW4hEIkfPnj17sDhts3jG+/fvjevXr885bIIq5HK5itfSq6Ea8QxN07JWJjx58uQ7zlNiAACQy+ViYiaTWfH5fAM81wBrEc/QdZ1evXr1b19f34GWlpZGls5zSgwgv0bw5s2bUfYZ5FYK6hHPYCUhlUqtFqfznBIDUzObE5zhEdHr9YrHjx8v2eBViqZp2StXrsxFo9FPAPynxJhmEQCgtbV1URTFH+utBqz4njx5cl9HR8e+WsUXMz09rfl8PnF0dPQfXuMEc4nsl+XlZaOwNmjuAeI2NR4Oh9uePXtmuSa/C5iKx+MjAEVdYUQc5/mGXSx+g9aCAbFYTCWimR3JkYMQ0Uzx9toNgyFBEB46nyVn2axxwydFVdXPPp+vyY5Z4t0AET2Nx+PTxWlbhsOGYYxDfo/+XmPR1LaBLQaYuydGHMmSs4xYbZKy7FWpqqpKkgSQP/GxFxiPx+MvrG5s261UVTUm5V3YFVvi62AqHo+Pbnez5JSYrusPnZgxsgsiSuu6XvLLVnJgsby8bLS1tf0hiuL3iHiw1G93G0SUNgzjp3Knzio+McK7q2wzha5uOSoeWqqq+voraRMqFg9Q5YkRVVVf+3y+JgAI7LZN1OYBqt8TicSv1TxX86EpURR/A5uW1WtgMZvN3nHk0BQAQCaTWWltbZ1qaGhog52vElO6rt959+5dTZO7dR+cNEvDbXC+0xTLZrMPa/nXi+F2dFZRlBAAXAD7vxRTAPAiHo9zmcfkfnja3HF+EREHgF8bsUhEk4ZhTPE+TW7L6XGGeaA6RERd5inTSqtJjIjSiDiHiDFeB6Wt+B91omKdGqz3hAAAAABJRU5ErkJggg==") no-repeat;background-size:32px;background-color:transparent!important;box-sizing:border-box;border:none;width:64px;height:64px;background-position-x:16px;background-position-y:16px}.ss360-close-button:hover{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-name:rotate;animation-name:rotate;-webkit-animation-iteration-count:1;animation-iteration-count:1}#ss360Darken,#ss360Darken-input{background-color:rgba(0,0,0,.65)!important;width:100%;height:100%;position:fixed;top:0;left:0;cursor:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADo0lEQVRYhb1XP2gbZxR/7ztFR4OCWp2wfMa1RUF24BwLdF4aYxAatIjMovVQ0KAMhoJd2XO2DmrwEDzEg0d1Kh6yxSC0eckd2M4NFrVQPeQ4Lh6ubi/osPQ6VBKyIuVOspLfdu973/f73fv+/hA8QpKkgN/vlwFARsTFIWnvAEBpNBoVTdP+8TIuuiXIsiwSUZ6Ikoj4wKtgAHjVbDZ/Pzk5qY4lQJKkAM/zvwDAkxFIPwIRVRzHeTasItygYDweX/D5fL8h4uO7kAMAIGKU47jvI5HIW8Mwrj5q7w/Isiy2Wq3SiOV2BRFdM8Z+VBRF743fqoAkSQHG2AtEnJkkOQAAIvJEJAuC8No0TacTZ71JPM8//8QKn4SIRZ7nn/fGuhVIJBJ5uOOC84gZURRB13UFoL0G2lvt1Rcg7wIRnyiKojMAACLKf0nyXk5OkqSAz+f71a3D8vLyV5FI5J5hGDfDcoLBIFcqlR7Ozs7eOz4+djsJF0OhUInxPJ/0orhQKHy7t7e3kMlkgsPIDw4OFqLR6P3V1dWvg8HgwDOmFzzPJ7np6ek8Ikbdki8uLuxMJiOk0+mwZVmOpmkfett3d3e/W1paelCv1+1cLle1LKvpNiYRASeK4k+IGHZLNgzjRlGUv9Pp9DfJZDJERE1VVf8FACgWi/Nra2uhUcjbaGAikXjjMRkAbpe6XC6/BwBIpVLhMcgBAGBkAf0iAADGJQfoOwm9wrKsZq1WszvftVrNHod8bAHFYnG+U/Z6vW6nUqlwsVicH0sAEZ2P0mFra0vsnfNcLlcdVwQRnTMA0F0z28hms8L6+vqMaZqNzpxbltXM5XJVTdOuxxChc6IoCl4eHtlsVtjZ2Ynatn2zubn55+XlZfdKbTQadHh4eBWLxfypVCoci8X8R0dHlgcBfzDGWMWL1JWVlYBt2zcbGxvV09PTD4Nytre3/yqXy+91XXcGtfeDMVZBAIBEIvESAGS3DnNzc/7eP78jFFVVn3Z2wb6XHhMk73IyAABVVRUiqkxw8E+CiCqqqipdAQAAjuM8g/+NxefGuzYXAPQ8yUzTdKamphRETCMi/zmYiei61Wr9fHZ21t36t+5swzCuIpHIMSIuebkhRyQ/b7VahX6nNNAZtX3gy0m9kIno3HGcp4Pc0cBXi2majiAIrzmO8yPiozuSVxzHKQyzZq7mNB6PLzDG8oiYHJFbAYD9zmofBlcBHbQt2w/gwZ4j4n6/BRuG/wA9X65CnAC2oQAAAABJRU5ErkJggg==") 12 12,auto;z-index:999998}#ss360-searchbox-spinner{width:80px;height:80px;position:fixed;left:49.5%;top:49.5%;z-index:999999;display:none}.ss360-double-bounce1,.ss360-double-bounce2{width:100%;height:100%;border-radius:50%!important;background-color:#1c5d7d;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce 2s ease-in-out infinite;animation:sk-bounce 2s ease-in-out infinite}.ss360-double-bounce2{-webkit-animation-delay:-1s;animation-delay:-1s}.ss360-spinner-square{width:60px;height:60px;background-color:#1c5d7d;-webkit-animation:sk-rotateplane 1.2s ease-in-out infinite;animation:sk-rotateplane 1.2s ease-in-out infinite}.ss360-more-results{border:1px solid #1c5d7d;color:#1c5d7d;font-weight:700;padding:10px 20px;border-radius:12px;margin-bottom:25px;margin-left:auto;margin-right:auto;text-align:center;cursor:pointer;display:block;background:none;width:252px;max-width:100%;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-more-results:hover{color:#fff;background:#1c5d7d}#ss360-layer .content-group-heading{background-color:#1c5d7d;padding:5px;color:#fff;font-size:20px;margin-bottom:0;margin-top:0}section.ss360-group{margin-top:0;margin-bottom:0}section.ss360-group ul{padding-left:0;list-style:none}#ss360-custom-search{position:relative;max-width:calc(100% - 50px);padding:8px 0;margin-top:-19px;margin-bottom:0}#ss360-custom-searchbox{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0;max-width:calc(100% - 70px);height:44px;font-size:21px;padding-left:14px;padding-right:0;border:1px solid #d4d4d4;width:100%;box-sizing:border-box;margin:0}#ss360-custom-searchbutton{height:44px;width:44px;border:1px solid #1c5d7d;margin-top:0;cursor:pointer;background:#1c5d7d;padding:10px;border-radius:0;box-sizing:border-box}#ss360-custom-searchbutton:hover{-webkit-filter:brightness(80%);filter:brightness(80%)}@media (max-width:680px){#ss360-custom-search{margin-top:0}}#ss360-search-console{z-index:999998;position:fixed;top:-100%;left:0;width:100%;height:100%;background-color:#f5f5f5;overflow:auto}#ss360-search-console>h2{text-align:center;padding:0 72px}#ss360-query{display:block;box-sizing:border-box;padding:0 .4em;margin-left:auto;margin-right:auto;margin-bottom:.5em;border-radius:3px;min-width:50px;max-width:635px;width:100%;min-height:32px;background-color:#fff;border:2px solid #c9c9c9;color:#484848;font-size:24px;font-weight:300;height:54px;line-height:54px}#ss360-query:focus{border:2px solid #1c5d7d;outline:0}#ss360-results{width:100%;max-width:1000px;margin-left:auto;margin-right:auto}@media (min-width:992px){.ss360-layer-content.ss360-grid--lg .ss360-group>ul{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:wrap;flex:0 1 auto}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li{box-sizing:border-box;flex-basis:calc(33.33333% - 1px);max-width:calc(33.33333% - 1px)}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li>article{padding:.5em}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li>article header span:not(.ss360-highlight){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:90%}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container{display:flex;flex-direction:column}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container img{width:100%;max-height:150px}.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li .ss360-content-container>a.ss360--object-fit-polyfill{width:100%;height:150px}}@media (min-width:1200px){.ss360-layer-content.ss360-grid--lg .ss360-group>ul>li{flex-basis:calc(25% - 1px);max-width:calc(25% - 1px)}}@media (max-width:991px){.ss360-layer-content.ss360-grid--sm .ss360-group>ul{box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:wrap;flex:0 1 auto}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li{box-sizing:border-box;flex-basis:calc(50% - 1px);max-width:calc(50% - 1px)}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li>article{padding:.5em}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li>article header span:not(.ss360-highlight){overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:90%}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container{display:flex;flex-direction:column}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container img{width:100%;max-height:150px}.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li .ss360-content-container>a.ss360--object-fit-polyfill{width:100%;height:150px}}@media (max-width:767px){.ss360-layer-content.ss360-grid--sm .ss360-group>ul>li{flex-basis:calc(100% - 1px);max-width:calc(100% - 1px)}}#ss360-layer{padding:10px;text-align:left}#ss360-layer.ss360-overlay{position:fixed;width:80%;padding:30px 20px 30px 30px;background-color:#fff;color:#333;z-index:999999;left:calc(10% - 40px);top:calc(10% - 30px);height:80%;overflow:auto;overflow-y:hidden;box-sizing:content-box;max-width:800px}#ss360-layer.ss360-overlay p{text-align:left;margin:0}@media (min-width:1000px){#ss360-layer.ss360-overlay{left:calc(50% - 400px)}}@media (max-width:680px){#ss360-layer.ss360-overlay{position:fixed;width:100%;padding:10px 0 10px 10px;box-shadow:none;left:0;top:0;height:100%}}.ss360-animated{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.ss360-fid{-webkit-animation-name:ss360-fid;animation-name:ss360-fid}.ss360-bo{-webkit-animation-name:ss360-bo;animation-name:ss360-bo}.ss360-bi{-webkit-animation-name:ss360-bi;animation-name:ss360-bi}.ss360-layer-content{position:relative;outline:none;margin:0}.ss360-layer-content #ss360-search-result-heading{margin-top:0;font-size:1.5em;margin-bottom:.5em}.ss360-layer-content #ss360-search-result-heading a{color:inherit;text-decoration:none;cursor:default;outline:none;pointer-events:none}.ss360-layer-content>section>ul{margin-left:0}@media (max-width:991px){.ss360-layer-content.ss360-hide-dataPoints--sm .ss360-content-container>table,.ss360-layer-content.ss360-hide-images--sm .ss360-content-container img,.ss360-layer-content.ss360-hide-snippet--sm .ss360-content-container>p,.ss360-layer-content.ss360-hide-title--sm article>header,.ss360-layer-content.ss360-hide-url--sm .ss360-result-link{display:none}}@media (min-width:992px){.ss360-layer-content.ss360-hide-dataPoints--lg .ss360-content-container>table,.ss360-layer-content.ss360-hide-images--lg .ss360-content-container img,.ss360-layer-content.ss360-hide-snippet--lg .ss360-content-container>p,.ss360-layer-content.ss360-hide-title--lg article>header,.ss360-layer-content.ss360-hide-url--lg .ss360-result-link{display:none}}@media (prefers-reduced-motion:reduce){.ss360-close-button:hover,div#ss360-searchbox-spinner>*{-webkit-animation-duration:0;animation-duration:0;-webkit-animation-duration:0s;animation-duration:0s}}.ss360-nav-entry{display:inline-block;padding:10px;background:#fff;color:#333;margin-right:10px;border:1px solid #1c5d7d;cursor:pointer}.ss360-nav-entry:hover{border-bottom:3px solid #1c5d7d;padding-bottom:8px}.ss360-result-count{margin-left:5px}.ss360-result-count:after{content:")"}.ss360-result-count:before{content:"("}.ss360-nav ul{padding-left:0;list-style:none;margin-top:5px}.ss360-top-nav{padding-bottom:0}.ss360-top-nav ul{margin-left:0;margin-bottom:1em}.ss360-top-nav ul li{display:inline-block;margin-top:5px}.ss360-top-nav button{margin-right:5px}.ss360-left-nav{float:left;width:20%}.ss360-left-nav .nav-entry{margin-bottom:10px}.ss360-layer-content.ss360-left-nav{float:right;width:80%}nav.ss360-tabbed+.ss360-layer-content .ss360-group:not(.ss360-active),nav.ss360-tabbed+section .content-group-heading{display:none}nav.ss360-tabbed.ss360-left-nav ul{margin-top:0}nav.ss360-tabbed.ss360-left-nav li{border-right:1px solid #1c5d7d;text-align:right;margin-right:0}nav.ss360-tabbed.ss360-left-nav li button{border-bottom-left-radius:3px;border-top-left-radius:3px;margin-right:0}nav.ss360-tabbed.ss360-left-nav li button:hover{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-left-nav li:first-of-type button{margin-top:0}nav.ss360-tabbed.ss360-left-nav li:not(last-of-type) button{margin-bottom:5px}nav.ss360-tabbed.ss360-left-nav li.ss360-active{border-right:none}nav.ss360-tabbed.ss360-left-nav li.ss360-active button.ss360-nav-entry{margin-bottom:0}nav.ss360-tabbed.ss360-left-nav li.ss360-active+li{padding-top:6px}nav.ss360-tabbed.ss360-left-nav+section{padding:.5em .5em .5em 1em}nav.ss360-tabbed.ss360-left-nav .ss360-nav-post,nav.ss360-tabbed.ss360-left-nav .ss360-nav-pre{border-right:1px solid #1c5d7d}nav.ss360-tabbed.ss360-left-nav .ss360-nav-pre{height:3em}nav.ss360-tabbed.ss360-left-nav .ss360-nav-entry{border-right:none}nav.ss360-tabbed.ss360-top-nav li{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-top-nav li button{border-top-left-radius:3px;border-top-right-radius:3px;margin-bottom:0}nav.ss360-tabbed.ss360-top-nav li:first-of-type button{margin-left:0}nav.ss360-tabbed.ss360-top-nav li:not(last-of-type) button{margin-right:5px}nav.ss360-tabbed.ss360-top-nav li.ss360-active{border-bottom:none;margin-left:-1px;margin-right:-1px}nav.ss360-tabbed.ss360-top-nav li.ss360-active button.ss360-nav-entry{margin-right:0}nav.ss360-tabbed.ss360-top-nav li.ss360-active+li{padding-left:6px}nav.ss360-tabbed.ss360-top-nav+section{padding:1em .5em .5em}nav.ss360-tabbed.ss360-top-nav .ss360-nav-post,nav.ss360-tabbed.ss360-top-nav .ss360-nav-pre{border-bottom:1px solid #1c5d7d}nav.ss360-tabbed.ss360-top-nav .ss360-nav-pre{flex-grow:1}nav.ss360-tabbed.ss360-top-nav .ss360-nav-entry{border-bottom:none}nav.ss360-tabbed li.ss360-active button,nav.ss360-tabbed li:not(.ss360-active) button:hover{color:#000;background:#fff;padding-bottom:10px}nav.ss360-tabbed li:not(.ss360-active) button{background:#1c5d7d;color:#fff}nav.ss360-tabbed ul{margin-bottom:0;margin-right:0}nav.ss360-tabbed .ss360-nav-post{flex-grow:6}.ss360-select-wrapper{cursor:pointer;position:relative;width:100%;max-width:20em}.ss360-nav-select{width:100%;position:absolute;top:0;padding:5px 0;height:40px;opacity:0;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";border:0}.ss360-nav-label{position:relative;padding:5px 10px;cursor:pointer}.ss360-nav-label.open:after{content:"â–²"}.ss360-nav-label:after{content:"â–¼";font-size:12px;position:absolute;right:0;top:0;padding:5px 15px;border-left:5px solid #fff}.ss360-nav-label.ss360-focus{outline:1px dotted #000;outline:5px auto -webkit-focus-ring-color}.ss360-nav-label option{color:#414141;background:#fff}.ss360-nav-label,.ss360-nav-select{display:block;font:400 17px/2em Source Sans Pro,sans-serif;background:#1c5d7d;color:#fff}@media (max-width:680px){nav.ss360-left-nav{clear:both;margin-bottom:1em}nav.ss360-left-nav ul li{display:inline-block;margin-top:5px}nav.ss360-left-nav button{margin-right:5px}nav.ss360-left-nav .nav-entry{margin-bottom:0}.ss360-layer-content.ss360-left-nav,.ss360-left-nav{float:left;width:100%}}.ss360-suggests{margin-bottom:25px;margin-top:5px}.ss360-suggests a{font-size:1.2em}.ss360-suggests>article>header{position:relative;padding:0;text-align:left}.ss360-suggests>article>header>*{margin:0}.ss360-content-container p{margin-top:.5em;font-size:1em;line-height:1.5em;padding-right:1em;margin-bottom:25px}.ss360-content-container>a,.ss360-content-container>a:hover{border:none}.ss360-content-container img{width:125px;float:left;margin:6px 15px 6px 0;max-height:200px;-o-object-fit:contain;object-fit:contain}.ss360-content-container img.ss360-document-icon{max-height:75px}.ss360-content-container>a.ss360--object-fit-polyfill{display:block;width:125px;height:200px;float:left;margin:6px 15px 6px 0}.ss360-content-container table{width:auto;border:0;margin-left:0;margin-right:0}.ss360-content-container table tr{border:0}.ss360-content-container table tr td{border:0;padding:0}.ss360-content-container table tr td:first-of-type{font-weight:700;padding-right:10px}a.ss360-result-link{display:block;font-size:14px;color:#006621;word-break:break-word;padding-right:1em}#ss360-404-layer #ss360-sorting-selection{display:none}#ss360-search-result-heading+#ss360-sorting{margin-top:-.5em;margin-bottom:.25em}@media (max-width:680px){#ss360-sorting-selection{margin-right:15px}}.unibox-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}#unibox-suggest-box,#unibox-suggest-box-special{position:absolute;display:none;border:1px solid #e5e5e5;background-color:#fff;color:#333;overflow:hidden;z-index:1500}#unibox-suggest-box-special a,#unibox-suggest-box a{text-decoration:none;color:#1c5d7d}#unibox-suggest-box-special .unibox-suggest-heading,#unibox-suggest-box .unibox-suggest-heading{margin-left:8px;margin-top:6px;margin-bottom:6px;font-size:18px;text-align:left;color:#000}#unibox-suggest-box-special>*>div,#unibox-suggest-box>*>div{padding:6px 8px}#unibox-suggest-box-special .unibox-selectable.active a,#unibox-suggest-box-special .unibox-selectable:hover a,#unibox-suggest-box .unibox-selectable.active a,#unibox-suggest-box .unibox-selectable:hover a{color:#fff}#unibox-suggest-box-special.unibox--fullwidth,#unibox-suggest-box.unibox--fullwidth{width:100%!important;max-width:100%!important;min-width:100%!important;left:0!important}#unibox-suggest-box-special.unibox--fullwidth .unibox-selectable,#unibox-suggest-box.unibox--fullwidth .unibox-selectable{padding:1em}.unibox-stretch{height:100%!important}#unibox-special section,section#unibox-special{margin:0;padding:0}#unibox-special{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000000;overflow:hidden}#unibox-special .input-container{width:calc(100% - 2px);border:1px solid #bbb;background:#fff}#unibox-special .unibox-special-searchbox{width:calc(100% - 126px);height:48px;font-size:19px;margin:16px 63px;border:1px solid #bbb;border-radius:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 .5rem}#unibox-special .unibox-special-icon{position:absolute;top:16px;height:50px;width:50px;padding:0;background:transparent;border:none;cursor:pointer}#unibox-special .unibox-special-close{left:0;border-right:1px solid #bbb;background:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+") no-repeat 50%;background-size:24px}#unibox-special .unibox-special-searchbutton{right:0;border-left:1px solid #bbb;background:url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0E2LjQ3MSA2LjQ3MSAwIDAgMCAxNiA5LjUgNi41IDYuNSAwIDEgMCA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=") no-repeat 50%;background-size:24px}#unibox-special #unibox-suggest-box-special{overflow-y:scroll;-webkit-overflow-scrolling:touch;position:absolute;overflow-x:hidden;display:block;width:100%;height:100%;margin-top:2px}#unibox-special #unibox-suggest-box-special .unibox-selectable{min-height:50px}.move--left{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.move--left,.move--right{transition-timing-function:ease-out;pointer-events:none;transition-delay:0s}.move--right{-webkit-transform:translateZ(0);transform:translateZ(0)}.unibox-selectable{clear:both;position:relative;font-size:14px;text-align:left;display:flex}.unibox-selectable .unibox-selectable-img-container{width:60px;float:left;margin-right:6px}.unibox-selectable img{max-width:60px;max-height:60px}.unibox-selectable img.unibox-vis{width:70px}.unibox-selectable a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.unibox-selectable .unibox-highlight,.unibox-selectable span span{font-weight:700}.unibox-selectable p.unibox-result-content{margin-top:5px;margin-bottom:15px}.unibox-selectable .unibox-extra{cursor:default;position:absolute;top:25px;left:75px}.unibox-selectable .unibox-ca{clear:both}.unibox-selectable.active,.unibox-selectable:hover{background-color:#1c5d7d;color:#fff;cursor:pointer}.unibox-selectable.active .unibox-extra,.unibox-selectable.active a,.unibox-selectable.active span,.unibox-selectable:hover .unibox-extra,.unibox-selectable:hover a,.unibox-selectable:hover span{color:#fff}#unibox-suggest-box.unibox--fullwidth .unibox-extra{top:calc(25px + 1em);left:calc(70px + 1em)}#unibox-invisible{visibility:hidden;position:relative;text-align:left;height:0;display:none}.unibox-ivf{width:76px;height:76px;position:absolute;top:-89px;left:-15px}.unibox-ivf img{max-width:76px;position:absolute;top:0;bottom:0;margin:auto;transition:.3s ease-out;-webkit-transition:.3s ease-out;-webkit-transform:rotateX(-90deg) translateY(100%);transform:rotateX(-90deg) translateY(100%)}.unibox-ivf img.l{-webkit-transform:rotateX(0) translateY(0);transform:rotateX(0) translateY(0)}.unibox-selectable.unibox-show-all{width:100%;background:none;border:none;color:#1c5d7d;display:flex;flex-direction:row;justify-content:center;align-items:center}.unibox-selectable.unibox-show-all.active,.unibox-selectable.unibox-show-all:hover{text-decoration:underline}.unibox-selectable.unibox-show-all i{margin-left:9px;margin-top:2px}.unibox-selectable.unibox-show-all span{color:#1c5d7d}.ss360-voice-search{border-color:transparent;border-radius:50%;background:transparent;cursor:pointer;z-index:2;padding:0}.ss360-recording{background-color:#e05350;-webkit-animation-name:ss360-recording;animation-name:ss360-recording;-webkit-animation-duration:1.25s;animation-duration:1.25s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.ss360-sldr-handle{position:absolute;width:30px;height:30px;border-radius:15px!important;border:2px solid #1c5d7d;cursor:pointer;box-shadow:.5px .5px 2px 1px rgba(28,93,125,.32);background:#fff;box-sizing:border-box;left:0;transition:left .05s ease-in-out;touch-action:pan-x}.ss360-sldr-handle.ss360-focus,.ss360-sldr-handle:focus{outline:none;border-color:#fff;background:#1c5d7d}.ss360-sldr-bar,.ss360-sldr-handle{user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;-ms-user-select:none}.ss360-sldr-bar{width:calc(100% - 30px);position:absolute;height:6px;top:12px;background:#aaa;margin-left:15px;margin-right:15px;box-sizing:border-box;left:0}.ss360-sldr--a{transition:left .05s ease-in-out,width .05s ease-in-out;background:#1c5d7d}.ss360-sldr-input{font-size:1em;width:50px;border-radius:2px;border:1px solid #aaa;text-align:center;vertical-align:middle;line-height:1em;padding:2px 0;margin-top:0;margin-bottom:0}.ss360-sldr-value-wrap{position:absolute;top:40px}.ss360-sldr-value-wrap.ss360-sldr--rw{left:calc(100% - 52px)}.ss360-sldr-unit{font-size:1em;line-height:1em;padding:3px 6px;border:1px solid #aaa;border-radius:2px;border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}.ss360-sldr-unit.ss360-sldr--unit-r{left:calc(100% - 41px)}#ss360-filter{margin-bottom:1em}.ss360-filter-group{position:relative;padding-right:1em}.ss360-filter-group.ss360-active .ss360-filter-btn{color:#1c5d7d}.ss360-filter-group fieldset{border:none;max-height:350px;overflow-y:auto}.ss360-filter-group fieldset::-webkit-scrollbar-track{border-radius:4px;box-shadow:inset 0 0 4px rgba(0,0,0,.1);background-color:#fefefe}.ss360-filter-group fieldset::-webkit-scrollbar{width:8px;background-color:#fefefe}.ss360-filter-group fieldset::-webkit-scrollbar-thumb{border-radius:4px;box-shadow:inset 0 0 4px rgba(0,0,0,.1);background-color:#888}.ss360-slider-wrapper{display:block;position:relative;width:100%;max-width:300px}.ss360-filter-content{opacity:0;transition:opacity .3s ease-in-out;box-sizing:content-box}.ss360-filter-btn{font-size:1.1em;font-weight:700;cursor:pointer;transition:color .3s ease-in-out;border:none;background:#fff;color:#080808}.ss360-filter-btn i{width:24px;height:100%;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out;line-height:normal}.ss360-filter-btn i.ss360-active{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.ss360-multiselect-filter fieldset>div{width:100%}.ss360-checker-row{width:auto;min-width:150px;position:relative;padding-left:30px;cursor:pointer;font-size:1em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:.5em 0}.ss360-checker-row input[type=checkbox]{position:absolute;opacity:0;cursor:pointer}.ss360-checker-row label{cursor:pointer;margin:0}.ss360-checker-row .checkmark{position:absolute;top:-1px;left:0;height:20px;width:20px;background-color:#aaa;transition:all .3s ease-in-out}.ss360-checker-row:hover .checkmark{background-color:#626262}.ss360-checker-row .checkmark:after{content:"";position:absolute;display:none;left:6px;top:2px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);box-sizing:content-box}.ss360-checker-row input[type=checkbox]:checked~label .checkmark{background-color:#1c5d7d}.ss360-checker-row input[type=checkbox]:checked~label .checkmark:after{display:block}.ss360-checker-row input[type=checkbox]:focus~label .checkmark{outline:1px dotted #1c5d7d;outline:5px auto -webkit-focus-ring-color}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-group .ss360-filter-content{position:absolute;background:hsla(0,0%,100%,.99);min-height:120px;height:auto;z-index:1499;padding:0 .5em 30px;box-shadow:0 10px 20px -10px rgba(0,0,0,.25)}.ss360-layer-content:not(.ss360-filter--left) .ss360--long .ss360-checker-row{width:25%;max-width:25%;margin-right:1em}.ss360-layer-content:not(.ss360-filter--left) .ss360--long .ss360-checker-row label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-break:break-word}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-group:not(.ss360-active) .ss360-filter-content{display:none}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active{position:relative;border:2px solid #ccc}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active:after{width:100%;content:"";position:absolute;height:4px;background:#fff;bottom:-4px;left:0;z-index:9999}.ss360-layer-content:not(.ss360-filter--left) .ss360-filter-btn.ss360-active+.ss360-filter-content{border:2px solid #ccc}@media (min-width:992px){.ss360-layer-content.ss360-filter--left.ss360-grid--lg .ss360-group>ul>.ss360-suggests>article>header>span{max-width:500px}}.ss360-layer-content.ss360-filter--left #ss360-search-result-heading,.ss360-layer-content.ss360-filter--left .ss360-query-correction{width:100%}.ss360-layer-content.ss360-filter--left fieldset{border:none;margin:0;padding:0}.ss360-layer-content.ss360-filter--left fieldset .ss360-checker-row label{white-space:nowrap;text-overflow:ellipsis;word-break:break-word;max-width:150px;overflow:hidden}.ss360-layer-content.ss360-filter--left #ss360-filter{flex:1;min-width:240px;max-width:300px;padding:0 1em}.ss360-layer-content.ss360-filter--left .ss360-filter-group{padding:0 1em 0 0}.ss360-layer-content.ss360-filter--left #ss360-filtered-results{flex:3}.ss360-layer-content.ss360-filter--left .ss360-range-filter.ss360-active{min-height:100px}.ss360-layer-content.ss360-filter--left .ss360-filter-group{padding:0}.ss360-layer-content.ss360-filter--left .ss360-filter-group:not(:last-of-type){margin-bottom:2em;transition:margin-bottom .3s ease-out}.ss360-layer-content.ss360-filter--left .ss360-filter-group:not(:last-of-type):not(.ss360-active){margin-bottom:0}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content{display:block;opacity:1;overflow:hidden;width:100%;transition:height .3s ease-out}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content .ss360-slider-wrapper{min-height:70px}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-content .ss360-slider-wrapper.ss360-histogram{min-height:140px}.ss360-layer-content.ss360-filter--left .ss360-filter-group .ss360-filter-btn{width:100%;margin-bottom:.8em;padding-right:1em;justify-content:space-between;align-items:baseline}.ss360-show-mobile-filter{display:none;position:absolute;right:0;top:-6px;width:24px;height:24px;padding:8px;box-sizing:content-box;background:#f6f6f6;border:none;border-radius:2px;cursor:pointer}#ss360-filter .ss360-close-button,.ss360-filter-heading{display:none}@media (max-width:991px){.ss360-filter-heading,.ss360-show-mobile-filter{display:block}#ss360-filter .ss360-close-button{top:0;right:0;display:block}.ss360-filter-backdrop{position:fixed;width:100%;height:100%;background:rgba(0,0,0,.25);top:0;left:0;display:none;opacity:0;transition:opacity .3s ease-in-out;z-index:1}.ss360-filter-backdrop.ss360-open{display:block;opacity:1}.ss360-filter--left #ss360-search-result-heading{padding-right:40px}.ss360-filter--left #ss360-filter{position:fixed;background:#fff;z-index:999;top:0;right:0;height:100%;overflow-y:auto;width:400px;max-width:400px;-webkit-transform:matrix(1,0,0,1,400,0);transform:matrix(1,0,0,1,400,0);-webkit-overflow-scrolling:touch;box-shadow:0 0 20px 2px rgba(0,0,0,.25);transition:.3s ease-in;box-sizing:border-box;display:none;visibility:hidden}.ss360-filter--left #ss360-filter.ss360-open{visibility:visible;-webkit-transform:translateX(0);transform:translateX(0)}}@media (max-width:680px){.ss360-filter--left #ss360-filter{width:350px;-webkit-transform:matrix(1,0,0,1,350,0);transform:matrix(1,0,0,1,350,0)}}@media (max-width:425px){.ss360-filter--left #ss360-filter{width:300px;-webkit-transform:matrix(1,0,0,1,300,0);transform:matrix(1,0,0,1,300,0)}}@media (max-width:360px){.ss360-filter--left #ss360-filter{width:250px;-webkit-transform:matrix(1,0,0,1,250,0);transform:matrix(1,0,0,1,250,0)}}.ss360-filter--count{margin-left:6px;color:#aaa}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-bar{top:67px}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-handle{top:55px}.ss360-slider-wrapper.ss360-histogram .ss360-sldr-value-wrap{top:95px}.ss360-delete-filter-bar{width:100%}.ss360-delete-filter-bar button{border:2px solid #1c5d7d;background:#fff;padding:6px;margin-bottom:1em;cursor:pointer;margin-left:1em;color:#080808;line-height:normal}.ss360-delete-filter-bar button>*{line-height:normal}.ss360-delete-filter-bar button i{line-height:1.2em;font-size:1.2em;color:#1c5d7d;font-weight:700;margin-left:.5em;font-style:normal;height:18px;width:18px;border-radius:9px;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-delete-filter-bar button:hover i{background:#1c5d7d;color:#fff}.ss360-delete-filter-bar button.ss360-filter--delete-all{color:#1c5d7d;font-weight:700;transition:background-color .3s ease-in-out,color .3s ease-in-out}.ss360-delete-filter-bar button.ss360-filter--delete-all:hover{color:#fff;background:#1c5d7d}@media (max-width:767px){.ss360-delete-filter-bar{flex-wrap:nowrap;overflow-x:auto}.ss360-delete-filter-bar button{flex:0 0 auto}.ss360-delete-filter-bar button:first-of-type{margin-left:0}}@media (max-width:991px){.ss360-layer-content.ss360-filter--left .ss360-delete-filter-bar~#ss360-filtered-results{flex:none;width:100%}}'
  },,,

  function (e, t, m) {
    'use strict'
    m.r(t)
    var ee = m(0),
      x = {
        showErrors: !0,
        allowCookies: !0,
        suggestions: {
          show: !0,
          showOnMobile: !0,
          url: '',
          maxQuerySuggestions: 3,
          querySuggestionHeadline: void 0,
          emptyQuerySuggestions: void 0,
          showImages: !0,
          equalSearch: !1,
          num: 6,
          minChars: 3,
          maxWidth: 'auto',
          throttleTime: 300,
          instantVisualFeedback: 'none',
          extraHtml: void 0,
          highlight: !0,
          queryVisualizationHeadline: '',
          dataPoints: void 0,
          viewAllLabel: void 0,
          forceBelow: !1,
          mobileScrollOnFocus: !0
        },
        style: {
          themeColor: '#1C5D7D',
          suggestions: void 0,
          defaultCss: !0,
          searchBox: void 0,
          loaderType: 'circle',
          animationSpeed: 250,
          additionalCss: void 0
        },
        searchBox: {
          placeholder: void 0,
          autofocus: !1,
          selector: '#searchBox',
          searchButton: void 0,
          focusLayer: !1
        },
        results: {
          embedConfig: void 0,
          fullScreenConfig: void 0,
          caption: 'Found #COUNT# search results for "#QUERY#"',
          group: !0,
          filters: void 0,
          num: 96,
          highlightQueryTerms: !0,
          moreResultsButton: 'Show more results',
          noResultsText: 'Sorry, we have not found any matches for your query.',
          queryCorrectionText: 'Did you mean "#CORRECTION#"?',
          searchQueryParamName: 'ss360Query',
          linksOpenNewTab: !1,
          showSearchBoxLayover: !0,
          moreResultsPagingSize: 12,
          orderByRelevanceText: 'Relevance',
          redirectOnSingle: !1,
          collapseDataPoints: void 0,
          limitPerGroup: !0,
          stripHttp: !1,
          highlightSearchTerms: !0,
          layoverTrigger: void 0
        },
        contentGroups: {
          include: void 0,
          exclude: void 0,
          otherName: '',
          ignoreOther: !1
        },
        tracking: {
          providers: [],
          searchCallback: void 0,
          enhanced: !0,
          logQueries: !0
        },
        callbacks: {
          suggestChange: void 0,
          redirect: void 0,
          preSearch: void 0,
          postSearch: void 0,
          preSuggest: void 0,
          searchResult: void 0,
          closeLayer: void 0,
          init: void 0,
          moreResults: void 0
        },
        accessibility: {
          isMainContent: !1,
          resultTopHeadingLevel: 2,
          suggestHeadingLevel: 2,
          searchFieldLabel: 'Search',
          srSuggestionsHiddenText: 'Search suggestions are hidden',
          srNoSuggestionsText: 'No search suggestions',
          srSuggestionsCountText: '#COUNT# search suggestions shown',
          srOneSuggestionText: 'One search suggestion shown',
          srSuggestBoxControlDescription:
            'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.'
        },
        specialMobileSuggest: {
          enabled: !1,
          breakpoint: 768,
          placeholder: '',
          searchBoxPlaceholder: '',
          customTopHtml: '',
          animateTransitions: !0,
          resizeSearchBoxOnScroll: !0,
          trigger: '.ss360-special-mobile-trigger'
        },
        smart404: {
          identifier: 'Page not found',
          resultSelector: '#ss360-404',
          caption: 'Try going here instead:'
        },
        layout: {
          mobile: {
            type: 'list',
            showImages: !0,
            showSnippet: !0,
            showTitle: !0,
            showDataPoints: !0,
            showUrl: !1,
            gridColsMd: 2,
            gridColsSm: 1
          },
          desktop: {
            type: 'list',
            showImages: !0,
            showSnippet: !0,
            showTitle: !0,
            showDataPoints: !0,
            showUrl: !1,
            gridColsXl: 4,
            gridColsLg: 3
          },
          navigation: {
            position: 'none',
            type: 'scroll',
            tabSpacingPx: 5,
            borderRadiusPx: 3,
            tabTitle: "Found #COUNT# #NAME# for '#QUERY#'",
            showGroupResultCount: !0,
            forceTabs: !0,
            fallbackToScroll: !1
          }
        },
        voiceSearch: {
          enabled: !1,
          lang: 'en-US'
        },
        filters: {
          enabled: !1,
          position: 'left',
          label: 'Filter',
          showCounts: !0,
          showQuickDelete: !0,
          deleteAllLabel: 'Clear All',
          settings: {}
        }
      },
      s = (m(1),
        [
          'pdf.svg',
          'xls.svg',
          'javascript.svg',
          'odp.svg',
          'ods.svg',
          'odt.svg',
          'ppt.svg'
        ]),
      n = {
        showLoadingAnimation: function () {
          Object(ee.a)('#ss360-searchbox-spinner').fadeIn()
        },
        hideLoadingAnimation: function () {
          Object(ee.a)('#ss360-searchbox-spinner').fadeOut()
        },
        showError: function (e) {
          Object(ee.a)('.ss360DevError').remove()
          var t = Object(ee.a)(
            '<div class="ss360DevError" style="padding:10px;width:100%;position:fixed;bottom:0;left:0;background-color:#C1063F;color:white;"><b>Site Search 360 Error:</b> ' +
              e +
              '</div>'
          )
          Object(ee.a)('body').append(t)
        },
        showFullscreenLayer: function (e, t) {
          Object(ee.a)('#ss360-search-console').addClass('active'),
          Object(ee.a)('#ss360-search-console').animateTop('0%', t),
          Object(ee.a)(e).focus(),
          Object(ee.a)('#ss360CloseLayerButton').css('position', 'fixed'),
          ee.a.matchesMediaQuery('min', 968) &&
              Object(ee.a)('#ss360CloseLayerButton').css('right', '20px'),
          Object(ee.a)('body').css('overflow', 'hidden')
        },
        hideFullscreenLayer: function (e) {
          Object(ee.a)('#ss360-search-console').removeClass('active'),
          Object(ee.a)('#ss360-search-console').animateTop('-100%', e),
          Object(ee.a)('#ss360CloseLayerButton').css('position', 'absolute'),
          Object(ee.a)('#ss360CloseLayerButton').css('right', '8px'),
          Object(ee.a)('body').css('overflow', 'initial')
        },
        hideLayoverLayer: function (e) {
          var t = Object(ee.a)('#ss360-layer')
          Object(ee.a)('#ss360Darken').remove(),
          t.removeClass('ss360-animated ss360-bi ss360-fid'),
          t.addClass('ss360-animated ss360-bo'),
          setTimeout(e, 500)
        },
        addDarkenInputLayer: function (e) {
          n.removeDarkenInputLayer()
          var t = Object(ee.a)('<div id="ss360Darken-input"></div>')
          e.parent().css('z-index', '999999'),
          e
            .parent()
            .parent()
            .append(t)
        },
        removeDarkenInputLayer: function () {
          Object(ee.a)('#ss360Darken-input').remove()
        },
        isDocIcon: function (e) {
          return (
            void 0 !== e &&
            s.indexOf(
              e
                .replace('https://sitesearch360.com/cdn/', '')
                .replace('https://cdn.sitesearch360.com/', '')
            ) !== -1
          )
        },
        getHiddenParts: function (i, o) {
          return ['images', 'snippet', 'title', 'dataPoints', 'url'].reduce(
            function (e, t) {
              var s = 'show' + t.charAt(0).toUpperCase() + t.substring(1),
                n = 'none'
              return (
                i[s] || o[s]
                  ? i[s] ? o[s] || (n = 'desktop') : (n = 'mobile')
                  : (n = 'all'),
                (e[t] = n),
                e
              )
            },
            {}
          )
        },
        updateLayerByHiddenParts: function (t, s) {
          void 0 !== s &&
            Object.keys(t).forEach(function (e) {
              t[e] !== 'all' &&
                (t[e] === 'mobile' && s.addClass('ss360-hide-' + e + '--sm'),
                  t[e] === 'desktop' && s.addClass('ss360-hide-' + e + '--lg'))
            })
        },
        getSvgMagnifier: function (e) {
          return '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'.replace(
            /#FILL#/g,
            e
          )
        },
        getSvgMicrophone: function () {
          return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>'
        },
        svgToBase64: function (e) {
          return 'data:image/svg+xml;base64,' + btoa(e)
        },
        getBase64Magnifier: function (e) {
          return this.svgToBase64(this.getSvgMagnifier(e))
        },
        getLogoSrc: function (e) {
          return e
            ? 'https://cdn.sitesearch360.com/ss360-logo.svg'
            : 'https://nc.sitesearch360.com/ss360-logo.svg'
        },
        hideBrokenImages: function (n) {
          for (
            var e = function () {
                var e = n[i],
                  t = e.src,
                  s = new Image()
                ;(s.onerror = function () {
                  Object(ee.a)(e).hide()
                }),
                (s.src = t)
              },
              i = 0;
            i < n.length;
            i++
          ) {
            e()
          }
        },
        highlightQueryTermsInResult: function (e) {
          for (var t = e.split(' '), s = 0; s < t.length; s++) {
            try {
              Object(ee.a)(
                'div.ss360-content-container > p, .ss360-suggests header a'
              ).highlight(t[s], 'ss360-highlight')
            } catch (e) {
              console.log(e)
            }
          }
        }
      },
      H = n,
      v = function (l, i) {
        var g = function (e) {
            return void 0 === e ? '---' : e.trim()
          },
          n = function (e) {
            return encodeURIComponent(e.split ? e.split('/').join('___') : e)
          },
          c = 'https://insights.sitesearch360.com/insights',
          b = {
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
          },
          o = {},
          a = {},
          s = function () {
            return ee.a.readCookie('ssi--sessionId')
          },
          r = function () {
            return ee.a.readCookie('ssi--lastInteraction')
          },
          d = function () {
            ee.a.createCookie(
              'ssi--lastInteraction',
              new Date().getTime(),
              6e5 / 864e5
            )
          },
          v = function () {
            d()
          },
          m = function (e) {
            e.type === 'IMAGE'
              ? (new Image(1, 1).src = e.url)
              : e.type === 'GET'
                ? ee.a.get(e.url)
                : e.type === 'POST' &&
                  (function (e, s) {
                    if (void 0 !== navigator.sendBeacon) {
                      var t = Object.keys(s).reduce(function (e, t) {
                        return (
                          e != '' && (e += '&'),
                          void 0 !== s[t] && (e = e + n(t) + '=' + n(s[t])),
                          e
                        )
                      }, '')
                      navigator.sendBeacon(e, t)
                    } else ee.a.post(e, s)
                  })(e.url, e.data)
          },
          u = function (e) {
            function t () {
              return Math.floor(65536 * (1 + Math.random()))
                .toString(16)
                .substring(1)
            }
            var s =
                t() +
                t() +
                '-' +
                t() +
                '-' +
                t() +
                '-' +
                t() +
                '-' +
                t() +
                t() +
                t(),
              n = {
                type: 'POST',
                url: c + '/session',
                data: {
                  siteId: l,
                  sessionId: s,
                  timestamp: new Date().getTime(),
                  isPersistent: i,
                  referrer: g(window.location.href)
                }
              }
            return (
              void 0 !== e && (n.data.prevSessionId = e),
              m(n),
              i && (ee.a.createCookie('ssi--sessionId', s, 365), d()),
              s
            )
          }
        this.sessionId = (function () {
          if (!i) return u()
          var e = s()
          if (e === null) return u()
          var t = r()
          return void 0 === t || new Date().getTime() - t > 6e5 ? u(e) : e
        })()
        var x = function (t, e, s) {
            return (
              Object.keys(s).forEach(function (e) {
                t = t.replace('##' + e + '##', n(s[e]))
              }),
              (t = (t = (t = (t = (t = t.replace('##siteId##', n(l))).replace(
                '##sessionId##',
                n(e)
              )).replace('##timestamp##', n(new Date().getTime()))).replace(
                '##clientWidth##',
                n(f())
              )).replace(/##.+?##/g, '', null)),
              {
                type: 'IMAGE',
                url: c + t
              }
            )
          },
          f = function () {
            return w(document.documentElement.clientWidth || window.innerWidth)
          },
          w = function (e) {
            return void 0 === e || isNaN(e) ? -1 : e
          },
          y = function (e) {
            return w(
              e
                ? Math.floor(e.getBoundingClientRect().left + window.scrollX)
                : void 0
            )
          },
          k = function (e) {
            return w(
              e
                ? Math.floor(e.getBoundingClientRect().top + window.scrollY)
                : void 0
            )
          },
          O = function (e) {
            return w(e ? Math.floor(e.getBoundingClientRect().width) : void 0)
          },
          S = function (e) {
            return w(e ? Math.floor(e.getBoundingClientRect().height) : void 0)
          },
          h = function e (t, s) {
            if (t) {
              var n = t.className ? '.' + t.className.split(' ').join('.') : '',
                i = t.getAttribute('id') ? '#' + t.getAttribute('id') : '',
                o = t.parentNode,
                a = ''
              return (
                o && s && (a = e(o, !1) + ' '),
                (a += t.tagName.toLowerCase() + i + n)
              )
            }
          }
        ;(this.trackSerpClick = function (e, t, s, n, i, o, a, r) {
          v()
          var l = y(t),
            c = k(t),
            d = O(t),
            u = S(t),
            f = O(s),
            h = S(s),
            p = x(b.serpSelect, this.sessionId, {
              query: g(e),
              resultOffsetX: w(l),
              resultOffsetY: w(c),
              resultWidth: w(d),
              resultHeight: w(u),
              resultBlockWidth: w(f),
              resultBlockHeight: w(h),
              resultCount: w(n),
              position: w(i),
              positionInContentGroup: w(o),
              link: g(a),
              searchResultType: g(r),
              referrer: g(window.location.href)
            })
          m(p)
        }),
        (this.trackSearchBoxFocus = function (e) {
          v()
          var t = this.sessionId,
            s = {
              siteId: l,
              sessionId: t,
              timestamp: new Date().getTime(),
              searchBoxWidth: O(e),
              searchBoxHeight: S(e),
              clientWidth: f(),
              searchBoxOffsetX: y(e),
              searchBoxOffsetY: k(e),
              searchBoxId: h(e, !0),
              referrer: g(window.location.href),
              query: g(e.value)
            }
          m({
            url: c + b.searchBoxFocus,
            type: 'POST',
            data: s
          })
        }),
        (this.collectSearchBoxChange = function (e) {
          v()
          var t = this.sessionId,
            s = h(e, !0)
            ;(s in o && void 0 !== o[s]) ||
              (o[s] = {
                data: [],
                siteId: l,
                sessionId: t,
                searchBoxWidth: w(O(e)),
                searchBoxHeight: w(S(e)),
                searchBoxOffsetX: w(y(e)),
                searchBoxOffsetY: w(k(e)),
                clientWidth: f(),
                searchBoxId: s,
                referrer: g(window.location.href)
              })
          var n = g(e.value)
          a[s] !== n &&
              ((a[s] = n),
                clearTimeout(o[s].timeoutId),
                o[s].data.push({
                  timestamp: new Date().getTime(),
                  query: g(Object(ee.a)(e).val())
                }),
                (o[s].timeoutId = setTimeout(function () {
                  var e = o[s]
                ;(e.data = JSON.stringify(e.data)),
                  m({
                    url: c + b.searchBoxBulkChange,
                    type: 'POST',
                    data: e
                  }),
                  (o[s] = void 0)
                }, 300)))
        }),
        (this.trackSubmitSearch = function (e, t, s, n) {
          v()
          var i = x(b.searchSubmit, this.sessionId, {
            query: g(e),
            searchBoxWidth: w(O(t)),
            searchBoxHeight: w(S(t)),
            searchBoxOffsetX: w(y(t)),
            searchBoxOffsetY: w(k(t)),
            searchBoxId: g(void 0 !== n ? n : h(t, !0)),
            searchButtonId: g(h(s, !0)),
            referrer: g(window.location.href)
          })
          m(i)
        }),
        (this.trackSearchBoxAbandon = function (e, t, s) {
          v()
          var n = this.sessionId,
            i = {
              siteId: l,
              sessionId: n,
              timestamp: new Date().getTime(),
              query: e,
              searchBoxWidth: O(s),
              searchBoxHeight: S(s),
              clientWidth: f(),
              resultCount: w(t),
              searchBoxOffsetX: y(s),
              searchBoxOffsetY: k(s),
              searchBoxId: h(s, !0),
              referrer: g(window.location.href)
            }
          m({
            url: c + b.searchBoxAbandon,
            type: 'POST',
            data: i
          })
        }),
        (this.trackShowSuggests = function (e, t, s, n, i) {
          v()
          var o = this.sessionId,
            a = {
              siteId: l,
              sessionId: o,
              timestamp: new Date().getTime(),
              query: n,
              searchBoxWidth: O(e),
              searchBoxHeight: S(e),
              clientWidth: f(),
              resultCount: w(i),
              suggestBoxOffsetX: y(t),
              suggestBoxOffsetY: k(t),
              searchBoxId: h(e, !0),
              resultWidth: O(s),
              resultHeight: S(s),
              resultBlockHeight: S(t),
              resultBlockWidth: O(t),
              referrer: g(window.location.href)
            }
          m({
            url: c + b.suggestShow,
            type: 'POST',
            data: a
          })
        }),
        (this.trackSelectSuggest = function (e, t, s, n, i, o, a) {
          v()
          var r = x(b.suggestSelect, this.sessionId, {
            query: g(n),
            searchBoxWidth: w(O(e)),
            searchBoxHeight: w(S(e)),
            searchBoxOffsetX: w(y(e)),
            searchBoxOffsetY: w(k(e)),
            searchBoxId: g(h(e, !0)),
            resultCount: w(i),
            suggestOffsetX: w(y(s)),
            suggestOffsetY: w(k(s)),
            resultWidth: w(O(s)),
            resultHeight: w(S(s)),
            resultBlockWidth: w(O(t)),
            resultBlockHeight: w(S(t)),
            position: w(o),
            link: g(a),
            referrer: g(window.location.href)
          })
          m(r)
        }),
        (this.trackSerpShow = function (e, t, s, n, i, o) {
          v()
          var a = this.sessionId,
            r = {
              siteId: l,
              sessionId: a,
              timestamp: new Date().getTime(),
              query: s,
              clientWidth: f(),
              resultCount: w(n),
              serpBlockOffsetX: y(e),
              serpBlockOffsetY: k(e),
              resultWidth: O(t),
              resultHeight: S(t),
              resultBlockWidth: O(e),
              resultBlockHeight: S(e),
              searchResultType: i,
              referrer: g(window.location.href),
              filters: g(o)
            }
          m({
            url: c + b.serpShow,
            type: 'POST',
            data: r
          })
        }),
        (this.trackSerpLeave = function (e, t, s, n, i) {
          v()
          var o = x(b.serpAbandon, this.sessionId, {
            query: g(s),
            serpBlockOffsetX: w(y(e)),
            serpBlockOffsetY: w(k(e)),
            resultWidth: w(O(t)),
            resultHeight: w(S(t)),
            resultBlockWidth: w(O(e)),
            resultBlockHeight: w(S(e)),
            resultCount: w(n),
            searchResultType: g(i),
            referrer: g(window.location.href)
          })
          m(o)
        }),
        (this.trackFilterInteraction = function (e, t, s) {
          v()
          var n = this.sessionId,
            i = {
              siteId: l,
              sessionId: n,
              timestamp: new Date().getTime(),
              query: e,
              clientWidth: f(),
              targetOffsetX: y(t),
              targetOffsetY: k(t),
              filterBlockWidth: O(t),
              filterBlockHeight: S(t),
              referrer: g(window.location.href),
              filters: g(s)
            }
          m({
            url: c + b.filterInteraction,
            type: 'POST',
            data: i
          })
        })
      },
      w = {
        updateConfig: function (e, t, s) {
          for (
            var n = t.split('.'), i = e, o = 0;
            o < n.length &&
            (o < n.length - 1 ? (i = i[n[o]]) : (i[n[o]] = s), i);
            o++
          );
        },
        assert: function (e, t) {
          void 0 === (e = e || {}).smart404 && (t.smart404 = void 0),
          (t.results.moreResultsPagingSize = Math.min(
            24,
            t.results.moreResultsPagingSize
          )),
          (t.emptyQuerySuggests = t.suggestions.emptyQuerySuggestions),
          t.specialMobileSuggest.enabled == null &&
              (t.specialMobileSuggest.enabled = t.style.defaultCss),
          (!1 !== t.suggestions.show && !1 !== t.suggestions.showOnMobile) ||
              (t.specialMobileSuggest.enabled = !1),
          t.layout.navigation.position == 'left' &&
              ee.a.matchesMediaQuery('max', 991) &&
              (t.layout.navigation.position = 'top'),
          t.filters.enabled && (t.layout.navigation.position = 'none')
        },
        extendUniboxOptions: function (n, e) {
          ;(e.callbacks = {}),
          (e.callbacks.enterResult = n.callbacks.enterResult),
          (e.callbacks.type = n.callbacks.type),
          (e.callbacks.focus = n.callbacks.focus),
          (e.callbacks.blur = n.callbacks.blur),
          (e.callbacks.preSuggest = n.callbacks.preSuggest),
          (e.callbacks.enter = function (e, t, s) {
            n.callbacks.enter(e, void 0, void 0, void 0, t, s)
          }),
          (e.callbacks.suggestsBuilt = function (e, t) {
            t.plan == 'FREE' &&
                e.append(
                  '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:150px!important;float:right;" src="' +
                    H.getLogoSrc(n.allowCookies) +
                    '"></a></div>'
                )
          })
          var t = n.suggestions
          ;(e.maxWidth = t.maxWidth),
          (e.throttleTime = t.throttleTime),
          (e.instantVisualFeedback = t.instantVisualFeedback),
          (e.extraHtml = t.extraHtml),
          (e.highlight = t.highlight),
          (e.queryVisualizationHeadline = t.queryVisualizationHeadline),
          (e.suggestUrl = t.url),
          (e.showImagesSuggestions = t.showImages),
          (e.minChars = t.minChars),
          (e.placeholder = n.searchBox.placeholder),
          (e.animationSpeed = n.style.animationSpeed),
          (e.dataPoints = t.dataPoints),
          (e.viewAllLabel = t.viewAllLabel),
          (e.showOnMobile = t.showOnMobile),
          (e.mobileScrollOnFocus = t.mobileScrollOnFocus),
          (e.enabled = n.suggestions.show),
          (e.loaderSelector = '#ss360-searchbox-spinner'),
          (e.viewKeyMappings = {
            ss360QuerySuggestions:
                'ss360Config' in window && 'suggestions' in window.ss360Config
                  ? window.ss360Config.suggestions.querySuggestionHeadline
                  : void 0,
            _: n.contentGroups.otherName || void 0
          }),
          (e.themeColor = n.style.themeColor),
          (e.forceBelow = n.suggestions.forceBelow),
          (e.accessibility.headingLevel =
              n.accessibility.suggestHeadingLevel),
          (e.specialMobileSuggest.autoHide = !1),
          (e.specialMobileSuggest.hiddenCallback = function () {
            setTimeout(function () {
              Object(ee.a)('#ss360-search-result-heading a').focus()
            }, 200)
          }),
          (e.trackingCallbacks = {
            select: function (e, t, s, n, i, o, a) {
              'SS360Insights' in window &&
                  (Object(ee.a)(window).off('beforeunload.ss360Insights'),
                    window.SS360Insights.trackSelectSuggest(
                      e,
                      t,
                      s,
                      n,
                      i.length,
                      o,
                      a
                    ))
            },
            show: function (e, t, s, n, i) {
              'SS360Insights' in window &&
                  window.SS360Insights.trackShowSuggests(e, t, s, n, i.length)
            },
            change: function (e) {
              'SS360Insights' in window &&
                  window.SS360Insights.collectSearchBoxChange(e)
            },
            abandon: function (e, t, s) {
              'SS360Insights' in window &&
                  SS360Insights.trackSearchBoxAbandon(e, t, s)
            }
          })
        }
      },
      a = m(2),
      l = new function () {
        var n = 0,
          i = void 0,
          o = !0,
          a = function (e) {
            window.ga && ga('set', 'page', e)
          },
          r = function (e) {
            window.dataLayer &&
              dataLayer.push({
                event: 'VirtualPageview',
                category: 'search',
                virtualPageURL: e,
                virtualPageTitle: document.title
              })
          }
        ;(this.initActionStartTime = function () {
          n > 0 || (n = new Date().getTime())
        }),
        (this.getTimeToAction = function () {
          var e = new Date().getTime() - n
          return (n = 0), e
        }),
        (this.logQuery = function (e, t) {
          if (void 0 !== e && !(n === 0 || e.trim().length < 3) && o) {
            var s = l.getTimeToAction()
            s < 50 ||
                ee.a.post(
                  'https://global.sitesearch360.com/sites/queries/log',
                  {
                    query: e,
                    site: i,
                    timeToAction: s,
                    action: t
                  }
                )
          }
        }),
        (this.reportSerp = function (e, t, s) {
          if (void 0 !== e) {
            var n = !0
            e.searchCallback &&
                typeof e.searchCallback === 'function' &&
                (n = !1 !== e.searchCallback.call(this, s)),
            n &&
                  (!(function (e, t, s) {
                    ;(void 0 !== t && t !== '') || (t = 'ss360Query')
                    var n = '?' + t + '=' + encodeURI(s).toLowerCase()
                    e.providers.indexOf('GA') > -1 && a(n),
                    e.providers.indexOf('GTM') > -1 && r(n)
                  })(e, t, s),
                    e.providers.indexOf('GA') > -1 &&
                    window.ga &&
                    (ga('send', 'pageview'),
                      ga(function (e) {
                        void 0 === e &&
                        ga.getAll().forEach(function (e) {
                          e.set('page', pageToSet), e.send('pageview')
                        })
                      })))
          }
        }),
        (this.setSiteId = function (e) {
          return (i = e)
        }),
        (this.getSiteId = function () {
          return i
        }),
        (this.setTracking = function (e) {
          return (o = e)
        }),
        (this.getTracking = function () {
          return o
        })
      }(),
      F = l,
      i = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      },
      z = {
        escapeHtml: function (e) {
          return String(e).replace(/[&<>"'\/]/g, function (e) {
            return i[e]
          })
        },
        getSafeKey: function (e) {
          return e
            .replace(/[ "Â§$%&/(){}+*,.;|]/g, '_')
            .replace(/#/g, '__')
            .replace(/'/g, '---')
            .toLowerCase()
        }
      },
      o = function () {
        return 'history' in window && void 0 !== history.pushState
      },
      r = function (s) {
        var e =
            '?' +
            Object.keys(s)
              .reduce(function (e, t) {
                return (
                  e +
                  '&' +
                  encodeURIComponent(t) +
                  '=' +
                  encodeURIComponent(s[t])
                )
              }, '')
              .substring(1),
          t =
            window.location.href
              .split('?')[0]
              .replace(window.location.hash, '') +
            e +
            window.location.hash
        return {
          Page: document.title,
          Url: t
        }
      },
      c = function () {
        return window.location.search
          .substring(1)
          .split('&')
          .reduce(function (e, t) {
            return (
              t &&
                t.split &&
                t.split('=').length == 2 &&
                (e[decodeURIComponent(t.split('=')[0])] = decodeURIComponent(
                  t.split('=')[1]
                )),
              e
            )
          }, {})
      },
      E = {
        removeSearchQueryParam: function (s) {
          try {
            if (
              window.history.replaceState &&
              document.location.search.indexOf(s + '=') > -1
            ) {
              var n = c()
              if (s in n) {
                delete n[s]
                var e = Object.keys(n).reduce(function (e, t) {
                  return ''
                    .concat(e, '&')
                    .concat(encodeURIComponent(t), '=')
                    .concat(encodeURIComponent(n[s]))
                }, '')
                e.length > 0 && (e = '?' + e.substring(1)),
                window.history.replaceState(
                  {},
                  document.title,
                  document.location.pathname + e + window.location.hash
                )
              }
            }
          } catch (e) {}
        },
        buildQueryDict: function () {
          return c()
        },
        hasHistoryAPI: function () {
          return o()
        },
        pushState: function (e) {
          if (o()) {
            var t = r(e)
            try {
              history.pushState(t, t.Page, t.Url)
            } catch (e) {
              console.warn(e)
            }
          }
        },
        replaceState: function (e) {
          if (o()) {
            var t = r(e)
            try {
              history.replaceState(t, t.Page, t.Url)
            } catch (e) {
              console.warn(e)
            }
          }
        },
        redirectToSearchResultPage: function (e, t, s, n) {
          n && ee.a.createCookie('ss360LastQuery', e, 1)
          var i = new RegExp('[?&]' + s + '=[^ &]*')
          ;(t = t.replace(i, '')).indexOf('?') > -1 ? (t += '&') : (t += '?'),
          (document.location.href =
              t + encodeURIComponent(s) + '=' + encodeURIComponent(e))
        },
        handleRedirect: function (e, t, s, n, i) {
          n &&
            (e.indexOf('?') > -1 ? (e += '&') : (e += '?'),
              (e += 'ss360SearchTerm=' + s)),
          Object(ee.a)(window).off('beforeunload.ss360Insights'),
          'SS360Insights' in window &&
              window.SS360Insights.trackSerpClick(
                t,
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                e,
                'redirect'
              ),
          i != null && typeof i === 'function'
            ? i.call(this, e)
            : (window.location.href = e)
        },
        redirectToFirst: function (e) {
          var t = Object.keys(e.suggests)[0]
          window.location.href = e.suggests[t][0].link
        }
      },
      y = {
        onSearchButtonClick: function (e, t, s) {
          try {
            var n = t.getText(),
              i = void 0,
              o = this.getAttribute('ss360-search-box-id')
            o != null && (i = Object(ee.a)('#' + o)),
            void 0 !== i && i.length > 0 && (n = i.val()),
            s.call(
              this,
              n,
              void 0,
              void 0,
              !0,
              this,
              void 0,
              void 0,
              void 0 !== i && i.length > 0 ? i : void 0
            )
          } catch (e) {
            console.log(e)
          }
          e.preventDefault(), e.stopPropagation()
        },
        onBodyKeyDown: function (e, t, s, n) {
          e.keyCode == 27 &&
            ((t || s) && (e.preventDefault(), e.stopPropagation()),
              ((n === 'fullscreen' && s) || n === 'layover') &&
              SS360.closeLayer())
        },
        onBodyClick: function (e, t) {
          ;(t && Object(ee.a)(t).is(e.target)) ||
            (Object(ee.a)(e.target).attr('id') != 'unibox-mobile-search-btn' &&
              SS360.closeLayer())
        },
        popstate: function (e, t, s, n) {
          var i =
            void 0 !== e.state &&
            e.state !== null &&
            e.state.Url &&
            t &&
            e.state.Url.indexOf(t + '=') !== -1
          if (!i && s === 'layover') SS360.closeLayer()
          else if (i) {
            if (i) {
              var o = E.buildQueryDict(),
                a = o[t],
                r = void 0
              if (void 0 !== o.ss360Filter) {
                try {
                  r = JSON.parse(o.ss360Filter)
                } catch (e) {}
              }
              SS360.showResults(a, void 0, r, !1, void 0, void 0, 'popstate'),
              Object(ee.a)(
                '#ss360-custom-searchbox, #ss360-search-console #ss360-query'
              ).val(a),
              Object(ee.a)(n).val(a)
            }
          } else Object(ee.a)('#ss360-layer').fadeOut()
          Object(ee.a)('#ss360-custom-searchbox').val(''),
          Object(ee.a)(n).val('')
        },
        searchBoxBlur: function (s, n, e, t, i, o, a) {
          if (
            (H.removeDarkenInputLayer(),
              e && !(new Date().getTime() - t <= 200))
          ) {
            var r = 200
            if (s.relatedTarget && void 0 !== i) {
              Object(ee.a)(i)
                .get()
                .filter(function (e) {
                  return e == s.relatedTarget
                }).length > 0 && (r = 1e3)
            }
            setTimeout(
              function (e) {
                var t = o()
                ;(t !== -1 && e < t && t < e + r) ||
                  (a.logQuery(n, 'abandon'),
                    'SS360Insights' in window &&
                    SS360Insights.trackSearchBoxAbandon(
                      n,
                      Object(ee.a)('#unibox-suggest-box .unibox-selectable')
                        .length,
                      s.target
                    ))
              }.bind(this, new Date().getTime()),
              r
            )
          }
        },
        layoverResize: function () {
          var e = Object(ee.a)('#ss360-layer .ss360-layer-content'),
            t = 0,
            s = 0,
            n = Object(ee.a)('nav.ss360-top-nav').length > 0,
            i = Object(ee.a)('#ss360-custom-search').length > 0
          n && i ? (t = 95) : n ? (t = 60) : i ? (t = 40) : ((t = 25), (s = 40))
          var o = e.parent().height() - t
          o && e.css('max-height', o + 'px'), s && e.css('margin-top', s + 'px')
        },
        layoverScroll: function (e) {
          e.preventDefault(), e.stopPropagation(), (e.target.scrollTop = 0)
        },
        queryCorrection: function (e, t, s, n) {
          try {
            s.call(this, t), Object(ee.a)(n).val(t)
          } catch (e) {
            console.log(e)
          }
          return e.preventDefault(), e.stopPropagation(), !1
        }
      },
      k = function (a, o, A, c, d, u, B, M, f, h) {
        var s = this
        ;(this.buildSuggestItem = function (e, a, l) {
          var t =
            '<li class="ss360-suggests' +
            (e ? ' ss360-hidden' : '') +
            '"><article>'
          if (a.type == 'custom') {
            ;(t = t.replace(
              'ss360-suggests',
              'ss360-suggests ss360-custom-result'
            )),
            (t += a.html)
          } else {
            if (
              a.link != null &&
              (c.title != 'all' || c.url != 'all') &&
              (c.title != 'all' &&
                ((t +=
                  '<header><span role="heading" aria-level="' +
                  o +
                  '"><a href="' +
                  a.link +
                  '"'),
                  d && (t += ' target="_blank"'),
                  (t += '>'),
                  (t += a.name),
                  (t += '</a></span></header>')),
                c.url != 'all')
            ) {
              var s = decodeURI(a.link)
              h &&
                (s.toLowerCase().indexOf('https://') === 0
                  ? (s = s.substring(8))
                  : s.toLowerCase().indexOf('http://') === 0 &&
                    (s = s.substring(7))),
              (t +=
                  '<a tabindex="-1" href="' +
                  a.link +
                  '" class="ss360-result-link"'),
              d && (t += ' target="_blank"'),
              (t += ' aria-hidden="true">'),
              (t += s),
              (t += '</a>')
            }
            if (
              ((t += '<div class="ss360-content-container">'),
                a.image != null &&
                c.images != 'all' &&
                (a.link != null &&
                  ((t +=
                    '<a aria-hidden="true" tabindex="-1" href="' +
                    a.link +
                    '"'),
                    d && (t += ' target="_blank"'),
                    (t += '>')),
                  (t += '<img src="'
                    .concat(
                      a.image,
                      '" alt aria-hidden="true" role="presentation" aria-label="'
                    )
                    .concat(a.name, '" class="')
                    .concat(
                      H.isDocIcon(a.image) ? 'ss360-document-icon' : '',
                      '"/>'
                    )),
                  a.link != null && (t += '</a>')),
                a.content != null &&
                c.snippet != 'all' &&
                (t += '<p>' + a.content + '</p>'),
                a.kvtable != null &&
                a.kvtable.length > 16 &&
                c.dataPoints != 'all')
            ) {
              if (void 0 !== u) {
                var n = [],
                  i = a.dataPoints.reduce(function (e, t) {
                    return (
                      t.show &&
                        (void 0 === e[t.key] && (e[t.key] = []),
                          n.indexOf(t.key) === -1 && n.push(t.key),
                          e[t.key].push(t.value)),
                      e
                    )
                  })
                t +=
                  '<table>' +
                  n
                    .map(function (e) {
                      return (
                        '<tr><td>' +
                        e +
                        '</td><td>' +
                        i[e].join(u) +
                        '</td></tr>'
                      )
                    })
                    .join('') +
                  '</table>'
              } else t += a.kvtable
            }
            t += '</div>'
          }
          t += '<div class="ss360-ca"></div></article></li>'
          var r = Object(ee.a)(t)
          return (
            'SS360Insights' in window &&
              r.find('a').on('click', function (e) {
                Object(ee.a)(window).off('beforeunload.ss360Insights')
                var t = r
                    .parent()
                    .find('.ss360-suggests:not(.ss360-hidden)')
                    .get(),
                  s = Object(ee.a)('.ss360-suggests:not(.ss360-hidden)').get(),
                  n = r.get()[0],
                  i = ee.a.indexInNodeList(n, t) + 1,
                  o = ee.a.indexInNodeList(n, s) + 1
                window.SS360Insights.trackSerpClick(
                  l,
                  n,
                  Object(ee.a)('.ss360-layer-content').get()[0],
                  s.length,
                  o,
                  i,
                  a.link,
                  r.parents('#ss360-404-layer').length > 0 ? 'smart404' : M
                )
              }),
            r.find('a').on('click', function (e) {
              if (!ee.a.linkOpensInNewTab(e)) {
                var t = Object(ee.a)(e.target),
                  s = Object(ee.a)(t.parents('.ss360-group')[0]),
                  n = s.find('.content-group-heading'),
                  i = B
                    ? n.length === 0 ||
                      n.attr('id').replace('ss360-heading-', '') == '_'
                      ? '_'
                      : n.text()
                    : '',
                  o = t.parents('li')[0],
                  a = s
                    .find('li.ss360-suggests')
                    .get()
                    .indexOf(o)
                if (f) {
                  ee.a.createCookie('ss360-cg--c', i, 1 / 24),
                  ee.a.createCookie('ss360-offset--c', a, 1 / 24),
                  ee.a.createCookie('ss360-query--c', l, 1 / 24)
                } else if (E.hasHistoryAPI()) {
                  var r = E.buildQueryDict()
                  i && (r.ss360ContentGroup = i),
                  (r.ss360Offset = a),
                  E.pushState(r)
                }
              }
            }),
            r
          )
        }),
        (this.appendSearchConsole = function (e) {
          var t = Object(ee.a)('<div id="ss360-search-console">')
          t.append('<h' + a + '>' + e + '</h' + a + '>'),
          t.append(
            '<section role="search"><input id="ss360-query" type="text"></section>'
          ),
          t.append('<div id="ss360-results"></div>'),
          s.prependCloseButton(t),
          Object(ee.a)('body').append(t)
        }),
        (this.prependCloseButton = function (e) {
          e.prepend(
            '<button id="ss360CloseLayerButton" aria-label="Close Search Results" title="Close Search Results" type="button" class="ss360-close-button"></button>'
          )
        }),
        (this.buildLayer = function (e) {
          var t = e
            ? '<main role="main" id="ss360-layer" style="display:none" aria-label="Search Results"></main>'
            : '<section id="ss360-layer" style="display:none" aria-label="Search Results"></section>'
          return Object(ee.a)(t)
        }),
        (this.buildLayoverSearchField = function (e, t, s, n, i) {
          var o = Object(ee.a)(
            '<section role="search" id="ss360-custom-search" class="ss360-flex">'
          )
          if (void 0 !== e) {
            var a = Object(ee.a)(
              '<label style="' +
                  ee.a.srOnlyCss +
                  '" for="ss360-custom-searchbox" class="ss360-sr-only">' +
                  e +
                  '</label>'
            )
            o.append(a)
          }
          var r = Object(ee.a)(
            '<input type="search" id="ss360-custom-searchbox" class="ss360-flex ss360-flex--justify-center ss360-flex--align-center">'
          )
          if (void 0 !== t) {
            var l = Object(ee.a)(t).attr('placeholder') || s || 'Search'
            r.attr('placeholder', l),
            r.val(n),
            r.on('change', function (e) {
              Object(ee.a)(t).val(e.target.value)
            })
          }
          var c = Object(ee.a)(
              '<button id="ss360-custom-searchbutton" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
            ),
            d =
                '<img role="presentation" alt="" style="height:24px;width:24px" src="' +
                H.getBase64Magnifier('#ffffff') +
                '"/>'
          c.append(d)
          var u = function (e, t) {
            e != null &&
                e.length !== 0 &&
                (i != null && typeof i === 'function'
                  ? i(e, void 0, void 0, t)
                  : SS360.showResults(e, void 0, void 0, void 0, t))
          }
          return (
            r.on('keyup', function (e) {
              e.keyCode === 13 && u(e.target.value)
            }),
            c.on('click', function (e) {
              u(r.val(), e.target)
            }),
            o.append(r),
            o.append(c),
            o
          )
        }),
        (this.buildHeadlineNode = function (e, t, s, n) {
          var i = 'Intl' in window ? new Intl.NumberFormat().format(s) : s,
            o = Object(ee.a)(
              '<h' +
                  a +
                  ' id="ss360-search-result-heading"><a tabindex="-1" href="#">' +
                  e.replace('#QUERY#', t).replace('#COUNT#', i) +
                  '</a></h' +
                  a +
                  '>'
            )
          return (
            o.find('a').click(function (e) {
              e.preventDefault(), e.stopPropagation()
            }),
            (n !== 'FREE' && n !== 'COLUMBO') || o.css('paddingTop', '26px'),
            o
          )
        }),
        (this.buildQueryCorrectionNode = function (e, t, s, n) {
          var i = e.replace(
              '#CORRECTION#',
              '<a id="ss360-query-correction" href="#">' + t + '</a>'
            ),
            o = Object(ee.a)(
              '<div class="ss360-query-correction">' + i + '</div>'
            )
          return (
            o.on('click', function (e) {
              y.queryCorrection(e, t, s, n)
            }),
            o
          )
        }),
        (this.renderSearchResults = function (f, h, p, g, b, v, m, x, w, y) {
          var k = m.num,
            O = m.moreResultsButton,
            S = m.moreResultsPagingSize,
            C = m.highlightQueryTerms,
            j = s,
            I = 0
          void 0 === O && (O = null)
          var T =
              Object.keys(f.suggests).length > 1 ||
              (h.isTabbed() && !h.isDropdown())
          return (
            h.isDropdown() && (T ? h.show() : h.hide()),
            ee.a.each(f.suggests, function (c, e, t) {
              var s = z.getSafeKey(c),
                d = c
              if (d == '_') {
                if (g.ignoreOther) return
                d = g.otherName
              }
              var n =
                  void 0 !== f.totalResultsPerContentGroup &&
                  void 0 !== f.totalResultsPerContentGroup[c]
                    ? f.totalResultsPerContentGroup[c]
                    : v
              !w && B && (n = f.suggests[c].length),
              n === 0 && e.length > 0 && (n = e.length),
              (n = n || v)
              var u = Math.min(n, k)
              T && h.addEntry(d, s, b, u, t, M)
              var i =
                    s !== '_' || g.otherName !== ''
                      ? 'aria-labelledby="ss360-heading-' + s + '"'
                      : '',
                o = Object(ee.a)(
                  '<section class="ss360-group ss360-group-' +
                      s +
                      '" ' +
                      i +
                      '></section>'
                )
              if (
                (h.isTabbed() && t === 0 && o.addClass('ss360-active'),
                  d.length > 0 && e.length > 0)
              ) {
                var a = Object(ee.a)(
                  '<h' +
                      A +
                      ' id="ss360-heading-' +
                      s +
                      '" class="content-group-heading">' +
                      d +
                      '</h' +
                      A +
                      '>'
                )
                o.append(a)
              }
              o.append('<ul></ul>')
              var r = 0
              if (
                (ee.a.each(e, function (e, t) {
                  var s = j.buildSuggestItem(O !== null && S <= r, t, b)
                  o.find('ul').append(s), r++
                }),
                  (I += r),
                  e.length > 0 &&
                    (p.append(o),
                      C && H.highlightQueryTermsInResult(b),
                      O !== null &&
                      Object(ee.a)(
                        '.ss360-group-' +
                          s +
                          '.ss360-group .ss360-suggests.ss360-hidden'
                      ).length > 0))
              ) {
                var l = Object(ee.a)(
                  '<button type="button" class="ss360-more-results">' +
                      O +
                      '</button>'
                )
                o.append(l),
                l.on('click', function (e) {
                  var t = Object(ee.a)(e.target)
                    .closest('.ss360-group')
                    .find('.ss360-suggests.ss360-hidden')
                  if (t.length > 0) {
                    var s = Object(ee.a)(t[0]).find('a:first')
                    setTimeout(function () {
                      s.focus()
                    }, 5)
                  }
                  for (
                    var n = Object(ee.a)(e.target)
                        .closest('.ss360-group')
                        .find('.ss360-suggests:not(.ss360-hidden)').length,
                      i = Math.min(S, t.length),
                      o = 0;
                    o < i;
                    o++
                  ) {
                    var a = t.get(o)
                    n++,
                    Object(ee.a)(t.get(o)).fadeIn(
                      300,
                      function (e, t) {
                        Object(ee.a)(e).removeClass('ss360-hidden')
                      }.bind(this, a)
                    )
                  }
                  var r = Object(ee.a)(e.target)
                    .closest('.ss360-group')
                    .find('.ss360-suggests').length
                  if (void 0 !== x && typeof x === 'function') {
                    try {
                      x.bind(e.target, n, u, d).call()
                    } catch (e) {
                      console.error(e)
                    }
                  }
                  if ((C && H.highlightQueryTermsInResult(b), r < u)) {
                    var l = this
                    y.prefetchResults(
                      r,
                      c,
                      b,
                      function () {
                        Object(ee.a)(e.target)
                          .closest('.ss360-group')
                          .find('.ss360-suggests.ss360-hidden')
                          .get()
                          .filter(function (e) {
                            return t.get().indexOf(e) === -1
                          }).length === 0 && Object(ee.a)(l).remove()
                      },
                      void 0,
                      f.activeFilterOptions
                    )
                  } else (m.limitPerGroup || t.length - i <= 0) && Object(ee.a)(this).remove()
                })
              }
            }),
            I
          )
        }),
        (this.renderNoResultsText = function (e, t, s) {
          var n = (t || '').replace('#QUERY#', s),
            i = Object(ee.a)('<div id="ss360-no-results">' + n + '</div>')
          e.append(i)
        }),
        (this.renderWatermark = function (e, t, s) {
          if (t == 'FREE' || t == 'COLUMBO') {
            var n = !('objectFit' in document.documentElement.style)
            e.append(
              '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:120px!important;float:right;position:absolute;top:0;right:5px;'
                .concat(n ? 'width:120px;' : '', '" src="')
                .concat(H.getLogoSrc(s), '"></a></div>')
            )
          }
        })
      },
      Q = {
        getInitializationErrors: function (e, t, s) {
          var n = []
          return (
            (document.querySelectorAll(
              'script[src*=sitesearch360-v]:not([type="module"])'
            ).length > 1 ||
              document.querySelectorAll(
                'script[src*=sitesearch360-v][type="module"]'
              ).length > 1) &&
              n.push(
                'There is more than one sitesearch360 script on this page. Please remove one.'
              ),
            t ||
              s ||
              Object(ee.a)(e).length !== 0 ||
              n.push(
                'There is no input element for the searchBoxSelector "' +
                  e +
                  '". Please update your ss360Config object.'
              ),
            n
          )
        },
        enhanceCallback: function (s, e, t, n) {
          return void 0 === s
            ? e
            : t === 'enterResult' || t === 'type'
              ? s
              : s == e
                ? s
                : t === 'enter'
                  ? function (e) {
                    n.logQuery(e, 'search')
                    try {
                      s.call(this, e)
                    } catch (e) {
                      console.log(e)
                    }
                  }
                  : t === 'focus'
                    ? function (e, t) {
                      n.focus(e, t)
                      try {
                        s.call(this, e, t)
                      } catch (e) {
                        console.log(e)
                      }
                    }
                    : t === 'blur'
                      ? function (e, t) {
                        n.blur(e, t)
                        try {
                          s.call(this, e, t)
                        } catch (e) {
                          console.log(e)
                        }
                      }
                      : void 0
        },
        copyObject: function (e) {
          return JSON.parse(JSON.stringify(e))
        },
        getTotalCount: function (s, e, t, n, i, o) {
          var a = s.totalResults
          return (
            !e && t
              ? (a = Object.keys(s.suggests).reduce(function (e, t) {
                return t == '_' && n ? e : e + s.suggests[t].length
              }, 0))
              : s.totalResultsPerContentGroup &&
                Object.keys(s.totalResultsPerContentGroup).length > 0
                ? (a = Object.keys(s.totalResultsPerContentGroup).reduce(
                  function (e, t) {
                    return (t == '_' && n) ||
                        (void 0 !== i && i.indexOf(t) !== -1)
                      ? e
                      : e + Math.min(o, s.totalResultsPerContentGroup[t])
                  },
                  0
                ))
                : t || (a = Math.min(a, o)),
            a
          )
        }
      },
      U = {
        checkAndHandle: function (t, e) {
          if (
            document
              .querySelector('title')
              .text.toLowerCase()
              .indexOf(t.smart404.identifier.toLowerCase()) > -1
          ) {
            var s = {
              showErrors: t.showErrors,
              results: Q.copyObject(t.results),
              layout: Q.copyObject(t.layout),
              contentGroups: Q.copyObject(t.contentGroups)
            }
            ;(t.showErrors = !1),
            e.changeConfig('results.embedConfig', {
              contentBlock: t.smart404.resultSelector
            }),
            (t.results.caption = t.smart404.caption),
            (t.layout.navigation.position = 'none'),
            (t.results.group = !1),
            (t.results.queryCorrectionText = ''),
            (t.contentGroups.otherName = ''),
            (t.results.num = 12),
            (t.results.moreResultsPagingSize = 12),
            (t.results.highlightQueryTerms = !0),
            (t.layout.desktop.showDataPoints = !1),
            (t.layout.desktop.showUrl = !0),
            (t.layout.mobile.showDataPoints = !1),
            (t.layout.mobile.showUrl = !0)
            var n = document.location.pathname.split('/').filter(function (e) {
              return e != ''
            })
            if (n.length > 0) {
              var i = n[Math.max(0, n.length - 1)]
                .replace('.html', '')
                .replace('404', '')
                .replace(/[/-]/gi, ' ')
              Object(ee.a)('body').append(
                '<section id="ss360-404-layer" style="display: block;" aria-label="Link Suggestions"></section>'
              ),
              e.showResults(
                i,
                '_relevance',
                void 0,
                !1,
                void 0,
                function () {
                  Object.keys(s).forEach(function (e) {
                    t[e] = s[e]
                  }),
                  e.changeConfig(
                    'results.embedConfig',
                    s.results.embedConfig
                  )
                },
                'smart404'
              )
            }
            return !0
          }
          return !1
        }
      },
      u = function (e, t, s) {
        void 0 !== e &&
          (h(t, e.color), h(s, e.color), d(t, e.size), d(s, e.size))
      },
      f = function (e, t, s) {
        void 0 !== e &&
          (p(t, e.radius), p(s, e.radius), g(t, e.color), g(s, e.color))
      },
      h = function (e, t) {
        S(e, 'color', t)
      },
      d = function (e, t) {
        S(e, 'font-size', t)
      },
      p = function (e, t) {
        void 0 !== t && (S(e, 'border', '1px solid'), S(e, 'border-radius', t))
      },
      g = function (e, t) {
        S(e, 'border-color', t)
      },
      b = function (e, t) {
        S(e, 'padding', t)
      },
      O = function (e, t) {
        S(e, 'background-color', t)
      },
      S = function (e, t, s) {
        void 0 !== s && e.css(t, s)
      },
      C = function (e, t, s, n, i) {
        if (void 0 !== t && t.image === 'magnifier') {
          var o,
            a,
            r =
              i === 'fullscreen' && e.attr('id') === 'ss360-query'
                ? 54
                : e.outerHeight()
          o = (r - (a = r - 18)) / 2
          var l = H.getBase64Magnifier(t.color || n)
          e.css(
            'background',
            "url('" + l + "') no-repeat " + s + ' ' + o + 'px'
          ),
          e.css('background-size', a + 'px ' + a + 'px'),
          e.css('padding-left', a + 1 * s.replace('px', '') + 2 + 'px')
        }
      },
      j = function (e, t, s, n, i) {
        if (t === 'magnifier') {
          var o = 9
          void 0 !== i && (o = parseInt(i))
          for (
            var a = e.outerHeight() - 2 * o,
              r = H.getBase64Magnifier(n),
              l = 'width:' + a + 'px; height:' + a + 'px',
              c = !0,
              d = e.get(),
              u = 0;
            u < d.length;
            u++
          ) {
            if (d[u].nodeName !== 'BUTTON') {
              c = !1
              break
            }
          }
          if (c) {
            e.html(
              '<img role="presentation" alt="" style="' +
                l +
                '" src="' +
                r +
                '"/>'
            )
          } else {
            var f = (e.outerHeight() - a) / 2
            e.css(
              'background',
              "url('" +
                r +
                "') no-repeat " +
                (void 0 !== i ? i : s) +
                ' ' +
                f +
                'px'
            ),
            e.css('background-size', a + 'px')
          }
          e.css('min-width', e.outerHeight() + 'px')
        }
      },
      _ = {
        apply: function (e, t, s, n) {
          try {
            !(function (e, t, s, n) {
              if (void 0 !== e) {
                var i = Object(ee.a)(t),
                  o = Object(ee.a)(s)
                u(e.text, i, o),
                f(e.border, i, o),
                b(i, e.padding),
                b(o, e.padding)
                for (
                  var a = e.padding ? e.padding : '5px', r = '#666666', l = 0;
                  l < i.length;
                  l++
                ) {
                  C(Object(ee.a)(i[l]), e.icon, a, r, n)
                }
                if (void 0 !== e.button && o.length > 0) {
                  var c = e.button
                  S(o, 'cursor', 'pointer'),
                  void 0 !== c.text
                    ? (o.val(c.text), o.html(c.text), h(o, c.textColor))
                    : (o.val(' '), o.html(' ')),
                  j(o, c.icon, a, c.color || r, c.iconPadding)
                }
                var d = e.background ? e.background.color : void 0
                O(i, d), O(o, d)
              }
            })(e.searchBox, t, s, n)
          } catch (e) {
            console.warn(e)
          }
          try {
            !(function (e) {
              if (void 0 !== e) {
                var t = Object(ee.a)('#unibox-suggest-box')
                b(t, e.padding),
                S(t, 'margin-top', e.distanceFromTop),
                void 0 !== e.text && h(t, e.text.color),
                void 0 !== e.background && O(t, e.background.color),
                void 0 !== e.border &&
                    (p(t, e.border.radius), g(t, e.border.color))
              }
            })(e.suggestions)
          } catch (e) {
            console.warn(e)
          }
        }
      },
      I = 'webkitSpeechRecognition' in window,
      q = function (s, t, n) {
        if (I) {
          var r = Object(ee.a)(
              "<button aria-label='Search by speech' class='ss360-voice-search ss360-flex ss360-flex--align-center ss360-flex--justify-center' style='display: none;position:absolute'>" +
                H.getSvgMicrophone() +
                "</button>'"
            ),
            e = -1,
            l = Object(ee.a)(s)
          l.attr('id') == 'ss360-custom-searchbox' && r.show()
          var i = function () {
              var e = l.outerHeight(),
                t = e >= 40 ? 10 : e >= 30 ? e - 30 : 0,
                s = e - t,
                n = l.offset().top - l.parent().offset().top,
                i = l.offset().left - l.parent().offset().left,
                o = s + t / 2,
                a = parseInt(l.css('paddingRight').replace('px', ''))
              r.css('position', 'absolute'),
              r.css('top', n + t / 2),
              r.css('height', s),
              r.css('width', s),
              r.css('left', i + l.outerWidth() - s - t / 2),
              l.css('boxSizing') !== 'border-box' &&
                  l.css(
                    'width',
                    parseFloat(l.css('width').replace('px', '')) - o + a
                  ),
              l.css('paddingRight', o),
              r.show()
            },
            o = function () {
              clearTimeout(e),
              (l.get()[0].style.paddingRight = null),
              (l.get()[0].style.width = null),
              (e = setTimeout(i, 250))
            }
          i(), o(), Object(ee.a)(window).on('resize', o)
          var a = void 0,
            c = function () {
              r.removeClass('ss360-recording'),
              void 0 !== a && (a.stop(), (a = void 0))
            }
          r.click(function (e) {
            e.preventDefault(),
            e.stopPropagation(),
            void 0 !== a
              ? c()
              : (((a = new webkitSpeechRecognition()).continuous = !1),
                (a.interimResults = !1),
                (a.lang = t),
                (a.onstart = function () {
                  if (
                    (r.addClass('ss360-recording'),
                      r.find('svg').find('line').length > 0)
                  ) {
                    var e = Object(ee.a)(r.find('svg').get()[0].outerHTML)
                    e.find('line').remove(),
                    (r.get()[0].innerHTML = e.get()[0].outerHTML)
                  }
                }),
                (a.onresult = function (e) {
                  var t = e.results[0][0].transcript
                  Object(ee.a)(s).val(t),
                  n(
                    t,
                    void 0,
                    void 0,
                    !0,
                    Object(ee.a)(r).get()[0],
                    void 0
                  ),
                  c()
                }),
                (a.onerror = function (e) {
                  if (e.error == 'not-allowed') {
                    if (r.find('svg').find('line').length === 0) {
                      var t = Object(ee.a)(r.find('svg').get()[0].outerHTML)
                      t.append(
                        '<line y1="24" x2="24.5" y2="0" stroke="#E05350" x1="-0.5" stroke-width="3"></line>'
                      ),
                      (r.get()[0].innerHTML = t.get()[0].outerHTML)
                    }
                    r.attr(
                      'title',
                      'Permission to use microphone is blocked. Please go to your browser settings to enable microphone usage.'
                    )
                  }
                  c()
                }),
                (a.onend = function () {
                  c()
                }),
                a.start())
          }),
          l.parent().append(r)
        }
      },
      T = {
        fetch: function (e, t, s) {
          ee.a.get(e, t, s)
        },
        prefetchAndRender: function (i, o, a, r, e) {
          var t = e.buildQueryUrl(
            i.siteId,
            i.limit,
            void 0,
            i.contentGroup && i.groupResults ? [i.contentGroup] : [],
            [],
            !1,
            i.query,
            i.offset,
            !1,
            i.filters
          )
          T.fetch(t, function (e) {
            var t = e.suggests[i.contentGroup]
            if (void 0 !== t) {
              var s = z.getSafeKey(i.contentGroup),
                n = Object(ee.a)('.ss360-group-' + s + ' ul')
              t.forEach(function (e, t) {
                var s = a.buildSuggestItem(o <= t, e, i.query)
                n.append(s)
              })
            }
            void 0 !== r && typeof r === 'function' && r()
          })
        },
        wasBackPressed: function (e, t) {
          return e
            ? ee.a.readCookie('ss360-query--c') === t
            : window.location.search.indexOf('ss360Offset=') !== -1
        },
        handleBackPress: function (e, t, s, n, i, o) {
          var a = E.buildQueryDict(),
            r = parseInt(
              e ? ee.a.readCookie('ss360-offset--c') : a.ss360Offset
            ),
            l = e ? ee.a.readCookie('ss360-cg--c') : a.ss360ContentGroup,
            c = z.getSafeKey(l),
            d = l
              ? Object(ee.a)('.ss360-group-' + c)
              : Object(ee.a)('.ss360-group-_:first'),
            u = function () {
              t.focusTab(c)
              var e = Object(ee.a)(
                d.find('.ss360-suggests:not(.ss360-hidden)')[r]
              )
              t.scrollTo(e, n),
              setTimeout(function () {
                e.find('a:first').focus()
              }, 5)
            },
            f = void 0
          if (void 0 !== a.ss360Filter) {
            try {
              f = JSON.parse(a.ss360Filter)
            } catch (e) {}
          }
          if (r < d.find('.ss360-suggests:not(.ss360-hidden)').length) u()
          else if (r < d.find('.ss360-suggests').length) {
            o.prefetchResults(
              d.find('.ss360-suggests').length,
              l,
              s,
              function () {
                d.find('.ss360-hidden').length === 0 &&
                  d.find('.ss360-more-results').remove()
              },
              void 0,
              f
            ),
            d
              .find('.ss360-suggests.ss360-hidden')
              .removeClass('ss360-hidden'),
            u()
          } else {
            H.showLoadingAnimation()
            var h = r + 1 - d.find('.ss360-suggests').length,
              p = Math.ceil(h / i) + 1,
              g = {
                num: r + p * i,
                pageSize: p * i
              }
            d.find('.ss360-suggests').removeClass('ss360-hidden')
            var b = d.find('.ss360-suggests').length
            o.prefetchResults(
              b,
              l,
              s,
              function () {
                for (
                  var e = i * p + b,
                    t = d.find('.ss360-suggests').length >= e,
                    s = d.find('.ss360-suggests'),
                    n = 0;
                  n < s.length;
                  n++
                ) {
                  !t || n < s.length - i
                    ? Object(ee.a)(s.get()[n]).removeClass('ss360-hidden')
                    : Object(ee.a)(s.get()[n]).addClass('ss360-hidden')
                }
                d.find('.ss360-hidden').length === 0 &&
                  d.find('.ss360-more-results').remove(),
                H.hideLoadingAnimation(),
                u()
              },
              g,
              f
            )
          }
          e
            ? (ee.a.createCookie('ss360-cg--c', '', 1 / 24),
              ee.a.createCookie('ss360-offset--c', -1, 1 / 24),
              ee.a.createCookie('ss360-query--c', '', 1 / 24))
            : (delete a.ss360ContentGroup,
              delete a.ss360Offset,
              E.replaceState(a))
        }
      },
      G = T,
      A = function (e, t, s) {
        if (s == 'layover') {
          var n =
            Object(ee.a)('#ss360-layer .ss360-layer-content').scrollTop() +
            e.position().top
          Object(ee.a)('#ss360-layer .ss360-layer-content').animateScrollTop(
            n,
            2 * t
          )
        }
        s === 'fullscreen' &&
          Object(ee.a)('#ss360-search-console').animateScrollTop(
            e.offset().top,
            2 * t
          ),
        s === 'embed' &&
            Object(ee.a)('html, body').animateScrollTop(e.offset().top, 2 * t)
      },
      W = function (g, e, b) {
        var r = g.position,
          t = r === 'top' ? 5 : 10,
          v = g.type === 'tabs',
          s = g.forceTabs,
          n = Object.keys(e.suggests).length,
          m = v && ((!s && t < n) || ee.a.matchesMediaQuery('max', 991))
        g.fallbackToScroll &&
          m &&
          ee.a.matchesMediaQuery('min', 992) &&
          (m = v = !1)
        var l = v && !m && r === 'left',
          x = null,
          w = {}
        ;(this.getNav = function () {
          return x
        }),
        (this.shouldForceFlex = function () {
          return l
        }),
        (this.getPosition = function () {
          return r
        }),
        (this.isTabbed = function () {
          return v
        }),
        (this.getPosition = function () {
          return r
        }),
        (this.isDropdown = function () {
          return m
        }),
        (this.show = function () {
          x !== null && x.show()
        }),
        (this.hide = function () {
          x !== null && x.hide()
        }),
        (this.build = function (e, t) {
          var s, n, i, o, a
            ;(x = (function (e, t, s) {
            if (e !== 'left' && e !== 'top') return null
            var n = 'ss360-nav ss360-' + e + '-nav'
            t &&
                ((n += ' ss360-tabbed ss360-flex ss360-flex--wrap'),
                  e === 'left' && (n += ' ss360-flex--column')),
            s &&
                  (n +=
                    ' ss360-dropdown ss360-flex--align-center ss360-flex--justify-center')
            var i =
                '<nav role="navigation" class="' +
                n +
                '" aria-label="Search Result Navigation">'
            return (
              (i += s
                ? '<div class="ss360-select-wrapper"><label class="ss360-nav-label" for="ss360-nav-dropdown"><span></span></label><select class="ss360-nav-select" id="ss360-nav-dropdown"></select></div>'
                : (t
                  ? '<div class="ss360-nav-pre" role="presentation"></div>'
                  : '') +
                    '<ul role="menubar"></ul>' +
                    (t
                      ? '<div class="ss360-nav-post" role="presentation"></div>'
                      : '')),
              (i += '</nav>'),
              Object(ee.a)(i)
            )
          })(r, v, m)) !== null &&
              (m || r === 'top' || t.addClass('ss360-left-nav'),
                m &&
                ((n = w),
                  (i = e),
                  (o = (s = x).find('select')),
                  (a = s.find('label')),
                  o.on('focus', function () {
                    a.addClass('ss360-focus')
                  }),
                  o.on('focusout', function () {
                    a.removeClass('ss360-focus open')
                  }),
                  o.on('change', function (e) {
                    var t = Object(ee.a)(
                      e.target.options[e.target.selectedIndex]
                    ).text()
                    a.text(t)
                  }),
                  o.on('click', function () {
                    Object(ee.a)(a).hasClass('open')
                      ? a.removeClass('open')
                      : a.addClass('open')
                  }),
                  o.on('change', function (e) {
                    var t = Object(ee.a)('.ss360-group-' + e.target.value)
                    Object(ee.a)('.ss360-group, #ss360-layer nav li').removeClass(
                      'ss360-active'
                    ),
                    t.addClass('ss360-active'),
                    i
                      .find('#ss360-search-result-heading a')
                      .text(n[e.target.value])
                  })),
                l
                  ? (e.append(
                    '<div class="ss360-flex ss360-flex--align-stretch" id="ss360-flex-wrapper"></div>'
                  ),
                    e.find('#ss360-flex-wrapper').append(x))
                  : e.append(x))
        }),
        (this.scrollTo = function (e, t) {
          A(e, b, t)
        }),
        (this.focusTab = function (e) {
          if (x !== null && v) {
            if (m) {
              var t = Object(ee.a)('.ss360-nav-select')
              Object(ee.a)('.ss360-nav-label').text(
                t.find("option[value='" + e + "']").text()
              ),
              t.val(e)
            } else {
              Object(ee.a)('.ss360-tabbed li').removeClass('ss360-active'),
              Object(ee.a)(
                ".ss360-tabbed li[data-cgkey='" + e + "'"
              ).addClass('ss360-active')
            }
            Object(ee.a)('.ss360-group').removeClass('ss360-active'),
            Object(ee.a)('.ss360-group-' + e).addClass('ss360-active'),
            Object(ee.a)('#ss360-search-result-heading a').text(w[e])
          }
        }),
        (this.addEntry = function (e, t, s, n, i, o) {
          if (x !== null && e.length !== 0) {
            var a = Math.round(1e4 * Math.random()),
              r = (
                g.tabTitle ||
                  Object(ee.a)('#ss360-search-result-heading a').text()
              )
                .split('#COUNT#')
                .join(n)
                .split('#NAME#')
                .join(e)
                .split('#QUERY#')
                .join(s)
            w[t] = r
            var l,
              c,
              d,
              u,
              f,
              h,
              p = (function (e, t, s, n, i, o) {
                if (i) {
                  var a = t + (n ? ' (' + o + ')' : '')
                  return Object(ee.a)(
                    '<option value="' + s + '">' + a + '</option>'
                  )
                }
                var r = Object(ee.a)(
                  '<li data-cgkey="' +
                      s +
                      '"><button type="button" id="navelement' +
                      e +
                      '" class="ss360-nav-entry" role="menuitem">' +
                      t +
                      '</button></li>'
                )
                return (
                  n &&
                      r
                        .find('button')
                        .append(
                          '<span class="ss360-result-count">' + o + '</span>'
                        ),
                  r
                )
              })(a, e, t, g.showGroupResultCount, m, n)
            i === 0 &&
                v &&
                (m && x.find('label').text(p.text()),
                  Object(ee.a)('#ss360-layer')
                    .find('#ss360-search-result-heading a')
                    .text(r),
                  p.addClass('ss360-active')),
            m ||
                  ((c = t),
                    (d = v),
                    (u = r),
                    (f = o),
                    (h = b),
                    (l = p).find('button').on('click', function (e) {
                      var t = Object(ee.a)('.ss360-group-' + c),
                        s = t.find('li:first').find('a:first')
                      if (d) {
                        if (Object(ee.a)(l).hasClass('ss360-active')) return
                        Object(ee.a)(
                          '.ss360-group, #ss360-layer nav li'
                        ).removeClass('ss360-active'),
                        t.addClass('ss360-active'),
                        l.addClass('ss360-active'),
                        Object(ee.a)('#ss360-layer')
                          .find('#ss360-search-result-heading a')
                          .text(u)
                      }
                      d || A(t, h, f),
                      setTimeout(function () {
                        s.focus()
                      }, 5)
                    })),
            x.find(m ? 'select' : 'ul').append(p)
          }
        })
      },
      Y = function (f) {
        this.render = function (e, t, s, n, i) {
          var o = Object(ee.a)(
              '<section style="width:100%;min-height:1.5em;" id="ss360-sorting" role="search" aria-label="Sort Search Results"><select id="ss360-sorting-selection" style="max-width:150px;float:right;"></section> '
            ),
            a = f || 'Relevance'
          o
            .find('select')
            .append(
              Object(ee.a)('<option value="_relevance">' + a + '</option>')
            )
          for (var r = 0; r < t.length; r++) {
            o
              .find('select')
              .append(
                Object(ee.a)(
                  '<option value="' + t[r] + '">' + t[r] + '</option>'
                )
              )
          }
          var l = e.find('#ss360-search-result-heading'),
            c = !1
          if (l.length > 0) {
            var d = l.get()[0]
            if (d) {
              var u = d.parentNode
              u && (u.insertBefore(o.get()[0], u.children[1]), (c = !0))
            }
          }
          c || e.append(o),
          o.find('select').val(s || '_relevance'),
          o.find('select').on('change', function () {
            n(i, Object(ee.a)(this).val(), void 0, !0, this, void 0, 'order')
          })
        }
      },
      V = {
        apply: function (e) {
          'objectFit' in document.documentElement.style ||
            Object(ee.a)(e)
              .get()
              .forEach(function (e) {
                var t = Object(ee.a)(e),
                  s = t.find('img'),
                  n = s.attr('src')
                s.hide(),
                t.addClass('ss360--object-fit-polyfill'),
                (e.style.backgroundSize = 'cover'),
                (e.style.backgroundImage = 'url(' + n + ')'),
                (e.style.backgroundPosition = 'center center')
              })
        }
      },
      B = {
        baseUrl: 'https://global.sitesearch360.com'
      },
      X = {
        buildQueryUrl: function (e, t, s, n, i, o, a, r, l, c, d, u, f, h, p) {
          var g =
            B.baseUrl +
            '/sites?site=' +
            e +
            '&timeToAction=' +
            h.getTimeToAction() +
            '&includeContent=true&limit=' +
            t
          return (
            s != null && (g += '&sort=' + encodeURIComponent(s)),
            !1 === c && (g += '&groupResults=false'),
            l && (g += '&limitPerGroup=true'),
            d == 1 && u != null && (g += '&highlightQueryTerms=true'),
            void 0 !== n &&
              (g +=
                '&includeContentGroups=' +
                encodeURIComponent(JSON.stringify(n))),
            void 0 !== i &&
              (g +=
                '&excludeContentGroups=' +
                encodeURIComponent(JSON.stringify(i))),
            void 0 !== f &&
              (g += '&filters=' + encodeURIComponent(JSON.stringify(f))),
            o || (g += '&log=false'),
            p && (g += '&filterOptions=true'),
            (g += '&offset=' + r),
            (g += '&query=' + encodeURIComponent(a))
          )
        },
        buildSuggestionUrl: function (e, t, s, n, i, o, a, r) {
          if (!t) return ''
          var l = B.baseUrl + '/sites/suggest?site=' + e + '&limit=' + s
          return (
            n &&
              ((l = l.replace('/sites/suggest', '/sites')),
                (l += '&includeContent=true&log=false')),
            void 0 !== i &&
              (l +=
                '&includeContentGroups=' +
                encodeURIComponent(JSON.stringify(i))),
            void 0 !== o &&
              (l +=
                '&excludeContentGroups=' +
                encodeURIComponent(JSON.stringify(o))),
            !1 === a && (l += '&groupResults=false'),
            r > 0 && (l += '&maxQuerySuggestions=' + r),
            (l += '&query=')
          )
        }
      },
      M = function (r, e, l, t) {
        var c = this,
          d = void 0 !== (e = e || {}).min ? e.min : 1,
          u = void 0 !== e.max ? e.max : 100,
          f = e.step
            ? Math.round(e.step) === e.step
              ? e.step
              : Math.round(100 * e.step) / 100
            : Math.abs(u - d) / 100,
          h = e.unit,
          p = e.drawHistogram && void 0 !== l,
          g = d,
          b = u,
          v = void 0,
          n = 'ss360-sldr--' + Math.round(1e4 * Math.random()),
          i = 'ss360-sldr--' + Math.round(1e4 * Math.random()),
          s = function (e, t) {
            return Object(ee.a)(
              '<div class="ss360-sldr--'
                .concat(
                  t,
                  ' ss360-sldr-handle" tabindex="0" unselectable="on" draggable="false" ondragstart="return false" aria-role="slider" aria-controls="'
                )
                .concat(e, '" aria-valuemin="')
                .concat(d, '" aria-valuemax="')
                .concat(u, '" aria-valuenow="')
                .concat(d, '"></div>')
            )
          },
          o = function (e) {
            return Object(ee.a)(
              '<div role="presentation" class="ss360-sldr--'.concat(
                e,
                ' ss360-sldr-bar" unselectable="on" draggable="false" ondragstart="return false"></div>'
              )
            )
          },
          a = function (e, t, s) {
            return Object(ee.a)(
              '<div class="ss360-sldr--'
                .concat(
                  s,
                  'w ss360-sldr-value-wrap ss360-flex"><input aria-label="Min Value" type="number" class="ss360-sldr--input-'
                )
                .concat(s, ' ss360-sldr-input" min="')
                .concat(d, '" max="')
                .concat(u, '" step="')
                .concat(Math.round(100 * f) / 100, '" value="')
                .concat(t, '" id="')
                .concat(e, '"></div>')
            )
          },
          m = function (e) {
            return void 0 !== h
              ? Object(ee.a)(
                '<span class="ss360-sldr--unit-'
                  .concat(e, ' ss360-sldr-unit">')
                  .concat(h, '</span>')
              )
              : void 0
          },
          x = s(n, 'l'),
          w = s(i, 'r'),
          y = o('e'),
          k = o('a'),
          O = a(n, d, 'l'),
          S = a(i, u, 'r'),
          C = m('l'),
          j = m('r'),
          I = void 0,
          T = void 0,
          A = void 0,
          B = void 0,
          M = !1,
          R = 0,
          L = 0
        ;(this.mount = function () {
          M ||
            (r.html(''),
              r
                .append(y)
                .append(k)
                .append(x)
                .append(w)
                .append(O)
                .append(S)),
          void 0 !== h && (O.append(C), S.append(j))
          var e =
              u.toString().length +
              (Math.round(f) === f
                ? 0
                : Math.min(2, f.toString().split('.')[1].length)),
            t = Math.min(100, Math.min(50 + 10 * (e - 3), 70))
          if (
            (e > 3 &&
              (O.find('input').css('width', t),
                S.find('input').css('width', t),
                S.css('left', 'calc(100% - '.concat(t, 'px - 2px)'))),
              void 0 !== h)
          ) {
            O.find('input').css('borderTopRightRadius', '0'),
            S.find('input').css('borderTopRightRadius', '0'),
            O.find('input').css('borderBottomRightRadius', '0'),
            S.find('input').css('borderBottomRightRadius', '0')
            var s = h.length > 3
            S.css(
              'left',
              'calc(100% - '.concat(t, 'px - ').concat(s ? 51 : 42, 'px)')
            )
          }
          if (p && !M) {
            var i = new Array(50),
              o = (u - d) / 49
            Object.keys(l).forEach(function (e) {
              var t = parseInt(l[e]),
                s = parseFloat(e),
                n = Math.floor((s - d) / o)
              void 0 === i[n] && (i[n] = 0), (i[n] += t)
            })
            var a = i.reduce(function (e, t) {
                return Math.max(e, t)
              }, 0),
              n = i.reduce(function (e, t, s) {
                if (void 0 !== t) {
                  var n = 2 * s + 1 + '%',
                    i = 100 - Math.round(t / a * 100) + '%'
                  e.push(
                    '<line x1="'
                      .concat(n, '" x2="')
                      .concat(n, '" y1="')
                      .concat(i, '" y2="')
                      .concat('100%', '" stroke="#aaaaaa" stroke-width="2%"/>')
                  )
                }
                return e
              }, [])
            r.prepend(
              '<svg role="presentation" aria-label="Histogram" style="margin-left:15px; width: calc(100% - 30px)" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">'.concat(
                n.join(''),
                '</svg>'
              )
            ),
            r.addClass('ss360-histogram')
          }
          P(),
          setTimeout(P, 5),
          setTimeout(P, 200),
          M ||
              (_(x, 'l'),
                _(w, 'r'),
                q(x, 'l'),
                q(w, 'r'),
                Y(),
                G(),
                Object(ee.a)(window).on('resize.ss360Slider', c.mount.bind(c))),
          (M = !0)
        }),
        (this.setCurrentMin = function (e) {
          $(g < b ? (g = e) : (b = e)), z()
        }),
        (this.setCurrentMax = function (e) {
          $(b < g ? (g = e) : (b = e)), z()
        })
        var P = function () {
            var e = A,
              t = r.find('.ss360-sldr--e')
            e !==
              (A =
                t.outerWidth() -
                parseInt(t.css('padding-left')) -
                parseInt(t.css('padding-right'))) &&
              ((B = A / ((u - d) / f)),
                z(),
                (I = 'r'),
                E(),
                (I = 'l'),
                E(),
                (I = void 0))
          },
          N = function (e) {
            var t = e / B * f,
              s = $(v + (t -= t % f))
            I === 'l' ? (g = s) : I === 'r' && (b = s), z()
          },
          D = -1,
          H = function () {
            clearTimeout(D), (D = setTimeout(F, 600))
          },
          F = function () {
            clearTimeout(D),
            (D = -1),
            void 0 !== t &&
                typeof t === 'function' &&
                t.call(r, Math.min(g, b), Math.max(g, b))
          },
          z = function () {
            E(), Q(), U()
          },
          E = function () {
            var e = I === 'l' ? x : I === 'r' ? w : void 0,
              t = I === 'l' ? g : I === 'r' ? b : void 0
            if (void 0 !== e && void 0 !== t) {
              var s = K(t)
              e.css('left', s),
              e.attr('aria-valuenow', t),
              x.attr('aria-controls', g < b ? n : i),
              w.attr('aria-controls', g < b ? i : n)
            }
          },
          Q = function () {
            var e = Math.min(g, b),
              t = Math.max(g, b),
              s = K(e),
              n = K(t)
            k.css('width', Math.max(0, n - s)), k.css('left', s)
          },
          U = function () {
            var e = Math.min(g, b),
              t = Math.max(g, b)
            O.find('input').val(Math.round(100 * e) / 100),
            S.find('input').val(Math.round(100 * t) / 100)
          },
          _ = function (s, n) {
            s.on('mousedown.ss360Slider', function (e) {
              if (e.which === 1) {
                e.stopPropagation(), (v = (I = n) === 'l' ? g : b)
                var t = Z(e)
                ;(T = t.x), X('mousemove')
              }
            }),
            s.on('touchstart.ss360Slider', function (e) {
              if (e.touches.length === 1) {
                v = (I = n) === 'l' ? g : b
                var t = J(e)
                  ;(T = t.x), X('touchmove'), s.addClass('ss360-focus')
              }
            })
          },
          q = function (e, s) {
            var n = [34, 37, 40],
              i = [33, 38, 39],
              o = ['PageDown', 'ArrowLeft', 'ArrowDown'],
              a = ['PageUp', 'ArrowRight', 'ArrowUp']
            e.on('keydown', function (e) {
              var t = void 0
              n.indexOf(e.which) !== -1 ||
              o.indexOf(e.key) !== -1 ||
              o.indexOf(e.code) !== -1
                ? (t = -1 * f)
                : i.indexOf(e.which) !== -1 ||
                  a.indexOf(e.key) !== -1 ||
                  a.indexOf(e.code) !== -1
                  ? (t = f)
                  : e.which === 36 || e.key === 'Home' || e.code === 'Home'
                    ? (t = -1 * (u - d))
                    : (e.which !== 35 && e.key !== 'End' && e.code !== 'End') ||
                      (t = u - d),
              void 0 !== t &&
                  (e.preventDefault(),
                    e.stopPropagation(),
                    s === 'l' ? (g = $(g + t)) : s === 'r' && (b = $(b + t)),
                    (I = s),
                    z(),
                    H(),
                    (I = void 0))
            })
          },
          G = function () {
            O.find('input').on('change', W.bind(c, 'l')),
            S.find('input').on('change', W.bind(c, 'r'))
          },
          W = function (e, t) {
            var s = $(t.target.value)
            e === 'l'
              ? (e = g < b ? ((g = s), 'l') : ((b = s), 'r'))
              : e === 'r' && (e = b < g ? ((g = s), 'l') : ((b = s), 'r')),
            (I = e),
            E(),
            Q(),
            H(),
            (I = void 0)
          },
          Y = function () {
            x.on('blur', function () {
              R = new Date().getTime()
            }),
            w.on('blur', function () {
              L = new Date().getTime()
            }),
            k.on('click', V),
            y.on('click', V)
          },
          V = function (e) {
            var t = Z(e).x - y.offset().left,
              s = K(g),
              n = K(b),
              i = Math.abs(t - s),
              o = Math.abs(t - n),
              a = new Date().getTime(),
              r = t - (i < o ? s : n)
            a - 300 < R
              ? ((I = 'l'), (v = g), (r = (t < s ? -1 : 1) * i))
              : a - 300 < L
                ? ((I = 'r'), (v = b), (r = (t < n ? -1 : 1) * o))
                : (void 0 !== I && void 0 !== v) ||
                  (v = (I = i < o ? 'l' : 'r') == 'l' ? g : b),
            N(r),
            F(),
            (v = I = void 0)
          },
          X = function (e) {
            e === 'mousemove'
              ? (Object(ee.a)(window).on('mousemove.ss360Slider', function (e) {
                e.preventDefault(), e.stopPropagation()
                var t = Z(e)
                N(t.x - T)
              }),
                Object(ee.a)(window).on('mouseup.ss360Slider', function (e) {
                  e.preventDefault(),
                  e.stopPropagation(),
                  (v = I = void 0),
                  Object(ee.a)(window).off(
                    'mousemove.ss360Slider, mouseup.ss360Slider'
                  ),
                  F()
                }))
              : e === 'touchmove' &&
                (Object(ee.a)(window).on('touchmove.ss360Slider', function (e) {
                  if (e.touches.length === 1) {
                    try {
                      e.preventDefault()
                    } catch (e) {}
                    e.stopPropagation()
                    var t = J(e)
                    N(t.x - T)
                  }
                }),
                  Object(ee.a)(window).on('touchend.ss360Slider', function (e) {
                    e.stopPropagation(),
                    Object(ee.a)(window).off(
                      'touchend.ss360Slider, touchmove.ss360Slider'
                    ),
                    x.removeClass('ss360-focus'),
                    w.removeClass('ss360-focus'),
                    (v = I = void 0),
                    F()
                  }))
          },
          Z = function (e) {
            return {
              x: e.clientX,
              y: e.clientY
            }
          },
          J = function (e) {
            return {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            }
          },
          K = function (e) {
            return (e - d) / f * B
          },
          $ = function (e) {
            return Math.min(u, Math.max(d, e))
          }
      }

    function R (e) {
      return (
        (function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, s = new Array(e.length); t < e.length; t++) {
              s[t] = e[t]
            }
            return s
          }
        })(e) ||
        (function (e) {
          if (
            Symbol.iterator in Object(e) ||
            Object.prototype.toString.call(e) === '[object Arguments]'
          ) {
            return Array.from(e)
          }
        })(e) ||
        (function () {
          throw new TypeError('Invalid attempt to spread non-iterable instance')
        })()
      )
    }
    var L = function t (s, n, i) {
        if (n.hasClass('ss360-active')) {
          return (
            n.find('.ss360-filter-content').css('opacity', '0'),
            n
              .find('.ss360-filter-btn i, .ss360-filter-btn')
              .removeClass('ss360-active'),
            setTimeout(function () {
              n.removeClass('ss360-active'),
              n.find('.ss360-filter-content').css('opacity', null)
            }, 300),
            (window.ss360ActiveGroup = void 0),
            void Object(ee.a)('body, .ss360-layer-content').off(
              'click.ss360ToggleGroup'
            )
          )
        }
        ;(window.ss360ActiveGroup = s),
        Object(ee.a)('body, .ss360-layer-content').off(
          'click.ss360ToggleGroup'
        )
        var e = Object(ee.a)(
          '#ss360-filter .ss360-filter-group.ss360-active, .ss360-filter-btn.ss360-active'
        )
        n.addClass('ss360-active'),
        n
          .find('.ss360-filter-btn i, .ss360-filter-btn')
          .addClass('ss360-active'),
        e.length > 0 &&
            (e.removeClass('ss360-active'),
              e.find('.ss360-filter-btn i').removeClass('ss360-active'),
              e.find('.ss360-filter-content').css('opacity', null)),
        n.find('.ss360-filter-content').css('opacity', '1')
        var o = n.find('.ss360-filter-content'),
          a = Object(ee.a)('#ss360-filter'),
          r =
            a.outerWidth() -
            parseInt(a.css('paddingRight').replace('px', '')) -
            parseInt(a.css('paddingLeft').replace('px', '')),
          l = a.offset().left - n.offset().left,
          c = parseInt(o.css('paddingLeft')),
          d = parseInt(o.css('paddingRight'))
        o.css('width', r - c - d),
        o.css('left', l),
        Object(ee.a)('body, .ss360-layer-content').on(
          'click.ss360ToggleGroup',
          function (e) {
            Object(ee.a)(e.target).is(n) ||
                Object(ee.a)(e.target).parents('.ss360-filter-content').length >
                  0 ||
                t(s, n, i)
          }
        ),
        void 0 !== i && typeof i === 'function' && i(),
        n.off('click.ss360PreventBubble'),
        n.on('click.ss360PreventBubble', function (e) {
          Object(ee.a)(e.target).parents('.ss360-filter-content').length ===
              0 && (e.preventDefault(), e.stopPropagation())
        })
      },
      P = function (d, u, p) {
        var g = function (n, e, t) {
            var s = 'ss360-filter-' + z.getSafeKey(n),
              i = d === 'left' && window.ss360CFG.indexOf(n) === -1,
              o = Object(ee.a)(
                '<section  id="'
                  .concat(s, '" class="ss360-filter-group ss360-')
                  .concat(t, '-filter ')
                  .concat(i ? 'ss360-active' : '', '" aria-label="')
                  .concat(e, '"></section>')
              ),
              a = '<i class="'.concat(
                i ? 'ss360-active' : '',
                '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></i>'
              )
            o.append(
              '<button class="ss360-filter-btn ss360-flex ss360-flex--align-center ss360-flex--justify-center">'
                .concat(e)
                .concat(a, '</button>')
            ),
            o.append(
              '<div class="ss360-filter-content ss360-flex ss360-flex--align-center ss360-flex--justify-center"></div>'
            )
            var r = Object(ee.a)(
              '<button class="ss360-skip-link">Skip Filter Group</button>'
            )
            if (
              (r.on('click', function (e) {
                var t = e.target.parentNode.parentNode
                t.nextSibling === null
                  ? Object(ee.a)('.ss360-suggests:first header a').focus()
                  : Object(ee.a)(t.nextSibling)
                    .find('.ss360-filter-btn')
                    .focus()
              }),
                o.find('.ss360-filter-content').append(r),
                d === 'top')
            ) {
              o.find('.ss360-filter-btn').on('click', function (e) {
                e.preventDefault(), e.stopPropagation(), L(n, o, u)
              })
            } else if (d === 'left') {
              var l = function () {
                o
                  .find('button:not(.ss360-filter-btn), input')
                  .attr('tabindex', '-1'),
                o.find("div[tabindex='0']").attr('tabindex', '-1')
              }
              if (!i) {
                l()
                var c = o.find('.ss360-filter-content')
                c.css('height', 0), c.data('heightcache', 'auto')
              }
              o
                .find(
                  '.ss360-filter-group:not(.ss360-active) .ss360-filter-content'
                )
                .attr('aria-hidden', 'true'),
              o
                .find(
                  '.ss360-filter-group.ss360-active .ss360-filter-content'
                )
                .attr('aria-hidden', 'false'),
              o.find('.ss360-filter-btn').on('click', function (e) {
                e.preventDefault(), e.stopPropagation()
                var t = o.find('.ss360-filter-content')
                if (o.hasClass('ss360-active')) {
                  o.removeClass('ss360-active'),
                  o.find('.ss360-filter-btn i').removeClass('ss360-active')
                  var s = t.outerHeight()
                  void 0 === t.data('heightcache') &&
                      t.data('heightcache', s),
                  t.css('height', s),
                  t.attr('aria-hidden', 'true'),
                  setTimeout(function () {
                    t.css('height', 0)
                  }, 0),
                  window.ss360CFG.push(n),
                  l()
                } else {
                  o.addClass('ss360-active'),
                  o.find('.ss360-filter-btn i').addClass('ss360-active'),
                  t.attr('aria-hidden', 'false'),
                  t.css('height', t.data('heightcache')),
                  setTimeout(function () {
                    t.css('height', 'auto'), t.data('heightcache', null)
                  }, 300),
                  window.ss360CFG.indexOf(n) !== -1 &&
                        window.ss360CFG.splice(window.ss360CFG.indexOf(n), 1),
                  o
                    .find('button:not(.ss360-filter-btn), input')
                    .attr('tabindex', null),
                  o.find("div[tabindex='-1']").attr('tabindex', '0')
                }
              })
            }
            return o
          },
          a = function (s, n, e, t, i, o, a) {
            t = t || []
            var r = g(s, n, 'multiselect'),
              l = Object(ee.a)('<fieldset></fieldset>'),
              c = Object(ee.a)(
                '<div class="ss360-flex '.concat(
                  a === 'left'
                    ? 'ss360-flex--nowrap ss360-flex--column'
                    : 'ss360-flex--wrap',
                  '"></div>'
                )
              ),
              d = t || [],
              u = !1
            e.forEach(function (e) {
              var t = 'ss360-checkbox-' + Math.round(1e4 * Math.random()),
                s = Object(ee.a)(
                  '<div class="ss360-checker-row ss360-flex ss360-flex--align-center"><input id="'
                    .concat(t, '" type="checkbox" value="')
                    .concat(e, '" ')
                    .concat(
                      d.indexOf(e) !== -1 ? 'checked' : '',
                      '/><label for="'
                    )
                    .concat(t, '"  title="')
                    .concat(
                      e,
                      '" class="ss360-flex ss360-flex--align-center"><span role="presentation" aria-controls="'
                    )
                    .concat(t, '" class="checkmark"></span>')
                    .concat(e, '</label></div>')
                )
              o &&
                void 0 !== i[e] &&
                s
                  .find('label')
                  .append(
                    '<span class="ss360-filter--count">('.concat(
                      i[e],
                      ')</span>'
                    )
                  ),
              c.append(s),
              (u = u || e.length > 14)
            }),
            u && l.addClass('ss360--long'),
            l.append(c),
            r.find('.ss360-filter-content').append(l),
            r.find('input').on('change', function (e) {
              var t = d.indexOf(e.target.value)
              e.target.checked && t === -1
                ? d.push(e.target.value)
                : e.target.checked || t === -1 || d.splice(t, 1),
              void 0 !== p && typeof p === 'function' && p(s || n, d)
            }),
            (this.append = function (e) {
              e.append(r)
            }),
            (this.mount = function () {})
          },
          c = function (s, n, i, o, e, t, a, r, l) {
            var c = g(s, n, 'range'),
              d = Object(ee.a)('<div class="ss360-slider-wrapper"></div>'),
              u = void 0 !== a ? a.min : i,
              f = void 0 !== a ? a.max : o
            c.find('.ss360-filter-content').append(d)
            var h = new M(
              d,
              {
                min: i,
                max: o,
                step: e,
                unit: t,
                drawHistogram: l
              },
              r,
              function (e, t) {
                ;(u === e && f === t) ||
                  ((u = e),
                    (f = t),
                    void 0 !== p &&
                    typeof p === 'function' &&
                    p(
                      s || n,
                      i === e && o === t
                        ? void 0
                        : {
                          min: e,
                          max: t
                        }
                    ))
              }
            )
            void 0 !== a &&
              (h.setCurrentMin(Math.max(a.min, i)),
                h.setCurrentMax(Math.min(a.max, o))),
            (this.append = function (e) {
              e.append(c)
            }),
            (this.mount = function () {
              h.mount()
            })
          }
        ;(this.multipleChoice = function (e, t, s, n, i, o) {
          return new a(e, t, s, n, i, o, d)
        }),
        (this.range = function (e, t, s, n, i, o, a, r, l) {
          return new c(e, t, s, n, i, o, a, r, l)
        })
      },
      Z = function (t, e, s, n, i) {
        'ss360CFG' in window || (window.ss360CFG = [])
        var o = t.position,
          a = (s || []).reduce(function (e, t) {
            var s = Object.keys(t)[0]
            return (e[s] = t[s]), e
          }, {}),
          r = Object(ee.a)(
            '<section id="ss360-filter" class="ss360-flex ss360-flex--wrap" role="search" aria-label="'.concat(
              t.label,
              '"></section>'
            )
          )
        if (o === 'left') {
          var l = t.headingLevel
          r.append(
            '<button id="ss360CloseFilterButton aria-label="Close Filter" title="Close Filter" class="ss360-close-button"></button>'
          ),
          r.append(
            '<h'
              .concat(l, ' class="ss360-filter-heading">')
              .concat(t.label, '</h')
              .concat(l, '>')
          )
        }
        for (
          var c = [],
            d = e.reduce(function (e, t) {
              return (e[t.key] = t.name), e
            }, {}),
            u = function (e, t) {
              if (
                ((void 0 !== (a[e] = t) && t.length !== 0) || delete a[e],
                  ('SS360Insights' in window))
              ) {
                var s =
                  e +
                  '<#>' +
                  d[e] +
                  '=>' +
                  (void 0 !== a[e] ? JSON.stringify(a[e]) : '--')
                window.SS360Insights.trackFilterInteraction(
                  n,
                  Object(ee.a)('#ss360-filter').get()[0],
                  s
                )
              }
              void 0 !== i &&
                typeof i === 'function' &&
                (i(a), Object(ee.a)(window).off('resize.ss360FilterResize'))
            },
            f = function (e) {
              return t.settings[e.name] || t.settings[e.key] || {}
            },
            h = function () {
              c.forEach(function (e) {
                return e.mount()
              })
            },
            p = new P(o, h, u),
            g = 0;
          g < (t.limit || 9999) && g < e.length;
          g++
        ) {
          var b = e[g],
            v = f(b)
          if ('min' in b) {
            if (b.min === b.max) continue
            c.push(
              p.range(
                b.key,
                b.name,
                b.min,
                b.max,
                v.step,
                v.unit,
                a[b.key],
                b.counts || {},
                void 0 === v.drawHistogram || v.drawHistogram
              )
            )
          } else {
            if (
              b.values.length < 2 &&
              (void 0 === a[b.key] || a[b.key].length === 0)
            ) {
              continue
            }
            c.push(
              p.multipleChoice(
                b.key,
                b.name,
                b.values,
                a[b.key],
                b.counts || {},
                t.showCounts
              )
            )
          }
        }
        var m = Object(ee.a)('#ss360-layer .ss360-group, #ss360-no-results'),
          x =
            o === 'left'
              ? Object(ee.a)(
                '<button class="ss360-show-mobile-filter" aria-label="Show Filter" title="Show Filter"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg></button>'
              )
              : void 0,
          w =
            o === 'left'
              ? Object(ee.a)(
                '<div class="ss360-filter-backdrop" role="presentation"></div>'
              )
              : void 0,
          y = function () {
            r.css('display', 'block'),
            h(),
            setTimeout(function () {
              r.addClass('ss360-open'), w.addClass('ss360-open')
            }, 0),
            (window.ss360AreMobileSuggestsOpen = !0)
          },
          k = function () {
            r.removeClass('ss360-open'),
            w.removeClass('ss360-open'),
            (window.ss360AreMobileSuggestsOpen = !1),
            setTimeout(function () {
              r.css('display', null)
            }, 300)
          }
        if (
          (!0 === window.ss360AreMobileSuggestsOpen &&
            (r.css('transitionDuration', '0s'),
              y(),
              setTimeout(function () {
                r.css('transitionDuration', null)
              }, 300)),
            o === 'left')
        ) {
          x.on('click', y),
          w.on('click', function (e) {
            e.preventDefault(), e.stopPropagation(), k()
          }),
          r.find('.ss360-close-button').on('click', k)
          var O = Object(ee.a)(
            '<button class="ss360-skip-link">Skip Filter</button>'
          )
          O.on('click', function () {
            Object(ee.a)('.ss360-suggests:first header a').focus()
          }),
          r.prepend(O)
        }
        if (m.length > 0) {
          var S = m.get()[0]
          void 0 !== x &&
            (S.parentNode.insertBefore(w.get()[0], S),
              S.parentNode.insertBefore(x.get()[0], S)),
          S.parentNode.insertBefore(r.get()[0], S)
        } else {
          void 0 !== x &&
            (Object(ee.a)('#ss360-layer').append(w),
              Object(ee.a)('#ss360-layer').append(x)),
          Object(ee.a)('#ss360-layer').append(r)
        }
        if (void 0 !== x) {
          var C = function () {
            var e =
                parseInt(x.css('height')) +
                parseInt(x.css('paddingBottom')) +
                parseInt(x.css('paddingTop')),
              t = Object(ee.a)('#ss360-search-result-heading').outerHeight()
            t && e < t ? x.css('top', (t - e) / 2) : x.css('top', 0)
          }
          C(),
          setTimeout(C, 200),
          Object(ee.a)(window).on('resize.ss360FilterResize', C)
        }
        if (
          (c.forEach(function (e) {
            e.append(r)
          }),
            c.forEach(function (e) {
              return e.mount()
            }),
            o !== 'left' && void 0 !== window.ss360ActiveGroup)
        ) {
          var j = Object(ee.a)(
            '#ss360-filter-'.concat(z.getSafeKey(window.ss360ActiveGroup))
          )
          j.length > 0 && L(window.ss360ActiveGroup, j, h)
        }
        if (o === 'left') {
          var I = Object(ee.a)('.ss360-layer-content')
          I.addClass('ss360-filter--left ss360-flex ss360-flex--wrap'),
          I.append(
            "<div id='ss360-filtered-results' class='ss360-flex ss360-flex--column'></div>"
          ),
          I.find('#ss360-filtered-results').append(
            Object(ee.a)('.ss360-group')
          ),
          r.addClass('ss360-flex--column ss360-flex--nowrap')
        }
        if (t.showQuickDelete && s.length > 0) {
          var T = Object(ee.a)(
            '<section role="search" aria-label="Selected Filter Options" class="ss360-delete-filter-bar ss360-flex ss360-flex--wrap ss360-flex--align-center"></section>'
          )
          T.append(
            '<button aria-label="'
              .concat(
                t.deleteAllLabel,
                '" class="ss360-filter--delete-all ss360-flex ss360-flex--align-center">'
              )
              .concat(t.deleteAllLabel, '</button>')
          ),
          s.forEach(function (e) {
            var t = Object.keys(e)[0],
              s = d[t]
            if (void 0 !== s) {
              if (void 0 === e[t].min || isNaN(parseFloat(e[t].min))) {
                e[t].forEach(function (e) {
                  T.append(
                    '<button data-key="'
                      .concat(t, '" data-value="')
                      .concat(e, '" aria-label="Clear ')
                      .concat(e, ' filter option of ')
                      .concat(
                        s,
                        '" class="ss360-flex ss360-flex--align-center"><strong>'
                      )
                      .concat(s, ':</strong><span>&nbsp;')
                      .concat(e, '</span><i>&times;</i></button>')
                  )
                })
              } else {
                var n = {
                    name: s,
                    key: t
                  },
                  i = void 0 !== f(n).unit ? ' ' + f(n).unit : '',
                  o = e[t].min,
                  a = e[t].max,
                  r = o.toFixed(o === Math.round(o) ? 0 : 2) + i,
                  l = a.toFixed(a === Math.round(a) ? 0 : 2) + i
                T.append(
                  '<button data-key="'
                    .concat(t, '" aria-label="Clear ')
                    .concat(
                      s,
                      ' filter" class="ss360-flex ss360-flex--align-center"><strong>'
                    )
                    .concat(s, ':</strong><span>&nbsp;')
                    .concat(r, ' - ')
                    .concat(l, '</span><i>&times;</i></button>')
                )
              }
            }
          }),
          T.find('button').on('click', function (e) {
            var t =
                  e.target.nodeName === 'BUTTON'
                    ? Object(ee.a)(e.target)
                    : Object(ee.a)(Object(ee.a)(e.target).parents('button')[0]),
              s = t.data('key'),
              n = t.data('value')
            if ((t.fadeOut(), void 0 === s)) {
              T.find('button').fadeOut(),
              Object.keys(a).forEach(function (e) {
                delete a[e]
              }),
              u(0, void 0)
            } else if (void 0 === n) u(s, void 0)
            else {
              var i = R(a[s])
              i.indexOf(n) !== -1 && i.splice(i.indexOf(n), 1), u(s, i)
            }
          })
          var A = Object(ee.a)('#ss360-layer .ss360-layer-content').get()[0],
            B =
              o === 'left'
                ? Object(ee.a)('#ss360-search-result-heading').get()[0]
                : Object(ee.a)('#ss360-filter').get()[0]
          B.nextElementSibling !== null
            ? A.insertBefore(T.get()[0], B.nextElementSibling)
            : Object(ee.a)(A).append(T)
        }
      },
      N = function (O) {
        var S,
          d,
          s,
          C = this,
          u = O.siteId || document.location.host,
          n = function () {
            return void 0 !== O.results.fullScreenConfig &&
              void 0 !== O.results.fullScreenConfig.trigger
              ? 'fullscreen'
              : void 0 !== O.results.embedConfig ? 'embed' : 'layover'
          },
          j = n(),
          o = O.searchBox.selector,
          a = O.results.layoverTrigger,
          I = Math.max(1, parseInt(O.accessibility.resultTopHeadingLevel) || 2),
          e = I + 1,
          t = e + 1,
          r = [],
          f = O.tracking.logQueries && ee.a.readCookie('ss360-tracking') != '0'
        F.setTracking(f),
        O.tracking.enhanced &&
            ((window.SS360Insights = new v(u, O.allowCookies)),
              Object(ee.a)(o).focus(function (e) {
                window.SS360Insights.trackSearchBoxFocus(e.target)
              }))
        var l = void 0,
          c = !1
        F.setSiteId(u)
        var T = H.getHiddenParts(O.layout.mobile, O.layout.desktop),
          i = function () {
            return new k(
              I,
              t,
              e,
              T,
              O.results.linksOpenNewTab,
              O.results.collapseDataPoints,
              O.results.group,
              j,
              O.allowCookies,
              O.results.stripHttp
            )
          },
          A = i(),
          h = -1,
          B = -1,
          M = '',
          R = !1,
          L = !1,
          p = function (e) {
            F.setSiteId(e),
            s != null && g(s.replace('site=' + u, 'site=' + e)),
            (u = e),
            (O.siteId = u),
            void 0 !== window.SS360Insights &&
                (window.SS360Insights = new v(u, O.allowCookies))
          },
          g = function (e) {
            s = e
            for (var t = 0; t < r.length; t++) r[t].updateSuggestUrl(e)
          },
          b = function () {
            return X.buildSuggestionUrl(
              u,
              O.suggestions.show,
              O.suggestions.num,
              O.suggestions.equalSearch,
              O.contentGroups.include,
              O.contentGroups.exclude,
              O.results.group,
              O.suggestions.maxQuerySuggestions
            )
          },
          P = function (e, t, s, n, i, o, a, r, l, c) {
            return X.buildQueryUrl(
              e,
              t,
              s,
              n,
              i,
              o,
              a,
              r,
              l,
              O.results.group,
              O.results.highlightQueryTerms,
              O.callbacks.searchResult,
              c || O.results.filters,
              F,
              O.filters.enabled
            )
          },
          N = function (e) {
            Object(ee.a)('#ss360Darken').remove(),
            e.addClass('ss360-overlay'),
            e.fadeIn(),
            e.scrollTop(0),
            e.removeClass('ss360-animated ss360-bo'),
            e.addClass('ss360-animated ss360-fid')
            var t = Object(ee.a)('<div id="ss360Darken"></div>')
            Object(ee.a)('body').append(t),
            Object(ee.a)('#ss360CloseLayerButton').remove(),
            A.prependCloseButton(e),
            Object(ee.a)('#ss360CloseLayerButton').click(C.closeLayer)
            var s = Object(ee.a)(window)
            s.off('resize.ss360Resize'),
            s.on('resize', y.layoverResize),
            y.layoverResize(),
            e.off('scroll.ss360Scroll'),
            e.on('scroll.ss360Scroll', y.layoverScroll)
          },
          D = function (e, t) {
            var s = A.buildLayoverSearchField(
              O.accessibility.searchFieldLabel,
              o,
              O.searchBox.placeholder,
              t,
              O.callbacks.enter
            )
            !0 === O.voiceSearch.enabled &&
              new q(
              s.find('#ss360-custom-searchbox'),
              O.voiceSearch.lang,
              C.showResults
            ),
            e.append(s)
          }
        ;(this.VERSION = '12.1.40'),
        (this.isInitialized = function () {
          return void 0 !== l && l
        }),
        (this.changeConfig = function (e, t) {
          w.updateConfig(O, e, t),
          e == 'siteId'
            ? p(t)
            : e == 'results.embedConfig'
              ? (S = t)
              : e == 'results.fullscreenConfig.caption'
                ? Object(ee.a)('#ss360-search-console > h' + I).html(t)
                : e == 'searchBox.placeholder'
                  ? Object(ee.a)('#ss360-query').attr('placeholder', t)
                  : e.indexOf('contentGroups.') === 0 && g(b()),
          (j = n()),
          e.indexOf('layout') !== -1 &&
                (T = H.getHiddenParts(O.layout.mobile, O.layout.desktop)),
          (e.indexOf('layout') === -1 && e.indexOf('results') === -1) ||
                (A = i())
        }),
        (this.setSiteId = p),
        (this.buildQueryUrl = P),
        (this.showFullscreenLayer = function (e) {
          e != null && e.stopPropagation(),
          (c = !0),
          H.showFullscreenLayer(
            O.searchBox.selector,
            O.style.animationSpeed
          )
        }),
        (this.closeLayer = function () {
          var e = R
          if (
            ((R = !1),
              e &&
                (Object(ee.a)(window).off('beforeunload.ss360Insights'),
                  'SS360Insights' in window))
          ) {
            var t = Object(ee.a)('.ss360-suggests:not(.ss360-hidden)').get()
            window.SS360Insights.trackSerpLeave(
              Object(ee.a)('.ss360-layer-content').get()[0],
              t[0],
              M,
              t.length,
              Object(ee.a)('#ss360-404-layer').length > 0 ? 'smart404' : j
            )
          }
          j === 'fullscreen' && c
            ? ((c = !1),
              H.hideFullscreenLayer(O.style.animationSpeed),
              E.removeSearchQueryParam(O.results.searchQueryParamName))
            : j === 'layover' &&
                (H.hideLayoverLayer(function () {
                  Object(ee.a)('#ss360-layer').fadeOut()
                }),
                  E.removeSearchQueryParam(O.results.searchQueryParamName),
                  O.filters.enabled && E.removeSearchQueryParam('ss360Filter')),
          O.callbacks.closeLayer != null && O.callbacks.closeLayer.call(C)
        }),
        (this.init = function () {
          var t = C
            ;(l = !0),
          Object(ee.a)('#ss360-search-console').remove(),
          j === 'fullscreen' &&
                ((O.searchBox.selector = '#ss360-query'),
                  (o = '#ss360-query'),
                  (O.results.embedConfig = {
                    contentBlock: '#ss360-results'
                  }),
                  A.appendSearchConsole(O.results.fullScreenConfig.caption),
                  Object(ee.a)('#ss360CloseLayerButton').click(C.closeLayer),
                  Object(ee.a)(O.results.fullScreenConfig.trigger).click(function (
                    e
                  ) {
                    t.showFullscreenLayer(e)
                  })),
          j === 'layover' &&
                void 0 !== a &&
                Object(ee.a)(a).on('click', function (e) {
                  e.preventDefault(), e.stopPropagation()
                  var t = Object(ee.a)('#ss360-layer')
                  t.html(''), N(t), D(t, '')
                })
          var e = Object(ee.a)(o).unibox(O)
            ;(r = e instanceof Array ? e : r.concat(e)),
          g(b()),
          O.searchBox.searchButton != null &&
                Object(ee.a)(O.searchBox.searchButton).click(function (e) {
                  h = new Date().getTime()
                  var t = r[0]
                  r.length > 1 &&
                    void 0 !== d &&
                    (t =
                      r.reduce(function (e, t) {
                        return void 0 !== e
                          ? e
                          : t.getSearchBox().get()[0] === d.get()[0]
                            ? t
                            : void 0
                      }, void 0) || r[0]),
                  y.onSearchButtonClick.call(this, e, t, O.callbacks.enter)
                }),
          O.searchBox.autofocus &&
                setTimeout(function () {
                  Object(ee.a)(o).focus()
                }, 200),
          Object(ee.a)('#ss360-layer').remove()
          var s = A.buildLayer(O.accessibility.isMainContent),
            n = Object(ee.a)('body')
          n.append(s),
          n.keydown(function (e) {
            y.onBodyKeyDown(e, R, c, j)
          }),
          n.click(function (e) {
            y.onBodyClick(e, o)
          }),
          Object(ee.a)('#ss360-layer, #ss360-search-console').click(
            function (e) {
              e.stopPropagation()
            }
          ),
          (S = O.results.embedConfig) instanceof Object ||
                (S === '' && (S = void 0)),
          Object(ee.a)(window).on('popstate', function (e) {
            y.popstate(
              e,
              O.results.searchQueryParamName,
              j.searchBoxSelector
            )
          }),
          O.smart404 != null &&
                document.querySelector('title') !== null &&
                (L = U.checkAndHandle(O, C)),
          _.apply(O.style, o, O.searchBox.searchButton, j),
          !0 === O.voiceSearch.enabled &&
                Object(ee.a)(o)
                  .get()
                  .forEach(function (e) {
                    return new q(e, O.voiceSearch.lang, t.showResults)
                  })
          var i = Q.getInitializationErrors(
            o,
            L,
            void 0 !== O.results.layoverTrigger
          )
          if (
            ((l = i.length === 0)
              ? console.log(
                'SiteSearch360 ' + C.VERSION + ' initialized to ' + o
              )
              : (!0 === O.showErrors &&
                    (H.showError(i.join('<br/>')), H.hideLoadingAnimation()),
                console.error(
                  'SiteSearch360 ' +
                      C.VERSION +
                      ' FAILED to initialize to ' +
                      o +
                      (void 0 !== i ? '\n\t' + i.join('\n\t') : '')
                )),
              O.callbacks.init != null)
          ) {
            try {
              O.callbacks.init()
            } catch (e) {
              console.log(e)
            }
          }
        }),
        (this.recordTyping = F.initActionStartTime),
        (this.blur = function (e, t, s) {
          y.searchBoxBlur(
            e,
            t,
            s,
            B,
            O.searchBox.searchButton,
            function () {
              return h
            },
            C
          )
        }),
        (this.focus = function (e, t) {
          d = Object(ee.a)(e.target)
          var s = O.searchBox.focusLayer
          void 0 !== s && s && H.addDarkenInputLayer(d)
        }),
        (this.logQuery = F.logQuery),
        (this.followLink = function (e, t, s, n) {
          if (void 0 !== t) {
            if (
              (C.logQuery(e, 'select'),
                F.reportSerp(O.tracking, O.results.searchQueryParamName, e),
                s)
            ) {
              window.open(t, '_blank')
            } else {
              var i = O.results.searchQueryParamName
              if (i != '') {
                var o = E.buildQueryDict()
                o[i] !== n.trim() &&
                    ((o[i] = n), delete o.ss360Filter, E.pushState(o))
              }
              window.location.href = t
            }
          } else C.showResults(e)
        }),
        (this.prefetchResults = function (e, t, s, n, i, o) {
          var a = z.getSafeKey(t),
            r = void 0 !== i && void 0 !== i.num ? i.num : O.results.num,
            l =
                void 0 !== i && i.pageSize
                  ? i.pageSize
                  : O.results.moreResultsPagingSize,
            c = Math.min(r - e, l),
            d =
                l -
                (e -
                  Object(ee.a)(
                    '.ss360-group-' +
                      a +
                      ' ul li.ss360-suggests:not(.ss360-hidden)'
                  ).length)
          G.prefetchAndRender(
            {
              siteId: u,
              limit: c,
              contentGroup: t,
              groupResults: O.results.group,
              query: s,
              offset: e,
              highlightQueryTerms: O.results.highlightQueryTerms,
              searchResultCallback: O.callbacks.searchResult,
              filters: void 0 !== o ? o : O.results.filters,
              reporter: F
            },
            d,
            A,
            n,
            C
          )
        }),
        (this.showResults = function (g, b, v, m, e, x, t, s) {
          M = g
          var w = C
          void 0 !== s && (d = s)
          var n = O.callbacks.preSearch
          if (
            (void 0 === n || typeof n !== 'function' || n.call(C, g, b, d)) &&
              g.trim().length !== 0
          ) {
            ;(g = g.trim()), H.showLoadingAnimation()
            var i =
                  j === 'embed' &&
                  void 0 !== S &&
                  void 0 !== S.url &&
                  S.url != '',
              o = i && document.location.href.indexOf(S.url) === -1
            if (
              ('SS360Insights' in window &&
                  (!(i && void 0 === d && void 0 === m) || L) &&
                  SS360Insights.trackSubmitSearch(
                    g,
                    void 0 !== d ? d.get()[0] : void 0,
                    e,
                    t
                  ),
                o)
            ) {
              E.redirectToSearchResultPage(
                g,
                S.url,
                O.results.searchQueryParamName,
                O.allowCookies
              )
            } else {
              var a = O.results.moreResultsPagingSize || 12,
                r = O.results.num,
                l = O.results.moreResultsButton ? 2 * a : r,
                y =
                    !!O.results.moreResultsButton &&
                    O.results.limitPerGroup &&
                    (void 0 === O.contentGroups.include ||
                      O.contentGroups.include.length !== 1) &&
                    O.results.group
              l = O.results.limitPerGroup ? Math.min(l, r) : r
              var c = P(
                  u,
                  l,
                  b,
                  O.contentGroups.include,
                  O.contentGroups.exclude,
                  f,
                  g,
                  0,
                  y,
                  v
                ),
                k = z.escapeHtml(g)
              G.fetch(
                c,
                function (e) {
                  var t,
                    s = Object(ee.a)(L ? '#ss360-404-layer' : '#ss360-layer')
                  if (((L = !1), O.callbacks.searchResult != null)) {
                    try {
                      O.callbacks.searchResult.call(C, e)
                    } catch (e) {
                      console.log(e)
                    }
                  } else {
                    var n,
                      i = e.redirect
                    if (i != null && i.length > 0) {
                      return void E.handleRedirect(
                        i,
                        g,
                        k,
                        O.results.highlightSearchTerms,
                        O.callbacks.redirect
                      )
                    }
                    s.html(''),
                    S == null && O.results.showSearchBoxLayover && D(s, M),
                    (n =
                          S == null
                            ? Object(ee.a)(
                              '<section class="ss360-layer-content" tabindex="-1" aria-labelledby="ss360-search-result-heading" style="overflow-x:auto;overflow-y:auto;max-height:calc(100%-25px)">'
                            )
                            : Object(ee.a)(
                              '<section class="ss360-layer-content" aria-labelledby="ss360-search-result-heading">'
                            ))
                    var o = O.layout.mobile
                    O.layout.desktop.type == 'grid' &&
                        n.addClass('ss360-grid--lg'),
                    o.type == 'grid' && n.addClass('ss360-grid--sm'),
                    H.updateLayerByHiddenParts(T, n),
                    (t = new W(
                      O.layout.navigation,
                      e,
                      O.style.animationSpeed
                    )).build(s, n),
                    (t.getNav() !== null && t.shouldForceFlex()
                      ? s.find('#ss360-flex-wrapper')
                      : s
                    ).append(n),
                    t.getNav() !== null &&
                          t.getPosition() === 'left' &&
                          s.append(Object(ee.a)('<div style="clear:both">'))
                    var a = null,
                      r = Q.getTotalCount(
                        e,
                        y,
                        O.results.group,
                        O.contentGroups.ignoreOther,
                        O.contentGroups.exclude,
                        O.results.num
                      )
                    O.results.caption != null &&
                        ((a = A.buildHeadlineNode(
                          O.results.caption,
                          k,
                          r,
                          e.plan
                        )),
                          n.append(a)),
                    e.queryCorrection != null &&
                          e.queryCorrection != null &&
                          n.append(
                            A.buildQueryCorrectionNode(
                              O.results.queryCorrectionText,
                              e.queryCorrection,
                              O.callbacks.enter,
                              O.searchBox.selector
                            )
                          )
                    var l = A.renderSearchResults(
                      e,
                      t,
                      n,
                      O.contentGroups,
                      k,
                      r,
                      O.results,
                      O.callbacks.moreResults,
                      y,
                      w
                    )
                    if (l === 1 && O.results.redirectOnSingle) {
                      return void E.redirectToFirst(e)
                    }
                    t.getPosition() == 'top' &&
                        Object(ee.a)('.ss360-layer-content').css(
                          'max-height',
                          'calc(100% - 80px)'
                        ),
                    l == 0 &&
                          A.renderNoResultsText(n, O.results.noResultsText, k),
                    A.renderWatermark(n, e.plan, O.allowCookies),
                    e.sortingOptions != null &&
                          e.sortingOptions.length > 0 &&
                          new Y(O.results.orderByRelevanceText).render(
                      n,
                      e.sortingOptions,
                      e.sorting,
                      w.showResults,
                      g
                    ),
                    V.apply('.ss360-content-container > a')
                  }
                  H.hideLoadingAnimation()
                  try {
                    ;(B = new Date().getTime()),
                    Object(ee.a)(O.searchBox.selector).blur()
                  } catch (e) {
                    console.log(e)
                  }
                  s.removeClass('ss360-animated ss360-bo'),
                  s.removeClass('ss360-overlay')
                  var c = function () {
                    O.filters.enabled &&
                        (Object.keys(e.suggests).length > 0 ||
                          (e.activeFilterOptions &&
                            e.activeFilterOptions.length > 0)) &&
                        e.filterOptions.length > 0 &&
                        ((O.filters.headingLevel = I + 1),
                          new Z(
                            O.filters,
                            e.filterOptions,
                            e.activeFilterOptions,
                            g.trim(),
                            function (n) {
                              var e = Object.keys(n).reduce(function (e, t) {
                                var s = {}
                                return (s[t] = n[t]), e.push(s), e
                              }, [])
                              w.showResults(g, b, e, !0, void 0, void 0, 'filter')
                            }
                          ))
                  }
                  j === 'layover'
                    ? (N(s), c())
                    : (c(), s.fadeIn(), Object(ee.a)(S.contentBlock).html(s)),
                  setTimeout(function () {
                    Object(ee.a)('#ss360-search-result-heading a').focus()
                  }, 5),
                  H.hideBrokenImages(s.find('img'))
                  var d = O.results.searchQueryParamName
                  if (d !== '' && !1 !== m) {
                    var u = E.buildQueryDict()
                      ;(u[d] = g),
                    void 0 !== v && v.length > 0
                      ? (v.forEach(function (e) {
                        var t = Object.keys(e),
                          s = t[0]
                        if (
                          t.length > 0 &&
                                void 0 !== e[s].min &&
                                void 0 !== e[s].max &&
                                !isNaN(e[s].min) &&
                                !isNaN(e[s].max)
                        ) {
                          var n = e[s].min,
                            i = e[s].max
                          100 * n !== Math.round(100 * n) &&
                                  (e[s].min = parseFloat(n.toFixed(2))),
                          100 * i !== Math.round(100 * i) &&
                                    (e[s].max = parseFloat(i.toFixed(2)))
                        }
                      }),
                        (u.ss360Filter = JSON.stringify(v)))
                      : delete u.ss360Filter,
                    E.pushState(u)
                  }
                  if (
                    (G.wasBackPressed(O.allowCookies, g) &&
                        G.handleBackPress(
                          O.allowCookies,
                          t,
                          g,
                          j,
                          O.results.moreResultsPagingSize,
                          C
                        ),
                      void 0 !== O.callbacks.postSearch)
                  ) {
                    try {
                      O.callbacks.postSearch.call(C, e)
                    } catch (e) {
                      console.log(e)
                    }
                  }
                  if (void 0 !== x) {
                    try {
                      x.call(C, e)
                    } catch (e) {
                      console.log(e)
                    }
                  }
                  if (
                    (F.reportSerp(
                      O.tracking,
                      O.results.searchQueryParamName,
                      g
                    ),
                      (R = !0),
                      'SS360Insights' in window)
                  ) {
                    var f = Object(ee.a)(
                        '.ss360-suggests:not(.ss360-hidden)'
                      ).get(),
                      h =
                          void 0 !== O.results.embedConfig
                            ? 'embed'
                            : void 0 !== O.results.fullScreenConfig
                              ? 'fullscreen'
                              : 'layover'
                    Object(ee.a)('#ss360-404-layer').length > 0 &&
                        (h = 'smart404'),
                    Object(ee.a)(window).off('beforeunload.ss360Insights'),
                    Object(ee.a)(window).on(
                      'beforeunload.ss360Insights',
                      function () {
                        var e = Object(ee.a)(
                          '.ss360-suggests:not(.ss360-hidden)'
                        ).get()
                        window.SS360Insights.trackSerpLeave(
                          Object(ee.a)('.ss360-layer-content').get()[0],
                          e[0],
                          g,
                          e.length,
                          h
                        )
                      }
                    )
                    var p = void 0
                    O.filters.enabled &&
                        e.filterOptions &&
                        ((p = []),
                          e.filterOptions.forEach(function (e) {
                            p.push(e.key + '<#>' + e.name)
                          }),
                          (p = JSON.stringify(p))),
                    window.SS360Insights.trackSerpShow(
                      Object(ee.a)('.ss360-layer-content').get()[0],
                      f[0],
                      g,
                      f.length,
                      h,
                      p
                    )
                  }
                },
                function () {
                  !0 === O.showErrors &&
                      H.showError(
                        'There is no siteId "' +
                          u +
                          '", so no results can be retrieved. Please update your ss360Config object.'
                      ),
                  H.hideLoadingAnimation()
                }
              )
            }
          }
        }),
        (this.showLoading = H.showLoadingAnimation),
        (this.hideLoading = H.hideLoadingAnimation),
        (this.getSearchResultType = function () {
          return j
        })
      },
      D = {
        suggestUrl: '',
        showImagesSuggestions: !0,
        ivfImagePath: '',
        ivfImageOffset: -80,
        missingErrorImage: void 0,
        queryVisualizationHeadline: '',
        highlight: !0,
        throttleTime: 50,
        animationSpeed: 300,
        instantVisualFeedback: 'all',
        placeholder: void 0,
        extraHtml: void 0,
        lineCallback: void 0,
        noSuggests: void 0,
        emptyQuerySuggests: void 0,
        minChars: 3,
        maxWidth: 'auto',
        showDeleteAllButton: !1,
        suggestOrder: [],
        suggestSelectionOrder: [],
        headingLevel: 4,
        enabled: !0,
        mobileScrollOnFocus: !0
      },
      J = {
        renderDefaultStyles: function (e) {
          var t = m(3)
          Object(ee.a)('head').append(
            '<style type="text/css">' + t + '</style>'
          )
          var s = ''
          if (
            e.layout.mobile.type === 'grid' ||
            e.layout.desktop.type === 'grid'
          ) {
            var n = [],
              i = Math.min(e.layout.mobile.gridColsSm || 1, 10).toString(),
              o = Math.min(e.layout.mobile.gridColsMd || 2, 10).toString(),
              a = Math.min(e.layout.desktop.gridColsLg || 3, 10).toString(),
              r = Math.min(e.layout.desktop.gridColsXl || 4, 10).toString(),
              l =
                '@media (#M_QUERY#){.ss360-layer-content.ss360-grid--#SZ# .ss360-group>ul>li{-ms-flex-preferred-size:calc(100% / #COLS# - 1px);-webkit-flex-basis:calc(100% / #COLS# - 1px);flex-basis:calc(100% / #COLS# - 1px);max-width:calc(100% / #COLS# - 1px)}}'
            e.layout.mobile.type === 'grid' &&
              (i !== 1 &&
                n.push(
                  l
                    .replace('#M_QUERY#', 'max-width: 767px')
                    .replace('#SZ#', 'sm')
                    .replace(/#COLS#/g, i)
                ),
                o !== 2 &&
                n.push(
                  l
                    .replace('#M_QUERY#', 'max-width: 991px')
                    .replace('#SZ#', 'sm')
                    .replace(/#COLS#/g, o)
                )),
            e.layout.desktop.type === 'grid' &&
                (a !== 3 &&
                  n.push(
                    l
                      .replace('#M_QUERY#', 'min-width: 992px')
                      .replace('#SZ#', 'lg')
                      .replace(/#COLS#/g, a)
                  ),
                  r !== 4 &&
                  n.push(
                    l
                      .replace('#M_QUERY#', 'min-width: 1200px')
                      .replace('#SZ#', 'lg')
                      .replace(/#COLS#/g, r)
                  )),
            (s += n.join(''))
          }
          if (e.style.themeColor !== x.style.themeColor) {
            var c = e.style.themeColor,
              d = {
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
            if (
              ((s +=
                [
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
                ].join(',') +
                '{background-color: ' +
                c +
                '}'),
                (s +=
                [
                  '.ss360-more-results',
                  '#ss360-custom-searchbutton',
                  '#ss360-query:focus',
                  '.ss360-nav-entry',
                  '.ss360-sldr--r',
                  '.ss360-sldr--l',
                  '.ss360-delete-filter-bar button'
                ].join(',') +
                '{border-color: ' +
                c +
                '}'),
                (s += d.bottom.join(',') + '{border-bottom-color: ' + c + '}'),
                (s += d.right.join(',') + '{border-right-color: ' + c + '}'),
                (s +=
                [
                  '.ss360-more-results',
                  '#unibox-suggest-box a',
                  '#unibox-suggest-box-special a',
                  '.unibox-selectable.unibox-show-all',
                  '.unibox-selectable.unibox-show-all span',
                  '#ss360-filter .ss360-filter-group.ss360-active .ss360-filter-btn',
                  '.ss360-delete-filter-bar button i',
                  '.ss360-delete-filter-bar button.ss360-filter--delete-all'
                ].join(',') +
                '{color: ' +
                c +
                '}'),
                !0 === e.filters.enabled)
            ) {
              var u = (function (e) {
                e.length === 4 &&
                  (e =
                    '#' +
                    Array(3).join(e[1]) +
                    Array(3).join(e[2]) +
                    Array(3).join(e[3]))
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
                return t
                  ? {
                    r: parseInt(t[1], 16),
                    g: parseInt(t[2], 16),
                    b: parseInt(t[3], 16)
                  }
                  : null
              })(c)
              u !== null &&
                (s += '.ss360-sldr--r, .ss360-sldr--l{0.5px 0.5px 2px 1px rgba('
                  .concat(u.r, ', ')
                  .concat(u.g, ', ')
                  .concat(u.b, ', .32)}'))
            }
          }
          var f = e.layout.navigation
          if (parseInt(f.tabSpacingPx) !== x.layout.navigation.tabSpacingPx) {
            var h = parseInt(f.tabSpacingPx)
            ;(s +=
              'nav.ss360-tabbed.ss360-left-nav li:not(:last-of-type) button{margin-bottom: ' +
              h +
              'px}'),
            (s +=
                'nav.ss360-tabbed.ss360-top-nav li:not(:last-of-type) button{margin-right: ' +
                h +
                'px}'),
            (s +=
                'nav.ss360-tabbed.ss360-top-nav li.ss360-active+li{padding-left: ' +
                (h + 1) +
                'px}'),
            (s +=
                'nav.ss360-tabbed.ss360-left-nav li.ss360-active+li{padding-top: ' +
                (h + 1) +
                'px}')
          }
          if (
            parseInt(f.borderRadiusPx) !== x.layout.navigation.borderRadiusPx
          ) {
            var p = parseInt(f.borderRadiusPx)
            ;(s +=
              'nav.ss360-tabbed.ss360-top-nav li button{border-top-left-radius:' +
              p +
              'px;border-top-right-radius:' +
              p +
              'px}'),
            (s +=
                'nav.ss360-tabbed.ss360-left-nav li button{border-bottom-left-radius:' +
                p +
                'px;border-top-left-radius:' +
                p +
                'px}')
          }
          e.style.additionalCss && (s += e.style.additionalCss)
          var g = Object(ee.a)('body')
          s !== '' &&
            g.append('<style id="ss360-default-css">' + s + '</style>'),
          g.append(
            '<div id="ss360-searchbox-spinner"><div class="ss360-double-bounce1"></div><div class="ss360-double-bounce2"></div></div>'
          )
          var b = parseInt(e.style.animationSpeed) / 1e3
          if (e.style.loaderType == 'square') {
            var v = Object(ee.a)('#ss360-searchbox-spinner')
            v.html(''),
            v.addClass('ss360-spinner-square'),
            v.css('animationDuration', 1 + b + 's')
          } else {
            e.style.loaderType == 'none'
              ? Object(ee.a)('#ss360-searchbox-spinner').html('')
              : Object(ee.a)('#ss360-searchbox-spinner > *').css(
                'animationDuration',
                2 + b + 's'
              )
          }
        }
      },
      K = function (e) {
        var s = ee.a.extend(Q.copyObject(x), e)
        s.filters.enabled &&
          void 0 === e.filters.position &&
          void 0 === s.results.embedConfig &&
          void 0 === s.results.fullScreenConfig &&
          (s.filters.position = 'top'),
        w.assert(e, s)
        var t,
          n,
          i = new N(s)
        ;(t = i),
        ((n = s.callbacks).enter = Q.enhanceCallback(
          n.enter,
          t.showResults,
          'enter',
          t
        )),
        (n.focus = Q.enhanceCallback(n.focus, t.focus, 'focus', t)),
        (n.blur = Q.enhanceCallback(n.blur, t.blur, 'blur', t)),
        (n.enterResult = Q.enhanceCallback(
          n.enterResult,
          t.followLink,
          'enterResult',
          t
        )),
        (n.type = Q.enhanceCallback(n.type, t.recordTyping, 'type', t)),
        Object(ee.a)(document).ready(function () {
          var t, o
            ;(t = s),
          ((o = ee.a).fn.unibox = function (i) {
            ;((i = Q.copyObject(i || {})).hasMultipleSearchBoxes =
                  this.length > 1),
            w.extendUniboxOptions(t, i)
            var e = this.map(function (e, t) {
              t = o(t)
              var s = o.extend(Q.copyObject(D), i)
              s.searchBoxContainerSelector == null
                ? (s.searchBoxContainer = t.parent())
                : (s.searchBoxContainer = o(s.searchBoxContainerSelector))
              var n = new a.a()
              return n.init(t, s), n
            })
            return e.length == 1 ? e[0] : e
          }),
          i.init(),
          s.style.defaultCss && J.renderDefaultStyles(s)
          var e =
              void 0 === s.results.embedConfig ||
              void 0 === s.results.embedConfig.populateSearchBoxOnRedirect ||
              !1 !== s.results.embedConfig.populateSearchBoxOnRedirect
          !(function (e, t, s, n, i, o) {
            var a = E.buildQueryDict()
            if (void 0 !== a.ss360SearchTerm && n) {
              try {
                Object(ee.a)('div').highlight(
                  a.ss360SearchTerm,
                  'ss360-search-term-highlight'
                )
              } catch (e) {
                console.log(e)
              }
            }
            if (void 0 !== a[e]) {
              var r = a[e] || ee.a.readCookie('ss360LastQuery')
              if (r != null) {
                o.getSearchResultType() === 'fullscreen' &&
                    (Object(ee.a)('#ss360-query').val(r),
                      Object(ee.a)('#ss360-search-console').css('top') != '0px' &&
                      o.showFullscreenLayer()),
                i && Object(ee.a)(s).val(r)
                var l = void 0
                if (t) {
                  try {
                    void 0 !== a.ss360Filter &&
                        (l = JSON.parse(a.ss360Filter))
                  } catch (e) {
                    console.warn(e)
                  }
                }
                o.showResults(r, void 0, l, !1, void 0, void 0, 'pageload')
              }
            }
          })(
            s.results.searchQueryParamName,
            s.filters.enabled,
            s.searchBox.selector,
            s.results.highlightSearchTerms,
            e,
            i
          )
        }),
        (window.SS360 = {
          changeConfig: i.changeConfig,
          setSiteId: i.setSiteId,
          init: i.init,
          showResults: i.showResults,
          showFullscreenLayer: i.showFullscreenLayer,
          closeLayer: i.closeLayer,
          showLoading: i.showLoading,
          hideLoading: i.hideLoading,
          isInitialized: i.isInitialized,
          getVersion: function () {
            return i.VERSION
          }
        })
      }
    ;(window.initializeSs360 = function (e) {
      // Patch: prevent an error when the widget is manually initialised.
      if (window.ss360Config === undefined) {
        return
      }
      // end Patch
      ;(e = e || window.ss360Config), K(e)
    }),
    ('ss360Config' in window && !1 === window.ss360Config.autoInit) ||
        initializeSs360(),
    (window.sxQuery = ee.a)
  }
])
