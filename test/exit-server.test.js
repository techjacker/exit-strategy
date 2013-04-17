var _      = require('underscore'),
    getSet = require('getter-setter').proto,
    test   = require('tap').test,
    eS     = require('./../lib/exit-server.js');

var app = {
		killingApp: true,
		env: 'testing'
	},
	err = 'error';

// decorate app
getSet(app);

// test('exitServerDomain tests', {timeout: 2}, function(t) {
test('exit-server.js tests', function(t) {

	t.plan(6);

	var eSD = eS.exitServerDomain(app),
		server = {},
		close = function (closeCb) {
			var returnedApp = closeCb();
			t.ok(true, 'server close method called');
			t.ok(app.get('closeConnections'), 'closeConnections flag set to true');
			t.equal(returnedApp, app, 'server close callback shd call exitApp which returns app');
		}, eSD2, eSD3, timeoutId;

	t.equal(eSD(err), app, 'exitApp shd be run if server is not passed as arg');

	eSD2 = eS.exitServerDomain(app, server);
	t.equal(eSD2(err), app, 'exitApp shd be run if server does not have close method');

	server.close = close;
	t.equal(eSD2(err), app, 'exitApp shd be run if server does not have serverListening attr');

	app.serverListening = true;
	eSD2(err);
});