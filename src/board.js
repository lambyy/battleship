class Board {
  constructor(n = 10) {
    this.grid = [...Array(n).keys()].map(i => Array(n));
    this.activeShips = 0;
  }

  placeShip(shipPos, ship) {
    const unoccupied = shipPos.every(pos => this.get(pos) === undefined);
    if(unoccupied) {
      shipPos.forEach(pos => {
        this.set(pos, ship);
      });
      this.activeShips++;
      return true;
    }
    return false;
  }

  guess() {

  }

  get(pos) {
    const [x, y] = pos;
    return this.grid[x][y];
  }

  set(pos, val) {
    const [x, y] = pos;
    this.grid[x][y] = val;
  }
}
