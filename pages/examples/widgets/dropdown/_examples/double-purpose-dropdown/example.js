(function() {
  var AdgDropdown;

  AdgDropdown = class AdgDropdown {
    constructor(el) {
      this.$el = $(el);
      this.initExpandables();
    }

    initExpandables() {
      return this.$el.find("[aria-expanded]").click((e) => {
        var $button, $container;
        $button = $(e.target);
        $container = $($button.next("*"));
        if ($container.is(':visible')) {
          return this.hide($button, $container);
        } else {
          return this.show($button, $container);
        }
      });
    }

    show($button, $container) {
      $container.attr('hidden', false);
      return $button.attr('aria-expanded', true);
    }

    hide($button, $container) {
      $container.attr('hidden', true);
      return $button.attr('aria-expanded', false);
    }

  };

  $(document).ready(function() {
    return $('[data-adg-dropdown]').each(function() {
      return new AdgDropdown(this);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFNLGNBQU4sTUFBQSxZQUFBO0lBQ0UsV0FBYSxDQUFDLEVBQUQsQ0FBQTtNQUNYLElBQUMsQ0FBQSxHQUFELEdBQU8sQ0FBQSxDQUFFLEVBQUY7TUFDUCxJQUFDLENBQUEsZUFBRCxDQUFBO0lBRlc7O0lBSWIsZUFBaUIsQ0FBQSxDQUFBO2FBQ2YsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsaUJBQVYsQ0FBNEIsQ0FBQyxLQUE3QixDQUFtQyxDQUFDLENBQUQsQ0FBQSxHQUFBO0FBQ2pDLFlBQUEsT0FBQSxFQUFBO1FBQUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxDQUFDLENBQUMsTUFBSjtRQUNWLFVBQUEsR0FBYSxDQUFBLENBQUUsT0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFiLENBQUY7UUFFYixJQUFHLFVBQVUsQ0FBQyxFQUFYLENBQWMsVUFBZCxDQUFIO2lCQUNFLElBQUMsQ0FBQSxJQUFELENBQU0sT0FBTixFQUFlLFVBQWYsRUFERjtTQUFBLE1BQUE7aUJBR0UsSUFBQyxDQUFBLElBQUQsQ0FBTSxPQUFOLEVBQWUsVUFBZixFQUhGOztNQUppQyxDQUFuQztJQURlOztJQVVqQixJQUFNLENBQUMsT0FBRCxFQUFVLFVBQVYsQ0FBQTtNQUNKLFVBQVUsQ0FBQyxJQUFYLENBQWdCLFFBQWhCLEVBQTBCLEtBQTFCO2FBQ0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiLEVBQThCLElBQTlCO0lBRkk7O0lBSU4sSUFBTSxDQUFDLE9BQUQsRUFBVSxVQUFWLENBQUE7TUFDSixVQUFVLENBQUMsSUFBWCxDQUFnQixRQUFoQixFQUEwQixJQUExQjthQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsZUFBYixFQUE4QixLQUE5QjtJQUZJOztFQW5CUjs7RUF1QkEsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsQ0FBQSxDQUFFLHFCQUFGLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsUUFBQSxDQUFBLENBQUE7YUFDNUIsSUFBSSxXQUFKLENBQWdCLElBQWhCO0lBRDRCLENBQTlCO0VBRGdCLENBQWxCO0FBdkJBIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWRnRHJvcGRvd25cbiAgY29uc3RydWN0b3I6IChlbCkgLT5cbiAgICBAJGVsID0gJChlbClcbiAgICBAaW5pdEV4cGFuZGFibGVzKClcbiAgICBcbiAgaW5pdEV4cGFuZGFibGVzOiAtPlxuICAgIEAkZWwuZmluZChcIlthcmlhLWV4cGFuZGVkXVwiKS5jbGljayAoZSkgPT5cbiAgICAgICRidXR0b24gPSAkKGUudGFyZ2V0KVxuICAgICAgJGNvbnRhaW5lciA9ICQoJGJ1dHRvbi5uZXh0KFwiKlwiKSlcbiAgICAgIFxuICAgICAgaWYgJGNvbnRhaW5lci5pcygnOnZpc2libGUnKVxuICAgICAgICBAaGlkZSgkYnV0dG9uLCAkY29udGFpbmVyKVxuICAgICAgZWxzZVxuICAgICAgICBAc2hvdygkYnV0dG9uLCAkY29udGFpbmVyKVxuICAgICAgICBcbiAgc2hvdzogKCRidXR0b24sICRjb250YWluZXIpIC0+XG4gICAgJGNvbnRhaW5lci5hdHRyKCdoaWRkZW4nLCBmYWxzZSlcbiAgICAkYnV0dG9uLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgIFxuICBoaWRlOiAoJGJ1dHRvbiwgJGNvbnRhaW5lcikgLT5cbiAgICAkY29udGFpbmVyLmF0dHIoJ2hpZGRlbicsIHRydWUpXG4gICAgJGJ1dHRvbi5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG4gICAgXG4kKGRvY3VtZW50KS5yZWFkeSAtPlxuICAkKCdbZGF0YS1hZGctZHJvcGRvd25dJykuZWFjaCAtPlxuICAgIG5ldyBBZGdEcm9wZG93biBAIl19
//# sourceURL=coffeescript