(function () {
  var app = angular.module('goldielox', []);


  var playlist = [
    { name: "Kim Walker Smith - 10,000 Reasons (Bless The Lord)", path: "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3" },
    { name: "Psalm 91 Sons of Korah", path: "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3" }
  ]

  var albums = [
    {
      name: "",
      cover_path: "",
      tracks: []
    }
  ];


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
      // Example code
      playlist.push({ name: "Spirit Lead Me", path: "/media/music/Unknown Artist/Unknown Album/Spirit Lead Me.mp3" });
    }
  }]);

  app.controller('ProgressController', ['$scope', 'playback', function($scope, playback) {
    $scope.playback = playback;
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
      controller: 'ProgressController',
      templateUrl: 'templates/progress.html'
    };
  });

  // Services //

  // Playback Service handles Playback
  app.factory("playback", ['$rootScope', function ($rootScope) {
    var audio = document.createElement('audio');

    var playback = {
      playing: false,
      duration: 0,
      currentTime: 0,

      load: function (path) {
        audio.src = path;

        // Update duration
        //this.duration = parseInt(audio.duration);
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

    audio.addEventListener('loadedmetadata', function () {
      var duration = parseInt(audio.duration);

      playback.duration = duration;

      var minutes = parseInt(duration / 60)
      var seconds = duration - minutes * 60

      if (seconds < 10) // Add leading zero
        seconds = "0" + seconds

      playback.fmtDuration = minutes + ":" + seconds;

      playback.currentTime = audio.currentTime;

      $rootScope.$digest();
    });

    updateCurrentTime = function() {
      var currentTime = parseInt(audio.currentTime);

      playback.currentTime = currentTime;

      var minutes = parseInt(currentTime / 60)
      var seconds = currentTime - minutes * 60

      if (seconds < 10) // Add leading zero
        seconds = "0" + seconds ;

      playback.fmtCurrentTime = minutes + ":" + seconds;

      $rootScope.$digest();
    }

    setInterval(updateCurrentTime, 1000);

    return playback;
  }]);

})();
