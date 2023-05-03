


function setup() {
  createCanvas(500, 500);
  background(150);
  cellSize = width/cells;

  for (let i = 0; i < cells; i++) {
    grid[i] = new Array(cells).fill(-1);
    gridPieces[i] = new Array(cells).fill(-1);
  }

  if (!everyMoveIsRandom) {
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        grid[i][j] = Math.floor(Math.random()*4);
      }
    }
  }

  //make white pieces
  for (let i = 0; i < cells; i++) {
    if (everyMoveIsRandom) {

    } else {
      if (i == 4) {
        let m = Math.floor(Math.random()*2);
        let mm = (grid[i][7] + m) % 2 + 1;
        whitePieces.push(new Piece(40, 57, i, 7, cellSize, "images/piece" + mm + "ws.png", "w", m, true));
      } else {
        let m = Math.floor(Math.random()*4);
        let mm = (grid[i][7] + m) % 4 + 1;
        whitePieces.push(new Piece(40, 57, i, 7, cellSize, "images/piece" + mm + "w.png", "w", m, false));
      }
    }

  }

  //make red pieces
  for (let i = 0; i < cells; i++) {
    if (everyMoveIsRandom) {

    } else {
      if (i == 3) {
        let m = Math.floor(Math.random()*2);
        let mm = (grid[i][0] + m) % 2 + 1;
        redPieces.push(new Piece(40, 57, i, 0, cellSize, "images/piece" + mm + "rs.png", "r", m, true));
      } else {
        let m = Math.floor(Math.random()*4);
        let mm = (grid[i][0] + m) % 4 + 1;
        redPieces.push(new Piece(40, 57, i, 0, cellSize, "images/piece" + mm + "r.png", "r", m, false));
      }
    }

  }

  //add pieces to the grid
  for (let i = 0; i < whitePieces.length; i++) {
    gridPieces[7][i] = (whitePieces[i]);
  }

  for (let i = 0; i < redPieces.length; i++) {
    gridPieces[0][i] = (redPieces[i]);
  }

  drawBoard();
  drawPieces();
}

function checkForWinner() {
  if (redPieces.length < 3) {
    winnerText = 'white wins';
    winner = true;
  } else if (whitePieces.length < 3) {
    winnerText = 'red wins';
    winner = true;
  }

  //check for legal moves

  let redMoves = [];
  let whiteMoves = [];


  if (turn === "w") {
    for (let i = 0; i < whitePieces.length; i++) {
      let temp = whitePieces[i].moves(whitePieces[i].realMove);
      for (let j = 0; j < temp.length; j++) {
        whiteMoves.push(temp[i]);
        break;
      }
    }
    if (whiteMoves.length < 1) {
      winnerText = 'red wins by no moves';
      winner = true;
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      let temp = redPieces[i].moves(redPieces[i].realMove);
      for (let j = 0; j < temp.length; j++) {
        redMoves.push(temp[i]);
        break;
      }
    }
    if (redMoves.length < 1) {
      winnerText = 'white wins by no moves';
      winner = true;
    }
  }
}

function draw() {
  background(150);
  drawBoard();
  drawPieces();
  if (winner) {
    fill(0);
    textSize(32);
    text(winnerText, 10, 30);
  }
}

function drawBoard() {
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      fill(238,238,210);
      if ((i + j) % 2 == 0) fill(118,150,86);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function drawPieces() {
  for (let i = 0; i < whitePieces.length; i++) {
    whitePieces[i].show();
  }

  for (let i = 0; i < redPieces.length; i++) {
    redPieces[i].show();
  }
}


function mousePressed() {
  if (winner) return;

  let my = Math.floor(mouseY / cellSize);
  let mx = Math.floor(mouseX / cellSize);



// if clicking on green
  if (gridPieces[my][mx] === -1 || gridPieces[my][mx].team !== turn) {
    for (let i = 0; i < whitePieces.length; i++) {
      if (whitePieces[i].moving && findOne([mx, my], whitePieces[i].moves(whitePieces[i].realMove))) {
        whitePieces[i].moveTo(mx, my);
        whitePieces[i].moving = false;
        break;
      }
    }

    for (let i = 0; i < redPieces.length; i++) {
      if (redPieces[i].moving && findOne([mx, my], redPieces[i].moves(redPieces[i].realMove))) {
        redPieces[i].moveTo(mx, my);
        redPieces[i].moving = false;
        break;
      }
    }
    checkForWinner();
    return;
  }

  //draw posssible moves for the piece
  for (let i = 0; i < whitePieces.length; i++) {
    whitePieces[i].moving = false;
  }

  for (let i = 0; i < redPieces.length; i++) {
    redPieces[i].moving = false;
  }
  gridPieces[my][mx].moving = true;
}



function testRandom() {
  let counts = new Array(4).fill(0);
  let total = 100000;

  for (let i = 0; i < total; i++) {
    counts[Math.floor(Math.random()*4)]++;
  }

  counts[0] *= (1/total);
  counts[1] *= (1/total);
  counts[2] *= (1/total);
  counts[3] *= (1/total);

  console.log(counts);
}
