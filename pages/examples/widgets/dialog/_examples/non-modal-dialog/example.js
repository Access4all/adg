(function() {
  var AdgDialog;

  AdgDialog = class AdgDialog {
    constructor(el) {
      this.$openButton = $(el);
      this.initContainer(this.$openButton.attr('data-adg-dialog'));
      this.initOpenButton();
    }

    initOpenButton() {
      this.$openButton.attr('aria-expanded', false);
      this.$openButton.append('<span class="adg-visually-hidden"> (dialog)</span>');
      return this.$openButton.click((e) => {
        if (this.$container.is(':visible')) {
          return this.hide();
        } else {
          return this.show();
        }
      });
    }

    initContainer(id) {
      this.$container = $(`#${id}`);
      this.$container.attr('data-adg-dialog-container', true);
      this.initCloseButton();
      return this.initConfirmButton();
    }

    initConfirmButton() {
      this.$confirmButton = $('<button>Confirm<span class="adg-visually-hidden"> (close)</span></button>');
      this.$container.append(this.$confirmButton);
      return this.$confirmButton.click(() => {
        return this.hide();
      });
    }

    initCloseButton() {
      this.$closeButton = $('<button class="adg-dialog-icon"><svg class="icon" focusable="false"><use xlink:href="#tooltip" /></svg></span><span class="adg-visually-hidden">Close dialog</span></button>');
      this.$container.prepend(this.$closeButton);
      return this.$closeButton.click(() => {
        return this.hide();
      });
    }

    show() {
      this.$container.attr('hidden', false);
      this.$openButton.attr('aria-expanded', true);
      return this.$closeButton.focus();
    }

    hide() {
      this.$container.attr('hidden', true);
      this.$openButton.attr('aria-expanded', false);
      return this.$openButton.focus();
    }

  };

  $(document).ready(function() {
    return $('[data-adg-dialog]').each(function() {
      return new AdgDialog(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNLFlBQU4sTUFBQSxVQUFBO0lBQ0UsV0FBYSxDQUFDLEVBQUQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FBQSxDQUFFLEVBQUY7TUFDZixJQUFDLENBQUEsYUFBRCxDQUFlLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFrQixpQkFBbEIsQ0FBZjtNQUNBLElBQUMsQ0FBQSxjQUFELENBQUE7SUFIVzs7SUFLYixjQUFnQixDQUFBLENBQUE7TUFDZCxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsZUFBbEIsRUFBbUMsS0FBbkM7TUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsQ0FBb0Isb0RBQXBCO2FBRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQW1CLENBQUMsQ0FBRCxDQUFBLEdBQUE7UUFDakIsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLEVBQVosQ0FBZSxVQUFmLENBQUg7aUJBQ0UsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQURGO1NBQUEsTUFBQTtpQkFHRSxJQUFDLENBQUEsSUFBRCxDQUFBLEVBSEY7O01BRGlCLENBQW5CO0lBSmM7O0lBVWhCLGFBQWUsQ0FBQyxFQUFELENBQUE7TUFDYixJQUFDLENBQUEsVUFBRCxHQUFjLENBQUEsQ0FBRSxDQUFBLENBQUEsQ0FBQSxDQUFJLEVBQUosQ0FBQSxDQUFGO01BQ2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLDJCQUFqQixFQUE4QyxJQUE5QztNQUVBLElBQUMsQ0FBQSxlQUFELENBQUE7YUFDQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtJQUxhOztJQU9mLGlCQUFtQixDQUFBLENBQUE7TUFDakIsSUFBQyxDQUFBLGNBQUQsR0FBa0IsQ0FBQSxDQUFFLDJFQUFGO01BQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFtQixJQUFDLENBQUEsY0FBcEI7YUFFQSxJQUFDLENBQUEsY0FBYyxDQUFDLEtBQWhCLENBQXNCLENBQUEsQ0FBQSxHQUFBO2VBQ3BCLElBQUMsQ0FBQSxJQUFELENBQUE7TUFEb0IsQ0FBdEI7SUFKaUI7O0lBT25CLGVBQWlCLENBQUEsQ0FBQTtNQUNmLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBQUEsQ0FBRSw4S0FBRjtNQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBb0IsSUFBQyxDQUFBLFlBQXJCO2FBRUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxLQUFkLENBQW9CLENBQUEsQ0FBQSxHQUFBO2VBQ2xCLElBQUMsQ0FBQSxJQUFELENBQUE7TUFEa0IsQ0FBcEI7SUFKZTs7SUFPakIsSUFBTSxDQUFBLENBQUE7TUFDSixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsUUFBakIsRUFBMkIsS0FBM0I7TUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsZUFBbEIsRUFBbUMsSUFBbkM7YUFDQSxJQUFDLENBQUEsWUFBWSxDQUFDLEtBQWQsQ0FBQTtJQUhJOztJQUtOLElBQU0sQ0FBQSxDQUFBO01BQ0osSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQWlCLFFBQWpCLEVBQTJCLElBQTNCO01BQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLGVBQWxCLEVBQW1DLEtBQW5DO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQUE7SUFISTs7RUExQ1I7O0VBK0NBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxLQUFaLENBQWtCLFFBQUEsQ0FBQSxDQUFBO1dBQ2hCLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLElBQXZCLENBQTRCLFFBQUEsQ0FBQSxDQUFBO2FBQzFCLElBQUksU0FBSixDQUFjLElBQWQ7SUFEMEIsQ0FBNUI7RUFEZ0IsQ0FBbEI7QUEvQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBZGdEaWFsb2dcbiAgY29uc3RydWN0b3I6IChlbCkgLT5cbiAgICBAJG9wZW5CdXR0b24gPSAkKGVsKVxuICAgIEBpbml0Q29udGFpbmVyKEAkb3BlbkJ1dHRvbi5hdHRyKCdkYXRhLWFkZy1kaWFsb2cnKSlcbiAgICBAaW5pdE9wZW5CdXR0b24oKVxuICAgIFxuICBpbml0T3BlbkJ1dHRvbjogLT5cbiAgICBAJG9wZW5CdXR0b24uYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuICAgIEAkb3BlbkJ1dHRvbi5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiYWRnLXZpc3VhbGx5LWhpZGRlblwiPiAoZGlhbG9nKTwvc3Bhbj4nKVxuICAgIFxuICAgIEAkb3BlbkJ1dHRvbi5jbGljayAoZSkgPT5cbiAgICAgIGlmIEAkY29udGFpbmVyLmlzKCc6dmlzaWJsZScpXG4gICAgICAgIEBoaWRlKClcbiAgICAgIGVsc2VcbiAgICAgICAgQHNob3coKVxuICAgIFxuICBpbml0Q29udGFpbmVyOiAoaWQpIC0+XG4gICAgQCRjb250YWluZXIgPSAkKFwiIyN7aWR9XCIpXG4gICAgQCRjb250YWluZXIuYXR0cignZGF0YS1hZGctZGlhbG9nLWNvbnRhaW5lcicsIHRydWUpXG4gICAgXG4gICAgQGluaXRDbG9zZUJ1dHRvbigpXG4gICAgQGluaXRDb25maXJtQnV0dG9uKClcbiAgICBcbiAgaW5pdENvbmZpcm1CdXR0b246IC0+XG4gICAgQCRjb25maXJtQnV0dG9uID0gJCgnPGJ1dHRvbj5Db25maXJtPHNwYW4gY2xhc3M9XCJhZGctdmlzdWFsbHktaGlkZGVuXCI+IChjbG9zZSk8L3NwYW4+PC9idXR0b24+JylcbiAgICBAJGNvbnRhaW5lci5hcHBlbmQoQCRjb25maXJtQnV0dG9uKVxuICAgIFxuICAgIEAkY29uZmlybUJ1dHRvbi5jbGljayA9PlxuICAgICAgQGhpZGUoKVxuICAgICAgXG4gIGluaXRDbG9zZUJ1dHRvbjogLT5cbiAgICBAJGNsb3NlQnV0dG9uID0gJCgnPGJ1dHRvbiBjbGFzcz1cImFkZy1kaWFsb2ctaWNvblwiPjxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIj48dXNlIHhsaW5rOmhyZWY9XCIjdG9vbHRpcFwiIC8+PC9zdmc+PC9zcGFuPjxzcGFuIGNsYXNzPVwiYWRnLXZpc3VhbGx5LWhpZGRlblwiPkNsb3NlIGRpYWxvZzwvc3Bhbj48L2J1dHRvbj4nKVxuICAgIEAkY29udGFpbmVyLnByZXBlbmQoQCRjbG9zZUJ1dHRvbilcbiAgICBcbiAgICBAJGNsb3NlQnV0dG9uLmNsaWNrID0+XG4gICAgICBAaGlkZSgpXG4gICAgICAgIFxuICBzaG93OiAtPlxuICAgIEAkY29udGFpbmVyLmF0dHIoJ2hpZGRlbicsIGZhbHNlKVxuICAgIEAkb3BlbkJ1dHRvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICBAJGNsb3NlQnV0dG9uLmZvY3VzKClcbiAgICBcbiAgaGlkZTogLT5cbiAgICBAJGNvbnRhaW5lci5hdHRyKCdoaWRkZW4nLCB0cnVlKVxuICAgIEAkb3BlbkJ1dHRvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG4gICAgQCRvcGVuQnV0dG9uLmZvY3VzKClcbiAgICBcbiQoZG9jdW1lbnQpLnJlYWR5IC0+XG4gICQoJ1tkYXRhLWFkZy1kaWFsb2ddJykuZWFjaCAtPlxuICAgIG5ldyBBZGdEaWFsb2cgQCJdfQ==
//# sourceURL=coffeescript