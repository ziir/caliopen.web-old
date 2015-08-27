function setCookie(req, res, next) {
/*  var cookie = req.cookies && req.cookies[config.cookie.name];*/
  next();
}

module.exports = function makeSetCookie(env) {
  var config = require('../config')(env);
  return setCookie;
};
