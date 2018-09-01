var World = require('../abstract/World');

class Game {
  constructor(canvas) {
    this.world = new World(canvas);
  }

  start() {
    this.world.tick();
  }
}

module.exports = Game;
