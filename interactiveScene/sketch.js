// Whack a mole
// Angadveer Singh Chahal
// September 30

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "start";

//Mole updating data
let lastMoleUpdate = 0; 
let moleDelay = 500; 
let moleVisibleDuration = 500; 
let currentMole = -1;

//explosion update data
let explosionVisible = false; 
let explosionStartTime = 0;    
let explosionDuration = 300;

//Timer update data
let lastTimeUpdate = 0;
let timerDelay = 1000;

//actual parameter for showMole
let i;

//images    
let bg;
let endGameBg;
let mole;
let blurTab;
let explosion;
let hammer;

//Texts
let scoreText =" Score:";
let timerText = "Time left:";

//Game progress data
let score = 0; 
let timer = 30;

let upperMoleHeight; // upper row objects data
let lowerMoleHeight; // bottom row objects data

let moleWidth1;  // 1st column objects data
let moleWidth2; // 2nd column objects data
let moleWidth3; // 3rd column objects data

//hole size 
let holeWidthSize;
let holeHeightSize;

//mole size
let moleWidthSize;
let moleHeightSize;

//sound variables
let song;
let slider;


function preload(){
  blurTab = loadImage("./photos/tab.png");
  mole = loadImage("./photos/mole.png");
  explosion = loadImage("./photos/explosion.png");
  hammer = loadImage("./photos/hammer.png");
  
  
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage("./photos/game-bg-image.png");
  endGameBg = loadImage("./photos/endscreen.jpg");
  blurTab.filter(BLUR, 3);

  slider = createSlider(0,1,1,0.01);
  slider.position(1/2 * windowWidth - 50,10);
  slider.size(100);
  
  fill(255);
  text("sound", 1/2 * windowWidth - 50, 10 );
  
  song = loadSound("./sounds/bg-music.mp3", loaded);

  currentMole = Math.round(random(1, 6)); // Pick a random mole at the start
  lastMoleUpdate = millis(); // Initialize the timer

}

function loaded(){   //callback function
  song.play();
}


function draw() {
  background(bg);
  
  
  if (gameState === "start") {
    startScreen();
  }

  else if (gameState === "playing") {
    drawGame();
  } 
  else if (gameState === "end-screen") {
    endScreen();
  }
}

function startScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("Whack-a-Mole", width / 2, height / 2 - 100);
  
  textSize(30);
  text("Play", width / 2, height / 2);
  

  if (mouseIsPressed) {
    if (mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
      gameState = "playing";  // Start game if "Play" is clicked
      timer = 30;
      score = 0;
    }
    
  }
}

  

function drawGame() {
//   moleDelay;
  //frameRate(fRate);
  background(bg); //whack a mole base background

  tint(200);
  image(blurTab,0,0, windowWidth, 1.5/9 * height);
  noTint();
  
  fill(255); // Set text color to white (or any contrasting color)
  textSize(32); // Set text size
  textAlign(LEFT, CENTER);
  textFont("times");
  textStyle("bold");
  text(scoreText + score,20,30); 

  text(timerText + timer, windowWidth - 200, 30);
  
  if (millis() - lastTimeUpdate >= timerDelay && timer > 0) { // Check if it's time to update the timer and if timer is not finished
    timer--; // Decrease the timer
    lastTimeUpdate = millis(); // Reset the timer update time
  }

  if(timer<=0){
    gameState = "end-screen";
  }
  
  holes();

  if (explosionVisible) { // NEW CONDITION
    if (millis() - explosionStartTime < explosionDuration) { // NEW TIMER CHECK
      showExplosion(currentMole); // Call explosion instead of mole (NEW)
    } 
    else {
      explosionVisible = false; // End the explosion effect after duration (NEW)
    }
  } 

  if (millis() - lastMoleUpdate < moleVisibleDuration && currentMole !== -1) {
    showMole(currentMole); // Draw the current mole
  }

  // Update moles only after the mole stays visible for a certain time
  if (!explosionVisible && millis() - lastMoleUpdate > moleDelay + moleVisibleDuration) {
    currentMole = Math.round(random(1, 6)); // Pick a new random mole
    lastMoleUpdate = millis(); // Reset the timer
  }

  drawHammer();

}

function endScreen(){
  background(endGameBg);
  fill(255);
  textSize(40);
  textFont("times");
  textStyle("bold");
  //text("Final Score:" + score, width/2 - 150, 3/4 * height, 320);

  textSize(30);
  text("Back to Home", width / 2, height / 2 + 200);
  

  if (mouseIsPressed) {
    if (mouseY > height / 2 - 20 && mouseY < height / 2 + 20 + 200) {
      gameState = "start";  
    }
    
  }

}

