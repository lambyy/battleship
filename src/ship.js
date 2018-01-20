export default class Ship {
  constructor(length, orientation = 'h') {
    this.length = length;
    this.orientation = orientation.toLowerCase();
    this.health = length;
  }

  occupied(x, y) {
    const occupiedPos = [];

    for (let i = 0; occupiedPos.length < this.length; i++) {
      let [xPos, yPos] = this.orientation === 'h' ? [x, y + i] : [x + i, y];
      occupiedPos.push([xPos, yPos]);
    }

    return occupiedPos;
  }

  hit() {
    return this.health--;
  }

  sunk() {
    return this.health <= 0;
  }
}
