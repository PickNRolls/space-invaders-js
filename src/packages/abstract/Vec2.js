var Axis = require('./Axis');

class Vec2 {
  constructor(x, y) {
    this.x = new Axis(x);
    this.y = new Axis(y);
  }
}

module.exports = Vec2;
