class AdgDropdown
  constructor: (el) ->
    @$el = $(el)
    @initExpandables()
    
  initExpandables: ->
    @$el.find("[aria-expanded]").click (e) =>
      $button = $(e.target)
      $container = $($button.next("*"))
      
      if $container.is(':visible')
        @hide($button, $container)
      else
        @show($button, $container)
        
  show: ($button, $container) ->
    $container.attr('hidden', false)
    $button.attr('aria-expanded', true)
    
  hide: ($button, $container) ->
    $container.attr('hidden', true)
    $button.attr('aria-expanded', false)
    
$(document).ready ->
  $('[data-adg-dropdown]').each ->
    new AdgDropdown @