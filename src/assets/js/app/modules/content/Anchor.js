import $ from 'jquery'

import BaseModule from '../BaseModule.js'

/**
 * Anchor
 *
 * @selector .js-anchor
 * @enabled true
 */
export default class Anchor extends BaseModule {
  constructor() {
    super()
    this.ns = BaseModule.ns('Anchor')
  }

  init(element) {
    var DEFAULTS = {}
    this.$el = $(element)
    this.config = $.extend(true, {}, DEFAULTS)
    this.id = this.$el.attr('id')

    // var self = this

    this.on('click', function (e) {})

    this.initLink()

    return this
  }

  initLink() {
    const headingText = this.$el.text()
    const $link = $('<a class="anchor-link"></a>')
    const $name = $('<span class="visuallyhidden"></span>')

    $name.text('Direct link to this section: ' + headingText)
    $link.attr('href', '#' + this.id)
    $link.append('<span aria-hidden="true">#</span>', $name)
    this.$el.wrap('<div class="anchor-surround"></div>')
    this.$el.after($link)
  }
}
