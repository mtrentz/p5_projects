let t;
let c;
let startColor;
let endColor;
let pct;
let colorDelta;
let COLORS;

function setup() {
    createCanvas(600, 600);
    background(25);
    frameRate(60);

    COLORS = [
        color("#ef4444"),
        color("#14b8a6"),
        color("#fde047"),
        color("#22c55e"),
        color("#22d3ee"),
        color("#8b5cf6"),
        color("#db2777"),
    ]

    colorMode(RGB)
    startColor = COLORS[0]
    endColor = COLORS[1]
    c = startColor;
    pct = 0;
    colorDelta = 0.01;
    t = 0;
}

function draw() {
    background(25);
    fill(225);
    strokeWeight(3);
    translate(
        (width / 2),
        (height / 2),
    );

    for (let i = 0; i < 12; i++) {
        c = lerpColor(startColor, endColor, pct + (i * colorDelta * 2));
        stroke(c);
        line(
            x1(t + i * 2),
            y1(t + i * 2),
            x2(t + i * 2),
            y2(t + i * 2),
        )
    }

    t += 0.5;

    pct += colorDelta;

    if (pct > 1) {
        pct = 0;
        // let tmp = startColor;
        startColor = endColor;
        // endColor = tmp;
        endColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        c = startColor;
    }
    // noLoop();
}

function x1(t) {
    return 100 * cos(t / 10) + 100 * cos(t / 15);
}

function y1(t) {
    return 100 * sin(t / 10) + 25 * sin(t / 15);
}

function x2(t) {
    return 200 * cos(t / 25) + 100 * cos(t / 5);
}

function y2(t) {
    return 200 * sin(t / 25) + 25 * sin(t / 5);
}