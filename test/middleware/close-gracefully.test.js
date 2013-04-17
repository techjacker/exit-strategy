var _      		= require('underscore'),
    getSet 		= require('getter-setter').proto,
    test   		= require('tap').test,
    graceful  	= require('./../../lib/middleware/close-gracefully.js');

test('close-gracefully.js tests', function(t) {

	t.plan(6);

	var app = getSet({}),
		grace  = graceful(app),
		res = {
			setHeader: function (h1, h2) {
				t.equal(h1, "Connection", 'res.setHeader is called with correct 1st arg');
				t.equal(h2, "close", 'res.setHeader is called with correct 2nd arg');
			},
			send: function (h1, h2) {
				t.equal(h1, 502, 'res.send is called with correct 1st arg');
				t.equal(h2, "Server is in the process of restarting", 'res.send is called with correct 2nd arg');
			}
		},
		next = function (err) {
			t.notOk(err, 'next is called without error arg if app.closeConnections is not set to true');
			app.set('closeConnections', true);
			grace(null, res, next);
		};

	t.ok(_.isFunction(grace), 'fn export returns inner function');
	grace(null, res, next);
});