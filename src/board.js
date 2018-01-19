export default class Board {
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

  display(play = true) {
    const header = `  ${[...Array(10).keys()].join(' ')}`;
    console.log(header);
    this.grid.forEach( (row, idx) => Board.display_row(row, idx, play));
  }

  static display_row(row, idx, play = true) {
    const output = [...row].map(el => {
      if(!el) return 'w';
      if(play) {
        console.log(`play true`);
        return (['X', 'O'].includes(el)) ? el : 'w';
      } else {
        return 'S';
      }
    });
    console.log(`${idx} ${output.join(' ')}`);
  }
}
