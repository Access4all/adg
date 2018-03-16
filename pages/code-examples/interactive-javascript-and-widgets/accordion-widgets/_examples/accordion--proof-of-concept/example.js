;(function () {
  var AdgAccordion

  AdgAccordion = (function () {
    function AdgAccordion (el) {
      this.$el = $(el)
      this.initHeadings()
      this.initTogglers()
    }

    AdgAccordion.prototype.initHeadings = function () {
      return (this.$headings = this.$el.find('[data-adg-accordion-target]'))
    }

    AdgAccordion.prototype.initTogglers = function () {
      return this.$headings.each(function () {
        var $container, $heading, $toggler, targetId
        $heading = $(this)
        $toggler = $heading
          .wrap("<a href='#' aria-expanded='false'></a>")
          .parent()
        targetId = $heading.attr('data-adg-accordion-target')
        $container = $('#' + targetId)
        $container.hide()
        return $toggler.click(
          (function (_this) {
            return function (e) {
              $container.toggle()
              $toggler.attr(
                'aria-expanded',
                $toggler.attr('aria-expanded') === 'false' ? 'true' : 'false'
              )
              return e.preventDefault()
            }
          })(this)
        )
      })
    }

    return AdgAccordion
  })()

  $(document).ready(function () {
    return $('[data-adg-accordion]').each(function () {
      return new AdgAccordion(this)
    })
  })
}.call(this))
