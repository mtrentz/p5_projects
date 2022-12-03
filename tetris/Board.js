class Board {
  constructor() {
    this.board = this.createEmptyBoard();
  }

  createEmptyBoard() {
    let board = new Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
    return board;
  }

  cleanBoard() {
    this.board = this.createEmptyBoard();
  }

  cropBoard(x1, y1, x2, y2) {
    let croppedLines;
    let cropped = [];

    croppedLines = this.board.slice(y1, y2 + 1);

    for (let i in croppedLines) {
      cropped.push(croppedLines[i].slice(x1, x2 + 1));
    }
    return cropped;
  }

  drawGrid() {
    // Draw horizontal lines
    for (let i = 0; i < ROWS - (EXTRA_ROWS - 1); i++) {
      let x1 = BOARD_X1;
      let y1 = BOARD_Y1 + i * BOX_SIZE;
      let x2 = BOARD_X1 + BOARD_WIDTH;
      let y2 = y1;

      stroke(STROKE);
      strokeWeight(STROKE_WEIGHT);
      line(x1, y1, x2, y2);
    }

    // Draw vertical lines
    for (let j = 0; j < COLS + 1; j++) {
      let x1 = BOARD_X1 + j * BOX_SIZE;
      let y1 = BOARD_Y1;
      let x2 = x1;
      let y2 = BOARD_Y1 + BOARD_HEIGHT;

      stroke(STROKE);
      strokeWeight(STROKE_WEIGHT);
      line(x1, y1, x2, y2);
    }
  }

  drawBackground() {
    fill(BOARD_BACKGROUND_COLOR);
    rect(BOARD_X1, BOARD_Y1, BOARD_WIDTH, BOARD_HEIGHT);
  }

  draw() {
    // Starts at EXTRA_ROWS, since are the hidden ones
    for (var i = EXTRA_ROWS; i < ROWS; i++) {
      for (var j = 0; j < COLS; j++) {
        let x1 = BOARD_X1 + j * BOX_SIZE;
        let y1 = BOARD_Y1 + (i - EXTRA_ROWS) * BOX_SIZE;
        if (this.board[i][j] > 0) {
          // Subtracts EXTRA_ROWS, so in the beggining in multiplies by 0
          let pieceNumber = this.board[i][j];
          let color = pieces[pieceNumber].color + "CC";
          fill(color);
          rect(x1, y1, BOX_SIZE, BOX_SIZE);
        }
      }
    }
  }
}
