$(document).ready ->
  $checkbox = $("input")
  $tooltip = $("#tooltip")
  
  $checkbox.change =>
    if $tooltip.attr("hidden") == "hidden"
      $tooltip.removeAttr("hidden")
    else
      $tooltip.attr("hidden", true)