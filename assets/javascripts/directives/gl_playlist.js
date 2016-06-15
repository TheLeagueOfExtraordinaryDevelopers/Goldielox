app.directive('glPlaylist', ['$document', 'playlist', function($document, playlist) {

  function link($scope, $el, attrs) {

    function onkeydown(e) {
      // Ensure saving just the title and path
      var tracks = _.map(playlist.tracks, function(track) { return _.pick(track, 'title', 'path') })

      if (e.ctrlKey == true && e.keyCode == 83) { // ctrl-s
        $.ajax({
          type: "PUT",
          url: "/playlist.json",
          contentType: 'application/json',
          data: JSON.stringify(tracks)
        });
      }
    }

    $document.on('keydown', onkeydown);

  }

  return {
    replace: true,
    controller: 'PlaylistController',
    templateUrl: 'templates/playlist.html',
    link: link
  };
}]);
