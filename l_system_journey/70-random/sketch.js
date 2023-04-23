let lsys;
let step;
let angle;
let startX;
let startY;
let startAngle;

function setup() {
    createCanvas(600, 600);

    step = 5;
    startX = width / 2;
    startY = height / 2;
    startAngle = 0;
    let rand = generateRandomLSystem();
    let deg = rand.angle;
    let axiom = rand.axiom;
    let rules = rand.rules;

    console.log("axiom: " + axiom);
    console.log("rules: ", rules)
    console.log("deg: " + deg);

    angle = radians(deg);

    lsys = new LSystem(axiom, rules);
}

function myDraw() {
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
                pop();
                break;
            case 'X':
                // Do nothing, as X is a placeholder
                break;
            case 'Y':
                // Do nothing, as Y is a placeholder
                break;
            case 'M':
                // Do nothing, as M is a placeholder
                break;
            case 'N':
                // Do nothing, as N is a placeholder
                break;
            case 'O':
                // Do nothing, as O is a placeholder
                break;
            case 'P':
                // Do nothing, as P is a placeholder
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
