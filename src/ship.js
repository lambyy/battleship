export default class Ship {
  constructor(length, orientation = 'h') {
    this.length = length;
    this.orientation = orientation.toLowerCase();
    this.health = length;
  }

  covers(x, y) {
    const coveredPos = [];

    for (let i = 0; coveredPos.length < this.length; i++) {
      let [xPos, yPos] = this.orientation === 'h' ? [x, y + i] : [x + i, y];
      coveredPos.push([xPos, yPos]);
    }

    return coveredPos;
  }

  hit() {
    return this.health--;
  }

  sunk() {
    return this.health <= 0;
  }
}
