var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var nunjucks      = require('nunjucks') 


var middlewares = require('./middlewares');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));

// view engine setup
app.set('view engine', 'html');
// Nunjucks options
// See https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  watch: (app.get('env') === 'development'),
  express: app
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(middlewares['404']);
// error handler
app.use(middlewares['error']);

module.exports = app;
