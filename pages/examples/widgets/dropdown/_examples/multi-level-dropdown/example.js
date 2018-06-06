;(function () {
  var AdgDropdown

  AdgDropdown = class AdgDropdown {
    constructor (el) {
      this.$el = $(el)
      this.initExpandables()
    }

    initExpandables () {
      return this.$el.find('[aria-expanded]').click(e => {
        var $button, $container
        $button = $(e.target)
        $container = $($button.next('*'))
        if ($container.is(':visible')) {
          return this.hide($button, $container)
        } else {
          return this.show($button, $container)
        }
      })
    }

    show ($button, $container) {
      $container.attr('hidden', false)
      return $button.attr('aria-expanded', true)
    }

    hide ($button, $container) {
      $container.attr('hidden', true)
      return $button.attr('aria-expanded', false)
    }
  }

  $(document).ready(function () {
    return $('[data-adg-dropdown]').each(function () {
      return new AdgDropdown(this)
    })
  })
}.call(this))
