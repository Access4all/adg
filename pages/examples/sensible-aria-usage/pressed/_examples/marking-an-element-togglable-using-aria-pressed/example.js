;(function () {
  $(document).ready(function () {
    var $button, audio
    $button = $('button')
    audio = document.getElementById('audio')
    audio.loop = true
    return $button.click(() => {
      if (audio.paused) {
        audio.play()
        return $button.attr('aria-pressed', true)
      } else {
        audio.pause()
        audio.currentTime = 0
        return $button.attr('aria-pressed', false)
      }
    })
  })
}.call(this))
