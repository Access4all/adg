class AdgDatepicker
  config =
    date:       new Date()
    dayNames:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  constructor: (el, options = {}) ->
    @$el = $(el)
    @config = config
    
    @currentDate = @config["date"]

    @initInput()
    @initOptions()

    @applyCheckedOptionToInput()

  # Executes the given selector on @$el and returns the element. Makes sure exactly one element exists.
  findOne: (selector) ->
    result = @$el.find(selector)
    switch result.length
      when 0 then @throwMessageAndPrintObjectsToConsole "No object found for #{selector}!", result: result
      when 1 then $(result.first())
      else @throwMessageAndPrintObjectsToConsole "More than one object found for #{selector}!", result: result
        
  name: ->
    "adg-datepicker"
        
  addAdgDataAttribute: ($target, name, value = '') ->
    $target.attr(@adgDataAttributeName(name), value)
        
  removeAdgDataAttribute: ($target, name) ->
    $target.removeAttr(@adgDataAttributeName(name))
    
  adgDataAttributeName: (name = null) ->
    result = "data-#{@name()}"
    result += "-#{name}" if name
    result
    
  labelOfInput: ($inputs) ->
    $inputs.map (i, input) =>
      $input = $(input)
      
      id = $input.attr('id')
      $label = @findOne("label[for='#{id}']")[0]

      if $label.length == 0
        $label = $input.closest('label')
        @throwMessageAndPrintObjectsToConsole "No corresponding input found for input!", input: $input if $label.length == 0

      $label

  show: ($el) ->
    $el.removeAttr('hidden')
    $el.show()

    # TODO Would be cool to renounce CSS and solely use the hidden attribute. But jQuery's :visible doesn't seem to work with it!?
    # @throwMessageAndPrintObjectsToConsole("Element is still hidden, although hidden attribute was removed! Make sure there's no CSS like display:none or visibility:hidden left on it!", element: $el) if $el.is(':hidden')

  hide: ($el) ->
    $el.attr('hidden', '')
    $el.hide()
    
  throwMessageAndPrintObjectsToConsole: (message, elements = {}) ->
    console.log elements
    throw message
    
  text: (text, options = {}) ->
    text = @config["#{text}Text"]
    
    for key, value of options
      text = text.replace "[#{key}]", value
      
    text

  initInput: ->
    @$input = @findOne('input[type="text"]')
    @$input.attr('autocomplete', 'off')
    @$input.attr('aria-expanded', 'false')
    @attachInputEvents()

  initOptions: ->
    @$optionsContainer = @findOne('fieldset')
    @addAdgDataAttribute(@$optionsContainer, 'options')

    @$optionsContainerLabel = @findOne('legend')
    @$optionsContainerLabel.addClass('adg-visually-hidden')
    
    @initDate()
    @setSelection(@currentDate.getDate() - 1, false)
    
  getFirstMonthDay: (date) ->
    y = date.getFullYear()
    m = date.getMonth()
    new Date(y, m, 1)
    
  getLastMonthDay: (date) ->
    y = date.getFullYear()
    m = date.getMonth()
    new Date(y, m + 1, 0)
    
  initDate: () ->
    @$optionsContainer.find("table").remove()
    $dateTable = $("<table border='1'><caption>#{@config["monthNames"][@currentDate.getMonth()]} #{@currentDate.getFullYear()}</caption><thead></thead></table>")
    for weekday in @config["dayNames"]
      $dateTable.find("thead").append("<th>#{weekday}</th>")
      
    @$optionsContainer.append($dateTable)
    
    firstDay = @getFirstMonthDay(@currentDate)
    lastDay = @getLastMonthDay(@currentDate)
    
    daysOfMonth = []
    day = firstDay
    while day <= lastDay
      daysOfMonth.push new Date(day)
      day.setDate day.getDate() + 1
      
    # Add empty days at beginning
    i = 1
    firstDay = daysOfMonth[0].getDay()
    while i < firstDay
      daysOfMonth.unshift null
      i++
      
    # Add empty days at end
    i = daysOfMonth[daysOfMonth.length - 1].getDay()
    while i > 0 && i < 6
      daysOfMonth.push null
      i++
      
    $tr = null
    for day, i in daysOfMonth
      if i % 7 == 0
        $tr = $("<tr></tr>")
        $dateTable.append($tr)
        
      value = if day
                id = "favorite_hobby_#{i}"

                "<input type='radio' name='hobby' id='#{id}' /><label for='#{id}'><span class='adg-visually-hidden'>#{@getDayName(day.getDay())}, </span>#{day.getDate()}<span class='adg-visually-hidden'> of #{@config['monthNames'][day.getMonth()]} #{day.getFullYear()}</span></label>"
              else
                ""
      $tr.append("<td class='control'>#{value}</td>")
      
    @$options = @$optionsContainer.find('input[type="radio"]')
    @attachOptionsEvents()

    @addAdgDataAttribute(@labelOfInput(@$options), 'option')
    @$options.addClass('adg-visually-hidden')
    
  getDayName: (day) ->
    day = 6 if day == 0
    @config['dayNames'][day - 1]

  attachInputEvents: ->
    @attachClickEventToInput()

    @attachEscapeKeyToInput()
    @attachEnterKeyToInput()
    @attachTabKeyToInput()
    @attachUpDownKeysToInput()

  attachOptionsEvents: ->
    @attachArrowKeysToOptions()
    @attachChangeEventToOptions()
    @attachClickEventToOptionLabels()
    @attachEnterEventToOptions()
    @attachTabEventToOptions()

  attachClickEventToInput: ->
    @$input.click =>
      if @$optionsContainer.is(':visible')
        @hideOptions()
      else
        @showOptions()

  attachEscapeKeyToInput: ->
    @$input.keydown (e) =>
      if e.which == 27
        if @$optionsContainer.is(':visible')
          @applyCheckedOptionToInputAndResetOptions()
          e.preventDefault()
        else if @$options.is(':checked')
          @$options.prop('checked', false)
          @applyCheckedOptionToInputAndResetOptions()
          e.preventDefault()
        else # Needed for automatic testing only
          $('body').append('<p>Esc passed on.</p>')

  attachEnterKeyToInput: ->
    @$input.keydown (e) =>
      if e.which == 13
        if @$optionsContainer.is(':visible')
          @applyCheckedOptionToInputAndResetOptions()
          e.preventDefault()
        else # Needed for automatic testing only
          $('body').append('<p>Enter passed on.</p>')

  attachTabKeyToInput: ->
    @$input.keydown (e) =>
      if e.which == 9
        if @$optionsContainer.is(':visible')
          @applyCheckedOptionToInputAndResetOptions()

  attachUpDownKeysToInput: ->
    @$input.keydown (e) =>
      if e.which == 38 || e.which == 40
        @showOptions()
        e.preventDefault() # TODO: Test!

  showOptions: ->
    @show(@$optionsContainer)
    @$input.attr('aria-expanded', 'true')
    
    if @$options.filter(':checked').length == 0
      @currentDate = @config["date"]
      @initDate()
      @setSelection(@currentDate.getDate() - 1)

    @$options.filter(':checked').focus()

  hideOptions: ->
    @hide(@$optionsContainer)
    @$input.attr('aria-expanded', 'false')
    @$input.focus()

  moveSelection: (direction) ->
    maxIndex = @$options.length - 1
    currentIndex = @$options.index(@$options.parent().find(':checked')) # TODO: is parent() good here?!
    
    upcomingIndex = if direction == 'left'
                      if currentIndex <= 0
                        @currentDate = @previousMonth(@currentDate)
                        @initDate()
                        -1
                      else
                        currentIndex - 1
                    else if direction == 'up'
                      if currentIndex - 7 < 0
                        @currentDate = @previousMonth(@currentDate)
                        @initDate()
                        -1 # TODO: Calculate index for the current week day
                      else
                        currentIndex - 7
                    else if direction == 'right'
                      if currentIndex == maxIndex
                        @currentDate = @nextMonth(@currentDate)
                        @initDate()
                        0
                      else
                        currentIndex + 1
                    else if direction == 'down'
                      if currentIndex + 7 > maxIndex
                        @currentDate = @nextMonth(@currentDate)
                        @initDate()
                        0 # TODO: Calculate index for the current week day
                      else
                        currentIndex + 7

    @setSelection(upcomingIndex)
                        
  setSelection: (current, change = true) ->
    if current == -1
      current = @$options.length - 1
      
    $currentOption = $(@$options[current])
    $currentOption.prop('checked', true)
  
    if change
      $currentOption.trigger('change')
      $currentOption.focus()
    
  previousMonth: (now) ->
    if now.getMonth() == 0
      new Date(now.getFullYear() - 1, 11, 1)
    else
      new Date(now.getFullYear(), now.getMonth() - 1, 1)
    
  nextMonth: (now) ->
    if now.getMonth() == 11
      new Date(now.getFullYear() + 1, 11, 1)
    else
      new Date(now.getFullYear(), now.getMonth() + 1, 1)

  attachArrowKeysToOptions: ->
    @$options.keydown (e) =>
      if e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40
        if e.which == 37
          @moveSelection('left')
        else if e.which == 38
          @moveSelection('up')
        else if e.which == 39
          @moveSelection('right')
        else if e.which == 40
          @moveSelection('down')
          
        e.preventDefault() # TODO: Test!
  
  attachChangeEventToOptions: ->
    @$options.change (e) =>
      @applyCheckedOptionToInput()

  applyCheckedOptionToInputAndResetOptions: ->
    @applyCheckedOptionToInput()
    @hideOptions()

  applyCheckedOptionToInput: ->
    $previouslyCheckedOptionLabel = $("[#{@adgDataAttributeName('option-selected')}]")
    if $previouslyCheckedOptionLabel.length == 1
      @removeAdgDataAttribute($previouslyCheckedOptionLabel, 'option-selected')

    $checkedOption = @$options.filter(':checked')
    if $checkedOption.length == 1
      $checkedOptionLabel = @labelOfInput($checkedOption)
      @$input.val($.trim($checkedOptionLabel.text()))
      @addAdgDataAttribute($checkedOptionLabel, 'option-selected')
    else
      @$input.val('')

  attachClickEventToOptionLabels: ->
    @labelOfInput(@$options).click (e) =>
      @hideOptions()

  attachEnterEventToOptions: ->
    @$options.keydown (e) =>
      if e.which == 13
        @hideOptions()
        e.preventDefault()
        e.stopPropagation()

  attachTabEventToOptions: ->
    @$options.keydown (e) =>
      if e.which == 9
        @hideOptions()
    
$(document).ready ->
  $('[data-adg-datepicker]').each ->
    new AdgDatepicker @