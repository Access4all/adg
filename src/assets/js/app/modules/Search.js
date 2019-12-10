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
    window.ss360Config = {
      siteId: 'accessibility-developer-guide.netlify.com',
      searchBoxSelector: '#' + this.$el.find('input').attr('id'),
      showImagesSuggestions: false,
      specialMobileSuggest: {
        enabled: false
      },
      suggestionsEqualSearch: true
    }

    initializeSs360()

    var $toggle = this.$el.find('.search--toggle')
    var $input = this.$el.find('.search--input')

    $toggle.on('click', function () {
      $input
        .toggleClass('search--input-expanded')
        .focus()
        .focusout(function () {
          // Make sure the `toggleClass` above is fired before this one
          // Otherwise we cannot close the field by clicking on the button
          setTimeout(function () {
            $input.removeClass('search--input-expanded')
          }, 100)
        })
    })
  }
}
