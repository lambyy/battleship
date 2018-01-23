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
    this.currentBoard = this.board2;
  }

  play() {
    console.log("Player 1 turn. ");
    this.setup(this.board1, [...this.pieces])
      .then(() => {
        console.log(("Player 2 turn. "));
        return this.setup(this.board2, [...this.pieces]);
      })
      .then(() => this.playTurn())
      .then(() => rl.close());
  }

  playTurn() {
    return new Promise((resolve) => {
      const board = this.currentBoard;
      const player = (board === this.board2) ? 1 : 2;

      console.log(`Player ${player} turn to attack.\n`);
      board.display();
      this.recGetPos(board)
        .then((target) => {
          if(board.taken(target)) {
            console.log("This position is already taken, try again.");
            return resolve(this.playTurn());
          }

          const ship = board.attack(target);
          if(!ship) {
            console.log("MISS!")
          } else {
            ship.hit();
            console.log("HIT!");
            if(ship.sunk()) {
              board.sinkShip();
              console.log("A ship has been SUNK!");
            }
          }

          if(board.win()) {
            console.log(`All ships sunk.\nPlayer ${player} WINS!`);
            return resolve("Game over.");
          } else {
            console.log(`${board.activeShips} ships remaining.`);
            this.currentBoard = (player === 1) ? this.board1 : this.board2;
            return resolve(this.playTurn());
          }
        });

    });
  }

  // recursively setup up one board with provided ship pieces
  setup(board, ships) {
    return new Promise((resolve) => {
      let target;
      console.log(`\nPlace your ship of length ${ships[0]}`);
      board.display("setup");
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
          board.display("setup");
          return resolve(board);
        }
      });

    });
  }

  // create new Ship & place on board at target position; return true if successful
  placeShip(length, dir, pos, board) {
    const ship = new Ship(length, dir);
    const shipPositions = ship.occupied(pos[0], pos[1]);
    return board.placeShip(shipPositions, ship);
  }

  // recursively get target input from player until a valid input is given
  recGetPos(board) {
    return new Promise((resolve) => {
      this.getPos(board).then((pos) => {
        resolve(this.validPos(pos, board));
      });
    });
  }

  // get target input from player
  getPos(board) {
    return new Promise((resolve) => {
      rl.question("Please enter a target square (i.e., '3,4') ", (pos) => {
        let target = pos.split(',').map(el => parseInt(el));
        resolve(target);
      });
    });
  }

  // validate target input
  validPos(pos, board) {
    if(board.withinGrid(pos)) {
      return pos;
    }
    console.log("Invalid target, try again.");
    return this.recGetPos(board);
  }

  // recursively get direction input from player until a valid input is given
  recGetDir() {
    return new Promise((resolve) => {
      this.getDir().then((dir) => {
        resolve(this.validDir(dir));
      });
    });
  }

  // get direction input from player
  getDir() {
    return new Promise((resolve) => {
      rl.question("Which direction (h, v) should the ship face? ", (dir) => resolve(dir));
    });
  }

  // validate direction input from player
  validDir(dir) {
    if(dir.toLowerCase() === "h" || dir.toLowerCase() === "v") {
      return dir;
    }
    console.log("Invalid direction, try again.");
    return this.recGetDir();
  }
}
