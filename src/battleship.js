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

  setup(board, ships) {
    return new Promise((resolve) => {
      let target;
      this.recGetPos(board)
      .then((pos) => {
        target = pos;
        return this.recGetDir();
      })
      .then((dir) => {
        const success = this.placeShip(ships[0], dir, target, board);
        if(success) {
          ships.shift();
        } else {
          console.log(`\n\nCould not place ship at ${target}, try again.\n`);
        }
        if(ships.length > 0) {
          return resolve(this.setup(board, ships));
        } else {
          rl.close();
          board.display(false);
          return resolve(board);
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

  recGetPos(board) {
    return new Promise((resolve) => {
      this.getPos(board).then((pos) => {
        resolve(this.validPos(pos, board));
      });
    });
  }

  getPos(board) {
    return new Promise((resolve) => {
      board.display(false);
      rl.question("Please enter a target square (i.e., '3,4') ", (pos) => {
        let target = pos.split(',').map(el => parseInt(el));
        resolve(target);
      });
    });
  }

  validPos(pos, board) {
    if(board.withinGrid(pos)) {
      return pos;
    }
    console.log("Invalid target, try again.");
    return this.recGetPos(board);
  }

  recGetDir() {
    return new Promise((resolve) => {
      this.getDir().then((dir) => {
        resolve(this.validDir(dir));
      });
    });
  }

  getDir() {
    return new Promise((resolve) => {
      rl.question("Which direction ", (dir) => resolve(dir));
    });
  }

  validDir(dir) {
    if(dir.toLowerCase() === "h" || dir.toLowerCase() === "v") {
      return dir;
    }
    console.log("Invalid direction, try again.");
    return this.recGetDir();
  }
}
