function setup() {
  createCanvas(400, 400);
}

function draw() {
  [r,g,b] = getRandomColor();
  fill(r,g,b)
  ellipse(mouseX, mouseY, 80, 80);
}


function getRandomColor() {
  r = Math.floor(Math.random() * (255 - 0) ) + 0;
  g = Math.floor(Math.random() * (255 - 0) ) + 0;
  b = Math.floor(Math.random() * (255 - 0) ) + 0;
  return [r,g,b]
}