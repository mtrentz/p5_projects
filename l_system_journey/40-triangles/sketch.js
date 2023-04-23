let lsys;
let step;
let angle;

function setup() {
    step = 10;
    angle = radians(120);

    let axiom = "F-G-G"
    let rules = {
        "F": "F-G+F+G-F",
        "G": "GG",
    };

    lsys = new LSystem(axiom, rules);

    createCanvas(600, 600);
}

function myDraw() {
    background(220);
    resetMatrix(); // Reset the transformation matrix to the identity matrix
    translate(0 + 25, 0 + 25);
    rotate(PI); // Rotate 180 degrees (PI radians)
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
