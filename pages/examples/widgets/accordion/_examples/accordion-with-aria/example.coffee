class AdgAccordion
  constructor: (el) ->
    @$el = $(el)
  
    @initHeadings()
    @initTogglers()
  
  initHeadings: ->
    @$headings = @$el.find('[data-adg-accordion-target]')
    
  initTogglers: ->
    @$headings.each ->
      $heading = $(@)
      
      $toggler = $heading.wrap("<a href='#' aria-expanded='false'></a>").parent()
      
      targetId = $heading.attr('data-adg-accordion-target')
      $container = $('#' + targetId)
      $container.hide()
      
      $toggler.click (e) =>
        $container.toggle()
        $toggler.attr('aria-expanded', if $toggler.attr('aria-expanded') == 'false' then 'true' else 'false')
        e.preventDefault()
    
$(document).ready ->
  $('[data-adg-accordion]').each ->
    new AdgAccordion @