var Game = require('./packages/game/Game');
var World = require('./packages/abstract/World');

var world = new World(document.getElementById('canvas'));
var game = new Game(world);
window.game = game;
