let cells = 4;
let num = 0;
let GAME_WIDTH = 500;
let GAME_HEIGHT = 500;
let cellSize = 500 / 5;
let addblock;

let blocks = [];
let positions = [];
let position;
let grid = [];

function checkBlocks(positionx) {
  for (let block of blocks) {
    if (block.x === positionx[0] && block.y === positionx[1]) {
      return false;
    }
  }
  return true;
}

function combine(block) {
  block.value *= 2;
  block.color2 = 255 - 20 * Math.log(block.value);
  block.color = [255, block.color2, 0];
}

function removess() {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].remove) {
      blocks.splice(i, 1);
    }
  }
}

function addBlocks() {
  logig();
  positions = [];
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (grid[i][j] === -1) {
        positions.push([i, j]);
      }
    }
  }
  for (let i = 0; i < 1; i++) {
    position = random(positions);
    if (positions.length > 0) {
      if (checkBlocks(position)) {
        let twofour = [2, 2, 2, 4];
        blocks.push(new Block(random(twofour), position[0], position[1]));
        //positions.splice(position[0] * cells + position[1], 1);
        //console.log(positions);
      } else {
        i--;
        //console.log("hebb");
        //console.table(positions);
        //console.log(position);
        //noLoop();
      }
    }
    // else if (positions.length === 0) {
    //   blocks.push(new Block(2, position[0], position[1]));
    // }
  }
  logig();
}


function setup() {
  createCanvas(500, 500);
  background(150);
  for (let i = 0; i < cells; i++) {
    grid[i] = new Array(cells);
    for (let j = 0; j < cells; j++) {
      grid[i][j] = -1;
    }
  }
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (grid[i][j] === -1) {
        positions.push([i, j]);
      }
    }
  }
  addBlocks();
  addBlocks();
  addBlocks();
  addBlocks();
  for (let block of blocks) {
    grid[block.x][block.y] = block;
  };
}

function keyPressed() {
  logig();
  if (key === 'w') {
    moved = false;
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        if(grid[i][j] !== -1) {
          if (grid[i][j].up()) {
            moved = true;
          }
        }
      }
    }
    removess();
    if (moved) {
      addBlocks();
    }
  } else if (key === 's') {
    moved = false;
    for (let i = cells - 1; i >= 0; i--) {
      for (let j = cells - 1; j >= 0; j--) {
        if(grid[i][j] !== -1) {
          if (grid[i][j].down()) {
            moved = true;
          }
        }
      }
    }
    removess();
    if (moved) {
      addBlocks();
    }
  } else if (key === 'a') {
    moved = false;
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        if(grid[j][i] !== -1) {
          if (grid[j][i].left()) {
            moved = true;
          }
        }
      }
    }
    removess();
    if (moved) {
      addBlocks();
    }
  } else if (key === 'd') {
    moved = false;
    for (let i = cells - 1; i >= 0; i--) {
      for (let j = cells - 1; j >= 0; j--) {
        if(grid[j][i] !== -1) {
          if (grid[j][i].right()) {
            moved = true;
          }
        }
      }
    }
    removess();
    if (moved) {
      addBlocks();
    }
  }
}

function drraw(grid) {
  //console.log("called2");
  //background(0);
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (grid[i][j] !== -1) {
        fill(grid[i][j].color);
        rect(
          (width / cells - cells - 1) * i + (width - cells * cellSize) / (cells + 1),
          (height / cells - cells - 1) * j + (height - cells * cellSize) / (cells + 1),
          cellSize,
          cellSize
        );
      } else {
        fill(100);
        rect(
          (width / cells - cells - 1) * i + (width - cells * cellSize) / (cells + 1),
          (height / cells - cells - 1) * j + (height - cells * cellSize) / (cells + 1),
          cellSize,
          cellSize
        );
      }

      if (grid[i][j] !== -1) {
        fill("black");
        textSize(32);
        textAlign(CENTER, CENTER);
        text(
          grid[i][j].value,
          (width / cells - cells - 1) * i + (width - cells * cellSize) / (cells + 1) + cellSize / 2,
          (height / cells - cells - 1) * j + (height - cells * cellSize) / (cells + 1) + cellSize / 2
        );
      }
    }
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function logig() {
  //console.log("called");
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      grid[i][j] = -1;
    }
  }
  removess();
  for (let block of blocks) {
    grid[block.x][block.y] = block;
  };
  drraw(grid);
}
