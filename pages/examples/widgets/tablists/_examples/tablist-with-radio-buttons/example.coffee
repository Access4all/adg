$(document).ready ->
  $("input[type='radio']").change ->
    $current_radiobutton     = $(@)
    current_radiobutton_name = $current_radiobutton.attr 'name'
    current_panel_id         = "##{$current_radiobutton.attr('value')}_panel"
    
    $("[name='#{current_radiobutton_name}']").each (i, element) =>
      $radiobutton = $(element)
      panel_id     = "##{$radiobutton.attr('id')}_panel"
      $panel       = $(panel_id)
      
      if panel_id == current_panel_id
        $panel.show()
      else
        $panel.hide()