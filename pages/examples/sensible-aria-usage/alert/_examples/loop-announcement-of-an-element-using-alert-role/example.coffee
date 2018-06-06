$(document).ready ->
  i = 1

  sayHello = ->
    $("#alert").append "<p role='alert'>Hello #{i++}!</p>"

  setInterval sayHello, 2000