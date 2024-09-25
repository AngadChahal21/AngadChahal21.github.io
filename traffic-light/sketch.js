// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = "green";
const GREEN_TIME = 3000;
const YELLOW_TIME = 500;
const RED_TIME = 3500;
let lastSwitchedTime = 0;
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  //GREEN
  if(state === "green" && millis() > lastSwitchedTime + GREEN_TIME){
    state = "yellow";
    lastSwitchedTime = millis();
  }

  //YELLOW
  if(state === "yellow" && millis() > lastSwitchedTime + YELLOW_TIME){
    state = "red";
    lastSwitchedTime = millis();
  }

  //RED 
  if(state === "red" && millis() > lastSwitchedTime + RED_TIME){
    state = "green";
    lastSwitchedTime = millis();
  }

  drawOutlineOfLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  

  ///////////////////////LIGHTS /////////////////////////

  //top
  if(state !== "red"){
    fill(255);
  }
  else{
    fill("red");
  }
  ellipse(width/2, height/2 - 65, 50, 50); 

  

  //middle
  if(state !== "yellow"){
    fill(255);
  }
  else{
    fill("yellow");
  }
  ellipse(width/2, height/2, 50, 50);


  //bottom
  if(state !== "green"){
    fill(255);
  }
  else{
    fill("green");
  }
  ellipse(width/2, height/2 + 65, 50, 50); 
 
}