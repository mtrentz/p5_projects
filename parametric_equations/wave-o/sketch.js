let t;

function setup() {
    createCanvas(400, 400);
    background(25);
    frameRate(60);

    t = 0;
}

function draw() {
    fill(225);
    stroke(225);
    translate(
        (width / 2),
        (height / 2),
    );

    for (let i = 0; i < 100; i++) {
        circle(
            x1(t),
            y1(t),
            2
        )

        t += 0.1;
    }

}

function x1(t) {
    return 150 * cos(t) + cos(t * 100) * 20;
}

function y1(t) {
    return 150 * sin(t);
}