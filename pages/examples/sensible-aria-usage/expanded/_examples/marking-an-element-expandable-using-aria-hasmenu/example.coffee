$(document).ready ->
  $button = $("button")
  $tooltip = $("#tooltip")
  
  $button.click =>
    if $tooltip.attr("hidden") == "hidden"
      $tooltip.removeAttr("hidden")
    else
      $tooltip.attr("hidden", true)
      