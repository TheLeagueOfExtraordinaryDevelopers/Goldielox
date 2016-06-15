app.controller('PlayPauseButtonController', ['$scope', 'playback', function($scope, playback) {
  $scope.playback = playback;

  $scope.toggle = function (){
    if (playback.playing) {
      playback.pause();
    } else {
      playback.play();
    }
  }
}]);
