let circles: Circle[] = [];


function setup() {
  createCanvas(1200, 1200);

  // Starting at 100, 100 create a circle with radius 50,
  // then move 100 to the right and create another circle...
  // Then go down 100 and create another circle...
  // And so on...
  for (let x = 250; x < width; x += 250) {
    for (let y = 250; y < height; y += 250) {
      circles.push(new Circle(x, y, 50));
    }
  }

  // Setup each circle
  for (let i = 0; i < circles.length; i++) {
    circles[i].setup();
  }


  // c1_v = createVector(width / 4, height / 2);
  // c2_v = createVector(width / 4 * 3, height / 2);

  // c1 = new Circle(c1_v.x, c1_v.y, 50);
  // c2 = new Circle(c2_v.x, c2_v.y, 50);
  // c1.setup()
  // c2.setup()
  // frameRate(5);
}

function draw() {
  background(0);

  console.log(circles)

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].pulse();
  }

  // noLoop();

  // Todo: pra mover cada circulo,
  // preciso de um metodo q aplica
  // pra cada dot a movimentacao.

}