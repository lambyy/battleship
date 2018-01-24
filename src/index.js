require('babel-register');
import Battleship from './battleship.js';

const boardSize = 5;
const shipPieces = [2, 2];
let game = new Battleship(boardSize, shipPieces);
game.play();
