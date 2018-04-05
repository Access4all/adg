import $ from 'jquery'

import BaseModule from '../BaseModule'

/**
 * Theme
 *
 * @selector .js-theme
 * @enabled true
 */
export default class Theme extends BaseModule {
	constructor() {
		super()
		this.ns = BaseModule.ns('Theme')
		this.config = $.extend(true, {}, DEFAULTS, config || {})
	}

	init(element) {
		var DEFAULTS = {}
		var self = this

		this.$el = $(element)

		return this
	}

	enable() {}
}
