;(function () {
  $(document).ready(function () {
    var $checkbox, audio
    $checkbox = $('input')
    audio = document.getElementById('audio')
    audio.loop = true
    return $checkbox.change(() => {
      if (audio.paused) {
        return audio.play()
      } else {
        audio.pause()
        return (audio.currentTime = 0)
      }
    })
  })
}.call(this))
