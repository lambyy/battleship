import Ship from './ship.js';
import Board from './board.js';
import Player from './player.js';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export default class Battleship {
  constructor() {
    this.pieces = [4, 3];
    this.board1 = new Board();
    this.board2 = new Board();
  }

  play() {
    // const setupBoard = (board, ships) => new Promise((resolve) => {
    //   this.setup(board, ships);
    // });

    this.setup(this.board1, [...this.pieces], () => {
      this.setup(this.board2, [...this.pieces], () => {
        rl.close();
        console.log("done");
      });
    });

  }

  setup(board, ships, cb) {
    this.getPos(board, (targetPos) => {
      this.getDir((dir) => {
        const success = this.placeShip(ships[0], dir, targetPos, board);
        if(success) {
          ships.shift();
        } else {
          console.log(`\n\nCould not place ship at ${targetPos}, try again.\n`);
        }
        if(ships.length > 0) {
          this.setup(board, ships, cb);
        } else {
          board.display(false);
          cb();
        }
      });
    });

  }

  placeShip(length, dir, pos, board) {
    const ship = new Ship(length, dir);
    const shipPositions = ship.occupied(pos[0], pos[1]);
    const success = board.placeShip(shipPositions, ship);
    return success;
  }

  getPos(board, cb) {
    board.display(false);
    rl.question("Please enter a target square (i.e., '3,4') ", (pos) => {
      let target = pos.split(',').map(el => parseInt(el));
      if(board.withinGrid(target)) {
        cb(target);
      } else {
        console.log("Invalid target, try again.");
        this.getPos(board, cb);
      }
    });
  }

  getDir(cb) {
    rl.question("Which direction (h, v) should the ship face? ", (dir) => {
      if(dir.toLowerCase() !== "h" && dir.toLowerCase() !== "v") {
        console.log("Invalid direction, try again.");
        this.getDir(cb);
      } else {
        cb(dir);
      }
    });
  }
}
