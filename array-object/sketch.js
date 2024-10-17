// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

/*Ideas:
Patterns 
Generative art 
A complilations of generative games 

Elements that can be used:
https://www.reddit.com/r/p5js/comments/1fwsv9t/charged/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
https://www.reddit.com/r/p5js/comments/1frnncu/futuristic_shape_generator/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
https://www.reddit.com/r/p5js/comments/1ed3gci/infinite_donuts_interactive_website/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
(can be used for a maze game)https://www.reddit.com/r/p5js/comments/1eazmb9/amazing/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
(collision library for p5 js) https://github.com/bmoren/p5.collide2D.git
https://www.reddit.com/r/p5js/comments/1e2q5i7/brightness_based_ascii_renderer_including_edge/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
https://www.reddit.com/r/p5js/comments/1djme24/ive_been_addicted_to_playing_bitburner_lately/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
*/


/*
Maze generation using Prim's  algorithm https://www.youtube.com/watch?v=BxabnKrOjT0      https://github.com/ian-howell/Mazes
Maze solution using Depth First Search algorithm https://medium.com/swlh/solving-mazes-with-depth-first-search-e315771317ae


https://vishald.com/blog/kruskals-maze-generation/
*/


// let reached = [];
// let unreached = [];
let myFont; //load font
let img; //background image 
let gameState = "startScreen"; // state variables

let cols, rows;
let cellSize = 30;
let id;
let grid = []

//preloading images and fonts
function preload(){
  myFont = loadFont('PressStart2P-Regular.ttf');
  img = loadImage('./pictures/bg.avif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(height/cellSize);
  rows = floor(height/cellSize);

  //assigning and storing unique IDs to each cell
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      id = i * cols + j; //unique ID for each cell 
      grid.push({i:i,   j:j,  red:random(255),  green:random(255),  blue:random(255), id:id, walls:[true, true, true, true]});
    }
  }
  console.log(grid);
}

function draw() {
  background(220);
  if(gameState === "startScreen"){
    startScreen();
  }
  else if(gameState === "startGame"){
    startGame();
  }
  else if(gameState === "endScreen"){
    endScreen();
  }
  //endScreen();
}

function endScreen(){
  background(0);
  let confetti = [];
  
}

//start screen
function startScreen(){
  let buttonX = width/2;
  let buttonY = 3/5 * height;
  background(img);

  let fontSize = map(width, 0, 1000, 10, 65); // calculating responsive font size

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("Maze Mania", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    fill(150, 150, 0);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(0);
    textSize(15);
    text("Click to start", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startGame";
    }
  }

  //button normal
  else{
    //button
    fill("yellow");
    rectMode(CENTER);
    let rectangle = rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill("black");
    textSize(15);
    text("Click to start", buttonX, buttonY);
  }
}

function startGame(){
  background(220);
  // for(let i = 50; i < width; i += 100 ){
  //   for(let j = 50; j < height; j += 100){
  //     fill("green");
  //     noStroke();
  //     rect(i,j,50,50);
  //   }
  // }

  // for(let i = width/21 ; i < width - width/21; i+= width/20 * 2){
  //   for(let j = height/21 * 2 ; j < height - height/21; j+= width/20 * 2){
  //     fill("green");
  //     noStroke();
  //     rect(i,j, width/20, width/20);
  //   }
  // }
  for(let i = 0; i < rows; i += cellSize){
    for(let j = 0; j < cols; j += cellSize){
      square(i, j, cellSize);
    }
  }

  
}