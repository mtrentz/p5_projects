function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(25);

    push(); // Save the current state
    clip(() => {
        // Draw a circle mask
        circle(width / 2, height / 2, 200); // Circle with diameter 200
    });

    // Only the parts of this rectangle that are inside the circle will show
    fill(255, 0, 0);
    rect(0, 0, width, height);

    pop(); // Restore the state, removing the clipping mask
}
