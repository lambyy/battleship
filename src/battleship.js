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
    this.currentPlayer = 1;
    this.currentBoard = this.board2;
  }

  play() {
    console.log("Player 1 turn. ");
    this.setup([...this.pieces])
      .then(() => {
        this.switchTurns();
        console.log(("Player 2 turn. "));
        return this.setup([...this.pieces]);
      })
      .then(() => this.playTurn())
      .then(() => rl.close());
  }

  // recursively attack target position until a winner is determined
    playTurn() {
    return new Promise((resolve) => {
      // const board = this.currentBoard;
      // const player = (board === this.board2) ? 1 : 2;

      console.log(`Player ${this.currentPlayer} turn to attack.\n`);
      this.currentBoard.display();
      this.recGetPos(this.currentBoard)
        .then((target) => {
          this.attack(target);
          if(this.checkWinner()) {
            return resolve("Game over.");
          }
          return resolve(this.playTurn());
        });

    });
  }

  // attack target on currentBoard and return the result
  attack(pos) {
    const board = this.currentBoard;
    if(board.taken(pos)) {
      console.log("This position is already taken, try again.");
      return "ALREADY TAKEN";
    }

    const ship = board.attack(pos);
    if(!ship) {
      console.log("MISS!");
      return "MISS!";
    } else {
      ship.hit();
      console.log("HIT!");
      if(ship.sunk()) {
        board.sinkShip();
        console.log("A ship has been SUNK!");
        return "SUNK!";
      }
      return "HIT!";
    }
  }

  // return true if all ships on currentBoard have been sunk,
  // otherwise swtich currentBoard
  checkWinner() {
    const board = this.currentBoard;
    const player = (board === this.board2) ? 1 : 2;
    if(board.win()) {
      console.log(`All ships sunk.\nPlayer ${player} WINS!`);
      return true;
    } else {
      console.log(`${board.activeShips} ships remaining.`);
      this.switchTurns();
    }
    return false;
  }

  // recursively setup up one board with provided ship pieces
  setup(ships) {
    return new Promise((resolve) => {
      const board = this.currentBoard;
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
          return resolve(this.setup(ships));
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
    const shipPositions = ship.covers(pos[0], pos[1]);
    return board.placeShip(shipPositions, ship);
  }

  switchTurns() {
    if(this.currentPlayer === 1) {
      this.currentBoard = this.board1;
      this.currentPlayer = 2;
    } else {
      this.currentBoard = this.board2;
      this.currentPlayer = 1;
    }
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
