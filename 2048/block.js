class Block {
  constructor(value, x, y) {
    this.value = value;
    //console.log(Math.log(value));
    this.color2 = 255 - 20 * Math.log(value);
		this.color = [255, this.color2, 0];
    this.x = x;
    this.y = y;
    this.remove = false;
  }


  up() {
    for (let i = 0; i < cells; i++) {
      if (this.y !== 0) {
        if (grid[this.x][this.y - 1] === -1) {
          grid[this.x][this.y] = -1;
          this.y--;
          grid[this.x][this.y] = this;
          moved = true;
        } else if (grid[this.x][this.y - 1].value === this.value) {
          combine(grid[this.x][this.y - 1]);
          grid[this.x][this.y] = -1;
          this.remove = true;
          this.x = 10;
          i = cells;
          moved = true;
        }
      }
    }
    return moved;
  }

  down() {
    for (let i = 0; i < cells; i++) {
      if (this.y !== cells - 1) {
        if (grid[this.x][this.y + 1] === -1) {
          grid[this.x][this.y] = -1;
          this.y++;
          grid[this.x][this.y] = this;
          moved = true;
        } else if (grid[this.x][this.y + 1].value === this.value) {
          combine(grid[this.x][this.y + 1]);
          grid[this.x][this.y] = -1;
          this.remove = true;
          this.x = 10;
          i = cells;
          moved = true;
        }
      }
    }
  }

  left() {
    for (let i = 0; i < cells; i++) {
      if (this.x !== 0) {
        if (grid[this.x - 1][this.y] === -1) {
          grid[this.x][this.y] = -1;
          this.x--;
          grid[this.x][this.y] = this;
          moved = true;
        } else if (grid[this.x - 1][this.y].value === this.value) {
          combine(grid[this.x - 1][this.y]);
          grid[this.x][this.y] = -1;
          this.remove = true;
          this.x = 10;
          i = cells;
          moved = true;
        }
      }
      // background(0);
      // logig();
      // console.log("hu");
      // sleep(2000);
    }
  }

  right() {
    for (let i = 0; i < cells; i++) {
      if (this.x !== cells - 1) {
        if (grid[this.x + 1][this.y] === -1) {
          grid[this.x][this.y] = -1;
          this.x++;
          grid[this.x][this.y] = this;
          moved = true;
        } else if (grid[this.x + 1][this.y].value === this.value) {
          combine(grid[this.x + 1][this.y]);
          grid[this.x][this.y] = -1;
          this.remove = true;
          this.x = 10;
          i = cells;
          moved = true;
        }
      }
    }
  }
}
