class AdgDialog
  constructor: (el) ->
    @$openButton = $(el)
    @initContainer(@$openButton.attr('data-adg-dialog'))
    @initOpenButton()
    
  initOpenButton: ->
    @$openButton.attr('aria-expanded', false)
    @$openButton.append('<span class="adg-visually-hidden"> (dialog)</span>')
    
    @$openButton.click (e) =>
      if @$container.is(':visible')
        @hide()
      else
        @show()
    
  initContainer: (id) ->
    @$container = $("##{id}")
    @$container.attr('data-adg-dialog-container', true)
    @$container.wrap("<div role='dialog'><div role='document'></div></div>")
    
    @initCloseButton()
    @initConfirmButton()
    @initContainerButtonEvents()
    
  initConfirmButton: ->
    @$confirmButton = $('<button>Confirm<span class="adg-visually-hidden"> (close)</span></button>')
    @$container.append(@$confirmButton)
      
  initCloseButton: ->
    @$closeButton = $('<button class="adg-dialog-icon"><svg class="icon" focusable="false"><use xlink:href="#tooltip" /></svg></span><span class="adg-visually-hidden">Close dialog</span></button>')
    @$container.prepend(@$closeButton)
      
  initContainerButtonEvents: ->
    @$confirmButton.click =>
      @hide()
      
    @$confirmButton.keydown (e) =>
      if !e.shiftKey && e.which == 9
        @$closeButton.focus()
        e.preventDefault()
        e.stopPropagation()
    
    @$closeButton.click =>
      @hide()
      
    @$closeButton.keydown (e) =>
      if e.shiftKey && e.which == 9
        @$confirmButton.focus()
        e.preventDefault()
        
  show: ->
    @$container.before("<div class='adg-dialog-curtain'></div>")
    
    @$container.attr('hidden', false)
    @$openButton.attr('aria-expanded', true)
    @$closeButton.focus()
    
  hide: ->
    $(".adg-dialog-curtain").remove()
    
    @$container.attr('hidden', true)
    @$openButton.attr('aria-expanded', false)
    @$openButton.focus()
    
$(document).ready ->
  $('[data-adg-dialog]').each ->
    new AdgDialog @