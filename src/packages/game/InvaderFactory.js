var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

var Invader = require('./Invader');

class InvaderFactory extends RenderableObject {
  constructor(config) {
    super(config);

    this.loc = new Vec2();
    this.period = config.period;
    this.invaders = [];
    this.lastSpawn = Date.now();
    this.spawnInvader();
  }

  spawnInvader() {
    var index = this.invaders.length ? this.invaders.length - 1 : 0;
    var inv = new Invader({
      world: this.world,
      loc: new Vec2(250, 0),
      suicide: () => {
        this.killInvader(index);
      }
    });

    this.invaders.push(inv);
  }

  killInvader(index) {
    delete this.invaders[index];
  }

  update() {
    this.invaders.forEach(inv => inv.update());
    var now = Date.now();
    if (now - this.lastSpawn > this.period) {
      this.spawnInvader();
      this.lastSpawn = now;
    }
  }

  render() {
    this.invaders.forEach(inv => inv.render());
  }
}

module.exports = InvaderFactory;
