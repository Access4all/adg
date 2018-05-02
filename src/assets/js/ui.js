import $ from 'jquery'

import 'details-polyfill'
import modules from './app/modules'

modules()

$(document).ready(function () {
  return $("input[type='checkbox']").each((i, element) => {
    var $checkbox
    $checkbox = $(element)

    // Make Enter select/deselect checkbox (instead of submitting form)
    $checkbox.keypress(function (e) {
      if ((e.keyCode ? e.keyCode : e.which) === 13) {
        return $(this).trigger('click')
      }
    })
    return $checkbox.change(function () {
      function hideShowPanel (hide, id) {
        var $trigger = $("[for='" + id + "']"),
          $panel = $(`#${id}_panel`)

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
  })
})
