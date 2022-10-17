interface Dot {
    original_pos: p5.Vector;
    pos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
}


// Talvez dê pra fazer um "soft_reset"
// quando a velocidade chegar em 0, que é o
// reverse do bounce. Mas se pa dai eu preciso
// guardar sempre a ultima velocidade, pra checar
// se ela mudou de positiva para negativa ou algo assim.

// Class circle that just draws
class Circle {
    x: number;
    y: number;
    r: number;

    dots: Dot[] = [];

    // Some config
    acceleration = 0.01;
    max_ratio: number = 1.05;
    max_circle_per_layer = 40;
    circle_dcr_amnt = 4;
    vector_decrease_amnt = 10;

    vector_decrease_amnt_calc: number;
    maxspeed: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.maxspeed = sqrt(2 * this.acceleration * this.r)
        this.vector_decrease_amnt_calc = Math.floor(this.r / this.vector_decrease_amnt);
    }

    setup() {
        // I'll create the vectors for each dot
        // Create a vector that points to "radius" distance
        // to the right
        let v = createVector(this.r, 0);
        // Translate to x,y of circle
        translate(this.x, this.y);


        // This loop will create each "layer" of the circle.
        // And then push the dot into the dot array
        for (let radius = this.r; radius > 0; radius -= this.vector_decrease_amnt_calc) {
            // Set the x of the vector to the radius
            v.x = radius;

            // For each layer I'll rotate the vector, until
            // it comes back at the right-most position.
            // The rotation will be 2PI / the number of circles
            // in the layer.
            for (let j = 0; j < this.max_circle_per_layer; j++) {
                let dot: Dot = {
                    original_pos: createVector(v.x + this.x, v.y + this.y),
                    pos: createVector(v.x + this.x, v.y + this.y),
                    vel: createVector(0, 0),
                    acc: createVector(0, 0)
                }
                this.dots.push(dot);
                v.rotate(TWO_PI / this.max_circle_per_layer);
            }

            // Decrease the number of circles in the layer
            this.max_circle_per_layer -= this.circle_dcr_amnt;
        }

        // I'll do a separate loop to keep the code clear.
        // The point here is to add a acceleration to each dot
        // that points opossite to the center of the circle.
        for (let i = 0; i < this.dots.length; i++) {
            let dot = this.dots[i];
            let center = createVector(this.x, this.y);
            let dir = p5.Vector.sub(center, dot.pos);
            dir.normalize();
            dir.mult(-this.acceleration);
            dot.acc = dir;
        }
    }

    show() {
        for (let i = 0; i < this.dots.length; i++) {
            ellipse(this.dots[i].pos.x, this.dots[i].pos.y, 5, 5);
        }
    }

    bounce(): boolean {
        // I need to check if the circle has "expanded" to
        // the maxinum amount. For this i'll use the first dot,
        // which is the right-most dot in the border.
        let centerX = this.x;
        let borderX = this.dots[0].pos.x;

        // Now this is the maximum that the circle can expand
        // TODO: tem a logica errada aqui, nao deveria depender assim
        // do x
        let max = this.x + this.r + (this.r * this.max_ratio);

        // Now to know if bounce or not, just check if
        // the border is bigger than the max.
        return borderX > max;
    }

    pulse() {
        // Every dot has an acelleration
        // pointing opossite to the center of the circle.
        // Every "pulse", i'll add this acceleration to the
        // velocity of the dot, and then add the velocity to
        // the position of the dot.

        // Whenever the dot reaches a maximum distance from the
        // center, I'll reverse the direction of the velocity,
        // just like a bounce.
        if (this.bounce()) {
            console.log("Bounce!")
            for (let i = 0; i < this.dots.length; i++) {
                let dot = this.dots[i];
                dot.vel.mult(-1);

            }
        }

        // Now lets loop again and update the position
        // and velocity of each dot.
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].pos.add(this.dots[i].vel);
            this.dots[i].vel.add(this.dots[i].acc);
            // Cap the maxspeed
            this.dots[i].vel.limit(this.maxspeed);
        }
    }
}