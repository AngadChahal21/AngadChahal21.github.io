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

let stack = [];
let visited = [];

let myFont; //load font
let img; //background image 
let gameState = "startScreen"; // state variables

let cols, rows;
let cellSize = 20;
let id;
let grid = [];
let colours = [];
let edges = [];

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
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      id = y * cols + x; //unique ID for each cell 
      grid.push({x:x,   y:y, set:id, walls:[true, true, true, true]});
      colours[id] = color(random(255), random(255), random(255));
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
  frameRate(30);
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
}

//endscreen
function endScreen(){
  background(0);
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
    let rectangle = rect(buttonX,buttonY ,300 ,70 ,50); //draw button 
    
    //button text
    fill("black");
    textSize(15);
    text("Generate Maze", buttonX, buttonY);
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
  rectMode(CORNER);

  //drawing the grid 
  let a = 0;
  for(let i = 0; i < rows; i ++){
    for(let j = 0; j < cols; j ++){
      fill(colours[grid[a].set]);
      noStroke();
      square(grid[a].x * cellSize, grid[a].y * cellSize, cellSize);
      stroke(0);
      if(grid[a].walls[0]){
        line(grid[a].x * cellSize, grid[a].y * cellSize, grid[a].x *cellSize + cellSize, grid[a].y * cellSize); // top edge
        
      }

      if(grid[a].walls[1]){
        line(grid[a].x * cellSize, grid[a].y * cellSize, grid[a].x *cellSize , grid[a].y * cellSize + cellSize); //left edge
      }

      if(grid[a].walls[2]){
        line(grid[a].x * cellSize, grid[a].y * cellSize + cellSize, grid[a].x *cellSize + cellSize, grid[a].y * cellSize + cellSize); //bottom edge
      }

      if(grid[a].walls[3]){
        line(grid[a].x * cellSize + cellSize, grid[a].y * cellSize, grid[a].x *cellSize + cellSize, grid[a].y * cellSize + cellSize); // right edge
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
      square(grid[stack[i]].x * cellSize + cellSize/4, grid[stack[i]].y * cellSize + cellSize/4, cellSize/2);
    }
  }


  // if(grid[setA].id !== grid[setA + 1].id){
  //   unionCells(2,setA);
  // }

  // if(grid[setB].id !== grid[setB + 10].id){
  //   unionCells(3,setB);
  // }
  
}

function searchSet(index){
  return grid[index].set;
}

function unionCells(setA,setB){
  for(let cell of grid){
    if(cell.set === setB){
      cell.set = setA;
      colours[cell.set] = colours[setA];
    }
  }
}

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

function dfsSolution(){
  if(stack.length > 0){
    let current = stack[stack.length - 1];
    if(current === grid.length - 1){
      console.log("Maze solved");
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

    else{
      stack.pop();
    }

    // //if all ways are blocking check for open ways regardless of whether they have been visted or not
    // else if(!grid[current].walls[1]){ //checking left wall
    //   stack.push(current - cols);
    // }

    // else if(!grid[current].walls[0]){ // checking top wall
    //   stack.push(current - 1);
    // }

    // else if(!grid[current].walls[3]){ // checking right wall
    //   stack.push(current + cols);
    // }

    // else if(!grid[current].walls[2]){  // checking bottom wall
    //   stack.push(current + 1);
    // }

    

  }
}


