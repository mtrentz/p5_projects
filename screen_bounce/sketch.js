const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

const GRAVITY = 1;

let observerPos;
let wallPos;

let b;

function setup() {
  observerPos = createVector(CANVAS_HEIGHT / 2, CANVAS_WIDTH / 2, 0);
  wallPos = createVector(0, 0, 10);

  createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH);
  b = new Ball(10, 100);
}

function draw() {
  background(220);
  b.draw();
}

class Ball {
  constructor(z, radius) {
    this.pos = createVector(CANVAS_HEIGHT / 2, CANVAS_WIDTH / 2, z);
    this.vel = createVector(0, 0, 0);
    this.radius = radius;
  }

  applyGravity() {
    this.vel.z -= GRAVITY;
  }

  updateVelocity() {
    this.pos.add(this.vel);
  }

  draw() {
    fill("0");
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }
}
