class Vector {
  constructor(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  reverseX() { this.x *= -1; }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
}

class World {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');

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

class RenderableObject {
  constructor(config) {
    this.world = config.world;
    this.loc = new Vector();
  }

  update() {
    
  }

  render() {

  }
}

class Invader extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = new Vector(1, 1);
  }

  update() {
    this.loc.add(this.speed);
    console.log(this.loc);
  }

  render() {
    var ctx = this.world.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
  }
}

var world = new World(document.getElementById('canvas'));
world.start();
