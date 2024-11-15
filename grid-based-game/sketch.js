// Project Title
// Angadveer Singh Chahal
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myFont;
let pause;

let spawnDelay = 2000; // 2 seconds delay between spawns
let lastSpawnTime = 0;

//mouse animation(circle)
////////////////
let spacing = 20;
let size = [];
let cols, rows;
let scale = 0.2;
////////////////

//mouse animation 2(trailing effect)
///////////////////////////////
const CELL_SIZE = 40;

//the purple-like color
const COLOR_R = 79;
const COLOR_G = 38;
const COLOR_B = 233;

const STARTING_ALPHA = 255;

const PROB_OF_NEIGHBOUR = 50; //50-50 chance
const AMT_FADE_PER_FRAME = 5; 
const STROKE_WEIGHT = 1;

let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allNeighbours = [];
///////////////////////////////

//main grid
////////////////////////////
let mainRows;             //
let mainCols;             //
let mainCellSize = 100;   
let radius = mainCellSize/2;      //
let numSides = 6;         //
let gridLength;
let startingPoint;
////////////////////////////

//game logic
let paused = false;
let grid = [];
let enemies = [];
let bulletsFired = [];

let gameState = "startScreen";

function preload(){
  myFont = loadFont('PressStart2P-Regular.ttf');
  pause = loadImage('./pictures/pausedButton.png');
}



class Player {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  // Method to display the player
  display() {
    fill(0, 255, 0); // Red color for the player
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  // Method to handle movement with arrow keys
  move() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= (sqrt(3) * radius);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += (sqrt(3) * radius);
    }
  }
}

let player;

class Enemy {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  // Display the enemy
  display() {
    fill(255, 0, 0); // Red color for the enemy
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  // Move towards the player
  moveTowardPlayer(playerX, playerY) {
    let angle = atan2(playerY - this.y, playerX - this.x);
    this.x += this.speed * cos(angle);
    this.y += this.speed * sin(angle);
  }
}

class Bullet {
  constructor(x, y, xSpd, ySpd) {
    this.x = x;
    this.y = y;
    this.xSpd = xSpd;
    this.ySpd = ySpd;
  }

  display() {
    push();
    stroke(230, 255, 0);
    fill(230, 255, 0, 135);
    ellipse(this.x, this.y, 30);
    pop();
  }

  update() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    this.xSpd *= 0.994; // Gradual slowdown
    this.ySpd *= 0.994;
  }

  hitScan() {
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let distToEnemy = dist(this.x, this.y, enemy.x, enemy.y);
      
      // Check if the bullet is colliding with the enemy
      if (distToEnemy < (enemy.size / 2 + 15)) { // 15 is the radius of the bullet
        enemies.splice(i, 1); // Remove the enemy from the array
        // Increment the score
        return true; // Return true to indicate collision
      }
    }
    return false; // No collision
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width/spacing;
  rows = height/spacing;
  
  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  stroke(colorWithAlpha);
  strokeWeight(STROKE_WEIGHT);
  numRows = Math.ceil(windowHeight/ CELL_SIZE);
  numCols = Math.ceil(windowWidth/ CELL_SIZE);

  //main grid 
  mainCellSize = 100;
  
  mainRows = floor(windowHeight/(sqrt(3)*radius));
  mainCols = floor( 3/4 * windowWidth/(1.5 * mainCellSize));

  gridLength = mainCellSize*mainCols + mainCellSize * (mainCols - 1)/2; 
  startingPoint = (windowWidth - gridLength)/2;

  player = new Player(width / 2, height / 2, 70, 3);

  // for (let i = 0; i < 5; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   enemies.push(new Enemy(x, y, 70, 2)); // Size and speed of enemies
  // }
}

function draw() {
  background(220);
  if(gameState === "startScreen"){
    startScreen();
  }

  if(gameState === "startGame"){
    startGame();
    console.log(grid);
  }

  if(gameState === "endScreen"){
    endScreen();
  }
  

}

