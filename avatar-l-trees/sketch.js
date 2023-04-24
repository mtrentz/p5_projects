let lsys;
let step;
let angle;
let startX;
let startY;
let startAngle;
let randomColor;

function setup() {
    createCanvas(600, 600);

    step = 5;
    startX = width / 2;
    startY = height;
    angle = radians(30);
    let axiom = 'F';
    let rules = {
        'F': "FF+[+F-F-F]-[-F+F+F]"
    };

    // Random color between red, brown, blue and gray
    // TODO: Have it as separate object so I can have trunk color also.
    // (1 trunc color for each tree)
    let colors = [
        color("#e2e8f0"), // Gray
        color("#dc2626"), // Red
        color("#0ea5e9"), // Blue
        color("#713f12") // Brown
    ];
    randomColor = random(colors);

    lsys = new LSystem(axiom, rules);
}

function myDraw() {
    // If generation gt 5, dont draw
    if (lsys.generation > 6) {
        return;
    }

    background(220);
    resetMatrix();
    translate(startX, startY);
    rotate(startAngle);
    stroke(0);
    strokeWeight(1);


    for (let i = 0; i < lsys.current.length; i++) {
        let c = lsys.current.charAt(i);
        switch (c) {
            case 'F':
                line(0, 0, 0, -step);
                translate(0, -step);
                break;
            case 'G':
                line(0, 0, 0, -step);
                translate(0, -step);
                break;
            case '+':
                rotate(angle);
                break;
            case '-':
                rotate(-angle);
                break;
            case '[':
                push();
                break;
            case ']':
                // Draw a triangle
                push();
                fill(randomColor);
                noStroke();
                triangle(0, 0, -step, -step, step, -step);
                pop();
                pop();
                break;
            case 'X':
                // Do nothing, as X is a placeholder
                break;
        }
    }

}



function mousePressed() {
    lsys.generate();
    console.log(lsys.generation);
    console.log(lsys.current)
    myDraw();
}
