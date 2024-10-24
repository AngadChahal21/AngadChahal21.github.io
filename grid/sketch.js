
// let grid = [[1, 0, 0, 1],
//             [0, 1, 1, 0],
//             [0, 0, 1, 1],
//             [1, 1, 1, 0]];

let grid;            
let cellSize;
const GRID_SIZE = 10;
let shouldToggleNeighbours = false;

function setup() {

  if(windowWidth< windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function windowResized(){
  if(windowWidth< windowHeight){
    resizeCanvas(windowWidth, windowWidth);
  }
  else{
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function draw() {
  frameRate(60);
  background(220);
  displayGrid();
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);

  // if(shouldToggleNeighbours){
  //   toggleCell(x, y+1);
  //   toggleCell(x, y-1);
  //   toggleCell(x+1, y);
  //   toggleCell(x-1, y);

  // }
}

function toggleCell(x, y){

  if(x >= 0 && x < GRID_SIZE && y>=0 && y < GRID_SIZE){
    if(grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else{
      grid[y][x] = 0;
    }
  }
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if(key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if(key === 'n'){
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if(key === " "){
    grid = updateGrid();
  }
}

function updateGrid(){
  //make another array to hold the next rurn
  let nextTurn =  generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  //look at every cell
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      let neighbours = 0;

      //look at every nieghbour around it
      for(let i = -1;  i <= 1; i++){
        for(let j = -1; j <= 1; j++){
          //don't fall off the edege
          if(x+j >= 0 && x+j < GRID_SIZE && y+i >= 0 && y+i < GRID_SIZE){
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //don't count youself as a neighbour
      neighbours -= gird[y][x];

      //apply the rules 
      if(grid[y][x] === 1 ){ ///alive
        if(neighbours === 2 || neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else{
            nextTurn[y][x] = 0;
          }
        }

      if(gird[y][x] === 0){
        if(neighbours === 3 ){

        }
      }
      }
    }
  }


function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      if(grid[y][x] === 1){
        fill(0);
      }
      else if(grid[y][x] === 0){
        fill(255);
      }

      square(x * cellSize,y * cellSize, cellSize);
    }
  }
}


function generateRandomGrid(cols,rows){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      //make it a 1 half the time, a 0 haft the time
      if(random(100) < 50){
        newGrid[y].push(1);
      }

      else{
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
  console.log(newGrid);
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
  console.log(newGrid);
}
