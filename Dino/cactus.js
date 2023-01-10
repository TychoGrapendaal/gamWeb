
class Cactus {
  constructor(speed) {
    //this.spacing = 125;
    //this.top = random(height / 6, (3 / 4) * height);
    this.height = 30;
    this.y = height - this.height - 30;
    this.x = width;
    this.width = random(10, 40);
    this.speed = speed;
  }

  hits(dino) {
    if ((dino.y + dino.height > this.y) || ((dino.y > this.y) && (dino.y < this.y + this.height))) {
      if (((dino.x > this.x) && (dino.x < this.x + this.width)) || ((dino.x + dino.width > this.x) && (dino.x + this.width < this.x + this.width))) {
        return true;
      }
    }
    return false;
  }

  show() {
    noStroke();
    fill(0, 200, 50);
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
