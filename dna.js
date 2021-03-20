// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

function DNA(genes) {
  // Recieves genes and create a dna object
  if (genes) {
    this.genes = genes;
  }
  // If no genes just create random dna
  else {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
      // Gives random vectors
      this.genes[i] = p5.Vector.random2D();
      // Sets maximum force of vector to be applied to a rocket
      this.genes[i].setMag(maxforce);
    }
  }

  this.acceptReject = function(fit) {
    var i = 5
    while (i > 0) {
      i--;
      var rand = random();
      var pick = random(fit);
      if (rand < pick) return pick;
    }
    return random(fit);
  }

  // Performs a crossover with another member of the species
  this.crossover = function(partner, f1, f2) {
    var newgenes = [];


    for (var i = 0; i < this.genes.length; i++) {
      if(this.acceptReject({f1, f2}) == f1) newgenes[i] = this.genes[i];
      else newgenes[i] = partner.genes[i];
    }
    // Gives DNA object an array
    return new DNA(newgenes);
  }

  // Adds random mutation to the genes to add variance.
  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      // if random number less than 0.01, new gene is then random vector
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

}