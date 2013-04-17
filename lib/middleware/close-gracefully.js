/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */

var Log 	 = require('log'),
	log 	 = new Log('warning');

var middlewareCloseGracefully = function(app) {

	var middle = function(req, res, next) {

		if (app.get('closeConnections') === true) {
			res.setHeader("Connection", "close");
			res.send(502, "Server is in the process of restarting");
			log.warning('Gracefully closure: 502 sent');
		} else {
			return next();
		}
	};
	return middle;
};

module.exports = middlewareCloseGracefully;