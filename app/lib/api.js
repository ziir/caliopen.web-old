var http = require('http');
var config = require('../config')(process.env.NODE_ENV);

// FIXME: use config
var defaults = {
  method: 'GET',
  hostname: config.api.host,
  port: config.api.port
};

function call(options, callback) {
  var callOptions = Object.assign(options, defaults);
  http.request(callOptions, callback);
}

module.exports = {
  call: call
};
