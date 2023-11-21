let ripple = [];
let rippleNum = 5;
let raindrop = [];
let rainNum = 50;

function setup() {
  createCanvas(500, 500);
  canvas.parent("canvasWrapper");
  for (let i = 0; i < rippleNum; i++) {
    ripple[i] = new Ripple(random(width), random(200, height));
  }
  for (let i = 0; i < rainNum; i++) {
    raindrop[i] = new Rain(random(width), random(-height, 0));
  }
}

function draw() {
  background(5,73,94, 30);
  for (let i = ripple.length - 1; i >= 0; i--) {
    // loop backwards to avoid skipping elements after splicing
    ripple[i].update();
    ripple[i].display();
    if (ripple[i].w > 100) {
      ripple.splice(i, 1); // remove the ripple if its width is greater than 100
      ripple.push(new Ripple(random(width), random(200, height))); // add a new ripple
    }
  }

  for (let i = raindrop.length - 1; i >= 0; i--) {
    raindrop[i].update();
    raindrop[i].display();    
  }
}

class Ripple {
  //constructor
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 10;
    this.sh = random(1, 3);
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(202,224,230)
    ellipse(0, 0, this.w, this.h);
    pop();
  }

  update() {
    this.w += this.sh * 2;
    this.h += this.sh;
  }
}

//press mouse to make a ripple appear
function mousePressed() {
  ripple.push(new Ripple(mouseX, mouseY));
}


//press R to let it rain more heavily
function keyPressed() {
  if (key === 'R' || key === 'r') {
    for (let i = 0; i < 50; i++) {
      raindrop.push(new Rain(random(width), random(-height, 0)));
    }
  }

}

class Rain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = random(5, 15); // Length of the raindrop
    this.speed = random(2, 5); // Speed of the raindrop
  }

  display() {
    stroke(255);
    line(this.x, this.y, this.x, this.y + this.length);
  }

  update() {
    this.y += this.speed;
    // If raindrop goes beyond canvas, reset to top
    if (this.y > height) {
      this.y = random(-100, 0);
      this.x = random(width);
    }
  }
}

