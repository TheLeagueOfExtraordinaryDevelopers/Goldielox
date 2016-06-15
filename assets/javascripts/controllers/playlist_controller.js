app.controller('PlaylistController', ['$scope', 'playback', 'playlist', function($scope, playback, playlist) {
  $scope.playlist = playlist

  $scope.play = function (track, el) {
    //playback.load(track.path)
    //playback.play()
    playlist.play(track);
  }

  $scope.remove = function (track) {
    playlist.remove(track);
  }

  $scope.trackCss = function(track) {
    if (playlist.currentTrack == track)
      return "current";
  }

  // Load playlist data
  jQuery.getJSON('/playlist.json', function(data) {
    playlist.tracks = data;
  });

}]);
