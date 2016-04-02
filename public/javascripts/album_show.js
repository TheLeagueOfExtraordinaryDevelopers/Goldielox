var audio = document.createElement('audio');
var currentTrackIndex = 0;
var $currentTrackLi = null;


function put(path, data, callback) {

  $.ajax(path, {
    data: data,
    success: callback
  })

}

//Math.trunc(Math.random() * 777)
var user = prompt("Who are you?");
var deck = user + '-decka.mp3'
var loaded = false;

function play(el) {
  // Load the file into deck
  var track = el.href.replace(/.*\/library(.*)/, "$1")

  put('/load', { track: track, deck: deck }, function(response) {
    if (response == 'Skip') {
      var trackListEl = document.getElementById('track-list');

      // Play if there is another track hopper.
      currentTrackIndex = parseInt(el.getAttribute('index'));
      if(trackListEl.children[currentTrackIndex]) {
        el = trackListEl.children[currentTrackIndex].children[1];
        play(el);
      }
    }  else {
      loaded = true;

      audio.src = "/dex/" + deck
      audio.play();

      if ($currentTrackLi) {
        $currentTrackLi.removeClass('playing');
      }

      $lastCurrentTrackLi = $currentTrackLi
      $currentTrackLi = $(el).parent();

      $currentTrackLi.addClass('playing')

      currentTrackIndex = parseInt(el.getAttribute('index'));
    }
  });

  return false;
}

function unloadDeck(deck, callback) {
  put('/unload', {deck: deck}, callback);
}

audio.onended = function () {
  unloadDeck(deck, function() {
    playNextTrack();
  });
}

function playNextTrack() {
  var trackListEl = document.getElementById('track-list');

  // Play if there is another track hopper.
  if(trackListEl.children[currentTrackIndex]) {
    el = trackListEl.children[currentTrackIndex].children[1];
    play(el);
  }
}

function resetProgress($el) {
  var $playButton = $('.play-button', $el)

  var children = $playButton.children();

  var $secondChild = $(children[1]);
  var $thirdChild = $(children[2]);

  $secondChild.css('z-index', 0);
  $secondChild.css('transform', 'rotate(0)')
  $thirdChild.css('transform', 'rotate(0)');
}

function updateProgress() {
  if (!$currentTrackLi) { return };

  var percentage = parseInt(audio.currentTime) / parseInt(audio.duration);

  var $playButton = $('.play-button', $currentTrackLi)

  var children = $playButton.children();

  var $secondChild = $(children[1]);
  var $thirdChild = $(children[2]);

  if(percentage <=  .5) {
    $secondChild.css('z-index', 0);
    $secondChild.css('transform', 'rotate(0)')
    var value = percentage * 360;
    $thirdChild.css('transform', 'rotate(' + value + 'deg)');
  } else {
    $secondChild.css('z-index', 1);
    var value = (percentage * 360) - 180
    $secondChild.css('transform', 'rotate(' + value + 'deg)')
    $thirdChild.css('transform', 'rotate(180deg)')
  }

}

setInterval(updateProgress, 1000);
