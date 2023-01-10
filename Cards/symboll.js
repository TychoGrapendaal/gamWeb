class Symboll {
  constructor(img, sym, x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.image = loadImage(img);
    this.symbol = sym;
  }

  show() {
    image(this.image, this.x, this.y, this.width, this.height);
  }

  hits(mouseX, mouseY) {
    if ((mouseY > this.y) && (mouseY < this.y + this.height)) {
      if ((mouseX > this.x) && (mouseX < this.x + this.width)) {
        return true;
      }
    }
    return false;
  }
}
