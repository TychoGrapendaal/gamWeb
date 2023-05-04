let cells = 8;
let grid = new Array(cells);
let gridPieces = new Array(cells);
let everyMoveIsRandom = false;
let cellSize;
let turn = "w";

let whitePieces = [];
let redPieces = [];


let gridPiecesCopy = new Array(cells);
let whitePiecesCopy = [];
let redPiecesCopy = [];

let winner = false;
let winnerText = "";


function findOne (pos, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === pos[0] && arr[i][1] === pos[1]) return true;
  }
  return false;
}


function copyArr(arr) {
  let copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy[i] = arr[i];
  }
  return copy;
}

function copyArr2D(arr) {
  let copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy[i] = copyArr(arr[i]);
  }
  return copy;
}
