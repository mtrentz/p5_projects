function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let h = 100;

  // Simple leaf
  push();
  translate(width * 0.20, height * 0.7);
  beginShape();
  vertex(0, 0);
  bezierVertex(h * 0.4, -h * 0.2, h * 0.2, -h * 0.8, 0, -h);
  endShape();

  beginShape();
  vertex(0, 0);
  bezierVertex(-h * 0.4, -h * 0.2, -h * 0.2, -h * 0.8, 0, -h);
  endShape();
  pop();

  // ------

  // Curved leaf
  push();
  translate(width * 0.50, height * 0.7);
  beginShape();
  vertex(0, 0);
  bezierVertex(h * 0.4, -h * 0.2, h * 0.2, -h * 0.8, 0, -h);
  bezierVertex(-0, -h * 0.8, -h * 0.4, -h * 0.2, 0, 0);
  endShape();
  pop();

  // ------


  // Rounded
  push();
  translate(width * 0.80, height * 0.7);
  beginShape();
  vertex(0, 0);
  bezierVertex(h * 0.8, -h * 0.2, h * 0.3, -h * 0.8, 0, -h);
  endShape();

  beginShape();
  vertex(0, 0);
  bezierVertex(-h * 0.8, -20, -h * 0.3, -h * 0.8, 0, -h);
  endShape();
  pop();


}
