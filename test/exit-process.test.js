var _ 	 = require('underscore'),
	getSet = require('getter-setter').proto,
	test = require('tap').test,
	exitP = require('./../lib/exit-process.js');

var app = {
		killingApp: true,
		env: 'testing',
	},
	proc = {
		exit: function (env) {
			return env;
		}
	},
	err = 'error';

// decorate app
getSet(app);

test('exit-process.js tests', function(t) {

	t.equal(exitP(app, err), undefined, 'process shd not exit if in testing env');
	app.env = '';
	t.equal(exitP(app, err, proc), 'production', 'default environment shd be production');

	t.end();
});