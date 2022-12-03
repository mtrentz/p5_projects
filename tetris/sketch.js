// CANVAS CONFIG
const CANVAS_HEIGHT = 650;
const CANVAS_WIDTH = 700;

// BOARD CONFIG
const VISIBLE_ROWS = 20; //CHOOSEN BY PLAYER
const EXTRA_ROWS = 2;
const RATIO = 2;
const ROWS = VISIBLE_ROWS + EXTRA_ROWS;
const COLS = Math.floor(VISIBLE_ROWS / RATIO);
const BOARD_X1 = 25;
const BOARD_Y1 = 25;

const BOARD_WIDTH = 300;
const BOARD_HEIGHT = 600;
const BOX_SIZE = BOARD_HEIGHT / VISIBLE_ROWS;

// MENU CONFIG
const MENU_SPACING = Math.floor(BOARD_WIDTH / 10);
const MENU_X1 = BOARD_X1 + BOARD_WIDTH + MENU_SPACING;
const MENU_Y1 = BOARD_Y1;
const MENU_WIDTH = BOARD_WIDTH;
const MENU_HEIGHT = BOARD_HEIGHT/1.8;

// DRAW CONFIG
const CANVAS_BACKGROUND_COLOR = 50;
const BOARD_BACKGROUND_COLOR = 80;
const MENU_BACKGROUND_COLOR = 80;
const STROKE = 20;
const STROKE_WEIGHT = 1.5;

// GAME CONFIG
let FAST_SPEED = 3;
let NORMAL_SPEED = 20;
let SPEED = NORMAL_SPEED;

let controller;

function setup() {
  frameRate(60);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(CANVAS_BACKGROUND_COLOR);

  controller = new Controller();
  controller.start();
}

function draw() {
  console.log(SPEED);
  if (frameCount % SPEED === 0) {
    background(CANVAS_BACKGROUND_COLOR);
    controller.update();
  }
  checkKeyDown();
}

function keyPressed() {
  if (!controller.paused) {
    if (keyCode === UP_ARROW) {
      controller.rotatePiece();
    }

    if (keyCode === LEFT_ARROW) {
      controller.movePieceLeft();
    }

    if (keyCode === RIGHT_ARROW) {
      controller.movePieceRight();
    }
  }

  //keyCode p = 80
  if (keyCode === 80) {
    controller.pauseGame();
  }
}

function checkKeyDown() {
  if (keyIsDown(DOWN_ARROW)) {
    SPEED = FAST_SPEED;
  } else {
    SPEED = NORMAL_SPEED;
  }
}
