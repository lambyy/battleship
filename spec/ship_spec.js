import Ship from '../src/ship.js';

describe('A Ship', () => {
  const horizontalShip = new Ship(2, 'h');
  const verticalShip = new Ship(2, 'v');

  it('has length and orientation', () => {
    expect(horizontalShip.length).toBe(2);
    expect(horizontalShip.orientation).toBe('h');
    expect(verticalShip.length).toBe(2);
    expect(verticalShip.orientation).toBe('v');
  });

  describe('can determine which positions it will occupy', () => {
    it('when the ship is oriented horizontally', () => {
      expect(horizontalShip.covers(0, 0)).toEqual([[0, 0], [0, 1]]);
      expect(horizontalShip.covers(3, 4)).toEqual([[3, 4], [3, 5]]);
    });

    it('when the ship is oriented vertically', () => {
      expect(verticalShip.covers(0, 0)).toEqual([[0, 0], [1, 0]]);
      expect(verticalShip.covers(3, 4)).toEqual([[3, 4], [4, 4]]);
    });

    it('for different ship lengths', () => {
      const longShip = new Ship(5, 'h');
      let coversPos = longShip.covers(0, 0);
      expect(coversPos.length).toEqual(longShip.length);
      expect(coversPos).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);

      coversPos = longShip.covers(3, 4);
      expect(coversPos).toEqual([[3, 4], [3, 5], [3, 6], [3, 7], [3, 8]]);
    });
  });

  describe('when attacked', () => {
    const ship = new Ship(2, 'h');

    beforeEach(() => {
      ship.health = ship.length;
    });

    it('can be hit', () => {
      expect(ship.health).toEqual(2);
      ship.hit();
      expect(ship.health).toEqual(1);
    });

    it('can sink when it has zero health', () => {
      ship.health = 0;
      expect(ship.sunk()).toBe(true);
    });
  });
});
