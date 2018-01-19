export default class Ship {
  constructor(length, orientation = 'h') {
    this.length = length;
    this.orientation = orientation;
    this.health = length;
  }

  occupied(x, y) {
    const occupiedPos = [];

    for (let i = 0; occupiedPos.length < this.length; i++) {
      let [xPos, yPos] = this.orientation === 'h' ? [x + i, y] : [x, y + i];
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
