#Extension Cord

##Overview
Extension cord is an Express middleware step for proxying requests for static files to another location.

##Usage
var express = require('express');
var app = express();

app.use(require('extension-cord')({
	"target": {
      "protocol" : "http",
      "hostname" : "localhost",
      "port": "8000"
    },
    "regex": "jpeg|gif|png|jpg|js|css|ico|woff|svg|ttf|json|map"
}));


## CHANGELOG

###1.0
Initial release with basic functionality.

###1.1
Added all the events that are supported: onOpen, onClose, onError, onProxyReq, onProxyRes.
 