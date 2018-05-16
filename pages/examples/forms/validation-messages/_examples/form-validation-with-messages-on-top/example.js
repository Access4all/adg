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

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLENBQUMsQ0FBQyxRQUFGLEdBQWEsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUNYLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBSSxNQUFKLENBQVcsTUFBQSxHQUFTLElBQVQsR0FBZ0IsV0FBM0IsQ0FBdUMsQ0FBQyxJQUF4QyxDQUE2QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQTdEO0lBQ1YsSUFBRyxPQUFBLEtBQVcsSUFBZDthQUNFLEtBREY7S0FBQSxNQUFBO2FBR0UsU0FBQSxDQUFVLE9BQVEsQ0FBQSxDQUFBLENBQWxCLENBQUEsSUFBeUIsS0FIM0I7O0VBRlc7O0VBT2IsYUFBQSxHQUFnQixRQUFBLENBQUMsS0FBRCxFQUFRLE9BQVIsQ0FBQTtBQUNkLFFBQUEsa0JBQUEsRUFBQSxNQUFBLEVBQUEsZUFBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLEVBQUEsa0JBQUEsRUFBQTtJQUFBLE1BQUEsR0FBUyxDQUFBLENBQUUsU0FBQSxHQUFZLEtBQVosR0FBb0IsSUFBdEI7SUFFVCxJQUFHLENBQUMsS0FBQSxHQUFRLENBQUMsQ0FBQyxRQUFGLENBQVcsS0FBWCxDQUFULENBQUEsS0FBK0IsSUFBbEM7TUFDRSxJQUFHLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLE1BQXJCLEtBQStCLENBQWxDO1FBQ0UsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE9BQVYsQ0FBa0Isc0VBQWxCLEVBREY7O01BR0Esa0JBQUEsR0FBcUI7TUFDckIsa0JBQUEsR0FBcUI7TUFDckIsZUFBQSxHQUFxQixDQUFBLENBQUUsb0JBQUY7TUFFckIsSUFBRyxNQUFNLENBQUMsRUFBUCxDQUFVLFFBQVYsQ0FBSDtRQUNFLFNBQUEsR0FBWSxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWY7UUFFWixrQkFBQSxHQUFxQjtRQUNyQixrQkFBQSxHQUFxQixNQUFNLENBQUMsTUFBUCxDQUFjLFFBQWQsRUFKdkI7T0FBQSxNQUFBO1FBTUUsa0JBQUEsR0FBcUI7UUFDckIsa0JBQUEsR0FBcUIsT0FQdkI7O01BU0EsTUFBQSxHQUFTLENBQUEsQ0FBRSxZQUFBLEdBQWUsa0JBQWtCLENBQUMsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBZixHQUErQyxRQUEvQyxHQUEwRCxLQUExRCxHQUFrRSw4QkFBbEUsR0FBbUcsT0FBbkcsR0FBNkcsTUFBL0c7TUFDVCxNQUFNLENBQUMsS0FBUCxDQUFhLENBQUMsQ0FBRCxDQUFBLEdBQUEsRUFBQTs7UUFFWCxrQkFBa0IsQ0FBQyxLQUFuQixDQUFBO2VBQ0EsQ0FBQyxDQUFDLGNBQUYsQ0FBQTtNQUhXLENBQWI7TUFLQSxrQkFBa0IsQ0FBQyxJQUFuQixDQUF3QixrQkFBeEIsRUFBNEMsS0FBQSxHQUFRLGNBQXBEO01BQ0EsZUFBZSxDQUFDLE1BQWhCLENBQXVCLE1BQXZCLENBQThCLENBQUMsSUFBL0IsQ0FBb0MsU0FBcEMsQ0FBOEMsQ0FBQyxNQUEvQyxDQUFzRCxNQUF0RDtNQUdBLElBQXFDLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLE1BQXRCLEtBQWdDLENBQXJFOzs7ZUFBQSxlQUFlLENBQUMsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBeUIsQ0FBQyxLQUExQixDQUFBLEVBQUE7T0EzQkY7S0FBQSxNQUFBO01BNkJFLElBQUcsTUFBTSxDQUFDLEVBQVAsQ0FBVSxXQUFWLENBQUg7UUFDRSxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosRUFBdUIsSUFBdkIsRUFERjs7TUFFQSxJQUFHLE1BQU0sQ0FBQyxFQUFQLENBQVUsUUFBVixDQUFIO2VBQ0UsTUFBTSxDQUFDLE1BQVAsQ0FBYyxVQUFBLEdBQWEsS0FBYixHQUFxQixJQUFuQyxDQUF3QyxDQUFDLElBQXpDLENBQThDLFNBQTlDLEVBQXlELElBQXpELEVBREY7T0FBQSxNQUFBO2VBR0UsTUFBTSxDQUFDLEdBQVAsQ0FBVyxLQUFYLEVBSEY7T0EvQkY7O0VBSGM7O0VBdUNoQixDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtJQUNoQixJQUFHLENBQUMsQ0FBQyxRQUFGLENBQVcsVUFBWCxDQUFIO01BQ0UsYUFBQSxDQUFjLE1BQWQsRUFBc0IseUJBQXRCO01BQ0EsYUFBQSxDQUFjLFdBQWQsRUFBMkIsOENBQTNCO01BQ0EsYUFBQSxDQUFjLFFBQWQsRUFBd0IsNkJBQXhCO01BQ0EsYUFBQSxDQUFjLGFBQWQsRUFBNkIsMkNBQTdCO01BRUEsSUFBRyxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsTUFBWixLQUFzQixDQUF6QjtlQUNFLEtBQUEsQ0FBTSx1QkFBTixFQURGO09BTkY7O0VBRGdCLENBQWxCO0FBOUNBIiwic291cmNlc0NvbnRlbnQiOlsiJC51cmxQYXJhbSA9IChuYW1lKSAtPlxuICByZXN1bHRzID0gbmV3IFJlZ0V4cCgnWz8mXScgKyBuYW1lICsgJz0oW14mI10qKScpLmV4ZWMod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIGlmIHJlc3VsdHMgPT0gbnVsbFxuICAgIG51bGxcbiAgZWxzZVxuICAgIGRlY29kZVVSSShyZXN1bHRzWzFdKSBvciBudWxsXG4gICAgXG52YWxpZGF0ZUlucHV0ID0gKGlucHV0LCBtZXNzYWdlKSAtPlxuICAkaW5wdXQgPSAkKCdbbmFtZT1cIicgKyBpbnB1dCArICdcIl0nKVxuICBcbiAgaWYgKHZhbHVlID0gJC51cmxQYXJhbShpbnB1dCkpID09IG51bGxcbiAgICBpZiAkKCdmaWVsZHNldC5lcnJvcnMnKS5sZW5ndGggPT0gMFxuICAgICAgJCgnYm9keScpLnByZXBlbmQgJzxmaWVsZHNldCBjbGFzcz1cImVycm9yc1wiPjxsZWdlbmQ+RXJyb3JzPC9sZWdlbmQ+PHVsPjwvdWw+PC9maWVsZHNldD4nXG4gICAgICBcbiAgICAkcmVmZXJlbmNlZEVsZW1lbnQgPSBudWxsXG4gICAgJGVsZW1lbnRUb0Rlc2NyaWJlID0gbnVsbFxuICAgICRlcnJvckNvbnRhaW5lciAgICA9ICQoJ2ZpZWxkc2V0LmVycm9ycyB1bCcpXG4gICAgXG4gICAgaWYgJGlucHV0LmlzKCc6cmFkaW8nKVxuICAgICAgJGZpZWxkc2V0ID0gJGlucHV0LmNsb3Nlc3QoJ2ZpZWxkc2V0JylcbiAgICAgIFxuICAgICAgJGVsZW1lbnRUb0Rlc2NyaWJlID0gJGZpZWxkc2V0XG4gICAgICAkcmVmZXJlbmNlZEVsZW1lbnQgPSAkaW5wdXQuZmlsdGVyKCc6Zmlyc3QnKVxuICAgIGVsc2VcbiAgICAgICRlbGVtZW50VG9EZXNjcmliZSA9ICRpbnB1dFxuICAgICAgJHJlZmVyZW5jZWRFbGVtZW50ID0gJGlucHV0XG4gICAgICBcbiAgICAkZXJyb3IgPSAkKCc8YSBocmVmPVwiIycgKyAkcmVmZXJlbmNlZEVsZW1lbnQuYXR0cignaWQnKSArICdcIiBpZD1cIicgKyBpbnB1dCArICdfZGVzY3JpcHRpb25cIiBjbGFzcz1cImVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9hPicpXG4gICAgJGVycm9yLmNsaWNrIChlKSA9PlxuICAgICAgIyBJZiB3ZSByZWx5IG9uIHRoZSBsaW5rJ3MgaHJlZiBwb2ludGluZyB0byB0aGUgaW5wdXQncyBJRCwgaXQgZG9lc24ndCB0cmlnZ2VyIGZvcm1zIG1vZGUgaW4gc2NyZWVuIHJlYWRlcnNcbiAgICAgICRyZWZlcmVuY2VkRWxlbWVudC5mb2N1cygpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIFxuICAgICRlbGVtZW50VG9EZXNjcmliZS5hdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JywgaW5wdXQgKyAnX2Rlc2NyaXB0aW9uJylcbiAgICAkZXJyb3JDb250YWluZXIuYXBwZW5kKCc8bGk+JykuZmluZCgnbGk6bGFzdCcpLmFwcGVuZCgkZXJyb3IpXG4gICAgXG4gICAgIyBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDYxMzQyNDcvanF1ZXJ5LXNldHRpbmctZm9jdXMtZG9lc250LXdvcmstaW4taWUxMS9cbiAgICAkZXJyb3JDb250YWluZXIuZmluZCgnYScpLmZvY3VzKCkgaWYgJCgnOm5vdChib2R5KTpmb2N1cycpLmxlbmd0aCA9PSAwXG4gIGVsc2VcbiAgICBpZiAkaW5wdXQuaXMoJzpjaGVja2JveCcpXG4gICAgICAkaW5wdXQuYXR0cignY2hlY2tlZCcsIHRydWUpXG4gICAgaWYgJGlucHV0LmlzKCc6cmFkaW8nKVxuICAgICAgJGlucHV0LmZpbHRlcignW3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKVxuICAgIGVsc2VcbiAgICAgICRpbnB1dC52YWwodmFsdWUpXG5cbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG4gIGlmICQudXJsUGFyYW0oJ3ZhbGlkYXRlJylcbiAgICB2YWxpZGF0ZUlucHV0KCduYW1lJywgJ1BsZWFzZSBlbnRlciB5b3VyIG5hbWUhJylcbiAgICB2YWxpZGF0ZUlucHV0KCdiaW9ncmFwaHknLCAnUGxlYXNlIHRlbGwgdXMgc29tZXRoaW5nIGFib3V0IHlvdXIgaGlzdG9yeSEnKVxuICAgIHZhbGlkYXRlSW5wdXQoJ2dlbmRlcicsICdQbGVhc2UgdGVsbCB1cyB5b3VyIGdlbmRlciEnKVxuICAgIHZhbGlkYXRlSW5wdXQoJ2FjY2VwdF9hZ2JzJywgJ1lvdSBtdXN0IGFjY2VwdCBvdXIgdGVybXMgYW5kIGNvbmRpdGlvbnMhJylcblxuICAgIGlmICQoJy5lcnJvcicpLmxlbmd0aCA9PSAwXG4gICAgICBhbGVydCAnQWxsIGlucHV0cyBhcmUgdmFsaWQuJyJdfQ==
// # sourceURL=coffeescript
