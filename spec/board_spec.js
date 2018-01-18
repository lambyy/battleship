describe('A Board', () => {
  const board = new Board();

  describe('initializes', () => {
    const smallBoard = new Board(3);

    it('with an empty 10x10 grid by default', () => {
      const grid = board.grid;
      expect(grid.length).toEqual(10);
      grid.forEach( row =>  {
        expect(row.length).toEqual(10);
        expect(row.every(pos => pos === undefined)).toBe(true);
      });
    });

    it('with an empty NxN grid if given N', () => {
      const grid = smallBoard.grid;
      expect(grid.length).toEqual(3);
      grid.forEach( row =>  {
        expect(row.length).toEqual(3);
        expect(row.every(pos => pos === undefined)).toBe(true);
      });
    });

    it('with zero active ships', () => {
      expect(board.activeShips).toEqual(0);
      expect(smallBoard.activeShips).toEqual(0);
    });
  });

  describe('when setting up', () => {
    it('places ships at specified positions on the grid', () => {

    });

    it('tracks the number of active ships', () => {

    });
  });

  describe('when in play', () => {
    it('checks if a position has been attacked', () => {

    });

    it('will update the grid if the attack missed', () => {

    });

    it('will update the grid if a ship was hit', () => {

    });

    it('will update the number of active ships if a ship was sunk', () => {

    });
  });

});
