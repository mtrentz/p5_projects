let tree;

function setup() {
    createCanvas(600, 600);

    let axiom = 'X';
    let rules = {
        'X': [
            // First element is the weight (chance of being picked).
            [0.1, "F[+X]F[-X]+F[-F]F[+FX]FX"],
            [0.1, "F[-X]F[+X]-F[+F]F[-FX]FX"],
            [0.1, "F[+X]F[-X]-F[-F]F[+F]F[-FX]"],
            [0.1, "F[-X][+X]F[+F]F[-FX]FX"],
            [0.1, "F[+X][-X]F[+F]F[-FX]FX"],
            [0.1, "FF[+X][-X]F[+F]F[-FX]FX"],
        ]
    };

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

    tree = new Tree(axiom, rules, colors, 5);

    tree.draw();
}

function mousePressed() {
    setup();
}