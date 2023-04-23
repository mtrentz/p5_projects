let lsys;
let step;
let angle;

function setup() {
    step = 20;
    angle = radians(60);

    let axiom = 'F';
    let rules = {
        // 'F': 'F+F--F+F+F',
        // 'F--F': 'F+F--F+F+F'

        // 'F': 'F+F--F+F'

        // 'F': 'F+F--F+F+F+F--F+F-F+F--F+F-F+F--F+F-F+F--F+F+F+'

        'F': 'F+F'
    };

    lsys = new LSystem(axiom, rules);

    createCanvas(2000, 1000);
}



function draw() {
    background(220);
    translate(width / 2, height / 2);
    stroke(0);
    strokeWeight(1);

    for (let i = 0; i < lsys.current.length; i++) {
        let c = lsys.current.charAt(i);
        if (c === 'F') {
            line(0, 0, 0, step);
            translate(0, step);
        } else if (c === '+') {
            rotate(angle);
        } else if (c === '-') {
            rotate(-angle);
        }
    }
}


function mousePressed() {
    lsys.generate();
    console.log(lsys.generation)
}