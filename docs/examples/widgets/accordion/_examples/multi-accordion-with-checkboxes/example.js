;(function () {
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
        var $panel, panel_id
        panel_id = `#${$checkbox.attr('id')}_panel`
        $panel = $(panel_id)
        if ($checkbox.is(':checked')) {
          return $panel.show()
        } else {
          return $panel.hide()
        }
      })
    })
  })
}.call(this))
