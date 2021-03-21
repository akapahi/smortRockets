// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g
var obstacles = [];
var population;
// Each rocket is alive till 400 frames
var lifespan = 400;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;
var x, y, pressed;

// Dimensions of barrier
var rx = 100;
var ry = 350;
var rw = 200;
var rh = 10;

function setup() {
  canvas = createCanvas(windowWidth/2, windowHeight);
	canvas.position(windowWidth/2,0);
  //createCanvas(windowWidth-20, windowHeight-25);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);
}

function mousePressed() {
  if(mouseButton === LEFT){
    pressed = true;
    x = mouseX;
    y = mouseY;
  } else{
     for (var i = 0; i < obstacles.length; i++) {
      if(obstacles[i].collide(mouseX, mouseY)){
            obstacles.splice(i,1);
      }
    }
  }
}

function mouseReleased() {
  if(pressed){
    pressed = false;
    obstacles.push(new obstacle(x, y, mouseX, mouseY));
  }
}

function draw() {
  background(251, 198, 208);
  population.run(obstacles);
  // Displays count to window
  //lifeP.html(count);

  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

  if (pressed) {
    rectMode(CORNERS);
    fill(210, 100, 100);
    rect(x, y, mouseX, mouseY);
  }

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill(255);
  //rect(rx, ry, rw, rh);
  // Renders target
  ellipse(target.x, target.y, 16, 16);
}