function drawHammer() {
  image(hammer, mouseX - 100, mouseY - 40, 180, 120); // Adjust hammer size and position
}

function holes(){
  upperMoleHeight = 1/2 * height;
  lowerMoleHeight = 3/4 * height;

  moleWidth1 = 1/4 * width;
  moleWidth2 = 1/2 * width;
  moleWidth3 = 3/4 * width;

  holeWidthSize = 90;
  holeHeightSize = 25;

  fill(102, 50, 0);

  //upper row
  ellipse(moleWidth1, upperMoleHeight , holeWidthSize, holeHeightSize); //1
  ellipse(moleWidth2, upperMoleHeight, holeWidthSize, holeHeightSize); //2 
  ellipse(moleWidth3, upperMoleHeight, holeWidthSize, holeHeightSize); //3 
  
  //bottom row
  ellipse(moleWidth1, lowerMoleHeight + 50, holeWidthSize, holeHeightSize); //1
  ellipse(moleWidth2, lowerMoleHeight + 50, holeWidthSize, holeHeightSize); //2
  ellipse(moleWidth3, lowerMoleHeight + 50, holeWidthSize, holeHeightSize); //3
}

function showMole(i){

  moleHeightSize = 85;
  moleWidthSize = 70;
  
  
  
  
  if(i ===1 ){
    image(mole, moleWidth1 - 35, upperMoleHeight - 82 , moleWidthSize, moleHeightSize);


  }
  
  if(i === 2){
    image(mole, moleWidth2 - 35, upperMoleHeight - 82 , moleWidthSize, moleHeightSize);
    
  }
  
  if(i === 3){
    image(mole, moleWidth3 - 35, upperMoleHeight - 82 , moleWidthSize,moleHeightSize);
    
  }

  if(i === 4){
    image(mole, moleWidth1 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
    
  }

  if(i === 5){
    image(mole, moleWidth2 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  }
 
  if(i === 6){
    image(mole, moleWidth3 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);  
  }
}

/*
function mousePressed(){
  
  //1
  if(currentMole === 1 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85){
    image(explosion, moleWidth1 - 35, upperMoleHeight - 82 , moleWidthSize, moleHeightSize);
    score++;
  } 

  //2
  if(currentMole=== 2 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85){
    image(explosion, moleWidth2 - 35, upperMoleHeight - 82 , moleWidthSize, moleHeightSize);
    score++;
  } 

  //3
  if(currentMole === 3 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85){
    image(explosion, moleWidth3 - 35, upperMoleHeight - 82 , moleWidthSize,moleHeightSize);
    score++;
  } 

  //4
  if(currentMole === 4 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85){
    image(explosion, moleWidth1 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
    score++;
  } 

  //5
  if(currentMole === 5 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85){
    image(explosion, moleWidth2 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
    score++;
  } 

  //6
  if(currentMole === 6 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85){
    image(explosion, moleWidth3 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);  
    score++;
  }
 
} */

function showExplosion(i) { // NEW FUNCTION
  moleHeightSize = 85;
  moleWidthSize = 70;
  
  if (i === 1) {
    image(explosion, moleWidth1 - 35, upperMoleHeight - 82, moleWidthSize, moleHeightSize);
  }
  else if (i === 2) {
    image(explosion, moleWidth2 - 35, upperMoleHeight - 82, moleWidthSize, moleHeightSize);
  }
  else if (i === 3) {
    image(explosion, moleWidth3 - 35, upperMoleHeight - 82, moleWidthSize, moleHeightSize);
  } 
  else if (i === 4) {
    image(explosion, moleWidth1 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  } 
  else if (i === 5) {
    image(explosion, moleWidth2 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  } 
  else if (i === 6) {
    image(explosion, moleWidth3 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  }
}

function mousePressed() {
  if (currentMole === 1 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } 
  else if (currentMole === 2 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } 
  else if (currentMole === 3 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } 
  else if (currentMole === 4 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } 
  else if (currentMole === 5 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } 
  else if (currentMole === 6 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  }
}

function triggerExplosion() { // NEW FUNCTION
  explosionVisible = true; // Set explosion visibility
  explosionStartTime = millis(); // Start the explosion timer
  score++; // Increment score
}