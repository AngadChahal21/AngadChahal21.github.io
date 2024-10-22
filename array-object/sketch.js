// Maze Generator and Solver
// Anagdveer Singh Chahal
// 21st October, 2024
//
// Extra for Experts:
/* - Inplemented, learnt and understood how 'Kruskal's algorithm' and minimum spanning tree works for generating mazes.
 Moreover, used and understood another algorithm, 'Depth-First Search algorithm' and implemented it for solving the resulting mazes.
 Lastly, in the process, used some new functions like shuffle or location.reload and used objects within arrays.

*/

//variables for Depth-First Search

let stack = [];
let visited = [];

let myFont; //load font
let img; //background image 
let gameState = "startScreen"; // state variable

let cols, rows; 
const CELL_SIZE = 30;
let id;
let grid = []; //storing details for every cell in the maze 
let colours = [];
let edges = [];

//preloading images and fonts
function preload(){
  myFont = loadFont('PressStart2P-Regular.ttf');
  img = loadImage('./pictures/bg.avif');
}

function setup() {

  
  createCanvas(windowWidth, windowHeight);
  cols = floor(height/CELL_SIZE);
  rows = floor(height/CELL_SIZE);
  

  //assigning and storing unique IDs to each cell
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      id = y * cols + x; //unique ID for each cell 
      grid.push({x:x,   y:y, set:id, walls:[true, true, true, true]});
      colours[id] = color(random(255), random(255), random(255)); //assigned random color to each cell
    } 
  }

  //storing edges in an array
  let a = 0;
  for(let y = 0; y < rows; y ++){
    for(let x = 0; x < cols; x ++){
      id = y * cols + x;
      if(x < cols - 1){
        edges.push([id, id + 1]); //bottom edge of every cell
      }
      if( y < rows -1 ){
        edges.push([id, id + cols]); //right edge of every cell 
      }
    }
    a++;
  }
  shuffle(edges, true); // shuffle all edges in  the array 

  //initializing the visited array  
  for(let i = 0; i< grid.length; i++){
    visited[i] = false;
  }

  //make the starting cell visited
  visited[0] = true;
  stack.push(0);
}




function draw() {
  frameRate(60);
  background(220);
  if(gameState === "startScreen"){
    startScreen();
  }
  else if(gameState === "startGame"){
    startGame();

  }
}

//start screen
function startScreen(){
  let buttonX = width/2; //x-coordinate of button
  let buttonY = 3/5 * height; //y-coordinate of button
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
    text("Generate Maze", buttonX, buttonY);  

    if(mouseIsPressed){
      gameState = "startGame";
    }
  }

  //button normal
  else{
    //button
    fill("yellow");
    rectMode(CENTER);
    rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill("black");
    textSize(15);
    text("Generate Maze", buttonX, buttonY);
  }
}

