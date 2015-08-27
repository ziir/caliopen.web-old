var http = require('http');

// FIXME: use config
var defaults = {
  method: 'POST',
  hostname: 'localhost',
  port: 3333
};

function signup(username, password, callback) {
  var options = Object.assign({
    path: '/api/users'
  }, defaults);

  http.request(options, callback);
}

function authenticate(username, password, callback) {
  var options = Object.assign({
    auth: 'user:password',
    path: '/api/authentications'
  }, defaults);

  http.request(options, callback);
}

function refreshAccessToken(refreshToken, uuid, callback) {
  // Not implemented API side yet
  var options = Object.assign({
    path: '/api/access_token/refresh/' + refreshToken
  }, defaults);

  http.request(options, callback);
}

module.exports = {
  refreshAccessToken: refreshAccessToken,
  authenticate: authenticate,
  signup: signup
};
