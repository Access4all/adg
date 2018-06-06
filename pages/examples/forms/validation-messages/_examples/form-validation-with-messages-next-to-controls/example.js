;(function () {
  var validateInput

  $.urlParam = function (name) {
    var results
    results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href)
    if (results === null) {
      return null
    } else {
      return decodeURI(results[1]) || null
    }
  }

  validateInput = function (input, message) {
    var $elementToDescribe,
      $errorContainer,
      $fieldset,
      $input,
      $referencedElement,
      value
    $input = $('[name="' + input + '"]')
    if ((value = $.urlParam(input)) === null) {
      $referencedElement = null
      $elementToDescribe = null
      $errorContainer = null
      if ($input.is(':radio')) {
        $fieldset = $input.closest('fieldset')
        $elementToDescribe = $fieldset
        $errorContainer = $fieldset
        $referencedElement = $input.filter(':first')
      } else {
        $elementToDescribe = $input
        $errorContainer = $input.parent()
        $referencedElement = $input
      }
      $elementToDescribe.attr('aria-describedby', input + '_description')
      $errorContainer.append(
        '<p id="' + input + '_description" class="error">' + message + '</p>'
      )
      if ($(':not(body):focus').length === 0) {
        // See https://stackoverflow.com/questions/46134247/jquery-setting-focus-doesnt-work-in-ie11/
        return $referencedElement.focus()
      }
    } else {
      if ($input.is(':checkbox')) {
        $input.attr('checked', true)
      }
      if ($input.is(':radio')) {
        return $input.filter('[value="' + value + '"]').attr('checked', true)
      } else {
        return $input.val(value)
      }
    }
  }

  $(document).ready(function () {
    if ($.urlParam('validate')) {
      validateInput('name', 'Please enter your name!')
      validateInput('biography', 'Please tell us something about your history!')
      validateInput('gender', 'Please tell us your gender!')
      validateInput('accept_agbs', 'You must accept our terms and conditions!')
      if ($('.error').length === 0) {
        return alert('All inputs are valid.')
      }
    }
  })
}.call(this))
