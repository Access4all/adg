;(function () {
  $(document).ready(function () {
    var $button, $tooltip
    $button = $('button')
    $tooltip = $('#tooltip')
    return $button.click(() => {
      if ($tooltip.attr('hidden') === 'hidden') {
        return $tooltip.removeAttr('hidden')
      } else {
        return $tooltip.attr('hidden', true)
      }
    })
  })
}.call(this))
