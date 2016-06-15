app.run(['spindle', '$document', 'playback', '$rootScope',  function(spindle, $document, playback, $rootScope) {

  jQuery.getJSON('/albums.json', function(data) {
    var albums = data;
    spindle.load(albums);
  });

  function onkeydown(e) {
    if (e.keyCode == 32) { // space
      playback.togglePlay();
      $rootScope.$digest()
      e.preventDefault();
    }
  }

  $document.on('keydown', onkeydown);

}]);
