(function() {
  var validateInput;

  $.urlParam = function(name) {
    var results;
    results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
      return null;
    } else {
      return decodeURI(results[1]) || null;
    }
  };

  validateInput = function(input, message) {
    var $elementToDescribe, $errorContainer, $fieldset, $input, $referencedElement, value;
    $input = $('[name="' + input + '"]');
    if ((value = $.urlParam(input)) === null) {
      $referencedElement = null;
      $elementToDescribe = null;
      $errorContainer = null;
      if ($input.is(':radio')) {
        $fieldset = $input.closest('fieldset');
        $elementToDescribe = $fieldset;
        $errorContainer = $fieldset;
        $referencedElement = $input.filter(':first');
      } else {
        $elementToDescribe = $input;
        $errorContainer = $input.parent();
        $referencedElement = $input;
      }
      $elementToDescribe.attr('aria-describedby', input + '_description');
      $errorContainer.append('<p id="' + input + '_description" class="error">' + message + '</p>');
      if ($(':not(body):focus').length === 0) {
        
        // See https://stackoverflow.com/questions/46134247/jquery-setting-focus-doesnt-work-in-ie11/
        return $referencedElement.focus();
      }
    } else {
      if ($input.is(':checkbox')) {
        $input.attr('checked', true);
      }
      if ($input.is(':radio')) {
        return $input.filter('[value="' + value + '"]').attr('checked', true);
      } else {
        return $input.val(value);
      }
    }
  };

  $(document).ready(function() {
    if ($.urlParam('validate')) {
      validateInput('name', 'Please enter your name!');
      validateInput('biography', 'Please tell us something about your history!');
      validateInput('gender', 'Please tell us your gender!');
      validateInput('accept_agbs', 'You must accept our terms and conditions!');
      if ($('.error').length === 0) {
        return alert('All inputs are valid.');
      }
    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLENBQUMsQ0FBQyxRQUFGLEdBQWEsUUFBQSxDQUFDLElBQUQsQ0FBQTtBQUNYLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBSSxNQUFKLENBQVcsTUFBQSxHQUFTLElBQVQsR0FBZ0IsV0FBM0IsQ0FBdUMsQ0FBQyxJQUF4QyxDQUE2QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQTdEO0lBQ1YsSUFBRyxPQUFBLEtBQVcsSUFBZDthQUNFLEtBREY7S0FBQSxNQUFBO2FBR0UsU0FBQSxDQUFVLE9BQVEsQ0FBQSxDQUFBLENBQWxCLENBQUEsSUFBeUIsS0FIM0I7O0VBRlc7O0VBT2IsYUFBQSxHQUFnQixRQUFBLENBQUMsS0FBRCxFQUFRLE9BQVIsQ0FBQTtBQUNkLFFBQUEsa0JBQUEsRUFBQSxlQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxrQkFBQSxFQUFBO0lBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxTQUFBLEdBQVksS0FBWixHQUFvQixJQUF0QjtJQUVULElBQUcsQ0FBQyxLQUFBLEdBQVEsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxLQUFYLENBQVQsQ0FBQSxLQUErQixJQUFsQztNQUNFLGtCQUFBLEdBQXFCO01BQ3JCLGtCQUFBLEdBQXFCO01BQ3JCLGVBQUEsR0FBcUI7TUFFckIsSUFBRyxNQUFNLENBQUMsRUFBUCxDQUFVLFFBQVYsQ0FBSDtRQUNFLFNBQUEsR0FBWSxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWY7UUFFWixrQkFBQSxHQUFxQjtRQUNyQixlQUFBLEdBQXFCO1FBQ3JCLGtCQUFBLEdBQXFCLE1BQU0sQ0FBQyxNQUFQLENBQWMsUUFBZCxFQUx2QjtPQUFBLE1BQUE7UUFPRSxrQkFBQSxHQUFxQjtRQUNyQixlQUFBLEdBQXFCLE1BQU0sQ0FBQyxNQUFQLENBQUE7UUFDckIsa0JBQUEsR0FBcUIsT0FUdkI7O01BV0Esa0JBQWtCLENBQUMsSUFBbkIsQ0FBd0Isa0JBQXhCLEVBQTRDLEtBQUEsR0FBUSxjQUFwRDtNQUNBLGVBQWUsQ0FBQyxNQUFoQixDQUF1QixTQUFBLEdBQVksS0FBWixHQUFvQiw4QkFBcEIsR0FBcUQsT0FBckQsR0FBK0QsTUFBdEY7TUFHQSxJQUE4QixDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxNQUF0QixLQUFnQyxDQUE5RDs7O2VBQUEsa0JBQWtCLENBQUMsS0FBbkIsQ0FBQSxFQUFBO09BcEJGO0tBQUEsTUFBQTtNQXNCRSxJQUFHLE1BQU0sQ0FBQyxFQUFQLENBQVUsV0FBVixDQUFIO1FBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFaLEVBQXVCLElBQXZCLEVBREY7O01BRUEsSUFBRyxNQUFNLENBQUMsRUFBUCxDQUFVLFFBQVYsQ0FBSDtlQUNFLE1BQU0sQ0FBQyxNQUFQLENBQWMsVUFBQSxHQUFhLEtBQWIsR0FBcUIsSUFBbkMsQ0FBd0MsQ0FBQyxJQUF6QyxDQUE4QyxTQUE5QyxFQUF5RCxJQUF6RCxFQURGO09BQUEsTUFBQTtlQUdFLE1BQU0sQ0FBQyxHQUFQLENBQVcsS0FBWCxFQUhGO09BeEJGOztFQUhjOztFQWdDaEIsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUE7SUFDaEIsSUFBRyxDQUFDLENBQUMsUUFBRixDQUFXLFVBQVgsQ0FBSDtNQUNFLGFBQUEsQ0FBYyxNQUFkLEVBQXNCLHlCQUF0QjtNQUNBLGFBQUEsQ0FBYyxXQUFkLEVBQTJCLDhDQUEzQjtNQUNBLGFBQUEsQ0FBYyxRQUFkLEVBQXdCLDZCQUF4QjtNQUNBLGFBQUEsQ0FBYyxhQUFkLEVBQTZCLDJDQUE3QjtNQUVBLElBQUcsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLE1BQVosS0FBc0IsQ0FBekI7ZUFDRSxLQUFBLENBQU0sdUJBQU4sRUFERjtPQU5GOztFQURnQixDQUFsQjtBQXZDQSIsInNvdXJjZXNDb250ZW50IjpbIiQudXJsUGFyYW0gPSAobmFtZSkgLT5cbiAgcmVzdWx0cyA9IG5ldyBSZWdFeHAoJ1s/Jl0nICsgbmFtZSArICc9KFteJiNdKiknKS5leGVjKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICBpZiByZXN1bHRzID09IG51bGxcbiAgICBudWxsXG4gIGVsc2VcbiAgICBkZWNvZGVVUkkocmVzdWx0c1sxXSkgb3IgbnVsbFxuICAgIFxudmFsaWRhdGVJbnB1dCA9IChpbnB1dCwgbWVzc2FnZSkgLT5cbiAgJGlucHV0ID0gJCgnW25hbWU9XCInICsgaW5wdXQgKyAnXCJdJylcbiAgXG4gIGlmICh2YWx1ZSA9ICQudXJsUGFyYW0oaW5wdXQpKSA9PSBudWxsXG4gICAgJHJlZmVyZW5jZWRFbGVtZW50ID0gbnVsbFxuICAgICRlbGVtZW50VG9EZXNjcmliZSA9IG51bGxcbiAgICAkZXJyb3JDb250YWluZXIgICAgPSBudWxsXG4gICAgXG4gICAgaWYgJGlucHV0LmlzKCc6cmFkaW8nKVxuICAgICAgJGZpZWxkc2V0ID0gJGlucHV0LmNsb3Nlc3QoJ2ZpZWxkc2V0JylcbiAgICAgIFxuICAgICAgJGVsZW1lbnRUb0Rlc2NyaWJlID0gJGZpZWxkc2V0XG4gICAgICAkZXJyb3JDb250YWluZXIgICAgPSAkZmllbGRzZXRcbiAgICAgICRyZWZlcmVuY2VkRWxlbWVudCA9ICRpbnB1dC5maWx0ZXIoJzpmaXJzdCcpXG4gICAgZWxzZVxuICAgICAgJGVsZW1lbnRUb0Rlc2NyaWJlID0gJGlucHV0XG4gICAgICAkZXJyb3JDb250YWluZXIgICAgPSAkaW5wdXQucGFyZW50KClcbiAgICAgICRyZWZlcmVuY2VkRWxlbWVudCA9ICRpbnB1dFxuICAgICAgXG4gICAgJGVsZW1lbnRUb0Rlc2NyaWJlLmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBpbnB1dCArICdfZGVzY3JpcHRpb24nKVxuICAgICRlcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGlkPVwiJyArIGlucHV0ICsgJ19kZXNjcmlwdGlvblwiIGNsYXNzPVwiZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+JylcbiAgICBcbiAgICAjIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NjEzNDI0Ny9qcXVlcnktc2V0dGluZy1mb2N1cy1kb2VzbnQtd29yay1pbi1pZTExL1xuICAgICRyZWZlcmVuY2VkRWxlbWVudC5mb2N1cygpIGlmICQoJzpub3QoYm9keSk6Zm9jdXMnKS5sZW5ndGggPT0gMFxuICBlbHNlXG4gICAgaWYgJGlucHV0LmlzKCc6Y2hlY2tib3gnKVxuICAgICAgJGlucHV0LmF0dHIoJ2NoZWNrZWQnLCB0cnVlKVxuICAgIGlmICRpbnB1dC5pcygnOnJhZGlvJylcbiAgICAgICRpbnB1dC5maWx0ZXIoJ1t2YWx1ZT1cIicgKyB2YWx1ZSArICdcIl0nKS5hdHRyKCdjaGVja2VkJywgdHJ1ZSlcbiAgICBlbHNlXG4gICAgICAkaW5wdXQudmFsKHZhbHVlKVxuXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuICBpZiAkLnVybFBhcmFtKCd2YWxpZGF0ZScpXG4gICAgdmFsaWRhdGVJbnB1dCgnbmFtZScsICdQbGVhc2UgZW50ZXIgeW91ciBuYW1lIScpXG4gICAgdmFsaWRhdGVJbnB1dCgnYmlvZ3JhcGh5JywgJ1BsZWFzZSB0ZWxsIHVzIHNvbWV0aGluZyBhYm91dCB5b3VyIGhpc3RvcnkhJylcbiAgICB2YWxpZGF0ZUlucHV0KCdnZW5kZXInLCAnUGxlYXNlIHRlbGwgdXMgeW91ciBnZW5kZXIhJylcbiAgICB2YWxpZGF0ZUlucHV0KCdhY2NlcHRfYWdicycsICdZb3UgbXVzdCBhY2NlcHQgb3VyIHRlcm1zIGFuZCBjb25kaXRpb25zIScpXG5cbiAgICBpZiAkKCcuZXJyb3InKS5sZW5ndGggPT0gMFxuICAgICAgYWxlcnQgJ0FsbCBpbnB1dHMgYXJlIHZhbGlkLiciXX0=
//# sourceURL=coffeescript