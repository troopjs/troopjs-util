/*globals buster:false*/
buster.testCase("troopjs-util/getargs", function (run) {
	"use strict";

	var assert = buster.referee.assert;

	require( [ "troopjs-util/getargs" ] , function (getargs) {
		run({
			"1,true,3" : function () {
				assert.equals(getargs.call("1,true,3"), [ 1, true, 3 ]);
			},

			" 1  , '2' , 3  ,false,5 " : function () {
				assert.equals(getargs.call(" 1  , '2' , 3  ,false,5 "), [ 1, "2", 3, false, 5]);
			},

			"'1',two,\"3\"" : function () {
				assert.equals(getargs.call("'1',two,\"3\""), [ "1", "two", "3" ]);
			},

			"'1', 2, \"3\"" : function () {
				assert.equals(getargs.call("'1', 2, \"3\""), [ "1", 2, "3" ]);
			},

			"'1,true',3,\"4\"" : function () {
				assert.equals(getargs.call("'1,true',3,\"4\""), [ "1,true", 3, "4" ]);
			},

			" '1, 2 ',  3,\"4\", 5 " : function () {
				assert.equals(getargs.call(" '1, 2 ',  3,\"4\", 5 "), [ "1, 2 ", 3, "4", 5 ]);
			},

			"1,key=2,3": function () {
				var expected = [1, 2, 3];
				expected["key"] = expected[1];

				var actual = getargs.call("1,key=2,3");

				assert.match(actual, expected);
				assert.same(actual[1], actual["key"]);
			},

			"1,'quoted=key,value'='test',key=false": function () {
				var expected = [1, "test", false];
				expected["quoted=key,value"] = expected[1];
				expected["key"] = expected[2];

				var actual = getargs.call("1,'quoted=key,value'='test',key=false");

				assert.match(actual, expected);
				assert.same(actual[1], actual["quoted=key,value"]);
				assert.same(actual[2], actual["key"]);
			},

			"[data-type][type='button'], #foo .bar:nth-child(1)": function () {
				assert.equals(getargs.call("\"[data-type][type='button']\", #foo .bar:nth-child(1)"), [ "[data-type][type='button']", "#foo .bar:nth-child(1)" ]);
			},

			"/:foo?/(:bar/:baz)?, foo.bar.baz": function () {
				var expected = [ "/:foo?/(:bar/:baz)?", "foo.bar.baz" ];
				var actual = getargs.call("/:foo?/(:bar/:baz)?, foo.bar.baz");
				assert.match(actual, expected);
			}
		});
	});
});
