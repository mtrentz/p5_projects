let a, b;

function setup() {
    createCanvas(600, 600);

    x_a = 10;
    x_b = 20;
    y_a = 20;
    y_b = 30;
    background(25);

}

function draw() {
    // background(25);
    fill(200);
    translate(width / 2, height / 2);

    for (let t = 0; t < 100; t += 0.1) {
        circle(X(x_a, x_b, t), Y(y_a, y_b, t), 10)
    }

    x_a += 0.1;
    x_b += 0.1;
    y_a += 0.1;
    y_b += 0.1;

}

function X(a, b, t) {
    return (t * a + b) * cos(t);
}

function Y(a, b, t) {
    return (t * a + b) * sin(t);
}