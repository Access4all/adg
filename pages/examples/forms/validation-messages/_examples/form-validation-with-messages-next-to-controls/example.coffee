$.urlParam = (name) ->
  results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
  if results == null
    null
  else
    decodeURI(results[1]) or null
    
validateInput = (input, message) ->
  $input = $('[name="' + input + '"]')
  
  if (value = $.urlParam(input)) == null
    $referencedElement = null
    $elementToDescribe = null
    $errorContainer    = null
    
    if $input.is(':radio')
      $fieldset = $input.closest('fieldset')
      
      $elementToDescribe = $fieldset
      $errorContainer    = $fieldset
      $referencedElement = $input.filter(':first')
    else
      $elementToDescribe = $input
      $errorContainer    = $input.parent()
      $referencedElement = $input
      
    $elementToDescribe.attr('aria-describedby', input + '_description')
    $errorContainer.append('<p id="' + input + '_description" class="error">' + message + '</p>')
    
    # See https://stackoverflow.com/questions/46134247/jquery-setting-focus-doesnt-work-in-ie11/
    $referencedElement.focus() if $(':not(body):focus').length == 0
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