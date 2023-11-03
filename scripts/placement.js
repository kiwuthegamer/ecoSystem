var selectedTile = 0
tiles = Object.keys(tileData)
tileList = []

function moveTileToMouse(tile, e){
  leftPos = e.offsetX
  topPos = e.offsetY
  tile.style.setProperty("left", leftPos+"px" )
  tile.style.setProperty("top", topPos+"px" )
  return [leftPos,topPos]
}

function setTileSrc(tile){
  tile.src = "assets/"+tiles[selectedTile]+".png"
  return selectedTile
}

var mainElem = document.createElement("div")
mainElem.id = "main"

var ghostMainElem = document.createElement("div")
ghostMainElem.id = "gmain"

ghostTile = document.createElement("img")
ghostTile.draggable = false
setTileSrc(ghostTile)
ghostTile.style.setProperty("z-index", 5)
ghostTile.style.setProperty("opacity", 0.6)
mainElem.appendChild(ghostTile)

function newAnimal(e, tileId){
  var tile = document.createElement("img")
  if(tileId == -1) {
    var tileId = setTileSrc(tile)
  }
  tile.draggable = false
  moveTileToMouse(tile, e)
  tileList.push( new Animal( tile, tileId ) )
  mainElem.appendChild(tile)
}

ghostMainElem.onclick = function(e){  
  newAnimal(e, -1)
}

ghostMainElem.onmousemove = function(e){
  moveTileToMouse(ghostTile, e)
}

ghostMainElem.onwheel = function(e){
  if (e.wheelDelta > 0){ // Backwards
    selectedTile -= 1
  } else { // Forwards
    selectedTile += 1
  }
  selectedTile = (selectedTile<0) ? 0: selectedTile
  selectedTile = (selectedTile>=tiles.length) ? tiles.length-1: selectedTile
  setTileSrc(ghostTile)
}

document.body.appendChild(mainElem)
document.body.appendChild(ghostMainElem)
