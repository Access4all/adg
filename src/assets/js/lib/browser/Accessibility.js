import $ from 'jquery';
import KeepFocus from '../browser/KeepFocus';

export default (() => {

	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
	var idCounter = 0;
	var FOCUSABLE = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

	var Accessibility = {
		FOCUSABLE: FOCUSABLE,
		focus: function(el) {
			var $target = $(el);
			var prevTabIndex;

			if (!$target.length) return; // return if element doens't exists

			el = $target.get(0);
			el.focus();

			if (document.activeElement !== el) {
				prevTabIndex = $target.attr('tabindex');
				$target.attr('tabindex', '-1');
				el.focus();
				$target.on('blur', removeTabIndex);
				if (document.activeElement !== el) {
					setTimeout(function() {
						removeTabIndex();
					}, 0);
				}
			}

			function removeTabIndex(event) {
				$target.removeAttr('tabindex');
				$target.off('blur', removeTabIndex);
			}
		},

		focusFirst: function(el, selector) {
			var currentActive = document.activeElement;
			var $el = $(el);
			var $all = $el.find(selector || '*').filter(':visible');
			var root = $el.get(0);
			var node, focusable;
			for (var i = 0; i < $all.length; i++) {
				if (selector || hasText($all[i])) {
					node = $all[i];
					break;
				}
			}
			if (!node) {
				node = focusable = root;
			}
			while (node !== root) {
				node.focus();
				if (document.activeElement === node || document.activeElement !== currentActive) {
					return true;
				}
				if (!focusable && $(node).css('display') === 'block') {
					focusable = node;
				}
				node = node.parentNode;
			}
			Accessibility.focus(focusable || root);
		},


		// usage:
		// var releaseFocus = Accessibility.keepFocus(el);
		// ...
		// releaseFocus();
		keepFocus: function(el, doHandleTab) {
			var keeper = new KeepFocus();
			keeper.keep(el, doHandleTab);
			return function() {
				keeper.release();
			};
		},

		describeBy: function(el, target) {
			var $el = $(el);
			if (typeof(target) !== 'string') {
				var $target = $(target).first();
				if ($target.length === 0 || $el.length === 0) {
					return;
				}
				var id = $target.attr('id') || ('accessible-id-' + (++idCounter));
				$target.attr('id', id);
				target = id;
			}
			var described = $el.attr('aria-describedby');
			described = described ? described.split(' ') : [];
			if ($.inArray(target, described) === -1) {
				described.push(target);
				$el.attr('aria-describedby', described.join(' '));
			}
		},

		speak: function(message) {
			if (!message) {
				return;
			}
			if (!this.$speakField) {
				this.$speakField = $('<span class="visuallyhidden" role="status" aria-live="assertive" aria-atomic="true"></span>');
				$('body').append(this.$speakField);
			}
			this.$speakField.text(message);
		}

	};

	var NO_SPACE = /\S/;
	function hasText(node) {
		var n, i;
		for (i = 0; i < node.childNodes.length; i++) {
			n = node.childNodes[i];
			if (n.nodeType === 3 && NO_SPACE.test(n.nodeValue)) {
				return true;
			}
		}
		return false;
	}

	return Accessibility;
})();



