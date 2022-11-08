class Circle {
  // Flag to check if moving
  private isMoving = true;
  // Flag to check if done
  public isDone = false;
  // Keeps current position
  private currPos: p5.Vector;
  // Keeps next position
  private nextPos: p5.Vector;

  constructor(
    private startPos: p5.Vector,
    private maxPos: p5.Vector,
    private moveDirection: p5.Vector,
    private radius: number,
    private color: p5.Color,
  ) {
    // Get the current position
    this.currPos = this.startPos.copy();

    // Set the next position
    this.nextPos = this.startPos.copy();
    // Add the move direction to the next position
    this.nextPos.add(this.moveDirection);
  }

  update() {
    // Every X frame I want to trigger
    // the animation of the circle,
    // which begin to move the circle to
    // the next position. Once it gets there
    // I'll calulate the next newPosition 
    // and set the isMoving flag to false so
    // the circle will stop moving, and be
    // ready to move again.

    // If frame is multiple of the global variable
    // and its not currently moving
    // set to moving
    if (frameCount % FRAME_FREQUENCY === 0 && !this.isMoving) {
      this.isMoving = true;
    }

    // If is moving, lerp the position
    // to the next position
    if (this.isMoving) {
      this.currPos.lerp(this.nextPos, LERP_PCT);
    }

    // Check if very close to the next position
    // and if so, set the current position to 
    // the next position, recalculate the new next 
    // position and set isMoving to false
    if (this.currPos.dist(this.nextPos) < 1) {
      this.currPos = this.nextPos.copy();
      this.nextPos.add(this.moveDirection);
      this.isMoving = false;
    }

    // Check if the distance between the current position
    // and the start position is greater than the max position
    // and if so, set isDone to true
    if (this.currPos.dist(this.startPos) > this.maxPos.dist(this.startPos)) {
      this.isDone = true;
    }
  }

  draw() {
    // Draw the circle with fill
    noStroke();
    fill(this.color);
    circle(this.currPos.x, this.currPos.y, this.radius * 2);
  }
}


const colorGenerator = function* () {
  let index = 0
  while (true) {
    yield colors[index++ % colors.length]
  }
};

let colorGen = colorGenerator();

let colors: p5.Color[];



// Global variables
let LERP_PCT = 0.05;
let FRAME_FREQUENCY = 30;

let moveVector: p5.Vector;

let circles: Circle[] = [];


// Função que adiciona os 4 circulos
// no array
function addCircles() {
  // Pick randomly one of the four functions
  let randomFunction = random([
    horizontalCirclesV1,
    horizontalCirclesV2,
    diagonalCirclesV1,
    diagonalCirclesV2,
  ]);

  // Call the function
  randomFunction();
}

// Cria circulos movendo na horizontal da esquerda pra direita
function horizontalCirclesV1() {
  // Cria quatro circulos, com a msm setting
  for (let i = 0; i < 5; i++) {
    let c: Circle = new Circle(
      createVector(-50 * i, -52 + 100 * i),
      createVector(width + 200, 50 + i * 100),
      createVector(200, 0),
      52,
      colorGen.next().value
    );
    circles.push(c);
  }
}

// Cria circulos movendo na horizontal da direita pra esquerda
function horizontalCirclesV2() {
  // Cria quatro circulos, com a msm setting
  for (let i = 0; i < 5; i++) {
    let c: Circle = new Circle(
      createVector(width + 50 * i, -52 + 100 * i),
      createVector(-200, 50 + i * 100),
      createVector(-200, 0),
      52,
      colorGen.next().value
    );
    circles.push(c);
  }
}



// Cria circulos movendo na diagonal, de cima esquerda pra baixo direia
function diagonalCirclesV1() {
  // Cria quatro circulos, com a msm setting
  for (let i = 0; i < 5; i++) {
    let c: Circle = new Circle(
      createVector(-50 * i, -52 + 100 * i),
      createVector(width + 200, 50 + i * 100),
      createVector(200, 50),
      55,
      colorGen.next().value
    );
    circles.push(c);
  }
}

// Cria circulos movendo na diagonal, de cima direita pra baixo esquerda
function diagonalCirclesV2() {
  // Cria quatro circulos, com a msm setting
  for (let i = 0; i < 5; i++) {
    let c: Circle = new Circle(
      createVector(width + 50 * i, -52 + 100 * i),
      createVector(-200, 50 + i * 100),
      createVector(-200, 50),
      55,
      colorGen.next().value
    );
    circles.push(c);
  }
}


function setup() {
  createCanvas(400, 400);
  background(0);
  smooth();

  colors = [
    color(141, 121, 253),
    color(92, 233, 227),
    color(255, 99, 132),
    color(255, 159, 64),
    color(255, 205, 86),
    color(75, 192, 192),
    color(54, 162, 235),
    color(153, 102, 255),
    color(201, 203, 207),
  ]

  addCircles();
}

function draw() {
  // background(150);

  // Update and draw the circles
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].draw();
  }

  // If the circle is done, remove it from the array
  // Do it backwarads so I don't mess up the index
  for (let i = circles.length - 1; i >= 0; i--) {
    if (circles[i].isDone) {
      circles.splice(i, 1);
    }
  }

  // If there are no circles left, add more
  if (circles.length === 0) {
    addCircles();
  }

}