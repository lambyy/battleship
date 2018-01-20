require('babel-register');
import Battleship from './battleship.js';
import Board from './board.js';

let b = new Battleship();
// b.board1.display(false);
// let ships = b.setup(b.board1, [...b.pieces]);
b.play();
// let s = new Board();
// console.log(s.checkPos([0,0]));
// console.log(s.checkPos([0,9]));
// console.log(s.checkPos([9,9]));
// console.log(s.checkPos([10,10]));
