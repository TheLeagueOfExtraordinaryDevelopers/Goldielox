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
