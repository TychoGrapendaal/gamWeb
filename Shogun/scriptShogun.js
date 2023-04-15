let cells = 8;
let grid = new Array(cells);
let everyMoveIsRandom = false;
let whitePieces = [];
let redPieces = [];
let whiteS;
let redS;
let cellSize;

let piece1r;
let piece2r;
let piece3r;
let piece4r;
let piece1rs;
let piece2rs;
let piece1w;
let piece2w;
let piece3w;
let piece4w;
let piece1ws;
let piece2ws;

let hashPieces = new Map();

function loadAll() {
  piece1r = loadImage('images/piece1r.png');
  piece2r = loadImage('images/piece2r.png');
  piece3r = loadImage('images/piece3r.png');
  piece4r = loadImage('images/piece4r.png');
  piece1rs = loadImage('images/piece1rs.png');
  piece2rs = loadImage('images/piece2rs.png');
  piece1w = loadImage('images/piece1w.png');
  piece2w = loadImage('images/piece2w.png');
  piece3w = loadImage('images/piece3w.png');
  piece4w = loadImage('images/piece4w.png');
  piece1ws = loadImage('images/piece1ws.png');
  piece2ws = loadImage('images/piece2ws.png');

  hashPieces.set("1r", piece1r);
  hashPieces.set("2r", piece2r);
  hashPieces.set("3r", piece3r);
  hashPieces.set("4r", piece4r);
  hashPieces.set("1rs", piece1rs);
  hashPieces.set("2rs", piece2rs);
  hashPieces.set("1w", piece1w);
  hashPieces.set("2w", piece2w);
  hashPieces.set("3w", piece3w);
  hashPieces.set("4w", piece4w);
  hashPieces.set("1ws", piece1ws);
  hashPieces.set("2ws", piece2ws);

}

function chooseImage(move, team, shogun) {
  return hashPieces.get(move + team + shogun);
}



function setup() {
  createCanvas(500, 500);
  background(150);
  cellSize = width/cells;
  console.log(piece1rs);

  for (let i = 0; i < cells; i++) {
    grid[i] = new Array(cells).fill(-1);
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
        whitePieces.push(new Piece(40, 57, i, 7, cellSize, "images/piece" + mm + "ws.png", "w", m));
      } else {
        let m = Math.floor(Math.random()*4);
        let mm = (grid[i][7] + m) % 4 + 1;
        whitePieces.push(new Piece(40, 57, i, 7, cellSize, "images/piece" + mm + "w.png", "w", m));
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
        redPieces.push(new Piece(40, 57, i, 0, cellSize, "images/piece" + mm + "rs.png", "r", m));
      } else {
        let m = Math.floor(Math.random()*4);
        let mm = (grid[i][0] + m) % 4 + 1;
        redPieces.push(new Piece(40, 57, i, 0, cellSize, "images/piece" + mm + "r.png", "r", m));
      }
    }

  }

  drawBoard();
  drawPieces();
}

function draw() {
  background(150);
  drawBoard();
  drawPieces();
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
