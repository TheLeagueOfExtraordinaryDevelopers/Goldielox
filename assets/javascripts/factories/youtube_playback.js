app.factory("youtubePlayback", ['$rootScope', function ($rootScope) {

  var youtubePlayer;

  YT.ready(function() {
    youtubePlayer = new YT.Player('youtube-player', {
      events: {
        onReady: function (e) {
          youtubePlayback.playerReady = true
          youtubePlayback.trigger('playerReady', e)
        },
        onStateChange: onStateChange
      }
    });
  });


  function onStateChange (e) {

    if(e.data == -1) { // Unstarted
      youtubePlayback.trackLoaded = true
      youtubePlayback.play()
      $rootScope.$digest();
    }

    if(e.data == 1) { // Started
      var duration = parseInt(youtubePlayer.getDuration());
      youtubePlayback.duration = duration;

      var minutes = parseInt(duration / 60)
      var seconds = duration - minutes * 60

      if (seconds < 10) // Add leading zero
        seconds = "0" + seconds

      youtubePlayback.fmtDuration = minutes + ":" + seconds;

      youtubePlayback.trigger('started')
    }

    if(e.data == YT.PlayerState.ENDED) { // Ended
      youtubePlayback.trigger('ended'); // relay
    }

  }


  var youtubePlayback = {
    playerReady: false, // Is the Youtube Player Ready for Calls
    trackLoaded: false,

    load: function (track) {
      this.trackLoaded = false;
      youtubePlayer.loadVideoById(track.youtubeID);
    },

    play: function () {
      this.playing = true;
      youtubePlayer.playVideo();
    },

    pause: function () {
      this.playing = false;
      youtubePlayer.pauseVideo();
    }

  };


  youtubePlayback.__defineGetter__('volume', function() {
    return youtubePlayer.getVolume()/100;
  });

  youtubePlayback.__defineSetter__('volume', function(value) {
    return youtubePlayer.setVolume(value*100);
  });

  youtubePlayback.__defineGetter__('currentTime', function() {
    return youtubePlayer.getCurrentTime();
  });

  youtubePlayback.__defineSetter__('currentTime', function(value) {
    return youtubePlayer.seekTo(value);
  });


  _.extend(youtubePlayback, Backbone.Events);


  return youtubePlayback;

}]);
