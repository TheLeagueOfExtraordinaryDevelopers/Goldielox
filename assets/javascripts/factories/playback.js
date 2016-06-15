// Playback Service handles Playback
app.factory("playback", ['$rootScope', 'youtubePlayback', function ($rootScope, youtubePlayback) {
  var audio = document.createElement('audio');

  var playback = {
    playing: false,
    duration: 0,
    currentTime: 0,
    activePlayer: 'audio',


    load: function (track) {
      if (track.youtubeID) {
        this.pause()

        youtubePlayback.volume = audio.volume
        this.activePlayer = 'youtube'

        youtubePlayback.load(track)

      } else {
        youtubePlayback.pause()

        audio.volume = youtubePlayback.volume
        this.activePlayer = 'audio'


        audio.src = track.path;
      }

      // Update duration
      //this.duration = parseInt(audio.duration);
    },

    play: function () {
      switch (this.activePlayer) {
        case 'youtube':
          this.playing = true;
          youtubePlayback.play()
          break;
        case 'audio':
          this.playing = true;
          audio.play();
      }
    },

    pause: function () {
      switch (this.activePlayer) {
        case 'youtube':
          this.playing = false;
          youtubePlayback.pause()
          break;
        case 'audio':
          this.playing = false;
          audio.pause();
      }

    },

    togglePlay: function () {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }

    }

  };

  playback.__defineSetter__('volume', function(value) {
    switch(this.activePlayer) {
      case 'youtube':
        youtubePlayback.volume = value
        break;
      case 'audio':
        audio.volume = value;
        break;
    }
  });

  playback.__defineSetter__('currentTime', function(value) {
    switch(this.activePlayer) {
      case 'youtube':
        youtubePlayback.currentTime = value
        break;
      case 'audio':
        audio.currentTime = value;
        break;
    }
  });

  playback.__defineGetter__('volume', function() {
    switch(this.activePlayer) {
      case 'youtube':
        return youtubePlayback.volume;
      case 'audio':
        return audio.volume;
    }
  });

  playback.__defineGetter__('currentTime', function() {
    switch(this.activePlayer) {
      case 'youtube':
        return youtubePlayback.currentTime;
      case 'audio':
        return audio.currentTime;
    }
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

  youtubePlayback.bind('started', function (e) {
    playback.duration    = youtubePlayback.duration;
    playback.fmtDuration = youtubePlayback.fmtDuration;
    $rootScope.$digest();
  });

  youtubePlayback.bind('ended', function (e) {
    playback.trigger('ended'); // relay
  });

  audio.addEventListener('ended', function () {
    playback.trigger('ended'); // relay
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

  _.extend(playback, Backbone.Events);

  setInterval(updateCurrentTime, 1000);

  return playback;
}]);
