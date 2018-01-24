require('babel-register');
import Battleship from './battleship.js';

let game = new Battleship(5, [2, 2]);
game.play();
