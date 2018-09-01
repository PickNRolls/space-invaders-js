var Vec2 = require('../abstract/Vec2');
var RenderableObject = require('../abstract/RenderableObject');

class Shot extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = new Vec2(0, -4);
  }

  update() {
    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.arc(this.loc.x.length, this.loc.y.length, 3, 0, 2 * Math.PI);
    c.fillStyle = 'red';
    c.fill();
    c.closePath();
  }
}

module.exports = Shot;
