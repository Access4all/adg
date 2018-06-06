;(function () {
  $(document).ready(function () {
    return $("input[type='radio']").change(function () {
      var $current_radiobutton, current_panel_id, current_radiobutton_name
      $current_radiobutton = $(this)
      current_radiobutton_name = $current_radiobutton.attr('name')
      current_panel_id = `#${$current_radiobutton.attr('value')}_panel`
      return $(`[name='${current_radiobutton_name}']`).each((i, element) => {
        var $panel, $radiobutton, panel_id
        $radiobutton = $(element)
        panel_id = `#${$radiobutton.attr('id')}_panel`
        $panel = $(panel_id)
        if (panel_id === current_panel_id) {
          return $panel.show()
        } else {
          return $panel.hide()
        }
      })
    })
  })
}.call(this))
