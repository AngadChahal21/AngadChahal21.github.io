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

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function startScreen(){
  background(0);
  text("Maze Mania", width/2, height/2); 
}
