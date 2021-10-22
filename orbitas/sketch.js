// Configuracao do tamanho do Canvas
let H = 600;
let W = 600;
let center_x = H/2;
let center_y = W/2;
// Array pra segurar as sub-orbitas
let sub_orbits = [];
////// CONFIGURACAO DA ANIMACAO
const NUMERO_SUB_ORBITAS = 5;
const RAIO_SUB_ORBITAS = 75;
const VEL_SUB_ORBITS = 0.1;
const NUMERO_CIRCULOS = 5;
const RAIO_CIRCULOS = 50;
const VEL_CIRCULOS = 3;



function setup() {
  createCanvas(H, W);
  frameRate(60)
  // Cria a orbita grande, orbita das orbitas
  main_orbit = new Orbit(center_x, center_y, 200, NUMERO_SUB_ORBITAS)
  // Lista dos pontos onde vão ficar as orbitas menores
  let small_orbit_coords = main_orbit.get_point_coords()
  // Aqui cria as orbitas menores nos seus devidos lugares inciais
  for (let i=0; i < NUMERO_SUB_ORBITAS; i++){
    sub_orbits.push(new Orbit(small_orbit_coords[i][0], small_orbit_coords[i][1], RAIO_SUB_ORBITAS, NUMERO_CIRCULOS))
  }
}

function draw() {
  background('#f4f1de');
  // Iterando pelas sub_orbitas
  for (let i=0; i < sub_orbits.length; i++){
    // Pega a lista de pontos de cada sub_oribt
    let curr_point_list = sub_orbits[i].get_point_coords()
    // Itera por elas para desenhar os circulos
    for (let j=0; j < curr_point_list.length; j++){
      let curr_point_x = curr_point_list[j][0]
      let curr_point_y = curr_point_list[j][1]
      noStroke();
      fill('#3c6e71');
      circle(curr_point_x, curr_point_y, RAIO_CIRCULOS)
    }
    // Atualiza a localização dos pontos dentro de cada sub_orbita
    sub_orbits[i].update_points(VEL_CIRCULOS)
    // Atualiza o ponto da main_orbit, que é onde ficam as sub_orbits
    main_orbit.update_points(VEL_SUB_ORBITS)
    // Apos atualizar os pontos da orbita grande, recebo eles pra atualizar as pequenas
    small_orbit_coords = main_orbit.get_point_coords()
    // Preciso a atualizar o ponto central das sub_orbits para os obtidos anteriormente
    sub_orbits[i].set_center_coord(small_orbit_coords[i][0], small_orbit_coords[i][1])
  }
}

class Orbit{
  constructor(x, y, radius, n = 3){
    // Propriedades da orbita
    this.x = x;
    this.y = y;
    this.radius = radius;
    // Proriedades dos pontos
    this.points = []
    // Calcula a separacao de cada angulo
    if (360 % n != 0){
      throw print("O numero de pontos na órbita precisa ser um fator de 360");
    }
    // Adiciona coordenadas x, y de cada ponto no array points
    for (let i = 0; i < n; i++){
      let angle_in_deg = (360/n) * i;
      let angle_in_radians = degrees_to_radians(angle_in_deg);
      let point_x = 0;
      let point_y = 0;
      [point_x, point_y] = polar_to_cartesian(this.x, this.y, this.radius, angle_in_radians);
      this.points.push([point_x, point_y]);
    }
  }
  get_point_coords(){
    return this.points;
  }
  set_center_coord(x_center, y_center){
    // Confere a diferença em X e Y entre o novo ponto e os existentes
    //console.log('before', this.x, this.y)
    let diff_x = x_center - this.x
    let diff_y = y_center - this.y
    // Atualiza o centro da orbita
    this.x = x_center;
    this.y = y_center;
    //console.log('after', this.x, this.y)
    // Preciso atualizar todos os pontos do points tambem
    for (let i = 0; i < this.points.length; i++){
      this.points[i] = [this.points[i][0] + diff_x, this.points[i][1] + diff_y]
    }
  }
  update_points(angle_in_deg){
    for (let i=0; i< this.points.length; i++){
      let x, y, angle_rad_to_add, angle_in_radians, distance, new_x, new_y = 0;
      [x, y] = this.points[i];
      // this.x this.y é o centro
      [distance, angle_in_radians] = cartesian_to_polar(this.x, this.y, x, y);
      // Pega a adiçao em graus e transfere pra radianos. Depois da update no angulo do ponto
      angle_rad_to_add = degrees_to_radians(angle_in_deg);
      angle_in_radians = angle_in_radians + angle_rad_to_add;
      [new_x, new_y] = polar_to_cartesian(this.x, this.y, distance, angle_in_radians)
      this.points[i] = [new_x, new_y]
    }
  }
}


function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}


function polar_to_cartesian(x, y, radius, angle_in_rad){
  // Caso a origem fosse no 0,0
  delta_x = radius * Math.cos(angle_in_rad);
  delta_y = radius * Math.sin(angle_in_rad);
  // Convertendo pro centro do meu ponto
  x = x + delta_x;
  y = y + delta_y;
  return [x,y]
}


function cartesian_to_polar(x_center, y_center, x, y){
    // Pras formulas funcionarem assumem q o ponto é em relaçao a origem.
    // Assim preciso subtrair o centro do meu circulo do ponto
    var true_x = x - x_center
    var true_y = y - y_center
    distance = Math.sqrt(true_x*true_x + true_y*true_y);
    angle_in_radians = Math.atan2(true_y,true_x);
    return [distance, angle_in_radians]
}