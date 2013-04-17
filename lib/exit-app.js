/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _			= require('underscore');
var exitProcess = require('./exit-process');

var exitApp = function (app, err) {
	if (app.get('killingApp') !== true) {
		app.set('killingApp', true);
		return exitProcess(app, err);
	}

	return app;
};

var exitAppDomain = function(app) {

	return function (err) {
		// leave it if it's already being handled
		// or if the server domain has been bound
		return (app.get('serverListening')) ? err : exitApp(app, err);
	};
};

module.exports = {
	exitApp: exitApp,
	exitAppDomain: exitAppDomain
};