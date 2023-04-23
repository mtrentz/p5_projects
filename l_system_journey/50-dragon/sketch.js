let lsys;
let step;
let angle;

function setup() {
    step = 3;
    angle = radians(90);

    let axiom = "F"
    let rules = {
        "F": "F+G",
        "G": "F-G",
    };

    lsys = new LSystem(axiom, rules);

    createCanvas(600, 600);
}

function myDraw() {
    background(220);
    resetMatrix();
    translate(height / 2, width / 2);
    rotate(PI);
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
                pop();
                break;
        }
    }
}



function mousePressed() {
    lsys.generate();
    console.log(lsys.generation);
    myDraw();
}
