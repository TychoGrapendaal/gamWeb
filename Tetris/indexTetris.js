let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 300;
const GAME_HEIGHT = 600;
let cellrow = 20;
let cellcollom = 10;
let score = 0;

let logicgridx = [
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "gray"
  ],
  [
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
    "gray"
  ]
];

let gridx;
let shapetypes = ["line", "box", "S", "line", "L", "T", "Z", "J"];
let nextshape = new Shape(
  shapetypes[Math.floor(Math.random() * shapetypes.length)]
);
let shape = new Shape(
  shapetypes[Math.floor(Math.random() * shapetypes.length)]
);

function drawnextshape(nextshape) {
  for (let i = 0; i < nextshape.shape.length; i++) {
    for (let j = 0; j < nextshape.shape[0].length; j++) {
      if (nextshape.shape[i][j] === 1) {
        ctx.fillStyle = nextshape.color;
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(
        400 + (GAME_WIDTH / cellcollom) * j,
        150 + (GAME_HEIGHT / cellrow) * i,
        GAME_WIDTH / (cellcollom),
        GAME_HEIGHT / (cellrow)
      );
    }
  }
}
//console.log(shape.shape.length);
function draw(grid) {
  ctx.clearRect(0, 0, GAME_WIDTH + 250, GAME_HEIGHT);
  for (let i = 0; i < cellrow; i++) {
    for (let j = 0; j < cellcollom + 2; j++) {
      ctx.fillStyle = grid[i][j];
      ctx.fillRect(
        (GAME_WIDTH / cellcollom) * j,
        (GAME_HEIGHT / cellrow) * i,
        GAME_WIDTH / (cellcollom),
        GAME_HEIGHT / (cellrow)
      );
    }
  }
  drawnextshape(nextshape);
  ctx.fillStyle = "black";
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, 360, 50);
  if (GameOver()) {
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", GAME_WIDTH / 3, GAME_HEIGHT / 2);
  }
}

function clearBack() {
  gridx = [
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray"
    ]
  ];

  setblocks(gridx);
}

function setblocks(grid) {
  for (let i = 0; i < cellrow + 1; i++) {
    for (let j = 0; j < cellcollom + 2; j++) {
      grid[i][j] = logicgridx[i][j];
    }
  }
}

function drawshape(grid) {
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1 && shape.pos[0] + i < 20) {
        grid[shape.pos[0] + i][shape.pos[1] + j] = shape.color;
      }
    }
  }
}

function stop() {
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1) {
        if (
          logicgridx[shape.pos[0] + i + 1][shape.pos[1] + j] !== "black" ||
          shape.pos[0] + i === 19
        ) {
          shape.stop = true;
          return true;
        }
      }
    }
  }
}

function turn() {
  let turnshape = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1) {
        turnshape[j][shape.shape[0].length - 1 - i] = 1;
      }
    }
  }
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      shape.shape[i][j] = turnshape[i][j];
    }
  }
}

function gameLoop() {
  GameOver();
  if (stop()) {
    drawshape(logicgridx);
  }
  clearBack();
  drawshape(gridx);
  empty();

  if (shape.stop) {
    shape = nextshape;
    nextshape = new Shape(
      shapetypes[Math.floor(Math.random() * shapetypes.length)]
    );
  } else if (shape.pos[0] !== 19) {
    shape.pos[0]++;
  }

  draw(gridx);
  if (!GameOver()) {
    window.setTimeout(function () {
      requestAnimationFrame(gameLoop);
    }, 1000);
  }
}
gameLoop();

document.addEventListener("keydown", (event) => {
  if (!shape.stop && event.key === "ArrowLeft" && canLeft()) {
    shape.pos[1]--;
    clearBack();
    drawshape(gridx);
    draw(gridx);
  } else if (!shape.stop && event.key === "ArrowRight" && canRight()) {
    shape.pos[1]++;
    clearBack();
    drawshape(gridx);
    draw(gridx);
  } else if (
    !stop() &&
    event.key === "ArrowDown" &&
    shape.pos[0] !== 19 &&
    !shape.stop
  ) {
    shape.pos[0]++;
    clearBack();
    drawshape(gridx);
    draw(gridx);
  } else if (!shape.stop && event.key === "ArrowUp" && canTurn()) {
    turn();
    clearBack();
    drawshape(gridx);
    draw(gridx);
  }
});

function GameOver() {
  for (let i = 1; i < cellcollom; i++) {
    if (logicgridx[0][i] !== "black") {
      return true;
    }
  }
}

function canLeft() {
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1) {
        if (logicgridx[shape.pos[0] + i][shape.pos[1] + j - 1] !== "black") {
          return false;
        }
      }
    }
  }
  return true;
}

function canRight() {
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1) {
        if (logicgridx[shape.pos[0] + i][shape.pos[1] + j + 1] !== "black") {
          return false;
        }
      }
    }
  }
  return true;
}

function canTurn() {
  let turnshape = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for (let i = 0; i < shape.shape.length; i++) {
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (shape.shape[i][j] === 1) {
        turnshape[j][shape.shape[0].length - 1 - i] = 1;
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (turnshape[i][j] === 1) {
        if (logicgridx[shape.pos[0] + i][shape.pos[1] + j] !== "black") {
          return false;
        }
      }
    }
  }
  return true;
}

function empty() {
  let scorecount = 0;
  let remove = true;
  for (let i = 0; i < cellrow; i++) {
    remove = true;
    for (let j = 1; j < cellcollom + 1; j++) {
      if (logicgridx[i][j] === "black") {
        remove = false;
      }
    }
    if (remove) {
      for (let j = 1; j < cellcollom + 1; j++) {
        logicgridx[i][j] = "black";
      }
      gravity(i);
      scorecount++;
    }
  }
  score += scorecount * scorecount * 100;
}

function gravity(row) {
  let newlogicgrid = [
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "black",
      "gray"
    ],
    [
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray",
      "gray"
    ]
  ];
  setblocks(newlogicgrid);
  for (let i = row; i > 0; i--) {
    for (let j = 1; j < cellcollom + 1; j++) {
      logicgridx[i][j] = newlogicgrid[i - 1][j];
    }
  }
}
