let song;
let fft;
let angle = 0;
let stylusStart, stylusEnd;
let recordSize;

function preload() {
  song = loadSound("music.mp3"); // Replace with your audio file
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  fft = new p5.FFT();
  updateDimensions();
}

function updateDimensions() {
  recordSize = 400;
  stylusStart = -recordSize * 0.55;
  stylusEnd = -recordSize * 0.15;
}

function draw() {
  background(15, 18, 40);

  // Simple instruction text
  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(16);
  text("Click the stylus to play/pause music", width / 2, 30);

  // Move record slightly downward
  translate(width / 2, height / 2 + 20);

  if (song.isPlaying()) {
    angle += 0.5;
  }

  rotate(angle);
  drawRecord();
  drawWaveform();
  rotate(-angle);
  drawStylus();
}

function drawRecord() {
  noStroke();
  fill(40); // Vinyl base color
  ellipse(0, 0, recordSize, recordSize);

  stroke(80, 80, 80, 100); // Grooves
  noFill();
  for (let r = recordSize * 0.375; r < recordSize * 0.5; r += recordSize * 0.0125) {
    ellipse(0, 0, r, r);
  }

  // Center label
  fill(255, 140, 0); // Orange
  noStroke();
  ellipse(0, 0, recordSize * 0.15);
  fill(250);
  ellipse(0, 0, recordSize * 0.05); // Spindle hole
}

function drawWaveform() {
  let waveform = fft.waveform();
  noFill();
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let angleWave = map(i, 0, waveform.length, 0, 360);
    let radius = map(waveform[i], -1, 1, recordSize * 0.43, recordSize * 0.5);
    let x = radius * cos(angleWave);
    let y = radius * sin(angleWave);

    let c = lerpColor(color(0, 255, 255), color(255, 0, 255), i / waveform.length);
    stroke(c);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawStylus() {
  let armPos = stylusStart;
  if (song.isPlaying() && song.duration() > 0) {
    let progress = song.currentTime() / song.duration();
    armPos = lerp(stylusStart, stylusEnd, constrain(progress, 0, 1));
  }

  stroke(200);
  strokeWeight(recordSize * 0.015);
  line(armPos, -recordSize * 0.5, -recordSize * 0.125, -recordSize * 0.125);
  fill(220);
  ellipse(armPos, -recordSize * 0.5, recordSize * 0.045);
}

function mousePressed() {
  // Get stylus arm line start and end in canvas coordinates
  let stylusX1 = width / 2 + stylusStart;
  let stylusY1 = height / 2 + 20 - recordSize * 0.5;
  let stylusX2 = width / 2 - recordSize * 0.125;
  let stylusY2 = height / 2 + 20 - recordSize * 0.125;

  // Distance from mouse to stylus arm
  let d = distToSegment(
    createVector(mouseX, mouseY),
    createVector(stylusX1, stylusY1),
    createVector(stylusX2, stylusY2)
  );

  if (d < recordSize * 0.035) {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.loop();
    }
  }
}

function distToSegment(p, v, w) {
  let l2 = p5.Vector.dist(v, w) ** 2;
  if (l2 === 0) return p5.Vector.dist(p, v);
  let t = max(0, min(1, p5.Vector.sub(p, v).dot(p5.Vector.sub(w, v)) / l2));
  let projection = p5.Vector.add(v, p5.Vector.mult(p5.Vector.sub(w, v), t));
  return p5.Vector.dist(p, projection);
}