var app = angular.module('goldielox', []);

// Controllers //

app.controller('PlayPauseButtonController', ['$scope', function($scope) {
  $scope.label = "Play"

  $scope.toggle = function (){
    if ($scope.label == "Play") {
      $scope.label = "Pause"
    } else {
      $scope.label = "Play"
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
