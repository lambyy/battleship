describe('Ship', () => {
  const horizontalShip = new Ship(2, 'h');
  const verticalShip = new Ship(2, 'v');

  it('is an instance of the Ship class', () => {
    expect(horizontalShip).toEqual(jasmine.any(Ship));
  });

  it('has a length and orientation', () => {
    expect(horizontalShip.length).toBe(2);
    expect(horizontalShip.orientation).toBe('h');
    expect(verticalShip.length).toBe(2);
    expect(verticalShip.orientation).toBe('v');
  });

  describe('can determine occupied positions', () => {
    it('when the ship is oriented horizontally', () => {
      expect(horizontalShip.occupied(0, 0)).toEqual([[0, 0], [1, 0]]);
      expect(horizontalShip.occupied(3, 4)).toEqual([[3, 4], [4, 4]]);
    });

    it('when the ship is oriented vertically', () => {
      expect(verticalShip.occupied(0, 0)).toEqual([[0, 0], [0, 1]]);
      expect(verticalShip.occupied(3, 4)).toEqual([[3, 4], [3, 5]]);
    });

    it('for ships of any length', () => {
      const longShip = new Ship(5, 'h');
      let occupiedPos = longShip.occupied(0, 0);
      expect(occupiedPos.length).toEqual(longShip.length);
      expect(occupiedPos).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

      occupiedPos = longShip.occupied(3, 4);
      expect(occupiedPos).toEqual([[3, 4], [4, 4], [5, 4], [6, 4], [7, 4]]);
    });
  });
});
