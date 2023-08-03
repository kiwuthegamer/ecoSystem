let round = (num, n) => parseFloat(num.toFixed(n))

var pausePlayButton = document.createElement("button")
pausePlayButton.id = "pausePlay"
pausePlayButton.innerText = "⏵"

var gamePaused = 1

pausePlayButton.onclick = function(e){
  gamePaused = 1 - gamePaused
  if (gamePaused) {
    pausePlayButton.innerHTML="⏵";
  } else {
    pausePlayButton.innerHTML="⏸";
  }
}

document.body.append(pausePlayButton)