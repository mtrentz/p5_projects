let circles: Circle[] = [];


function setup() {
  createCanvas(600, 600);

  // Starting at 100, 100 create a circle with radius 50,
  // then move 100 to the right and create another circle...
  // Then go down 100 and create another circle...
  // And so on...
  for (let x = 100; x < width; x += 200) {
    for (let y = 100; y < height; y += 200) {
      circles.push(new Circle(x, y, 40));
    }
  }

  // Setup each circle
  for (let i = 0; i < circles.length; i++) {
    circles[i].setup();
  }
}

function draw() {
  background(0);

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].pulse();
  }
}