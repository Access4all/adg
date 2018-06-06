$.urlParam = (name) ->
  results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
  if results == null
    null
  else
    decodeURI(results[1]) or null
    
validateInput = (input, message) ->
  $input = $('[name="' + input + '"]')
  
  if (value = $.urlParam(input)) == null
    if $('fieldset.errors').length == 0
      $('body').prepend '<fieldset class="errors"><legend>Errors</legend><ul></ul></fieldset>'
      
    $referencedElement = null
    $elementToDescribe = null
    $errorContainer    = $('fieldset.errors ul')
    
    if $input.is(':radio')
      $fieldset = $input.closest('fieldset')
      
      $elementToDescribe = $fieldset
      $referencedElement = $input.filter(':first')
    else
      $elementToDescribe = $input
      $referencedElement = $input
      
    $error = $('<a href="#' + $referencedElement.attr('id') + '" id="' + input + '_description" class="error">' + message + '</a>')
    $error.click (e) =>
      # If we rely on the link's href pointing to the input's ID, it doesn't trigger forms mode in screen readers
      $referencedElement.focus()
      e.preventDefault()
      
    $elementToDescribe.attr('aria-describedby', input + '_description')
    $errorContainer.append('<li>').find('li:last').append($error)
    
    # See https://stackoverflow.com/questions/46134247/jquery-setting-focus-doesnt-work-in-ie11/
    $errorContainer.find('a').focus() if $(':not(body):focus').length == 0
  else
    if $input.is(':checkbox')
      $input.attr('checked', true)
    if $input.is(':radio')
      $input.filter('[value="' + value + '"]').attr('checked', true)
    else
      $input.val(value)

$(document).ready ->
  if $.urlParam('validate')
    validateInput('name', 'Please enter your name!')
    validateInput('biography', 'Please tell us something about your history!')
    validateInput('gender', 'Please tell us your gender!')
    validateInput('accept_agbs', 'You must accept our terms and conditions!')

    if $('.error').length == 0
      alert 'All inputs are valid.'