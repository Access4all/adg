(function() {
  $(document).ready(function() {
    var $button, $tooltip;
    $button = $("button");
    $tooltip = $("#tooltip");
    return $button.click(() => {
      if ($tooltip.attr("hidden") === "hidden") {
        $tooltip.removeAttr("hidden");
        return $button.attr("aria-expanded", true);
      } else {
        $tooltip.attr("hidden", true);
        return $button.attr("aria-expanded", false);
      }
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixRQUFBLE9BQUEsRUFBQTtJQUFBLE9BQUEsR0FBVSxDQUFBLENBQUUsUUFBRjtJQUNWLFFBQUEsR0FBVyxDQUFBLENBQUUsVUFBRjtXQUVYLE9BQU8sQ0FBQyxLQUFSLENBQWMsQ0FBQSxDQUFBLEdBQUE7TUFDWixJQUFHLFFBQVEsQ0FBQyxJQUFULENBQWMsUUFBZCxDQUFBLEtBQTJCLFFBQTlCO1FBQ0UsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsUUFBcEI7ZUFDQSxPQUFPLENBQUMsSUFBUixDQUFhLGVBQWIsRUFBOEIsSUFBOUIsRUFGRjtPQUFBLE1BQUE7UUFJRSxRQUFRLENBQUMsSUFBVCxDQUFjLFFBQWQsRUFBd0IsSUFBeEI7ZUFDQSxPQUFPLENBQUMsSUFBUixDQUFhLGVBQWIsRUFBOEIsS0FBOUIsRUFMRjs7SUFEWSxDQUFkO0VBSmdCLENBQWxCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkYnV0dG9uID0gJChcImJ1dHRvblwiKVxuICAkdG9vbHRpcCA9ICQoXCIjdG9vbHRpcFwiKVxuICBcbiAgJGJ1dHRvbi5jbGljayA9PlxuICAgIGlmICR0b29sdGlwLmF0dHIoXCJoaWRkZW5cIikgPT0gXCJoaWRkZW5cIlxuICAgICAgJHRvb2x0aXAucmVtb3ZlQXR0cihcImhpZGRlblwiKVxuICAgICAgJGJ1dHRvbi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLCB0cnVlKVxuICAgIGVsc2VcbiAgICAgICR0b29sdGlwLmF0dHIoXCJoaWRkZW5cIiwgdHJ1ZSlcbiAgICAgICRidXR0b24uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpXG4gICAgICAiXX0=
//# sourceURL=coffeescript