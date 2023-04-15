class Piece {
  constructor(height, width, px, py, cellSize, image, team, move) {
    this.height = height;
    this.width = width;
    this.px = px;
    this.py = py;
    this.cellSize = cellSize;
    this.team = team;
    this.image = loadImage(image);
    this.move = move;
  }

  show() {
    image(this.image, this.px * cellSize + (cellSize-this.height)/2, this.py * cellSize + (cellSize-this.width)/2, this.height, this.width);
  }
}
