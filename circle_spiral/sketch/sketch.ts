class Circle {
  private currentPos: p5.Vector;
  private currentRadius: number;
  private lerpSpeed = CIRCLE_SPEED;
  private currentColor: p5.Color;
  private endColor: p5.Color;

  // Flag for being done
  public isDone: boolean;

  constructor(
    private startPos: p5.Vector,
    private endPos: p5.Vector,
    private startRadius: number,
    private endRadius: number,
    private circleColor: p5.Color,
  ) {
    this.currentPos = startPos.copy();
    this.currentRadius = startRadius;
    this.isDone = false;

    // Create a copy of the color with alpha 255
    this.currentColor = color(red(circleColor), green(circleColor), blue(circleColor), 255);
    // Create a copy of the color with alpha 0
    this.endColor = color(red(circleColor), green(circleColor), blue(circleColor), 0);
  }

  draw() {
    // Draw circle, noFill and with opacity stroke
    noFill();

    // Fill with color
    // fill(this.currentColor);
    strokeWeight(5);
    stroke(this.currentColor);
    // Draw the circle
    circle(this.currentPos.x, this.currentPos.y, this.currentRadius);
  }

  checkIfDone() {
    // Confere se chegou perto da distancia entre a startPos e a endPos
    if (p5.Vector.dist(this.currentPos, this.endPos) < p5.Vector.dist(this.startPos, this.endPos) * LERP_PERFECTION_PCT) {
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
    this.currentColor = lerpColor(this.currentColor, this.endColor, this.lerpSpeed);
  }
}

let circles: Circle[] = [];

// Gerador que "loopa" pelos valores da paleta de cores
// quando chega na ultima, manda a primeira denovo, etc...
const colorGenerator = function* () {
  let index = 0
  while (true) {
    yield colors[index++ % colors.length]
  }
};

let colorGen = colorGenerator();

let colors: p5.Color[];

function setup() {
  createCanvas(400, 400);

  colors = [
    color(141, 121, 253),
    color(92, 233, 227),
    color(255, 99, 132),
    color(255, 159, 64),
    color(255, 205, 86),
    color(75, 192, 192),
    color(54, 162, 235),
    color(153, 102, 255),
    color(201, 203, 207),
  ]
}

let START_ANGLE = 0;
let START_DISTANCE = 25;
let ANGLE_STEP = 0.3;
let DISTANCE_STEP = 0.5;
let START_RADIUS = 25;
let END_RADIUS = 500;
let CIRCLE_SPEED = 0.05;
let CIRCLE_FREQUENCY = 2; // Every X frames, create circle
let MAX_DISTANCE = 100;
let LERP_PERFECTION_PCT = 0.01; // Quanto % da distancia nos lerp até considerar done

// Starting values
let launchAngle = START_ANGLE;
let launchDistance = START_DISTANCE;

function draw() {
  background(0);

  // If launchDistance is less than START_DISTANCE,
  // reverse the step
  if (launchDistance < START_DISTANCE) {
    console.log("REVERSING, got too close to center")
    // Force distance step to be positive
    DISTANCE_STEP = +abs(DISTANCE_STEP);
  }

  // Check if distance is max distance, if so, reverse
  // the step
  if (launchDistance > MAX_DISTANCE) {
    console.log("REVERSING, got too far from center")
    // Force distance step to be negative
    DISTANCE_STEP = -abs(DISTANCE_STEP);
  }


  // If framecount is a multiple of X, create a new circle
  // It moves launchDistance towards launchDegree.
  if (frameCount % CIRCLE_FREQUENCY === 0) {
    const startPos = createVector(width / 2, height / 2);
    const endPos = createVector(
      startPos.x + launchDistance * cos(launchAngle),
      startPos.y + launchDistance * sin(launchAngle),
    );
    const circle = new Circle(startPos, endPos, START_RADIUS, END_RADIUS, colorGen.next().value);
    circles.push(circle);

    // Increment launchDegree
    launchAngle += ANGLE_STEP;

    // Increment launchDistance
    launchDistance += DISTANCE_STEP;
  }

  // Update and draw all circles
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].draw();

    // If circle is done, remove it
    if (circles[i].isDone) {
      circles.splice(i, 1);
    }
  }

}
