class Bird {
  constructor(level, speed) {

    this.level = level;
    this.height = 10;
    this.y = height - level * 18 - 62;
    this.x = width;
    this.width = 40;
    this.speed = speed;
  }

  hits(dino) {
    if (((this.y + this.height > dino.y) && (this.y + this.height < dino.y + dino.height)) || ((this.y > dino.y) && (this.y < dino.y + dino.height))) {
      if (((dino.x > this.x) && (dino.x < this.x + this.width)) || ((dino.x + dino.width > this.x) && (dino.x + this.width < this.x + this.width))) {
        return true;
      }
    }
    return false;
  }

  show() {
    noStroke();
    fill(200);
    //rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.width) {
      return true;
    } else {
      return false;
    }
  }
}
