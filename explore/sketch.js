let t;
let inc;
let MAX_T = 500;

function setup() {
    createCanvas(600, 600);
    background(25);
    t = 0;
    inc = 1;
}

function draw() {
    // background(25);
    translate(width / 2, height / 2);
    circle(X(t), Y(t), 10);
    t += inc;

    if (t > MAX_T) {
        inc *= -1;
        t = MAX_T - 0.1;

        // canReverse = false;
    } else if (t < -MAX_T) {
        inc *= -1;
        t = -MAX_T + 0.1;
        // canReverse = false;
    }

    console.log(t)
}

function X(t) {
    return cos(t) * 50;
}

function Y(t) {
    return sin(t) * (50 + t);
}