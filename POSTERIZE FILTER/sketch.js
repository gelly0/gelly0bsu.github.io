let img;
function preload() {
  img = loadImage("tulips.jpg");
}

function setup() {
  createCanvas(500, 300);
  img.resize(width, height); // Resize image to fit canvas
  background(0);
}

function draw() {
  background(0);
  image(img, 0, 0); // Draw the resized image

  // Map mouseX to posterization levels
  let v = map(mouseX, 0, width, 2, 20);
  filter(POSTERIZE, int(v)); // Use int() to ensure whole number levels
}