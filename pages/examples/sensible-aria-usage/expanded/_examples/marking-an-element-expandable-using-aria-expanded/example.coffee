$(document).ready ->
  $button = $("button")
  $tooltip = $("#tooltip")
  
  $button.click =>
    if $tooltip.attr("hidden") == "hidden"
      $tooltip.removeAttr("hidden")
      $button.attr("aria-expanded", true)
    else
      $tooltip.attr("hidden", true)
      $button.attr("aria-expanded", false)
      