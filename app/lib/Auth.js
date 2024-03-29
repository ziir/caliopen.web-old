var path = require('path');

var API = require('./api');

var ObjectKeys = Object.keys || require('object-keys');
var ObjectAssign = Object.assign || require('object-assign');

// username, password, callback
function signup(params) {
  var config = this.config;

  return this.query(
    ObjectAssign({
      path: path.join(
        config.api.prefix,
        config.api.version,
        config.api.suffix,
        config.api.user
      )
    }, params)
  );
}

// username, password, response, success, error
function authenticate(params) {
  var config = this.config;

  return this.query(
    ObjectAssign({
      path: path.join(
        config.api.prefix,
        config.api.version,
        config.api.suffix,
        config.api.auth
      )
    }, params)
  );
}

// refreshToken, uuid, callback
function refreshAccessToken(params) {
  var config = this.config;

  return this.query(
    ObjectAssign({
      path: path.join(
        config.api.prefix,
        config.api.version,
        config.api.suffix,
        config.api.tokens
      )
    }, params)
  );
}

var Auth = function(config) {
  if (
    !(this instanceof Auth) ||
    !config ||
    !ObjectKeys(config).length ||
    !config.api
  ) {
    throw new Error(
      'Usage: var auth = new Auth(config { .. api: { hostname, port } .. })'
    );
  }

  this.config = config;

  this.defaults = {
    /* These defaults souldn't need be overidden */
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    hostname: this.config.api.hostname,
    port: this.config.api.port,
    method: 'POST',

    /* But you might want to override these */
    response: function defaultResponseCallback(response) {},
    success: function defaultSuccessCallback(user) {},
    error: function defaultErrorCallback(error) {}
  };
}

Auth.prototype.query = API.query;
Auth.prototype.signup = signup;
Auth.prototype.authenticate = authenticate;
Auth.prototype.refreshAccessToken = refreshAccessToken;

module.exports = Auth;
