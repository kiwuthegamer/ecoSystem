tileData = {
  "grass": {
    "movementSpeed": 0,
    "prey": [],
    "predators": [],
    "stats": {
      "hunger": 0.0,
      "health": 5.0
    }
  },
  "rabbit": {
    "movementSpeed": 3,
    "prey": ["grass"],
    "predators": ["fox"],
    "stats": {
      "hunger": 0.0,
      "health": 5.0
    }
  },
  "fox": {
    "movementSpeed": 2,
    "prey": ["rabbit"],
    "predators": [],
    "stats": {
      "hunger": 0.0,
      "health": 8.0
    }
  }
}

class AnimalStats {
  constructor(name) {
    this.health = tileData[name]["stats"]["health"]
    this.hunger = tileData[name]["stats"]["hunger"]
  }
}

class Animal {
  constructor(tileRef, tileId, stats) {
    this.tileRef = tileRef
    this.tileId = tileId
    this.stats = stats
  }
}
