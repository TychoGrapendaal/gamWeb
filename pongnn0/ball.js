class Ball {
  constructor(width, height, color, x, y, speedX, speedY) {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
    if (speedX * speedX < 3) {
      this.speedX = 4;
    } else {
      this.speedX = speedX;
    }
    if (speedY * speedY < 3) {
      this.speedY = 4;
    } else {
      this.speedY = speedY
    }

    this.color = color;
    // this.padle1 = padle1;
    // this.padle2 = padle2;
  }



  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y + this.height / 2 > 480) {
      this.speedY *= -1;
      this.y = 480 - (this.height / 2);
    } else if (this.y - this.height / 2 < 0) {
      this.speedY *= -1;
      this.y = 0 + (this.height / 2);
    }
    // if (this.x + this.width / 2 > 640) {
    //   this.speedX *= -1;
    //   this.speedY = random(-4,4);
    // }


    // else if (this.crashWith(this.padle2)) {
    //   this.speedX *= -1;
    //   this.speedY = random(-4, 4);
    // }



  }
}
