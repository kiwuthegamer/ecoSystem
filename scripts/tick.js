function animalAI(gameData, animalIdx){
  animalData = tileData[ Object.keys(tileData)[ gameData[animalIdx].tileId ] ]
  animalStats = gameData[animalIdx].stats

  xyChange = [1, 1]
  return xyChange.map(n => n * animalData["movementSpeed"])
}

function tick(){
  if(gamePaused){ return }
  for( var i=0;i<tileList.length;i++){
    var xyChange = animalAI(tileList, i)
    tile = tileList[i].tileRef
    tile.style.left = parseInt(tile.style.left) + xyChange[0]
    tile.style.top = parseInt(tile.style.top) + xyChange[1]
  }
}

setInterval(tick, 50)
