var Vec2 = require('./Vec2');

class RenderableObject {
  constructor(config) {
    if (!config) throw new Error('No config for Renderable Object');

    this.world = config.world;
    this.loc = config.loc ? config.loc : new Vec2();
  }

  update() {

  }

  render() {

  }
}

module.exports = RenderableObject;
