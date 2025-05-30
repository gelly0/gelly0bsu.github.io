var img, x, y;
function preload() {
img = loadImage("tulips.jpg");

}

function setup() {
createCanvas (500, 300);
background(0);
noStroke();
}


function draw() {

x = random(width);
y = random(height);

var c = img.get(x, y); //Retrieves the color of the pixel at the mouse

fill(c[0], c[1], c[2], 50); // array of values which is the red green blue

ellipse (x, y, 30, 30);

}