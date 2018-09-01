var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

class Protecter extends RenderableObject {
  constructor(config) {
    super(config);
    this.width = 36;
    this.height = 10;
    this.loc = new Vec2(
      (this.world.width - this.width) / 2,
      this.world.height - this.height
    );
    this.speed = new Vec2(1, 0);
  }

  isSideCollision() {
    return this.loc.x.length + this.width > this.world.width ||
      this.loc.x.length < 0;
  }

  changeDirection(d) {
    var isNegative = this.speed.x.isNegative();
    var senseToCall = d === 0 && !isNegative || d === 1 && isNegative;

    if (senseToCall)
      return this.speed.x.reverse();

    return 1;
  }

  update() {
    if (this.isSideCollision()) {
      this.speed.x.reverse();
    }

    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.rect(this.loc.x.length, this.loc.y.length, this.width, this.height);
    c.fillStyle = '#000';
    c.fill();
    c.closePath();
  }
}

module.exports = Protecter;