function startGame(){
  background(0);
  
  rectMode(CENTER);
  let mazeWidth = cols * CELL_SIZE;
  
  //button hovered
  if(mouseX < mazeWidth + (windowWidth - mazeWidth)/2 + 75 && mouseX > mazeWidth + (windowWidth - mazeWidth)/2 - 75 && mouseY > 1/3 * height - 25 && mouseY < 1/3 * height + 25){
    stroke(255);
    fill(86, 176, 16);
    rect(mazeWidth + (windowWidth - mazeWidth)/2, 1/3 * height,150,50, 10 );
    fill(0);
    textSize(8);
    text("Back to Menu", mazeWidth + (windowWidth - mazeWidth)/2, 1/3 * height);  

    if(mouseIsPressed){
      location.reload(); //reset all values and start all over again 
    }
    mouseIsPressed = false;
  }

  //button normal
  else{
    //button
    stroke(255);
    fill(116,238,21);
    rect(mazeWidth + (windowWidth - mazeWidth)/2, 1/3 * height,150,50, 10 );
    
    //button text
    fill(0);
    textSize(8);
    text("Back to Menu", mazeWidth + (windowWidth - mazeWidth)/2, 1/3 * height );  
  }
  fill(255);
  textSize(12);
  text("The maze can be \n solved in \n" + stack.length + " steps", mazeWidth + (windowWidth - mazeWidth)/2, 2/3 * height );

  rectMode(CORNER);
  
  //drawing the grid 
  let a = 0;
  for(let i = 0; i < rows; i ++){
    for(let j = 0; j < cols; j ++){
      fill(colours[grid[a].set]);
      noStroke();
      square(grid[a].x * CELL_SIZE, grid[a].y * CELL_SIZE, CELL_SIZE);
      stroke(0);
      if(grid[a].walls[0]){
        line(grid[a].x * CELL_SIZE, grid[a].y * CELL_SIZE, grid[a].x *CELL_SIZE + CELL_SIZE, grid[a].y * CELL_SIZE); // top edge
        
      }

      if(grid[a].walls[1]){
        line(grid[a].x * CELL_SIZE, grid[a].y * CELL_SIZE, grid[a].x *CELL_SIZE , grid[a].y * CELL_SIZE + CELL_SIZE); //left edge
      }

      if(grid[a].walls[2]){
        line(grid[a].x * CELL_SIZE, grid[a].y * CELL_SIZE + CELL_SIZE, grid[a].x *CELL_SIZE + CELL_SIZE, grid[a].y * CELL_SIZE + CELL_SIZE); //bottom edge
      }

      if(grid[a].walls[3]){
        line(grid[a].x * CELL_SIZE + CELL_SIZE, grid[a].y * CELL_SIZE, grid[a].x *CELL_SIZE + CELL_SIZE, grid[a].y * CELL_SIZE + CELL_SIZE); // right edge
      }
      a++;
    }
  }

  
  //Run Kruskal's Algorithm
  let setA;
  let setB;
  if(edges.length > 0){
    let [a,b] = edges.pop();
    setA = searchSet(a);
    setB = searchSet(b);

    if(setA !== setB){
      unionCells(setA,setB); // merge sets that get connected 
      removeWall(a,b); //removing walls between a and b
    }
  }

  //checking whether the maze has been completed or not
  let check = 0;
  for(let i = 0; i < grid.length; i++){
    let idCheck = grid[0].set;
    if(grid[i].set !== idCheck){
      check = 1;
    }
  }
  
  //if maze completed, implement DFS algorithm to solve it
  if(check === 0){
    dfsSolution();
    for(let i = 0; i < stack.length; i++){
      fill(116,238,21);
      if(i === 0){
        fill(255);
      }
      if(i === stack.length -1){
        fill(255,0,0);
      }
      //rectMode(CENTER);
      square(grid[stack[i]].x * CELL_SIZE + CELL_SIZE/4, grid[stack[i]].y * CELL_SIZE + CELL_SIZE/4, CELL_SIZE/2);
    }
  }
}

function searchSet(index){
  return grid[index].set;
}

//merge IDs and colours of connected cells
function unionCells(setA,setB){
  for(let cell of grid){
    if(cell.set === setB){
      cell.set = setA;
      colours[cell.set] = colours[setA];
    }
  }
}

//remove walls between a and b
function removeWall(a, b){
  let x1 = grid[a].x;
  let y1 = grid[a].y;

  let x2 = grid[b].x;
  let y2 = grid[b].y;

  if(x1 === x2){  
    if(y1 < y2){
      grid[a].walls[2] = false; //remove bottom wall
      grid[b].walls[0] = false; // remove top wall
    }
    else{
      grid[a].walls[0] = false; // remove top wall
      grid[b].walls[2] = false; // remove bottom wall
    }
  }

  else if(y1 === y2){
    if(x1 < x2){
      grid[a].walls[3] = false; // remove right wall
      grid[b].walls[1] = false; // remove left wall
    }
    else{
      grid[a].walls[1] = false; //remove left wall
      grid[b].walls[3] = false; //remove right wall
    }
  }
}

//solving maze
function dfsSolution(){
  if(stack.length > 0){
    let current = stack[stack.length - 1];
    if(current === grid.length - 1){
      return stack;
    }

    visited[current] = true;
    //if there is no wall and the next cell hasn't been visited then push that to stack(path)
    // Order of precedence: bottom > right > top > left 
    if(!grid[current].walls[2] && current + cols < grid.length &&  !visited[current + cols]){  // checking bottom wall
      stack.push(current + cols);
    }
    
    else if(!grid[current].walls[3] && (current + 1) % cols !== 0 && !visited[current + 1]){ // checking right wall
      stack.push(current + 1);
    }
 
    else if(!grid[current].walls[0] && current - cols >= 0 && !visited[current - cols]){ // checking top wall
      stack.push(current - cols);
    }

    else if(!grid[current].walls[1] && current % cols !== 0 && !visited[current - 1]){ //checking left wall
      stack.push(current - 1);
    }

    else{ // if there is no way to move ahead/ approached deadend then pop the stack until a new path emerges
      stack.pop();
    }
  }
}
