let lsys;

function setup() {
    let axiom = 'F';
    let rules = {
        'F': 'F+F-F-F+F'
    };

    lsys = new LSystem(axiom, rules);

    createCanvas(400, 400);
}

function draw() {
    // Do nothing
}


function mousePressed() {
    lsys.generate();
    console.log(lsys.generation)
    console.log(lsys.current)
}