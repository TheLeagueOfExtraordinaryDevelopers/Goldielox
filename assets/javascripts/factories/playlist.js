app.factory("playlist", ['playback', function(playback) {

  playback.bind('ended', function () {
    // Play next track
    playlist.playNextSong();
  });

  var playlist = {
    currentTrack: null,
    loop: true,
    tracks: [],

    remove: function(track) {
      // Find by name
      var index = this.tracks.indexOf(track);
      this.tracks.splice(index, 1);
    },

    play: function (track) {
      var index = this.tracks.indexOf(track);
      this.currentTrack = track;

      playback.load(track);
      playback.play()
    },

    playNextSong: function() {
      var index = this.tracks.indexOf(this.currentTrack);

      this.currentTrack = this.tracks[index+1];

      if (this.currentTrack) {
        playback.load(this.currentTrack)
        playback.play()
      } else {
        if (this.loop) { // Start back at beginning if looping
          this.currentTrack = this.tracks[0];

          playback.load(this.currentTrack)
          playback.play()
        }
      }
    }

  };

  return playlist;
}]);
