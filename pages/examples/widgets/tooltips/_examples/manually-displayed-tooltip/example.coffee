class AdgTooltipComplex
  constructor: (el) ->
    @$el = $(el)
    @value = @$el.attr('data-adg-tooltip-complex')
    @$el.attr('data-adg-tooltip-complex', null)
  
    @initContainer()
    @attachContentToEl()
    
    @initIconEvents()
    
  initContainer: ->
    @$container = $("<span class='adg-tooltip-complex'></span>")
    @$el.after(@$container)

    @initIcon()
    @initBalloon()
  
  initIcon: ->
    # Set focusable="false" for IE, see https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element
    @$icon = $("<button class='adg-tooltip-complex-icon' aria-expanded='false'><span class='adg-visually-hidden'>Toggle tooltip</span><svg class='icon' focusable='false'><use xlink:href='#tooltip' /></svg></button>")
    @$container.append(@$icon)
    
  initBalloon: ->
    @$balloon = $("<div class='adg-tooltip-complex-balloon' hidden>#{@value}</div>")
    @$balloon.attr('id', "#{@$el.attr('id')}-balloon")
    @$container.append(@$balloon)
    
  attachContentToEl: ->
    valueElement = $("<span class='adg-visually-hidden'> (for more details, consult adjacent tooltip)</span>")
    if @$el.is('input, textarea, select')
      $("label[for='#{@$el.attr('id')}'").append(valueElement)
    else
      @$el.append(valueElement)
    
  initIconEvents: ->
    @$icon.click =>
      if @$balloon.is(':visible')
        @hide()
      else
        @show()
        
  show: ->
    @$balloon.attr('hidden', false)
    @$icon.attr('aria-expanded', true)
    
  hide: ->
    @$balloon.attr('hidden', true)
    @$icon.attr('aria-expanded', false)
    
$(document).ready ->
  $('[data-adg-tooltip-complex]').each ->
    new AdgTooltipComplex @