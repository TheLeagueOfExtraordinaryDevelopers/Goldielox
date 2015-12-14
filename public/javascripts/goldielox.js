(function () {
  var app = window.app = angular.module('goldielox', []);

  var albums = [
    {
      title: "When Christmas Comes",
      tracks: [
        { title: "Tell Me the Story of Jesus" },
        { title: "Silent Night" },
        { title: "Angels We Have Heard On High" },
        { title: "It's Beginning to Look a Lot Like Christmas" },
        { title: "I'll Be Home for Christmas" },
        { title: "The First Noel" },
        { title: "Away in a Manger" },
        { title: "Have Yourself a Merry Little Christmas" },
        { title: "Let it Snow" },
        { title: "O Come, O Come, Emmanuel" },
        { title: "O Come All Ye Faithful" },
        { title: "O Holy Night" },
        { title: "Carol of the Bells" },
        { title: "Winter Wonderland" },
        { title: "Rudolph the Red-Nosed Reindeer" },
        { title: "White Christmas" },
        { title: "The Christmas Song" }
      ],
      cover_path: "/library/When Christmas Comes/cover.png"
    },
    {
      title: "Gospel",
      tracks: [
        { title: "Spirit Lead Me", path: "/media/music/Unknown Artist/Unknown Album/Spirit Lead Me.mp3" },
        { title: "Kim Walker Smith - 10,000 Reasons (Bless The Lord)", path: "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3" },
        { title: "Psalm 91 Sons of Korah", path: "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3" },
        { title: "You are Good", path: "/media/music/Unknown%20Artist/Unknown%20Album/YOU%20ARE%20GOOD%20Lakewood%20Church%20Worship%20Video%20w-lyrics.mp3" },
        { title: "This is my Desire", path: "/media/music/Unknown%20Artist/Unknown%20Album/This%20is%20my%20desire%20-%20Michael%20W%20Smith.mp3" },
        { title: "In Jesus Name", path: "/media/music/Unknown%20Artist/Unknown%20Album/In%20Jesus%20Name.mp3" }
      ],
      cover_path: "/library/Spirit Lead Me/cover.jpg"
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

  app.controller('SpindleController', ['$scope', function($scope) {
    //$scope.flippers = flippers
  }]);

  app.controller('ProgressController', ['$scope', 'playback', function($scope, playback) {
    $scope.playback = playback;
  }]);

  app.controller('FlipperController', ['$scope', function($scope) {
  }]);

  app.controller('AlbumController', ['$scope', 'playlist', function($scope, playlist) {
    $scope.addSong = function (track) {
      // Example code
      playlist.tracks.push(track);
      //playlist.push({ title: track.title, path: "/media/music/Unknown Artist/Unknown Album/Spirit Lead Me.mp3" });
    }
  }]);

  // Directives //

  app.directive('goldielox', function() {
    return {
      replace: true,
      templateUrl: 'templates/goldielox.html'
    };
  });

  app.directive('glSpindle', ['spindle', '$document', '$compile', function(spindle, $document, $compile) {

    function link ($scope, element, attrs) {

      var $albumsScrollTrackEl = element.find(".albums-scroll-track")

      function onkeydown(e) {
        if (e.keyCode == 37) { // left arrow
          $scope.$emit('spindle:flipLeft');
        } else if (e.keyCode == 39) { // right arrow
          $scope.$emit('spindle:flipRight');
        }
      }

      var onkeydownTrottled = _.throttle(onkeydown, 250)

      $document.on('keydown', onkeydownTrottled);

      function loadSpindle() {
        // TODO: Load the Spindle Here.


        _.each(spindle.flippers, function(flipper) {

          // Need to compile of get an directive instance... As per http://stackoverflow.com/a/16657166
          var flipperEl = angular.element(document.createElement('li'))
          //flipper[0].setAttribute('gl-flipper','')

          flipperEl.attr('gl-flipper', '');

          var flipperScope = $scope.$new()
          flipperScope.flipper = flipper

          var el = $compile(flipperEl)(flipperScope);

          $albumsScrollTrackEl.append(flipperEl);
        });
      }

      loadSpindle();

      //spindle.bind('load', loadSpindle);

      // listen for arrow keys
      $scope.$on('spindle:flipLeft', function () {
        var el = $albumsScrollTrackEl.children().first().detach()
        $albumsScrollTrackEl.append(el);
        //flippers.push({});
        //flippers.shift();
      });

      $scope.$on('spindle:flipRight', function () {
        var el = $albumsScrollTrackEl.children().last().detach()
        $albumsScrollTrackEl.prepend(el);
        //flippers.unshift({});
        //flippers.pop();
      });

      element.on('$destroy', function() {
        $document.off('keydown', onkeydown);
        //spindle.unbind('load', loadSpindle);
      });

    }

    return {
      replace: true,
      controller: 'SpindleController',
      templateUrl: 'templates/spindle.html',
      link: link
    };
  }]);



  app.directive('glTransport', ['playback', function(playback) {

    function link(scope, $el, attrs) {
      var el = $el[0];

      $volumeSliderEl = angular.element(el.querySelector('#volume-slider'))

      $volumeSliderEl.on('input', function () {
        playback.volume = this.value
      });

    }

    return {
      replace: true,
      templateUrl: 'templates/transport.html',
      link: link
    };
  }]);


  app.directive('glPlaylist', ['$document', 'playlist', function($document, playlist) {

    function link($scope, $el, attrs) {

      function onkeydown(e) {
        if (e.ctrlKey == true && e.keyCode == 83) { // ctrl-s
          $.ajax({
            type: "PUT",
            url: "/playlist.json",
            contentType: 'application/json',
            data: JSON.stringify(playlist.tracks)
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

  app.directive('glProgress', function(playback) {
    return {
      replace: true,
      controller: 'ProgressController',
      templateUrl: 'templates/progress.html'
    };
  });

  app.directive('glFlipper', function() {
    return {
      replace: true,
      controller: 'FlipperController',
      templateUrl: 'templates/flipper.html'
    };
  });

  app.directive('glAlbum', function() {
    return {
      replace: true,
      controller: 'AlbumController',
      templateUrl: 'templates/album.html',
      scope: {
          album: '='
      }
    };
  });

  // Services //


  app.factory("spindle", function ($rootScope) {

    var spindle = {
      flippers: [],

      // Load spindle full of albums
      load: function(albums) {
        //this.flippers = {};

        this.flippers = [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        ];


        // Loading albums for testing.
        this.flippers[5].sideTwo = albums[0];
        this.flippers[6].sideOne = albums[1];

        this.trigger('load');
      }

    }

    _.extend(spindle, Backbone.Events);

    return spindle;
  });

  app.factory("playlist", ['playback', function(playback) {

    playback.bind('ended', function () {
      // Play next track
      playlist.playNextSong();
    });

    var playlist = {
      currentTrack: null,
      loop: true,
      tracks: [],

      remove: function(track) {
        // Find by name
        var index = this.tracks.indexOf(track);
        this.tracks.splice(index, 1);
      },

      play: function (track) {
        var index = this.tracks.indexOf(track);
        this.currentTrack = track;

        playback.load(track.path)
        playback.play()
      },

      playNextSong: function() {
        var index = this.tracks.indexOf(this.currentTrack);

        this.currentTrack = this.tracks[index+1];

        if (this.currentTrack) {
          playback.load(this.currentTrack.path)
          playback.play()
        } else {
          if (this.loop) { // Start back at beginning if looping
            this.currentTrack = this.tracks[0];

            playback.load(this.currentTrack.path)
            playback.play()
          }
        }
      }

    };

    return playlist;
  }]);


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
      },

      togglePlay: function () {
        if (this.playing) {
          this.pause();
        } else {
          this.play();
        }

      }

    };

    playback.__defineSetter__('volume', function(value) {
      audio.volume = value;
    });

    playback.__defineSetter__('currentTime', function(value) {
      audio.currentTime = value;
    });

    playback.__defineGetter__('volume', function() {
      return audio.volume;
    });

    playback.__defineGetter__('currentTime', function() {
      return audio.currentTime;
    });

    audio.addEventListener('loadedmetadata', function () {
      var duration = parseInt(audio.duration);

      playback.duration = duration;

      var minutes = parseInt(duration / 60)
      var seconds = duration - minutes * 60

      if (seconds < 10) // Add leading zero
        seconds = "0" + seconds

      playback.fmtDuration = minutes + ":" + seconds;

      $rootScope.$digest();
    });

    audio.addEventListener('ended', function () {
      playback.trigger('ended'); // relay
    });

    updateCurrentTime = function() {
      var currentTime = parseInt(playback.currentTime);

      var minutes = parseInt(currentTime / 60)
      var seconds = currentTime - minutes * 60

      if (seconds < 10) // Add leading zero
        seconds = "0" + seconds ;

      playback.fmtCurrentTime = minutes + ":" + seconds;

      $rootScope.$digest();
    }

    _.extend(playback, Backbone.Events);

    setInterval(updateCurrentTime, 1000);

    return playback;
  }]);

  app.run(['spindle', '$document', 'playback', '$rootScope',  function(spindle, $document, playback, $rootScope) {
    spindle.load(albums);

    function onkeydown(e) {
      if (e.keyCode == 32) { // space
        playback.togglePlay();
        $rootScope.$digest()
      }
    }

    $document.on('keydown', onkeydown);


  }]);


})();
