class GameBoard extends Board {
  constructor() {
    super();
  }

  consume(pieceBoard) {
    pieceBoard.board.map((row, i) =>
      row.map((elem, j) => {
        if (elem > 0) {
          this.board[i][j] = elem;
        }
      })
    );
  }

  deleteLine(index) {
    // Deleta a linha, desce as outras de cima
    let newTopLine = new Array(COLS).fill(0);
    let aboveLines = this.board.slice(0, index);
    let updatedBoard;
    if (index + 1 < ROWS) {
      let belowLines = this.board.slice(index + 1, ROWS);
      updatedBoard = [newTopLine, ...aboveLines, ...belowLines];
    } else {
      updatedBoard = [newTopLine, ...aboveLines];
    }

    this.board = updatedBoard;
  }

  getScore() {
    let score = 0;

    for (var i = 0; i < ROWS; i++) {
      if (this.board[i].every((element) => element > 0)) {
        this.deleteLine(i);
        score++;
      }
    }
    return score;
  }
}
