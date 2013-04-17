/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var _ 		 = require('underscore');
var logError = require('log-errors');
var Log 	 = require('log'),
	log 	 = new Log('emergency');

var exitProcess = function(app, err, proc) {

	var env 		 = app.get('env') || 'production',
		procOverride = proc && _.isFunction(proc.exit);

	if (env !== 'testing') {

		// log
		log.emergency("Exiting Application");
		logError[env](err);

		// don't exit if we're in test env
		return (procOverride) ? proc.exit(env) : process.exit(1);
	}
};

module.exports = exitProcess;