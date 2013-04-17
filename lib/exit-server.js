/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global clearTimeout: false, module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _		 = require('underscore');
var exitApp  = require('./exit-app').exitApp;
var Log 	 = require('log'),
	log 	 = new Log('critical');

var exitServer = function(app, server, err) {

	// make sure we close down within 30 seconds
	// But don't keep the process open just for that!
	// unref added in node.js v0.10
	var killtimer = setTimeout(exitApp, 30000, app, err);
	_.isFunction(killtimer.unref) && killtimer.unref();

	app.set('closeConnections', true);

	server.close(function() {
		log.critical('Closed out remaining server connections');
		clearTimeout(killtimer);
		return exitApp(app, err);
	});
	return killtimer;
};

var exitServerDomain = function(app, server) {

	return function (err) {

		var	serverActive = server && _.isFunction(server.close) && app.get('serverListening');

		// if server active then close out existing connections
		// before killing the app
		return (serverActive) ? exitServer(app, server, err) : exitApp(app, err);
	};
};


module.exports = {
	exitServer: exitServer,
	exitServerDomain: exitServerDomain
};