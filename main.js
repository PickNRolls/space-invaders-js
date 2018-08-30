class Vector {
  constructor(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  reverseX() { this.x *= -1; }
}

class World {
  constructor() {
    this.scene = {
      background: [],
      front: []
    };
  }

  start() {
    this._tick();
  }

  update() {
    var objects = this.scene.background.concat(this.scene.front);
    if (!objects[0]) throw new Error('No objects to render');
    objects.forEach(obj => obj.update());
  }

  render() {
    this.scene.background.forEach(obj => obj.render());
    this.scene.front.forEach(obj => obj.render());
  }

  addBackground(constructor, config) {
    this._addAny('background', constructor, config);
  }

  addFront(constructor, config) {
    this._addAny('front', constructor, config);
  }

  _addAny(store, constructor, config) {
    if (!config) config = {};
    config.world = this;
    var obj = new constructor(config);
    this.scene[store].push(obj);
  }

  _tick() {
    this.update();
    this.render();
    requestAnimationFrame(this._tick.bind(this));
  }
}

class _Object {
  constructor(config) {
    this.world = config.world;
    this.loc = new Vector();
  }

  update() {
    
  }

  render() {

  }
}

var world = new World();
world.addFront(_Object);
world.start();
