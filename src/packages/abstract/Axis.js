class Axis {
  constructor(length) {
    this.length = length ? length : 0;
  }

  reverse() {
    this.length *= -1;
  }

  isNegative() {
    return this.length < 0;
  }
}

module.exports = Axis;
