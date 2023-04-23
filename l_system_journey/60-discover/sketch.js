let lsys;
let step;
let angle;
let startX;
let startY;
let startAngle;

function setup() {
    createCanvas(600, 600);

    // Fractal plant
    // step = 2;
    // startX = width / 2;
    // startY = height;
    // angle = radians(25);
    // let axiom = "X"
    // let rules = {
    //     "X": "F-[[X]+X]+F[+FX]-X",
    //     "F": "FF",
    // };


    // Gosper
    step = 5;
    startX = 50;
    startY = 50;
    startAngle = 0;
    angle = radians(60);
    let axiom = "FX";
    let rules = {
        "X": "X+YF++YF-FX--FXFX-YF+",
        "Y": "-FX+YFYF++YF+FX--FX-Y",
        "F": "F"
    };


    // // Pensore --> idk whats happening
    // startX = width / 2;
    // startY = height / 2;
    // startAngle = 0;
    // step = 20;
    // angle = radians(108);
    // let axiom = "F++F++F";
    // let rules = {
    //     "F": "F---NF+++OF----F",
    //     "N": "N",
    //     "O": "OF++NF",
    // };

    // GPT random 1
    // step = 3;
    // startX = width / 2;
    // startY = height;
    // startAngle = 0;
    // angle = radians(20);
    // let axiom = "X";
    // let rules = {
    //     "X": "F[+X][-X]FX",
    //     "F": "FF"
    // };

    // GP random 2
    // step = 3;
    // startX = width / 2;
    // startY = height;
    // startAngle = 0;
    // angle = radians(15);
    // let axiom = "X";
    // let rules = {
    //     "X": "F[+FX]F[-FX]+X",
    //     "F": "FF"
    // };

    // GP random #
    // step = 20;
    // startX = width / 2;
    // startY = height;
    // startAngle = 0;
    // angle = radians(25);
    // let axiom = "X";
    // let rules = {
    //     "X": "F[+FX][-FX]FX",
    //     "F": "F"
    // };

    // GP random #
    // step = 20;
    // startX = width / 2;
    // startY = height;
    // startAngle = 0;
    // angle = radians(27);
    // let axiom = "X";
    // let rules = {
    //     "X": "F[-XF][+XF]F+X",
    //     "F": "FF"
    // };




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
