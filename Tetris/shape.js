class Shape {
  constructor(typeshape) {
    if (typeshape === "line") {
      this.pos = [0, 3];
      this.color = "green";
      this.shape = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];
    } else if (typeshape === "box") {
      this.pos = [0, 3];
      this.color = "blue";
      this.shape = [
        [1, 1],
        [1, 1]
      ];
    } else if (typeshape === "T") {
      this.pos = [0, 3];
      this.color = "red";
      this.shape = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ];
    } else if (typeshape === "L") {
      this.pos = [0, 3];
      this.color = "yellow";
      this.shape = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ];
    } else if (typeshape === "S") {
      this.pos = [0, 3];
      this.color = "pink";
      this.shape = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ];
    } else if (typeshape === "Z") {
      this.pos = [0, 3];
      this.color = "purple";
      this.shape = [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ];
    } else if (typeshape === "J") {
      this.pos = [0, 3];
      this.color = "orange";
      this.shape = [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ];
    }
    this.stop = false;
  }

  draw(ctx) {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(dt) {
    if (!dt) return;
    if (this.Left) {
      this.x -= this.xSpeed;
    }
    if (this.Right) {
      this.x += this.xSpeed;
    }
    if (this.Up) {
      this.y -= this.ySpeed;
    }
    if (this.Down) {
      this.y += this.ySpeed;
    }
  }

  moveLeft() {
    this.Left = true;
  }

  moveRight() {
    this.Right = true;
  }

  moveUp() {
    this.Up = true;
  }

  moveDown() {
    this.Down = true;
  }

  StopLeft() {
    this.Left = false;
  }

  StopRight() {
    this.Right = false;
  }

  StopUp() {
    this.Up = false;
  }

  StopDown() {
    this.Down = false;
  }
}
