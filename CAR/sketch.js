function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  strokeWeight(1);
  fill (128, 0, 128);
  rect (70, 200, 250, 100);
  
  strokeWeight(1);
  fill (169, 169, 169);
  ellipseMode(CORNER);
  ellipse (110, 270, 50, 50);
  ellipse (230, 270, 50, 50);
  
  strokeWeight(1);
  fill (0, 0, 0);
  rect (70, 120, 200, 90);
  
  // Headlights 
  fill(255, 255, 0); // Yellow color
  ellipse(300, 230, 20, 20); 
  
  // Window
  fill(173, 216, 230); // Light blue color
  rect(80, 145, 80, 45); // Front window
  rect(180, 145, 80, 45); // Back window
}