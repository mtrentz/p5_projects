interface Cell {
    // Top left corner
    p1: p5.Vector;
    // Bottom right corner
    p2: p5.Vector;
    isBomb: boolean;
    isFlagged: boolean;
    isRevealed: boolean;
    // Number of bombs in adjacent cells
    nearbyBombs: number;
}

class Game {
    rows: number;
    cols: number;

    // 2D array of cells
    cells: Cell[][];

    // Number of bombs
    bombs: number;

    isGameOver: boolean;

    constructor(rows: number = 20, cols: number = 20, bombs: number = 80) {
        this.rows = rows;
        this.cols = cols;
        this.bombs = bombs;
        this.cells = [];
    }

    setup() {
        // Set gameover false
        this.isGameOver = false;

        // Figure out the size of each cell based on the canvas size
        const cellWidth = (width - 10) / this.cols;
        const cellHeight = (height - 10) / this.rows;

        // Made up origin point, so that the board doesnt
        // start at (0,0)
        const origin = createVector(5, 5);

        // Create the cells
        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const p1 = createVector(
                    origin.x + j * cellWidth,
                    origin.y + i * cellHeight
                );
                const p2 = createVector(
                    origin.x + (j + 1) * cellWidth,
                    origin.y + (i + 1) * cellHeight
                );
                this.cells[i][j] = {
                    p1,
                    p2,
                    isBomb: false,
                    isFlagged: false,
                    isRevealed: false,
                    nearbyBombs: 0,
                };
            }
        }

        let placedBombs = 0;

        // Pick random cells until we have placed all the bombs
        // First check if there are enough cells, else
        // throw error
        if (this.rows * this.cols < this.bombs) {
            throw new Error("Too many bombs");
        }

        while (placedBombs < this.bombs) {
            const i = floor(random(this.rows));
            const j = floor(random(this.cols));
            const cell = this.cells[i][j];
            if (!cell.isBomb) {
                cell.isBomb = true;
                placedBombs++;
            }
        }

        // Recount the bombs
        this.recount();
    }


    recount() {
        // This is probably super inefficient,
        // but iterate over all cells and reset the 
        // counters
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j].nearbyBombs = 0;
            }
        }

        // Iterate over all cells that are bombs
        // and increment the nearbyBombs counter
        // of all adjacent cells
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.cells[i][j];
                if (!cell.isBomb) {
                    continue;
                }

                // Loop from i-1 and j-1 
                // to i+1 and j+1,
                // checking if out of bounds
                for (let x = i - 1; x <= i + 1; x++) {
                    for (let y = j - 1; y <= j + 1; y++) {
                        // Check out of bounds
                        if (this._isOutOfBounds(x, y)) {
                            continue;
                        }
                        // Increment nearbyBombs
                        this.cells[x][y].nearbyBombs++;
                    }
                }
            }
        }
    }

    _isOutOfBounds(i: number, j: number) {
        return i < 0 || i >= this.rows || j < 0 || j >= this.cols;
    }

    // Memo with a string key and a boolean value
    revealZeroes(i: number, j: number, prevIsZero: boolean, memo: { [key: string]: boolean }) {
        let cell = this.cells[i][j]

        // If its a bomb, return
        if (cell.isBomb) {
            return
        }

        // Garanto q tem nearbybomb e a celula que chamou essa função
        // NÂO era um zero. Nesse caso, nao faço nada
        if (cell.nearbyBombs > 0 && !prevIsZero) {
            return
        }

        if (!prevIsZero) {
            return
        }

        // Seto a celula atual para revelada
        cell.isRevealed = true;

        // Preciso chamar a função recursivamente
        // pra cima, baixo, esquerda e direita.
        let adjacents = [
            // Pra cima (significa DIMINUIR o 'i')
            [i - 1, j],
            // Pra baixo (significa AUMENTAR o 'i')
            [i + 1, j],
            // Pra esquerda (significa DIMINUIR o 'j')
            [i, j - 1],
            // Pra direita (significa AUMENTAR o 'j')
            [i, j + 1]
        ]

        // Para cada adjacente, chamo a função recursivamente
        for (let adjacent of adjacents) {
            let [x, y] = adjacent
            if (!this._isOutOfBounds(x, y)) {
                // Check if not already memoized
                if (!memo[`x${x}y${y}`]) {
                    // Só seto o memo se a celula não for zero
                    if (cell.nearbyBombs === 0) {
                        memo[`x${x}y${y}`] = true;
                    }
                    // Call recursively
                    this.revealZeroes(x, y, cell.nearbyBombs === 0, memo);
                }
            }
        }

        let diagonals = [
            // Pra cima e pra esquerda
            [i - 1, j - 1],
            // Pra cima e pra direita
            [i - 1, j + 1],
            // Pra baixo e pra esquerda
            [i + 1, j - 1],
            // Pra baixo e pra direita
            [i + 1, j + 1]
        ]

        // Para cada diagonal, confiro se revelar ou não
        for (let diagonal of diagonals) {
            let [x, y] = diagonal
            if (!this._isOutOfBounds(x, y)) {
                // Confiro se essa celula ai tem nearByBomb
                // e a minha atual não
                if (this.cells[x][y].nearbyBombs > 0 && cell.nearbyBombs === 0) {
                    // Seto ela como revelada
                    this.cells[x][y].isRevealed = true
                }
            }
        }
    }

    gameOver() {
        this.isGameOver = true;
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.cells[i][j];

                // If gameover, set to black and continue
                if (this.isGameOver) {
                    push();
                    fill(0);
                    rect(cell.p1.x, cell.p1.y, cell.p2.x - cell.p1.x, cell.p2.y - cell.p1.y);
                    pop();
                    // TODO: fazer um gameover de vdd dando reveal
                    // Write game over
                    push();
                    fill(255);
                    textSize(32);
                    textAlign(CENTER, CENTER);
                    text('Game Over', width / 2, height / 2);
                    pop();
                    continue
                }

                push();
                stroke(0);
                // noFill();
                // If reveleade but has nearby bombs, fill with gray
                // else fill with very light gray
                if (cell.isRevealed) {
                    if (cell.nearbyBombs > 0) {
                        fill(150);
                    } else {
                        fill(200);
                    }
                } else if (cell.isFlagged) {
                    // Fill light blue
                    fill(0, 0, 255, 100);
                } else if (cell.isBomb) {
                    // For debug
                    // Fill red
                    // fill(255, 0, 0);
                }

                rect(cell.p1.x, cell.p1.y, cell.p2.x - cell.p1.x, cell.p2.y - cell.p1.y);
                pop();
            }
        }

        // Draw the numbers on revealed cells
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = this.cells[i][j];
                if (cell.isRevealed && cell.nearbyBombs > 0) {
                    // if (!cell.isBomb) {
                    push();
                    fill(0);
                    textAlign(CENTER, CENTER);
                    text(cell.nearbyBombs, cell.p1.x, cell.p1.y, cell.p2.x - cell.p1.x, cell.p2.y - cell.p1.y);
                    pop();
                }
            }
        }
    }
}