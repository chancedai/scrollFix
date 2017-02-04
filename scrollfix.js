/** dc 201702041558 */
window.ScrollFi = (function($) {

	var extend = function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};

	var setStyles = function(ele, styles) {
		for (property in styles) {
			ele.style[property] = styles[property];
		}
	};

	var getOffset = function(ele) {
		var top = 0;
		var left = 0;
		while (ele != null && ele != document.body) {
			left += ele.offsetLeft;
			top += ele.offsetTop;
			ele = ele.offsetParent;
		}
		return {
			top: top,
			left: left
		};
	};

	var hasClass = function(el, clz) {
		if (!el) {
			return false;
		}
		return el.className.match(new RegExp('(\\s|^)' + clz + '(\\s|$)'));
	};

	var addClass = function(el, clz) {
		if (!hasClass(el, clz)) {
			el.className = el.className.replace(/(^\s*)|(\s*$)/g, '') + ' ' + clz;
		}
	};
	var removeClass = function(el, clz) {
		if (hasClass(el, clz)) {
			var reg = new RegExp('(\\s|^)' + clz + '(\\s|$)');
			el.className = el.className.replace(reg, ' ');
		}
	};
	var addEvent = function(el, eventType, fn) {
		if (el.attachEvent) {
			el.attachEvent('on' + eventType, fn)
		} else {
			el.addEventListener(eventType, fn, false)
		}
	};
	var getScroll = function() {
		return {
			top: document.documentElement.scrollTop || document.body.scrollTop,
			left: document.documentElement.scrollLeft || document.body.scrollLeft
		};
	};

	var ScrollFix = function(wrap, config) {
		var self = this;
		var defaults = {
			scrollOnResize: true,
			// 容器在固定时会添加的css class 如：
			// .fixed{position: fixed;top:0;_position:absolute;_left:0;}
			fixedClz: 'fixed',
			// 固定时距离顶部的距离
			getTop: function(wrap) {
				return 0;
			},
			// 获取容器高度，有可能
			getHeight: function(wrap) {
				return wrap.offsetHeight;
			},
			fixed: function(wrap, scrollTop, offsetTop, top) {
				return scrollTop > offsetTop - top;
			},
			onFix: function(wrap) {},
			onUnFix: function(wrap) {}
		};
		self.wrap = wrap;
		self.config = extend(defaults, config);
		self.stop = false;
		self.bind();

	};
	ScrollFix.prototype = {
		unFix: function() {
			this.stop = true;
			var scroll = getScroll();
			window.scrollTo(scroll.left, scroll.top - 1);
		},
		fix: function() {
			this.stop = false;
			var scroll = getScroll();
			window.scrollTo(scroll.left, scroll.top - 1);
		},
		bind: function() {
			var self = this;
			var wrap = self.wrap;
			var config = self.config;
			var pNode = wrap.parentNode;
			// divFilled 为占位div
			var divFilled = document.createElement('div');
			pNode.insertBefore(divFilled, wrap);
			var fixedClz = config.fixedClz || 'fixed';
			var toggle = function(b) {
				var height = '1px';
				var marginTop = '-1px';
				if (b) {
					height = config.getHeight(wrap) + 'px';
					marginTop = 0;
				}
				setStyles(divFilled, {
					height: height,
					marginTop: marginTop,
					overflow: 'hidden'
				});
			};
			var scrollHandle = function() {
				var offset = getOffset(divFilled);
				var offsetTop = offset.top;
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

				var offsetLeft = offset.left;
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;


				var top = config.getTop(wrap) || 0;
				var left = offsetLeft - scrollLeft;
				if (config.fixed(wrap, scrollTop, offsetTop, top) && !self.stop) {
					toggle(true);
					addClass(wrap, fixedClz);

					setStyles(wrap, {
						position: 'fixed',
						top: top + 'px',
						left: left + 'px'
					});
					config.onFix(wrap);
				} else {
					setStyles(wrap, {
						position: '',
						top: '',
						left: ''
					});
					toggle(false);
					removeClass(wrap, fixedClz);
					config.onUnFix(wrap);
				}
			}
			var timerId = null;

			var windowScroll = function() {
				if (!timerId) {
					scrollHandle();
					timerId = true;
				} else {
					clearTimeout(timerId);
					setTimeout(function() {
						scrollHandle();
					}, 100);
				}
			};

			addEvent(window, 'scroll', windowScroll);
			if (config.scrollOnResize) {
				addEvent(window, 'resize', windowScroll);
			}
			scrollHandle();
		}
	};

	return ScrollFix;
})();