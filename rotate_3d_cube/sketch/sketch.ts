// Preload galaxy img
let galaxy: p5.Image;
function preload() {
  // galaxy = loadImage("../galaxy-bw.jpg");
  galaxy = loadImage("../galaxy-2.png");
  // galaxy = loadImage("../galaxy-4.png");
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(0);

  smooth();

  push();
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // rotateY(HALF_PI);
  rotateX(HALF_PI)
  // rotateY(frameCount * 0.05);
  rotateZ(frameCount * 0.01);
  // textureMode(IMAGE);
  textureWrap(MIRROR);
  texture(galaxy);
  // stroke(0);
  noStroke();
  // torus(30, 200, 48, 32);
  sphere(500, 24, 24);
  pop();

  // Draw the box
  push();
  // strokeJoin(BEVEL);
  // strokeCap(ROUND);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  stroke(255)
  strokeWeight(1);
  fill(0)
  box(100);
  pop();





}