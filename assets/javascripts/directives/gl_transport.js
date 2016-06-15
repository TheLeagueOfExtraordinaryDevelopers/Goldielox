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
