class Menu {
  constructor(nextPiece) {
    this.nextPiece = nextPiece;
    this.score = 0;
  }

  draw() {
    this.drawMenuBorder();
    this.drawNextPieceMenu();
    this.drawScoreMenu();
  }

  drawMenuBorder() {
    fill(MENU_BACKGROUND_COLOR);
    rect(MENU_X1, MENU_Y1, MENU_WIDTH, MENU_HEIGHT);
  }

  drawNextPieceMenu() {
    this.drawNextPieceBorder();
    this.drawNextPiece();
  }

  drawNextPieceBorder() {
    fill(MENU_BACKGROUND_COLOR);
    rect(
      MENU_X1 + MENU_SPACING,
      MENU_Y1 + MENU_SPACING,
      MENU_WIDTH - 2 * MENU_SPACING,
      MENU_Y1 + 3 * MENU_SPACING
    );
  }

  drawNextPiece() {
    let pieceMatrix = pieces[this.nextPiece].matrix;

    // Checks kind of piece, some of them will be drawn 1 box size lower
    let drawPiecesLower = ["O", "S", "Z"];
    let drawPiecesLeft = ["I"];
    let drawLower = 0;
    let drawLeft = 0;

    if (drawPiecesLower.includes(pieces[this.nextPiece].name)) {
      drawLower = 1;
    }

    if (drawPiecesLeft.includes(pieces[this.nextPiece].name)) {
      drawLeft = 1;
    }

    for (let i = 1; i <= pieceMatrix.length; i++) {
      for (let j = 1; j <= pieceMatrix.length; j++) {
        if (pieceMatrix[i - 1][j - 1] > 0) {
          let color = pieces[this.nextPiece].color + "CC";
          fill(color);
          rect(
            MENU_X1 +
              MENU_SPACING * j +
              3 * MENU_SPACING -
              drawLeft * MENU_SPACING,
            MENU_Y1 + MENU_SPACING * i + drawLower * MENU_SPACING,
            MENU_SPACING,
            MENU_SPACING
          );
        }
      }
    }
  }

  drawScoreMenu() {
    this.drawScoreBorder();
    this.drawScore();
  }

  drawScoreBorder() {
    fill(MENU_BACKGROUND_COLOR);
    rect(
      MENU_X1 + MENU_SPACING,
      MENU_Y1 + MENU_SPACING + 5 * MENU_SPACING,
      MENU_WIDTH - 2 * MENU_SPACING,
      MENU_Y1 + 3 * MENU_SPACING
    );
  }

  drawScore() {
    fill(255);
    textSize(45);
    text(
      "Score: " + this.score,
      MENU_X1 + 2 * MENU_SPACING,
      MENU_Y1 + 8.5 * MENU_SPACING
    );
  }

  setNextPiece(nextPiece) {
    this.nextPiece = nextPiece;
  }

  setScore(score) {
    this.score = score;
  }
}
