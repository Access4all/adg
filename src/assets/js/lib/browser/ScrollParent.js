define(['jquery'], function ($) {
  function getScrollParent (el) {
    var p = el
    while ((p = p.offsetParent)) {
      var styles = window.getComputedStyle(p)
      if (
        styles.position == 'fixed' ||
        (p.scrollHeight > p.clientHeight && styles.overflow !== 'visible')
      ) {
        return p
      }
    }
    return document
  }

  function ScrollParent (el) {
    if (el) {
      this.init($(el).get(0))
    }
  }

  ScrollParent.extraOffset = { top: 0, bottom: 0 } // extra offset to avoid overlay with sticky headers and such (HACK)

  ScrollParent.prototype.init = function (el) {
    this.scrollParentEl = getScrollParent(el)
    this.$scrollParent = $(this.scrollParentEl)
    this.isDocument =
      this.$scrollParent.is(document) ||
      this.$scrollParent.is('html') ||
      this.$scrollParent.is('body')
  }

  ScrollParent.prototype.getElement = function () {
    return this.scrollParentEl
  }

  ScrollParent.prototype.scrollTop = function () {
    return this.$scrollParent.scrollTop()
  }

  ScrollParent.prototype.getOffset = function (el) {
    var scrollOffsetTop = 0,
      p = el
    while (p && p !== this.scrollParentEl) {
      scrollOffsetTop += p.offsetTop
      p = p.offsetParent
    }
    return (
      scrollOffsetTop -
      (ScrollParent.extraOffset.top || 0) +
      (ScrollParent.extraOffset.bottom || 0)
    )
  }

  ScrollParent.prototype.getHeight = function () {
    return this.isDocument
      ? $(window).height()
      : this.scrollParentEl.clientHeight
  }

  ScrollParent.prototype.scrollTo = function (value, animation) {
    var $target = $(this.isDocument ? 'html, body' : this.scrollParentEl)
    if (animation) {
      $target
        .stop()
        .delay(animation.delay || 0)
        .animate(
          {
            scrollTop: value
          },
          $.extend({ duration: 250, easing: 'easeInOutQuart' }, animation)
        )
    } else {
      $target.scrollTop(value)
    }
  }

  return ScrollParent
})
