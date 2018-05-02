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
    window.ss360Config = {
      siteId: 'accessibility-developer-guide.netlify.com',
      searchBoxSelector: '.' + this.$el.find('input').attr('class'),
      showImagesSuggestions: false,
      specialMobileSuggest: {
        enabled: false
      },

      // we assign this property here so we can use it in the "suggestChangeCallback" callback
      searchBox: this.$el,

      enterCallback: function () {
        return false
      },
      suggestChangeCallback: function () {
        var searchBox = window.ss360Config.searchBox,
          suggests = searchBox.find('#unibox-suggest-box section'),
          radiosList = $('<ul/>')

        suggests.find('a').each(function (index, item) {
          var id = 'search-suggests-' + index,
            radio,
            label,
            item

          radio = $('<input type="radio" name="search-suggests"/>')
            .attr('value', $(this).attr('href'))
            .attr('id', id)
            .on('change', function () {
              window.location.assign(this.value)
            })

          label = $('<label/>')
            .attr('for', id)
            .html($(this).html())

          item = $('<li/>').append(radio, label)

          radiosList.append(item)
        })

        suggests.replaceWith(radiosList)
      }
    }

    initializeSs360()

    this.$el.find('.search--toggle').one('click', function () {
      $(this)
        .siblings('.search--input')
        .addClass('search--input-expanded')
        .focus()
    })
  }
}
