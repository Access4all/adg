$(document).ready ->
  sayHello = ->
    $("#alert").append "<p role='alert'>Hello!</p>"

  setTimeout sayHello, 10000