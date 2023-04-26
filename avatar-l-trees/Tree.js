class Tree {
    constructor(
        axiom,
        rules,
        colors,
        generations = 5,
    ) {
        this.axiom = axiom;
        this.rules = rules;
        this.colors = colors;
        this.generation = generations;

        // Split the colors into leaves, trunk, and background
        let chosenColors = random(this.colors);
        this.leavesColor = chosenColors[0];
        this.leavesColor.setAlpha(200);
        this.trunkColor = chosenColors[1];
        this.backgroundColor = chosenColors[2];

        this.startX = width / 2;
        this.startY = height * 0.9;
        this.startAngle = radians(0);

        // Thunk constants
        this.trunkHeight = 0.25;
        this.trunkWidth = random(0.01, 0.035)
        this.trunkTopWidth = this.trunkWidth * random(0.3, 0.5)

        // Leaf constants
        this.leavesChance = random(0.6, 1)

        this.angle = radians(random(15, 25));
        this.step = random(15, 20);

        this.lsys = new StochasticLSystem(this.axiom, this.rules);

        // Generate n times
        for (let i = 0; i < this.generation; i++) {
            this.lsys.generate();
        }
    }

    _drawLeaf(x, y) {
        if (random() > this.leavesChance) {
            return;
        }

        // Draw a triangle (leaf) at end of branch
        push();
        fill(this.leavesColor);
        noStroke();
        triangle(x, y, -this.step, -this.step, this.step, -this.step);
        pop();
    }

    draw() {
        background(this.backgroundColor);

        // Draw a trunk from bottom of string until like 1/3 of the way up.
        push();
        translate(this.startX, this.startY);

        noStroke();
        fill(this.trunkColor);
        quad(
            // x1 slightly to the left
            -width * this.trunkWidth / 2,
            // y1 at bottom
            0,
            // x2 slightly to the right
            width * this.trunkWidth / 2,
            // y2 at bottom
            0,
            // x3 slightly less to the right
            width * this.trunkTopWidth / 2,
            // y3
            -height * this.trunkHeight,
            // x4 slightly less to the left
            -width * this.trunkTopWidth / 2,
            // y4
            -height * this.trunkHeight
        );
        pop();

        push();
        resetMatrix();
        translate(this.startX, this.startY);
        rotate(this.startAngle);
        strokeWeight(1);
        stroke(this.trunkColor)

        for (let i = 0; i < this.lsys.current.length; i++) {

            let c = this.lsys.current.charAt(i);

            switch (c) {
                case 'F':
                    line(0, 0, 0, -this.step);
                    translate(0, -this.step);
                    break;
                case 'G':
                    line(0, 0, 0, -this.step);
                    translate(0, -this.step);
                    break;
                case '+':
                    rotate(this.angle);
                    break;
                case '-':
                    rotate(-this.angle);
                    break;
                case '[':
                    push();
                    break;
                case ']':
                    this._drawLeaf(0, 0);
                    pop();
                    break;
                case 'X':
                    // Do nothing, as X is a placeholder
                    break;
            }
        }
        pop();
    }
}