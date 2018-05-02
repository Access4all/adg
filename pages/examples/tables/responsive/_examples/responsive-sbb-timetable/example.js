(function() {
  $(document).ready(function() {
    return $('button.expand').click(function() {
      var $button, $details, details_id, ref;
      $button = $(this);
      $button.attr('aria-expanded', (ref = $button.attr('aria-expanded') === "false") != null ? ref : {
        true: false
      });
      details_id = $button.attr('data-target');
      $details = $(`#${details_id}`);
      return $details.toggle();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLEtBQW5CLENBQXlCLFFBQUEsQ0FBQSxDQUFBO0FBQ3ZCLFVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxVQUFBLEVBQUE7TUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUY7TUFDVixPQUFPLENBQUMsSUFBUixDQUFhLGVBQWIsb0VBQXlFO1FBQUEsSUFBQSxFQUFPO01BQVAsQ0FBekU7TUFFQSxVQUFBLEdBQWEsT0FBTyxDQUFDLElBQVIsQ0FBYSxhQUFiO01BQ2IsUUFBQSxHQUFXLENBQUEsQ0FBRSxDQUFBLENBQUEsQ0FBQSxDQUFJLFVBQUosQ0FBQSxDQUFGO2FBQ1gsUUFBUSxDQUFDLE1BQVQsQ0FBQTtJQU51QixDQUF6QjtFQURnQixDQUFsQjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkgLT5cbiAgJCgnYnV0dG9uLmV4cGFuZCcpLmNsaWNrIC0+XG4gICAgJGJ1dHRvbiA9ICQoQClcbiAgICAkYnV0dG9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAkYnV0dG9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnKSA9PSBcImZhbHNlXCIgPyB0cnVlIDogZmFsc2UpXG4gICAgXG4gICAgZGV0YWlsc19pZCA9ICRidXR0b24uYXR0cignZGF0YS10YXJnZXQnKVxuICAgICRkZXRhaWxzID0gJChcIiMje2RldGFpbHNfaWR9XCIpXG4gICAgJGRldGFpbHMudG9nZ2xlKCkiXX0=
//# sourceURL=coffeescript