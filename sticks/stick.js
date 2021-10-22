class Stick {
  constructor(x_center, y_center, len, deg = 5) {
    // Variacao em radianos ao invés de graus
    this.rot_rate = degrees_to_radians(deg)
    // Propriedades da linha
    this.x_center = x_center;
    this.y_center = y_center;
    this.theta = 0;
    this.len = len;
    // Cria x1 e x2 baseado no centro, raio e o angulo theta
    this.x1 = this.x_center + Math.floor(this.len / 2 * Math.cos(this.theta));
    this.y1 = this.y_center + Math.floor(this.len / 2 * Math.sin(this.theta));
    // x2 e y2 são espelhados de x1 e x2
    this.x2 = this.x_center - (this.x1 - this.x_center);
    this.y2 = this.y_center - (this.y1 - this.y_center);
  }
  show() {
    strokeWeight(5);
    line(this.x1, this.y1, this.x2, this.y2);
  }
  rotate() {
    this.theta = this.theta + this.rot_rate;
    // Update x1 e y1
    this.x1 = this.x_center + Math.floor(this.len / 2 * Math.cos(this.theta));
    this.y1 = this.y_center + Math.floor(this.len / 2 * Math.sin(this.theta));
    // Espelha x2 e y2
    this.x2 = this.x_center - (this.x1 - this.x_center);
    this.y2 = this.y_center - (this.y1 - this.y_center);
  }
}
