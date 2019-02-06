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
      $error,
      $errorContainer,
      $fieldset,
      $input,
      $referencedElement,
      value
    $input = $('[name="' + input + '"]')
    if ((value = $.urlParam(input)) === null) {
      if ($('fieldset.errors').length === 0) {
        $('body').prepend(
          '<fieldset class="errors"><legend>Errors</legend><ul></ul></fieldset>'
        )
      }
      $referencedElement = null
      $elementToDescribe = null
      $errorContainer = $('fieldset.errors ul')
      if ($input.is(':radio')) {
        $fieldset = $input.closest('fieldset')
        $elementToDescribe = $fieldset
        $referencedElement = $input.filter(':first')
      } else {
        $elementToDescribe = $input
        $referencedElement = $input
      }
      $error = $(
        '<a href="#' +
          $referencedElement.attr('id') +
          '" id="' +
          input +
          '_description" class="error">' +
          message +
          '</a>'
      )
      $error.click(e => {
        // If we rely on the link's href pointing to the input's ID, it doesn't trigger forms mode in screen readers
        $referencedElement.focus()
        return e.preventDefault()
      })
      $elementToDescribe.attr('aria-describedby', input + '_description')
      $errorContainer
        .append('<li>')
        .find('li:last')
        .append($error)
      if ($(':not(body):focus').length === 0) {
        // See https://stackoverflow.com/questions/46134247/jquery-setting-focus-doesnt-work-in-ie11/
        return $errorContainer.find('a').focus()
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
