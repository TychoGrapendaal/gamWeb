let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let cells = 10;
const cellSize = GAME_WIDTH / cells;

let mousex = 1;
let mousey = 1;
let mousepos = [1, 1];

let gameover = false;
let win = false;
let lose = false;

let bombs = 0;
let bombsnum = 20;
let Procent = 1;

let randomnum;

let showGrid = [];
for (let i = 0; i < cells; i++) {
  showGrid[i] = new Array(cells);
  for (let j = 0; j < cells; j++) {
    showGrid[i][j] = -1;
  }
}
let grid = [];
for (let i = 0; i < cells; i++) {
  grid[i] = new Array(cells);
  for (let j = 0; j < cells; j++) {
    randomnum = Math.random() * 100;
    if (randomnum < Procent && bombs < bombsnum) {
      grid[i][j] = "B";
      bombs++;
    } else {
      grid[i][j] = -1;
    }
  }
}

if (bombs < 20) {
  Boms();
}

function Boms() {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      randomnum = Math.random() * 100;
      if (randomnum < Procent && bombs < bombsnum && grid[i][j] !== "B") {
        grid[i][j] = "B";
        bombs++;
      }
    }
  }

  if (bombs < bombsnum) {
  Boms();
  }
}



for (let i = 0; i < cells; i++) {
  for (let j = 0; j < cells; j++) {
    if (grid[i][j] === -1) {
      grid[i][j] = neighbors(grid, i, j);
    }
  }
}

console.log(grid);

ctx.fillStyle = "black";
ctx.font = "15px Arial";
ctx.fillText("Bombs: " + bombs, 510, 50);

draw(showGrid);

function draw(grid) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      ctx.fillStyle = "gray";
      ctx.fillRect(
        (GAME_WIDTH / cells) * i,
        (GAME_HEIGHT / cells) * j,
        GAME_WIDTH / cells,
        GAME_HEIGHT / cells
      );
      if (grid[i][j] !== -1 && grid[i][j] !== "F" && grid[i][j] !== "B") {
        ctx.fillStyle = "black";
        ctx.font = cellSize / 2 + "px Arial";
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * i + cellSize / 3,
          (GAME_HEIGHT / cells) * j + cellSize / 2
        );
      } else if (grid[i][j] === "F") {
        ctx.fillStyle = "green";
        ctx.font = cellSize / 2 + "px Arial";
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * i + cellSize / 3,
          (GAME_HEIGHT / cells) * j + cellSize / 2
        );
      } else if (grid[i][j] === "B") {
        ctx.fillStyle = "red";
        ctx.font = cellSize / 2 + "px Arial";
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * i + cellSize / 3,
          (GAME_HEIGHT / cells) * j + cellSize / 2
        );
      }
    }
  }
  for (let i = 0; i < cells; i++) {
    // set line stroke and line width
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo((GAME_WIDTH / cells) * i, 0);
    ctx.lineTo((GAME_WIDTH / cells) * i, GAME_HEIGHT);
    ctx.moveTo(0, (GAME_HEIGHT / cells) * i);
    ctx.lineTo(GAME_WIDTH, (GAME_HEIGHT / cells) * i);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(500, 500);
    ctx.moveTo(500, 500);
    ctx.lineTo(500, 0);
    ctx.stroke();
  }
  GameOver(grid);
}

function neighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      try {
        if (grid[x + i][y + j] === "B") {
          sum++;
        }
      } catch {
        //console.error("error");
      }
    }
  }
  return sum;
}

function GameOver(grid) {
  let goodcells = 0;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (grid[i][j] !== "B" && grid[i][j] !== -1 && grid[i][j] !== "F") {
        goodcells++;
      }
    }
  }
  if (cells ** 2 - goodcells === bombs && !lose) {
    win = true;
    //console.log("YOU WIN");
  }
  if (win) {
    ctx.fillStyle = "green";
    ctx.font = "50px Arial";
    ctx.fillText("YOU WIN", GAME_WIDTH / 3, GAME_HEIGHT / 2);
    gameover = true;
  }
  if (lose) {
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText("YOU LOSE", GAME_WIDTH / 3, GAME_HEIGHT / 2);
    gameover = true;
  }
}

document.addEventListener("mousemove", (event) => {
  mousex = event.clientX - 8;
  mousey = event.clientY - 8;
  mousepos = [mousex, mousey];
});

document.addEventListener("click", (event) => {
  if (event.button === 0 && !gameover) {
    GameOver(showGrid);
    let cox = mousepos[0];
    let coy = mousepos[1];
    let xx = Math.floor(cox / (GAME_WIDTH / cells));
    let yy = Math.floor(coy / (GAME_HEIGHT / cells));
    if (xx < 0 || xx > cells - 1 || yy < 0 || yy > cells - 1) {
    } else {
      if (showGrid[xx][yy] === -1) {
        showGrid[xx][yy] = grid[xx][yy];
        if (grid[xx][yy] === "B") {
          End();
        }
        //Zero(showGrid);
        draw(showGrid);
      }
    }
    GameOver(showGrid);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 70) {
    let cox = mousepos[0];
    let coy = mousepos[1];
    let xx = Math.floor(cox / (GAME_WIDTH / cells));
    let yy = Math.floor(coy / (GAME_HEIGHT / cells));
    if (showGrid[xx][yy] === -1) {
      showGrid[xx][yy] = "F";
    } else if (showGrid[xx][yy] === "F") {
      showGrid[xx][yy] = -1;
    }
    draw(showGrid);
  }
});

function End() {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      showGrid[i][j] = grid[i][j];
    }
  }
  lose = true;
}

function Zero() {
  for (let ii = 0; ii < cells; ii++) {
    for (let jj = 0; jj < cells; jj++) {
      if (showGrid[ii][jj] === 0) {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            try {
              showGrid[ii + i][jj + j] = grid[ii + i][jj + j];
            } catch {
              //console.error("error");
            }
          }
        }
      }
    }
  }
  draw(showGrid);
}

gameLoop();
function gameLoop() {
  Zero();
  window.setTimeout(function () {
    requestAnimationFrame(gameLoop);
  }, 20);
}
