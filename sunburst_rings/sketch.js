let c = [300, 150];
let r = 250;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(25);
    fill(225);
    stroke(225);

    push();
    // Mask everything outside my big circle
    clip(() => {
        circle(width / 2, height / 2, 2 * r + 1);
    });

    // Big circle, only outline at center of canvas
    noFill();
    strokeWeight(2);
    circle(width / 2, height / 2, 2 * r);

    // Now let's get X points evenly spaced on the big circle
    let n = 100;

    for (let i = 0; i < n; i++) {
        strokeWeight(0.5);

        let rad = i * TWO_PI / n;
        let x = width / 2 + r * cos(rad);
        let y = height / 2 + r * sin(rad);

        // Draw a line from the center to this point
        line(c[0], c[1], x, y);
    }

    let yGrowth = 0.1;
    let radiusGrowth = 1.5;
    let radiusStart = 30;
    let amount = 50;

    // Draw N circles with increasing radius
    for (let i = 0; i < amount; i++) {
        circle(c[0], (c[1] + 5) * (1 + i * yGrowth), radiusStart * (1 + i * radiusGrowth))
    }

    pop();
}