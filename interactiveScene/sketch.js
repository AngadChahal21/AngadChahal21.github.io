// Whack a mole
// Angadveer Singh Chahal
// September 30
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let fRate = 0.5 ;

let lastMoleUpdate = 0; // Keeps track of the last time moles were updated
let moleDelay = 500; // Time in milliseconds between mole updates (adjust as needed)
let moleVisibleDuration = 500; 
let currentMole = -1;


let i;
//images    
let bg;
let mole;
let blurTab;
let explosion;
let hammer;
let scoreText =" Score:"
let score = 0; 

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


function preload(){
  blurTab = loadImage("./photos/tab.png");
  mole = loadImage("./photos/mole.png");
  explosion = loadImage("./photos/explosion.png");
  hammer = loadImage("./photos/hammer.png");

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('./photos/game-bg-image.png');
  blurTab.filter(BLUR, 3);

  currentMole = Math.round(random(1, 6)); // Pick a random mole at the start
  lastMoleUpdate = millis(); // Initialize the timer

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
  
 
  

  holes();
  if (millis() - lastMoleUpdate < moleVisibleDuration && currentMole !== -1) {
    showMole(currentMole); // Draw the current mole
  }

  // Update moles only after the mole stays visible for a certain time
  if (millis() - lastMoleUpdate > moleDelay + moleVisibleDuration) {
    currentMole = Math.round(random(1, 6)); // Pick a new random mole
    lastMoleUpdate = millis(); // Reset the timer
  }

  drawHammer();

  
  if(fRate < 3){
    fRate+= 0.1;
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
 
}