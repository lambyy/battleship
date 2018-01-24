export default class Board {
  constructor(n = 10) {
    this.grid = [...Array(n).keys()].map(i => Array(n));
    this.activeShips = 0;
  }

  placeShip(positions, ship) {
    const empty = positions.every(pos => {
      if(!this.withinGrid(pos)) return false;
      return this.get(pos) === undefined;
    });
    if(empty) {
      positions.forEach(pos => {
        this.set(pos, ship);
      });
      this.activeShips++;
      return true;
    }
    return false;
  }

  taken(pos) {
    return ['X', 'O'].includes(this.get(pos));
  }

  attack(pos) {
    const ship = this.get(pos);
    const marker = (ship) ? 'O' : 'X';
    this.set(pos, marker);

    return ship;
  }

  sinkShip() {
    this.activeShips--;
  }

  win() {
    return this.activeShips <= 0;
  }

  get(pos) {
    const [x, y] = pos;
    return this.grid[x][y];
  }

  set(pos, val) {
    const [x, y] = pos;
    this.grid[x][y] = val;
  }

  withinGrid(pos) {
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    return (pos[0] >= 0 && pos[0] < rows && pos[1] >= 0 && pos[1] < cols);
  }

  display(type) {
    const size = this.grid.length;
    const header = `  | ${[...Array(size).keys()].join(' | ')}`;
    console.log(header);
    this.grid.forEach( (row, idx) => Board.display_row(row, idx, type));
    console.log('\n');
  }

  static display_row(row, idx, type = "play") {
    const output = [...row].map(el => {
      if(!el) return ' ';
      if(type === "play") {
        return (['X', 'O'].includes(el)) ? el : ' ';
      } else {
        return 'S';
      }
    });
    console.log(`${"-".repeat((row.length * 4) + 2)}`);
    console.log(`${idx} | ${output.join(' | ')}`);
  }
}
