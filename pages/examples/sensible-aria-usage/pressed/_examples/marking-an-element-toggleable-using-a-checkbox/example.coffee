$(document).ready ->
  $checkbox = $("input")
  audio = document.getElementById('audio')
  audio.loop = true
  
  $checkbox.change =>
    if audio.paused
      audio.play()
    else
      audio.pause()
      audio.currentTime = 0