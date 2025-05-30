let img;
let particles = [];
let particleSize = 6;
let maxSpeed = 20;
let returnSpeed = 0.8;
let repelForce = 20;
let hoverRadius = 60;
let hoverEdgeSharpness = 0.5;
let showHoverRadius = false;
let soundEffect;
let isPlaying = false;

// List of scrolling names
let names = ["Danielle Gatan", "Taher Abdalla", "Angel Gala", "Romila Faheem", "Gabriel Bucay"];
let namePositions = [];

function preload() {
    img = loadImage('bathspa.jpeg'); // Load the source image
    soundEffect = loadSound('springroll.mp3'); // Load sound file
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    textSize(26);
    textFont("Arial");

    // Calculate even spacing for names
    let spacing = width / names.length; // Divide width evenly among names

    for (let i = 0; i < names.length; i++) {
        namePositions.push({
            x: spacing * i + spacing / 2, // Ensure spacing remains constant
            y: height - 40, // Keep them near the bottom
            speed: 2, // Constant speed for uniform movement
            alpha: 255 // Full opacity
        });
    }

    let scaleX = width / img.width;
    let scaleY = height / img.height;
    let imgScale = max(scaleX, scaleY);
    let imgOffsetX = (width - img.width * imgScale) / 2;
    let imgOffsetY = (height - img.height * imgScale) / 2;

    img.loadPixels();

    for (let y = 0; y < img.height; y += particleSize) {
        for (let x = 0; x < img.width; x += particleSize) {
            let index = (x + y * img.width) * 4;
            let r = img.pixels[index];
            let g = img.pixels[index + 1];
            let b = img.pixels[index + 2];
            let a = img.pixels[index + 3];

            if (a > 0) {
                particles.push({
                    x: x * imgScale + imgOffsetX,
                    y: y * imgScale + imgOffsetY,
                    originalX: x * imgScale + imgOffsetX,
                    originalY: y * imgScale + imgOffsetY,
                    color: [r, g, b, a],
                    size: particleSize * 0.8 * imgScale,
                    speed: random(1, maxSpeed),
                    vx: 0,
                    vy: 0
                });
            }
        }
    }
}

function draw() {
    background(0);

    if (showHoverRadius) {
        fill(255, 50);
        noStroke();
        circle(mouseX, mouseY, hoverRadius * 2);
    }

    particles.forEach(p => {
        let d = dist(mouseX, mouseY, p.x, p.y);

        if (d < hoverRadius) {
            let normalizedDist = pow(d / hoverRadius, hoverEdgeSharpness);
            let force = map(normalizedDist, 0, 1, repelForce, 0);

            let baseAngle = atan2(p.y - mouseY, p.x - mouseX);
            let swirlAngle = baseAngle + HALF_PI;
            let swirlStrength = force * 0.2;

            p.vx += cos(swirlAngle) * swirlStrength;
            p.vy += sin(swirlAngle) * swirlStrength;
        } else {
            p.vx += (p.originalX - p.x) * returnSpeed * 0.1;
            p.vy += (p.originalY - p.y) * returnSpeed * 0.1;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.85;
        p.vy *= 0.85;

        fill(p.color);
        circle(p.x, p.y, p.size);
    });

    // Update & Draw Scrolling Names with even spacing & color change
    for (let i = 0; i < names.length; i++) {
        let pos = namePositions[i];

        // Move left
        pos.x -= pos.speed;

        // Reset position while keeping spacing constant
        if (pos.x < -100) {
            pos.x = width + 100; // Moves back to the right edge while keeping spacing intact
        }

        // Cycle colors dynamically
        let r = sin(frameCount * 0.05 + i) * 127 + 128;
        let g = cos(frameCount * 0.03 + i) * 127 + 128;
        let b = sin(frameCount * 0.07 + i) * 127 + 128;

        fill(r, g, b, pos.alpha);
        text(names[i], pos.x, pos.y);
    }
}

// 🔊 Toggle music on mouse click
function mousePressed() {
    if (soundEffect.isLoaded()) {
        if (!isPlaying) {
            soundEffect.play();
            isPlaying = true;
        } else {
            soundEffect.stop();
            isPlaying = false;
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        particles.forEach(p => {
            let angle = atan2(p.y - height / 2, p.x - width / 2);
            p.vx += cos(angle) * 20;
            p.vy += sin(angle) * 20;
        });
    }
    if (key === 'h') showHoverRadius = !showHoverRadius;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    let scaleX = width / img.width;
    let scaleY = height / img.height;
    let imgScale = max(scaleX, scaleY);
    let imgOffsetX = (width - img.width * imgScale) / 2;
    let imgOffsetY = (height - img.height * imgScale) / 2;

    particles.forEach((p, i) => {
        let y = floor(i / (img.width / particleSize));
        let x = (i % (img.width / particleSize)) * particleSize;
        p.originalX = x * imgScale + imgOffsetX;
        p.originalY = y * imgScale + imgOffsetY;
        p.vx = (p.originalX - p.x) * 0.1;
        p.vy = (p.originalY - p.y) * 0.1;
    });
}