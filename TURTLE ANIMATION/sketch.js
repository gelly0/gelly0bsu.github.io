let turtleX = -200; // Start off-screen to the left

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // Move turtle to the right
  turtleX += 1;
  if (turtleX > width + 200) {
    turtleX = -200; // Reset position to loop
  }

  // body of the turtle
  fill(85, 107, 47);
  stroke(0);
  arc(turtleX + 160, 230, 200, 200, PI, 0, CHORD);

  // feet
  fill(85, 140, 47);
  arc(turtleX + 100, 230, 30, 80, 0, PI, CHORD);   // front left foot
  arc(turtleX + 215, 230, 30, 80, 0, PI, CHORD);   // front right foot

  // head
  fill(85, 140, 47);
  stroke(0);
  ellipse(turtleX + 300, 220, 80, 80);

  // eyes
  fill(0);
  ellipse(turtleX + 300, 215, 10);
  ellipse(turtleX + 320, 215, 10);

  // smile
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(turtleX + 310, 230, 10, 10, 0, PI);

  // bow
  fill(255, 105, 180); // pink
  stroke(0);
  ellipse(turtleX + 310, 185, 15, 20);  // left loop
  ellipse(turtleX + 330, 185, 15, 20);  // right loop
  ellipse(turtleX + 320, 185, 10, 10);  // center knot
}