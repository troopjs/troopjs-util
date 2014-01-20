/**
 * when.defer patched with jQuery/deferred compatibility.
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define(["when"], function DeferedModule(when) {
	"use strict";

	var ARRAY_SLICE = Array.prototype.slice;

	// Since the deferred implementation in jQuery (that we use in 1.x) allows
	// to resolve with optional context and multiple arguments, we monkey-patch resolve here
	function patch(deferred, method) {
		var func = deferred.resolver[method];
		// Resolve/Reject/Progress with parameters:
		// http://api.jquery.com/deferred.resolve
		deferred[method] = function () {
			func(ARRAY_SLICE.call(arguments));
		};

		// Resolve/Reject/Progress with context and parameters:
		// http://api.jquery.com/deferred.resolveWith
		deferred[method + 'With'] = function (context) {
			func.apply(context, ARRAY_SLICE.call(arguments, 1));
		};
	}

	return function Defer() {

		// Create deferred
		var deferred = when.defer();

		patch(deferred, 'resolve');
		patch(deferred, 'reject');
		patch(deferred, 'progress');

		return deferred;
	};
});
