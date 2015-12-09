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
    templateUrl: 'templates/goldielox.html'
  };
});

app.directive('glSpindle', function() {
  return {
    templateUrl: 'templates/spindle.html'
  };
});


app.directive('glProgress', function() {
  return {
    templateUrl: 'templates/progress.html'
  };
});
