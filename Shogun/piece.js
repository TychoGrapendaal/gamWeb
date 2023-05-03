class Piece {
  constructor(height, width, px, py, cellSize, image, team, move, shogun) {
    this.height = height;
    this.width = width;
    this.px = px;
    this.py = py;
    this.cellSize = cellSize;
    this.team = team;
    this.image = loadImage(image);
    this.move = move;
    this.realMove = move;
    this.shogun = shogun;
    this.moving = false;
  }

  show() {
    this.realMove = (grid[this.px][this.py] + this.move) % 4 + 1;
    if (this.shogun) {
      this.realMove = (grid[this.px][this.py] + this.move) % 2 + 1;
    }
    image(this.image, this.px * cellSize + (cellSize-this.height)/2, this.py * cellSize + (cellSize-this.width)/2, this.height, this.width);
    if (this.moving) {
      this.moves(this.realMove);
    }
  }

  moveTo(px, py) {
    if (turn === "w") {
      turn = "r";
    } else {
      turn = "w";
    }
    if (gridPieces[py][px] !== -1) {
      if (this.team === "w") {
        let i = redPieces.indexOf(gridPieces[py][px])
        redPieces.splice(i, 1);
      } else {
        let i = whitePieces.indexOf(gridPieces[py][px])
        whitePieces.splice(i, 1);
      }
    }
    gridPieces[py][px] = this;
    gridPieces[this.py][this.px] = -1;
    this.px = px;
    this.py = py;

    this.realMove = (grid[this.px][this.py] + this.move) % 4 + 1;
    if (this.shogun) {
      this.realMove = (grid[this.px][this.py] + this.move) % 2 + 1;
      this.image = loadImage("images/piece" + this.realMove + this.team + "s.png");
    } else {
      this.image = loadImage("images/piece" + this.realMove + this.team + ".png");
    }
  }

  moves(steps) {
    let moves = [];

    //check if piece in the way
    for (let ii = 0; ii < steps; ii++) {
      let pxLeft = this.px;
      let pxRight = this.px;
      let py = this.py;
      let left = true;
      let right = true;
      for (let i = 0; i < steps-1; i++) {

        if (i >= ii) {
          pxLeft--;
          pxRight++;
        } else {
          py++;
        }

        if (py < 0 || py >= cells || pxLeft < 0 || pxLeft >= cells || gridPieces[py][pxLeft] !== -1) left = false;
        if (py < 0 || py >= cells || pxRight < 0 || pxRight >= cells || gridPieces[py][pxRight] !== -1) right = false;

        if (i == (steps-2) && left && right && pxLeft === pxRight) moves.push([pxLeft, py+1]);
        if (i == (steps-2) && left) moves.push([pxLeft-1, py]);
        if (i == (steps-2) && right) moves.push([pxRight+1, py]);
      }
    }

    for (let ii = 0; ii < steps; ii++) {
      let pxLeft = this.px;
      let pxRight = this.px;
      let py = this.py;
      let left = true;
      let right = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pxLeft--;
          pxRight++;
        } else {
          py--;
        }

        if (py < 0 || py >= cells || pxLeft < 0 || pxLeft >= cells || gridPieces[py][pxLeft] !== -1) left = false;
        if (py < 0 || py >= cells || pxRight < 0 || pxRight >= cells || gridPieces[py][pxRight] !== -1) right = false;

        if (i == (steps-2) && left && right && pxLeft === pxRight) moves.push([pxLeft, py-1]);
        if (i == (steps-2) && left) moves.push([pxLeft-1, py]);
        if (i == (steps-2) && right) moves.push([pxRight+1, py]);
      }
    }


    for (let ii = 0; ii < steps; ii++) {
      let pyUp = this.py;
      let pyDown = this.py;
      let px = this.px;
      let up = true;
      let down = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pyUp--;
          pyDown++;
        } else {
          px--;
        }

        if (px < 0 || px >= cells || pyUp < 0 || pyUp >= cells || gridPieces[pyUp][px] !== -1) up = false;
        if (px < 0 || px >= cells || pyDown < 0 || pyDown >= cells || gridPieces[pyDown][px] !== -1) down = false;

        if (i == (steps-2) && up && down && pyUp === pyDown) moves.push([px-1, pyUp]);
        if (i == (steps-2) && up) moves.push([px, pyUp-1]);
        if (i == (steps-2) && down) moves.push([px, pyDown+1]);
      }
    }

    for (let ii = 0; ii < steps; ii++) {
      let pyUp = this.py;
      let pyDown = this.py;
      let px = this.px;
      let up = true;
      let down = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pyUp--;
          pyDown++;
        } else {
          px++;
        }

        if (px < 0 || px >= cells || pyUp < 0 || pyUp >= cells || gridPieces[pyUp][px] !== -1) up = false;
        if (px < 0 || px >= cells || pyDown < 0 || pyDown >= cells || gridPieces[pyDown][px] !== -1) down = false;

        if (i == (steps-2) && up && down && pyUp === pyDown) moves.push([px+1, pyUp]);
        if (i == (steps-2) && up) moves.push([px, pyUp-1]);
        if (i == (steps-2) && down) moves.push([px, pyDown+1]);
      }
    }




    if (steps === 1) {
      moves.push([this.px + 1, this.py + (steps-1)]);
      moves.push([this.px - 1, this.py - (steps-1)]);
      moves.push([this.px - (steps-1), this.py + 1]);
      moves.push([this.px + (steps-1), this.py - 1]);
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (m[0] < 0 || m[0] >= cells || m[1] < 0 || m[1] >= cells) {
        moves.splice(i, 1);
      }
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (gridPieces[m[1]][m[0]] !== -1 && gridPieces[m[1]][m[0]].team === this.team) {
        moves.splice(i, 1);
      }
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (gridPieces[m[1]][m[0]] !== -1 && gridPieces[m[1]][m[0]].team === this.team) {
        moves.splice(i, 1);
      }
    }

    moves = this.checkMoves(moves);

    //light up moves
    for (let i = 0; i < moves.length; i++) {
      let m = moves[i];
      fill(50,205,50, 150);
      rect(m[0] * cellSize, m[1] * cellSize, cellSize, cellSize);
    }

    // rect(i * cellSize, j * cellSize, cellSize, cellSize);

    return moves;
  }


  movesCopy(steps) {
    let moves = [];

    //check if piece in the way
    for (let ii = 0; ii < steps; ii++) {
      let pxLeft = this.px;
      let pxRight = this.px;
      let py = this.py;
      let left = true;
      let right = true;
      for (let i = 0; i < steps-1; i++) {

        if (i >= ii) {
          pxLeft--;
          pxRight++;
        } else {
          py++;
        }

        if (py < 0 || py >= cells || pxLeft < 0 || pxLeft >= cells || gridPiecesCopy[py][pxLeft] !== -1) left = false;
        if (py < 0 || py >= cells || pxRight < 0 || pxRight >= cells || gridPiecesCopy[py][pxRight] !== -1) right = false;

        if (i == (steps-2) && left && right && pxLeft === pxRight) moves.push([pxLeft, py+1]);
        if (i == (steps-2) && left) moves.push([pxLeft-1, py]);
        if (i == (steps-2) && right) moves.push([pxRight+1, py]);
      }
    }

    for (let ii = 0; ii < steps; ii++) {
      let pxLeft = this.px;
      let pxRight = this.px;
      let py = this.py;
      let left = true;
      let right = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pxLeft--;
          pxRight++;
        } else {
          py--;
        }

        if (py < 0 || py >= cells || pxLeft < 0 || pxLeft >= cells || gridPiecesCopy[py][pxLeft] !== -1) left = false;
        if (py < 0 || py >= cells || pxRight < 0 || pxRight >= cells || gridPiecesCopy[py][pxRight] !== -1) right = false;

        if (i == (steps-2) && left && right && pxLeft === pxRight) moves.push([pxLeft, py-1]);
        if (i == (steps-2) && left) moves.push([pxLeft-1, py]);
        if (i == (steps-2) && right) moves.push([pxRight+1, py]);
      }
    }


    for (let ii = 0; ii < steps; ii++) {
      let pyUp = this.py;
      let pyDown = this.py;
      let px = this.px;
      let up = true;
      let down = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pyUp--;
          pyDown++;
        } else {
          px--;
        }

        if (px < 0 || px >= cells || pyUp < 0 || pyUp >= cells || gridPiecesCopy[pyUp][px] !== -1) up = false;
        if (px < 0 || px >= cells || pyDown < 0 || pyDown >= cells || gridPiecesCopy[pyDown][px] !== -1) down = false;

        if (i == (steps-2) && up && down && pyUp === pyDown) moves.push([px-1, pyUp]);
        if (i == (steps-2) && up) moves.push([px, pyUp-1]);
        if (i == (steps-2) && down) moves.push([px, pyDown+1]);
      }
    }

    for (let ii = 0; ii < steps; ii++) {
      let pyUp = this.py;
      let pyDown = this.py;
      let px = this.px;
      let up = true;
      let down = true;
      for (let i = 0; i < steps-1; i++) {
        if (i >= ii) {
          pyUp--;
          pyDown++;
        } else {
          px++;
        }

        if (px < 0 || px >= cells || pyUp < 0 || pyUp >= cells || gridPiecesCopy[pyUp][px] !== -1) up = false;
        if (px < 0 || px >= cells || pyDown < 0 || pyDown >= cells || gridPiecesCopy[pyDown][px] !== -1) down = false;

        if (i == (steps-2) && up && down && pyUp === pyDown) moves.push([px+1, pyUp]);
        if (i == (steps-2) && up) moves.push([px, pyUp-1]);
        if (i == (steps-2) && down) moves.push([px, pyDown+1]);
      }
    }




    if (steps === 1) {
      moves.push([this.px + 1, this.py + (steps-1)]);
      moves.push([this.px - 1, this.py - (steps-1)]);
      moves.push([this.px - (steps-1), this.py + 1]);
      moves.push([this.px + (steps-1), this.py - 1]);
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (m[0] < 0 || m[0] >= cells || m[1] < 0 || m[1] >= cells) {
        moves.splice(i, 1);
      }
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (gridPiecesCopy[m[1]][m[0]] !== -1 && gridPiecesCopy[m[1]][m[0]].team === this.team) {
        moves.splice(i, 1);
      }
    }

    for (let i = moves.length-1; i >= 0; i--) {
      let m = moves[i];
      if (gridPiecesCopy[m[1]][m[0]] !== -1 && gridPiecesCopy[m[1]][m[0]].team === this.team) {
        moves.splice(i, 1);
      }
    }

    return moves;
  }



  moveToCopy(px, py) {
    if (gridPiecesCopy[py][px] !== -1) {
      if (this.team === "w") {
        let i = redPiecesCopy.indexOf(gridPiecesCopy[py][px])
        redPiecesCopy.splice(i, 1);
      } else {
        let i = whitePiecesCopy.indexOf(gridPiecesCopy[py][px])
        whitePiecesCopy.splice(i, 1);
      }
    }
    gridPiecesCopy[py][px] = this;
    gridPiecesCopy[this.py][this.px] = -1;
  }


  checkMoves(moves) {
    for (let i = moves.length-1; i >= 0; i--) {
      //simulate move
      gridPiecesCopy = copyArr2D(gridPieces);
      whitePiecesCopy = copyArr(whitePieces);
      redPiecesCopy = copyArr(redPieces);
      let m = moves[i];
      this.moveToCopy(m[0], m[1]);

      //check if problemx
      if (this.team === "w") {
        for (let j = 0; j < redPiecesCopy.length; j++) {
          let piece = redPiecesCopy[j];
          let movesCopy = piece.movesCopy(piece.realMove);
          for (let k = movesCopy.length-1; k >= 0; k--) {
            let mCopy = movesCopy[k];
            if (gridPiecesCopy[mCopy[1]][mCopy[0]] !== -1 && gridPiecesCopy[mCopy[1]][mCopy[0]].shogun) {
              moves.splice(i, 1);
              j = redPiecesCopy.length;
              break;
            }
          }
        }
      } else {
        for (let j = 0; j < whitePiecesCopy.length; j++) {
          let piece = whitePiecesCopy[j];
          let movesCopy = piece.movesCopy(piece.realMove);
          for (let k = movesCopy.length-1; k >= 0; k--) {
            let mCopy = movesCopy[k];
            if (gridPiecesCopy[mCopy[1]][mCopy[0]] !== -1 && gridPiecesCopy[mCopy[1]][mCopy[0]].shogun) {
              moves.splice(i, 1);
              j = whitePiecesCopy.length;
              break;
            }
          }
        }
      }
    }
    return moves;
  }
}
