let colors = [
  { name: "Blue", count: 27.0, color: "#3b82f6" },
  { name: "Green", count: 18.0, color: "#22c55e" },
  { name: "Purple", count: 13.0, color: "#a855f7" },
  { name: "Red", count: 13.0, color: "#ef4444" },
  { name: "Black", count: 7.3, color: "#111111" },
  { name: "Orange", count: 7.4, color: "#f97316" },
  { name: "Yellow", count: 5.5, color: "#fde047" },
  { name: "Brown", count: 1.5, color: "#a0522d" },
  { name: "Other", count: 3.3, color: "#94a3b8" }
];

let total = 100.0;
let animatedHeights = [];

function setup() {
  createCanvas(900, 430); // slightly taller to fit extra space
  textAlign(CENTER, CENTER);
  textSize(14);
  for (let i = 0; i < colors.length; i++) {
    animatedHeights.push(0);
  }
}

function draw() {
  background(20);

  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Favorite Colors (Survey)", width / 2, 50);

  let verticalShift = 40;

  let containerX = 40;
  let containerY = 60 + verticalShift;
  let rowSpacing = 28;
  let containerWidth = 260;
  let containerHeight = colors.length * rowSpacing + 50; // added 20px extra bottom space

  fill(40, 40, 40, 220);
  noStroke();
  rect(containerX - 10, containerY - 10, containerWidth, containerHeight, 12);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(13);
  text("Favorite Colors Breakdown:", containerX, containerY);

  for (let i = 0; i < colors.length; i++) {
    let c = colors[i];
    let extraSpace = (i === colors.length - 1) ? 8 : 0;  // extra space after last
    let yOffset = containerY + 35 + i * rowSpacing + extraSpace;
    fill(c.color);
    circle(containerX + 8, yOffset + 6, 10);
    fill(255);
    text(`${c.name}: ${c.count.toFixed(1)}%`, containerX + 30, yOffset);
  }

  let chartX = containerX + containerWidth + 40;
  let chartY = containerY;
  let chartHeight = colors.length * rowSpacing;
  let chartWidth = width - chartX - 40;
  let barWidth = chartWidth / colors.length;
  let baseY = chartY + chartHeight;

  textAlign(CENTER, CENTER);
  let allDone = true;

  for (let i = 0; i < colors.length; i++) {
    let c = colors[i];
    let percentage = c.count / total;
    let targetHeight = percentage * chartHeight;

    if (animatedHeights[i] < targetHeight) {
      animatedHeights[i] += 0.5;
      allDone = false;
      if (animatedHeights[i] > targetHeight) {
        animatedHeights[i] = targetHeight;
      }
    }

    let barHeight = animatedHeights[i];
    let x = chartX + i * barWidth;
    let y = baseY - barHeight;

    let grad = drawingContext.createLinearGradient(x, y, x, baseY);
    let cTop = lerpColor(color(c.color), color(255, 255, 255), 0.3);
    grad.addColorStop(0, cTop.toString());
    grad.addColorStop(1, c.color);

    drawingContext.fillStyle = grad;
    noStroke();
    drawingContext.shadowColor = c.color;
    drawingContext.shadowBlur = 15;
    rect(x, y, barWidth * 0.6, barHeight, 10);
    drawingContext.shadowBlur = 0;

    if (barHeight > 10) {
      fill(255);
      textSize(11);
      text(`${c.count.toFixed(1)}%`, x + barWidth * 0.3, y - 12);
    }

    fill(255);
    textSize(11);
    text(c.name, x + barWidth * 0.3, baseY + 12);
  }

  if (allDone) {
    noLoop();
  }
}