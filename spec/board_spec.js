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
      board.placeShip(shipPos1, 1);
      board.placeShip(shipPos2, 2);
    });

    afterEach(() => {
      board.grid = board.grid.map(row => Array(row.length));
      board.activeShips = 0;
    });
//
    it('places ships at specified positions on the grid', () => {
      expect(board.get([0, 0])).toBeDefined();
      expect(board.get([1, 0])).toBeDefined();
      expect(board.get([3, 4])).toBeDefined();
      expect(board.get([3, 5])).toBeDefined();
      expect(board.get([0, 2])).not.toBeDefined();
    });

    it('tracks the number of active ships', () => {
      expect(board.activeShips).toEqual(2);
    });

    it('does not allow ships to overlap', () => {
      expect(board.placeShip(overlappingShipPos, 3)).toBe(false);
      expect(board.get([1, 1])).not.toBeDefined();
    });
  });

  describe('when in play', () => {
    const ship = {
      length: 2,
      health: 2
    };

    afterEach(() => {
      board.grid = board.grid.map(row => Array(row.length));
      board.activeShips = 0;
    });

    it('checks if a position has been attacked before', () => {
      expect(board.taken([0, 0])).toBe(false);
      board.set([0, 0], 1);
      expect(board.taken([0, 0])).toBe(true);
    });

    it('will update the grid if the attack missed', () => {
      expect(board.attack([0, 0])).toBeUndefined();
      expect(board.get([0, 0])).toEqual('X');
    });

    it('will update the grid if the attack hit', () => {
      board.set([0, 0], ship);
      expect(board.attack([0, 0])).toBe(ship);
      expect(board.get([0, 0])).toEqual('O');
    });

    it('will update the number of active ships if a ship sinks', () => {
      board.activeShips = 2;
      board.sinkShip();
      expect(board.activeShips).toEqual(1);
    });
  });

});
