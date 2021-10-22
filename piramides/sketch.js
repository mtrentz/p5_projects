//INSPIRED ON THIS POST
// https://www.reddit.com/r/Art/comments/lck88p/441_me_digital_2021/

let pyramids = []

function setup() {
  createCanvas(600, 600);
  let start_point = [100, 100];
  let pyramid_size = 20;
  let apex_dist_ratio = 0.3;
  for (let x = start_point[0]; x <= 500; x = x + pyramid_size){
    for (let y = start_point[1]; y <= 500; y = y + pyramid_size){
      pyramids.push(new Pyramid([x, y], pyramid_size, apex_dist_ratio));
    }
  }
}

function draw() {
  background('#fef5b0');
  for (let i = 0; i < pyramids.length; i++){
    pyramids[i].draw()
    pyramids[i].update_apex([mouseX, mouseY])
  }
}

class Pyramid {
  constructor(base_center_pos, base_side_len, max_apex_distance_ratio) {
    this.base_center_x = base_center_pos[0];
    this.base_center_y = base_center_pos[1];
    this.apex_x = base_center_pos[0];
    this.apex_y = base_center_pos[1];
    this.side_len = base_side_len;
    this.max_apex_dist = this.side_len/2 + (this.side_len/2) * max_apex_distance_ratio

    // PYRAMID BASE SET UP LIKE THIS
    // x1,y1 ------ x2, y2
    //   |            |
    //   |            |
    //   |            |
    // x3,y3 ------ x4, y4

    this.x1 = this.base_center_x - floor(this.side_len / 2);
    this.y1 = this.base_center_y - floor(this.side_len / 2);
    this.x2 = this.base_center_x + floor(this.side_len / 2);
    this.y2 = this.base_center_y - floor(this.side_len / 2);
    this.x3 = this.base_center_x - floor(this.side_len / 2);
    this.y3 = this.base_center_y + floor(this.side_len / 2);
    this.x4 = this.base_center_x + floor(this.side_len / 2);
    this.y4 = this.base_center_y + floor(this.side_len / 2);
  }
  update_apex(new_apex_pos) {
    let temp_x = new_apex_pos[0];
    let temp_y = new_apex_pos[1];
    if (dist(temp_x, temp_y, this.base_center_x, this.base_center_y) > this.max_apex_dist) {
        // First Y_coord then X
        let angle = atan2(temp_y - this.base_center_y, temp_x - this.base_center_x);
        let delta_x = this.max_apex_dist * cos(angle);
        let delta_y = this.max_apex_dist * sin(angle);
        this.apex_x = this.base_center_x + delta_x;
        this.apex_y = this.base_center_y + delta_y;
    } else {
      this.apex_x = temp_x;
      this.apex_y = temp_y;
    }
  }
  draw() {
    if (this.apex_y < (this.base_center_y - floor(this.side_len / 2))) {
      // MOUSE TOP
      if (this.apex_x > (this.base_center_x + floor(this.side_len / 2))) {
        // MOUSE RIGHT
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
      } else {
        // MOUSE LEFT
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
      }
    } else if (this.apex_y > (this.base_center_y + floor(this.side_len / 2))) {
      //MOUSE BOT
      if (this.apex_x > (this.base_center_x + floor(this.side_len / 2))) {
        // MOUSE RIGHT
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
      } else {
        // MOUSE LEFT
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
      }
    } else {
      // MOUSE MIDDLE
      if (this.apex_x > (this.base_center_x + floor(this.side_len / 2))) {
        // MOUSE RIGHT
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
      } else {
        // MOUSE LEFT
        // LEFT TRIANGLE
        fill('#e64194');
        noStroke();
        triangle(this.x1, this.y1, this.x3, this.y3, this.apex_x, this.apex_y);
        // BOTTOM TRIANGLE
        fill('#372d84');
        noStroke();
        triangle(this.x3, this.y3, this.x4, this.y4, this.apex_x, this.apex_y);
        // RIGHT TRIANGLE
        fill('#6ec497');
        noStroke();
        triangle(this.x2, this.y2, this.x4, this.y4, this.apex_x, this.apex_y);
        // TOP TRIANGLE
        fill('#fef5b0');
        noStroke();
        triangle(this.x1, this.y1, this.x2, this.y2, this.apex_x, this.apex_y);
      }
    }



  }
}
