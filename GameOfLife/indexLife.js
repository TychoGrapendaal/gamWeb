let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
let First = true;
let cells = 100;
let mousex = 1;
let mousey = 1;
let mousepos = [1, 1];

let newgridx = [];
let gridx = [];
for (let i = 0; i < cells; i++) {
  gridx[i] = new Array(cells);
  for (let j = 0; j < cells; j++) {
    //gridx[i][j] = Math.round(Math.random() * 1);
    gridx[i][j] = 0;
  }
}

draw(gridx);

function newGrid(grid) {
  let newgrid = [];
  for (let i = 0; i < cells; i++) {
    newgrid[i] = new Array(cells);
    for (let j = 0; j < cells; j++) {
      let sum = neighbors(grid, i, j);
      if (grid[i][j] === 1) {
        if (sum < 2 || sum > 3) {
          newgrid[i][j] = 0;
        } else {
          newgrid[i][j] = 1;
        }
      } else {
        if (sum === 3) {
          newgrid[i][j] = 1;
        } else {
          newgrid[i][j] = 0;
        }
      }
    }
  }
  return newgrid;
}

function draw(grid) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      ctx.fillStyle = `rgb(${grid[i][j] * 255}, ${grid[i][j] * 255}, ${
        grid[i][j] * 255
      })`;
      ctx.fillRect(
        (GAME_WIDTH / cells) * i,
        (GAME_HEIGHT / cells) * j,
        GAME_WIDTH / cells,
        GAME_HEIGHT / cells
      );
    }
  }
  for (let i = 0; i < cells; i++) {
    // set line stroke and line width
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo((GAME_WIDTH / cells) * i, 0);
    ctx.lineTo((GAME_WIDTH / cells) * i, GAME_HEIGHT);
    ctx.moveTo(0, (GAME_HEIGHT / cells) * i);
    ctx.lineTo(GAME_WIDTH, (GAME_HEIGHT / cells) * i);
    ctx.stroke();
  }
}

function neighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[(x + i + cells) % cells][(y + j + cells) % cells];
    }
  }
  sum -= grid[x][y];
  return sum;
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    gameLoop();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 81) {
    for (let i = 0; i < cells; i++) {
      gridx[i] = new Array(cells);
      for (let j = 0; j < cells; j++) {
        gridx[i][j] = Math.round(Math.random() * 1);
      }
    }
    draw(gridx);
  }
});

document.addEventListener("mousemove", (event) => {
  mousex = event.clientX - 8;
  mousey = event.clientY - 8;
  mousepos = [mousex, mousey];
});

document.addEventListener("click", (event) => {
  if (event.button === 0) {
    let cox = mousepos[0];
    let coy = mousepos[1];
    let xx = Math.floor(cox / (GAME_WIDTH / cells));
    let yy = Math.floor(coy / (GAME_HEIGHT / cells));
    if (xx < 0 || xx > cells - 1 || yy < 0 || yy > cells - 1) {
    } else {
      gridx[xx][yy] = 1;
      draw(gridx);
    }
  }
});

function gameLoop() {
  if (First) {
    draw(gridx);
    newgridx = newGrid(gridx);
    First = false;
  } else {
    draw(newgridx);
    gridx = newGrid(newgridx);
    First = true;
  }
  window.setTimeout(function () {
    requestAnimationFrame(gameLoop);
  }, 20);
}
