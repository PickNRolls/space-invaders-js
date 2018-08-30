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

  _tick() {
    this._update();
    this.render();
    requestAnimationFrame(this._tick.bind(this));
  }

  _update() {
    var objects = this.scene.background.concat(this.scene.front);
    console.log(objects);
  }

  render() {
    this.scene.background.forEach(obj => obj.render());
    this.scene.front.forEach(obj => obj.render());
  }
}

var world = new World();
world.start();
