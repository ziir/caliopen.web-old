var path = require('path');
var http = require('http');
var config = require('../config')(process.env.NODE_ENV);

var defaults = {
  method: 'POST',
  hostname: config.api.host,
  port: config.api.port,
  errorCallback: function (e) {
    if (config.env === 'production') {
      throw new Error('Bad Gateway');
    } else {
      throw e;
    }
  }
};

// Not implemented API side yet
function signup(username, password, callback) {
  var options = Object.assign({
    path: '/api/users'
  }, defaults);

  http.request(options, callback);
}

function authenticate(username, password, callback, errorCallback) {
  var options = {
    body: {
      'username': username,
      'password': password
    },
    path: path.join(
      config.api.prefix, config.api.version, config.api.suffix, config.api.auth
    ),
    method: 'POST',
    hostname: config.api.host,
    port: config.api.port
  };

  console.log(options);

  http.request(options, callback)
    .on('error', errorCallback || options.defaults.errorCallback);
}

// Not implemented API side yet
function refreshAccessToken(refreshToken, uuid, callback) {
  var options = Object.assign({
    path: '/api/access_token/refresh/' + refreshToken
  }, defaults);

  http.request(options, callback);
}

module.exports = {
  refreshAccessToken: refreshAccessToken,
  authenticate: authenticate,
  signup: signup
}
