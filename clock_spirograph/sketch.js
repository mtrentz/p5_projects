// Copying from this post https://www.reddit.com/r/woahdude/comments/r4uhbk/the_geometry_of_clock_hands/

let canvasWidth = 600;
let canvasHeight = 600;
let clock

// After a while lines stop being recoded, so small velocities might not work
const VELOCITY = 0.5

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  clock = new Clock(canvasWidth, canvasHeight)
  background('#0a0635')
}

function draw() {
  clock.draw()
  clock.updateHands(VELOCITY)
}

class Clock {
  constructor(canvasWidth, canvasHeight){
    this.centerX = floor(canvasWidth/2);
    this.centerY = floor(canvasHeight/2);
    
    // Clock radius is 90% of the smallest canvas dimension
    this.outerRadius = min(this.centerX, this.centerY)*0.9
    this.outerDiameter = this.outerRadius*2
    this.clockSize = floor(this.outerDiameter)
    this.innerRadius = min(this.centerX, this.centerY)*0.8
    this.innerDiameter = this.innerRadius*2
    this.clockFaceSize = floor(this.innerDiameter*1.01)
    
    // Hands, both start at 270 degrees which is midday/midnight
    this.hourHand = new Hand(this.centerX, this.centerY, this.innerRadius*0.5, 7, 270)
    this.minuteHand = new Hand(this.centerX, this.centerY, this.innerRadius*0.8, 5, 270)
    
    // Here I will store the lines to draw at every render
    // it will be array of arrays [[x1,y1, x2, y2], [], ...]
    this.lines = []
  }
  
  draw(){
    this._drawBorder()
    this._drawClockFace()
    this._drawMajorTicks()
    this._drawMinorTicks()
    this._drawHands()
  }
  
  _drawBorder(){
    strokeWeight(1)
    fill('#bab7bf')
    stroke('#000000');
    circle(this.centerX, this.centerY, this.clockSize)
  }
  
  _drawClockFace(){
    strokeWeight(1)
    fill('#fefefd')
    stroke('#000000');
    circle(this.centerX, this.centerY, this.clockFaceSize)
  }
  
  _drawMajorTicks(){
    for (let theta = 0; theta <= 360; theta += 30) {
      this._drawTick(theta, 30, 5)
    }
  }
  
  _drawMinorTicks(){
    for (let theta = 0; theta <= 360; theta += 6) {
      if (theta % 30 == 0) {
        continue
      }
      this._drawTick(theta, 15, 2)
    }
  }
      
  _drawTick(degree, length, thickness){
      let radians = degrees_to_radians(degree)
      let outerDeltaX = this.innerRadius * cos(radians);
      let outerDeltaY = this.innerRadius * sin(radians);
      let outerX = this.centerX + outerDeltaX;
      let outerY = this.centerY + outerDeltaY;
      
      let innerDeltaX = (this.innerRadius - length) * cos(radians);
      let innerDeltaY = (this.innerRadius - length) * sin(radians);
      let innerX = this.centerX + innerDeltaX;
      let innerY = this.centerY + innerDeltaY;
      
      stroke('#000000');
      strokeWeight(thickness)
      line(innerX, innerY, outerX, outerY); 
  }
    
  _drawHands() {
    this.hourHand.draw()
    this.minuteHand.draw()
  }
    
  _getConnectingLines(){
    let hourX, hourY, minuteX, minuteY
    [hourX, hourY] = this.hourHand.getPos();
    [minuteX, minuteY] = this.minuteHand.getPos();
    return [hourX, hourY, minuteX, minuteY]
  }
    
  _appendConnectingLine(x1, y1, x2, y2){
    this.lines.push([x1, y1, x2, y2])
    
    // This is to make sure there wont be many lines being draw
    // once it gets to 1k, it will always remove 1 as it adds one
    if (this.lines.length >= 1000){
      this.lines = this.lines.slice(1, -1)
    }
  }
    
  _drawConnectingLine(x1, y1, x2, y2){
    stroke('#EB6718');
    strokeWeight(2)
    line(x1, y1, x2, y2)
  }
  
  _drawPastLines(){
    for(let i=0; i < this.lines.length; i++){
      stroke('#EB6718');
      strokeWeight(0.3)
      line(this.lines[i][0], this.lines[i][1], this.lines[i][2], this.lines[i][3])
    }
  }
    
  updateHands(speed) {
    this.hourHand.updateDegree(speed);
    this.minuteHand.updateDegree(speed*12);
    this._drawHands()
    
    let hourX, hourY, minuteX, minuteY
    [hourX, hourY, minuteX, minuteY] = this._getConnectingLines()
    this._drawConnectingLine(hourX, hourY, minuteX, minuteY)
    this._appendConnectingLine(hourX, hourY, minuteX, minuteY)
    this._drawPastLines()
  }
}

  
class Hand {
  constructor(centerX, centerY, length, thickness, degree){
    this.centerX = centerX;
    this.centerY = centerY;
    this.length = length;
    this.thickness = thickness;
    this.degree = degree;
    
    // Tip of the hand position
    this.handX = 0;
    this.handY = 0;
  }
  
  draw(){
    let radians = degrees_to_radians(this.degree)
    let deltaX = this.length * cos(radians);
    let deltaY = this.length * sin(radians); 
    this.handX = this.centerX + deltaX;
    this.handY = this.centerY + deltaY;
    
    // This is an "excess" length, that will be opposite of the spin axis of the hand.
    // Since in real clocks the hand aren't attached to the face at its tip
    let opositeDeltaX = (this.length * cos(radians + Math.PI))*0.05
    let opositeDeltaY = (this.length * sin(radians + Math.PI))*0.05
    let startX = this.centerX + opositeDeltaX
    let startY = this.centerY + opositeDeltaY
    
    stroke('#000000');
    strokeWeight(this.thickness)
    line(startX, startY, this.handX, this.handY);
  }
  
  updateDegree(degree){
    this.degree += degree;
  }
  
  getPos(){
  // Returns the tip point of the hand
    return [this.handX, this.handY]
  }
}

function degrees_to_radians(degrees){
  var pi = Math.PI;
  return degrees * (pi/180);
}