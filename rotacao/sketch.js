let H = 600
let W = 600
let center_x = H / 2
let center_y = W / 2
var circles = []
var bc1_x, bc1_y, bc2_x, bc2_y, bc3_x, bc3_y, x_to_update, y_to_update
var speed_big_circle = 3



function setup() {
  createCanvas(H, W);

  // Quero três circulos ao redor do ponto central da tela (center_x, center_y)
  var biggest_circle_radius = 300;
  var bc1_r = 120;
  var bc2_r = 240;
  var bc3_r = 360;

  [bc1_x, bc1_y] = get_coord_radial(center_x, center_y, biggest_circle_radius, bc1_r);
  [bc2_x, bc2_y] = get_coord_radial(center_x, center_y, biggest_circle_radius, bc2_r);
  [bc3_x, bc3_y] = get_coord_radial(center_x, center_y, biggest_circle_radius, bc3_r);

  circles = [
    //params(x, y, speed_small, speed_big, radius_big, radius_small)
    new big_circle(bc1_x, bc1_y, 3, 100, 25),
    new big_circle(bc2_x, bc2_y, 3, 100, 25),
    new big_circle(bc3_x, bc3_y, 3, 100, 25)
  ]

  // Velocidade que os circulos grandes movem
}

function draw() {
  background(220);
  for (let i = 0; i < circles.length; i++) {
    circles[i].draw_circles();
    circles[i].move_small_circles();
    [x_before, y_before] = circles[i].get_big_circle_coord();
    console.log(x_before, y_before)
    radius_rad_before = get_radius_of_point(center_x, center_y, x_before, y_before);
    radius_deg_before = radians_to_degrees(radius_rad_before);
    [x_after, y_after] = update_coord(center_x, center_y, x_before, y_before, radius_deg_before, speed_big_circle);
    circles[i].set_big_circle_coord(x_after, y_after);
  }
}

function get_coord_radial(x_center, y_center, distance, degrees) {
  theta = degrees_to_radians(degrees)
  x = x_center + Math.floor(distance / 2 * Math.cos(theta));
  y = y_center + Math.floor(distance / 2 * Math.sin(theta));
  return [x, y]
}


function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function update_coord(center_x, center_y, p_x, p_y, curr_deg, vel) {
  vx = p_x - center_x;
  vy = p_y - center_y;
  distance = Math.sqrt(vx * vx + vy * vy);
  new_deg = curr_deg + vel;
  [new_px, new_py] = get_coord_radial(center_x, center_y, distance, new_deg);
  return [new_px, new_py]
}

function get_radius_of_point(center_x, center_y, p_x, p_y) {
  custom_x = center_x - p_x
  custom_y = center_y - p_y
  tetha = Math.atan2(custom_x, custom_y)
  return tetha
  // vx = p_x - center_x;
  // vy = p_y - center_y;
  // distance = Math.sqrt(vx * vx + vy * vy);
  // tetha = Math.acos(  (2*(p_x - center_x))/distance  )
  // return tetha
}
  
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}


class big_circle {
  constructor(x, y, speed_small_circle, radius_big_circle, radius_small_circle) {
    this.x = x;
    this.y = y;
    this.radius_big_circle = radius_big_circle;
    this.radius_small_circle = radius_small_circle;
    this.speed_small_circle = speed_small_circle
    // Esse é o inicio dos angulos dos circulos pequenos, quero equidistantes, ou seja 360/3
    this.deg1 = 120;
    this.deg2 = 240;
    this.deg3 = 360;
    // Inicio das posicoes do circulo pequeno
    this.c1_x = 0
    this.c1_y = 0
    this.c2_x = 0
    this.c2_y = 0
    this.c3_x = 0
    this.c3_y = 0
  }

  draw_circles() {
    [this.c1_x, this.c1_y] = get_coord_radial(this.x, this.y, this.radius_big_circle, this.deg1);
    [this.c2_x, this.c2_y] = get_coord_radial(this.x, this.y, this.radius_big_circle, this.deg2);
    [this.c3_x, this.c3_y] = get_coord_radial(this.x, this.y, this.radius_big_circle, this.deg3);
    //console.log(this.c1_x, this.c1_y)
    circle(this.c1_x, this.c1_y, this.radius_small_circle);
    circle(this.c2_x, this.c2_y, this.radius_small_circle);
    circle(this.c3_x, this.c3_y, this.radius_small_circle);
  }

  move_small_circles() {
    this.deg1 = this.deg1 + this.speed_small_circle;
    this.deg2 = this.deg2 + this.speed_small_circle;
    this.deg3 = this.deg3 + this.speed_small_circle;
  }

  get_big_circle_coord() {
    return [this.x, this.y]
  }
  set_big_circle_coord(x, y) {
    this.x = x
    this.y = y
  }

}