var router = require('express').Router();

var seal = require('../lib/seal');
var Auth = require('../lib/Auth');

var objectKeys = Object.keys || require('object-keys');

router.get('/', function root(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function loginPage(req, res, next) {
  res.render('login');
});

router.post('/login', function login(req, res, next) {
  var config = req.config;

  var auth = new Auth(config);

  var errors = {
    username: null,
    password: null,
    body: null
  };

  var values = {
    username: null,
    password: null
  };

  if (!req.body || !objectKeys(req.body).length) {
    errors.body = new Error('Bad request');
    errors.body.status = 400;
  }

  values.username = req.body.username;
  values.password = req.body.password;

  errors.username = !values.username;
  errors.password = !values.errors;

  if (errors.length) {
    return res.render('login', { errors: errors, values: values });
  }

  auth.authenticate({
    username: values.username,
    password: values.password,

    response: function responseCallback(response) {
      if (req.accepts('json')) {
        res.status(response.statusCode);
      }
    },
    success: function successCallback(user) {
      seal.encode(
        user,
        req.config.seal.secret,
        function callback(err, sealed) {
          if (err || !seal) {
            next(err || new Error('Unexpected Error'));
          }
          res.cookie(config.cookie.name, sealed, config.cookie.options);
        }
      );
    },
    error: function errorCallback(error) {
      error = error || new Error('Bad gateway');
      error.status = 502;
      next(error);
    }
  });
});

router.get('/logout', function logout(req, res, next) {
  res.clearCookie(req.config.cookie.name);
  res.render('login', { loggedOut: true });
});

router.get('/recover-password', function recoverPasswordPage(req, res, next) {
  res.render('test');
});

router.post('/recover-password', function recoverPassword(req, res, next) {
  res.render('test');
});

module.exports = router;
