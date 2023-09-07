// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function Population() {
  // Array of rockets
  this.rockets = [];
  // Amount of rockets
  this.popsize = 100;
  // Amount parent rocket partners
  this.matingpool = [];

  // Associates a rocket to an array index
  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.acceptReject = function() {
    while (true) {
      var rand = random(0.5,1);
      var pick = random(this.rockets);
      if (rand < pick.fitness) return pick;
    }
  }

  this.evaluate = function() {

    var maxfit = 0;
    // Iterate through all rockets and calcultes their fitness
    for (var i = 0; i < this.popsize; i++) {
      // Calculates fitness
      this.rockets[i].calcFitness();
      // If current fitness is greater than max, then make max equal to current
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
      }
    }
    // Normalises fitnesses
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }
  }

  // Selects appropriate genes for child
  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // Picks random dna
      var parentA = this.acceptReject();
      var parentB = this.acceptReject();
      // Creates child by using crossover function
      var child = parentA.dna.crossover(parentB.dna, parentA.fitness, parentB.fitness);
      child.mutation();
      // Creates new rocket with child dna
      newRockets[i] = new Rocket(child);
    }
    // This instance of rockets are the new rockets
    this.rockets = newRockets;
  }

  // Calls for update and show functions
  this.run = function(obstacles) {
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].update(obstacles);
      // Displays rockets to screen
      this.rockets[i].show();
    }
  }
}
