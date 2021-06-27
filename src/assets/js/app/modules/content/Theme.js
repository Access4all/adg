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
    var DEFAULTS = {}
    this.$el = $(element)
    this.config = $.extend(true, {}, DEFAULTS)

    return this
  }
}
