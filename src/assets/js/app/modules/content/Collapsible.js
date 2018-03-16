import $ from 'jquery'

import BaseModule from '../BaseModule'
import HeightAnimation from '../../../lib/animation/HeightAnimation'
import scrollToView from '../../../lib/animation/scrollToView'
import Accessibility from '../../../lib/browser/Accessibility'

/**
 * Collapsible
 *
 * @selector .js-collapsible
 * @enabled true
 */
export default class Collapsible extends BaseModule {
  constructor() {
	super()

	this.DEFAULT_OPTIONS = {
		deviceMin: false, // included
		deviceMax: false // included
	}

	this.INPUT = 'input[type="checkbox"], input[type="radio"]'
  }

  init(element) {
	var self = this

	this.$el = $(element)
	this.options = $.extend(
	{},
	this.DEFAULT_OPTIONS,
	this.$el.data('collapsible-options')
	)
	this.getContainerElement()

	return this
  }

  enable() {
	if (!this.$el.hasClass('is-disabled')) {
		this.bindListeners()
		this.getToggleElement().attr('aria-expanded', 'false')
		this.validate()
	}
  }

  disable() {
	this.enabled = false

	this.$el.removeClass('is-opened')
	this.getToggleElement()
	.removeClass('is-opened')
	.removeAttr('aria-expanded')
	this.getContainerElement().removeClass('is-opened')

	this.$el.off(this.ns)
  }

  validate() {
	if (
	this.getToggleElement().is(this.INPUT) &&
	this.getToggleElement().prop('checked')
	) {
		this.getToggleElement().trigger('click')
	}
  }

  bindListeners() {
	this.getToggleElement().on(`click${this.ns}`, this.onToggleClick.bind(this))

	this.on('close', e => {
		e.stopPropagation()
		this.close()
	})
  }

  onClose(e) {
	e.preventDefault()

	this.close()
  }

  onToggleClick(e) {
	if (!this.getToggleElement().hasClass('clickable')) {
		if (
		!this.getToggleElement().is(this.INPUT) ||
		(this.getToggleElement().is(this.INPUT) &&
		!this.getToggleElement().prop('checked'))
		) {
			e.preventDefault()
		}
	}

	if (
	this.getToggleElement().hasClass('is-opened') &&
	!this.getToggleElement().is('input[type="radio"]')
	) {
		this.close()
	} else {
		if (this.getToggleElement().hasClass('clickable')) {
			e.preventDefault()
		}

		this.open()
	}
  }

  close(callback) {
	var heightAnim = new HeightAnimation(this.$el, { duration: 300 })
	this._close()
	heightAnim.complete(callback)

	// trigger resize to relayout items inside of the collapsible-element
	$(window).trigger('resize')
  }

  _close() {
	this.$el.removeClass('is-opened')
	this.getToggleElement()
	.removeClass('is-opened')
	.attr('aria-expanded', 'false')
	this.getContainerElement().removeClass('is-opened')
  }

  open(callback) {
	var self = this
	var $active = this.getGroup().filter('.is-opened')
	var closeAnim

	var heightAnim = new HeightAnimation(this.$el, { duration: 300 })

	// close active collapsible if there is
	if ($active) {
		closeAnim = new HeightAnimation($active, { duration: 300 })

		$active.trigger('close')
	}

	this.$el.addClass('is-opened')
	this.getToggleElement()
	.addClass('is-opened')
	.attr('aria-expanded', 'true')
	this.getContainerElement().addClass('is-opened')

	scrollToView(self.$el)

	if (closeAnim) {
		closeAnim.complete(function() {})
	}

	heightAnim.complete(function() {
		Accessibility.focusFirst(self.getContainerElement())

		// trigger resize to relayout items inside of the collapsible-element
		$(window).trigger('resize')
		$(window).trigger('collapsibleOpened')
	})
  }

  /**
   * if a data-collapsible-group attribute is set, collapse all others when opening a pannel
   */
  getGroup() {
	var group = this.$el.data('collapsible-group')

	if (group) {
		return $('[data-collapsible-group="' + group + '"]')
	} else {
		return $([])
	}
  }

  getToggleElement() {
	let $toggles = this.$el.find(
	'.js-collapsible--toggle, .js-collapsible--toggle-dummy'
	)

	for (let i = 0, len = $toggles.length; i < len; i++) {
		var $toggle = $toggles.eq(i)

		if (this.$el[0] !== $toggle.closest('.js-collapsible')[0]) {
			$toggles.splice($.inArray($toggle, $toggles), 1)
		}
	}

	return $toggles
  }

  getContainerElement() {
	return (
	this.$container ||
	(this.$container =
	typeof this.options.containerSelector !== 'undefined'
	? $(this.options.containerSelector)
	: this.$el.find('.js-collapsible--container').first())
	)
  }
}
