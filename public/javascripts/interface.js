var audio = document.createElement('audio');

(function(){
  var audio = document.createElement('audio');


  //audio.src = "/media/music/Unknown Artist/Unknown Album/Kim Walker Smith - 10,000 Reasons (Bless The Lord).mp3"
  audio.src = "/media/music/Unknown Artist/Unknown Album/Psalm 91 Sons of Korah.mp3"
  //audio.play()

  //console.log("hello");
})()


var trackHeadEl = document.getElementById('trackHead');
var durationEl = document.getElementById('duration');
var progressSliderEl = document.getElementById('progress-slider');
var volumeSliderEl = document.getElementById('volume-slider');
var trackNameEl = document.getElementById('track-name');
var trackListEl = document.getElementById('track-list');
var playPauseButton = document.getElementById('playPause');
var currentTrackIndex = 0;
var seeking = false;

updateTrackHead = function() {
  if (seeking) { return; }

  var timerange = audio.played;

  if (timerange) {
    /*trackHeadEl.innerHTML = parseInt(audio.played.end(0))*/
    var currentTime = parseInt(audio.currentTime);

    var minutes = parseInt(currentTime / 60)
    var seconds = currentTime - minutes * 60

    if (seconds < 10) // Add leading zero
      seconds = "0" + seconds ;

    trackHeadEl.innerHTML = minutes + ":" + seconds;
    progressSliderEl.value = currentTime;
  }
}

setInterval(updateTrackHead, 1000);

duration = function () {
  audio.duration
}


progressSliderEl.onmousedown = function () {
  /*seeking = true;*/
}

progressSliderEl.onmouseup = function () {
  /*seeking = false;*/
}

progressSliderEl.onchange = function () {
  audio.currentTime = this.value
}


progressSliderEl.oninput = function () {
  var value = this.value

  var minutes = parseInt(value / 60)
  var seconds = value - minutes * 60

  if (seconds < 10) // Add leading zero
    seconds = "0" + seconds ;

  trackHeadEl.innerHTML = minutes + ":" + seconds;

  audio.currentTime = this.value
}

volumeSliderEl.oninput = function () {
  audio.volume = this.value
}

/*loadTrackByIndex = function(index) {*/
  /*trackListEl.children[index-1];*/
/*}*/

playTrackByIndex = function(index) {
  el = trackListEl.children[index-1].children[0];
  play(el);
}

pause = function () {
  audio.pause()
  playPauseButton.innerHTML = "Play";
  return false;
}

playPause = function () {

  // Hack to get the first song to play when click play button, if a track hadn't already been select to make it current.
  if(currentTrackIndex == 0) {
    playTrackByIndex(1);
    return false;
  }

  if (audio.paused) {
    play();
  } else {
    pause();
  }

}

audio.onloadedmetadata = function () {
  var duration = parseInt(audio.duration);

  var minutes = parseInt(duration / 60)
  var seconds = duration - minutes * 60

  if (seconds < 10) // Add leading zero
    seconds = "0" + seconds

  durationEl.innerHTML = minutes + ":" + seconds;

  progressSliderEl.value = 0;
  progressSliderEl.max = duration;
}

playNextTrack = function () {
  // Play if there is another track hopper.
  console.log(currentTrackIndex);
  if(trackListEl.children[currentTrackIndex]) {
    playTrackByIndex(currentTrackIndex + 1);
  }
}

audio.onended = function () { playNextTrack() }

play = function(el){
  playPauseButton.innerHTML = "Pause";
  if (el == null) {
    audio.play();
    return false;
  }

  audio.src = el.href

  audio.play();

  //trackNameEl.innerHTML = el.innerHTML;

  currentTrackIndex = parseInt(el.getAttribute('index'));

  return false;
};
