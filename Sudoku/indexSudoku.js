let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let grid;
let answer;

let mousepos;
let marked;

let maxDigits = 25;
let minDigits = 20;

let positions;

const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
let cells = 9;
const cellSize = GAME_WIDTH / cells;

let unsolved;
let begin;

function updateVariable() {
  minDigits = document.getElementById('min-field').value;
  maxDigits = document.getElementById('max-field').value;
}

function generate() {
  positions = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [0, 8],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [4, 8],
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
    [6, 8],
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 8],
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 6],
    [8, 7],
    [8, 8]
  ];

  shuffel(positions);
  shuffel(positions);

  grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  marked = copy(grid);
  fill(grid);
  if (!solve(grid)) {
    generate();
    return;
  }

  answer = copy(grid);
  remove(grid);
  unsolved = copy(grid);
  begin = copy(grid);

  console.log(81 - AmmountEmpty(unsolved));
  if (81 - AmmountEmpty(unsolved) <= maxDigits) {
    draw(grid);
  } else {
    generate();
  }
}

let solutions = 0;

function solveremove(bo) {
  let row;
  let col;
  let find = find_empty(bo);
  if (solutions > 1) {
    return false;
  }
  if (find === false) {
    solutions++;
    if (solutions > 1) {
      return false;
    }
    return;
  }
  row = find[0];
  col = find[1];
  for (let i = 1; i < 10; i++) {
    if (valid(bo, i, [row, col])) {
      bo[row][col] = i;

      solveremove(bo);

      bo[row][col] = 0;
    }
  }

  return (solutions === 1);
}

function check(bo) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (bo[i][j] !== answer[i][j]) {
        return false;
      }
    }
  }
  return true;
}


function remove(bo) {
  let noRemoved = 0;
  for (let i = 0; i < 81; i++) {
    if (81-noRemoved <= minDigits) {
      return;
    }
    let removed = bo[positions[i][0]][positions[i][1]];
    bo[positions[i][0]][positions[i][1]] = 0;
    noRemoved++;
    let forhuman = copy(bo);
    solutions = 0
    if (!solveremove(forhuman)) {
      bo[positions[i][0]][positions[i][1]] = removed;
      noRemoved--;
    }
  }
}

function shuffel(poss) {
  let swap1;
  let swap2;
  let x;
  for (let i = 0; i < 81; i++) {
    swap1 = poss[i];
    x = Math.round(Math.random() * (cells*cells - 1));
    swap2 = poss[x];
    poss[i] = swap2;
    poss[x] = swap1;
  }
}

//console.log(grid[0][1])

//console.log(grid[0][1]);
//console.log(valid(grid, 1, [0, 1]));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max)) + min;
}

function fill(bo) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (Math.random() < 0.3) {
        let rand = getRandomInt(1, 9);
        if (valid(bo, rand, [i, j])) {
          bo[i][j] = rand;
        }
      }
    }
  }
}

function humansolve(bo, tries) {
  let box_x;
  let box_y;
  let list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let pos = [0, 0];
  let number;
  let count;
  let pnumber;
  let posnumber = 0;

  let kpos;
  let kpos2;

  let possiblepos = [
    [],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  ];

  for (let num = 1; num < 10; num++) {
    for (let ii = 0; ii < cells; ii++) {
      for (let jj = 0; jj < cells; jj++) {
        if (bo[ii][jj] === 0) {
          possiblepos[num][ii][jj] = valid(bo, num, [ii, jj]);
        }
      }
    }
  }

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (bo[i][j] === 0) {
        //console.log(possiblepos);
        posnumber = 0;
        for (let num = 1; num < 10; num++) {
          posnumber = 0;
          for (let k = 0; k < cells; k++) {
            if (possiblepos[num][i][k] === true) {
              posnumber++;
              kpos = k;
            }
          }
          if (posnumber === 1) {
            bo[i][kpos] = num;
          }
        }

        posnumber = 0;
        for (let num = 1; num < 10; num++) {
          posnumber = 0;
          for (let k = 0; k < cells; k++) {
            if (possiblepos[num][k][j] === true) {
              posnumber++;
              kpos = k;
            }
          }
          if (posnumber === 1) {
            bo[kpos][j] = num;
          }
        }

        for (let k = 0; k < cells; k++) {
          number = bo[i][k];
          list[number] = bo[i][k];
          posnumber = 0;
        }
        for (let k = 0; k < cells; k++) {
          number = bo[k][j];
          list[number] = bo[k][j];
        }

        pos = [i, j];

        if (pos[1] > 5) {
          box_x = 2;
        } else if (pos[1] < 3) {
          box_x = 0;
        } else {
          box_x = 1;
        }

        if (pos[0] > 5) {
          box_y = 2;
        } else if (pos[0] < 3) {
          box_y = 0;
        } else {
          box_y = 1;
        }
        //console.log(box_x);
        //console.log(box_y);
        posnumber = 0;
        for (let num = 1; num < 10; num++) {
          posnumber = 0;
          for (
            let ik = box_y * 3;
            ik >= box_y * 3 && ik < box_y * 3 + 3;
            ik++
          ) {
            for (
              let jk = box_x * 3;
              jk >= box_x * 3 && jk < box_x * 3 + 3;
              jk++
            ) {
              number = bo[ik][jk];
              list[number] = bo[ik][jk];

              if (possiblepos[num][ik][jk] === true) {
                posnumber++;
                kpos = ik;
                kpos2 = jk;
              }
            }
          }
          count = 0;
          pnumber = 0;
          //console.log(list);

          for (let p = 1; p < 10; p++) {
            if (list[p] === 0) {
              pnumber = p;
              count++;
              //console.log(count);
            }
          }

          if (count === 1) {
            bo[i][j] = pnumber;
          }

          if (posnumber === 1) {
            bo[kpos][kpos2] = num;
          }
        }
      }
    }
  }

  if (AmmountEmpty(bo) === 0) {
    return true;
  } else if (tries < 500) {
    tries++;
    return humansolve(bo, tries);
  } else {
    return false;
  }
}

