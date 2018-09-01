var World = require('../abstract/World');

class Game {
  constructor(canvas) {
    this.world = new World(canvas);
  }
}

module.exports = Game;
