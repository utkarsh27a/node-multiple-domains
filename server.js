var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();
var options = {
	'abc.localhost:8080': 'http://localhost:3000',
	'xyz.localhost:8080': 'http://localhost:8081',
	'test.localhost:8080': 'http://localhost/test'
}

http.createServer(function(req, res) {
	console.log('host',req.headers.host),

	proxy.on('error', function(e) {
		console.log('PROXY ERROR: ', e);
	});
	proxy.web(req, res, {
		target: options[req.headers.host]
	});
}).listen(8080);