function copy(bo) {
  let newBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      newBoard[i][j] = bo[i][j];
    }
  }

  return newBoard;
}




function solve(bo) {
  let row;
  let col;
  let find = find_empty(bo);
  if (find === false) {
    return true;
  } else {
    row = find[0];
    col = find[1];
  }
  for (let i = 1; i < 10; i++) {
    if (valid(bo, i, [row, col])) {
      bo[row][col] = i;

      if (solve(bo)) {
        return true;
      }

      bo[row][col] = 0;
    }
  }

  return false;
}

function valid(bo, num, pos) {
  //Check row
  //console.log(pos);

  for (let i = 0; i < cells; i++) {
    if (bo[pos[0]][i] === num && pos[1] !== i) {
      return false;
    }
  }

  for (let i = 0; i < cells; i++) {
    if (bo[i][pos[1]] === num && pos[0] !== i) {
      return false;
    }
  }

  //Check box
  if (pos[1] > 5) {
    box_x = 2;
  } else if (pos[1] < 3) {
    box_x = 0;
  } else {
    box_x = 1;
  }

  if (pos[0] > 5) {
    box_y = 2;
  } else if (pos[0] < 3) {
    box_y = 0;
  } else {
    box_y = 1;
  }
  //console.log(box_x);
  //console.log(box_y);

  for (let i = box_y * 3; i >= box_y * 3 && i < box_y * 3 + 3; i++) {
    for (let j = box_x * 3; j >= box_x * 3 && j < box_x * 3 + 3; j++) {
      if (bo[i][j] === num && [i, j] !== pos) {
        return false;
      }
    }
  }

  return true;
}

function draw(grid) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      ctx.fillStyle = "white";
      ctx.fillRect(
        (GAME_WIDTH / cells) * j,
        (GAME_HEIGHT / cells) * i,
        GAME_WIDTH / cells,
        GAME_HEIGHT / cells
      );

      if (grid[i][j] !== 0 && begin[i][j] !== 0) {
        ctx.fillStyle = "black";
        ctx.font = 'bold 30px Arial';
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * j + cellSize / 3,
          (GAME_HEIGHT / cells) * i + cellSize / 1.5
        );
      } else if (grid[i][j] !== 0 && marked[i][j] !== true) {
        ctx.fillStyle = "blue";
        ctx.font = "30px Arial";
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * j + cellSize / 3,
          (GAME_HEIGHT / cells) * i + cellSize / 1.5
        );
      } else if (grid[i][j] !== 0) {
        ctx.fillStyle = "red";
        ctx.font = cellSize / 2 + "px Arial";
        ctx.fillText(
          grid[i][j],
          (GAME_WIDTH / cells) * j + cellSize / 3,
          (GAME_HEIGHT / cells) * i + cellSize / 2
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
  }

  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(0, (GAME_WIDTH / cells) * 3);
  ctx.lineTo(500, (GAME_WIDTH / cells) * 3);
  ctx.moveTo(0, (GAME_WIDTH / cells) * 6);
  ctx.lineTo(500, (GAME_WIDTH / cells) * 6);

  ctx.moveTo((GAME_HEIGHT / cells) * 3, 0);
  ctx.lineTo((GAME_HEIGHT / cells) * 3, 500);
  ctx.moveTo((GAME_HEIGHT / cells) * 6, 0);
  ctx.lineTo((GAME_HEIGHT / cells) * 6, 500);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(0, 500);
  ctx.lineTo(500, 500);
  ctx.moveTo(500, 500);
  ctx.lineTo(500, 0);
  ctx.stroke();
}

function find_empty(bo) {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (bo[i][j] === 0) {
        return [i, j];
      }
    }
  }

  return false;
}

function AmmountEmpty(bo) {
  let AEMP = 0;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (bo[i][j] === 0) {
        AEMP++;
      }
    }
  }
  //console.log(AEMP);
  return AEMP;
}

document.addEventListener("mousemove", (event) => {
  let mousex = event.clientX - 8;
  let mousey = event.clientY - 8;
  mousepos = [mousex, mousey];
});

document.addEventListener("keydown", (event) => {
  let cox = mousepos[1];
  let coy = mousepos[0];
  let xx = Math.floor(cox / (GAME_WIDTH / cells));
  let yy = Math.floor(coy / (GAME_HEIGHT / cells));
  if (unsolved[xx][yy] === 0) {
    unsolved[xx][yy] = parseInt(event.key);
  } else if (unsolved[xx][yy] !== 0 && begin[xx][yy] === 0) {
    unsolved[xx][yy] = 0;
  }

  if (event.key === "m" && marked[xx][yy] !== true) {
    marked[xx][yy] = true;
  } else if (event.key === "m") {
    marked[xx][yy] = false;
  }

  if (check(unsolved)) {
    console.log("CORRECT");
  }

  draw(unsolved);
});
