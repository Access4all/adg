import $ from 'jquery'

// keeps focus on target even for screenreaders
export default class KeepFocus {
  constructor () {
    KeepFocus.instanceCounter = (KeepFocus.instanceCounter || 0) + 1
    this.ns = '.keepfocus_' + KeepFocus.instanceCounter
  }

  keep (target) {
    var $target = $(target)

    this.$disable = $target
      .parents()
      .add($target)
      .siblings()
      .not('head,FlyingFocus,script,[aria-hidden="true"]')
    this.$disable.attr('aria-hidden', 'true')

    $(document).on('focusin' + this.ns, function (event) {
      var isWithinTarget =
        $target.is(event.target) ||
        $(event.target)
          .parents()
          .is($target)
      if (!isWithinTarget) {
        event.preventDefault()
        $target
          .find('a,button,[tabindex],select,input,textarea')
          .first()
          .focus()
      }
    })
  }

  release () {
    if (this.$disable) {
      this.$disable.removeAttr('aria-hidden')
      this.$disable = null
    }

    $(document).off(this.ns)
  }
}

export var __useDefault = true
