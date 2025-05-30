let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 100, 100, 255); // Use HSB for easier rainbow control
}

function draw() {
  background(0, 50); // Slight fade

  // Add a new star at the mouse position
  particles.push(new Particle(mouseX, mouseY));

  // Loop backwards to safely remove finished ones
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
    this.size = random(20, 40);
    this.hue = random(360); // Starting hue
    this.rotationOffset = random(TWO_PI);
    this.pulseSpeed = random(0.05, 0.1);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.hue = (this.hue + 1) % 360; // Slowly rotate hue
  }

  isFinished() {
    return this.alpha < 0;
  }

  show() {
    push();
    translate(this.x, this.y);

    // Pulsing effect
    let pulse = sin(frameCount * this.pulseSpeed + this.rotationOffset) * 0.3 + 1;

    // Rainbow color with fading alpha
    let c = color(this.hue, 100, 100, this.alpha);

    // Glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = c;

    fill(c);
    rotate(frameCount * 0.01 + this.rotationOffset);
    drawStar(0, 0, (this.size * 0.4) * pulse, this.size * pulse, 5);

    pop();
  }
}

// Draw star shape
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}