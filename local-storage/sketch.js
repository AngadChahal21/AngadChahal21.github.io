//LocalStorage Demo

let numberOfClicks = 0;
let highestClick = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //only get the highest value if it exists...
  if(getItem("highest")) {
    highestClick = getItem("highest");
  }
}

function draw() {
  background(0);
  displayClicks();
  displayHighest();
}

function mousePressed(){
  numberOfClicks++;
  if(numberOfClicks > highestClick){
    highestClick = numberOfClicks;
    storeItem("highest", highestClick);

  }
}

function displayClicks(){
  fill("white");
  textSize(50);
  text(numberOfClicks, width/2, height/2);
}

function displayHighest(){
  fill("green");
  textSize(50);
  text(highestClick, width/2, 2/3 * height);
}