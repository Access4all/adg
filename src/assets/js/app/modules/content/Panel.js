import $ from 'jquery'

import BaseModule from '../BaseModule'

/**
 * Panel (extracted from `ui.js` for consistency)
 *
 * @selector .js-panel
 * @enabled true
 */
export default class Panel extends BaseModule {
  constructor () {
    super()
    this.ns = BaseModule.ns('Panel')
  }

  init (element) {
    var DEFAULTS = {}
    this.$el = $(element)
    this.config = $.extend(true, {}, DEFAULTS)

    // Make Enter select/deselect checkbox (instead of submitting form)
    this.$el.keypress(function (e) {
      if ((e.keyCode ? e.keyCode : e.which) === 13) {
        return $(this).trigger('click')
      }
    })

    this.$el.change(function () {
      function hideShowPanel (hide, id) {
        var $trigger = $("[for='" + id + "']")
        var $panel = $(`#${id}_panel`)

        if (!hide) {
          $trigger.addClass('is-active')
          $panel.show()
        } else {
          $trigger.removeClass('is-active')
          $panel.hide()
        }
      }

      $("[name='" + $(this).attr('name') + "']")
        .not($(this))
        .each(function () {
          var $btn = $(this)
          $btn.prop('checked', false)
          hideShowPanel(true, $btn.attr('id'))
        })

      return hideShowPanel(!$(this).is(':checked'), $(this).attr('id'))
    })

    return this
  }
}
