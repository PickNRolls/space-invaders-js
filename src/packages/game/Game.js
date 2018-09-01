var World = require('../abstract/World');

var Protecter = require('./Protecter');
var InvaderFactory = require('./InvaderFactory');

class Game {
  constructor(canvas) {
    this.world = new World(canvas);
    this.difficulty = 0;
    this.components = {
      invaderFactory: null,
      protecter: null
    };
  }

  start() {
    this.components.invaderFactory = this.world.addObject(InvaderFactory);
    this.components.protecter = this.world.addObject(Protecter);
    this.world.tick();
  }

  levelUp() {
    this.difficulty++;
  }

  levelDown() {
    if (this.difficulty === 0) return;
    this.difficulty--;
  }
}

module.exports = Game;
