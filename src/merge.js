/**
 * TroopJS utils/merge module
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
/*global define:false */
define(function MergeModule() {
	/*jshint strict:false */

	var ARRAY = Array;
	var OBJECT = Object;

	return function merge(source) {
		var target = this;
		var key = null;
		var i;
		var iMax;
		var value;
		var constructor;

		for (i = 0, iMax = arguments.length; i < iMax; i++) {
			source = arguments[i];

			for (key in source) {
				value = source[key];
				constructor = value.constructor;
	
				if (!(key in target)) {
					target[key] = value;
				}
				else if (constructor === ARRAY) {
					target[key] = target[key].concat(value);
				}
				else if (constructor === OBJECT) {
					merge.call(target[key], value);
				}
				else {
					target[key] = value;
				}
			}
		}

		return target;
	};
});