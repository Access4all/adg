!(function () {
  var e = function (s) {
      var i = this,
        n = (function () {
          for (var e = [], t = 0; t < s.length; t++) e.push(s[t])
          return e
        })(),
        o = {
          width: !0,
          height: !0,
          minWidth: !0,
          minHeight: !0,
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
        for (var t = 0; t < n.length; t++) {
          var s = n[t]
          s && e && e(s, t == n.length - 1)
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
      (this._addNode = function (s, i) {
        var n = []
        if (typeof s === 'string') {
          return (n = n.concat(this._addNode(t.parseHTML(s), i)))
        }
        if (
          s instanceof Array ||
            s instanceof HTMLCollection ||
            s instanceof NodeList
        ) {
          for (
            var o = i ? 0 : s.length - 1;
            i ? o < s.length : o >= 0;
            i ? o++ : o--
          ) {
            n = n.concat(this._addNode(s[o], i))
          }
          return n
        }
        return s instanceof e
          ? ((n = n.concat(this._addNode(s.get(), i))),
            s.clear(),
            s.push(n),
            n)
          : s instanceof Node ||
              (void 0 !== s && s.appendChild && s.cloneNode)
            ? (this._it(function (e, t) {
              var o = t ? s : s.cloneNode(!0)
              n.push(o),
              i || !e.firstChild
                ? e.appendChild(o)
                : e.insertBefore(o, e.firstChild)
            }),
              n)
            : void 0
      }),
      (this._init = function () {
        for (var e = 0; e < n.length; e++) this[e] = n[e]
      }),
      this._init(),
      (this.length = n.length),
      (this.push = function (e) {
        ;(n = (n = n || []).concat(e)), (this.length = n.length)
      }),
      (this.clear = function () {
        ;(n = []), (this.length = 0)
      }),
      (this.get = function (e) {
        return void 0 !== e ? n[e] : n
      }),
      (this.remove = function () {
        this._it(function (e) {
          e.parentNode && e.parentNode.removeChild(e)
        })
      }),
      (this._trigger = function (e) {
        var t
        window.CustomEvent
          ? (t = new CustomEvent(e))
          : (t = document.createEvent('CustomEvent')).initCustomEvent(
            e,
            !0,
            !0
          ),
        this._it(function (e) {
          e.dispatchEvent(t)
        })
      }),
      (this.on = function (e, s, n) {
        if (void 0 === n) this.on(e, void 0, s)
        else if (s) {
          var o = this._match,
            r = this._canMatch,
            a = function (e, t, s, i, n) {
              if (n && n.target) {
                if (e(n.target) && t(n.target, s)) i.bind(n.target, n).call()
                else {
                  for (var o = n.target; o.parentNode && e(o.parentNode);) {
                    if (e((o = o.parentNode)) && t(o, s)) {
                      i.bind(n.target, n).call()
                      break
                    }
                  }
                }
              }
            }.bind(this, r, o)
          this._it(function (t) {
            for (var i = e.split(','), o = 0; o < i.length; o++) {
              t.addEventListener(i[o].trim(), a.bind(this, s, n))
            }
          })
        } else {
          this._it(function (s) {
            for (var i = e.split(','), o = 0; o < i.length; o++) {
              var r = i[o]
              if (r.indexOf('.') !== -1) {
                var a = r.split('.')
                a.length == 2 &&
                    ((r = r.trim()),
                      t._callbacksByName[r] || (t._callbacksByName[r] = []),
                      t._callbacksByName[r].push(n),
                      (r = a[0]))
              }
              s.addEventListener(r.trim(), n)
            }
          })
        }
        return i
      }),
      (this.off = function (e, s) {
        var n = e.split(',')
        return n && n.length != 0
          ? (this._it(function (e) {
            n.map(function (i) {
              if (i.indexOf('.') === -1) e.removeEventListener(i.trim(), s)
              else if (t._callbacksByName[i.trim()]) {
                var n = i.split('.')[0].trim()
                t._callbacksByName[i.trim()].map(function (t) {
                  e.removeEventListener(n, t)
                })
              }
            })
          }),
            i)
          : i
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
              e.focus ? e.focus() : t(e)._trigger('focus')
            })
            : this.on('focus', e),
          i
        )
      }),
      (this.blur = function (e) {
        return (
          void 0 === e
            ? this._it(function (e) {
              e.blur ? e.blur() : t(e)._trigger('blur')
            })
            : this.on('blur', e),
          i
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
      (this.find = function (e) {
        var s = []
        return (
          this._it(function (i) {
            for (var n = t.querySelectorAll(e, i), o = 0; o < n.length; o++) {
              s.push(n[o])
            }
          }),
          t(s)
        )
      }),
      (this.children = function () {
        var e = []
        return (
          this._it(function (t) {
            for (var s = 0; s < t.childElementCount; s++) {
              e.push(t.children[s])
            }
          }),
          t(e)
        )
      }),
      (this.hasChild = function (e) {
        for (var s = 0; s < n.length; s++) {
          var i = n[s]
          if (i.children && i.children.length > 0) {
            for (var o = [], r = 0; r < i.children.length; r++) {
              var a = i.children[r]
              if (a === e) return !0
              o.push(a)
            }
            for (r = 0; r < o.length; r++) if (t(o[r]).hasChild(e)) return !0
          }
        }
        return !1
      }),
      (this.is = function (e) {
        for (var t = 0; t < n.length; t++) {
          if (n[t] === e) return !0
        }
        return !1
      }),
      (this.text = function (e) {
        if (e == null) {
          var t = ''
          return (
            this._it(function (e) {
              t += e.textContent || ''
            }),
            t
          )
        }
        return (
          this._it(function (t) {
            t.innerText = e
          }),
          i
        )
      }),
      (this.position = function () {
        if (n.length > 0) {
          var e,
            s = n[0],
            i = t(s)
          if (i.css('position') == 'fixed') e = s.getBoundingClientRect()
          else {
            var o = s.offsetParent,
              r = t(o),
              a = { top: 0, left: 0 }
              ;(e = i.offset()),
            o.nodeName != 'html' && (a = r.offset()),
            (a.top += parseFloat(r.css('borderTopWidth'))),
            (a.left += parseFloat(r.css('borderLeftWidth'))),
            (e.top = e.top - a.top - parseFloat(i.css('marginTop'))),
            (e.left = e.left - a.left - parseFloat(i.css('marginLeft')))
          }
          return e
        }
      }),
      (this.attr = function (e, t) {
        if (void 0 === t) {
          if (n.length > 0) return n[0].getAttribute(e)
        } else {
          this._it(function (s) {
            s.setAttribute(e, t)
          })
        }
      }),
      (this.removeAttribute = function (e) {
        e &&
            this._it(function (t) {
              t.removeAttribute && t.removeAttribute(e)
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
      (this.addClass = function (e) {
        var t = e.split(' ')
        this._it(function (e) {
          for (var s = 0; s < t.length; s++) {
            e.classList ? e.classList.add(t[s]) : (e.className += ' ' + t[s])
          }
        })
      }),
      (this.removeClass = function (e) {
        var t = e.split(' ')
        this._it(function (e) {
          for (var s = 0; s < t.length; s++) {
            e.classList
              ? e.classList.remove(t[s])
              : (e.className = e.className.replace(
                new RegExp(
                  '(^|\\b)' + t[s].split(' ').join('|') + '(\\b|$)',
                  'gi'
                ),
                ' '
              ))
          }
        })
      }),
      (this.hasClass = function (e) {
        for (var t = 0; t < n.length; t++) {
          var i = s[t]
          if (i) {
            if (i.classList) {
              if (i.classList.contains(e)) return !0
            } else if (
              new RegExp('(^| )' + e + '( |$)', 'gi').test(i.className)
            ) {
              return !0
            }
          }
        }
        return !1
      }),
      (this.filter = function (e) {
        return t(this.get().filter(e))
      }),
      (this.val = function (e) {
        return void 0 !== e
          ? (this._it(function (t) {
            t.value = e
          }),
            this)
          : n.length > 0 ? n[0].value : void 0
      }),
      (this.css = function (e, t) {
        if (
          ((e = e.replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase()
          })),
            void 0 !== t)
        ) {
          var s = t.toString()
          o[e] &&
              s.indexOf('px') === -1 &&
              s.indexOf('%') === -1 &&
              s.indexOf('calc') === -1 &&
              t !== 0 &&
              t !== '' &&
              ((t = t.toString()), (t += 'px')),
          this._it(function (s) {
            s.style[e] = t
          })
        } else if (n.length > 0) {
          for (var i = 0; i < n.length; i++) {
            try {
              return window.getComputedStyle(n[i])[e]
            } catch (e) {}
          }
          return null
        }
      }),
      (this.append = function (e) {
        this._addNode(e, !0)
      }),
      (this.prepend = function (e) {
        this._addNode(e, !1)
      }),
      (this.parent = function () {
        var e = []
        return (
          this._it(function (t) {
            e.push(t.parentNode)
          }),
          t(e)
        )
      }),
      (this.parents = function (e) {
        var t = [],
          s = this
        return (
          this._it(function (i) {
            for (var n = i.parentNode; n && s._canMatch(n);) {
              ;(void 0 === e || s._match(n, e)) && t.push(n),
              (n = n.parentNode)
            }
          }),
          t
        )
      }),
      (this.prev = function () {
        var e = []
        return (
          this._it(function (t) {
            e.push(t.previousElementSibling)
          }),
          t(e)
        )
      }),
      (this.next = function () {
        var e = []
        return (
          this._it(function (t) {
            e.push(t.nextElementSibling)
          }),
          t(e)
        )
      }),
      (this.closest = function (e) {
        var s = [],
          i = this
        return (
          this._it(function (t) {
            for (var n = t; n && i._canMatch(n) && !i._match(n, e);) {
              n = n.parentNode
            }
            i._canMatch(n) || (n = void 0), s.push(n)
          }),
          t(s)
        )
      }),
      (this.index = function (e) {
        for (var t = 0; t < n.length; t++) if (n[t] === e) return t
        return -1
      }),
      (this.offset = function () {
        if (n.length > 0) {
          var e = n[0]
          if (!e.getClientRects().length) return { top: 0, left: 0 }
          var t = e.getBoundingClientRect(),
            s = e.ownerDocument.defaultView
          return { top: t.top + s.pageYOffset, left: t.left + s.pageXOffset }
        }
      }),
      (this.outerWidth = function () {
        if (n.length > 0) return n[0].offsetWidth
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
        if (n.length > 0) return n[0].offsetHeight
      }),
      (this.html = function (e) {
        if (void 0 !== e) this.empty(), this.append(e)
        else if (n.length > 0) return n[0].innerHTML
      }),
      (this.empty = function () {
        this._it(function (e) {
          for (; e.firstChild;) e.removeChild(e.firstChild)
        })
      }),
      (this.scrollTop = function (e) {
        if (void 0 !== e) {
          this._it(function (t) {
            void 0 !== t.scrollTop
              ? (t.scrollTop = e)
              : void 0 !== t.scrollY &&
                  void 0 !== t.scrollTo &&
                  t.scrollTo(t.scrollX, e)
          })
        } else if (n.length > 0) {
          return void 0 !== n[0].scrollTop ? n[0].scrollTop : n[0].scrollY
        }
      }),
      (this.ready = function (e) {
        this._it(function (t) {
          ;(t.attachEvent
            ? t.readyState === 'complete'
            : t.readyState !== 'loading')
            ? e()
            : t.addEventListener('DOMContentLoaded', e)
        })
      }),
      (this.isVisible = function () {
        if (n.length > 0) return t(n[0]).css('display') !== 'none'
      }),
      (this.map = function (e) {
        var t = [],
          s = 0
        return (
          this._it(function (i) {
            t.push(e(s, i)), s++
          }),
          t
        )
      }),
      (this._animate = function (e, s, i, n, o, r) {
        var a = 0,
          l = +new Date(),
          c = function () {
            var u = new Date()
            a += Math.PI / (i / (u - l))
            var d = n + n * Math.cos(a)
            o(e, d),
            (l = +new Date()),
            a >= Math.PI
              ? void 0 !== r && typeof r === 'function' && r(e)
              : t._notifyAnimation(e, s, t._requestAnimation(c))
          }
        t._notifyAnimation(e, s, t._requestAnimation(c))
      }),
      (this._fade = function (e, s, i) {
        var n = function (e, t, s) {
            t != null && s != null && (t.style.opacity = e > 0 ? 1 - s : s)
          }.bind(this, e ? -1 : 1),
          o = function (e, s, i) {
            var n = t(i)
            n.css('opacity', ''),
            e && n.hide(),
            s && typeof s === 'function' && s.bind(n).call()
          }.bind(this, e, i),
          r = this
        this._it(function (e) {
          t._clearAnimation(e, 'fade'),
          s == 0 || t.prefersReducedMotion()
            ? o(e)
            : r._animate(e, 'fade', s || 400, 0.5, n, o)
        })
      }),
      (this.fadeIn = function (e, t) {
        this.css('display', 'block'),
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
      (this._slide = function (e, s, i) {
        var n = this,
          o = function (e, s, i) {
            var n = t(i)
            n.css('height', ''),
            e && n.hide(),
            s && typeof s === 'function' && s.bind(n).call()
          }.bind(this, e, i)
        this._it(function (i) {
          if (
            (t._clearAnimation(i, 'slide'),
              s == 0 || t.prefersReducedMotion())
          ) {
            o(i)
          } else {
            var r = t(i),
              a = r.outerHeight()
            r.css('height', 0)
            var l = a / 2
            n._animate(
              i,
              'slide',
              s || 400,
              l,
              function (e, t, s, i) {
                if (s != null && i != null) {
                  var n = e ? i : t - i
                  s.style.height = n + 'px'
                }
              }.bind(this, e, a),
              o
            )
          }
        })
      }),
      (this.slideDown = function (e, t) {
        this.css('display', 'block'), this._slide(!1, e, t)
      }),
      (this.slideUp = function (e, s) {
        this._it(function (e) {
          var s = t(e)
          s.css('height', s.outerHeight())
        }),
        this._slide(!0, e, s)
      }),
      (this.animateScrollTop = function (e, s) {
        var i = this
        s = s || 400
        this._it(function (n) {
          var o = n.scrollTop,
            r = Math.abs(o - e)
          if (
            (t._clearAnimation(n, 'scrollTop'),
              r < 1 || s == 0 || t.prefersReducedMotion())
          ) {
            n.scrollTop = e
          } else {
            var a = r / 2
            i._animate(
              n,
              'scrollTop',
              s || 400,
              a,
              function (e, t, s, i) {
                s.scrollTop = t >= e ? e + (Math.abs(e - t) - i) : t + i
              }.bind(this, o, e)
            )
          }
        })
      }),
      (this.animateTop = function (e, s) {
        var i = this,
          n = function (e, s) {
            t(s).css('top', e)
          }.bind(this, e)
        this._it(function (o) {
          if (
            (t._clearAnimation(o, 'positionTop'),
              s == 0 || t.prefersReducedMotion())
          ) {
            n(o)
          } else {
            var r,
              a,
              l = t(o),
              c = parseFloat(l.css('top'))
            if (e.indexOf('%') !== 0) {
              ;(a =
                  l.css('position') == 'fixed'
                    ? window.innerHeight
                    : parseFloat(l.parent().css('height'))),
              (r = parseFloat(e) / 100 * a)
            } else r = parseFloat(e)
            var u = Math.abs(c - r) / 2
            i._animate(
              o,
              'positionTop',
              s || 400,
              u,
              function (e, s, i, n) {
                var o
                s >= e
                  ? ((o = n), e < 0 && (o *= -1))
                  : (o = s < 0 ? s + n : n + e),
                t(i).css('top', o + 'px')
              }.bind(this, c, r),
              n
            )
          }
        })
      }),
      (this.highlight = function (e, s) {
        return this.length && e && e.length
          ? this._it(function (i) {
            !(function e (i, n) {
              if (
                t(i).parents('.ss360-search-term-highlight').length !== 0
              ) {
                return 1
              }
              var o = 0
              if (i.nodeType == 3) {
                var r = i.data.toUpperCase().indexOf(n)
                if (
                  (r -=
                        i.data.substr(0, r).toUpperCase().length -
                        i.data.substr(0, r).length) >= 0
                ) {
                  var a = document.createElement('span')
                  a.className = s
                  var l = i.splitText(r),
                    c = (l.splitText(n.length), l.cloneNode(!0))
                  a.appendChild(c), l.parentNode.replaceChild(a, l), (o = 1)
                }
              } else if (i.nodeType == 1 && i.childNodes && !/(script|style)/i.test(i.tagName)) for (var u = 0; u < i.childNodes.length; ++u) u += e(i.childNodes[u], n)
              return o
            })(i, e.toUpperCase())
          })
          : this
      })
    },
    t = function (s) {
      var i = !1
      try {
        i = s instanceof Window
      } catch (e) {
        i = window.constructor ? s instanceof window.constructor : s === window
      }
      if (typeof s === 'string') {
        var n = t.parseHTML(s)
        return n.length === 0 ? new e(t.querySelectorAll(s)) : new e(n)
      }
      return s instanceof Node ||
        s === document ||
        (void 0 !== s && s.appendChild && s.cloneNode)
        ? new e([s])
        : s instanceof Array ||
          s instanceof HTMLCollection ||
          s instanceof NodeList
          ? new e(s)
          : new e(i ? [s] : s instanceof e ? s.get() : [])
    }
  ;(t._animations = {}),
  (t._callbacksByName = {}),
  (t._animationNodeFlag = 0),
  (t._notifyAnimation = function (e, s, i) {
    e.sxQueryAnimationFlag ||
        ((e.sxQueryAnimationFlag = t._animationNodeFlag),
          t._animationNodeFlag++,
          (t._animations[e.sxQueryAnimationFlag] = {})),
    (t._animations[e.sxQueryAnimationFlag][s] = i)
  }),
  (t._clearAnimation = function (e, s) {
    var i = e.sxQueryAnimationFlag
    void 0 !== i &&
        void 0 !== t._animations[i] &&
        s in t._animations[i] &&
        t._stopAnimation(t._animations[i][s])
  }),
  (t._requestAnimation = function (e) {
    return (
      (window.requestAnimationFrame && requestAnimationFrame(e)) ||
        setTimeout(e, 16)
    )
  }),
  (t._stopAnimation = function (e) {
    ;(window.cancelAnimationFrame && window.cancelAnimationFrame(e)) ||
        clearTimeout(e)
  }),
  (t.inArray = function (e, t) {
    return t.indexOf(e)
  }),
  (t.each = function (e, t) {
    if (e instanceof Array) {
      e.forEach(function (e, s) {
        t && typeof t === 'function' && t(s, e)
      })
    } else {
      for (var s in e) {
        e.hasOwnProperty &&
            e.hasOwnProperty(s) &&
            t &&
            typeof t === 'function' &&
            t(s, e[s])
      }
    }
    return e
  }),
  (t.parseHTML = function (e) {
    var t = document.implementation.createHTMLDocument('')
    return (t.body.innerHTML = e), t.body.children
  }),
  (t.extend = function (e) {
    for (var t = e || {}, s = 1; s < arguments.length; s++) {
      if (arguments[s]) {
        for (var i in arguments[s]) {
          arguments[s].hasOwnProperty(i) &&
              void 0 !== arguments[s][i] &&
              (t[i] = arguments[s][i])
        }
      }
    }
    return t
  }),
  (t.ajax = function (e) {
    var s = (e = e || {}).method || 'GET',
      i = e.dataType,
      n = e.url,
      o = e.success || function () {},
      r = e.error || function () {},
      a = 'XDomainRequest' in window,
      l = a ? new XDomainRequest() : new XMLHttpRequest()
    l.open(s, a ? n.replace('https://', '//') : n, !0),
    (l.onload = function () {
      if (a || (l.status >= 200 && l.status < 400)) {
        var e = l.responseText
        if (!i || i === 'json') {
          try {
            o(JSON.parse(e))
          } catch (t) {
            console.warn(t), o(e)
          }
        }
      }
    }),
    (l.onerror = function () {
      r(l.status, l.statusText)
    })
    var c = function (i) {
      try {
        if (s !== 'POST') i.send()
        else {
          var n = ''
          t.each(e.data, function (e, t) {
            n += e + '=' + t + '&'
          }),
          n.length > 0 && (n = n.substring(0, n.length - 1)),
          i.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
          ),
          i.send(n)
        }
      } catch (e) {
        r(i.status, i.statusText, e)
      }
    }.bind(this, l)
    a ? setTimeout(c, 0) : c()
  }),
  (t.get = function (e, s, i, n) {
    t.ajax({ url: e, success: s, error: i, dataType: n })
  }),
  (t.post = function (e, s, i, n) {
    t.ajax({ url: e, success: i, dataType: n, method: 'POST', data: s })
  }),
  (t.grep = function (e, t) {
    for (var s = [], i = 0; i < e.length; i++) t(e[i]) && s.push(e[i])
    return s
  }),
  (t.querySelectorAll = function (e, s) {
    s = s || document
    var i = []
    if (
      e.indexOf('#') === 0 &&
        e.indexOf(' ') == -1 &&
        e.indexOf('.') == -1 &&
        e.indexOf(':') == -1
    ) {
      var n = s.getElementById
        ? s.getElementById(e.replace('#', ''))
        : s.querySelector(e)
      return n && i.push(n), i
    }
    if (e.indexOf(':first') !== -1 || e.indexOf(':visible') !== -1) {
      for (var o = e.split(' '), r = 0; r < o.length; r++) {
        var a = o[r],
          l = !1,
          c = !1
        a.indexOf(':first') !== -1
          ? ((l = !0), (a = a.replace(':first', '')))
          : a.indexOf(':visible') !== -1 &&
              ((c = !0), (a = a.replace(':visible', ''))),
        (i = i.length === 0 ? t(s).find(a) : i.find(a)),
        l && i.length > 0
          ? (i = t(i[0]))
          : c &&
                i.length > 0 &&
                (i = i.filter(function (e) {
                  return t(e).isVisible()
                }))
      }
      i = i.get()
    } else e && (i = s.querySelectorAll(e))
    return i
  }),
  (t.prefersReducedMotion = function () {
    return (
      window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }),
  (t.srOnlyCss =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0')
  var s = {
    set: function (t, s, i) {
      e.prototype[s] = i
    }
  }
  try {
    t.fn = new Proxy({}, s)
  } catch (s) {
    t.fn = e.prototype
  }
  window.sxQuery = t
})()
var UniBox = function () {
    var e,
      t,
      s,
      i,
      n,
      o,
      r,
      a,
      l,
      c,
      u,
      d,
      g,
      h = -1,
      p = '',
      f = '',
      x = -80,
      b = [],
      v = !0,
      m = 300,
      y = '',
      S = 2,
      w = [],
      k = 'all',
      C = -1,
      Q = void 0,
      A = '',
      T = !1,
      I = [],
      R = [],
      N = void 0,
      L = void 0,
      B = !0,
      M = void 0,
      O = void 0,
      P = !0,
      D = void 0,
      H = void 0,
      E = void 0,
      z = void 0,
      U = void 0,
      F = void 0,
      _ = void 0,
      q = {},
      Y = !1,
      G = void 0,
      j = 'h4',
      V = '',
      Z = void 0,
      W = 'Search suggestions are hidden',
      X = 'No search suggestions',
      J = '##COUNT## search suggestions shown',
      K = '##COUNT## search suggestion shown',
      $ =
        'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.',
      ee = void 0,
      te = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      }
    function se (e) {
      if (void 0 !== (e = e || window.event)) {
        var t = e.keyCode || e.which
        void 0 !== t && t === 0 && void 0 !== Z && ((t = Z), (Z = void 0))
        var s = xe().val()
        ;(t === 27 || t === 13 || t === 9 || (s.length < S && void 0 === M)) &&
          (ie(e),
            t === 13 && void 0 !== a && h === -1 && (a.call(this, s), ye()),
            (h = -1))
      } else ie(e), (h = -1)
    }
    function ie (t) {
      var s = sxQuery('#unibox-suggest-box')
      e.attr('aria-expanded', 'false')
      var i = sxQuery('#ss360-status-message'),
        n = W
      if (
        (i.text() !== n && i.text(n),
          e.removeAttribute('aria-activedescendant'),
          void 0 !== d && s.hasClass('uniboxActive'))
      ) {
        try {
          d.call(this, t, e.val(), !1)
        } catch (e) {
          console.log(e)
        }
      }
      sxQuery('#ss360Darken-input').remove(),
      s.removeClass('uniboxActive'),
      pe() || s.slideUp(m),
      ce()
    }
    function ne (e, t) {
      var s = null
      return function () {
        var i = this,
          n = arguments
        clearTimeout(s),
        (s = window.setTimeout(function () {
          e.apply(i, n)
        }, t || 50))
      }
    }
    function oe (e, t) {
      if (!v || void 0 === e || void 0 === t) return e
      var s = t
        .replace(/[^a-zA-Z0-9äöüÄÖÜß]|\s+|\r?\n|\r/gim, ' ')
        .replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, ' ')
        .split(' ')
      s.sort(function (e, t) {
        return t.length - e.length
      })
      var i = {}
      sxQuery.each(s, function (t, s) {
        if (!(s.length < 1)) {
          var n = e.match(
            new RegExp('((' + s + ')(?!#<##|-\\d+#<##))(?!.*\\1)', 'gi')
          )
          if (n != null) {
            for (var o = 0; o < n.length; o++) {
              var r = n[o],
                a = r.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
              ;(e = e.replace(
                new RegExp('(' + a + ')(?!#<##|-\\d+#<##)', 'g'),
                '##>#' + t + '-' + o + '#<##'
              )),
              (i['##>#' + t + '-' + o + '#<##'] =
                  '<span class="unibox-highlight">' + r + '</span>')
            }
          }
        }
      })
      for (var n = Object.keys(i).reverse(), o = 0; o < n.length; o++) {
        var r = n[o],
          a = i[r]
        e = e.replace(new RegExp(r, 'gi'), a)
      }
      return e
    }
    function re (e) {
      return e.replace(/[ "§$%&/(){}+*,.;|]/g, '_').toLowerCase()
    }
    function ae (s) {
      var n = be(),
        a = sxQuery('#unibox-special-searchbox')
      if (C !== 13 && void 0 !== s && s.hasOwnProperty('suggests')) {
        var c = xe().val(),
          u = String(c).replace(/[&<>"'\/]/g, function (e) {
            return te[e]
          })
        n.html(''), sxQuery('#unibox-suggest-box-special').html('')
        var d = !1,
          g = !1,
          p = Object.keys(s.suggests)
        I &&
          I.length > 0 &&
          ((p = I),
            sxQuery.each(Object.keys(s.suggests), function (e, t) {
              sxQuery.inArray(t, p) < 0 && p.push(t)
            }))
        var v = 0
        pe()
          ? a.removeAttribute('aria-activedescendant')
          : e.removeAttribute('aria-activedescendant'),
        sxQuery.each(p, function (e, t) {
          var n = s.suggests[t]
          if (!n || n.length === 0) return !0
          var a = 0
          sxQuery.each(p, function (e, i) {
            var n = s.suggests[i]
            if (!n || t === i || n.length === 0) return !0
            a += n.length
          })
          var l = re(t),
            c = sxQuery(
              '<section class="unibox-suggest-cluster unibox-suggest-' +
                  l +
                  ' unibox-' +
                  n.length +
                  '-entries ' +
                  (a === 0 ? 'unibox-single-suggestion-block' : '') +
                  '" aria-labelledby="unibox-suggest-cluster-heading-' +
                  l +
                  '"></section>'
            )
          if (t.replace(/_/, '').length > 0 && n.length > 0) {
            var g = t
            if (
              (g == 'ss360QuerySuggestions' &&
                  (g = ss360Config.querySuggestionHeadline) == null &&
                  (g = ''),
                g.length > 0)
            ) {
              var h = sxQuery(
                '<' +
                    j +
                    ' class="unibox-suggest-heading" id="unibox-suggest-cluster-heading-' +
                    l +
                    '">' +
                    g +
                    '</' +
                    j +
                    '>'
              )
              c.append(h)
            }
          }
          sxQuery.each(n, function (e, s) {
            var n =
                '<div class="unibox-selectable" aria-selected="false" role="option">'
            if (void 0 !== s.image && s.image !== null && B) {
              var a =
                  s.image.length === 0 && i
                    ? i
                    : s.image.length === 0 ||
                      s.image.indexOf('/') === 0 ||
                      s.image.indexOf('http') === 0
                      ? s.image
                      : f + s.image
              n +=
                  '<div class="unibox-selectable-img-container"><img src="' +
                  a +
                  '"'
              var l = new Image()
                ;(l.src = a),
              l.complete ||
                    (n +=
                      ' style="display: none;" onload="this.style.display=null;"'),
              (n += ' alt aria-hidden="true" role="presentation"/></div>')
            }
            if (
              (s.link != null && s.link != ''
                ? ((n +=
                      '<a class="uniboxSearchContent" href="' + s.link + '">'),
                  (n += oe(s.name, u)),
                  (n += '</a>'))
                : s.name != null &&
                    s.name != '' &&
                    (n +=
                      '<span class="uniboxSearchContent">' +
                      oe(s.name, u) +
                      '</span>'),
                s.content != null &&
                  s.content != '' &&
                  (n +=
                    '<p class="unibox-result-content">' +
                    oe(s.content, u) +
                    '</p>'),
                s.suggestionHtml != null && s.suggestionHtml != '')
            ) {
              n +=
                  '<span class="uniboxSearchContent">' +
                  s.suggestionHtml +
                  '</span>'
            } else if (s.html != null) return
            if (o != null) {
              var g = o.match(/#(.*?)#/gi),
                h = o
              if (g != null) {
                for (var p = 0; p < g.length; p++) {
                  var x = g[p]
                  if (void 0 !== x && x.length !== 0) {
                    for (
                      var b, m = x.replace(/#/g, ''), y = 0;
                      y < s.dataPoints.length;
                      y++
                    ) {
                      var S = s.dataPoints[y]
                      if (S.key == m) {
                        b = S.value
                        break
                      }
                    }
                    if (void 0 !== b) {
                      var w = new RegExp(x, 'g')
                      h = h.replace(w, b)
                    } else !0
                  }
                }
              }
              n += '<div class="unibox-extra">' + h + '</div>'
            }
            ;(n += '<div class="unibox-ca"></div></div>'),
            void 0 !== r && (n = r.call(this, n, t, e, s))
            var k = sxQuery(n)
            c.append(k), (d = !0), v++
          }),
          be().append(c)
        })
        var S = X
        v > 0 && (S = (v > 1 ? J : K).split('##COUNT##').join(v))
        var Q = sxQuery('#ss360-status-message')
        Q.text() !== S && Q.text(S),
        s.plan == 'FREE' &&
            n.append(
              '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:150px;float:right;" src="https://sitesearch360.com/cdn/sitesearch360.svg"></a></div>'
            )
        var A = pe() ? sxQuery('#unibox-special') : t
        if (
          ((b = A.find('.unibox-selectable')),
            R &&
            R.length > 0 &&
            ((b = []),
              sxQuery.each(R, function (e, t) {
                b = b.concat(
                  A.find(
                    '.unibox-suggest-' + re(t) + ':first .unibox-selectable'
                  ).get()
                )
              }),
              sxQuery.each(
                sxQuery.grep(Object.keys(s.suggests), function (e) {
                  if (R.indexOf(e) < 0) return !0
                }),
                function (e, t) {
                  b = b.concat(
                    A.find(
                      '.unibox-suggest-' + re(t) + ':first .unibox-selectable'
                    ).get()
                  )
                }
              )),
            (h = -1),
            sxQuery(b).click(function (e) {
              e.preventDefault(), e.stopPropagation()
              var t = sxQuery(this)
                .find('.uniboxSearchContent:first')
                .text()
              xe().val(t)
              var s = void 0
              try {
                s = sxQuery(this)
                  .find('a:first')
                  .attr('href')
              } catch (e) {}
              if (l != null) {
                try {
                  l.call(this, t, s)
                } catch (e) {
                  console.log(e)
                }
              }
              se(), ie(e), ye()
            }),
            b.mousedown(function (e) {
              Y = !0
            }),
            b.mouseup(function (e) {
              Y = !1
            }),
            t.find('.unibox-selectable .unibox-extra').click(function (e) {
              e.stopPropagation()
            }),
            s.words != null && !pe())
        ) {
          s.words.length > 0 &&
            y.length > 0 &&
            (k == 'all' || k == 'bottom') &&
            (n.append('<' + j + '>' + y + '</' + j + '>'), (d = !0))
          var T = []
          sxQuery.each(s.words, function (s, i) {
            ;(k != 'all' && k != 'bottom') ||
              (i.overlayImage != null &&
              i.overlayImage != null &&
              i.overlayImage.length > 0
                ? n.append(
                  '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                      f +
                      i.overlayImage +
                      '" style="background-image: url(\'' +
                      f +
                      i.image +
                      '\');background-size: 75%;background-repeat: no-repeat;background-position: center;">'
                )
                : i.image != null &&
                  i.image != null &&
                  i.image.length > 0 &&
                  n.append(
                    '<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' +
                      f +
                      i.image +
                      '">'
                  ))
            var o = t.find('#unibox-invisible')
            if (
              (o.css('padding', e.css('padding')),
                o.html(
                  u.replace(
                    new RegExp(i.name, 'gi'),
                    '<span>' + i.name + '</span>'
                  )
                ),
                (k != 'all' && k != 'top') || sxQuery.inArray(i.image, w) != -1)
            ) {
              sxQuery.inArray(i.image, w) > -1 && T.push(i.image)
            } else {
              var r = t.find('#unibox-invisible span')[0]
              if (
                r != null &&
                i.name.length > 0 &&
                i.image != null &&
                i.image != null &&
                i.image.length > 0
              ) {
                var a = sxQuery(r).position().left,
                  l = sxQuery(
                    '<div class="unibox-ivf"><img  alt aria-hidden="true" role="presentation" src="' +
                      f +
                      i.image +
                      '" alt="' +
                      i.name +
                      '"></div>'
                  )
                l.css('left', le().left + a - 10),
                l.css('top', le().top - e.outerHeight() + x),
                t.append(l),
                setTimeout(function () {
                  t
                    .find('.unibox-ivf')
                    .find('img')
                    .addClass('l')
                }, 10),
                T.push(i.image)
              }
            }
          }),
          (w = T)
        }
        ge() || pe()
          ? sxQuery.each(
            be()
              .find('img')
              .get(),
            function (e, t) {
              var s = t.src,
                i = new Image()
                ;(i.onerror = function () {
                sxQuery(t).hide()
              }),
              (i.src = s)
            }
          )
          : be()
            .find('img')
            .remove(),
        he(),
        L == null || d || ((d = !0), (g = !0), n.append(L)),
        d
          ? (e.attr('aria-expanded', 'true'),
            n.isVisible()
              ? (n.addClass('uniboxActive'), he())
              : pe() ||
                  (ge()
                    ? n.slideDown(m, function () {
                      n.addClass('uniboxActive'),
                      n.css('left', le().left),
                      n.css('top', le().top)
                    })
                    : (n.css('display', 'block'),
                      n.addClass('uniboxActive'),
                      he())),
            O && !g && n.append(O))
          : (sxQuery('#ss360-status-message').text(X), se(), Ce()),
        void 0 !== G && typeof G === 'function' && G.call(this, d)
      } else se()
    }
    function le () {
      return {
        left: e.offset().left - t.offset().left,
        top: e.offset().top - t.offset().top + e.outerHeight()
      }
    }
    function ce () {
      ;(w = []), t.find('.unibox-ivf').remove()
    }
    function ue (s) {
      if (
        ((Z = s.keyCode || s.which), e.val().length <= 1 && ce(), c != null)
      ) {
        try {
          c.call(this, s, e.val())
        } catch (e) {
          console.log(e)
        }
      }
      if (
        s.keyCode == 37 ||
        s.keyCode == 38 ||
        s.keyCode == 39 ||
        s.keyCode == 40 ||
        s.keyCode == 13
      ) {
        if (s.keyCode == 38 && h > 0) h--
        else if (s.keyCode == 40) h++
        else if (s.keyCode == 38 && h <= 0) h = (h != -1 ? h - 1 : h) + b.length
        else if ((s.keyCode == 37 || s.keyCode == 39) && h > -1) {
          h %= b.length
          var i,
            n = sxQuery(b[h]).closest('.unibox-suggest-cluster')
          if (
            (s.keyCode == 37
              ? (i = n.prev())
              : s.keyCode == 39 && (i = n.next()),
              i.hasClass('unibox-suggest-cluster'))
          ) {
            var o = i.find('div.unibox-selectable')[0]
            h = be()
              .find('div.unibox-selectable')
              .index(o)
          }
        }
        if (b.length > 0 && h > -1) {
          h %= b.length
          var r = sxQuery(b)
          r.removeClass('active')
          var a = sxQuery(b[h])
          if (
            (a.addClass('active'),
              r.attr('aria-selected', 'false'),
              r.attr('id', ''),
              a.attr('id', 'unibox-active'),
              a.attr('aria-selected', 'true'),
              a.length > 0)
          ) {
            ;(pe() ? sxQuery('#unibox-special-searchbox') : e).attr(
              'aria-activedescendant',
              'unibox-active'
            )
          }
        }
        if (s.keyCode == 13) {
          s.preventDefault(), s.stopPropagation()
          var u = pe() ? sxQuery('#unibox-special') : t
          if (l != null) {
            var d = xe().val(),
              g = void 0
            if (h != -1) {
              ;(d = u
                .find('.unibox-selectable.active .uniboxSearchContent:first')
                .text()),
              xe().val(d)
              try {
                g = sxQuery(u.find('.unibox-selectable.active')[0])
                  .find('a')
                  .attr('href')
              } catch (e) {}
              if (l != null) {
                try {
                  l.call(this, d, g)
                } catch (e) {
                  console.log(e)
                }
              }
            }
          } else {
            h != -1 &&
              (window.location.href = sxQuery(
                t.find('.unibox-selectable.active')[0]
              )
                .find('a')
                .attr('href'))
          }
          return ye(), !1
        }
        h > -1 && s.preventDefault()
      } else {
        !(function () {
          for (
            var e = t.find('.unibox-ivf img').map(function (e) {
                return sxQuery(e).attr('src')
              }),
              s = 0;
            s < e.length;
            s++
          ) {
            sxQuery.inArray(e[s].replace(f, ''), w) == -1 &&
              t.find('.unibox-ivf:has(img[src*="' + e[s] + '"])').remove()
          }
        })()
      }
    }
    function de (t) {
      if (C != 18) {
        if ((C = t.keyCode) != -1 || Q == null) {
          if (
            t.keyCode != 27 &&
            !(
              ((t.keyCode == 37 || t.keyCode == 39) && h > -1) ||
              t.keyCode == 38 ||
              t.keyCode == 40 ||
              t.keyCode == 13 ||
              t.keyCode == 9
            )
          ) {
            var s = xe().val()
            if ((C == 46 && s.length == 0 && ce(), ee != null)) {
              var i = !0
              try {
                i = ee.call(this, s, e.get()[0])
              } catch (e) {
                console.log(e)
              }
              if (!i) return
            }
            s.length >= S && p != ''
              ? ((A = s),
                sxQuery.ajax({
                  usedQuery: s,
                  url: p + encodeURIComponent(s),
                  dataType: 'json',
                  success: function (e, t) {
                    e == A && ae(t), (Q = t)
                  }.bind(this, s)
                }))
              : Ce()
          }
        } else ae(Q)
      } else C = t.keyCode
    }
    function ge () {
      var t = e[0].getBoundingClientRect(),
        s = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
        i = t.y || t.top
      return s - i - t.height >= i
    }
    function he () {
      var t = sxQuery('#unibox-suggest-box'),
        s = (t.css('border-width') || '0px').replace('px', '')
      t.css('min-width', e.outerWidth() - 2 * s),
      N == null
        ? t.css('max-width', e.outerWidth() - 2 * s)
        : t.css('max-width', N - 2 * s),
      t.css('left', le().left),
      ge()
        ? t.css('top', le().top)
        : t.css('top', le().top - t.outerHeight() - e.outerHeight()),
      fe()
    }
    function pe () {
      var e = window.matchMedia
          ? window.matchMedia('(max-width: ' + H + 'px)').matches
          : window.innerWidth <= parseInt(H),
        t = sxQuery('#unibox-special-searchbox').hasClass('active')
      return D && (e || t)
    }
    function fe () {
      var e = sxQuery('#unibox-special'),
        t = sxQuery('#unibox-suggest-box-special')
      if (e && t) {
        var s =
            (Qe() ? e.find('.unibox-special-logo').height() : 0) +
            e.find('.input-container').height(),
          i = 'calc(100% - ' + s + 'px)'
        t.css('height', i), t.css('top', s + 'px')
      }
    }
    function xe () {
      var t = sxQuery('#unibox-special')
      return pe()
        ? ((t && t.length !== 0) || ve(), sxQuery('#unibox-special-searchbox'))
        : e
    }
    function be () {
      return pe()
        ? (sxQuery('#unibox-suggest-box-special').length === 0 && ve(),
          sxQuery('#unibox-suggest-box-special'))
        : sxQuery('#unibox-suggest-box')
    }
    function ve () {
      if (D && !(sxQuery('#unibox-suggest-box-special').length > 0)) {
        var t =
            '<input type="search" id="unibox-special-searchbox" class="unibox-special-searchbox" value="' +
            e.val() +
            '" autocomplete="off" role="combobox" aria-describedby="unibox-controls-description" aria-owns="unibox-suggest-box-special"aria-expanded="false"/>',
          s =
            '<div id="unibox-suggest-box-special" class="unibox-special-box">' +
            E +
            '</div>',
          i = sxQuery(
            '<section role="search" id="unibox-special" style="display: none;"></section>'
          ),
          o = sxQuery('<section class="input-container"></section>')
        if (V) {
          var r =
            "<label style='" +
            sxQuery.srOnlyCss +
            "' class='ss360-sr-only' for='unibox-special-searchbox'>" +
            V +
            '</label>'
          o.append(sxQuery(r))
        }
        var l = sxQuery(
          '<button class="unibox-special-close unibox-special-icon" aria-label="Close"></button>'
        )
        o.append(l)
        var c = sxQuery(t),
          u = e.attr('placeholder') || z
        c.attr('placeholder', u), o.append(c)
        var d = sxQuery(
          '<button id="unibox-mobile-search-btn" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
        )
        o.append(d)
        var g = sxQuery(s)
        Qe() && i.append('<div class="unibox-special-logo">' + U + '</div>'),
        i.append(o),
        i.append(g)
        var h = sxQuery('body')
        if (
          (h.prepend(i),
            h.append(
              '<div id="unibox-special-hidden-content" style="overflow: hidden;"></div>'
            ),
            c.keydown(ne(de, n)),
            c.keydown(ue),
            c.on('search', function (e) {
              de(e)
            }),
            a &&
            d.on('click', function () {
              var e = c.val() || ''
              a.call(this, e),
              ye(function () {
                setTimeout(function () {
                  sxQuery('#ss360-search-result-heading a').focus()
                }, 200)
              })
            }),
            c.keyup(se),
            c.keyup(function (e) {
              ;(e.keyCode || e.which) == 27 && ye()
            }),
            l.on('click', ye),
            _ &&
            g.scroll(function (e) {
              var t = e.target.scrollTop / 100 / 2
              t > 1 ||
                t < 0 ||
                ((t = Math.log1p(t)),
                  (function (e) {
                    var t = sxQuery('#unibox-special-searchbox'),
                      s = sxQuery('#unibox-special'),
                      i = q.box.height,
                      n = q.box.fontSize / i,
                      o = (i - 32) * e,
                      r = Math.round(i - o),
                      a = Math.round(n * r)
                    t.css('height', r), t.css('font-size', a)
                    var l = q.icons.width,
                      c = q.icons.height,
                      u = (l - 34) * e,
                      d = (c - 34) * e,
                      g = Math.round(l - u),
                      h = Math.round(c - d),
                      p = s.find('.unibox-special-icon')
                    p.css('height', h), p.css('width', g)
                    var f = q.box.marginLeft - (l - g),
                      x = 'calc(100% - 2*' + f + 'px)'
                    t.css('width', x),
                    t.css('margin-left', f),
                    t.css('margin-right', f)
                  })((t *= 1 / Math.log1p(1))),
                  fe())
            }),
            F)
        ) {
          var p = parseFloat(m),
            f = sxQuery('#unibox-special-transition-background'),
            x =
              f.length > 0
                ? f
                : sxQuery(
                  '<div id="unibox-special-transition-background" style="background: #fff; position: absolute; width: 100%; height: 100%; z-index: 1000001; left: 100%; top: 0; display: none;"></div>'
                )
          x.css('transition', 'transform ' + p + 'ms'),
          f.length === 0 && sxQuery('body').append(x)
        }
      }
    }
    function me () {
      if (D) {
        we() &&
          sxQuery(window).on('touchstart.iosPreventer', function (e) {
            var t = e.touches ? e.touches[0].screenY : e.screenY
            !t &&
              window.event &&
              (t = window.event.touches
                ? window.event.touches[0].screenY
                : window.event.screenY)
            var s = function (e, t) {
              sxQuery(window).off('touchmove.iosPreventer')
              var s = t.target || window.event.target,
                i = t.touches ? t.touches[0].screenY : t.screenY
              for (
                !i &&
                window.event &&
                (i = window.event.touches
                  ? window.event.touches[0].screenY
                  : window.event.screenY);
                s !== document.body;

              ) {
                var n = sxQuery(s),
                  o = n.css('overflow-y'),
                  r =
                    n.css('-webkit-overflow-scrolling') === 'touch' &&
                    (o === 'auto' || o === 'scroll'),
                  a = s.scrollHeight > s.offsetHeight
                if (r && a) {
                  if (e <= i && s.scrollTop === 0) t.preventDefault()
                  else {
                    var l = n.height()
                    e >= i &&
                      s.scrollHeight - s.scrollTop === l &&
                      t.preventDefault()
                  }
                  return
                }
                s = s.parentNode
              }
              t.preventDefault()
            }.bind(this, t)
            sxQuery(window).on('touchmove.iosPreventer', s),
            sxQuery(window).on('touchend.iosPreventer', function () {
              sxQuery(window).off(
                'touchmove.iosPreventer,touchend.iosPreventer'
              )
            })
          })
        var e = sxQuery('#unibox-special')
        ;(e && e.length !== 0) || (ve(), (e = sxQuery('#unibox-special')))
        var t = sxQuery('#unibox-special-searchbox')
        t.addClass('active'), t.attr('aria-expanded', 'true')
        var s = function () {
            var s = e.find('.unibox-special-icon')
            if (Qe()) {
              var i =
                e.find('.unibox-special-logo').height() +
                parseFloat(t.css('margin-top') || '0')
              s.css('top', i)
            }
            _ &&
              (s.css('width', ''),
                s.css('height', ''),
                t.css('height', ''),
                t.css('width', ''),
                t.css('margin-left', ''),
                t.css('margin-right', ''),
                t.css('font-size', ''),
                sxQuery('#unibox-suggest-box-special').scrollTop(0),
                (q.icons = {}),
                (q.icons.width = parseFloat(s.css('width'))),
                (q.icons.height = parseFloat(s.css('height'))),
                (q.box = {}),
                (q.box.height = parseFloat(t.css('height'))),
                (q.box.marginLeft = parseFloat(t.css('margin-left'))),
                (q.box.fontSize = parseFloat(t.css('font-size'))))
          },
          i = sxQuery(
            '#unibox-special ~ *:not(#unibox-special-transition-background):not(#unibox-special-hidden-content):not(.ss360-sr-only)'
          )
        i = i.filter(function (e) {
          return sxQuery(e).isVisible()
        })
        var n = sxQuery('#unibox-special-hidden-content')
        sxQuery('body').append(n),
        n.append(i),
        sxQuery('html, body').addClass('unibox-stretch'),
        F
          ? ke(n, e, s, function () {
            t.focus()
          })
          : (n.hide(), e.show(), t.focus(), s())
      }
    }
    function ye (t) {
      if (pe()) {
        we() &&
          sxQuery(window).off(
            'touchstart.iosPreventer, touchmove.iosPreventer, touchend.iosPreventer'
          ),
        sxQuery('#unibox-special').hide()
        var s = sxQuery('#unibox-special-searchbox').hasClass('active'),
          i = sxQuery('#unibox-special-searchbox')
        i.removeClass('active'),
        i.attr('aria-expanded', 'false'),
        i.removeAttribute('aria-activedescendant')
        var n = sxQuery('#unibox-special-hidden-content').children()
        sxQuery('body').append(n),
        s &&
            (function () {
              var t = sxQuery('#unibox-special-searchbox')
              t && e && e.val(t.val())
            })()
        var o = function (e) {
          sxQuery('html, body').removeClass('unibox-stretch'),
          void 0 !== e && typeof e === 'function' && e()
        }.bind(this, t)
        F
          ? ke(
            sxQuery('#unibox-special'),
            sxQuery(
              '#unibox-special ~ *:not(#unibox-special-transition-background)'
            ).filter(function (e) {
              return sxQuery(e).isVisible()
            }),
            void 0,
            o
          )
          : o()
      }
    }
    var Se = void 0
    function we () {
      if (void 0 === Se) {
        var e = sxQuery(
          "<div id='ios-bounce-test' style='-webkit-overflow-scrolling: touch;'></div>"
        )
        sxQuery('body').append(e),
        (Se = !!e.css('-webkit-overflow-scrolling')),
        e.remove()
      }
      return Se
    }
    function ke (e, t, s, i) {
      var n = sxQuery('#unibox-special-transition-background')
      t.hide(), e.show(), n.show()
      setTimeout(
        function (e) {
          e.addClass('move--left')
        }.bind(this, n),
        140
      ),
      setTimeout(
        function (e, t, s, i, n) {
          t.hide(),
          e.show(),
          i && i(),
          s.removeClass('move--left'),
          s.addClass('move--right'),
          setTimeout(
            function (e, t) {
              s.hide(),
              s.removeClass('move--left'),
              s.removeClass('move--right'),
              void 0 !== t && typeof t === 'function' && t()
            }.bind(this, s, n),
            parseFloat(m)
          )
        }.bind(this, t, e, n, s, i),
        parseFloat(m) + 140
      )
    }
    function Ce () {
      pe() && sxQuery('#unibox-suggest-box-special').html(E)
    }
    function Qe () {
      return U && U.length > 0
    }
    return {
      updateSuggests: function (e) {
        ae(e)
      },
      updateSuggestUrl: function (e) {
        p = e
      },
      hideSuggestBox: function () {
        se(), ye()
      },
      setIvfImagePath: function (e) {
        ;(f = e).charAt(f.length - 1) != '/' && (f += '/')
      },
      changeInstantVisualFeedbackState: function (e) {
        k = e
      },
      render: function () {
        he()
      },
      getText: function () {
        return xe().val()
      },
      init: function (h, b) {
        ;(e = h),
        (t = b.searchBoxContainer),
        (v = b.highlight),
        (o = b.extraHtml),
        (r = b.lineCallback),
        (p = b.suggestUrl),
        (f = b.ivfImagePath),
        (x = b.ivfImageOffset),
        (i = b.missingErrorImage),
        (n = b.throttleTime),
        (m = b.animationSpeed),
        (S = b.minChars),
        (a = b.enterCallback),
        (l = b.enterCallbackResult),
        (c = b.typeCallback),
        (u = b.focusCallback),
        (d = b.blurCallback),
        (g = b.placeholder),
        (k = b.instantVisualFeedback),
        (y = b.queryVisualizationHeadline),
        (T = b.showDeleteAllButton),
        (B = b.showImagesSuggestions),
        (I = b.suggestOrder),
        (R = b.suggestSelectionOrder),
        (N = b.maxWidth),
        (L = b.noSuggests),
        (M = b.emptyQuerySuggests),
        (O = b.showMoreResults),
        (P = b.disableEventPropagationHtml),
        (ee = b.preSuggestCallback)
        var w = b.specialMobileSuggest
        if (
          ((D = void 0 === w.enabled || w.enabled),
            (H = w.breakpoint || 768),
            (E = w.placeholder || ''),
            (U = w.customTopHtml || ''),
            (F =
            (void 0 === w.animateTransitions || w.animateTransitions) &&
            !sxQuery.prefersReducedMotion()),
            (_ =
            void 0 === w.resizeSearchBoxOnScroll || w.resizeSearchBoxOnScroll),
            (z =
            void 0 !== w.searchBoxPlaceholder
              ? w.searchBoxPlaceholder
              : 'Search'),
            (G = b.suggestChangeCallback),
            b.redirectCallback,
            (j = 'h' + Math.min(Math.max(1, b.headingLevel || 4), 6)),
            (V = b.searchFieldLabel),
            (W =
            void 0 === b.srSuggestionsHiddenText
              ? W
              : b.srSuggestionsHiddenText),
            (X = void 0 === b.srNoSuggestionsText ? X : b.srNoSuggestionsText),
            (J =
            void 0 === b.srSuggestionsCountText ? J : b.srSuggestionsCountText),
            (K = void 0 === b.srOneSuggestionText ? K : b.srOneSuggestionText),
            ($ =
            void 0 === b.srSuggestBoxControlDescription
              ? $
              : b.srSuggestBoxControlDescription),
            e.attr('autocomplete', 'off'),
            V &&
            (!e.attr('id') ||
              sxQuery("label[for='" + e.attr('id') + "']").length === 0))
        ) {
          e.attr('id') ||
            (window.ss360UniboxCount || (window.ss360UniboxCount = 0),
              window.ss360UniboxCount++,
              e.attr('id', 'unibox-search-box-' + window.ss360UniboxCount))
          var C = e.attr('id'),
            Q =
              "<label style='" +
              sxQuery.srOnlyCss +
              "' class='ss360-sr-only' for='" +
              C +
              "'>" +
              V +
              '</label>'
          e.parent().prepend(Q)
        }
        if (sxQuery('#unibox-controls').length === 0) {
          var A = $,
            q =
              "<span id='unibox-controls-description' style='" +
              sxQuery.srOnlyCss +
              "' class='ss360-sr-only' tabindex='-1'>" +
              A +
              '</span>'
          e.parent().append(q)
        }
        if (sxQuery('#ss360-status-message').length === 0) {
          var Z = sxQuery(
            '<span id="ss360-status-message" style="' +
              sxQuery.srOnlyCss +
              '" tabindex="-1" aria-live="polite" aria-atomic="true" role="status" class="ss360-sr-only">'
          )
          e.parent().append(Z)
        }
        e.attr('role', 'combobox'),
        e.attr('aria-describedby', 'unibox-controls-description'),
        e.attr('aria-owns', 'unibox-suggest-box'),
        e.attr('aria-expanded', 'false'),
        sxQuery('#unibox-suggest-box').remove(),
        (s = sxQuery(
          '<div id="unibox-suggest-box" class="normal-suggest-box" role="listbox" aria-label="Search Suggestions"></div>'
        )),
        t.prepend(s),
        t.css('position') != 'absolute' && t.css('position', 'relative')
        var te = (s.css('border-width') || '0px').replace('px', '')
        s.css('min-width', e.outerWidth() - 2 * te),
        s.css('max-width', b.maxWidth - 2 * te),
        e.keydown(ue),
        e.keydown(ne(de, n)),
        e.keyup(se),
        e.focusout(function (e) {
          Y || (ie(e), d != null && d.call(this, e, sxQuery(this).val(), !0))
        })
        var oe = b.hasMultipleSearchBoxes
        e.focus(function (t) {
          if (((t = t || window.event).stopPropagation(), pe())) {
            me(),
            (i = sxQuery('#unibox-special-searchbox')),
            e && i.val(e.val())
          } else if (oe) {
            var s = sxQuery(t.target).parent()
            s.length > 0 &&
              (s.find('#unibox-suggest-box').length === 0 ||
                !(function (e) {
                  if (e.children) {
                    for (var t = 0; t < e.children.length; t++) {
                      if (
                        e.children[t].getAttribute('id') == 'unibox-suggest-box'
                      ) {
                        return !0
                      }
                    }
                  }
                  return !1
                })(s)) &&
              (s.prepend(sxQuery('#unibox-suggest-box')),
                s.append(sxQuery('#unibox-invisible')))
          }
          var i
          if (
            (sxQuery(this).val().length > 0
              ? de({ keyCode: -1 })
              : M != null && ae(M),
              void 0 !== u)
          ) {
            try {
              u.call(this, t, sxQuery(this).val())
            } catch (e) {
              console.log(e)
            }
          }
        }),
        s.mouseenter(function () {
          s.find('.unibox-selectable.active').removeClass('active')
        }),
        sxQuery('html').click(function (t) {
          try {
            if (t != null && sxQuery(t.target).attr('id') == e.attr('id')) {
              return
            }
          } catch (e) {
            console.log(e)
          }
          s.hasClass('uniboxActive') && ie(t)
        }),
        e.keydown(function (e) {
          ;((e = e || window.event).keyCode || e.which) == 9 && ie(e)
        }),
        e.focusout(function (e) {
          Y ||
              ((e = e || window.event),
                setTimeout(function () {
                  sxQuery(document.activeElement).parents('#unibox-suggest-box')
                    .length === 0 && ie(e)
                }, 10))
        }),
        P &&
            (e.click(function (e) {
              e.stopPropagation()
            }),
              s.click(function (e) {
                e.stopPropagation()
              }))
        var re = e.attr('placeholder')
        ;(g = re && re.length > 0 ? re : g) &&
          g.length > 0 &&
          ('placeholder' in document.createElement('input') ||
            (e
              .focus(function () {
                var e = sxQuery(this).attr('placeholder')
                e &&
                  e.length > 0 &&
                  e != '' &&
                  sxQuery(this).val() == e &&
                  sxQuery(this)
                    .val('')
                    .removeClass('hasPlaceholder')
              })
              .blur(function () {
                var e = sxQuery(this).attr('placeholder')
                e &&
                  e.length > 0 &&
                  e != '' &&
                  (sxQuery(this).val() == '' || sxQuery(this).val() == e) &&
                  sxQuery(this)
                    .val(e)
                    .addClass('hasPlaceholder')
              }),
              e.val(g)),
            e.attr('placeholder', g))
        sxQuery('#unibox-invisible').remove()
        var le = sxQuery(
          '<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>'
        )
        if ((t.append(le), T)) {
          sxQuery('#unibox-dab-holder').remove()
          var ce = sxQuery(
            '<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>'
          )
          t.append(ce),
          sxQuery(ce).mousedown(function (t) {
            return (
              (t || window.event).stopPropagation(), e.val(''), e.focus(), !1
            )
          }),
          e
            .focus(function () {
              e.val().length > 0 ? ce.show() : ce.hide()
            })
            .blur(function () {
              ce.hide()
            })
            .keydown(function () {
              sxQuery(this).val().length > 0 && sxQuery(ce).show()
            })
          var ge = parseInt(
              e
                .css('paddingTop')
                .replace('px', '')
                .trim()
            ),
            he = e.outerHeight(),
            fe = parseInt(
              e
                .css('borderTopWidth')
                .replace('px', '')
                .trim()
            ),
            xe = e.css('boxShadow').match(/\d{1,3}px/g),
            be =
              xe && xe.length > 2 ? parseInt(xe[2].replace('px', '').trim()) : 0
          ce.height(he - 2 * fe - be - ge)
          var ye = parseInt(
            e
              .css('paddingRight')
              .replace('px', '')
              .trim()
          )
          ;(ye = ye > 25 ? ye : 25), e.css('paddingRight', ye)
          var Se =
              fe +
              be +
              (e.offset().top -
                e.parent().offset().top -
                e.parent().scrollTop()),
            we =
              Math.abs(
                e[0].getBoundingClientRect().left -
                  e.parent()[0].getBoundingClientRect().left
              ) +
              e.outerWidth() -
              ce.outerWidth() -
              fe -
              ye
          ce.css('top', Se), ce.css('left', we)
        }
        k == 'none' && sxQuery('#unibox-invisible').css('display', 'none'), ve()
      }
    }
  },
  SS360 = (function () {
    var e,
      t,
      s,
      i,
      n = [],
      o = !0,
      r = !0,
      a = !1,
      l = 2,
      c = 3,
      u = 4,
      d =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
      g = 'data:image/svg+xml;base64,',
      h = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
      },
      p = 0
    function f () {
      sxQuery('#ss360-searchbox-spinner').fadeOut()
    }
    function x () {
      var e = new Date().getTime() - p
      return (p = 0), e
    }
    function b (e) {
      if (ss360Settings.showErrors != null && ss360Settings.showErrors == 1) {
        sxQuery('.ss360DevError').remove()
        var t = sxQuery(
          '<div class="ss360DevError" style="padding:10px;width:100%;position:fixed;bottom:0;left:0;background-color:#C1063F;color:white;"><b>Site Search 360 Error:</b> ' +
            e +
            '</div>'
        )
        sxQuery('body').append(t)
      }
      f()
    }
    function v (e) {
      if (void 0 !== ss360Settings.externalTracking) {
        var t = !0
        ss360Settings.externalTracking.searchCallback &&
          typeof ss360Settings.externalTracking.searchCallback === 'function' &&
          (t =
            !1 !== ss360Settings.externalTracking.searchCallback.call(this, e)),
        t &&
            (!(function (e) {
              var t = ss360Settings.searchQueryParamName
              t === '' && (t = 'ss360Query')
              var s = '?' + t + '=' + encodeURI(e).toLowerCase()
              ss360Settings.externalTracking.providers.indexOf('GA') > -1 &&
                (function (e) {
                  window.ga && ga('set', 'page', e)
                })(s)
              ss360Settings.externalTracking.providers.indexOf('GTM') > -1 &&
                (function (e) {
                  window.dataLayer &&
                    dataLayer.push({
                      event: 'VirtualPageview',
                      category: 'search',
                      virtualPageURL: e,
                      virtualPageTitle: document.title
                    })
                })(s)
            })(e),
              ss360Settings.externalTracking.providers.indexOf('GA') > -1 &&
              window.ga &&
              ga('send', 'pageview'))
      }
    }
    function m (e) {
      for (
        var t = encodeURIComponent(e) + '=',
          s = document.cookie.split(';'),
          i = 0;
        i < s.length;
        i++
      ) {
        for (var n = s[i]; n.charAt(0) === ' ';) n = n.substring(1, n.length)
        if (n.indexOf(t) === 0) {
          return decodeURIComponent(n.substring(t.length, n.length))
        }
      }
      return null
    }
    function y () {
      try {
        if (
          window.history.replaceState &&
          document.location.search.indexOf(
            ss360Settings.searchQueryParamName + '='
          ) > -1
        ) {
          var e = new RegExp(
            '[?&]' + ss360Settings.searchQueryParamName + '=[^ &]*'
          )
          window.history.replaceState(
            {},
            document.title,
            document.location.pathname + document.location.search.replace(e, '')
          )
        }
      } catch (e) {}
    }
    return {
      getCookie: function (e) {
        return m(e)
      },
      isInitialized: function () {
        return r
      },
      changeConfig: function (e, s) {
        ;(ss360Settings[e] = s),
        e == 'searchResults'
          ? (t = s)
          : e == 'fullScreenSearchCaption'
            ? sxQuery('#ss360-search-console > h' + l).html(s)
            : e == 'placeholder'
              ? sxQuery('#ss360-query').attr('placeholder', s)
              : (e != 'excludeContentGroups' &&
                    e != 'includeContentGroups') ||
                  this.updateSuggestionUrl(this.buildSuggestionUrl())
      },
      setSiteId: function (t) {
        i != null &&
          this.updateSuggestionUrl(i.replace('site=' + e, 'site=' + t)),
        (e = t),
        (ss360Settings.siteId = e)
      },
      updateSuggestionUrl: function (e) {
        i = e
        for (var t = 0; t < n.length; t++) n[t].updateSuggestUrl(e)
      },
      buildSuggestionUrl: function () {
        if (!ss360Settings.showSearchSuggestions) return ''
        var t =
          'https://global.sitesearch360.com/sites/suggest?site=' +
          e +
          '&limit=' +
          ss360Settings.numSuggestions
        return (
          ss360Settings.suggestionsEqualSearch &&
            ((t = t.replace('/sites/suggest', '/sites')),
              (t += '&includeContent=true&log=false')),
          void 0 !== ss360Settings.includeContentGroups &&
            (t +=
              '&includeContentGroups=' +
              encodeURIComponent(
                JSON.stringify(ss360Settings.includeContentGroups)
              )),
          void 0 !== ss360Settings.excludeContentGroups &&
            (t +=
              '&excludeContentGroups=' +
              encodeURIComponent(
                JSON.stringify(ss360Settings.excludeContentGroups)
              )),
          !1 === ss360Settings.groupResults && (t += '&groupResults=false'),
          ss360Settings.maxQuerySuggestions > 0 &&
            (t += '&maxQuerySuggestions=' + ss360Settings.maxQuerySuggestions),
          (t += '&query=')
        )
      },
      showFullscreenLayer: function (e) {
        e != null && e.stopPropagation(),
        sxQuery('#ss360-search-console').animateTop(
          '0%',
          ss360Settings.animationSpeed
        ),
        (a = !0),
        sxQuery(ss360Settings.searchBoxSelector).focus(),
        sxQuery('#ss360CloseLayerButton').css('position', 'fixed'),
        sxQuery('#ss360CloseLayerButton').css('right', '20px'),
        sxQuery('body').css('overflow', 'hidden')
      },
      closeLayer: function () {
        if (
          (ss360Settings.searchTrigger != null &&
            a &&
            (sxQuery('#ss360-search-console').animateTop(
              '-100%',
              ss360Settings.animationSpeed
            ),
              (a = !1),
              sxQuery('#ss360CloseLayerButton').css('position', 'absolute'),
              sxQuery('#ss360CloseLayerButton').css('right', '8px'),
              sxQuery('body').css('overflow', 'initial'),
              y()),
            t == null)
        ) {
          var e = sxQuery('#ss360-layer')
          sxQuery('#ss360Darken').remove(),
          e.removeClass('ss360-animated ss360-bi ss360-fid'),
          e.addClass('ss360-animated ss360-bo'),
          setTimeout(function () {
            sxQuery('#ss360-layer').fadeOut()
          }, 500),
          y()
        }
        ss360Settings.closeLayerCallback != null &&
          ss360Settings.closeLayerCallback.call(this)
      },
      init: function () {
        if (
          ((r = !0),
            sxQuery('#ss360-search-console').remove(),
            ss360Settings.searchTrigger != null)
        ) {
          ;(ss360Settings.searchBoxSelector = '#ss360-query'),
          (ss360Settings.searchResults = { contentBlock: '#ss360-results' })
          var i = sxQuery('<div id="ss360-search-console">')
          i.append(
            '<h' +
              l +
              '>' +
              ss360Settings.fullScreenSearchCaption +
              '</h' +
              l +
              '>'
          ),
          i.append(
            '<section role="search"><input id="ss360-query" type="text"></section>'
          ),
          i.append('<div id="ss360-results"></div>'),
          i.prepend(
            '<button id="ss360CloseLayerButton" aria-label="Close Search Results" title="Close Search Results" type="button"></button>'
          ),
          sxQuery('body').append(i),
          sxQuery('#ss360CloseLayerButton').click(SS360.closeLayer),
          sxQuery('#ss360CloseLayerButton').on('keydown, keyup', function (e) {
            ;(e.keyCode != 13 && e.keyCode != 32) || SS360.closeLayer()
          }),
          sxQuery(ss360Settings.searchTrigger).click(function (e) {
            SS360.showFullscreenLayer(e)
          })
        }
        var h = ss360Settings.searchBoxSelector
        if (
          (sxQuery(h).length == 0 &&
            (b(
              'There is no input element for the searchBoxSelector "' +
                h +
                '". Please update your ss360Config object.'
            ),
              (r = !1)),
            document.querySelectorAll('script[src*=sitesearch360-v]').length >
            1 &&
            (b(
              'There is more than one sitesearch360 script on this page. Please remove one.'
            ),
              (r = !1)),
            ss360Settings.enterCallback != SS360.showResults)
        ) {
          var p = ss360Settings.enterCallback
          ss360Settings.enterCallback = function (e) {
            SS360.logQuery(e, 'search')
            try {
              p.call(this, e)
            } catch (e) {
              console.log(e)
            }
          }
        }
        if (ss360Settings.focusCallback != SS360.focus) {
          var f = ss360Settings.focusCallback
          ss360Settings.focusCallback = function (e, t) {
            SS360.focus(e, t)
            try {
              f.call(this, e, t)
            } catch (e) {
              console.log(e)
            }
          }
        }
        if (ss360Settings.blurCallback != SS360.blur) {
          var x = ss360Settings.blurCallback
          ss360Settings.blurCallback = function (e, t) {
            SS360.blur(e, t)
            try {
              x.call(this, e, t)
            } catch (e) {
              console.log(e)
            }
          }
        }
        var v = sxQuery(h).unibox(ss360Settings)
        if (
          (v instanceof Array ? (n = v) : n.push(v),
            ss360Settings.searchButton != null)
        ) {
          var y = n[0]
          sxQuery(ss360Settings.searchButton).click(function (e) {
            try {
              var t = y.getText(),
                i = this.getAttribute('ss360-search-box-id')
              i != null && (s = sxQuery('#' + i)),
              void 0 !== s && (t = s.val()),
              ss360Settings.enterCallback.call(this, t)
            } catch (e) {
              console.log(e)
            }
            e.preventDefault(), e.stopPropagation()
          })
        }
        ss360Settings.autofocus &&
          setTimeout(function () {
            sxQuery(h).focus()
          }, 200),
        (e = document.location.host),
        ss360Settings.siteId != null && (e = ss360Settings.siteId),
        this.updateSuggestionUrl(this.buildSuggestionUrl()),
        sxQuery('#ss360-layer').remove()
        var S = void 0
        S = ss360Settings.accessibility.isMainContent
          ? sxQuery(
            '<main role="main" id="ss360-layer" style="display:none" aria-label="Search Results"></main>'
          )
          : sxQuery(
            '<section id="ss360-layer" style="display:none" aria-label="Search Results"></section>'
          )
        var w = sxQuery('body')
        w.append(S),
        w.keydown(function (e) {
          e.keyCode == 27 &&
              (ss360Settings.searchTrigger != null && a
                ? SS360.closeLayer()
                : t == null &&
                  (S.removeClass('ss360-animated ss360-bi ss360-fid'),
                    S.addClass('ss360-animated ss360-bo'),
                    sxQuery('#ss360Darken').remove(),
                    setTimeout(function () {
                      SS360.closeLayer()
                    }, 250)))
        }),
        w.click(function (e) {
          ;(h && sxQuery(h).is(e.target)) ||
              (sxQuery(e.target).attr('id') != 'unibox-mobile-search-btn' &&
                SS360.closeLayer())
        }),
        sxQuery('#ss360-layer, #ss360-search-console').click(function (e) {
          e.stopPropagation()
        }),
        (t = ss360Settings.searchResults) instanceof Object ||
            (t === '' && (t = void 0)),
        sxQuery(window).on('popstate', function (e) {
          var s = ss360Settings.searchQueryParamName,
            i =
                void 0 !== e.state &&
                e.state !== null &&
                e.state.Url &&
                s &&
                e.state.Url.indexOf(s + '=') !== -1
          if (!i && void 0 === t) SS360.closeLayer()
          else if (i) {
            if (i) {
              var n = e.state.Url.split(s + '=')[1],
                o = n.split('&')
              o.length > 1 && (n = o[0]),
              (n = decodeURI(n)),
              SS360.showResults(n, void 0, !1)
            }
          } else sxQuery('#ss360-layer').fadeOut()
        }),
        r
          ? console.log('SiteSearch360 v10.37 initialized to ' + h)
          : console.log('SiteSearch360 v10.37 FAILED to initialize to ' + h)
        var k = m('ss360-tracking')
        if (
          (k != null && k == '0' && (o = !1),
            ss360Settings.initCallback != null)
        ) {
          try {
            ss360Settings.initCallback()
          } catch (e) {
            console.log(e)
          }
        }
        var C,
          Q,
          A,
          T = ss360Settings.searchBoxStyle
        if (void 0 !== T) {
          try {
            C = sxQuery(h)
            var I = sxQuery(ss360Settings.searchButton)
            C.css('outline', 'none'),
            void 0 !== (Q = T.text) &&
                void 0 !== Q.color &&
                (C.css('color', Q.color), I.css('color', Q.color)),
            void 0 !== Q &&
                void 0 !== Q.size &&
                (C.css('font-size', Q.size), I.css('font-size', Q.size)),
            void 0 !== (Q = T.border) &&
                void 0 !== Q.radius &&
                (C.css('border', '1px solid'),
                  C.css('border-radius', Q.radius),
                  I.length > 0 &&
                  (I.css('border', '1px solid'),
                    I.css('border-radius', Q.radius))),
            void 0 !== Q &&
                void 0 !== Q.color &&
                (C.css('border-color', Q.color),
                  I.length > 0 && I.css('border-color', Q.color)),
            (Q = T.padding)
            var R = '5px'
            void 0 !== Q &&
              (C.css('padding', Q),
                I.length > 0 && I.css('padding', Q),
                (R = Q)),
            (Q = T.icon)
            var N = 0
            if (void 0 !== Q && Q.image == 'magnifier') {
              ;(A = C.outerHeight() - 18), (N = (C.outerHeight() - A) / 2)
              var L = g + btoa(d.replace('#FILL#', Q.color || '#666666'))
              C.css(
                'background',
                "url('" + L + "') no-repeat " + R + ' ' + N + 'px'
              ),
              C.css('background-size', A + 'px ' + A + 'px'),
              C.css('padding-left', A + 1 * R.replace('px', '') + 2 + 'px')
            }
            if (
              void 0 !== (Q = T.button) &&
              I.length > 0 &&
              (I.css('cursor', 'pointer'),
                void 0 !== Q.text
                  ? (I.val(Q.text), I.html(Q.text))
                  : (I.val(' '), I.html(' ')),
                Q.icon == 'magnifier')
            ) {
              A = C.outerHeight() - 18
              for (
                var B = g + btoa(d.replace('#FILL#', Q.color || '#666666')),
                  M = 'width:' + A + 'px; height:' + A + 'px',
                  O = !0,
                  P = I.get(),
                  D = 0;
                D < P.length;
                D++
              ) {
                if (P[D].nodeName !== 'BUTTON') {
                  O = !1
                  break
                }
              }
              O
                ? I.html(
                  '<img role="presentation" alt="" style="' +
                      M +
                      '" src="' +
                      B +
                      '"/>'
                )
                : ((N = (C.outerHeight() - A) / 2),
                  I.css(
                    'background',
                    "url('" + B + "') no-repeat " + R + ' ' + N + 'px'
                  ),
                  I.css('background-size', A + 'px')),
              I.css('min-width', I.outerHeight() + 'px')
            }
            void 0 !== (Q = T.background) &&
              void 0 !== Q.color &&
              (C.css('background-color', Q.color),
                I.length > 0 && I.css('background-color', Q.color))
          } catch (e) {
            console.log(e)
          }
        }
        if (void 0 !== (T = ss360Settings.suggestionsStyle)) {
          try {
            ;(C = sxQuery('#unibox-suggest-box')),
            void 0 !== (Q = T.padding) && C.css('padding', Q),
            void 0 !== (Q = T.distanceFromTop) && C.css('margin-top', Q),
            void 0 !== (Q = T.text) &&
                void 0 !== Q.color &&
                C.css('color', Q.color),
            void 0 !== (Q = T.background) &&
                void 0 !== Q.color &&
                C.css('background-color', Q.color),
            void 0 !== (Q = T.border) &&
                void 0 !== Q.radius &&
                (C.css('border', '1px solid'),
                  C.css('border-radius', Q.radius)),
            void 0 !== Q &&
                void 0 !== Q.color &&
                C.css('border-color', Q.color)
          } catch (e) {
            console.log(e)
          }
        }
        ;(l = Math.max(
          1,
          parseInt(ss360Settings.accessibility.resultTopHeadingLevel) || 2
        )),
        (u = (c = l + 1) + 1)
      },
      recordTyping: function () {
        p > 0 || (p = new Date().getTime())
      },
      blur: function (e, t, s) {
        !0 === s && SS360.logQuery(t, 'abandon'),
        sxQuery('#ss360Darken-input').remove()
      },
      focus: function (e, t) {
        if (
          ((s = sxQuery(e.target)),
            ss360Settings.inputFocusLayer != null &&
            ss360Settings.inputFocusLayer)
        ) {
          sxQuery('#ss360Darken-input').remove()
          var i = sxQuery('<div id="ss360Darken-input"></div>')
          sxQuery(e.target)
            .parent()
            .css('z-index', '999999'),
          sxQuery(e.target)
            .parent()
            .parent()
            .append(i)
        }
      },
      logQuery: function (t, s) {
        if (void 0 !== t && !(p === 0 || t.trim().length < 3) && o) {
          var i = x()
          i < 50 ||
            sxQuery.post('https://global.sitesearch360.com/sites/queries/log', {
              query: t,
              site: e,
              timeToAction: i,
              action: s
            })
        }
      },
      followLink: function (e, t) {
        void 0 !== t
          ? (SS360.logQuery(e, 'select'), v(e), (window.location.href = t))
          : SS360.showResults(e)
      },
      showResults: function (i, n, r) {
        if (ss360Settings.preSearchCallback != null) {
          var p = !0
          try {
            p = ss360Settings.preSearchCallback.call(this, i, n, s)
          } catch (e) {
            console.log(e)
          }
          if (!p) return
        }
        if ((i = i.trim()).length != 0) {
          if (
            (sxQuery('#ss360-searchbox-spinner').fadeIn(),
              t != null && t.url != null && t.url != '')
          ) {
            var m = t.url
            if (
              ((function (e, t, s) {
                var i
                if (s) {
                  var n = new Date()
                  n.setTime(n.getTime() + 24 * s * 60 * 60 * 1e3),
                  (i = '; expires=' + n.toGMTString())
                } else i = ''
                document.cookie =
                  encodeURIComponent(e) +
                  '=' +
                  encodeURIComponent(t) +
                  i +
                  '; path=/'
              })('ss360LastQuery', i, 1),
                document.location.href.indexOf(m) == -1)
            ) {
              var y = new RegExp(
                '[?&]' + ss360Settings.searchQueryParamName + '=[^ &]*'
              )
              return (
                (m = m.replace(y, '')).indexOf('?') > -1
                  ? (m += '&')
                  : (m += '?'),
                void (document.location.href =
                  m +
                  ss360Settings.searchQueryParamName +
                  '=' +
                  encodeURIComponent(i))
              )
            }
          }
          var S =
            'https://global.sitesearch360.com/sites?site=' +
            e +
            '&timeToAction=' +
            x() +
            '&includeContent=true&limit=' +
            ss360Settings.numResults
          n != null && (S += '&sort=' + encodeURIComponent(n)),
          !1 === ss360Settings.groupResults && (S += '&groupResults=false'),
          ss360Settings.highlightQueryTerms == 1 &&
              ss360Settings.searchResultCallback != null &&
              (S += '&highlightQueryTerms=true'),
          void 0 !== ss360Settings.includeContentGroups &&
              (S +=
                '&includeContentGroups=' +
                encodeURIComponent(
                  JSON.stringify(ss360Settings.includeContentGroups)
                )),
          void 0 !== ss360Settings.excludeContentGroups &&
              (S +=
                '&excludeContentGroups=' +
                encodeURIComponent(
                  JSON.stringify(ss360Settings.excludeContentGroups)
                )),
          void 0 !== ss360Settings.filters &&
              (S +=
                '&filters=' +
                encodeURIComponent(JSON.stringify(ss360Settings.filters))),
          o || (S += '&log=false'),
          (S += '&query=' + encodeURIComponent(i))
          var w = String(i).replace(/[&<>"'\/]/g, function (e) {
            return h[e]
          })
          sxQuery.get(
            S,
            function (e) {
              var s = sxQuery('#ss360-layer')
              if (ss360Settings.searchResultCallback != null) {
                try {
                  ss360Settings.searchResultCallback.call(this, e)
                } catch (e) {
                  console.log(e)
                }
              } else {
                if (e.redirect != null && e.redirect.length > 0) {
                  var n = e.redirect
                  n.indexOf('?') > -1 ? (n += '&') : (n += '?'),
                  (n += 'ss360SearchTerm=' + w)
                  var o = ss360Settings.redirectCallback
                  return void (o != null && typeof o === 'function'
                    ? o.call(this, n)
                    : (window.location.href = n))
                }
                var h, p
                if (
                  (s.html(''), t == null && ss360Settings.showSearchBoxLayover)
                ) {
                  var x = sxQuery(
                      '<section role="search" id="ss360-custom-search">'
                    ),
                    b = ss360Settings.accessibility.searchFieldLabel
                  if (void 0 !== b) {
                    var m = sxQuery(
                      '<label style="' +
                        sxQuery.srOnlyCss +
                        '" for="ss360-custom-searchbox" class="ss360-sr-only">' +
                        b +
                        '</label>'
                    )
                    x.append(m)
                  }
                  var y = sxQuery(
                    '<input type="search" id="ss360-custom-searchbox">'
                  )
                  if (void 0 !== ss360Settings.searchBoxSelector) {
                    var S =
                      sxQuery(ss360Settings.searchBoxSelector).attr(
                        'placeholder'
                      ) ||
                      ss360Settings.placeholder ||
                      'Search'
                    y.attr('placeholder', S),
                    y.val(sxQuery(ss360Settings.searchBoxSelector).val()),
                    y.on('change', function (e) {
                      sxQuery(ss360Settings.searchBoxSelector).val(
                        e.target.value
                      )
                    })
                  }
                  var k = sxQuery(
                      '<button id="ss360-custom-searchbutton" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>'
                    ),
                    C =
                      '<img role="presentation" alt="" style="height:24px;width:24px" src="' +
                      (g + btoa(d.replace('#FILL#', '#ffffff'))) +
                      '"/>'
                  k.append(C)
                  var Q = function (e) {
                    e != null &&
                      e.length !== 0 &&
                      (ss360Settings.enterCallback != null &&
                      typeof ss360Settings.enterCallback === 'function'
                        ? ss360Settings.enterCallback(e)
                        : SS360.showResults(e))
                  }
                  y.on('keyup', function (e) {
                    e.keyCode === 13 && Q(e.target.value)
                  }),
                  k.on('click', function (e) {
                    Q(y.val())
                  }),
                  x.append(y),
                  x.append(k),
                  s.append(x)
                }
                if (
                  ((h =
                    t == null
                      ? sxQuery(
                        '<section class="ss360-layer-content" tabindex="-1" aria-labelledby="ss360-search-result-heading" style="overflow-x:auto;overflow-y:auto;max-height:calc(100%-25px)">'
                      )
                      : sxQuery(
                        '<section class="ss360-layer-content" aria-labelledby="ss360-search-result-heading">'
                      )),
                    Object.keys(e.suggests).length > 1)
                ) {
                  var A = !1
                  ss360Settings.navigation == 'top'
                    ? ((p = sxQuery(
                      '<nav role="navigation" class="ss360-top-nav" aria-label="Search Result Navigation"><ul role="menubar"></ul></nav>'
                    )),
                      (A = !0),
                      sxQuery('#ss360-layer').css('overflow', 'hidden'))
                    : ss360Settings.navigation == 'left' &&
                      ((p = sxQuery(
                        '<nav role="navigation" class="ss360-left-nav" aria-label="Search Result Navigation"><ul role="menubar"></ul></nav>'
                      )),
                        h.addClass('ss360-left-nav'),
                        (A = !0)),
                  A && s.append(p)
                }
                if (
                  (s.append(h),
                    ss360Settings.navigation == 'left' &&
                    s.append(sxQuery('<div style="clear:both">')),
                    ss360Settings.searchResultsCaption != null)
                ) {
                  var T = e.totalResults
                  if (ss360Settings.ignoreOtherContentGroup) {
                    try {
                      ;(T -= e.suggests._.length) < 0 && (T = 0)
                    } catch (e) {}
                  }
                  var I =
                      'Intl' in window ? new Intl.NumberFormat().format(T) : T,
                    R = sxQuery(
                      '<h' +
                        l +
                        ' id="ss360-search-result-heading"><a tabindex="-1" href="#">' +
                        ss360Settings.searchResultsCaption
                          .replace('#QUERY#', w)
                          .replace('#COUNT#', I) +
                        '</a></h' +
                        l +
                        '>'
                    )
                  R.find('a').click(function (e) {
                    e.preventDefault(), e.stopPropagation()
                  }),
                  e.plan === 'FREE' && R.css('paddingTop', '22px'),
                  h.append(R)
                }
                if (e.queryCorrection != null && e.queryCorrection != null) {
                  var N = ss360Settings.queryCorrectionText.replace(
                      '#CORRECTION#',
                      '<a id="ss360-query-correction" href="#">' +
                        e.queryCorrection +
                        '</a>'
                    ),
                    L = sxQuery('<div>' + N + '</div>')
                  h.append(L)
                }
                var B = 0
                if (
                  (sxQuery.each(e.suggests, function (e, s) {
                    var n = e
                        .replace(/[ "§$%&/(){}+*,.;|]/g, '_')
                        .toLowerCase(),
                      o = Math.round(1e4 * Math.random()),
                      r = e
                    if (r == '_') {
                      if (ss360Settings.ignoreOtherContentGroup) return
                      r = ss360Settings.otherContentGroupName
                    }
                    var l = null
                    r.length > 0 &&
                      (l = sxQuery(
                        '<li><button type="button" id="navelement' +
                          o +
                          '" class="ss360-nav-entry" role="menuitem">' +
                          r +
                          '</button></li>'
                      ))
                        .find('button')
                        .append(
                          '<span class="ss360-result-count">' +
                            s.length +
                            '</span>'
                        ),
                    l !== null &&
                        l.find('button').on('click', function (e) {
                          var s = sxQuery('.ss360-group-' + n),
                            i = s.find('*:first').find('a:first')
                          if (
                            (setTimeout(function () {
                              i.focus()
                            }, 5),
                              t == null)
                          ) {
                            var o =
                              sxQuery(
                                '#ss360-layer .ss360-layer-content'
                              ).scrollTop() + s.position().top
                            sxQuery(
                              '#ss360-layer .ss360-layer-content'
                            ).animateScrollTop(
                              o,
                              2 * ss360Settings.animationSpeed
                            )
                          } else a ? sxQuery('#ss360-search-console').animateScrollTop(sxQuery('.ss360-group-' + n).offset().top, 2 * ss360Settings.animationSpeed) : sxQuery('html, body').animateScrollTop(sxQuery('.ss360-group-' + n).offset().top, 2 * ss360Settings.animationSpeed)
                        }),
                    p != null && l != null && p.find('ul').append(l)
                    var d = sxQuery(
                      '<section class="ss360-group ss360-group-' +
                        n +
                        '" aria-labelledby="ss360-heading-' +
                        n +
                        '"></section>'
                    )
                    if (r.length > 0 && s.length > 0) {
                      var g = sxQuery(
                        '<h' +
                          c +
                          ' id="ss360-heading-' +
                          n +
                          '" class="content-group-heading">' +
                          r +
                          '</h' +
                          c +
                          '>'
                      )
                      d.append(g)
                    }
                    d.append('<ul></ul>')
                    var f = 0
                    if (
                      (sxQuery.each(s, function (e, t) {
                        var s = '<li class="ss360-suggests"><article>'
                        if (t.type == 'custom') {
                          ;(s = s.replace(
                            'ss360-suggests',
                            'ss360-suggests ss360-custom-result'
                          )),
                          (s += t.html)
                        } else {
                          if (
                            (t.link != null &&
                              ((s +=
                                '<header><span role="heading" aria-level="' +
                                u +
                                '"><a href="' +
                                t.link +
                                '"'),
                                ss360Settings.resultLinksOpenNewTab &&
                                (s += ' target="_blank"'),
                                (s += '>'),
                                (s += t.name),
                                (s += '</a></span></header>'),
                                ss360Settings.showResultLink &&
                                ((s +=
                                  '<a tabindex="-1" href="' +
                                  t.link +
                                  '" class="ss360-result-link"'),
                                  ss360Settings.resultLinksOpenNewTab &&
                                  (s += ' target="_blank"'),
                                  (s += ' aria-hidden="true">'),
                                  (s += decodeURI(t.link)),
                                  (s += '</a>'))),
                              (s += '<div class="ss360-content-container">'),
                              t.image != null &&
                              ss360Settings.showImagesResults &&
                              (t.link != null &&
                                ((s +=
                                  '<a aria-hidden="true" tabindex="-1" href="' +
                                  t.link +
                                  '"'),
                                  ss360Settings.resultLinksOpenNewTab &&
                                  (s += ' target="_blank"'),
                                  (s += '>')),
                                (s +=
                                '<img src="' +
                                t.image +
                                '" alt aria-hidden="true" role="presentation" aria-label="' +
                                t.name +
                                '"/>'),
                                t.link != null && (s += '</a>')),
                              t.content != null)
                          ) {
                            s += '<p>' + t.content + '</p>'
                          }
                          t.kvtable != null &&
                            t.kvtable.length > 16 &&
                            (s += t.kvtable)
                        }
                        ;(s += '</div>'),
                        (s += '<div class="unibox-ca"></div></article></li>')
                        var i = sxQuery(s)
                        f >= ss360Settings.moreResultsPagingSize &&
                          i.addClass('ss360-hidden'),
                        d.find('ul').append(i),
                        f++
                      }),
                        s.length > 0)
                    ) {
                      if ((h.append(d), ss360Settings.highlightQueryTerms)) {
                        for (var x = i.split(' '), b = 0; b < x.length; b++) {
                          try {
                            sxQuery(
                              'div.ss360-content-container > p'
                            ).highlight(x[b], 'ss360-highlight')
                          } catch (e) {
                            console.log(e)
                          }
                        }
                      }
                      if (
                        ((B += s.length),
                          ss360Settings.moreResultsButton != null &&
                          sxQuery(
                            '.ss360-group-' +
                              n +
                              '.ss360-group .ss360-suggests.ss360-hidden'
                          ).length > 0)
                      ) {
                        var v = sxQuery(
                          '<button type="button" class="ss360-more-results">' +
                            ss360Settings.moreResultsButton +
                            '</button>'
                        )
                        d.append(v),
                        v.on('mousedown, keydown, keyup, click', function (e) {
                          if (
                            (void 0 === e.keyCode ||
                                e.keyCode === 0 ||
                                e.keyCode === 13 ||
                                e.keyCode === 32) &&
                              ((void 0 !== e.keyCode && e.keyCode !== 0) ||
                                e.which === 1)
                          ) {
                            var t,
                              s = sxQuery(e.target)
                                .closest('.ss360-group')
                                .find('.ss360-suggests.ss360-hidden')
                            if (s.length > 0) {
                              var i = sxQuery(s[0]).find('a:first')
                              setTimeout(function () {
                                i.focus()
                              }, 5)
                            }
                            for (
                              t = 0;
                              t <
                                Math.min(
                                  ss360Settings.moreResultsPagingSize,
                                  s.length
                                );
                              t++
                            ) {
                              var n = s.get(t)
                              sxQuery(s.get(t)).fadeIn(
                                300,
                                function (e, t) {
                                  sxQuery(e).removeClass('ss360-hidden')
                                }.bind(this, n)
                              )
                            }
                            t == s.length && sxQuery(this).remove()
                          }
                        })
                      }
                    }
                  }),
                    ss360Settings.navigation == 'top' &&
                    sxQuery('.ss360-layer-content').css(
                      'max-height',
                      'calc(100% - 80px)'
                    ),
                    B == 0)
                ) {
                  var M = (ss360Settings.noResultsText || '').replace(
                      '#QUERY#',
                      w
                    ),
                    O = sxQuery('<div id="ss360-no-results">' + M + '</div>')
                  h.append(O)
                }
                if (
                  ((e.plan != 'FREE' && e.plan != 'COLUMBO') ||
                    h.append(
                      '<div><a href="https://sitesearch360.com" target="_blank"><img alt="Powered by Site Search 360" aria-label="Powered by Site Search 360" role="presentation" style="max-width:120px;float:right;position:absolute;top:0;right:5px;" src="https://sitesearch360.com/cdn/sitesearch360.svg"></a></div>'
                    ),
                    e.sortingOptions != null && e.sortingOptions.length > 0)
                ) {
                  var P = sxQuery(
                    '<section style="width:100%;min-height:1.5em;" id="ss360-sorting" role="search" aria-label="Sort Search Results"><select id="ss360-sorting-selection" style="max-width:150px;float:right;"></section> '
                  )
                  P.find('select').append(
                    sxQuery('<option value="_relevance">Relevance</option>')
                  )
                  for (var D = 0; D < e.sortingOptions.length; D++) {
                    P.find('select').append(
                      sxQuery(
                        '<option value="' +
                          e.sortingOptions[D] +
                          '">' +
                          e.sortingOptions[D] +
                          '</option>'
                      )
                    )
                  }
                  var H = h.find('#ss360-search-result-heading'),
                    E = !1
                  if (H.length > 0) {
                    var z = H.get()[0]
                    if (z) {
                      var U = z.parentNode
                      U && (U.insertBefore(P.get()[0], U.children[1]), (E = !0))
                    }
                  }
                  E || h.append(P),
                  e.sorting == '' && (e.sorting = '_relevance'),
                  P.find('select').val(e.sorting)
                  P.find('select').on('change', function () {
                    SS360.showResults(i, sxQuery(this).val())
                  })
                }
              }
              f()
              try {
                sxQuery(ss360Settings.searchBoxSelector).blur()
              } catch (e) {
                console.log(e)
              }
              if (
                (s.removeClass('ss360-animated ss360-bo'),
                  s.removeClass('ss360-overlay'),
                  sxQuery('#ss360Darken').remove(),
                  t == null)
              ) {
                s.addClass('ss360-overlay'),
                s.fadeIn(),
                s.scrollTop(0),
                s.removeClass('ss360-animated ss360-bo'),
                s.addClass('ss360-animated ss360-fid')
                var F = sxQuery('<div id="ss360Darken"></div>')
                sxQuery('body').append(F),
                sxQuery('#ss360CloseLayerButton').remove(),
                s.prepend(
                  '<button id="ss360CloseLayerButton" aria-label="Close Search Results"  title="Close Search Results" type="button"></button>'
                ),
                sxQuery('#ss360CloseLayerButton').click(SS360.closeLayer),
                sxQuery('#ss360CloseLayerButton').on(
                  'keydown, keyup',
                  function (e) {
                    ;(e.keyCode != 13 && e.keyCode != 32) ||
                        SS360.closeLayer()
                  }
                )
                var _ = function () {
                  var e = sxQuery('.ss360-layer-content'),
                    t = 0,
                    s = 0,
                    i = sxQuery('nav.ss360-top-nav').length > 0,
                    n = sxQuery('#ss360-custom-search').length > 0
                  i && n
                    ? (t = 95)
                    : i ? (t = 60) : n ? (t = 40) : ((t = 25), (s = 40))
                  var o = e.parent().height() - t
                  o && e.css('max-height', o + 'px'),
                  s && e.css('margin-top', s + 'px')
                }
                sxQuery(window).off('resize', _),
                sxQuery(window).on('resize', _),
                _(),
                s.off('scroll.ss360Scroll'),
                s.on('scroll.ss360Scroll', function (e) {
                  e.preventDefault(),
                  e.stopPropagation(),
                  (e.target.scrollTop = 0)
                })
              } else s.fadeIn(), sxQuery(t.contentBlock).html(s)
              setTimeout(function () {
                sxQuery('#ss360-search-result-heading a').focus()
              }, 5),
              e.queryCorrection != null &&
                  e.queryCorrection != null &&
                  sxQuery('#ss360-query-correction').click(function (t) {
                    try {
                      ss360Settings.enterCallback.call(this, e.queryCorrection)
                    } catch (e) {
                      console.log(e)
                    }
                    return t.preventDefault(), t.stopPropagation(), !1
                  }),
              sxQuery.each(s.find('img').get(), function (e, t) {
                var s = t.src,
                  i = new Image()
                  ;(i.onerror = function () {
                  sxQuery(t).hide()
                }),
                (i.src = s)
              })
              var q = ss360Settings.searchQueryParamName
              if (void 0 !== history.pushState && q !== '' && !1 !== r) {
                var Y = document.location.href,
                  G = {},
                  j = document.location.search
                if (j) {
                  G = ((j = j.substr(1)).split('&') || [])
                    .map(function (e) {
                      return e.split('=')
                    })
                    .reduce(function (e, t) {
                      return (e[t[0]] = t[1]), e
                    }, {})
                }
                ;(G[ss360Settings.searchQueryParamName] = encodeURIComponent(
                  i
                )),
                Y.indexOf('?') > -1 && (Y = Y.substring(0, Y.indexOf('?'))),
                Y.indexOf('#') > -1 && (Y = Y.substring(0, Y.indexOf('#')))
                var V = !0
                for (var Z in G) {
                  G.hasOwnProperty(Z) &&
                    ((Y += (V ? '?' : '&') + Z + '=' + G[Z].toLowerCase()),
                      (V = !1))
                }
                var W = { Page: document.title, Url: Y }
                history.pushState(W, W.Page, W.Url)
              }
              if (ss360Settings.postSearchCallback != null) {
                try {
                  ss360Settings.postSearchCallback.call(this, e)
                } catch (e) {
                  console.log(e)
                }
              }
              v(i)
            },
            function () {
              b(
                'There is no siteId "' +
                  e +
                  '", so no results can be retrieved. Please update your ss360Config object.'
              )
            }
          )
        }
      }
    }
  })()
function initializeSs360 () {
  // This prevents an error when the widget is manually initialised.
  if (window.ss360Config === undefined) {
    return
  }

  ;(ss360Settings = sxQuery.extend(
    {
      suggestUrl: '',
      searchResults: void 0,
      searchTrigger: void 0,
      fullScreenSearchCaption: 'Search this site',
      instantVisualFeedback: 'none',
      searchResultsCaption: 'Found #COUNT# search results for "#QUERY#"',
      placeholder: void 0,
      throttleTime: 300,
      extraHtml: void 0,
      highlight: !0,
      queryVisualizationHeadline: '',
      animationSpeed: 250,
      enterCallback: SS360.showResults,
      enterCallbackResult: SS360.followLink,
      typeCallback: SS360.recordTyping,
      blurCallback: SS360.blur,
      focusCallback: SS360.focus,
      closeLayerCallback: void 0,
      navigation: 'none',
      includeContentGroups: void 0,
      excludeContentGroups: void 0,
      filters: void 0,
      groupResults: !0,
      showSearchSuggestions: !0,
      showImagesSuggestions: !0,
      showImagesResults: !0,
      searchButton: void 0,
      minChars: 3,
      maxWidth: 400,
      searchBoxSelector: '#searchBox',
      numSuggestions: 6,
      maxQuerySuggestions: 3,
      querySuggestionHeadline: void 0,
      numResults: 100,
      autofocus: !1,
      inputFocusLayer: !1,
      defaultCss: !0,
      highlightQueryTerms: !0,
      preSearchCallback: void 0,
      postSearchCallback: void 0,
      preSuggestCallback: void 0,
      searchResultCallback: void 0,
      moreResultsButton: void 0,
      moreResultsPagingSize: 100,
      noResultsText: 'Sorry, we have not found any matches for your query.',
      queryCorrectionText: 'Did you mean "#CORRECTION#"?',
      otherContentGroupName: '',
      ignoreOtherContentGroup: !1,
      showResultLink: !0,
      themeColor: '#1C5D7D',
      searchQueryParamName: 'ss360Query',
      resultLinksOpenNewTab: !1,
      emptyQuerySuggestions: void 0,
      initCallback: void 0,
      suggestionsEqualSearch: !1,
      showErrors: !0,
      externalTracking: { providers: [], searchCallback: void 0 },
      searchBoxStyle: void 0,
      suggestionsStyle: void 0,
      loader: { type: 'circle' },
      suggestChangeCallback: void 0,
      redirectCallback: void 0,
      accessibility: {
        isMainContent: !1,
        resultTopHeadingLevel: 2,
        suggestHeadingLevel: 2,
        searchFieldLabel: 'Search',
        srSuggestionsHiddenText: 'Search suggestions are hidden',
        srNoSuggestionsText: 'No search suggestions',
        srSuggestionsCountText: '##COUNT## search suggestions shown',
        srOneSuggestionText: 'One search suggestion shown',
        srSuggestBoxControlDescription:
          'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.'
      },
      specialMobileSuggest: {
        enabled: void 0,
        breakpoint: 768,
        placeholder: '',
        searchBoxPlaceholder: '',
        customTopHtml: '',
        animateTransitions: !0,
        resizeSearchBoxOnScroll: !0
      },
      showSearchBoxLayover: !0
    },
    ss360Config
  )),
  ss360Settings.moreResultButton != null &&
      (ss360Settings.moreResultsButton = ss360Settings.moreResultButton),
  ss360Settings.numSuggests != null &&
      (ss360Settings.numSuggestions = ss360Settings.numSuggests),
  (ss360Settings.emptyQuerySuggests = ss360Settings.emptyQuerySuggestions),
  ss360Settings.specialMobileSuggest.enabled == null &&
      (ss360Settings.specialMobileSuggest.enabled = ss360Settings.defaultCss),
  !1 === ss360Settings.showSearchSuggestions &&
      (ss360Settings.specialMobileSuggest.enabled = !1),
  sxQuery(document).ready(function () {
    if (
      ((function (e) {
        e.fn.unibox = function (t) {
          ;(t = t || {}).hasMultipleSearchBoxes = this.length > 1
          var s = this.map(function (s, i) {
            i = e(i)
            var n = ss360Settings.accessibility,
              o = e.extend(
                {
                  suggestUrl: '',
                  ivfImagePath: '',
                  ivfImageOffset: -80,
                  missingErrorImage: void 0,
                  queryVisualizationHeadline: '',
                  highlight: !0,
                  throttleTime: 50,
                  animationSpeed: 300,
                  instantVisualFeedback: 'all',
                  enterCallback: void 0,
                  enterCallbackResult: void 0,
                  typeCallback: void 0,
                  focusCallback: void 0,
                  blurCallback: void 0,
                  placeholder: void 0,
                  extraHtml: void 0,
                  lineCallback: void 0,
                  noSuggests: void 0,
                  emptyQuerySuggests: void 0,
                  minChars: 3,
                  maxWidth: i.outerWidth(),
                  showDeleteAllButton: !1,
                  suggestOrder: [],
                  suggestSelectionOrder: [],
                  headingLevel: n.suggestHeadingLevel || 4,
                  searchFieldLabel: n.searchFieldLabel,
                  srSuggestionsHiddenText: n.srSuggestionsHiddenText,
                  srNoSuggestionsText: n.srNoSuggestionsText,
                  srSuggestionsCountText: n.srSuggestionsCountText,
                  srOneSuggestionText: n.srOneSuggestionText,
                  srSuggestBoxControlDescription:
                      n.srSuggestBoxControlDescription
                },
                t
              )
            o.searchBoxContainerSelector == null
              ? (o.searchBoxContainer = i.parent())
              : (o.searchBoxContainer = e(o.searchBoxContainerSelector))
            var r = new UniBox()
            return r.init(i, o), r
          })
          return s.length == 1 ? s[0] : s
        }
      })(sxQuery),
        SS360.init(),
        ss360Settings.defaultCss)
    ) {
      var e = sxQuery('body')
      e.append(
        '<style id="ss360-default-css">img.unibox-vis{width:70px}.unibox-selectable{clear:both;position:relative;font-family:sans-serif;font-size:14px;text-align:left;display:flex}.unibox-selectable a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.unibox-selectable .unibox-extra{cursor:default}.unibox-selectable:hover .unibox-extra{color:#fff}.unibox-selectable.active,.unibox-selectable:hover{background-color:' +
            ss360Settings.themeColor +
            ';color:#fff;cursor:pointer}.unibox-selectable.active a,.unibox-selectable.active span,.unibox-selectable.active .unibox-extra,.unibox-selectable:hover a,.unibox-selectable:hover span,.unibox-selectable:hover .unibox-extra{color:#fff}.unibox-selectable .unibox-selectable-img-container{width:60px;float:left;margin-right:6px}.unibox-selectable img{max-width:60px;max-height:60px}.unibox-selectable span span{font-weight:bold}.unibox-highlight{font-weight:bold}p.unibox-result-content{margin-top:5px;margin-bottom:15px}.unibox-ca{clear:both}#unibox-invisible{visibility:hidden;position:relative;text-align:left;height:0;display:none}#unibox-suggest-box,#unibox-suggest-box-special{position:absolute;display:none;border:1px solid #e5e5e5;background-color:#fff;color:#333;overflow:hidden;z-index:1500}#unibox-suggest-box a,#unibox-suggest-box-special a{text-decoration:none;color:' +
            ss360Settings.themeColor +
            '}#unibox-suggest-box .unibox-selectable:hover a,#unibox-suggest-box .unibox-selectable.active a,#unibox-suggest-box-special .unibox-selectable:hover a,#unibox-suggest-box-special .unibox-selectable.active a{color:#fff}#unibox-suggest-box > * > div,#unibox-suggest-box-special > * > div{padding:6px 8px}#unibox-suggest-box .unibox-suggest-heading,#unibox-suggest-box-special .unibox-suggest-heading{margin-left:8px;margin-top:6px;margin-bottom:6px;font-size:18px}.unibox-ivf{position:absolute}.unibox-ivf{width:76px;height:76px;position:absolute;top:-89px;left:-15px}.unibox-ivf img{max-width:76px;position:absolute;top:0;bottom:0;margin:auto;transition:.3s ease-out;-webkit-transition:.3s ease-out;-webkit-transform:rotateX(-90deg) translateY(100%);transform:rotateX(-90deg) translateY(100%)}.unibox-ivf img.l{-webkit-transform:rotateX(0) translateY(0);transform:rotateX(0) translateY(0)}#ss360-search-console > h2{text-align:center}#ss360-search-console{z-index:999998;position:fixed;top:-100%;left:0;width:100%;height:100%;background-color:#f5f5f5;overflow:auto}#ss360-query:focus{border:2px solid ' +
            ss360Settings.themeColor +
            ';outline:0}#ss360-query{display:block;padding:0 .4em 0 .4em;margin-left:auto;margin-right:auto;margin-bottom:2em;vertical-align:middle;border-radius:3px;min-width:50px;max-width:635px;width:100%;min-height:32px;background-color:#fff;border:2px solid #c9c9c9;color:#484848;font-size:24px;font-weight:300;height:54px;line-height:54px}#ss360-results{width:100%;max-width:1000px;margin-left:auto;margin-right:auto}#ss360-layer{padding:10px;text-align:left}#ss360-layer .content-group-heading{background-color:' +
            ss360Settings.themeColor +
            ';padding:5px;color:white;font-size:20px;margin-bottom: 0;margin-top:0}.ss360-layer-content h2{font-size:1.5em}.ss360-layer-content{position:relative;outline: none;margin:0}#ss360-layer.ss360-overlay p{text-align:left;margin:0}#ss360-layer.ss360-overlay{position:fixed;width:80%;padding:30px;padding-right:20px;background-color:#fff;color:#333;z-index:999999;left:calc(10% - 40px);top:calc(10% - 30px);height:80%;overflow:auto;overflow-y:hidden;box-sizing:content-box}.ss360-suggests{margin-bottom:25px;margin-top:5px}.ss360-suggests a{font-size:1.2em}.ss360-content-container p{margin-top:0.5em}.ss360-content-container img{width:125px;float:left;margin:6px 15px 6px 0;;max-height:200px;object-fit:contain}.ss360-content-container table{width:auto;border:0;margin-left:0;margin-right:0}.ss360-content-container table tr,.ss360-content-container table tr td{border:0}.ss360-content-container table tr td:nth-of-type(1){font-weight:bold;padding-right:10px}.ss360-animated{-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes ss360-bi{0{opacity:0;-webkit-transform:scale(.3)}50%{opacity:1;-webkit-transform:scale(1.05)}70%{-webkit-transform:scale(.9)}100%{-webkit-transform:scale(1)}}@keyframes ss360-bi{0{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.ss360-bi{-webkit-animation-name:ss360-bi;animation-name:ss360-bi}@-webkit-keyframes ss360-bo{0{-webkit-transform:scale(1)}25%{-webkit-transform:scale(.95)}50%{opacity:1;-webkit-transform:scale(1.1)}100%{opacity:0;-webkit-transform:scale(.3)}}@keyframes ss360-bo{0{transform:scale(1)}25%{transform:scale(.95)}50%{opacity:1;transform:scale(1.1)}100%{opacity:0;transform:scale(.3)}}.ss360-bo{-webkit-animation-name:ss360-bo;animation-name:ss360-bo}@-webkit-keyframes ss360-fid{0{opacity:0;-webkit-transform:translateY(-20px)}100%{opacity:1;-webkit-transform:translateY(0)}}@keyframes ss360-fid{0{opacity:0;transform:translateY(-20px)}100%{opacity:1;transform:translateY(0)}}.ss360-fid{-webkit-animation-name:ss360-fid;animation-name:ss360-fid}#ss360-searchbox-spinner{width:80px;height:80px;position:fixed;left:49.5%;top:49.5%;z-index:999999;display:none}.ss360-double-bounce1,.ss360-double-bounce2{width:100%;height:100%;border-radius:50%!important;background-color:' +
            ss360Settings.themeColor +
            ';opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce 2.0s infinite ease-in-out;animation:sk-bounce 2.0s infinite ease-in-out}.ss360-double-bounce2{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}@-webkit-keyframes sk-bounce{0%,100%{-webkit-transform:scale(0.0)}50%{-webkit-transform:scale(1.0)}}@keyframes sk-bounce{0%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}50%{transform:scale(1.0);-webkit-transform:scale(1.0)}}@-webkit-keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg)}100%{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes sk-rotateplane{0%{transform:perspective(120px) rotateX(0deg) rotateY(0deg);-webkit-transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg);-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}.ss360-spinner-square{width:60px;height:60px;background-color:' +
            ss360Settings.themeColor +
            ';-webkit-animation:sk-rotateplane 1.2s infinite ease-in-out;animation:sk-rotateplane 1.2s infinite ease-in-out}.ss360-layer-content > h2{margin-top:0}.ss360-top-nav{padding-bottom:0}.ss360-left-nav{float:left;width:20%}.ss360-left-nav .ss360-nav-entry{margin-bottom:10px}.ss360-layer-content.ss360-left-nav{float:right;width:80%}.ss360-nav-entry:hover{border-bottom:3px solid ' +
            ss360Settings.themeColor +
            ';padding-bottom:8px}.ss360-nav-entry{display:inline-block;padding:10px;background:#fff;color:#333;margin-right:10px;border:1px solid ' +
            ss360Settings.themeColor +
            ';cursor:pointer}.ss360-result-count:after{content:")"}.ss360-result-count:before{content:"("}.ss360-result-count{margin-left:5px}.ss360-search-term-highlight{background-color:#b5f948;padding:0 3px}.ss360-highlight{font-weight:bold}.ss360-hidden{display:none}.ss360-more-results{border:1px solid ' +
            ss360Settings.themeColor +
            ';color:' +
            ss360Settings.themeColor +
            ';font-weight:bold;padding:10px 20px;border-radius:12px;margin-bottom:25px;margin-left:auto;margin-right:auto;text-align:center;width:210px;cursor:pointer}#ss360Darken,#ss360Darken-input{background-color:rgba(0,0,0,.65)!important;width:100%;height:100%;position:fixed;top:0;left:0;cursor:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADo0lEQVRYhb1XP2gbZxR/7ztFR4OCWp2wfMa1RUF24BwLdF4aYxAatIjMovVQ0KAMhoJd2XO2DmrwEDzEg0d1Kh6yxSC0eckd2M4NFrVQPeQ4Lh6ubi/osPQ6VBKyIuVOspLfdu973/f73fv+/hA8QpKkgN/vlwFARsTFIWnvAEBpNBoVTdP+8TIuuiXIsiwSUZ6Ikoj4wKtgAHjVbDZ/Pzk5qY4lQJKkAM/zvwDAkxFIPwIRVRzHeTasItygYDweX/D5fL8h4uO7kAMAIGKU47jvI5HIW8Mwrj5q7w/Isiy2Wq3SiOV2BRFdM8Z+VBRF743fqoAkSQHG2AtEnJkkOQAAIvJEJAuC8No0TacTZ71JPM8//8QKn4SIRZ7nn/fGuhVIJBJ5uOOC84gZURRB13UFoL0G2lvt1Rcg7wIRnyiKojMAACLKf0nyXk5OkqSAz+f71a3D8vLyV5FI5J5hGDfDcoLBIFcqlR7Ozs7eOz4+djsJF0OhUInxPJ/0orhQKHy7t7e3kMlkgsPIDw4OFqLR6P3V1dWvg8HgwDOmFzzPJ7np6ek8Ikbdki8uLuxMJiOk0+mwZVmOpmkfett3d3e/W1paelCv1+1cLle1LKvpNiYRASeK4k+IGHZLNgzjRlGUv9Pp9DfJZDJERE1VVf8FACgWi/Nra2uhUcjbaGAikXjjMRkAbpe6XC6/BwBIpVLhMcgBAGBkAf0iAADGJQfoOwm9wrKsZq1WszvftVrNHod8bAHFYnG+U/Z6vW6nUqlwsVicH0sAEZ2P0mFra0vsnfNcLlcdVwQRnTMA0F0z28hms8L6+vqMaZqNzpxbltXM5XJVTdOuxxChc6IoCl4eHtlsVtjZ2Ynatn2zubn55+XlZfdKbTQadHh4eBWLxfypVCoci8X8R0dHlgcBfzDGWMWL1JWVlYBt2zcbGxvV09PTD4Nytre3/yqXy+91XXcGtfeDMVZBAIBEIvESAGS3DnNzc/7eP78jFFVVn3Z2wb6XHhMk73IyAABVVRUiqkxw8E+CiCqqqipdAQAAjuM8g/+NxefGuzYXAPQ8yUzTdKamphRETCMi/zmYiei61Wr9fHZ21t36t+5swzCuIpHIMSIuebkhRyQ/b7VahX6nNNAZtX3gy0m9kIno3HGcp4Pc0cBXi2majiAIrzmO8yPiozuSVxzHKQyzZq7mNB6PLzDG8oiYHJFbAYD9zmofBlcBHbQt2w/gwZ4j4n6/BRuG/wA9X65CnAC2oQAAAABJRU5ErkJggg==") 12 12,auto;z-index:999998}#ss360CloseLayerButton{-webkit-transform-origin:center;transform-origin:center;cursor:pointer;position:absolute;top:8px;right:8px;width:32px;height:32px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAG0ElEQVR4nN2bT0wTWRzHf78ZaLUBS0Cx07Ba3YBmJ5YwPZhdTCAevKinPTRoYtRE1wRuKicT5bK7SVc8ccEEbxIPGw/owSVp8LQX2mpNd1NOYFbGgmR3goHMxPa3h85rCgz9+2ZAPrd50/nN+3773pv3F8FmZFlucrvdJwAgBAASAPjLPLIIACoAxHRdT6dSqc925g/tCNrT09OHiP2QF11OcDkWASBGRDOJROJ13ZnbBDcDQqGQREQXiWgAEZt5xS2GiFYRcRIRp2KxmMojZt0GhEIhKZfLDSDiJR4ZqhQieioIwmS9RtRlQE9PzwAA3LTrHy8HEa0CwHgikZisNUZNBnR3d3cJgnAfEU/U+mKeEFE6l8uNvH37dq7aZ8VqH1AU5QIi/oyI9TZu3EDEg4h4zu/3r6iqWpUJVRmgKMpNALiNiO6qcugAZp76JUkCVVVjlT5XsQGKotwHAEcbuhoJSZIkqapa0SezIgPMf/5rEM84UWlJKGuAoigXAOA2l2w5S0iSpMVybUJJA0zxD3jmymH6y5mwrQHd3d1dZmu/6xq8aiCi0OHDh//MZDIrVvct+wGyLDe5XK6pnerg8IaIVg3DuGg1sBKsHnC5XA/2ingAAERsdrlcD6zubakCZkfnqt2ZchpEDFi1BxuqwF4r+puxqgobqoDb7b60V8UD5KuC2+3e0J8pGCDLchMRDTifLWchogFZlpvYdcEAl8u1Y8Pachw5csTFK5bZIN5k18VV4CKvl3i9XvH8+fNeHrHC4XDb8+fPT4XD4TYe8UwKWkWAwhweNwMeP37cGQ6HJU3TjFQqtV5rnHA43DY8PBwAAOjt7W2pNx4DEd0+ny/98ePHBcFM6K83KCMSiRyVZbkZAGB4eDhw48aN9lriBIPB/UNDQx3FaUNDQx1er7fqOQwrmGYBAICI+nkEBQCYnZ3d0Nu6devWN5FI5Gg1MYLB4P6xsbEuj8fTwNLW1ta+DA4OzmmaluWRT6ZZNKe3uA11U6nUuqZpRm9vbwtLO3bsmKezs9M1PT2tlXu+lPhkMll38Wcgoru9vX1G9Pv95xDxB16BAWo3wSnxDEScFyVJOoeIp3gHr9YEp8WbzIt+v/8q1L96Y0kqlVr/8OHD2unTpw80NjYKAHkTzpw50xyNRv/TdZ0A8p/NR48efXvo0KHC0NsB8YCIhkBETeV/WjsvX77UBgcH59bW1r6wNFmWmycmJrq8Xq/o9XrFiYmJrkAg4GH3nRAPAEBETagoyqydL2FYFfH5+fk1AICdEM9wzAAAaxOKcVo8wDYTInaRTCbXN1cHxk6IB3DYAACAhYUFY2lpydicvrS0ZCwsLGxJtxtHDbBq8BiBQMDDGkYn8+SYAaXEM5gJwWBwv1P5EogobfdLthMfjUY/Xbt27a/iNiEQCHjGxsYcMYGI0gIi2roHp5T4u3fvLlg1jB6Pp8EJExDxs+0l4N69ex3biWfXyWRy/fLly3+zfgGAMyYQUVqA/I4sW4hEIkfPnj17sDhts3jG+/fvjevXr885bIIq5HK5itfSq6Ea8QxN07JWJjx58uQ7zlNiAACQy+ViYiaTWfH5fAM81wBrEc/QdZ1evXr1b19f34GWlpZGls5zSgwgv0bw5s2bUfYZ5FYK6hHPYCUhlUqtFqfznBIDUzObE5zhEdHr9YrHjx8v2eBViqZp2StXrsxFo9FPAPynxJhmEQCgtbV1URTFH+utBqz4njx5cl9HR8e+WsUXMz09rfl8PnF0dPQfXuMEc4nsl+XlZaOwNmjuAeI2NR4Oh9uePXtmuSa/C5iKx+MjAEVdYUQc5/mGXSx+g9aCAbFYTCWimR3JkYMQ0Uzx9toNgyFBEB46nyVn2axxwydFVdXPPp+vyY5Z4t0AET2Nx+PTxWlbhsOGYYxDfo/+XmPR1LaBLQaYuydGHMmSs4xYbZKy7FWpqqpKkgSQP/GxFxiPx+MvrG5s261UVTUm5V3YFVvi62AqHo+Pbnez5JSYrusPnZgxsgsiSuu6XvLLVnJgsby8bLS1tf0hiuL3iHiw1G93G0SUNgzjp3Knzio+McK7q2wzha5uOSoeWqqq+voraRMqFg9Q5YkRVVVf+3y+JgAI7LZN1OYBqt8TicSv1TxX86EpURR/A5uW1WtgMZvN3nHk0BQAQCaTWWltbZ1qaGhog52vElO6rt959+5dTZO7dR+cNEvDbXC+0xTLZrMPa/nXi+F2dFZRlBAAXAD7vxRTAPAiHo9zmcfkfnja3HF+EREHgF8bsUhEk4ZhTPE+TW7L6XGGeaA6RERd5inTSqtJjIjSiDiHiDFeB6Wt+B91omKdGqz3hAAAAABJRU5ErkJggg==") no-repeat;background-size:32px}@keyframes rotate{0{transform:rotate(0)}50%{transform:rotate(180deg)}100%{transform:rotate(90deg)}}#ss360CloseLayerButton:hover{animation-duration:.5s;animation-name:rotate;animation-iteration-count:1}#ss360IndexFilters{display:none}.ss360-content-container > a,.ss360-content-container > a:hover{border:none}@media all and (max-width:680px){.ss360-left-nav{float:left;width:100%;clear:both}.ss360-layer-content.ss360-left-nav{float:left;width:100%}#ss360-layer.ss360-overlay{position:fixed;width:100%;padding:10px 0 10px 10px;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;left:0;top:0;height:100%}}a.ss360-result-link{display:block;font-size:14px;color:#006621;word-break:break-word;padding-right:1em}.ss360-top-nav ul,.ss360-left-nav ul,.ss360-group ul{padding-left:0;list-style:none}.ss360-top-nav ul{margin-left:0;margin-bottom:1em}.ss360-top-nav ul li{display:inline-block}@media(max-width:680px){.ss360-left-nav ul li{display:inline-block}nav.ss360-left-nav ul li{margin-top:5px}nav.ss360-left-nav button{margin-right:5px}.ss360-left-nav .ss360-nav-entry{margin-bottom:0}.ss360-left-nav{margin-bottom:1em}}.ss360-more-results{display:block;background:none;width:252px}.ss360-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}li.ss360-suggests header > *{margin:0}#ss360CloseLayerButton{border:none}#ss360-search-result-heading{margin-bottom:0.5em}#ss360-search-result-heading a{color:inherit;text-decoration:none;cursor:default;outline:none}.ss360-content-container p{font-size:1em;line-height:1.5em;padding-right:1em}#ss360-layer.ss360-overlay{max-width:800px}@media (min-width:1000px){#ss360-layer.ss360-overlay{left:calc((100% - 800px) / 2)}}@media (prefers-reduced-motion:reduce){#ss360CloseLayerButton:hover,div#ss360-searchbox-spinner > *{animation-duration:0;animation-duration:0s}}#ss360CloseLayerButton{width:64px;height:64px;background-position-x:16px;background-position-y:16px}#ss360-layer #ss360-custom-search{display:flex;flex-direction:row;max-width:calc(100% - 50px);display:-webkit-flex;display:-ms-flexbox;display:-webkit-flex;padding:8px 0;margin-top:-19px;margin-bottom:0}@media (max-width:680px){#ss360-layer #ss360-custom-search{margin-top:1px}}#ss360-custom-searchbox{-webkit-appearance:none;border-radius:0;max-width:calc(100% - 70px);height:44px;font-size:21px;padding-left:14px;padding-right:0;border:1px solid #d4d4d4;width:100%;box-sizing:border-box;margin:0}#ss360-custom-searchbutton{display:flex;flex-direction:row;justify-content:center;align-items:center;height:44px;width:44px;border:1px solid ' +
            ss360Settings.themeColor +
            ';margin-top:0;cursor:pointer;background:' +
            ss360Settings.themeColor +
            ';padding:0}#ss360-custom-searchbutton:hover{filter:brightness(80%)}nav.ss360-top-nav ul,nav.ss360-left-nav ul{margin-top:5px}nav.ss360-top-nav ul li{margin-top:5px}nav.ss360-top-nav button{margin-right:5px}.ss360-content-container p{margin-bottom:25px}#unibox-special{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000000;overflow:hidden}#unibox-special .input-container{width:calc(100% - 2px);border:1px solid #bbb;background:#fff}#unibox-special .unibox-special-searchbox{width:calc(100% - 2 * 63px);height:48px;font-size:19px;margin:16px 63px;border:1px solid #bbb;border-radius:0;-webkit-appearance:none}#unibox-special .unibox-special-icon{position:absolute;top:16px;height:50px;width:50px;padding:0;background:transparent;border:none;cursor:pointer}#unibox-special .unibox-special-close{left:0;border-right:1px solid #bbb;background:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==) no-repeat center;background-size:24px}#unibox-special .unibox-special-searchbutton{right:0;border-left:1px solid #bbb;background:url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6Ii8+ICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) no-repeat center;background-size:24px}#unibox-special #unibox-suggest-box-special{overflow-y:scroll;-webkit-overflow-scrolling:touch}#unibox-special .unibox-special-box{position:absolute;overflow-y:hidden;overflow-x:hidden;display:block}#unibox-special #unibox-suggest-box-special{width:100%;height:100%;margin-top:2px}#unibox-special #unibox-suggest-box-special .unibox-selectable{min-height:50px}.move--left{transition-timing-function:ease-out;-ms-transform:translate3d(-100%,0,0);-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);pointer-events:none;transition-delay:0s}.move--right{transition-timing-function:ease-out;-ms-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);pointer-events:none;transition-delay:0s}#unibox-special input[type="search"]{padding:0 0.5rem}#ss360-search-result-heading+#ss360-sorting{margin-top:-0.5em;margin-bottom: 0.25em}@media(max-width:680px){#ss360-sorting-selection{margin-right:15px}#ss360-layer #ss360-custom-search{margin-top:0}}.ss360-suggests>article>header{position:relative;padding:0;text-align:left}#ss360-search-result-heading a{pointer-events:none}.ss360-layer-content > section > ul{margin-left:0}.unibox-stretch{height:100%!important}section.ss360-group{margin-top:0;margin-bottom:0}</style>'
      ),
      e.append(
        '<div id="ss360-searchbox-spinner"><div class="ss360-double-bounce1"></div><div class="ss360-double-bounce2"></div></div>'
      ),
      ss360Settings.loader.type == 'square' &&
            (sxQuery('#ss360-searchbox-spinner').html(''),
              sxQuery('#ss360-searchbox-spinner').addClass(
                'ss360-spinner-square'
              ))
    }
    var t = {}
    if (
      (location.search
        .substr(1)
        .split('&')
        .forEach(function (e) {
          t[e.split('=')[0]] = e.split('=')[1]
        }),
        t.ss360SearchTerm != null)
    ) {
      try {
        sxQuery('div').highlight(
          t.ss360SearchTerm,
          'ss360-search-term-highlight'
        )
      } catch (e) {
        console.log(e)
      }
    }
    if (t[ss360Settings.searchQueryParamName] != null) {
      var s = t[ss360Settings.searchQueryParamName]
      try {
        s = decodeURIComponent(t[ss360Settings.searchQueryParamName])
      } catch (e) {
        console.log(e)
        try {
          var i = SS360.getCookie('ss360LastQuery')
          void 0 !== i && i != null && (s = i)
        } catch (e) {
          console.log(e)
        }
      }
      ss360Settings.searchTrigger != null &&
          (sxQuery('#ss360-query').val(s), SS360.showFullscreenLayer()),
      SS360.showResults(s)
    }
  })
}
initializeSs360()
