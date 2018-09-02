/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(/*! ./packages/game/Game */ "./src/packages/game/Game.js");

var game = new Game(document.getElementById('canvas'));
window.game = game;


/***/ }),

/***/ "./src/packages/abstract/Axis.js":
/*!***************************************!*\
  !*** ./src/packages/abstract/Axis.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/packages/abstract/RenderableObject.js":
/*!***************************************************!*\
  !*** ./src/packages/abstract/RenderableObject.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Vec2 = __webpack_require__(/*! ./Vec2 */ "./src/packages/abstract/Vec2.js");

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


/***/ }),

/***/ "./src/packages/abstract/Vec2.js":
/*!***************************************!*\
  !*** ./src/packages/abstract/Vec2.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Axis = __webpack_require__(/*! ./Axis */ "./src/packages/abstract/Axis.js");

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


/***/ }),

/***/ "./src/packages/abstract/World.js":
/*!****************************************!*\
  !*** ./src/packages/abstract/World.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/packages/game/Game.js":
/*!***********************************!*\
  !*** ./src/packages/game/Game.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var World = __webpack_require__(/*! ../abstract/World */ "./src/packages/abstract/World.js");

var Protecter = __webpack_require__(/*! ./Protecter */ "./src/packages/game/Protecter.js");
var InvaderFactory = __webpack_require__(/*! ./InvaderFactory */ "./src/packages/game/InvaderFactory.js");

class Game {
  constructor(canvas) {
    this.world = new World(canvas);
    this.difficulty = 0;
    this.components = {
      invaderFactory: null,
      protecter: null
    };
  }

  start() {
    this.components.invaderFactory = this.world.addObject(InvaderFactory, {
      period: 2000
    });
    this.components.protecter = this.world.addObject(Protecter);
    this.world.tick();
  }

  levelUp() {
    this.difficulty++;
  }

  levelDown() {
    if (this.difficulty === 0) return;
    this.difficulty--;
  }
}

module.exports = Game;


/***/ }),

/***/ "./src/packages/game/Invader.js":
/*!**************************************!*\
  !*** ./src/packages/game/Invader.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Vec2 = __webpack_require__(/*! ../abstract/Vec2 */ "./src/packages/abstract/Vec2.js");
var RenderableObject = __webpack_require__(/*! ../abstract/RenderableObject */ "./src/packages/abstract/RenderableObject.js");

class Invader extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = config.speed ? config.speed : new Vec2(1, 1);
    this.size = 6;
    this.suicide = config.suicide ? config.suicide : null;
  }

  isVisible() {
    return this.loc.y.length - this.size < this.world.height;
  }

  isSideCollision() {
    return this.loc.x.length < this.size ||
      this.loc.x.length + this.size > this.world.width;
  }

  update() {
    if (!this.isVisible()) this.suicide();

    if (this.isSideCollision()) {
      this.speed.x.reverse();
    }

    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.arc(
      this.loc.x.length,
      this.loc.y.length,
      this.size,
      0,
      2 * Math.PI
    );
    c.fillStyle = '#000';
    c.fill();

    c.closePath();
  }
};

module.exports = Invader;


/***/ }),

/***/ "./src/packages/game/InvaderFactory.js":
/*!*********************************************!*\
  !*** ./src/packages/game/InvaderFactory.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Vec2 = __webpack_require__(/*! ../abstract/Vec2 */ "./src/packages/abstract/Vec2.js");
var RenderableObject = __webpack_require__(/*! ../abstract/RenderableObject */ "./src/packages/abstract/RenderableObject.js");

var Invader = __webpack_require__(/*! ./Invader */ "./src/packages/game/Invader.js");

class InvaderFactory extends RenderableObject {
  constructor(config) {
    super(config);

    this.loc = new Vec2();
    this.period = config.period;
    this.invaders = [];
    this.lastSpawn = Date.now();
    this.spawnInvader();
  }

  spawnInvader() {
    var index = this.invaders.length ? this.invaders.length - 1 : 0;
    var inv = new Invader({
      world: this.world,
      loc: new Vec2(250, 0),
      suicide: () => {
        this.killInvader(index);
      }
    });

    this.invaders.push(inv);
  }

  killInvader(index) {
    delete this.invaders[index];
  }

  update() {
    this.invaders.forEach(inv => inv.update());
    var now = Date.now();
    if (now - this.lastSpawn > this.period) {
      this.spawnInvader();
      this.lastSpawn = now;
    }
  }

  render() {
    this.invaders.forEach(inv => inv.render());
  }
}

module.exports = InvaderFactory;


/***/ }),

/***/ "./src/packages/game/Protecter.js":
/*!****************************************!*\
  !*** ./src/packages/game/Protecter.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Vec2 = __webpack_require__(/*! ../abstract/Vec2 */ "./src/packages/abstract/Vec2.js");
var RenderableObject = __webpack_require__(/*! ../abstract/RenderableObject */ "./src/packages/abstract/RenderableObject.js");

var Shot = __webpack_require__(/*! ./Shot */ "./src/packages/game/Shot.js");

class Protecter extends RenderableObject {
  constructor(config) {
    super(config);
    this.width = 36;
    this.height = 10;
    this.loc = new Vec2(
      (this.world.width - this.width) / 2,
      this.world.height - this.height
    );
    this.speed = new Vec2(2, 0);
    this.shoots = [];

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.changeDirection(1);
      if (e.key === 'ArrowLeft') this.changeDirection(0);
      if (e.key === ' ') this.shoot();
    });
  }

  isSideCollision() {
    return this.loc.x.length + this.width > this.world.width ||
      this.loc.x.length < 0;
  }

  changeDirection(d) {
    var isNegative = this.speed.x.isNegative();
    var senseToCall = d === 0 && !isNegative || d === 1 && isNegative;

    if (senseToCall)
      return this.speed.x.reverse();

    return 1;
  }

  shoot() {
    var shot = new Shot({
      world: this.world,
      loc: new Vec2(
        this.loc.x.length + this.width / 2,
        this.loc.y.length - this.height
      )
    });

    this.shoots.push(shot);
  }

  update() {
    if (this.isSideCollision()) {
      this.speed.x.reverse();
    }

    this.shoots.forEach(shot => shot.update());

    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.rect(this.loc.x.length, this.loc.y.length, this.width, this.height);
    c.fillStyle = '#000';
    c.fill();
    c.closePath();

    this.shoots.forEach(shot => shot.render());
  }
}

module.exports = Protecter;


/***/ }),

/***/ "./src/packages/game/Shot.js":
/*!***********************************!*\
  !*** ./src/packages/game/Shot.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Vec2 = __webpack_require__(/*! ../abstract/Vec2 */ "./src/packages/abstract/Vec2.js");
var RenderableObject = __webpack_require__(/*! ../abstract/RenderableObject */ "./src/packages/abstract/RenderableObject.js");

class Shot extends RenderableObject {
  constructor(config) {
    super(config);
    this.speed = new Vec2(0, -4);
  }

  update() {
    this.loc.add(this.speed);
  }

  render() {
    var c = this.world.ctx;

    c.beginPath();
    c.arc(this.loc.x.length, this.loc.y.length, 3, 0, 2 * Math.PI);
    c.fillStyle = 'red';
    c.fill();
    c.closePath();
  }
}

module.exports = Shot;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map