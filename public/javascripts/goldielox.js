var app = angular.module('goldielox', []);

// Controllers //

app.controller('PlayPauseButtonController', ['$scope', 'playback', function($scope, playback) {
  $scope.label = "Play"

  $scope.toggle = function (){
    if ($scope.label == "Play") {
      playback.play();
      $scope.label = "Pause";
    } else {
      playback.pause();
      $scope.label = "Play";
    }
  }
}]);

// Directives //


app.directive('goldielox', function() {
  return {
    replace: true,
    templateUrl: 'templates/goldielox.html'
  };
});

app.directive('glSpindle', function() {
  return {
    replace: true,
    templateUrl: 'templates/spindle.html'
  };
});

app.directive('glTransport', function() {
  return {
    replace: true,
    templateUrl: 'templates/transport.html'
  };
});

app.directive('glPlaylist', function() {
  return {
    replace: true,
    templateUrl: 'templates/playlist.html'
  };
});

app.directive('glProgress', function() {
  return {
    replace: true,
    templateUrl: 'templates/progress.html'
  };
});

// Services //

// Playback Service handles Playback
app.factory("playback", function () {
  var audio = document.createElement('audio');
  audio.src = "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3"

  var playback = {
    play: function () {
      audio.play();
   },

    pause: function () {
      audio.pause();
    }
  };

  return playback;
});
