let n_balls = 5;
let x_pos = 0;
let vel = 5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(150);
  
  if(x_pos >= width){
    vel = -vel
     }
  if(x_pos < 0){
    vel = -vel
  }
 
  //circle(x_pos,200,50);
  for(n=0; n <= n_balls; n++){
    circle(x_pos, n*100 ,50);
  }
  
  x_pos += vel
}