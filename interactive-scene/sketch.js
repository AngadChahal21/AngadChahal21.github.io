// Project Title
// Angadveer Chahal
// Date
// A replica for a game called "OKAY?"
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
console.log("check");
let rectHeight = 220;
let rectWidth = 30;
let speed = 3;
let y =  rectHeight*1.33;
let radius = 40;

let x1;
let y1;
let x2;
let y2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}


//1st rectangle
let upperBound1 = height/2 - rectHeight*1.33;

//2nd rectangle 
let lowerBound2 = height/2 + rectHeight/3 + rectHeight;

function draw() {
  background(21,97,109);
  
  //osbtacle rectangles
  fill(0,21,36);
  rect(width/2,height/2 + rectHeight/3  , rectWidth, rectHeight); // 2nd rectangle
  rect(width/2,height/2 - rectHeight*1.33   , rectWidth, rectHeight); // 1strectangle

  //hitting rectangle
  fill(255, 236, 209);
  rect(width/2 - 150 ,height/2 + rectHeight/3  , rectWidth * 2, rectHeight); // 2nd rectangle

  //moving circle
  fill(255, 236, 209);
  moveBall();
  changeDirection();
  slingshot();
  // if(y > lowerBound2 || y< upperBound1){
  //   speed = speed * -1; 
  // }
  circle(2/3 * width, y, radius*2 );


}

function moveBall(){
  y = y + speed;
}

function changeDirection(){
  // if(y > lowerBound2 || y< upperBound1){
  //   speed = speed * -1; 
  // }
  if (y >= height - radius || y <= 0 + radius) {
    speed = speed * -1;
  }
}

function slingshot(){
  function mouseClicked(){
    x1 = mouseX;
    y1 = mouseY;
    console.log(x1, y1);
  }
  function mouseReleased(){
    x2 = mouseX;
    y2 = mouseY;
  }
}