//Move the catcher with the left and right arrow keys to catch the falling objects. 
/* VARIABLES */
let catcher, fallingObject1, fallingObject2;
var directionsButton, playButton, backButton;
var catcherImg, fallingObject1Img, fallingObject2Img;
var homeImg, directionsImg, gameImg, winImg, loseImg;
var positiveThoughts, negativeThoughts;
var newVel
var newPos1 = 0, newPos2 = 0;
var score = 0;

/* PRELOAD LOADS FILES */
function preload(){
  catcherImg = loadImage("assets/images/taylor_swift_midnights_13.png");
  //homeImg = loadImage("assets/images/tayllor_papers_blowing_giphy.gif");
  loseImg = loadImage("assets/images/ellen-taylor-swift.gif");
  gameImg = loadImage("assets/images/anti-hero.gif");
  winImg = loadImage("assets/images/taylor-swift-bejeweled.gif");
  fallingObject1Img = loadImage("assets/images/paper_with_check.png");
  fallingObject2Img = loadImage("assets/images/paper_with_x.png");
}

/* SETUP RUNS ONCE */
function setup() {
  fill('white');
  textStyle(BOLD);
  textAlign(LEFT);
  textFont('Helvetica Neue');
  allSprites.textColor = 'black';
  createCanvas(400,400);
  catcherImg.resize(100,100);
  //homeImg.resize(width, height);
  gameImg.resize(width, height);
  loseImg.resize(width, height);
  winImg.resize(width, height);
  fallingObject1Img.resize(width / 4, height / 4);
  fallingObject2Img.resize(width / 4, height / 4);
  image(gameImg, 0, 0);
  gameImg.pause();
  gameImg.play();
  positiveThoughts = ['You are not\nthe problem\ngirly!', 'You look like\nClara Bow\nin this light.', 'What if I told\nyou you\'re a\nmastermind?', 'You make the\nwhole place\n✨shimmer✨!'];
  negativeThoughts = ['You disguise\nyour covert \nnarcissism\nas altruism.', 'You are a\nmonster on\nthe hill!', 'You might be\nolder, but\nyou\'re\ndefinitely not\nwiser.', 'You go on\ntoo many dates,\nbut you can\'t\nmake \'em stay!'];
  allSprites.rotationLock = true;
  while (newPos1 == newPos2) {
    newPos1 = random(width + 1);
    newPos2 = random(width + 1);
  }
  //Create catcher 
  catcher = new Sprite(catcherImg, width / 2,height - 20,catcherImg.width,catcherImg.height, 'k');
  catcher.color = color(95,158,160);
  
  //Create falling object 1
  fallingObject1 = new Sprite(fallingObject1Img, newPos1,0, fallingObject1Img.width, fallingObject1Img.height);
  fallingObject1.color = color(0,128,128);
  fallingObject1.vel.y = 2;
  fallingObject1.text = random(positiveThoughts);
  fallingObject1.textSize = 11;

  //Create falling object 2
  fallingObject2 = new Sprite(fallingObject2Img, newPos2,0, fallingObject2Img.width, fallingObject2Img.height);
  fallingObject2.color = color(0,128,128);
  fallingObject2.vel.y = 2;
  fallingObject2.text = random(negativeThoughts);
  fallingObject2.textSize = 10;
}

/* DRAW LOOP REPEATS */
function draw() {
  image(gameImg, 0, 0);
  gameImg.pause();
  gameImg.play();
  textAlign(LEFT);
  // Draw directions to screen
  fill('white');
  textSize(12);
  text("Move Taylor with \nthe left and right \narrow keys to \ncatch the lyrics \nof affirmation.", width-100, 20);
  text(`Score: ${score}`, 10, 20);
  //If fallingObject reaches bottom, move back to random position at top
  newVel = random(1,5);
  if ((fallingObject1.collides(catcher) || fallingObject1.y >= height) && score > -13 && score < 13) {
    newPos1 = random(width + 1);
    if (newPos1 == newPos2) {
      newPos1 = random(width + 1);
    }
    fallingObject1.pos = {x: newPos1, y: 0};
    fallingObject1.vel.y = newVel;
    fallingObject1.text = random(positiveThoughts);
    if (fallingObject1.collides(catcher)) {
      fallingObject1.direction = 'down';
      score++;
    }
  }
  if ((fallingObject2.collides(catcher) || fallingObject2.y >= height) && score > -13 && score < 13) {
    newPos2 = random(width + 1);
    if (newPos2 == newPos1) {
      random(width + 1);
    }
    fallingObject2.pos = {x: newPos2, y: 0};
    fallingObject2.vel.y = newVel;
    fallingObject2.text = random(negativeThoughts);
    if (fallingObject2.collides(catcher)) {
      fallingObject2.direction = 'down';
      score--;
    }
  }
  if (fallingObject1.collides(fallingObject2)) {
    fallingObject1.direction = 'down';
    fallingObject2.direction = 'down';
  }
  //Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  }
  else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  }
  else {
    catcher.vel.x = 0;
  }
  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  }
  else if (catcher.x > width - 50) {
    catcher.x = width - 50;
  }
  if (score >= 13) {
    youWin();
  }
  if (score <= -13) {
    youLose();
  }
}

function youWin() {
  image(winImg, 0, 0);
  winImg.pause();
  winImg.play();
  catcher.pos = {x: -900, y: -900};
  fallingObject1.pos = {x: -800, y: -800};
  fallingObject2.pos = {x: -700, y: -700};
  textSize(20);
  text('You win!', width/2 - 50, height/2 - 30);
  textAlign(CENTER);
  textSize(12);
  text('Click anywhere to play again.', width/2, height/2);
  if (mouseIsPressed) {
    restart();
  }
}

function youLose() {
  image(loseImg, 0, 0);
  loseImg.pause();
  loseImg.play();
  catcher.pos = {x: -900, y: -800};
  fallingObject1.pos = {x: -800, y: -800};
  fallingObject2.pos = {x: -700, y: -700};
  textSize(20);
  text('You lose!', width/2 - 50, height/2 - 30);
  textAlign(CENTER);
  textSize(12);
  text('Click anywhere to play again.', width/2, height/2);
  if (mouseIsPressed) {
    restart();
  }
}

function restart() {
  image(gameImg, 0, 0);
  gameImg.pause();
  gameImg.play();
  textAlign(LEFT);
  // Draw directions to screen
  score = 0;
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.", width-100, 20);
  text(`Score: ${score}`, 10, 20);
  catcher.pos = {x: 200, y: 380};
  do {
    newPos1 = random(width + 1);
    newPos2 = random(width + 1);
  } while (newPos1 == newPos2);
  fallingObject1.pos = {x: newPos1, y: 0};
  fallingObject2.pos = {x: newPos2, y: 0};
  newVel = random(1,5);
  fallingObject1.direction = 'down';
  fallingObject2.direction = 'down';
  fallingObject1.vel.y = newVel;
  fallingObject2.vel.y = newVel;
}
/*
function homeScreen() {
  image(homeImg, 0, 0);
  homeImg.pause();
  homeImg.play();
}
*/
