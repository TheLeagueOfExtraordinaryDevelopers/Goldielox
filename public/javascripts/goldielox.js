var app = angular.module('goldielox', []);

// Controllers //
app.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}]);

// Directives //
app.directive('myCustomer', function() {
  return {
    //template: 'Name: {{customer.name}} Address: {{customer.address}}'
    templateUrl: 'templates/my-customer.html'
  };
});
