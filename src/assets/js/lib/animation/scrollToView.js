import $ from 'jquery';
import ScrollParent from '../browser/ScrollParent'

export default function scrollToView(el, options) {
	var pref = $.extend({
		align: 'top',
		marginTop: 0,
		marginBottom: 0,
		animation: {
			duration: 300
		}
	}, options);

	var $el = $(el);
	el = $el.get(0);

	var scrollParent = new ScrollParent(el);
	var scrollTop = scrollParent.scrollTop();
	var containerHeight = scrollParent.getHeight();


	var offsetTop = 1000000000;
	var offsetBottom = 0;

	$el.each(function() {
		var top = scrollParent.getOffset(el);
		var bottom = top + $(this).outerHeight();
		if (top < offsetTop) offsetTop = top;
		if (bottom > offsetBottom) offsetBottom = bottom;
	});

	var topScroll = -1, bottomScroll = -1, targetScroll = -1;

	if (offsetTop < scrollTop) {
		topScroll = offsetTop - pref.marginTop;
	}
	if ((offsetBottom) > (scrollTop + containerHeight)) {
		bottomScroll = offsetBottom - containerHeight - pref.marginBottom;
	}

	if (pref.align === 'bottom') {
		if (bottomScroll >= 0) {
			targetScroll = bottomScroll;
		} else {
			targetScroll = topScroll;
		}
	} else if (pref.align === 'top') {
		if (topScroll >= 0) {
			targetScroll = topScroll;
		} else {
			targetScroll = Math.min(offsetTop - pref.marginTop, bottomScroll);
		}
	}

	if (targetScroll < 0) {
		return false;
	}

	scrollParent.scrollTo(targetScroll, pref.animation);
}
