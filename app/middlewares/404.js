function error404Middleware(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

module.exports = error404Middleware;
