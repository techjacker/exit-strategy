var _       = require('underscore'),
    getSet  = require('getter-setter').proto,
    test    = require('tap').test,
    exitApp = require('./../lib/exit-app.js');

var serverListening = true,
	app = {
		killingApp: true,
		env: 'testing'
	},
	err = 'error',
	eA  = exitApp.exitApp,
	eAD = exitApp.exitAppDomain(app);

// decorate app
getSet(app);

test('exitAppDomain()', function(t) {

	t.equal(eAD(err), app, 'app shd be returned if server is NOT listening && killingApp attr = true');

	app.serverListening = true;
	t.equal(eAD(err), err, 'error shd be returned if server is listening && killingApp attr = true');

	t.end();
});

test('exitApp()', function(t) {

	t.equal(eA(app, err), app, 'app shd be returned if killingApp is set to true');

	app.killingApp = 'not true';

	t.equal(eA(app, err), undefined, 'exitProcess shd have been called');
	t.equal(app.killingApp, true, 'killingApp attr shd be set to true if previously false');

	t.end();
});