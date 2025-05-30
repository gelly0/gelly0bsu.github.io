function setup() {
  createCanvas(400, 400);
  background(20, 20, 50); // dark space background
  noStroke();
}

function draw() {
  background(20, 20, 50);
  
  // Alien body
  fill(0, 255, 0);
  ellipse(200, 250, 200, 150);

  // Alien head
  ellipse(200, 150, 120, 120);
  
  // Eyes
  fill(255);
  ellipse(180, 140, 40, 30);
  ellipse(220, 140, 40, 30);
  
  // Pupils
  fill(0);
  ellipse(180, 140, 10, 15);
  ellipse(220, 140, 10, 15);
  
  // Antennas
  stroke(0, 255, 0);
  strokeWeight(4);
  line(170, 100, 150, 60);
  line(230, 100, 250, 60);
  
  // Antenna balls
  noStroke();
  fill(255, 0, 0);
  ellipse(150, 60, 10, 10);
  ellipse(250, 60, 10, 10);
  
  // Mouth
  fill(0);
  ellipse(200, 170, 30, 15);

}