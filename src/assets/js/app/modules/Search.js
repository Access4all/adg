/* globals initializeSs360 */
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
    this.$el = $(element)

    this.enable()

    return this
  }

  enable () {
    let ss360Config = {
      siteId: 'accessibility-developer-guide.netlify.com',
      searchBox: {
        selector: '#' + this.$el.find('input').attr('id')
      },
      suggestions: {
        showImages: false,
        showOnMobile: true,
        mobileScrollOnFocus: false,
        extraHtml: '#Snippet#' // this refers to the "Snippet" Global Data Point
      },
      tracking: {
        enhanced: false,
        logQueries: false
      },
      callbacks: {
        enter: function () {}
      }
    }

    initializeSs360(ss360Config)
  }
}
