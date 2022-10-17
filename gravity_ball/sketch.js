let b;

let gravity;

function setup() {
  // y positivo pq no canvas y é pra baixo
  gravity = createVector(0, 1);

  createCanvas(400, 400);
  b = new Ball(200, 200, 30);
}

function draw() {
  background(220);
  b.draw();
  b.update();
}

class Ball {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = radius;
  }

  update() {
    this.vel = this.vel.add(gravity);
    this.pos = this.pos.add(this.vel);

    if (this.pos.y + this.radius >= height) {
      this.pos.y = height - this.radius;
      this.vel.y *= -0.8;
    }
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }
}
