var Vec2 = require('./Vec2');

class RenderableObject {
  constructor(config) {
    this.loc = config.loc ? new Vec2();
  }

  update() {

  }

  render() {

  }
}

module.exports = RenderableObject;
