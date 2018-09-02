var World = require('../abstract/World');

var Protecter = require('./Protecter');
var InvaderFactory = require('./InvaderFactory');

class Game {
  constructor(canvas) {
    this.world = new World(canvas);
    this.isStarted = false;
    this.difficulty = 0;
    this.components = {
      invaderFactory: null,
      protecter: null
    };

    canvas.addEventListener('click', () => {
      if (!this.isStarted) this.start();
    });
  }

  start() {
    this.isStarted = true;

    this.components.invaderFactory = this.world.addObject(InvaderFactory, {
      period: 2000
    });
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
