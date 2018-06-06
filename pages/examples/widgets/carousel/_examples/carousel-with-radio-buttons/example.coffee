$(document).ready ->
  $('button[data-carousel-direction]').click ->
    $button = $(@)
    carousel_id = $button.attr('data-carousel-id')
    direction = $button.attr('data-carousel-direction')
    $all_panels = $("input[name='#{carousel_id}']")
    
    max_index = $all_panels.length - 1
    current_index = $all_panels.index($($all_panels.parent()).find(':checked'))
    
    upcoming_index = if direction == 'previous'
                       if current_index == 0
                         max_index
                       else
                         current_index - 1
                     else
                       if current_index == max_index
                         0
                       else
                         current_index + 1
                   
    $upcoming_panel = $($all_panels[upcoming_index])
    
    $upcoming_panel.prop('checked', true).trigger('change')
    $('#alerts').append("<div role='alert'>Showing panel #{upcoming_index + 1} of #{max_index + 1}</div>")
    
    setTimeout (->
      $('#alerts').empty()
    ), 2000
  
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
        
  interval = setInterval((->
    if $('button[data-carousel-autoplay]').attr('aria-pressed') == "true"
      # Bug: this leads currently to an alert when pausing and then re-enabling auto play.
      $("button[data-carousel-direction='next']").click()
  ), 2000)

  $('button[data-carousel-autoplay]').click ->
    $button = $(@)
    console.log $button.attr('aria-pressed')
    status = if $button.attr('aria-pressed') == "true"
               "false"
             else
               "true"
    $button.attr('aria-pressed', status)