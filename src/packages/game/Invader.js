var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

class Invader extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = config.speed ? config.speed : new Vec2(1, 1);
    this.size = 6;
    this.suicide = config.suicide ? config.suicide : null;
  }

  isVisible() {
    return this.loc.y.length - this.size < this.world.height;
  }

  isSideCollision() {
    return this.loc.x.length < this.size ||
      this.loc.x.length + this.size > this.world.width;
  }

  update() {
    if (!this.isVisible()) this.suicide();

    if (this.isSideCollision()) {
      this.speed.x.reverse();
    }

    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.arc(
      this.loc.x.length,
      this.loc.y.length,
      this.size,
      0,
      2 * Math.PI
    );
    c.fillStyle = '#000';
    c.fill();

    c.closePath();
  }
};

module.exports = Invader;
