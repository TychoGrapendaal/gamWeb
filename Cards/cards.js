class Card {
  constructor(image, val, sym) {
    this.x;
    this.y;
    this.width = 200;
    this.height = 290;
    this.follow = false;
    this.neverfollow = true;
    this.image = loadImage(image);
    this.back = loadImage('PNG-cards-1.3/back.png');
    this.front = false;
    this.value = val;
    this.symbol = sym;
  }

  show() {
    if (this.front) {
      image(this.image, this.x, this.y, this.width, this.height);
    } else {
      image(this.back, this.x, this.y, this.width, this.height);
    }
  }

  update() {
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
