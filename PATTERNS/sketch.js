var x;
var y;
var size = 5;
var shape = 0; 
function setup() {
  createCanvas(400, 400);
  frameRate(3);
  rectMode(CENTER);
}

function draw() {
  background(173, 216, 230);
  
  for (x = 25; x < 400; x = x + 50) {
    for (y = 25; y < 400; y = y + 50) {
      size = random (10, 40);
      shape = random (0,1);
      
      if (shape < 0.5) {
        rect (x, y, size, size);
        fill(255, 165, 0);
        
      } else {
        fill (170, 51, 106);
      rect(x, y, size, size);
      }
      }
    }
  }