//START SCREEN
function startScreen(){
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height; //y-coordinate of button
  background(150);

  let fontSize = map(width, 0, 1000, 10, 65); // calculating responsive font size

  //the mouse animation
  ////////////////////////////
  rectMode(CENTER);
  for(let y = 0; y < rows; y++){
    size[y] = [];
    for(let x= 0; x < cols; x++){
      size[y][x] = dist(mouseX,mouseY, spacing/2 + x * spacing, spacing/2 + y * spacing) * scale;
    }
  }
  for(let y = 0; y < rows; y++){
    for(let x= 0; x < cols; x++){
      fill(30);
      noStroke();
      rect(spacing/2 + x * spacing, spacing/2 + y * spacing, size[y][x], size[y][x] );

    }
  }
  ////////////////////////////

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  text("?", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    fill(255);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(0);
    textSize(15);
    text("Start", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startGame";
    }
  }

  //button normal
  else{
    //button
    fill(0);
    rectMode(CENTER);
    rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill(255);
    textSize(15);
    text("Start", buttonX, buttonY);
  }

  
}


//START GAME
function startGame(){
  
  
  
  console.log(mainRows);
  console.log(mainCols);

  background(0);
  strokeJoin(ROUND);
  rectMode(CENTER);
  let c = 1;
  let height = sqrt(3) * 0.5 * mainCellSize;
  let radius = mainCellSize/2;
  let centerX;
  let centerY;

  let coordX;
  let coordY;
  for(let y = 0, j = 0; y < mainRows; y+=0.5, j+=0.5){
    if(c%2 !== 0){
      grid[j] = [];
    }
    for(let x = 0, i = 0; x < mainCols * 1.5; x+=1.5, i+=2){
      if(c% 2 === 0){
        centerX = (x * mainCellSize + 0.75 * mainCellSize) + startingPoint;
        centerY = y * height;
        if(centerX - radius > 0 && centerX + radius < windowWidth && centerY + radius < windowHeight){
          drawHexagon(centerX, centerY , mainCellSize, 0); //black
          grid[floor(j)][i + 1] = {xIndex: i + 1, yIndex: floor(j), xCoord: centerX, yCoord: centerY };
        }
      }
      else{
        centerX = x * mainCellSize + startingPoint;
        centerY = y * height;
        if(centerX - radius > 0 && centerX + radius < windowWidth && centerY - radius > 0 ){
          drawHexagon( centerX , centerY , mainCellSize, 50); //gray
          grid[floor(j)][i] = {xIndex: i, yIndex: j, xCoord: centerX, yCoord: centerY };
        }
      }
    }
    c++;
    
  }

  if(!paused){
    updateGame();
  }

  if(paused){
    rectMode(CORNER);
    fill(100,150);
    noStroke();
    rect(0,0,windowWidth , windowHeight);
    imageMode(CENTER);
    image(pause, windowWidth/2, windowHeight/2, 120, 120);
  }
}

function keyPressed(){
  if(key === 'P' || key === 'p'){
    paused = !paused; 
  }

  if(key === 'e' || key === 'E'){
    gameState = "endScreen";
  }
}

function mousePressed() {
  let dx = mouseX - player.x; // Difference in x position between mouse and player
  let dy = mouseY - player.y; // Difference in y position between mouse and player
  let angle = atan2(dy, dx);  // Calculate angle

  // Set speed based on angle
  let bulletSpeed = 12;
  let xSpd = cos(angle) * bulletSpeed;
  let ySpd = sin(angle) * bulletSpeed;

  let oneBullet = new Bullet(player.x, player.y, xSpd, ySpd);
  bulletsFired.push(oneBullet);
}

function updateGame(){
  player.x = grid[floor(mainRows/2)][0].xCoord;
  player.y = grid[floor(mainRows/2)][0].yCoord;

  player.display();
  player.move();

  if (millis() - lastSpawnTime > spawnDelay) {
    spawnEnemy();
    lastSpawnTime = millis(); // Update last spawn time
  }

  for (let enemy of enemies) {
    enemy.moveTowardPlayer(player.x, player.y);
    enemy.display();
  }
 
 

  for (let i = bulletsFired.length - 1; i >= 0; i--) {
    let bullet = bulletsFired[i];
    bullet.display();
    bullet.update();
    
    // Check for out of bounds or collision
    if (bullet.hitScan()) {
      bulletsFired.splice(i, 1); // Remove the bullet after a hit
    }
  }
}


