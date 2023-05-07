let w;
let t;

function generateWaveform(n) {
    let w = [];
    for (let i = 0; i < n; i++) {
        let deg = degrees(i);
        let v;
        // More complex way to calculate v
        let freq1 = 1 / 10;
        let freq2 = 1 / 25;
        let amp1 = 30;
        let amp2 = 20;
        v = amp1 * sin(deg * freq1) + amp2 * sin(deg * freq2);
        w.push(v);
    }
    return w;
}


function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);

    // frameRate(60);

    w = generateWaveform(50000);
    t = 0;

    console.log(w);
    background(25);
}

function draw() {
    // background(25);
    stroke(225);
    // fill(255, 0, 0);
    noFill();

    // Translate the origin to the center of the canvas
    translate(
        width / 2,
        height / 2
    );

    // Get min and max of w
    let min = Math.min(...w);
    let max = Math.max(...w);

    for (let i = 0; i < 10; i++) {
        beginShape();
        // for (let i = 0; i < 360; i++) {
        let r = map(w[t], min, max, 100, 200);
        let x = r * cos(t);
        let y = r * sin(t);
        // circle(x, y, 2);
        vertex(x, y);
        // }
        endShape(CLOSE);

        t++;

        w.splice(0, 1);
    }

    // w.splice(0, 2);

}

