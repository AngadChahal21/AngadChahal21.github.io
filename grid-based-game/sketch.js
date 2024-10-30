// Project Title
// Angadveer Singh Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "startScreen";

function preload(){
  myFont = loadFont('PressStart2P-Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  if(gameState === "startScreen"){
    startScreen();
  }

  if(gameState === "endScreen"){
    endScreen();
  }

}

function startScreen(){
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height; //y-coordinate of button
  background(150);

  let fontSize = map(width, 0, 1000, 10, 65); // calculating responsive font size

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("?", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    fill(10);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(255);
    textSize(15);
    text("Start", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startGame";
    }
  }

  //button normal
  else{
    //button
    fill(50);
    rectMode(CENTER);
    rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill(255);
    textSize(15);
    text("Start", buttonX, buttonY);
  }
}

function endScreen(){
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height; //y-coordinate of button
  background(150);

  let fontSize = map(width, 0, 1000, 10, 65); // calculating responsive font size

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("You completed in", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    fill(10);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(255);
    textSize(15);
    text("Back to Home", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startGame";
    }
  }

  //button normal
  else{
    //button
    fill(50);
    rectMode(CENTER);
    rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill(255);
    textSize(15);
    text("Back to Home", buttonX, buttonY);
  }
}
