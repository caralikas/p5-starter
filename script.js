//preview: python -m http.server

let allBalls = [];
let allObstacles = [];

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  for (let i = 0; i < 50; i++){
    allBalls.push(new Ball(random(width),random(height),40));
  }
  
}

function draw() {
  background(30);
  for (let i=0; i < allBalls.length; i++){
  allBalls[i].update();   // Calculate physics
  allBalls[i].checkKeys(); // Check for keyboard input
  allBalls[i].checkEdges();
  allBalls[i].display();    // Draw the ball
  }


 for(let i = 0; i < allBalls.length; i++){

    for(let j = 0; j < allBalls.length; j++){

      if(i != j && allBalls[i].pos.dist(allBalls[j].pos) < allBalls[i].rad){
        
	//what happens??

      }
    }

}
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1,1), random(-1,1));
    this.acc = createVector(random(-1,1), random(-1,1));
    this.r = r;
    this.topSpeed = 60;
    this.friction = 0.99; 
    this.red = random(255);
    this.yellow = random(255);
    this.green = random(255);



  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    let forceMagnitude = 12;
    
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(UP_ARROW))    this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(DOWN_ARROW))  this.applyForce(createVector(0, forceMagnitude));
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    fill(this.red, this.yellow, this.green);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);

  }

  checkEdges() {

    let w = windowWidth-100;
    let h = windowHeight-100;

    if (this.pos.x < 0){
      this.pos.x = w;
    }

    if (this.pos.x > w){
      this.pos.x = 0;
    }

    if (this.pos.y < 0){
      this.pos.y = h;
    }

    if (this.pos.y > h){
      this.pos.y = 0;
    }

    
  }
  // || (this.pos.x == (windowWidth-100)) ||(this.pos.y == 0) || (this.pos.y == (windowHeight-100))
}

class Obstacle {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }


display(){
  fill(200);
  noStroke();
  rect(this.x, this.y, this.w, this.h);
  if (frameCount % 100 == 0){
    drawObstacle();
  }
}

drawObstacle(){
  for (let i=0; i < allObstacles.length;i++){
    allObstacles[i].display();
  }
}



}
