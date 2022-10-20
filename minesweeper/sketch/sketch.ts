let game: Game;

function setup() {
  createCanvas(400, 400);
  game = new Game();
  game.setup();
}

function draw() {
  background(150);
  game.draw();
  // console.log(game.cells)
  // noLoop()
}

// Watch for mouse clicks
function mousePressed() {
  // Iterate over the cells in the game
  for (let i = 0; i < game.rows; i++) {
    for (let j = 0; j < game.cols; j++) {
      const cell = game.cells[i][j];
      // Check if the mouse is inside the cell
      if (
        mouseX > cell.p1.x &&
        mouseX < cell.p2.x &&
        mouseY > cell.p1.y &&
        mouseY < cell.p2.y
      ) {
        console.log("Clicked on cell (i,j)", i, j);
        // Check for left click
        if (mouseButton === LEFT) {
          // Checo se é uma bomba, se for, dou console log
          if (cell.isBomb) {
            console.log("Bomba");
            return
          }

          // For every mouse click, for now, recount
          // the nearby bombs
          game.recount();

          // Se nao for, revelo os zeros de tudo
          game.revealZeroes(i, j, {});

          // // Reveal the cell
          // cell.isRevealed = true;
          // console.log("Revealed cell", i, j);
        }
      }
    }
  }
}