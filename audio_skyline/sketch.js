function widthProps(width, ncols) {
    // This will return the gaps between the windows and the window width
    let emptySpaceRatio = 0.1;
    let emptySpace = width * emptySpaceRatio;
    let gap = emptySpace / (2 + ncols - 1);
    let wwidth = (width - (ncols - 1) * gap) / ncols;
    return {
        gap: gap,
        wwidth: wwidth
    }
}

class Building {
    constructor(height, width) {
        this.height = height;
        this.width = width;

        // These in the future will be random
        this.wRows = 6;
        this.wCols = 2;
        this.wColor = "#ffff";
        let props = widthProps(this.width, this.windowCols);
        this.wWidth = props.wwidth;
        this.wGap = props.gap;

        this.buildingColor = "#334155";
    }

    draw(x, y) {
        push();
        // I need the x, y to be the bottom-left of the rect
        // This can be done just pushing and translating to top
        fill(this.buildingColor);
        // BUILDING
        translate(0, -this.height)
        rect(x, y, this.width, this.height)

        // circle(this.windowGap, this.windowGap, 20)

        // WINDOWS
        // the max size a window can have would be (width/cols)
        // but then we factor the gaps, which are at least 2 + cols - 1
        // let windowSize = this.width / this.windowCols - (2 + this.windowCols - 1) * this.windowGap
        // size will be width - (2 * gap) - ((cols - 1) * gap)
        // let windowSize = this.width - (2 * this.windowGap) - ((this.windowCols - 1) * this.windowGap)
        // console.log(windowSize)
        for (let i = 0; i < this.windowCols; i++) {
            for (let j = 0; j < this.windowRows; j++) {
                console.log(this.windowSize)
                fill(this.windowColor)


                rect(
                    i * (this.windowSize + this.windowGap),
                    j * (this.windowSize + this.windowGap),
                    this.windowSize,
                    this.windowSize
                )



                // (i + 1) * this.windowGap - i * windowSize,
                // (j + 1) * this.windowGap - i * windowSize,
                // windowSize,
                // windowSize
            }
        }


        pop();

    }
}

let building;

function setup() {
    createCanvas(600, 600);
    background("#082f49");

    building = new Building(200, 100);
}

function draw() {
    fill(255, 0, 0);
    translate(width / 2, height / 2);

    building.draw(0, 0);
}