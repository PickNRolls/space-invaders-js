var Axis = require('./Axis');

class Vec2 {
  constructor(x, y) {
    this.x = new Axis(x);
    this.y = new Axis(y);
  }

  add(vec) {
    this.x.length += vec.x.length;
    this.y.length += vec.y.length;

    return this;
  }
}

module.exports = Vec2;
