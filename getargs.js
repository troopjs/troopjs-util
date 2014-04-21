/**
 * @license MIT http://troopjs.mit-license.org/
 */
define(function GetArgsModule() {
	"use strict";

	/**
	 * @class util.getargs
	 * @mixin Function
	 * @static
	 */

	var UNDEFINED;
	var STR_SUBSTRING = String.prototype.substring;
	var STR_SLICE = String.prototype.slice;
	var RE_STRING = /^(["']).*\1$/;
	var RE_BOOLEAN = /^(?:false|true)$/i;
	var RE_BOOLEAN_TRUE = /^true$/i;
	var RE_DIGIT = /^\d+$/;

	/**
	 * Function that calls on a String, to parses it as function parameters delimited by commas.
	 *
	 * 	" 1  , '2' , 3  ,false,5 " => [ 1, "2", 3, false, 5]
	 * 	'1, 2 ',  3,\"4\", 5  => [ "1, 2 ", 3, "4", 5 ]
	 *
	 * @method constructor
	 * @return {Array} the array of parsed params.
	 */
	return function getargs() {
		var me = this;
		var values = [];
		var from;
		var to;
		var index;
		var length;
		var count;
		var quote = false;
		var value;
		var key;
		var c;

		// Iterate string
		for (index = count = from = to = 0, length = me.length; index < length; index++) {

			// Get char
			c = me.charAt(index);

			switch(c) {
				case "\"" :
				/* falls through */
				case "'" :
					// If we are currently quoted...
					if (quote === c) {
						// Stop quote
						quote = false;

						// Update to
						to = index + 1;
					}
					// Otherwise
					else {
						// Start quote
						quote = c;

						// Update from/to
						from = to = index;
					}
					break;

				case " " :
				/* falls through */
				case "\t" :
					// Continue if we're quoted
					if (quote) {
						to = index + 1;
						break;
					}

					// Update from/to
					if (from === to) {
						from = to = index + 1;
					}
					break;

				case "=":
					// Continue if we're quoted
					if (quote) {
						to = index + 1;
						break;
					}

					// If we captured something...
					if (from !== to) {
						// Extract substring
						key = STR_SUBSTRING.call(me, from, to);

						if (RE_STRING.test(key)) {
							key = STR_SLICE.call(key, 1, -1);
						}
					}

					from = index + 1;
					break;

				case "," :
					// Continue if we're quoted
					if (quote) {
						to = index + 1;
						break;
					}

					// If we captured something...
					if (from !== to) {
						// Extract substring
						value = STR_SUBSTRING.call(me, from, to);

						if (RE_STRING.test(value)) {
							value = STR_SLICE.call(value, 1, -1);
						}
						else if (RE_BOOLEAN.test(value)) {
							value = RE_BOOLEAN_TRUE.test(value);
						}
						else if (RE_DIGIT.test(value)) {
							value = +value;
						}

						// Store value with key or just index
						if (key !== UNDEFINED) {
							// Store value
							values[key] = values[count++] = value;

							// Reset key
							key = UNDEFINED;
						}
						else {
							// Store value
							values[count++] = value;
						}
					}

					// Update from/to
					from = to = index + 1;
					break;

				default :
					// Update to
					to = index + 1;
			}
		}

		// If we captured something...
		if (from !== to) {
			value = STR_SUBSTRING.call(me, from, to);

			if (RE_STRING.test(value)) {
				value = STR_SLICE.call(value, 1, -1);
			}
			else if (RE_BOOLEAN.test(value)) {
				value = RE_BOOLEAN_TRUE.test(value);
			}
			else if (RE_DIGIT.test(value)) {
				value = +value;
			}

			// Store value with key or just index
			if (key !== UNDEFINED) {
				// Store value
				values[key] = values[count] = value;
			}
			else {
				// Store value
				values[count] = value;
			}
		}

		return values;
	};
});
