(function() {
  var AdgTooltipComplex;

  AdgTooltipComplex = class AdgTooltipComplex {
    constructor(el) {
      this.$el = $(el);
      this.value = this.$el.attr('data-adg-tooltip-complex');
      this.$el.attr('data-adg-tooltip-complex', null);
      this.initContainer();
      this.attachContentToEl();
      this.initIconEvents();
    }

    initContainer() {
      this.$container = $("<span class='adg-tooltip-complex'></span>");
      this.$el.after(this.$container);
      this.initIcon();
      return this.initBalloon();
    }

    initIcon() {
      this.$icon = $("<button class='adg-tooltip-complex-icon' aria-expanded='false'><span class='adg-visually-hidden'>Toggle tooltip</span><svg class='icon'><use xlink:href='#tooltip' /></svg></button>");
      return this.$container.append(this.$icon);
    }

    initBalloon() {
      this.$balloon = $(`<div class='adg-tooltip-complex-balloon' hidden>${this.value}</div>`);
      this.$balloon.attr('id', `${this.$el.attr('id')}-balloon`);
      return this.$container.append(this.$balloon);
    }

    attachContentToEl() {
      var valueElement;
      valueElement = $("<span class='adg-visually-hidden'> (for more details, consult adjacent tooltip)</span>");
      if (this.$el.is('input, textarea, select')) {
        return $(`label[for='${this.$el.attr('id')}'`).append(valueElement);
      } else {
        return this.$el.append(valueElement);
      }
    }

    initIconEvents() {
      return this.$icon.click(() => {
        if (this.$balloon.is(':visible')) {
          return this.hide();
        } else {
          return this.show();
        }
      });
    }

    show() {
      this.$balloon.attr('hidden', false);
      return this.$icon.attr('aria-expanded', true);
    }

    hide() {
      this.$balloon.attr('hidden', true);
      return this.$icon.attr('aria-expanded', false);
    }

  };

  $(document).ready(function() {
    return $('[data-adg-tooltip-complex]').each(function() {
      return new AdgTooltipComplex(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNLG9CQUFOLE1BQUEsa0JBQUE7SUFDRSxXQUFhLENBQUMsRUFBRCxDQUFBO01BQ1gsSUFBQyxDQUFBLEdBQUQsR0FBTyxDQUFBLENBQUUsRUFBRjtNQUNQLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsMEJBQVY7TUFDVCxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSwwQkFBVixFQUFzQyxJQUF0QztNQUVBLElBQUMsQ0FBQSxhQUFELENBQUE7TUFDQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtNQUVBLElBQUMsQ0FBQSxjQUFELENBQUE7SUFSVzs7SUFVYixhQUFlLENBQUEsQ0FBQTtNQUNiLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FBQSxDQUFFLDJDQUFGO01BQ2QsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLENBQVcsSUFBQyxDQUFBLFVBQVo7TUFFQSxJQUFDLENBQUEsUUFBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUxhOztJQU9mLFFBQVUsQ0FBQSxDQUFBO01BQ1IsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFBLENBQUUsc0xBQUY7YUFDVCxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosQ0FBbUIsSUFBQyxDQUFBLEtBQXBCO0lBRlE7O0lBSVYsV0FBYSxDQUFBLENBQUE7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSxDQUFBLGdEQUFBLENBQUEsQ0FBbUQsSUFBQyxDQUFBLEtBQXBELENBQTBELE1BQTFELENBQUY7TUFDWixJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxJQUFmLEVBQXFCLENBQUEsQ0FBQSxDQUFHLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLElBQVYsQ0FBSCxDQUFtQixRQUFuQixDQUFyQjthQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixDQUFtQixJQUFDLENBQUEsUUFBcEI7SUFIVzs7SUFLYixpQkFBbUIsQ0FBQSxDQUFBO0FBQ2pCLFVBQUE7TUFBQSxZQUFBLEdBQWUsQ0FBQSxDQUFFLHdGQUFGO01BQ2YsSUFBRyxJQUFDLENBQUEsR0FBRyxDQUFDLEVBQUwsQ0FBUSx5QkFBUixDQUFIO2VBQ0UsQ0FBQSxDQUFFLENBQUEsV0FBQSxDQUFBLENBQWMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsSUFBVixDQUFkLENBQThCLENBQTlCLENBQUYsQ0FBbUMsQ0FBQyxNQUFwQyxDQUEyQyxZQUEzQyxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxDQUFZLFlBQVosRUFIRjs7SUFGaUI7O0lBT25CLGNBQWdCLENBQUEsQ0FBQTthQUNkLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxDQUFhLENBQUEsQ0FBQSxHQUFBO1FBQ1gsSUFBRyxJQUFDLENBQUEsUUFBUSxDQUFDLEVBQVYsQ0FBYSxVQUFiLENBQUg7aUJBQ0UsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQURGO1NBQUEsTUFBQTtpQkFHRSxJQUFDLENBQUEsSUFBRCxDQUFBLEVBSEY7O01BRFcsQ0FBYjtJQURjOztJQU9oQixJQUFNLENBQUEsQ0FBQTtNQUNKLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLFFBQWYsRUFBeUIsS0FBekI7YUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0lBRkk7O0lBSU4sSUFBTSxDQUFBLENBQUE7TUFDSixJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxRQUFmLEVBQXlCLElBQXpCO2FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksZUFBWixFQUE2QixLQUE3QjtJQUZJOztFQTdDUjs7RUFpREEsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsQ0FBQSxDQUFFLDRCQUFGLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsUUFBQSxDQUFBLENBQUE7YUFDbkMsSUFBSSxpQkFBSixDQUFzQixJQUF0QjtJQURtQyxDQUFyQztFQURnQixDQUFsQjtBQWpEQSIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFkZ1Rvb2x0aXBDb21wbGV4XG4gIGNvbnN0cnVjdG9yOiAoZWwpIC0+XG4gICAgQCRlbCA9ICQoZWwpXG4gICAgQHZhbHVlID0gQCRlbC5hdHRyKCdkYXRhLWFkZy10b29sdGlwLWNvbXBsZXgnKVxuICAgIEAkZWwuYXR0cignZGF0YS1hZGctdG9vbHRpcC1jb21wbGV4JywgbnVsbClcbiAgXG4gICAgQGluaXRDb250YWluZXIoKVxuICAgIEBhdHRhY2hDb250ZW50VG9FbCgpXG4gICAgXG4gICAgQGluaXRJY29uRXZlbnRzKClcbiAgICBcbiAgaW5pdENvbnRhaW5lcjogLT5cbiAgICBAJGNvbnRhaW5lciA9ICQoXCI8c3BhbiBjbGFzcz0nYWRnLXRvb2x0aXAtY29tcGxleCc+PC9zcGFuPlwiKVxuICAgIEAkZWwuYWZ0ZXIoQCRjb250YWluZXIpXG5cbiAgICBAaW5pdEljb24oKVxuICAgIEBpbml0QmFsbG9vbigpXG4gIFxuICBpbml0SWNvbjogLT5cbiAgICBAJGljb24gPSAkKFwiPGJ1dHRvbiBjbGFzcz0nYWRnLXRvb2x0aXAtY29tcGxleC1pY29uJyBhcmlhLWV4cGFuZGVkPSdmYWxzZSc+PHNwYW4gY2xhc3M9J2FkZy12aXN1YWxseS1oaWRkZW4nPlRvZ2dsZSB0b29sdGlwPC9zcGFuPjxzdmcgY2xhc3M9J2ljb24nPjx1c2UgeGxpbms6aHJlZj0nI3Rvb2x0aXAnIC8+PC9zdmc+PC9idXR0b24+XCIpXG4gICAgQCRjb250YWluZXIuYXBwZW5kKEAkaWNvbilcbiAgICBcbiAgaW5pdEJhbGxvb246IC0+XG4gICAgQCRiYWxsb29uID0gJChcIjxkaXYgY2xhc3M9J2FkZy10b29sdGlwLWNvbXBsZXgtYmFsbG9vbicgaGlkZGVuPiN7QHZhbHVlfTwvZGl2PlwiKVxuICAgIEAkYmFsbG9vbi5hdHRyKCdpZCcsIFwiI3tAJGVsLmF0dHIoJ2lkJyl9LWJhbGxvb25cIilcbiAgICBAJGNvbnRhaW5lci5hcHBlbmQoQCRiYWxsb29uKVxuICAgIFxuICBhdHRhY2hDb250ZW50VG9FbDogLT5cbiAgICB2YWx1ZUVsZW1lbnQgPSAkKFwiPHNwYW4gY2xhc3M9J2FkZy12aXN1YWxseS1oaWRkZW4nPiAoZm9yIG1vcmUgZGV0YWlscywgY29uc3VsdCBhZGphY2VudCB0b29sdGlwKTwvc3Bhbj5cIilcbiAgICBpZiBAJGVsLmlzKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpXG4gICAgICAkKFwibGFiZWxbZm9yPScje0AkZWwuYXR0cignaWQnKX0nXCIpLmFwcGVuZCh2YWx1ZUVsZW1lbnQpXG4gICAgZWxzZVxuICAgICAgQCRlbC5hcHBlbmQodmFsdWVFbGVtZW50KVxuICAgIFxuICBpbml0SWNvbkV2ZW50czogLT5cbiAgICBAJGljb24uY2xpY2sgPT5cbiAgICAgIGlmIEAkYmFsbG9vbi5pcygnOnZpc2libGUnKVxuICAgICAgICBAaGlkZSgpXG4gICAgICBlbHNlXG4gICAgICAgIEBzaG93KClcbiAgICAgICAgXG4gIHNob3c6IC0+XG4gICAgQCRiYWxsb29uLmF0dHIoJ2hpZGRlbicsIGZhbHNlKVxuICAgIEAkaWNvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICBcbiAgaGlkZTogLT5cbiAgICBAJGJhbGxvb24uYXR0cignaGlkZGVuJywgdHJ1ZSlcbiAgICBAJGljb24uYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuICAgIFxuJChkb2N1bWVudCkucmVhZHkgLT5cbiAgJCgnW2RhdGEtYWRnLXRvb2x0aXAtY29tcGxleF0nKS5lYWNoIC0+XG4gICAgbmV3IEFkZ1Rvb2x0aXBDb21wbGV4IEAiXX0=
//# sourceURL=coffeescript