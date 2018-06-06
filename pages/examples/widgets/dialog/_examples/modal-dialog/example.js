;(function () {
  var AdgDialog

  AdgDialog = class AdgDialog {
    constructor (el) {
      this.$openButton = $(el)
      this.initContainer(this.$openButton.attr('data-adg-dialog'))
      this.initOpenButton()
    }

    initOpenButton () {
      this.$openButton.attr('aria-expanded', false)
      this.$openButton.append(
        '<span class="adg-visually-hidden"> (dialog)</span>'
      )
      return this.$openButton.click(e => {
        if (this.$container.is(':visible')) {
          return this.hide()
        } else {
          return this.show()
        }
      })
    }

    initContainer (id) {
      this.$container = $(`#${id}`)
      this.$container.attr('data-adg-dialog-container', true)
      this.$container.wrap(
        "<div role='dialog'><div role='document'></div></div>"
      )
      this.initCloseButton()
      this.initConfirmButton()
      return this.initContainerButtonEvents()
    }

    initConfirmButton () {
      this.$confirmButton = $(
        '<button>Confirm<span class="adg-visually-hidden"> (close)</span></button>'
      )
      return this.$container.append(this.$confirmButton)
    }

    initCloseButton () {
      this.$closeButton = $(
        '<button class="adg-dialog-icon"><svg class="icon" focusable="false"><use xlink:href="#tooltip" /></svg></span><span class="adg-visually-hidden">Close dialog</span></button>'
      )
      return this.$container.prepend(this.$closeButton)
    }

    initContainerButtonEvents () {
      this.$confirmButton.click(() => {
        return this.hide()
      })
      this.$confirmButton.keydown(e => {
        if (!e.shiftKey && e.which === 9) {
          this.$closeButton.focus()
          e.preventDefault()
          return e.stopPropagation()
        }
      })
      this.$closeButton.click(() => {
        return this.hide()
      })
      return this.$closeButton.keydown(e => {
        if (e.shiftKey && e.which === 9) {
          this.$confirmButton.focus()
          return e.preventDefault()
        }
      })
    }

    show () {
      this.$container.before("<div class='adg-dialog-curtain'></div>")
      this.$container.attr('hidden', false)
      this.$openButton.attr('aria-expanded', true)
      return this.$closeButton.focus()
    }

    hide () {
      $('.adg-dialog-curtain').remove()
      this.$container.attr('hidden', true)
      this.$openButton.attr('aria-expanded', false)
      return this.$openButton.focus()
    }
  }

  $(document).ready(function () {
    return $('[data-adg-dialog]').each(function () {
      return new AdgDialog(this)
    })
  })
}.call(this))

// # sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNLFlBQU4sTUFBQSxVQUFBO0lBQ0UsV0FBYSxDQUFDLEVBQUQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FBQSxDQUFFLEVBQUY7TUFDZixJQUFDLENBQUEsYUFBRCxDQUFlLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFrQixpQkFBbEIsQ0FBZjtNQUNBLElBQUMsQ0FBQSxjQUFELENBQUE7SUFIVzs7SUFLYixjQUFnQixDQUFBLENBQUE7TUFDZCxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsZUFBbEIsRUFBbUMsS0FBbkM7TUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsQ0FBb0Isb0RBQXBCO2FBRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQW1CLENBQUMsQ0FBRCxDQUFBLEdBQUE7UUFDakIsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLEVBQVosQ0FBZSxVQUFmLENBQUg7aUJBQ0UsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQURGO1NBQUEsTUFBQTtpQkFHRSxJQUFDLENBQUEsSUFBRCxDQUFBLEVBSEY7O01BRGlCLENBQW5CO0lBSmM7O0lBVWhCLGFBQWUsQ0FBQyxFQUFELENBQUE7TUFDYixJQUFDLENBQUEsVUFBRCxHQUFjLENBQUEsQ0FBRSxDQUFBLENBQUEsQ0FBQSxDQUFJLEVBQUosQ0FBQSxDQUFGO01BQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLDJCQUFqQixFQUE4QyxJQUE5QztNQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixzREFBakI7TUFFQSxJQUFDLENBQUEsZUFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLGlCQUFELENBQUE7YUFDQSxJQUFDLENBQUEseUJBQUQsQ0FBQTtJQVBhOztJQVNmLGlCQUFtQixDQUFBLENBQUE7TUFDakIsSUFBQyxDQUFBLGNBQUQsR0FBa0IsQ0FBQSxDQUFFLDJFQUFGO2FBQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFtQixJQUFDLENBQUEsY0FBcEI7SUFGaUI7O0lBSW5CLGVBQWlCLENBQUEsQ0FBQTtNQUNmLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBQUEsQ0FBRSw4S0FBRjthQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBb0IsSUFBQyxDQUFBLFlBQXJCO0lBRmU7O0lBSWpCLHlCQUEyQixDQUFBLENBQUE7TUFDekIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxLQUFoQixDQUFzQixDQUFBLENBQUEsR0FBQTtlQUNwQixJQUFDLENBQUEsSUFBRCxDQUFBO01BRG9CLENBQXRCO01BR0EsSUFBQyxDQUFBLGNBQWMsQ0FBQyxPQUFoQixDQUF3QixDQUFDLENBQUQsQ0FBQSxHQUFBO1FBQ3RCLElBQUcsQ0FBQyxDQUFDLENBQUMsUUFBSCxJQUFlLENBQUMsQ0FBQyxLQUFGLEtBQVcsQ0FBN0I7VUFDRSxJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsQ0FBQTtVQUNBLENBQUMsQ0FBQyxjQUFGLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLGVBQUYsQ0FBQSxFQUhGOztNQURzQixDQUF4QjtNQU1BLElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxDQUFvQixDQUFBLENBQUEsR0FBQTtlQUNsQixJQUFDLENBQUEsSUFBRCxDQUFBO01BRGtCLENBQXBCO2FBR0EsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQXNCLENBQUMsQ0FBRCxDQUFBLEdBQUE7UUFDcEIsSUFBRyxDQUFDLENBQUMsUUFBRixJQUFjLENBQUMsQ0FBQyxLQUFGLEtBQVcsQ0FBNUI7VUFDRSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQUE7aUJBQ0EsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxFQUZGOztNQURvQixDQUF0QjtJQWJ5Qjs7SUFrQjNCLElBQU0sQ0FBQSxDQUFBO01BQ0osSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQW1CLHdDQUFuQjtNQUVBLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixRQUFqQixFQUEyQixLQUEzQjtNQUNBLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFrQixlQUFsQixFQUFtQyxJQUFuQzthQUNBLElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxDQUFBO0lBTEk7O0lBT04sSUFBTSxDQUFBLENBQUE7TUFDSixDQUFBLENBQUUscUJBQUYsQ0FBd0IsQ0FBQyxNQUF6QixDQUFBO01BRUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLFFBQWpCLEVBQTJCLElBQTNCO01BQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLGVBQWxCLEVBQW1DLEtBQW5DO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQUE7SUFMSTs7RUExRFI7O0VBaUVBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFFBQUEsQ0FBQSxDQUFBO1dBQ2hCLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLElBQXZCLENBQTRCLFFBQUEsQ0FBQSxDQUFBO2FBQzFCLElBQUksU0FBSixDQUFjLElBQWQ7SUFEMEIsQ0FBNUI7RUFEZ0IsQ0FBbEI7QUFqRUEiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBZGdEaWFsb2dcbiAgY29uc3RydWN0b3I6IChlbCkgLT5cbiAgICBAJG9wZW5CdXR0b24gPSAkKGVsKVxuICAgIEBpbml0Q29udGFpbmVyKEAkb3BlbkJ1dHRvbi5hdHRyKCdkYXRhLWFkZy1kaWFsb2cnKSlcbiAgICBAaW5pdE9wZW5CdXR0b24oKVxuICAgIFxuICBpbml0T3BlbkJ1dHRvbjogLT5cbiAgICBAJG9wZW5CdXR0b24uYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuICAgIEAkb3BlbkJ1dHRvbi5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiYWRnLXZpc3VhbGx5LWhpZGRlblwiPiAoZGlhbG9nKTwvc3Bhbj4nKVxuICAgIFxuICAgIEAkb3BlbkJ1dHRvbi5jbGljayAoZSkgPT5cbiAgICAgIGlmIEAkY29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgIEBoaWRlKClcbiAgICAgIGVsc2VcbiAgICAgICAgQHNob3coKVxuICAgIFxuICBpbml0Q29udGFpbmVyOiAoaWQpIC0+XG4gICAgQCRjb250YWluZXIgPSAkKFwiIyN7aWR9XCIpXG4gICAgQCRjb250YWluZXIuYXR0cignZGF0YS1hZGctZGlhbG9nLWNvbnRhaW5lcicsIHRydWUpXG4gICAgQCRjb250YWluZXIud3JhcChcIjxkaXYgcm9sZT0nZGlhbG9nJz48ZGl2IHJvbGU9J2RvY3VtZW50Jz48L2Rpdj48L2Rpdj5cIilcbiAgICBcbiAgICBAaW5pdENsb3NlQnV0dG9uKClcbiAgICBAaW5pdENvbmZpcm1CdXR0b24oKVxuICAgIEBpbml0Q29udGFpbmVyQnV0dG9uRXZlbnRzKClcbiAgICBcbiAgaW5pdENvbmZpcm1CdXR0b246IC0+XG4gICAgQCRjb25maXJtQnV0dG9uID0gJCgnPGJ1dHRvbj5Db25maXJtPHNwYW4gY2xhc3M9XCJhZGctdmlzdWFsbHktaGlkZGVuXCI+IChjbG9zZSk8L3NwYW4+PC9idXR0b24+JylcbiAgICBAJGNvbnRhaW5lci5hcHBlbmQoQCRjb25maXJtQnV0dG9uKVxuICAgICAgXG4gIGluaXRDbG9zZUJ1dHRvbjogLT5cbiAgICBAJGNsb3NlQnV0dG9uID0gJCgnPGJ1dHRvbiBjbGFzcz1cImFkZy1kaWFsb2ctaWNvblwiPjxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIj48dXNlIHhsaW5rOmhyZWY9XCIjdG9vbHRpcFwiIC8+PC9zdmc+PC9zcGFuPjxzcGFuIGNsYXNzPVwiYWRnLXZpc3VhbGx5LWhpZGRlblwiPkNsb3NlIGRpYWxvZzwvc3Bhbj48L2J1dHRvbj4nKVxuICAgIEAkY29udGFpbmVyLnByZXBlbmQoQCRjbG9zZUJ1dHRvbilcbiAgICAgIFxuICBpbml0Q29udGFpbmVyQnV0dG9uRXZlbnRzOiAtPlxuICAgIEAkY29uZmlybUJ1dHRvbi5jbGljayA9PlxuICAgICAgQGhpZGUoKVxuICAgICAgXG4gICAgQCRjb25maXJtQnV0dG9uLmtleWRvd24gKGUpID0+XG4gICAgICBpZiAhZS5zaGlmdEtleSAmJiBlLndoaWNoID09IDlcbiAgICAgICAgQCRjbG9zZUJ1dHRvbi5mb2N1cygpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgXG4gICAgQCRjbG9zZUJ1dHRvbi5jbGljayA9PlxuICAgICAgQGhpZGUoKVxuICAgICAgXG4gICAgQCRjbG9zZUJ1dHRvbi5rZXlkb3duIChlKSA9PlxuICAgICAgaWYgZS5zaGlmdEtleSAmJiBlLndoaWNoID09IDlcbiAgICAgICAgQCRjb25maXJtQnV0dG9uLmZvY3VzKClcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIFxuICBzaG93OiAtPlxuICAgIEAkY29udGFpbmVyLmJlZm9yZShcIjxkaXYgY2xhc3M9J2FkZy1kaWFsb2ctY3VydGFpbic+PC9kaXY+XCIpXG4gICAgXG4gICAgQCRjb250YWluZXIuYXR0cignaGlkZGVuJywgZmFsc2UpXG4gICAgQCRvcGVuQnV0dG9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgIEAkY2xvc2VCdXR0b24uZm9jdXMoKVxuICAgIFxuICBoaWRlOiAtPlxuICAgICQoXCIuYWRnLWRpYWxvZy1jdXJ0YWluXCIpLnJlbW92ZSgpXG4gICAgXG4gICAgQCRjb250YWluZXIuYXR0cignaGlkZGVuJywgdHJ1ZSlcbiAgICBAJG9wZW5CdXR0b24uYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuICAgIEAkb3BlbkJ1dHRvbi5mb2N1cygpXG4gICAgXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkKCdbZGF0YS1hZGctZGlhbG9nXScpLmVhY2ggLT5cbiAgICBuZXcgQWRnRGlhbG9nIEAiXX0=
// # sourceURL=coffeescript
