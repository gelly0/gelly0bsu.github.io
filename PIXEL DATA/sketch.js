let img;
function preload() {
  img = loadImage('tulips.jpg');
}

function setup() {
  createCanvas(500, 300);
  img.resize(width, height);    // Resize to fit canvas
  img.loadPixels();             // Load pixel data
  noStroke();
  textFont('monospace');
}

function draw() {
  background(0);

  // Display the image
  image(img, 0, 0);

  // Sample color from mouse position
  let c = get(mouseX, mouseY);

  // Create a glowing circle effect
  for (let r = 100; r > 0; r -= 10) {
    fill(red(c), green(c), blue(c), map(r, 100, 0, 10, 200));
    ellipse(mouseX, mouseY, r, r);
  }

  // Optional: display RGB info text
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text(`R:${red(c)} G:${green(c)} B:${blue(c)}`, 10, height - 10);
}