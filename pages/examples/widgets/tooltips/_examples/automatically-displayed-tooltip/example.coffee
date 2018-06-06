class AdgTooltipSimple
  constructor: (el) ->
    @$el = $(el)
    @value = @$el.attr('data-adg-tooltip-simple')
    @$el.attr('data-adg-tooltip-simple', null)
  
    @initContainer()
    @attachContentToEl()
    
    @initElEvents()
    @initContainerEvents()
    
  initContainer: ->
    @$container = $("<span class='adg-tooltip-simple' aria-hidden='true'></span>")
    @$el.after(@$container)

    @initIcon()
    @initBalloon()
  
  initIcon: ->
    # Set focusable="false" for IE, see https://stackoverflow.com/questions/18646111/disable-onfocus-event-for-svg-element
    @$icon = $("<span class='adg-tooltip-simple-icon'><svg class='icon' focusable='false'><use xlink:href='#tooltip' /></svg></span>")
    @$container.append(@$icon)
    
  initBalloon: ->
    @$balloon = $("<span class='adg-tooltip-simple-balloon' hidden>#{@value}</span>")
    @$balloon.attr('id', "#{@$el.attr('id')}-balloon")
    @$container.append(@$balloon)
    
  attachContentToEl: ->
    valueElement = $("<span class='adg-visually-hidden'> (#{@value})</span>")
    if @$el.is('input, textarea, select')
      $("label[for='#{@$el.attr('id')}'").append(valueElement)
    else
      @$el.append(valueElement)
  
  initElEvents: ->
    @$el.focusin => @show()
    @$el.focusout =>
      @hide() unless @$container.is(':hover')
    
    @$el.mouseenter => @show()
    @$el.mouseleave =>
      @hide() unless @$el.is(':focus')
        
    @$el.keyup (e) =>
      if e.keyCode == 27 # Esc
        if @$balloon.is(':visible')
          @hide()
        else
          @show()
    
  initContainerEvents: ->
    @$container.mouseenter => @show()
    @$container.mouseleave =>
      @hide() unless @$el.is(':focus')
    
  show: ->
    @$balloon.attr('hidden', false)
    
  hide: ->
    @$balloon.attr('hidden', true)
    
$(document).ready ->
  $('[data-adg-tooltip-simple]').each ->
    new AdgTooltipSimple @