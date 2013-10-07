var _ 		 = require('underscore');
var logError = require('./log-error.js');
var Log 	 = require('log'),
	log 	 = new Log('emergency');

var exitProcess = function(app, err, proc) {

	var env 		 = app.get('env') || 'production',
		procOverride = proc && _.isFunction(proc.exit);

	if (env !== 'testing') {

		// log
		log.emergency("Exiting Application");
		logError(err);

		// don't exit if we're in test env
		return (procOverride) ? proc.exit(env) : process.exit(1);
	}
};

module.exports = exitProcess;