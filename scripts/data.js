tileData = {
  "grass": {
    "movementSpeed": 0,
    "prey": [],
    "predators": [],
    "stamina": 0,
    "viewDist": 0,
    "attackDist": 0
  },
  "rabbit": {
    "movementSpeed": 3,
    "prey": ["grass"],
    "predators": ["fox"],
    "stamina": 5,
    "viewDist": 360,
    "attackDist": 20
  },
  "fox": {
    "movementSpeed": 2,
    "prey": ["rabbit"],
    "predators": [],
    "stamina": 6,
    "viewDist": 300,
    "attackDist": 30
  }
}

class AnimalStats {
  constructor() {
    this.health = 30.0 // 5 = Full, 0 = Dead
    this.hunger = 5.0 // 5 = Not Hungry, 0 = Starving
    this.saturation = 20.0 // 20 = Full
    this.exhaustion = 0.0 // 0 = Fine, 9.9 = Tired; Resets at 10
  }
}

class Animal {
  constructor(tileRef, tileId) {
    this.tileRef = tileRef
    this.tileId = tileId
    this.stats = new AnimalStats()
  }
}
