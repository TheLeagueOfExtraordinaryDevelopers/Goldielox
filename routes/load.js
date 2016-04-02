var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');

var loadedTracks = {},
    loadedDex    = {};

router.get('/load', function(req, res) {
  var app    = req.app;
  var db     = app.get('db');
  var home   = app.get('MUSIC_LIBRARY_HOME');
  var dexdir = app.get('DEXDIR');

  var track = req.query['track'];
  track = decodeURIComponent(track);

  var filePath = home+track

  var deck = req.query['deck']
  var deckFilePath = path.join(dexdir, deck)

  if(!fs.existsSync(filePath))
    res.end("Don't have that");

  if(fs.existsSync(deckFilePath))
    // Deck is loaded, unload be proceeding
    unloadDeck(dexdir, deck);

  if(!loadedTracks[track]) {
    fs.symlinkSync(filePath, deckFilePath)

    // Save references
    loadedTracks[track] = deck;
    loadedDex[deck]     = track;

    res.send("/dex/" + deck);
  } else {
    res.send('Skip');
  }

});

function unloadDeck(dexdir, deck) {
  var track, deckFilePath;

  track = loadedDex[deck];

  delete loadedDex[deck];
  delete loadedTracks[track];

  deckFilePath = path.join(dexdir, deck)

  fs.unlinkSync(deckFilePath)
}

router.get('/unload', function(req, res) {
  var app    = req.app;
  var dexdir = app.get('DEXDIR');

  var deck = req.query['deck']

  var deckFilePath = path.join(dexdir, deck)

  fs.unlinkSync(deckFilePath)

  var track = loadedDex[deck]

  // Clear references.
  delete loadedDex[deck];
  delete loadedTracks[track];

  res.send('Like eject')
})


module.exports = router;

// https://nodejs.org/api/fs.html#fs_fs_stat_path_callback
