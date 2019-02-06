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
