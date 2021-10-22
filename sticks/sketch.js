var sticks = []
function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);
  for (let i = 0; i < sticks.length; i++) {
    sticks[i].show();
    sticks[i].rotate();
  }
}


function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}


function mouseClicked() {
  let s = new Stick(mouseX, mouseY, 100);
  sticks.push(s)
}