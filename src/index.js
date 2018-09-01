var Game = require('./packages/game/Game');
var World = require('./packages/abstract/World');

var game = new Game(document.getElementById('canvas'));
window.game = game;
