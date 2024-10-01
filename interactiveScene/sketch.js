// Whack a mole
// Angadveer Singh Chahal
// September 30
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let fRate = 0.5 ;
let gameState = "playing";

let lastMoleUpdate = 0; // Keeps track of the last time moles were updated
let moleDelay = 500; // Time in milliseconds between mole updates (adjust as needed)
let moleVisibleDuration = 500; 
let currentMole = -1;

let explosionVisible = false; // Track if explosion is visible (NEW)
let explosionStartTime = 0;    // Track when the explosion started (NEW)
let explosionDuration = 300;

let lastTimeUpdate = 0;
let timerDelay = 1000;

let i;
//images    
let bg;
let endGameBg;
let mole;
let blurTab;
let explosion;
let hammer;
let scoreText =" Score:"
let timerText = "Time left:"
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

let song;


function preload(){
  blurTab = loadImage("./photos/tab.png");
  mole = loadImage("./photos/mole.png");
  explosion = loadImage("./photos/explosion.png");
  hammer = loadImage("./photos/hammer.png");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  song = loadSound("./sounds/bg-music.mp3");
  bg = loadImage('./photos/game-bg-image.png');
  endGameBg = loadImage('./photos/endscreen.jpg');
  blurTab.filter(BLUR, 3);

  currentMole = Math.round(random(1, 6)); // Pick a random mole at the start
  lastMoleUpdate = millis(); // Initialize the timer

}

function loaded(){

}



function draw() {
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
  
  if(gameState === "playing"){
    holes();

    if (explosionVisible) { // NEW CONDITION
        if (millis() - explosionStartTime < explosionDuration) { // NEW TIMER CHECK
        showExplosion(currentMole); // Call explosion instead of mole (NEW)
        } else {
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

if(gameState === "end-screen"){
    background(endGameBg);
    endScreen();
}

  
  if(fRate < 3){
    fRate+= 0.1;
  }
}

function endScreen(){
    fill(255);
    textSize(40);
    textFont("times");
    textStyle("bold");
    text("Final Score:" + score, width/2 - 150, 3/4 * height, 320);
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
  } else if (i === 2) {
    image(explosion, moleWidth2 - 35, upperMoleHeight - 82, moleWidthSize, moleHeightSize);
  } else if (i === 3) {
    image(explosion, moleWidth3 - 35, upperMoleHeight - 82, moleWidthSize, moleHeightSize);
  } else if (i === 4) {
    image(explosion, moleWidth1 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  } else if (i === 5) {
    image(explosion, moleWidth2 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  } else if (i === 6) {
    image(explosion, moleWidth3 - 35, lowerMoleHeight - 82 + 50, moleWidthSize, moleHeightSize);
  }
}

function mousePressed() {
  if (currentMole === 1 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } else if (currentMole === 2 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } else if (currentMole === 3 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= upperMoleHeight - 82 && mouseY <= upperMoleHeight - 82 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } else if (currentMole === 4 && mouseX >= moleWidth1 - 35 && mouseX <= moleWidth1 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } else if (currentMole === 5 && mouseX >= moleWidth2 - 35 && mouseX <= moleWidth2 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  } else if (currentMole === 6 && mouseX >= moleWidth3 - 35 && mouseX <= moleWidth3 + 35 && mouseY >= lowerMoleHeight - 82 + 50 && mouseY <= lowerMoleHeight - 82 + 50 + 85) {
    triggerExplosion(); // Changed to trigger explosion (NEW)
  }
}

function triggerExplosion() { // NEW FUNCTION
  explosionVisible = true; // Set explosion visibility
  explosionStartTime = millis(); // Start the explosion timer
  score++; // Increment score
}