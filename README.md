# Exit Strategy

[![Build Status](https://secure.travis-ci.org/techjacker/exit-strategy.png)](http://travis-ci.org/techjacker/exit-strategy)

- Error event handlers to kill your app.
- Designed to be used with domains.
- Uses [visionmedia's logger](https://github.com/visionmedia/log.js) to print POSIX error codes to STDOUT that will be picked up by [logwatch](http://linux.die.net/man/8/logwatch)


## Full Example

```JavaScript
var	app					= require('express').express(),
	domain				= require('domain'),
	appDomain			= domain.create(),
	exitStrategy		= require('exit-strategy'),
	exitAppDomain		= exitStrategy.app.exitAppDomain,
	exitServerDomain	= exitStrategy.server.exitServerDomain,
	exitApp				= exitAppDomain(app),
	server, exitServer;

// attach error handler
appDomain.on('error', exitApp);

// wrap app execution in domain to deal with uncaught exceptions
appDomain.run(function () {

	// 1. create http server
	server = server.listen(app.get('port'), function() {
		// you need to add this!
		app.set('serverListening', true);
	});

	// 2. replace exitApp with exitServer error handler once inited server
	exitServer = exitServerDomain(app, server);
	appDomain.on('error', exitServer).removeListener('error', exitApp);

	// 3. kill app for serious error evts you catch and broadcast with app.emit('seriousError')
	app.on('seriousError', exitServer);
	process.on('SIGTERM', exitServer);

	// 4. send 502s to new connections if started server shutdown process
	app.use(exitStrategy.middleware.closeGracefully(app));

	// define routes etc
});
```

## Logwatch Setup
- by default logwatch watches all files in /var/log and subdirs
- make sure your app logs to a file in this dir
- logwatch will email you alerts depending upon the --detail level you set it to



## API

### .app.exitServerDomain(app, httpServer) returns -> fn (err)

- app needs get/set methods (see [getter-setter module](https://github.com/techjacker/getter-setter) if you don't want to use express)
- returns error handler function (fn (err))

```JavaScript
var app       	  = require('express').express(),
	appDomain	  = domain.create(),
	exitAppDomain = require('exit-strategy').app.exitAppDomain(app);

var server = server.listen(app.get('port'), function() {
	// you need to add this!
	app.set('serverListening', true);
});
appDomain.on('error', exitServerDomain(app, server));
appDomain.run(function () {
	// run your app - set up routes etc...
});
```

##### what the server domain error handler does:
1. checks if the server is active
2. calls server.close()
3. sets timer to kill app if server.close() takes more than 30s
4. calls exitApp
5. calls exitProcess


### .app.exitAppDomain(app) returns -> fn (err)

- app needs get/set methods (see getter-setter module if you don't want to use express)
- returns error handler function (fn (err))

	```JavaScript
	var app       	  = require('express').express(),
		appDomain	  = domain.create(),
		exitAppDomain = require('exit-strategy').app.exitAppDomain(app);

	appDomain.on('error', exitApp);
	appDomain.run(function () {
		// run your app
	});
	```

##### what the app domain error handler does:
1. if app.get('serverListening') then lets serverDomain handle it
2. sets app flag
```JavaScript
app.set('killingApp', true);
```
3. calls exitProcess


### .exitProcess(app, err)

##### what it does:

1. logs error to STDOUT
2. exits process


### .middleware.closeGracefully(app)

- Middleware to prevent new connections once the exit routine has been initiated.
- If you are load balancing then see [this guide](http://blog.argteam.com/coding/hardening-node-js-for-production-part-3-zero-downtime-deployments-with-nginx/) for configuring nginx to fail over to the next upstream server

```JavaScript
var app = require('express').express(),

// send 502s to new connections if started server shutdown process
app.use(exitStrategy.middleware.closeGracefully(app));
```