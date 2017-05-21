var http = require('http');
var www;

module.exports.startServer = function () {
 console.log('starting test server');
 www = require('../bin/www');
}

module.exports.stopServer = function () {
 console.log('stopping test server');
 www.stopServer
}

module.exports.serverPath = 'lalalala'