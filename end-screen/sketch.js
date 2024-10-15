let fontSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

fontSize = map(width, 0, 1000, 10, 60);

function draw() {
  background(0);
  
  stroke(255);
  textSize(fontSize);
  text("Maze Mania completed", width/2, height/2);
}