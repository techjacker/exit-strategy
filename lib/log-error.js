var logErrors = require('log-errors');

var log = function (err) {
	var	env = this.env || 'production',
		jsonP = (this.jsonP === true) ? 'JsonP' : '';

	if (env !== 'testing') {
		logErrors[env + jsonP](err);
	}
};
// export
module.exports = log;