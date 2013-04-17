var _ 	 = require('underscore'),
	test = require('tap').test,
	main = require('./../lib/main');

test('Main.js exports tests', function(t) {

	t.ok(_.isFunction(main.app.exitApp), 'exitApp is exposed as fn');
	t.ok(_.isFunction(main.app.exitAppDomain), 'exitAppDomain is exposed as fn');
	t.ok(_.isFunction(main.server.exitServer), 'exitServer is exposed as fn');
	t.ok(_.isFunction(main.server.exitServerDomain), 'exitServerDomain is exposed as fn');
	t.ok(_.isFunction(main.exitProcess), 'exitProcess is exposed as fn');
	t.ok(_.isFunction(main.middleware.closeGracefully), 'middleware.closeGracefully is exposed as fn');

	t.end();
});