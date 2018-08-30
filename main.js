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

class GameDifficulty {
  constructor(maxLevel) {
    this.maxLevel = maxLevel ? maxLevel + 1 : 11;
    this.state = 1;
  }

  levelUp(on) {
    if (this.maxLevel - 1 === this.state) return;

    if (!on) return this.state++;
    this.state -= on;
  }

  levelDown(on) {
    if (this.state === 1) return;

    if (!on) return this.state--;
    this.state -= on;
  }
}

class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = 300;
    this.height = canvas.height = 300;

    this.scene = {
      background: [],
      front: []
    };

    this.tickCallbacks = [];
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
    this.ctx.clearRect(0, 0, this.width, this.height);
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

  _addToTick(fn) {
    this.tickCallbacks.push(fn);
  }

  _tick() {
    this.update();
    this.render();
    this.tickCallbacks.forEach(fn => fn());
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


// Game classes =======================



class SpaceInvaderWorld extends World {
  constructor(config) {
    super(config);
    this.height = this.canvas.height = 500;
    this.difficulty = new GameDifficulty(100);
    this.invaderTime = {
      last: Date.now(),
      period: (this.difficulty.maxLevel - this.difficulty.state) * 20
    };

    this._addToTick(this.renderInvader.bind(this));
  }

  renderInvader() {
    var {last, period} = this.invaderTime;
    var now = Date.now();
    if (last && now - period > last) {
      this.addFront(Invader);
      this.invaderTime.last = Date.now();
    }
  }
}

class Invader extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = new Vector(1, 1);
  }

  update() {
    this.loc.add(this.speed);
  }

  render() {
    var ctx = this.world.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
  }
}

var world = new SpaceInvaderWorld(document.getElementById('canvas'));
world.addFront(Invader);
world.start();
