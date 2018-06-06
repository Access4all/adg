$(document).ready ->
  $("input[type='checkbox']").each (i, element) =>
    $checkbox = $(element)
    
    # Make Enter select/deselect checkbox (instead of submitting form)
    $checkbox.keypress (e) ->
      if (if e.keyCode then e.keyCode else e.which) == 13
        $(@).trigger 'click'

    $checkbox.change ->
      panel_id = "##{$checkbox.attr('id')}_panel"
      $panel   = $(panel_id)
      
      if $checkbox.is(':checked')
        $panel.show()
      else
        $panel.hide()