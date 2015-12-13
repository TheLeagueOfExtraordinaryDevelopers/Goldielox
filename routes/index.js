var express = require('express');
var router = express.Router();
var jsave  = require('jsave');


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



router.get('/playlist.json', function(req, res, next) {

  var playlist = jsave.load('playlist.json');

  res.writeHead(200, {"Content-Type": "application/json"});
  var json = JSON.stringify(playlist);
  res.end(json);


  //var playlist = jsave.load('playlist.json');
  //res.send(playlist)


});


// Temporary function to load playlist.
router.get('/load-playlist', function(req, res, next) {

  var playlist = [
    { title: "Kim Walker Smith - 10,000 Reasons (Bless The Lord)", path: "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3" },
    { title: "Psalm 91 Sons of Korah", path: "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3" }
  ]

  jsave(playlist).to('playlist.json');

  playlist.save()

  res.send(playlist)

});

function createPlaylist(req, res, next) {


  var playlist = jsave.load('playlist.json');

  res.send(playlist)

  //res.writeHead(200, {"Content-Type": "application/json"});
  //var json = JSON.stringify(playlist);
  //res.end(json);

};

router.post('/playlist.json', createPlaylist)
//router.put('/playlist/:name.json', updatePlaylist)


router.put('/playlist.json', function(req, res, next) {

  //var playlist = jsave.load("playlist.json");

  //var name = req.params.name
  var playlist = req.body
  jsave(playlist).to('playlist.json');
  res.send(playlist)

  //res.writeHead(200, {"Content-Type": "application/json"});
  //var json = JSON.stringify(playlist);
  //res.end(json);

});

module.exports = router;
