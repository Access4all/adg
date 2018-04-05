import $ from 'jquery'

import BaseModule from './BaseModule'

/**
 * Search
 *
 * @selector .js-search
 * @enabled true
 */
export default class Search extends BaseModule {
  constructor () {
    super()
    this.ns = BaseModule.ns('Search')
    // this.config = $.extend(true, {}, DEFAULTS, config || {})

    this.DEFAULT_OPTIONS = {}
  }

  init (element) {
    var DEFAULTS = {}
    var self = this

    this.$el = $(element)

    this.enable()

    return this
  }

  enable () {
    console.log('asda')

    window.ss360Config = {
      siteId: 'accessibility-developer-guide.netlify.com',
      searchBoxSelector: '.' + this.$el.attr('class')
    }

    initializeSs360()
  }
}
