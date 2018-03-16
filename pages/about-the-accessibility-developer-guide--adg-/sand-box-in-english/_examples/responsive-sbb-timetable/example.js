(function() {
  $(document).ready(function() {
    return $('button.expand').click(function() {
      var $button, $details, details_id, ref;
      $button = $(this);
      $button.attr('aria-expanded', (ref = $button.attr('aria-expanded') === "false") != null ? ref : {
        "true": false
      });
      details_id = $button.attr('data-target');
      $details = $("#" + details_id);
      return $details.toggle();
    });
  });

}).call(this);