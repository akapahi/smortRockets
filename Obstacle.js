class obstacle {

  constructor(x1, y1, x2, y2) {
   
    if(x1 > x2){
      var t = x1;
      x1 = x2;
      x2 = t;
    }
    
    if(y1 > y2){
      var t = y1;
      y1 = y2;
      y2 = t;
    }
    
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  show() {
    rectMode(CORNERS);
    fill(250);
    rect(this.x1, this.y1, this.x2, this.y2);
  }

  collide(x, y) {
    if (x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2)
      return true;
    else return false;
  }


}