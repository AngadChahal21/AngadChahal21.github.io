// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let mole;
let img;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('./photos/game-bg-image.png')
}

function draw() {
  background(bg); //whack a mole base background
  holes();
  moles();
}

function holes(){
  fill(91,50,11);

  //upper row
  ellipse(1/4 * width, 2/4 * height, 80, 40);
  ellipse(2/4 * width, 2/4 * height, 80, 40);
  ellipse(3/4 * width, 2/4 * height, 80, 40);
  
  //bottom row
  ellipse(1/4 * width, 3/4 * height, 80, 40);
  ellipse(2/4 * width, 3/4 * height, 80, 40);
  ellipse(3/4 * width, 3/4 * height, 80, 40);
}

function moles(){
    img = loadImage('./photos/mole.png');
    image(img, 100, 100);

}
