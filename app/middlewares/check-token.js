function checkToken(req, res, next) {
  var user = req.user;
  var tokens = user.tokens;

  // FIXME: tokenLooksGood()
  // can we work with this access_token?
  if (
    !tokens['access_token'] || !tokens['refresh_token'] || !tokens['expires_at']
  ) {
    return next(new Error('Invalid tokens'));
  }

  // FIXME: tokenShouldRefresh()
  // is the access_token expired?
  // Or will expire in less than 10min
  if (
    new Date(Date.UTC(tokens['expires_at'])).getTime() <
    new Date().now() + 1000 * 60 * 10
  ) {
    var error = new Error('Expired token');
    error.status = 401;

    return next(error);
    // Refresh the token
  }

  // We can definitely work with these tokens
  req.tokens = tokens;

  next();
}

module.exports = checkToken;
