let gravity: p5.Vector

let c: Circle;

function setup() {
  gravity = createVector(0, 0.1);

  createCanvas(400, 400);
  c = new Circle(200, 200, 50);

}

function draw() {

  background(150);
  line(0, 200, width, 200);
  c.show();
  c.update();
  c.bounce();
}