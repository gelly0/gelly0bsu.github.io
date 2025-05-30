let font;
let points = [];

function preload() {
  font = loadFont('Cedarville Cursive Regular.ttf');
}

function setup() {
  createCanvas(1000, 1000);
  textFont(font);

  let fontSize = 250; // Slightly bigger text
  let textStr = 'Angel';

  // Get text bounds at (0, 0)
  let bounds = font.textBounds(textStr, 0, 0, fontSize);

  // Calculate position to center text based on bounding box
  let x = (width - bounds.w) / 2 - bounds.x;
  let y = (height - bounds.h) / 2 - bounds.y;

  points = font.textToPoints(textStr, x, y, fontSize, {
    sampleFactor: 0.15
  });

  noStroke();
  fill(255, 255, 0); // Light purple
}

function draw() {
  background(48, 25, 52);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // Sine wave animation
    let wave = sin(frameCount * 0.05 + p.x * 0.05) * 5;
    ellipse(p.x, p.y + wave, 3, 3);
  }
}