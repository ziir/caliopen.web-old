function errorMiddleware(err, req, res, next) {
  if (server.get('env') === 'development') {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }
}

module.exports = errorMiddleware
