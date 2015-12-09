var app = angular.module('goldielox', []);

// Controllers //

//app.controller('Controller', ['$scope', function($scope) {
  //$scope.customer = {
    //name: 'Naomi',
    //address: '1600 Amphitheatre'
  //};
//}]);

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


app.directive('glProgress', function() {
  return {
    replace: true,
    templateUrl: 'templates/progress.html'
  };
});


app.directive('glPlaylist', function() {
  return {
    replace: true,
    templateUrl: 'templates/playlist.html'
  };
});
