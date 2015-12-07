var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  var app = req.app;
  var db  = app.get('db');

  //db.each("SELECT id, name, path FROM tracks", function(err, row) {

  //}


  db.all("SELECT id, name, path FROM tracks", function(err, rows) {
    var tracks = rows;

    res.render('index', { title: 'Goldielox', tracks: tracks });
  })


  //res.render('index', { title: 'Express', db: db });
});


router.get('/v2', function(req, res, next) {

  var app = req.app;
  var db  = app.get('db');

  //db.each("SELECT id, name, path FROM tracks", function(err, row) {

  //}


  db.all("SELECT id, name, path FROM tracks", function(err, rows) {
    var tracks = rows;

    res.render('interface', { title: 'Goldielox', tracks: tracks });
  })


  //res.render('index', { title: 'Express', db: db });
});

module.exports = router;
