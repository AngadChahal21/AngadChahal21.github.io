// Project Title
// Your Name
// Date
// A replica for a game called "OKAY?"
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
function setup() {
  createCanvas(windowWidth, windowHeight);
}

let rectHeight = 220;
let rectWidth = 30;
let speed = 5;
let y = rectHeight*1.33;

function draw() {
  background(21,97,109);
  fill(0,21,36);
  
  //osbtacle rectangles 
  rect(width/2,height/2 + rectHeight/3  , rectWidth, rectHeight); // 2nd rectangle
  rect(width/2,height/2 - rectHeight*1.33   , rectWidth, rectHeight); // 1strectangle

  //moving circle
  // moveBall();
  // changeDirection();
  fill(255, 236, 209);
  circle(2/3 * width, y, 80 );


}

function moveBall(){
  y = y + speed;
}

function changeDirection(){
  if(y >= rectHeigh/3 + rectHeight || y<= rectHeight*1.33){
    speed = speed * -1; 
  }
}