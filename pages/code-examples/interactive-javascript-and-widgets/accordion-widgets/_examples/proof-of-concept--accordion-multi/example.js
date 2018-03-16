;(function () {
  $(document).ready(function () {
    return $("input[type='checkbox']").each(
      (function (_this) {
        return function (i, element) {
          var $checkbox
          $checkbox = $(element)
          $checkbox.keypress(function (e) {
            if ((e.keyCode ? e.keyCode : e.which) === 13) {
              return $(this).trigger('click')
            }
          })
          return $checkbox.change(function () {
            var $panel, panel_id
            panel_id = '#' + $checkbox.attr('id') + '_panel'
            $panel = $(panel_id)
            if ($checkbox.is(':checked')) {
              return $panel.show()
            } else {
              return $panel.hide()
            }
          })
        }
      })(this)
    )
  })
}.call(this))
