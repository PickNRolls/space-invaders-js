var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

class Invader extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = config.speed ? config.speed : new Vec2(1.2, 1.2);
  }

  update() {
    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.arc(this.loc.x.length, this.loc.y.length, 6, 0, 2 * Math.PI);
    c.fillStyle = '#000';
    c.fill();

    c.closePath();
  }
};

module.exports = Invader;
