function getAnimalInfo(gameData, animalIdx){
  var animalData = tileData[ Object.keys(tileData)[ gameData[animalIdx].tileId ] ]
  var animalStats = gameData[animalIdx].stats

  return [animalData, animalStats]
}

function getAnimalXY(gameData, animalIdx){
  var animalXY = [ parseInt(gameData[animalIdx].tileRef.style.top), parseInt(gameData[animalIdx].tileRef.style.left) ]
  return animalXY
}

function movementAI(animalPosition, predatorPositions, preyPositions){
  
  var nearestPredator = []
  var nearestPredatorDistance = Infinity
  
  for(var i=0;i<predatorPositions.length;i++){
    distanceTo = distance(animalPosition, predatorPositions[i])
    if (distanceTo < nearestPredatorDistance){
      nearestPredator = predatorPositions[i]
      nearestPredatorDistance = distanceTo
    }
  }

  var nearestPrey = []
  var nearestPreyDistance = Infinity

  for(var i=0;i<preyPositions.length;i++){
    distanceTo = distance(animalPosition, preyPositions[i])
    if (distanceTo < nearestPreyDistance){
      nearestPrey = preyPositions[i]
      nearestPreyDistance = distanceTo
    }
  }

  xyChange = [0, 0]
  targetLoc = []
  
  if(nearestPreyDistance < nearestPredatorDistance) { // Go toward Prey
    targetLoc = nearestPrey
  } else { // Go away from Predator
    targetLoc = [-nearestPredator[0],-nearestPredator[1]]
  }

  targetLocDistance = distance(animalPosition, targetLoc)
  
  xDiff = targetLoc[1] - animalPosition[1]
  yDiff = targetLoc[0] - animalPosition[0]

  xyChange[0] = round( xDiff / targetLocDistance ,0)
  xyChange[1] = round( yDiff / targetLocDistance ,0)

  return xyChange
}

function animalAI(gameData, animalIdx){
  var [animalData, animalStats] = getAnimalInfo(gameData, animalIdx)
  var animalXY = getAnimalXY(gameData, animalIdx)

  var predators = []
  var prey = []
  // console.log(animalStats)
  for(var i=0;i<gameData.length;i++){
    if(i == animalIdx) continue

    distanceToAnimal = distance(animalXY, getAnimalXY(gameData, i))
    // console.log(gameData[i])

    if (distanceToAnimal < animalData["attackDist"] && gameData[i].stats.health != -Infinity) {
      killAnimal(gameData, i)
      animalStats.saturation = 20.0
      break
    }
    if (distanceToAnimal > animalData["viewDist"]) continue
    
    if( animalData["predators"].includes( tiles[gameData[i].tileId] ) ){
      predators.push(getAnimalXY(gameData, i))
    }

    if( animalData["prey"].includes( tiles[gameData[i].tileId] ) ){
      prey.push(getAnimalXY(gameData, i))
    }

    if( animalStats.saturation > 15 && rand(0,10) == 0 ) {
      newAnimal(animalXY, animalData.tileId)
    }

  }

  var xyChange = [0, 0]

  if( predators.length>0 || prey.length>0 ){
    xyChange = movementAI(animalXY, predators, prey)
  } else {
    xyChange = [rand(-4, 4), rand(-4, 4)]
  }

  multiplier = animalData["movementSpeed"] * round(animalStats.hunger / 5, 2)

  return xyChange.map(n => n * multiplier)
}

function calcAnimalStats(gameData, animalIdx, xyChange){
  var [animalData, animalStats] = getAnimalInfo(gameData, animalIdx)
  if(gameData[animalIdx].tileId == 0) return

  animalStats.exhaustion += round( (xyChange[0]+xyChange[1] + 10) / animalData["stamina"] , 2)
  
  if (animalStats.exhaustion > 10){
    animalStats.saturation -= round(animalStats.exhaustion / 10, 2)
    animalStats.exhaustion = 0.0
  }

  animalStats.saturation = animalStats.saturation<0 ? 0 : animalStats.saturation
  animalStats.exhaustion = animalStats.exhaustion<0 || isNaN(animalStats.exhaustion) ? 0 : animalStats.exhaustion

  if (animalStats.saturation < 10){
    animalStats.hunger -= round((animalStats.saturation / 20 + 2) / animalData["stamina"], 2)
  }

  animalStats.hunger = animalStats.hunger<0 ? 0 : animalStats.hunger

  if (animalStats.hunger == 0) {
    animalStats.health -= round( animalStats.saturation/20 + 2 / animalData["stamina"] , 2)
  }
  
}

function killAnimal(tileList, tileI){
  tileList[tileI].tileRef.style.scale = 0
  setTimeout(function(tile){ tile.tileRef.remove(); tileList.splice(tileList.indexOf(tile), 1) } , 1000, tileList[tileI])
  tileList[tileI].stats.health = -Infinity
}

function tick(){
  if(gamePaused){ return }
  for( var i=0;i<tileList.length;i++){
    
    if (tileList[i].stats.health == -Infinity) continue

    // Animal Movement
    var xyChange = animalAI(tileList, i)
    tile = tileList[i].tileRef
    tile.style.left = parseInt(tile.style.left) + xyChange[0]
    tile.style.top = parseInt(tile.style.top) + xyChange[1]
    
    // Animal Stats
    calcAnimalStats(tileList, i, xyChange)

    // Death Check
    if (tileList[i].stats.health <= 0 && tileList[i].tileId != 0){
      tileList[i].tileRef.style.scale = 0
      setTimeout(function(tile){ tile.tileRef.remove(); tileList.splice(tileList.indexOf(tile), 1) } , 1000, tileList[i])
      tileList[i].stats.health = -Infinity
    }
  }
}

setInterval(tick, 50)
