/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */


var domainMiddleware = function(domainObj, app) {

	var middleWare = function(req, res, next) {
		domainObj.on('error', domainErrorHandler(app, res));
	};

	return middleWare;
};


module.exports = domainMiddleware;