var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

var Invader = require('./Invader');

class InvaderFactory extends RenderableObject {
  constructor(config) {
    super(config);

    this.loc = new Vec2();
    this.invaders = [];
  }

  spawnInvader() {
    var index = this.invaders.length ? this.invaders.length - 1 : 0;

    var inv = new Invader({
      world: this.world,
      loc: new Vec2(250, 0),
      suicide: () => this.killInvader(index)
    });

    this.invaders.push(inv);
  }

  killInvader(index) {
    this.invaders.splice(index, 1);
  }

  update() {
    this.invaders.forEach(inv => inv.update());
  }

  render() {
    this.invaders.forEach(inv => inv.render());
  }
}

module.exports = InvaderFactory;
