(function () {
  var app = window.app = angular.module('goldielox', []);

  var playlist = [
    { title: "Kim Walker Smith - 10,000 Reasons (Bless The Lord)", path: "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3" },
    { title: "Psalm 91 Sons of Korah", path: "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3" }
  ]

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
      title: "Spirit Lead Me",
      tracks: [
        { title: "Spirit Lead Me", path: "/media/music/Unknown Artist/Unknown Album/Spirit Lead Me.mp3" }
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

  app.controller('PlaylistController', ['$scope', 'playback', function($scope, playback) {
    //$scope.playlist = playlist;

    $scope.play = function (track) {
      playback.load(track.path)
      playback.play()
    }

    // Load playlist data
    jQuery.getJSON('/playlist.json', function(data) {
      $scope.playlist = data
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

  app.controller('AlbumController', ['$scope', function($scope) {
    $scope.addSong = function (track) {
      // Example code
      playlist.push(track);
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


  app.directive('glPlaylist', function() {
    return {
      replace: true,
      controller: 'PlaylistController',
      templateUrl: 'templates/playlist.html'
    };
  });

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

    updateCurrentTime = function() {
      var currentTime = parseInt(playback.currentTime);

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

  app.run(['spindle', function(spindle) {
    spindle.load(albums);
  }]);


})();
