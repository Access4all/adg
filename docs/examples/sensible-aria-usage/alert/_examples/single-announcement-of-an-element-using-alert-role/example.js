;(function () {
  $(document).ready(function () {
    var sayHello
    sayHello = function () {
      return $('#alert').append("<p role='alert'>Hello!</p>")
    }
    return setTimeout(sayHello, 10000)
  })
}.call(this))
