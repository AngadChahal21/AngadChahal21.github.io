// Connected node OOP

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let point of points){
    point.update();
    point.connectTo(points);
    
  }

  for(let point of points){
    point.display();
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);
}

class MovingPoint {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.radius = 0;
    this.color = color(random(255), random(255), random(255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
    this.minRadius = 0;
    this.maxRadius = 15;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update(){
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(pointsArray){
    for(let otherPoint of pointsArray){
      //avoid drawing line to self
      if(this !== otherPoint){
        let pointDistance = dist(otherPoint.x, otherPoint.y, this.x, this.y);
        if(pointDistance <= this.reach){
          stroke(this.color);
          line(otherPoint.x, otherPoint.y, this.x, this.y);
        }
      }
    }
  }


  adjustSizeWithMouse(){
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if(mouseDistance <=  this.reach){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else{
      this.radius = this.minRadius;
    }
  }

  move(){
    //pick random direction of movement 
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale to the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    //move point
    this.x += this.dx;
    this.y += this.dy;

    //move on time axis 
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime; 
  }

  wrapAroundScreen(){
    if(this.x < 0){
      this.x = windowWidth;
    }

    if(this. x > windowWidth){
      this.x = 0;
    }

    if(this.y < 0){
      this.y = windowHeight;
    }

    if(this.y > windowHeight){
      this.y = 0;
    }
  }
}