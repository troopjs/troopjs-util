/**
 * TroopJS utils/unique
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
/*global define:false */
define(function UniqueModule() {
	/*jshint strict:false */

	return function unique(callback) {
		var self = this;
		var length = self.length;
		var result = [];
		var value;
		var i;
		var j;
		var k;

		add: for (i = j = k = 0; i < length; i++, j = 0) {
			value = self[i];

			while(j < k) {
				if (callback.call(self, value, result[j++]) === true) {
					continue add;
				}
			}

			result[k++] = value;
		}

		return result;
	};
});