class Circle {
  private currentPos: p5.Vector;
  private currentRadius: number;
  private lerpSpeed = 0.05;

  // Flag for being done
  public isDone: boolean;

  constructor(
    private startPos: p5.Vector,
    private endPos: p5.Vector,
    private startRadius: number,
    private endRadius: number,
    private rgbaColor: number[],
  ) {
    this.currentPos = startPos.copy();
    this.currentRadius = startRadius;
    this.isDone = false;
  }

  draw() {
    // Draw circle, noFill and with opacity stroke
    noFill();

    // Fill with color
    // fill(this.currentColor);
    strokeWeight(5);
    stroke(this.rgbaColor[0], this.rgbaColor[1], this.rgbaColor[2], this.rgbaColor[3]);
    // Draw the circle
    circle(this.currentPos.x, this.currentPos.y, this.currentRadius);
  }

  checkIfDone() {
    // Confere se chegou perto da distancia entre a startPos e a endPos
    if (p5.Vector.dist(this.currentPos, this.endPos) < p5.Vector.dist(this.startPos, this.endPos) * 0.01) {
      this.isDone = true;
    }
  }

  update() {
    // If done, return
    if (this.isDone) return;
    // Check if done (updates attribute)
    this.checkIfDone();

    // Lerp between startPos and endPos
    this.currentPos.lerp(this.endPos, this.lerpSpeed);
    // Lerp between startRadius and endRadius
    this.currentRadius = lerp(this.currentRadius, this.endRadius, this.lerpSpeed);
    // Lerp the rgba alpha to 0
    this.rgbaColor[3] = lerp(this.rgbaColor[3], 0, this.lerpSpeed);

  }
}

let c: Circle;

function setup() {
  createCanvas(400, 400);

  // Crio um circulo no meio do canvas, que vai ir pra cima/direita
  // e aumentar o radius
  c = new Circle(
    createVector(200, 200),
    createVector(300, 100),
    10,
    100,
    [255, 0, 0, 255]
  );

}

function draw() {
  background(150);

  c.draw();
  c.update();
}

// function getRgba(c: p5.Color) {
//   return [red(c), green(c), blue(c), alpha(c)];
// }