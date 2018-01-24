import Battleship from '../src/battleship.js';
import Board from '../src/board.js';
import Ship from '../src/ship.js';

describe("A Battleship game", () => {
  const game = new Battleship();

  describe('placing a ship on the board', () => {
    const board = new Board();

    it('returns true if successful', () => {
      expect(game.placeShip(2, 'h', [0, 0], board)).toBe(true);
    });

    it('returns false if unsuccessful', () => {
      expect(game.placeShip(2, 'h', [0, 0], board)).toBe(false);
    });

  });

  describe('attack', () => {
    const board = new Board();
    const ship = new Ship(2, 'h');
    board.placeShip([[0, 0], [0, 1]], ship);
    game.currentBoard = board;

    it('returns if it missed', () => {
      expect(game.attack([0, 2])).toEqual("MISS!");
    });

    it('returns if it hit a ship', () => {
      expect(game.attack([0, 0])).toEqual("HIT!");
    });

    it('will sink a ship if it loses all health', () => {
      expect(game.attack([0, 1])).toEqual("SUNK!");
    });

    it('returns if the position has already been taken', () => {
      expect(game.attack([0, 0])).toEqual("ALREADY TAKEN");
      expect(game.attack([0, 2])).toEqual("ALREADY TAKEN");
    });
  });

  describe('win', () => {
    it('determines the winner when all ships on a board are sunk', () => {
      const board = new Board();
      board.activeShips = 1;
      game.currentBoard = board;

      expect(game.checkWinner()).toBe(false);

      board.activeShips = 0;
      expect(game.checkWinner()).toBe(true);
    });

  });
});
