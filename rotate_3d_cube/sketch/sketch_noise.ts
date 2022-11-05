// interface NoiseDot {
//     x: number;
//     y: number;
//     z: number;
//     size: number;
//   }
  
//   let NoiseDots: NoiseDot[] = [];
  
  
//   function setup() {
//     createCanvas(400, 400, WEBGL);
  
  
//     for (let i = 0; i < 1500; i++) {
//       let n = {
//         x: random(-width / 2, width / 2),
//         y: random(-height / 2, height / 2),
//         z: 0,
//         size: random(2, 5),
//       }
//       // Add to array
//       NoiseDots.push(n);
//     }
//   }
  
//   function draw() {
//     background(0);
  
//     // Every frame translate the dots together
//     let dx = random(-1, 1);
//     let dy = random(-1, 1);
  
//     for (let i = 0; i < NoiseDots.length; i++) {
//       NoiseDots[i].x += dx;
//       NoiseDots[i].y += dy;
//     }
  
//     // Draw the noises
//     for (let i = 0; i < NoiseDots.length; i++) {
//       let v = NoiseDots[i];
//       // Draw the point
//       push();
//       stroke(255);
//       strokeWeight(2);
//       point(v.x, v.y, v.z);
//       pop();
//     }
  
  
  
//   }