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

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixRQUFBLFNBQUEsRUFBQTtJQUFBLFNBQUEsR0FBWSxDQUFBLENBQUUsT0FBRjtJQUNaLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QixPQUF4QjtJQUNSLEtBQUssQ0FBQyxJQUFOLEdBQWE7V0FFYixTQUFTLENBQUMsTUFBVixDQUFpQixDQUFBLENBQUEsR0FBQTtNQUNmLElBQUcsS0FBSyxDQUFDLE1BQVQ7ZUFDRSxLQUFLLENBQUMsSUFBTixDQUFBLEVBREY7T0FBQSxNQUFBO1FBR0UsS0FBSyxDQUFDLEtBQU4sQ0FBQTtlQUNBLEtBQUssQ0FBQyxXQUFOLEdBQW9CLEVBSnRCOztJQURlLENBQWpCO0VBTGdCLENBQWxCO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkY2hlY2tib3ggPSAkKFwiaW5wdXRcIilcbiAgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVkaW8nKVxuICBhdWRpby5sb29wID0gdHJ1ZVxuICBcbiAgJGNoZWNrYm94LmNoYW5nZSA9PlxuICAgIGlmIGF1ZGlvLnBhdXNlZFxuICAgICAgYXVkaW8ucGxheSgpXG4gICAgZWxzZVxuICAgICAgYXVkaW8ucGF1c2UoKVxuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwIl19
// # sourceURL=coffeescript
