'use strict';

var httpProxy = require('http-proxy');
var path = require('path');
var url = require('url');
var _ = require('lodash');

var ExtensionCord = function(options) {

	options = _.defaults(options, {
		target: '',
		changeOrigin: true,
		regex: 'jpeg|gif|png|jpg|js|css|ico|woff|svg|ttf|json|map'
	});

	var proxy = httpProxy.createProxyServer({
		target: url.format(options.target),
		changeOrigin: options.changeOrigin || true
	});
	
	if (typeof options.onOpen === 'function') {
		proxy.on('open', options.onOpen);
	}

	if (typeof options.onClose === 'function') {
		proxy.on('close', options.onClose);
	}

	if (typeof options.onError === 'function') {
		proxy.on('error', options.onError);
	}

	if (typeof options.onProxyReq === 'function') {
		proxy.on('proxyReq', options.onProxyReq);
	}

	if (typeof options.onProxyRes === 'function') {
		proxy.on('proxyRes', options.onProxyRes);
	}

	var regExp = new RegExp('\.(' + options.regex + ')$', 'i');
	
	return function(req, res, next) {
		var ext = path.extname(req.url);

		if ( regExp.test(ext) ) {
			proxy.web(req, res);
		} else {
			next();
		}
	};
};

module.exports = ExtensionCord;