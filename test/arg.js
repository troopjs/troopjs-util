buster.testCase("troopjs-utils/arg", function (run) {
	require( [ "troopjs-utils/arg" ] , function (arg) {
		run({
			"1,true,3" : function () {
				assert.equals(arg.call("1,true,3"), [ 1, true, 3 ]);
			},

			" 1  , '2' , 3  ,false,5 " : function () {
				assert.equals(arg.call(" 1  , '2' , 3  ,false,5 "), [ 1, "2", 3, false, 5]);
			},

			"'1',two,\"3\"" : function () {
				assert.equals(arg.call("'1',two,\"3\""), [ "1", "two", "3" ]);
			},

			"'1', 2, \"3\"" : function () {
				assert.equals(arg.call("'1', 2, \"3\""), [ "1", 2, "3" ]);
			},

			"'1,true',3,\"4\"" : function () {
				assert.equals(arg.call("'1,true',3,\"4\""), [ "1,true", 3, "4" ]);
			},

			" '1, 2 ',  3,\"4\", 5 " : function () {
				assert.equals(arg.call(" '1, 2 ',  3,\"4\", 5 "), [ "1, 2 ", "3", "4", "5" ]);
			}
		});
	});
});