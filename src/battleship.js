import Ship from './ship.js';
import Board from './board.js';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const clear = require('clear');

export default class Battleship {
  constructor(size = 10, pieces = [3, 2, 2]) {
    this.pieces = pieces;

    this.board1 = new Board(size);
    this.board2 = new Board(size);
    this.currentPlayer = 1;
    this.currentBoard = this.board2;
  }

  play() {
    clear();
    console.log("BEGIN BATTLESHIP!");
    console.log("PLAYER 1 TURN. Setup your board.");
    this.setup([...this.pieces])
      .then(() => {
        this.switchTurns();
        console.log(("PLAYER 2 TURN. Setup your board."));
        return this.setup([...this.pieces]);
      })
      .then(() => {
        this.switchTurns();
        console.log("The boards have been setup!");
        return this.playTurn();
      })
      .then(() => rl.close());
  }

  // recursively attack target position until a winner is determined
    playTurn() {
    return new Promise((resolve) => {
      const board = this.currentBoard;

      console.log(`PLAYER ${this.currentPlayer} TURN TO ATTACK.`);
      console.log(`${board.activeShips} ships remaining.\n`);
      board.display();
      this.recGetPos(board)
        .then((target) => {
          clear();
          const result = this.attack(target);
          if(this.checkWinner()) return resolve("Game over.");
          if (result !== "ALREADY TAKEN") this.switchTurns();
          return resolve(this.playTurn());
        });

    });
  }

  // attack target on currentBoard and return the result
  attack(pos) {
    const board = this.currentBoard;
    if(board.taken(pos)) {
      console.log("This position is already taken, try again.\n");
      return "ALREADY TAKEN";
    }

    const ship = board.attack(pos);
    if(!ship) {
      console.log("MISS!\n");
      return "MISS!";
    } else {
      ship.hit();
      console.log("HIT!\n");
      if(ship.sunk()) {
        board.sinkShip();
        console.log("A ship has been SUNK!");
        console.log(`${board.activeShips} ships remaining.\n`);
        return "SUNK!";
      }
      return "HIT!";
    }
  }

  // return true if all ships on currentBoard have been sunk,
  // otherwise swtich currentBoard
  checkWinner() {
    const board = this.currentBoard;
    if(board.win()) {
      console.log(`All ships have been sunk.\nPlayer ${this.currentPlayer} WINS!`);
      return true;
    }
    return false;
  }

  // recursively setup up one board with provided ship pieces
  setup(ships) {
    return new Promise((resolve) => {
      const board = this.currentBoard;
      let target;
      console.log(`Place your ship of length ${ships[0]}\n`);
      board.display("setup");
      this.recGetPos(board)
      .then((pos) => {
        target = pos;
        return this.recGetDir();
      })
      .then((dir) => {
        clear();
        const success = this.placeShip(ships[0], dir, target, board);
        if(success) {
          ships.shift();
        } else {
          console.log(`Could not place ${(dir === "h") ? 'horizontal' : 'vertical' } ship at ${target}, try again.\n`);
        }
        if(ships.length > 0) {
          return resolve(this.setup(ships));
        } else {
          // board.display("setup");
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
    dir = dir.toLowerCase();
    if(dir === "h" || dir === "v") {
      return dir;
    }
    console.log("Invalid direction, try again.");
    return this.recGetDir();
  }
}
