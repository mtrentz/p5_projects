let t;

function setup() {
    createCanvas(600, 600);
    background(25);
    frameRate(120);

    t = 0;
}

function draw() {
    fill(225);
    stroke(225);

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            push();
            let dx = 180 + (j) * 250;
            let dy = 180 + (i) * 250;
            // console.log(dx, dy);
            translate(
                dx,
                dy
            );

            let x = 75 * cos(t * t + 75);
            let y = 50 * sin(t * t);

            let x2 = 75 * cos(t * t + 75);
            let y2 = 50 * sin(t * t) + (25 * cos(t) + 25);

            line(x, y, x2, y2);
            pop();
        }
    }

    t += 0.008;

}