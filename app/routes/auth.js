var auth = require('../lib/auth');
var seal = require('../lib/seal');

var router = require('express').Router();

router.get('/', function root(req, res, next) {
  res.redirect('/login');
});

router.get('/login', function loginPage(req, res, next) {
  res.render('login');
});

router.post('/login', function login(req, res, next) {
  var errors = {
    username: null,
    password: null,
    body: null
  };

  var values = {
    username: null,
    password: null
  };

  if (!req.body || !Object.keys(req.body).length) {
    errors.body = new Error('Bad request');
    errors.body.status = 400;
  }

  values.username = req.body.username;
  values.password = req.body.password;

  if (!values.username) {
    errors.username = true;
  }

  if (!values.password) {
    errors.password = true;
  }

  if (errors.length) {
    return res.render('login', { errors: errors, values: values });
  }

  auth.authenticate(
    values.username,
    values.password,
    function callback(response) {
      seal.encode(
        response.body,
        req.config.seal.secret,
        function callback(err, seal) {
          if (err || !seal) {
            next(err || new Error('Unexpected Error'));
          }
          // FIXME : Use config
          res.cookie(config.cookie.name, seal, { maxAge: 3600 });
        }
      );

      res.status(response.statusCode);
      if (req.accepts('json')) {
        res.json(response);
      } else {
        // FIXME : Use config
        res.redirect('/app');
      }
    }
  ).on('error', function errorCallback(e) {
    next(e);
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
