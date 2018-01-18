class Board {
  constructor(n = 10) {
    this.grid = [...Array(n).keys()].map(i => Array(n));
    this.activeShips = 0;
  }
}
