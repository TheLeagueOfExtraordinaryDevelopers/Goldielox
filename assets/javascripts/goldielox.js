//= require_self
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./factories
//= require goldielox-run.js

window.app = angular.module('goldielox', []);

(function () {

  // Controllers //

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


})();
