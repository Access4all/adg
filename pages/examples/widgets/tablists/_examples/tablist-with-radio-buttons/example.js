;(function () {
  $(document).ready(function () {
    return $("input[type='radio']").change(function () {
      var $current_radiobutton, current_panel_id, current_radiobutton_name
      $current_radiobutton = $(this)
      current_radiobutton_name = $current_radiobutton.attr('name')
      current_panel_id = `#${$current_radiobutton.attr('value')}_panel`
      return $(`[name='${current_radiobutton_name}']`).each((i, element) => {
        var $panel, $radiobutton, panel_id
        $radiobutton = $(element)
        panel_id = `#${$radiobutton.attr('id')}_panel`
        $panel = $(panel_id)
        if (panel_id === current_panel_id) {
          return $panel.show()
        } else {
          return $panel.hide()
        }
      })
    })
  })
}.call(this))

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixDQUFBLENBQUUscUJBQUYsQ0FBd0IsQ0FBQyxNQUF6QixDQUFnQyxRQUFBLENBQUEsQ0FBQTtBQUM5QixVQUFBLG9CQUFBLEVBQUEsZ0JBQUEsRUFBQTtNQUFBLG9CQUFBLEdBQTJCLENBQUEsQ0FBRSxJQUFGO01BQzNCLHdCQUFBLEdBQTJCLG9CQUFvQixDQUFDLElBQXJCLENBQTBCLE1BQTFCO01BQzNCLGdCQUFBLEdBQTJCLENBQUEsQ0FBQSxDQUFBLENBQUksb0JBQW9CLENBQUMsSUFBckIsQ0FBMEIsT0FBMUIsQ0FBSixDQUF1QyxNQUF2QzthQUUzQixDQUFBLENBQUUsQ0FBQSxPQUFBLENBQUEsQ0FBVSx3QkFBVixDQUFtQyxFQUFuQyxDQUFGLENBQXlDLENBQUMsSUFBMUMsQ0FBK0MsQ0FBQyxDQUFELEVBQUksT0FBSixDQUFBLEdBQUE7QUFDN0MsWUFBQSxNQUFBLEVBQUEsWUFBQSxFQUFBO1FBQUEsWUFBQSxHQUFlLENBQUEsQ0FBRSxPQUFGO1FBQ2YsUUFBQSxHQUFlLENBQUEsQ0FBQSxDQUFBLENBQUksWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEIsQ0FBSixDQUE0QixNQUE1QjtRQUNmLE1BQUEsR0FBZSxDQUFBLENBQUUsUUFBRjtRQUVmLElBQUcsUUFBQSxLQUFZLGdCQUFmO2lCQUNFLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFERjtTQUFBLE1BQUE7aUJBR0UsTUFBTSxDQUFDLElBQVAsQ0FBQSxFQUhGOztNQUw2QyxDQUEvQztJQUw4QixDQUFoQztFQURnQixDQUFsQjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkgLT5cbiAgJChcImlucHV0W3R5cGU9J3JhZGlvJ11cIikuY2hhbmdlIC0+XG4gICAgJGN1cnJlbnRfcmFkaW9idXR0b24gICAgID0gJChAKVxuICAgIGN1cnJlbnRfcmFkaW9idXR0b25fbmFtZSA9ICRjdXJyZW50X3JhZGlvYnV0dG9uLmF0dHIgJ25hbWUnXG4gICAgY3VycmVudF9wYW5lbF9pZCAgICAgICAgID0gXCIjI3skY3VycmVudF9yYWRpb2J1dHRvbi5hdHRyKCd2YWx1ZScpfV9wYW5lbFwiXG4gICAgXG4gICAgJChcIltuYW1lPScje2N1cnJlbnRfcmFkaW9idXR0b25fbmFtZX0nXVwiKS5lYWNoIChpLCBlbGVtZW50KSA9PlxuICAgICAgJHJhZGlvYnV0dG9uID0gJChlbGVtZW50KVxuICAgICAgcGFuZWxfaWQgICAgID0gXCIjI3skcmFkaW9idXR0b24uYXR0cignaWQnKX1fcGFuZWxcIlxuICAgICAgJHBhbmVsICAgICAgID0gJChwYW5lbF9pZClcbiAgICAgIFxuICAgICAgaWYgcGFuZWxfaWQgPT0gY3VycmVudF9wYW5lbF9pZFxuICAgICAgICAkcGFuZWwuc2hvdygpXG4gICAgICBlbHNlXG4gICAgICAgICRwYW5lbC5oaWRlKCkiXX0=
// # sourceURL=coffeescript
