import $ from 'jquery'

import BaseModule from '../BaseModule'

/**
 * Theme
 *
 * @selector .js-theme
 * @enabled true
 */
export default class Theme extends BaseModule {
  constructor () {
    super()
    this.ns = BaseModule.ns('Theme')
  }

  init (element) {
    var DEFAULTS = {
      belowClass: 'is-below'
    }
    this.$el = $(element)
    this.config = $.extend(true, {}, DEFAULTS)
    var self = this

    this.windowHeight = $(window).height()
    $(window).on('scroll', function () {
      self.check()
    })

    return this
  }

  check () {
    var scrollPos = document.documentElement.scrollTop
    if (scrollPos > this.windowHeight) {
      this.enable()
    } else {
      this.disable()
    }
  }

  enable () {
    this.$el.addClass(this.config.belowClass)
  }
  disable () {
    this.$el.removeClass(this.config.belowClass)
  }
}
