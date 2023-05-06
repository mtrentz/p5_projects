let t;

function setup() {
    createCanvas(600, 600);
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

    circle(
        x1(t),
        y1(t),
        2
    )

    t += 0.05;
}

function x1(t) {
    return 100 * cos(t) + cos(t * 10) * 5;
}

function y1(t) {
    return 100 * sin(t);
}

function x2(t) {
    return t;
}

function y2(t) {
    return tl
}