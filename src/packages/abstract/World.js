class AbstractWorld {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = 350;
    this.height = canvas.height = 500;

    this.objects = [];
  }

  addObject(constructor, config) {
    if (!config) config = {};
    config.world = this;
    var obj = new constructor(config);
    this.objects.push(obj);
    return obj;
  }

  tick() {
    this.update();
    this.render();
    requestAnimationFrame(this.tick.bind(this));
  }

  update() {
    this.objects.forEach(obj => obj.update());
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.objects.forEach(obj => obj.render());
  }
};

module.exports = AbstractWorld;
