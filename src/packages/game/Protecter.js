var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

var Shot = require('./Shot');

class Protecter extends RenderableObject {
  constructor(config) {
    super(config);
    this.width = 36;
    this.height = 10;
    this.loc = new Vec2(
      (this.world.width - this.width) / 2,
      this.world.height - this.height
    );
    this.speed = new Vec2(2, 0);
    this.shoots = [];

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.changeDirection(1);
      if (e.key === 'ArrowLeft') this.changeDirection(0);
      if (e.key === ' ') this.shoot();
    });
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

  shoot() {
    var shot = new Shot({
      world: this.world,
      loc: new Vec2(
        this.loc.x.length + this.width / 2,
        this.loc.y.length - this.height
      )
    });

    this.shoots.push(shot);
  }

  update() {
    if (this.isSideCollision()) {
      this.speed.x.reverse();
    }

    this.shoots.forEach(shot => shot.update());

    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.rect(this.loc.x.length, this.loc.y.length, this.width, this.height);
    c.fillStyle = '#000';
    c.fill();
    c.closePath();

    this.shoots.forEach(shot => shot.render());
  }
}

module.exports = Protecter;