//END SCREEN
function endScreen(){
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height + 150; //y-coordinate of button
  
  background(31);
  // finding indices 
  let row = floor(mouseY/CELL_SIZE); 
  let col = floor(mouseX/CELL_SIZE);

  //updating current grid locations of mouse 
  if(row !== currentRow || col !== currentCol){
    currentRow = row;
    currentCol = col;
    
    let newNeighbours = getRandomNeighours(row, col);
    for (let neighbour of newNeighbours) {
      allNeighbours.push(neighbour);
    }    
  }

  //co-ordinates of the square the mouse is hovering on
  let x = col * CELL_SIZE; 
  let y = row * CELL_SIZE;

  noFill();
  stroke(colorWithAlpha);
  rect(x, y, CELL_SIZE, CELL_SIZE);

  //displaying neighbour grid cells
  for(let neighbour of allNeighbours){
    let neighbourX = neighbour.col * CELL_SIZE;
    let neighbourY = neighbour.row * CELL_SIZE;

    

    neighbour.opacity = max(0, neighbour.opacity - AMT_FADE_PER_FRAME);
    stroke(COLOR_R, COLOR_B, COLOR_G, neighbour.opacity);
    rect(neighbourX, neighbourY, CELL_SIZE, CELL_SIZE);
  }

  allNeighbours = allNeighbours.filter((neighbour) => neighbour.opacity > 0); //removing neighbours with 0 opacity

  let fontSize = map(width, 0, 1000, 10, 65); // calculating responsive font size

  //Title text
  fill(255);
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(55);
  text("You completed in", width / 2, height / 2 - 100); 

  //button hovered
  if(mouseX < buttonX + 200 && mouseX > buttonX - 200 && mouseY > buttonY - 50 && mouseY < buttonY + 50){
    fill(10);
    rect(buttonX, buttonY ,300 ,70 ,50);
    fill(255);
    textSize(15);
    text("Back to Home", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startScreen";
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

//STORE A RANDOM NUMBER OF NEIGHBOURS IN AN ARRAY
function getRandomNeighours(row, col){
  let neighbours = [];
  for(let dRow = -1; dRow <= 1; dRow++){ // top and bottom neighbours 
    for(let dCol = -1; dCol <= 1; dCol++){ //left and right neighbours 
      let neighbourRow = row + dRow;
      let neighbourCol = col + dCol;

      let isCurrent  = (dRow === 0 && dCol === 0); // boolean variable to check whether the neighbour is the current cell itself 

      //boolean variable to check bounds of neighbour cells
      let withinBounds = 
      neighbourRow >= 0 &&
      neighbourRow < numRows &&
      neighbourCol >= 0 &&
      neighbourCol < numCols;

      if(!isCurrent && withinBounds && random(0,100) < PROB_OF_NEIGHBOUR){
        neighbours.push({row:neighbourRow, col: neighbourCol, opacity: 255});
      }
    }

  }
  
  return neighbours;

}

//DRAW HE HEX TILES
function drawHexagon(x, y, d, colour){
  stroke(255);
  fill(colour);
  beginShape();
  vertex(x - 0.5 * d,y); // extreme left 
  
  //top 
  vertex(x - 0.25 * d, y - 0.5 * (Math.sqrt(3) * 0.5 * d)); // top left 
  vertex(x + 0.25 * d, y - 0.5 * (Math.sqrt(3) * 0.5 * d)); // top right
  
  vertex(x + 0.5 * d,y ); // extreme right 
  
  //bottom
  vertex(x + 0.25 * d, y + 0.5 * (Math.sqrt(3) * 0.5 * d)); // bottom right
  vertex(x - 0.25 * d, y + 0.5 * (Math.sqrt(3) * 0.5 * d));// bottom left 
  
  endShape(CLOSE);
}

function spawnEnemy() {
  //let x = random(width);
  let x = grid[0][grid[0].length - 1].xCoord;
  let randomY = random(0,12);
  let y = random(height);
  enemies.push(new Enemy(x, y, 70, 2)); // Size and speed of enemies
}