/*
 * TroopJS utils/select
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define(function SelectModule() {
	"use strict";

	var UNDEFINED;

	return function select(query) {
		var node = this;
		var m;
		var i;
		var length;
		var skip = false;

		for (i = m = 0, length = query.length; i < length && node !== UNDEFINED; i++) {
			switch(query.charAt(i)) {
				case ".":
					if (skip === false && i > m) {
						node = node[query.substring(m, i)];
						m = i + 1;
					}
					break;

				case "[":
					if (skip === false) {
						skip = "[";
						m = i + 1;
					}
					break;

				case "]":
					if (skip === "[" && i > m) {
						node = node[query.substring(m, i)];
						skip = false;
						m = i + 2;
					}
					break;

				case "'":
					if (skip === "'" && i > m) {
						node = node[query.substring(m, i)];
						skip = false;
						m = i + 2;
					}
					else {
						skip = "'";
						m = i + 1;
					}
					break;
			}
		}

		if (i > m) {
			node = node[query.substring(m, i)];
		}

		return node;
	}
});