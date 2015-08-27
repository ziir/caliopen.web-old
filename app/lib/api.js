var http = require('http');

// FIXME: use config
var defaults = {
  method: 'GET',
  hostname: 'localhost',
  port: 3333
};

function call(options, callback) {
  var callOptions = Object.assign(options, defaults);

  http.request(callOptions, callback);
}

module.exports = {
  call: call
};
