class Circle {
    position: p5.Vector;
    velocity: p5.Vector;
    radius: number;
    maxSpeed: number;

    constructor(x: number, y: number, r: number, vx: number = 0, vy: number = 0) {
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.radius = r;
    }

    show() {
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    update() {
        // Add gravity to velocity
        this.velocity.add(gravity);
        // Add velocity to position
        this.position.add(this.velocity);
    }

    bounce() {
        if (this.position.y + this.radius > height) {
            console.log(this.position.y)
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        }
    }
}