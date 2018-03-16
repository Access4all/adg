(function() {
  $(document).ready(function() {
    $('button').click(function() {
      var $all_panels, $button, $upcoming_panel, carousel_id, current_index, direction, max_index, upcoming_index;
      $button = $(this);
      carousel_id = $button.attr('data-carousel-id');
      direction = $button.attr('data-carousel-direction');
      $all_panels = $("input[name='" + carousel_id + "']");
      max_index = $all_panels.length - 1;
      current_index = $all_panels.index($($all_panels.parent()).find(':checked'));
      upcoming_index = direction === 'previous' ? current_index === 0 ? max_index : current_index - 1 : current_index === max_index ? 0 : current_index + 1;
      $upcoming_panel = $($all_panels[upcoming_index]);
      $upcoming_panel.prop('checked', true).trigger('change');
      $('#alerts').append("<div role='alert'>Showing panel " + (upcoming_index + 1) + " of " + (max_index + 1) + "</div>");
      return setTimeout((function() {
        return $('#alerts').empty();
      }), 2000);
    });
    return $("input[type='radio']").change(function() {
      var $current_radiobutton, current_panel_id, current_radiobutton_name;
      $current_radiobutton = $(this);
      current_radiobutton_name = $current_radiobutton.attr('name');
      current_panel_id = "#" + ($current_radiobutton.attr('value')) + "_panel";
      return $("[name='" + current_radiobutton_name + "']").each((function(_this) {
        return function(i, element) {
          var $panel, $radiobutton, panel_id;
          $radiobutton = $(element);
          panel_id = "#" + ($radiobutton.attr('id')) + "_panel";
          $panel = $(panel_id);
          if (panel_id === current_panel_id) {
            return $panel.show();
          } else {
            return $panel.hide();
          }
        };
      })(this));
    });
  });

}).call(this);