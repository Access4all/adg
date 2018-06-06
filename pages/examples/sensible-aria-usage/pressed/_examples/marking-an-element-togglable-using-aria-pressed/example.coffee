$(document).ready ->
  $button = $("button")
  audio = document.getElementById('audio')
  audio.loop = true

  $button.click =>
    if audio.paused
      audio.play()
      $button.attr("aria-pressed", true)
    else
      audio.pause()
      audio.currentTime = 0
      $button.attr("aria-pressed", false)