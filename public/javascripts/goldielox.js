
var app = angular.module('goldielox', []);


var playlist = [
  { name: "Kim Walker Smith - 10,000 Reasons (Bless The Lord)", path: "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3" },
  { name: "Psalm 91 Sons of Korah", path: "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3" }
]


// Controllers //

app.controller('PlayPauseButtonController', ['$scope', 'playback', function($scope, playback) {
  $scope.playback = playback

  $scope.toggle = function (){
    if (playback.playing) {
      playback.pause();
    } else {
      playback.play();
    }
  }
}]);

app.controller('PlaylistController', ['$scope', 'playback', function($scope, playback) {
  $scope.playlist = playlist;

  $scope.play = function (track) {
    playback.load(track.path)
    playback.play()
  }
}]);

app.controller('SpindleController', ['$scope', function($scope) {
  $scope.addSong = function () {
    playlist.push({ name: "Spirit Lead Me", path: "/media/music/Unknown Artist/Unknown Album/Spirit Lead Me.mp3" });
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
    controller: 'SpindleController',
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
    controller: 'PlaylistController',
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

  var playback = {
    playing: false,

    load: function (path) {
      audio.src = path;
    },

    play: function () {
      this.playing = true;
      audio.play();
   },

    pause: function () {
      this.playing = false;
      audio.pause();
    }

  };

  return playback;
});
