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
    $(window).on('scroll', function () {
      self.check()
    })
    this.check()

    return this
  }

  check () {
    var scrollPos = $(window).scrollTop()
    if (scrollPos > 0) {
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
