;(function () {
  $(document).ready(function () {
    var $button, $tooltip
    $button = $('button')
    $tooltip = $('#tooltip')
    return $button.click(() => {
      if ($tooltip.attr('hidden') === 'hidden') {
        $tooltip.removeAttr('hidden')
        return $button.attr('aria-expanded', true)
      } else {
        $tooltip.attr('hidden', true)
        return $button.attr('aria-expanded', false)
      }
    })
  })
}.call(this))
