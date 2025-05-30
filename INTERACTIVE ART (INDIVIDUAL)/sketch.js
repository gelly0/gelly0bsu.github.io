let petals = [];
let resetButton;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();

  // Create and style the reset button
  resetButton = createButton("Reset Flower");
  resetButton.position(width - 120, height - 50);
  resetButton.style("padding", "8px 14px");
  resetButton.style("background-color", "#ff99cc");
  resetButton.style("color", "white");
  resetButton.style("border", "none");
  resetButton.style("border-radius", "8px");
  resetButton.style("font-size", "14px");
  resetButton.style("font-family", "sans-serif");
  resetButton.style("cursor", "pointer");

  resetButton.mouseOver(() => {
    resetButton.style("background-color", "#ff66aa");
  });
  resetButton.mouseOut(() => {
    resetButton.style("background-color", "#ff99cc");
  });

  resetButton.mousePressed(resetFlower);
}

function draw() {
  background(230, 255, 230);

  // Instructional text
  fill(50);
  textSize(14);
  textAlign(CENTER);
  text("Click the flower center to add a petal", width / 2, 40);

  translate(width / 2, height / 2 - 20); // Moved flower slightly lower

  drawStemAndLeaf();

  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];
    let angle = 360 / petals.length * i;

    if (p.scale < 1) {
      p.scale += 0.05;
    }

    push();
    rotate(angle);
    scale(p.scale);

    // Glow effect with dynamic color
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(p.r, p.g, p.b);
    fill(p.r, p.g, p.b);
    ellipse(0, -40, 30, 80); // Longer petals
    drawingContext.shadowBlur = 0;
    pop();
  }

  // Flower center
  fill(255, 204, 0);
  ellipse(0, 0, 50, 50);
}

function drawStemAndLeaf() {
  stroke(0, 150, 0);
  strokeWeight(8);
  line(0, 0, 0, 300); // Long stem
  noStroke();

  fill(0, 200, 100);
  push();
  translate(0, 160);
  rotate(-30);
  ellipse(25, 0, 35, 15);
  pop();
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width / 2, height / 2 - 20); // Adjusted for new flower center
  if (d < 25) {
    let r = random(200, 255);
    let g = random(100, 220);
    let b = random(150, 255);
    petals.push({ scale: 0, r, g, b });
  }
}

function resetFlower() {
  petals = [];
}