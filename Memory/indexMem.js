let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let cells = 6;
const cellSize = GAME_WIDTH / cells;

let mousex = 1;
let mousey = 1;
let mousepos = [1, 1];

let moves = 400;
ctx.fillStyle = "black";
ctx.font = "15px Arial";
ctx.fillText("MOVES: " + moves, 510, 50);
let num = 0;
let count = 0;
let First;
let Second;
let oldxx;
let oldyy;

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
    //gridx[i][j] = Math.round(Math.random() * 1);
    if (j % 2 === 0) {
      grid[i][j] = num;
      num++;
    } else {
      grid[i][j] = num - 1;
    }
  }
}
//console.log(grid);
swap(grid);
//console.log(grid);

draw(showGrid);

function draw(grid) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      ctx.fillStyle = "orange";
      ctx.fillRect(
        (GAME_WIDTH / cells) * i,
        (GAME_HEIGHT / cells) * j,
        GAME_WIDTH / cells,
        GAME_HEIGHT / cells
      );
      if (grid[i][j] !== -1) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
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

function swap(grid) {
  let swap1;
  let swap2;
  let x;
  let y;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      swap1 = grid[i][j];
      y = Math.round(Math.random() * (cells - 1));
      x = Math.round(Math.random() * (cells - 1));
      //console.log(y);
      //console.log(x);
      swap2 = grid[y][x];
      grid[i][j] = swap2;
      grid[y][x] = swap1;
    }
  }
}

let gameover = false;
function GameOver(grid) {
  let over = true;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (grid[i][j] === -1) {
        over = false;
      }
    }
  }
  if (over && moves > -1) {
    ctx.fillStyle = "green";
    ctx.font = "50px Arial";
    ctx.fillText("YOU WIN", GAME_WIDTH / 3, GAME_HEIGHT / 2);
    gameover = true;
  }
  if (moves < 1 && !over) {
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
        count++;
        if (count % 2 !== 0) {
          First = grid[xx][yy];
          oldxx = xx;
          oldyy = yy;
          draw(showGrid);
        } else {
          Second = grid[xx][yy];
          moves--;
          ctx.clearRect(GAME_WIDTH, 0, GAME_WIDTH + 100, GAME_HEIGHT);
          ctx.fillStyle = "black";
          ctx.font = "15px Arial";
          ctx.fillText("MOVES: " + moves, 510, 50);
          draw(showGrid);

          if (First !== Second) {
            showGrid[xx][yy] = -1;
            showGrid[oldxx][oldyy] = -1;
          }
          window.setTimeout(function () {
            draw(showGrid);
          }, 1000);
        }
      }
    }
    GameOver(showGrid);
  }
});
