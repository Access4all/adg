;(function () {
  $(document).ready(function () {
    var $checkbox, $tooltip
    $checkbox = $('input')
    $tooltip = $('#tooltip')
    return $checkbox.change(() => {
      if ($tooltip.attr('hidden') === 'hidden') {
        return $tooltip.removeAttr('hidden')
      } else {
        return $tooltip.attr('hidden', true)
      }
    })
  })
}.call(this))

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixRQUFBLFNBQUEsRUFBQTtJQUFBLFNBQUEsR0FBWSxDQUFBLENBQUUsT0FBRjtJQUNaLFFBQUEsR0FBVyxDQUFBLENBQUUsVUFBRjtXQUVYLFNBQVMsQ0FBQyxNQUFWLENBQWlCLENBQUEsQ0FBQSxHQUFBO01BQ2YsSUFBRyxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQWQsQ0FBQSxLQUEyQixRQUE5QjtlQUNFLFFBQVEsQ0FBQyxVQUFULENBQW9CLFFBQXBCLEVBREY7T0FBQSxNQUFBO2VBR0UsUUFBUSxDQUFDLElBQVQsQ0FBYyxRQUFkLEVBQXdCLElBQXhCLEVBSEY7O0lBRGUsQ0FBakI7RUFKZ0IsQ0FBbEI7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5IC0+XG4gICRjaGVja2JveCA9ICQoXCJpbnB1dFwiKVxuICAkdG9vbHRpcCA9ICQoXCIjdG9vbHRpcFwiKVxuICBcbiAgJGNoZWNrYm94LmNoYW5nZSA9PlxuICAgIGlmICR0b29sdGlwLmF0dHIoXCJoaWRkZW5cIikgPT0gXCJoaWRkZW5cIlxuICAgICAgJHRvb2x0aXAucmVtb3ZlQXR0cihcImhpZGRlblwiKVxuICAgIGVsc2VcbiAgICAgICR0b29sdGlwLmF0dHIoXCJoaWRkZW5cIiwgdHJ1ZSkiXX0=
// # sourceURL=coffeescript
