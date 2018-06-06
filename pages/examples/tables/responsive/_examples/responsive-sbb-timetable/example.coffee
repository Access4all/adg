$(document).ready ->
  $('button.expand').click ->
    $button = $(@)
    $button.attr('aria-expanded', $button.attr('aria-expanded') == "false" ? true : false)
    
    details_id = $button.attr('data-target')
    $details = $("##{details_id}")
    $details.toggle()