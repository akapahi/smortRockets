// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  // Checkes rocket has reached target
  this.completed = false;
  // Checks if rocket had crashed
  this.crashed = false;
  this.time = 0;
  // Gives a rocket dna
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  // Object can recieve force and add to acceleration
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  // Calulates fitness of rocket
  this.calcFitness = function() {
    // Takes distance to target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    // Maps range of fitness
    this.fitness = map(d, 0, width, width, 0);
    // If rocket gets to target increase fitness of rocket
    if (this.completed) {
      this.fitness *= 10;
      this.fitness *= 1/this.time * 800
    }
    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= 10;
    }
    

  }
  // Updates state of rocket
  this.update = function(obstacles) {
    // Checks distance from rocket to target
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // If distance less than 10 pixels, then it has reached target
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }
    // Rocket hit the barrier
    for(var i =0; i<obstacles.length; i++){
      this.crashed = obstacles[i].collide(this.pos.x, this.pos.y);
      if(this.crashed) break;
    }
    
    // Rocket has hit left or right of window
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    // Rocket has hit top or bottom of window
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }


    //applies the random vectors defined in dna to consecutive frames of rocket
    this.applyForce(this.dna.genes[count]);
    // if rocket has not got to goal and not crashed then update physics engine
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
      this.time++;
    }
  }
  // displays rocket to window
  this.show = function() {
    // push and pop allow's rotating and translation not to affect other objects
    push();
    //color customization of rockets
    noStroke();
    fill(255, 150);
    //translate to the postion of rocket
    translate(this.pos.x, this.pos.y);
    //rotatates to the angle the rocket is pointing
    rotate(this.vel.heading()-30);
    //creates a triangle shape for rocket
    fill(254, 121, 61);
    triangle(0, 0, 0, 20, 10, 30);
    triangle(0, 0, 0, 20, -10, 30);
    pop();
  }

}
