import $ from 'jquery';

export default class HeightAnimation {
	constructor(el, options) {
		if (el) {
			this.init(el);
		}

		this.options = options || {};
	}

	init(el) {
		this.$el = $(el);
		this.$el.stop().css({ overflow: '', height: '' });
		this.heightBefore = this.$el.outerHeight();
	}

	complete(callback) {
		var $el = this.$el;
		var heightBefore = this.heightBefore;
		var heightAfter = this.$el.outerHeight();

		var anim = $.extend({
			duration: 300
		}, this.options, {
			complete: function() {
				$el.css({ overflow: '', height: '' });

				if (callback && typeof callback === 'function') {
					callback();
				}
			}
		});


		if (heightBefore !== heightAfter) {
			this.$el.css({ overflow: 'hidden', height: heightBefore });

			this.$el.stop().animate({
				height: heightAfter
			}, anim);
		}
	}
}
