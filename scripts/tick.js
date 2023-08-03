function getAnimalInfo(gameData, animalIdx){
  var animalData = tileData[ Object.keys(tileData)[ gameData[animalIdx].tileId ] ]
  var animalStats = gameData[animalIdx].stats

  return [animalData, animalStats]
}

function animalAI(gameData, animalIdx){
  var [animalData, animalStats] = getAnimalInfo(gameData, animalIdx)

  xyChange = [1, 1]
  return xyChange.map(n => n * animalData["movementSpeed"] * round(animalStats.hunger / 5, 2))
}

function calcAnimalStats(gameData, animalIdx, xyChange){
  var [animalData, animalStats] = getAnimalInfo(gameData, animalIdx)

  animalStats.exhaustion += round( (xyChange[0]+xyChange[1]) / animalData["stamina"] , 2)
  
  if (animalStats.exhaustion > 10){
    animalStats.saturation -= round(animalStats.exhaustion / 10, 2)
    animalStats.exhaustion = 0.0
  }

  animalStats.saturation = animalStats.saturation<0 ? 0 : animalStats.saturation
  animalStats.exhaustion = animalStats.exhaustion<0 ? 0 : animalStats.exhaustion

  if (animalStats.saturation < 10){
    animalStats.hunger -= round((animalStats.saturation / 20) / animalData["stamina"], 2)
  }

  animalStats.hunger = animalStats.hunger<0 ? 0 : animalStats.hunger

  if (animalStats.hunger == 0) {
    animalStats.health -= round( animalStats.saturation/20 / animalData["stamina"] , 2)
  }
}

function tick(){
  if(gamePaused){ return }
  for( var i=0;i<tileList.length;i++){

    // Animal Movement
    var xyChange = animalAI(tileList, i)
    tile = tileList[i].tileRef
    tile.style.left = parseInt(tile.style.left) + xyChange[0]
    tile.style.top = parseInt(tile.style.top) + xyChange[1]

    // Animal Stats
    calcAnimalStats(tileList, i, xyChange)

    // Death Check
    if (tileList[i].stats.health <= 0){
      tileList[i].tileRef.remove()
      tileList.splice(i, 1)
    }
  }
}

setInterval(tick, 50)
