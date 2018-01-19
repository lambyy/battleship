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
      const smallGrid = smallBoard.grid;
      expect(smallGrid.length).toEqual(3);
      smallGrid.forEach( row =>  {
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
    const shipPos1 = [[0, 0], [1, 0]];
    const shipPos2 = [[3, 4], [3, 5]];
    const overlappingShipPos = [[1, 0], [1, 1]];

    beforeEach(() => {
      spyOn(board, 'placeShip').and.callThrough();

      board.placeShip(shipPos1);
      board.placeShip(shipPos2);
    });

    it('places ships at specified positions on the grid', () => {
      expect(board[0, 0]).toBeDefined();
      expect(board[1, 0]).toBeDefined();
      expect(board[3, 4]).toBeDefined();
      expect(board[3, 5]).toBeDefined();
      expect(board[0, 2]).not.toBeDefined();
    });

    it('tracks the number of active ships', () => {
      expect(board.activeShips).toEqual(2);
    });

    it('does not allow ships to overlap', () => {
      board.placeShip(overlappingShipPos).toBe(false);
      expect(board[1, 1]).not.toBeDefined();
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
