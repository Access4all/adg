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

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsS0FBWixDQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixRQUFBLENBQUEsRUFBQTtJQUFBLENBQUEsR0FBSTtJQUVKLFFBQUEsR0FBVyxRQUFBLENBQUEsQ0FBQTthQUNULENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxNQUFaLENBQW1CLENBQUEsc0JBQUEsQ0FBQSxDQUF5QixDQUFBLEVBQXpCLENBQTZCLEtBQTdCLENBQW5CO0lBRFM7V0FHWCxXQUFBLENBQVksUUFBWixFQUFzQixJQUF0QjtFQU5nQixDQUFsQjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkgLT5cbiAgaSA9IDFcblxuICBzYXlIZWxsbyA9IC0+XG4gICAgJChcIiNhbGVydFwiKS5hcHBlbmQgXCI8cCByb2xlPSdhbGVydCc+SGVsbG8gI3tpKyt9ITwvcD5cIlxuXG4gIHNldEludGVydmFsIHNheUhlbGxvLCAyMDAwIl19
// # sourceURL=coffeescript
