;(function () {
  $(document).ready(function () {
    var i, sayHello
    i = 1
    sayHello = function () {
      return $('#alert').append(`<p role='alert'>Hello ${i++}!</p>`)
    }
    return setInterval(sayHello, 2000)
  })
}.call(this))
