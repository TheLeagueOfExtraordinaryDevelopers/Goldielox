var audio = document.createElement('audio');
var currentTrackIndex = 0;
var $currentTrackLi = null;


function play(el) {
  audio.src = el.href
  audio.play();

	if ($currentTrackLi) {
		$currentTrackLi.removeClass('playing');
	}

	$currentTrackLi = $(el).parent();

	$currentTrackLi.addClass('playing')
  currentTrackIndex = parseInt(el.getAttribute('index'));

  return false;
}

audio.onended = function () { playNextTrack() }

function playNextTrack() {
  var trackListEl = document.getElementById('track-list');

  // Play if there is another track hopper.
  if(trackListEl.children[currentTrackIndex]) {
		el = trackListEl.children[currentTrackIndex].children[1];
		play(el);
  }
}
