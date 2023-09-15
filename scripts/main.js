let round = (num, n) => parseFloat(num.toFixed(n))
let distance = (xy1, xy2) => Math.abs(xy1[0] - xy2[0]) + Math.abs(xy1[1] - xy2[1])
let rand = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min

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