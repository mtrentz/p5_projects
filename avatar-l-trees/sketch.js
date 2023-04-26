let lsys;
let step;
let angle;
let treeStartX;
let treeStartY;
let treeAngle;
let leavesColor;
let trunkColor;

function setup() {
    createCanvas(600, 600);

    treeStartX = width / 2;
    treeStartY = height * 0.9;
    treeAngle = radians(0);

    let axiom = 'X';
    let rules = {
        'X': [
            // First element is the weight (chance of being picked).
            [0.1, "F[+X]F[-X]+F[-F]F[+FX]FX",],
            [0.1, "F[-X]F[+X]-F[+F]F[-FX]FX",],
            [0.1, "F[+X]F[-X]-F[-F]F[+F]F[-FX]",],
            [0.1, "F[-X][+X]F[+F]F[-FX]FX",],
            [0.1, "F[+X][-X]F[+F]F[-FX]FX",],
            [0.1, "FF[+X][-X]F[+F]F[-FX]FX"],
        ]
    };


    angle = radians(22.5);
    step = 15;

    // Colors for leaves and trunk and background
    let colors = [
        // Gray laves, dark trunk 
        [color("#fafafa"), color("#1c1917"), color("#cbd5e1")],
        // // Red leaves, light grayish trunk
        [color("#dc2626"), color("#71717a"), color("#f1f5f9")],
        // // Blue leaves, dark brown trunk
        [color("#0ea5e9"), color("#422006"), color("#f1f5f9")],
        // Brown leaves, dark brown trunk
        [color("#a16207"), color("#713f12"), color("#f1f5f9")],
    ];

    // Get leaves and trunk color
    [leavesColor, trunkColor, backgroundColor] = random(colors);
    // Add alpha to leaves
    leavesColor.setAlpha(200);

    lsys = new StochasticLSystem(axiom, rules);

    // Generate 5 times
    for (let i = 0; i < 5; i++) {
        lsys.generate();
    }

    // Draw the tree
    myDraw();
}

function myDraw() {
    background(backgroundColor);

    // Draw a trunk from bottom of string until like 1/3 of the way up.
    push();
    translate(width / 2, height);

    // consts for trunk
    // height as percentage of canvas
    const trunkHeight = 0.3;
    // width as percentage of canvas
    const trunkWidth = 0.01;
    // top width will be slightly less than bottom width
    const trunkTopWidth = trunkWidth * 0.3;

    noStroke();
    fill(trunkColor);
    quad(
        // x1 slightly to the left
        -width * trunkWidth / 2,
        // y1 at bottom
        0,
        // x2 slightly to the right
        width * trunkWidth / 2,
        // y2 at bottom
        0,
        // x3 slightly less to the right
        width * trunkTopWidth / 2,
        // y3
        -height * trunkHeight,
        // x4 slightly less to the left
        -width * trunkTopWidth / 2,
        // y4
        -height * trunkHeight
    );
    pop();

    push();
    resetMatrix();
    translate(treeStartX, treeStartY);
    rotate(treeAngle);
    strokeWeight(1);
    stroke(trunkColor)

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
                // Draw a triangle at end of branch
                push();
                fill(leavesColor);
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
    pop();

}



function mousePressed() {
    setup();
}

// function mousePressed() {
//     // If generation gt 6, dont draw (too laggy)
//     if (lsys.generation > 6) {
//         return;
//     }
//     lsys.generate();
//     console.log(lsys.generation);
//     console.log(lsys.current)
//     myDraw();
// }
