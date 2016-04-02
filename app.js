var config       = require('./config.js');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var sqlite3      = require('sqlite3').verbose();
var assets       = require('connect-assets');
var jsave        = require('jsave');
const fs         = require('fs');

var db = new sqlite3.Database('goldielox.db');

var routes     = require('./routes/index');
var users      = require('./routes/users');
var loadRoutes = require('./routes/load');

var app = express();

app.set('MUSIC_LIBRARY_HOME', config.MUSIC_LIBRARY_HOME);

var dexdir = path.join(__dirname, 'dex')
app.set('DEXDIR', dexdir);

if(!fs.existsSync(dexdir))
  fs.mkdir(dexdir);

// Clear out dexdir on start
fs.readdir(dexdir, function(err, dex) {
  dex.map(function(deck) {
    fs.unlink(path.join(dexdir, deck));
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set database
app.set('db', db);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(assets({
  paths: [
    'assets/stylesheets'
  ]
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dex', express.static(dexdir));
app.use('/library', express.static(config.MUSIC_LIBRARY_HOME));

app.use('/', routes);
app.use('/users', users);
app.use('/', loadRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
