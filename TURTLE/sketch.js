function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // body of the turtle 
  fill(85, 107, 47); 
  stroke(0);
  arc(160, 230, 200, 200, PI, 0, CHORD); 
  
  // feet 
  fill(85, 140, 47);
  arc(100, 230, 30, 80, 0, PI, CHORD);   // front left foot
  arc(215, 230, 30, 80, 0, PI, CHORD);   // front right foot

  // head
  fill(85, 140, 47);
  stroke(0);
  ellipse(300, 220, 80, 80);
  
  // eyes
  fill(0);
  ellipse(300, 215, 10);
  ellipse(320, 215, 10);
  
  // smile
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(310, 230, 10, 10, 0, PI); // smiling arc
  
  // bow
  fill(255, 105, 180); // pink
  stroke(0);
  ellipse(310, 185, 15, 20);  // left loop
  ellipse(330, 185, 15, 20);  // right loop
  ellipse(320, 185, 10, 10);  // center knot
}