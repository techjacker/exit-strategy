/*jslint nomen: true, plusplus: false, sloppy: true, white:true*/
/*jshint nomen: false, curly: true, plusplus: false, expr:true, undef:true, newcap:true, latedef:true, camelcase:true  */
/*global module: false, iScroll:false, setTimeout: false, document:false, WebKitCSSMatrix:false, _: false, Backbone: false, backbone: false, $: false, define: false, require: false, console: false, window:false */


module.exports = {
	app: require('./exit-app.js'),
	server: require('./exit-server.js'),
	exitProcess: require('./exit-process.js'),
	middleware: {
		closeGracefully: require('./middleware/close-gracefully.js')
	}
};