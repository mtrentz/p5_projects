let lsys;
let step;
let angle;

function setup() {
    step = 5;
    angle = radians(25);

    let axiom = 'X';
    let rules = {
        'X': 'F+[[X]-X]-F[-FX]+X',
        'F': 'FF'
    };

    lsys = new LSystem(axiom, rules);

    createCanvas(900, 600);
}

function myDraw() {
    background(220);
    resetMatrix(); // Reset the transformation matrix to the identity matrix
    translate(width / 4, height);
    rotate(radians(25));
    stroke(0);
    strokeWeight(1);

    for (let i = 0; i < lsys.current.length; i++) {
        let c = lsys.current.charAt(i);
        switch (c) {
            case 'F':
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
                push(); // Save the current transformation matrix
                break;
            case ']':
                pop(); // Restore the previous transformation matrix
                break;
        }
    }
}


function mousePressed() {
    lsys.generate();
    console.log(lsys.generation);
    myDraw();
}
