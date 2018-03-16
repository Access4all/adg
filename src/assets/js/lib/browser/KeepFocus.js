define(
['jquery'],
function($)
{

	// keeps focus on target even for screenreaders
	var KeepFocus = function() {
		KeepFocus.instanceCounter = (KeepFocus.instanceCounter || 0) + 1;
		this.ns = '.keepfocus_'+(KeepFocus.instanceCounter);
	};
	KeepFocus.prototype.keep = function(target) {
		var $target = $(target);

		this.$disable = $target.parents().add($target).siblings().not('head,flying-focus,script,[aria-hidden="true"]');
		this.$disable.attr('aria-hidden', 'true');

		$(document).on('focusin' + this.ns, function(event) {
			var isWithinTarget = $target.is(event.target) || $(event.target).parents().is($target);
			if (!isWithinTarget) {
				event.preventDefault();
				$target.find('a,button,[tabindex],select,input,textarea').first().focus();
			}
		});
	};
	KeepFocus.prototype.release = function() {
		if (this.$disable) {
			this.$disable.removeAttr('aria-hidden');
			this.$disable = null;
		}

		$(document).off(this.ns);
	};


	return KeepFocus;

});
