import $ from 'jquery'
import BaseModule from '../BaseModule'

export default class MainNav extends BaseModule {
  constructor () {
    super()
    this.ns = BaseModule.ns('MainNav')
  }

  init (element) {
    var DEFAULTS = {
      selector: ".js-mainnav",
      isActiveClassname: "is-active",
      toggle: {
        selector: ".js-mainnav-toggle",
        isActiveClassname: "is-active"
      }
    }
    this.$el = $(element)
    this.config = $.extend(true, {}, DEFAULTS)

    this.$toggle = $(this.config.toggle.selector)

    this.addEvents();

    return this
  }

  addEvents () {
    var self = this;
    this.$toggle.on('click', function () {
      self.onClick();
    });
  }

  onClick () {
    var isActive = this.$el.hasClass(this.config.isActiveClassname);
    if (!isActive) {
      this.enable()
    } else {
      this.disable()
    }
  }

  enable () {
    this.$el.addClass(this.config.isActiveClassname)
    this.$toggle.addClass(this.config.toggle.isActiveClassname)
    this.$toggle.attr("aria-expanded", "true")
  }
  disable () {
    this.$el.removeClass(this.config.isActiveClassname)
    this.$toggle.removeClass(this.config.toggle.isActiveClassname)
    this.$toggle.attr("aria-expanded", "false")
  }
}
