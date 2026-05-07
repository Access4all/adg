import $ from 'jquery'

import BaseModule from '../BaseModule'

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
    let $link = $(
      '<a class="anchor-link"><span aria-hidden="true">#</span><span class="visuallyhidden">Link to heading "' +
        this.$el.text() +
        '"</span></a>'
    )
    $link.attr('href', '#' + this.id)
    this.$el.wrap("<div class='anchor-surround'></div>")
    this.$el.after($link)
  }
}
