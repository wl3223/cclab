let grid = [];
let n = 20;
let countNumS = [];
let countNumO = [];
let squid;
let countS = 0;
let countO = 0;
let ifCount = false;
let time = 5000; //frameRate20x15second\
let result;
let backcolor, backbase;
let SquidColor = [];
let OctopusColor = [];

function preload() {
  mySound = loadSound("splatoon.mp3");
}

function setup() {
  let canvas=createCanvas(600, 600);
  canvas.parent("game")
  frameRate(50);

  //background grid
  for (let i = 0; i < width; i += n) {
    grid[i] = [];
    for (let j = 0; j < height; j += n) {
      grid[i][j] = new Grid(i, j, 0);
    }
  }

  //color
  SquidColor = [color(255, 204, 0), color(243, 89, 135), color(250, 143, 61)];
  OctopusColor = [color(74, 58, 219), color(89, 243, 187), color(193, 65, 225)];

  let si = floor(random(0, 3));
  let oi = floor(random(0, 3));

  squid = new Squid(si);
  octopus = new Octopus(oi);
}

function draw() {
  if (mySound.isPlaying() == false) {
    mySound.play();
  }

  push();
  colorMode(HSB, 100);
  backcolor = map(sin(frameCount * 0.05), -1, 1, 0, 100);

  if (mouseIsPressed) {
    time = 500;
  }
  background(backcolor, 20, 80);
  pop();
  time -= 1;
  console.log(time);
  // if (time == 0) {
  //   ifCount = true;
  //   console.log(ifCount);
  // }
  //background Grid
  // if (ifCount) {

  if (time > 0) {
    countNumS = [];
    countNumO = [];
    for (let i = 0; i < width; i += n) {
      for (let j = 0; j < height; j += n) {
        let colorV = grid[i][j].c;
        if (colorV == squid.c) {
          countNumS.push(1);
          countS = countNumS.length;
          //console.log(count);
        }
      }
    }

    for (let i = 0; i < width; i += n) {
      for (let j = 0; j < height; j += n) {
        let colorV = grid[i][j].c;
        if (colorV == octopus.c) {
          countNumO.push(1);
          countO = countNumO.length;
          //console.log(count);
        }
      }
    }
  }

  // ifCount = false;
  // time = 0;
  // }

  for (let i = 0; i < width; i += n) {
    for (let j = 0; j < height; j += n) {
      grid[i][j].update();
      grid[i][j].display();
    }
  }
  //squid
  squid.update();
  squid.display();

  octopus.update();
  octopus.display();

  fill(255);
  textSize(40);
  text("Squid", 80, 50);
  text(countS, 10, 50);
  text("Octopus", 80, 120);
  text(countO, 10, 120);

  if (countS >= countO) {
    result = "Squid Wins!";
  } else {
    result = "Octopus Wins!";
  }
  if (time <= 0) {
    time = 0;
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    colorMode(HSB, 100);
    fill(backcolor, 20, 100);
    rect(width / 2, height / 2, 500, 150);
    fill(backcolor, 20, 50);
    textSize(60);
    text(result, width / 2, height / 2);
    pop();
  }
}

class Grid {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.s = map(sin(frameCount * 0.05), -1, 1, 18, 19);
    this.s = n - 2;
    this.c = c;
    this.obj = 0;
  }
  update() {
    //this.s =map(sin(frameCount * 0.05), -1, 1, 16, 19)
  }
  display() {
    let dsquid = dist(squid.x, squid.y, this.x, this.y);
    if (dsquid < 20) {
      this.c = squid.c;
    }
    let doctopus = dist(octopus.x, octopus.y, this.x, this.y);
    if (doctopus < 20) {
      this.c = octopus.c;
    }
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.s);
  }
}

class Squid {
  constructor(si) {
    this.x = (width * 3) / 4; // Initial x position
    this.y = (height * 3) / 4; // Initial y position
    this.speed = 10; // Speed of movement
    this.c = SquidColor[si];
  }

  display() {
    //black outline
    push();
    translate(this.x, this.y);
    scale(0.45);
    noStroke();
    // Head of the squid
    fill(0);
    beginShape();
    vertex(0, -105);
    curveVertex(-60, -70);
    curveVertex(-90, -30);
    curveVertex(90, -30);
    curveVertex(60, -70);
    curveVertex(0, -105);
    endShape(CLOSE);
    // Body of the squid
    ellipse(0, 0, 120, 150);
    arc(-40, 50, 50, 80, 0, PI, CHORD);
    arc(40, 50, 50, 80, 0, PI, CHORD);
    arc(-15, 50, 50, 80, 0, PI, CHORD);
    arc(15, 50, 50, 80, 0, PI, CHORD);
    pop();

    //colorful main body
    push();
    translate(this.x, this.y);
    scale(0.4);
    noStroke();

    // Head of the squid
    fill(this.c);
    beginShape();
    vertex(0, -105);
    curveVertex(-60, -70);
    curveVertex(-90, -30);
    curveVertex(90, -30);
    curveVertex(60, -70);
    curveVertex(0, -105);
    endShape(CLOSE);

    // Body of the squid
    fill(this.c);
    ellipse(0, 0, 120, 150);

    arc(-40, 50, 50, 80, 0, PI, CHORD);
    arc(40, 50, 50, 80, 0, PI, CHORD);
    arc(-15, 50, 50, 80, 0, PI, CHORD);
    arc(15, 50, 50, 80, 0, PI, CHORD);

    // Eyes
    fill(255);
    ellipse(-15, 0, 45, 60);
    ellipse(15, 0, 45, 60);

    fill(0, 180);
    ellipse(-15, -5, 30, 40);
    ellipse(15, -5, 30, 40);

    pop();
  }

  update() {
    if (keyIsDown(74)) {
      //J
      this.x -= this.speed;
    }
    if (keyIsDown(76)) {
      //L
      this.x += this.speed;
    }
    if (keyIsDown(73)) {
      //I
      this.y -= this.speed;
    }
    if (keyIsDown(75)) {
      //K
      this.y += this.speed;
    }
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}

class Octopus {
  constructor(oi) {
    this.x = width / 4;
    this.y = height / 4;
    this.speed = 10; // Speed of movement
    this.c = OctopusColor[oi];
  }

  display() {
    //background outline
    push();
    translate(this.x, this.y);
    scale(0.5);
    noStroke();
    fill(0);
    circle(0, -10, 150);
    ellipse(0, 0, 120, 150);
    arc(-40, 50, 50, 80, 0, PI, CHORD);
    arc(40, 50, 50, 80, 0, PI, CHORD);
    arc(-15, 50, 50, 80, 0, PI, CHORD);
    arc(15, 50, 50, 80, 0, PI, CHORD);
    pop();
    //colorful main body
    push();
    translate(this.x, this.y);
    scale(0.45);
    noStroke();
    fill(this.c);
    circle(0, -10, 150);
    ellipse(0, 0, 120, 150); // Main body

    arc(-40, 50, 50, 80, 0, PI, CHORD);
    arc(40, 50, 50, 80, 0, PI, CHORD);
    arc(-15, 50, 50, 80, 0, PI, CHORD);
    arc(15, 50, 50, 80, 0, PI, CHORD);

    // Eyes
    fill(255);
    ellipse(-15, 0, 45, 60);
    ellipse(15, 0, 45, 60);

    fill(0, 180);
    ellipse(-15, -5, 30, 40);
    ellipse(15, -5, 30, 40);
    pop();
  }

  update() {
    //pressing wasd
    if (keyIsDown(65)) {
      //a
      this.x -= this.speed;
    }
    if (keyIsDown(68)) {
      //d
      this.x += this.speed;
    }
    if (keyIsDown(87)) {
      //w
      this.y -= this.speed;
    }
    if (keyIsDown(83)) {
      //s
      this.y += this.speed;
    }
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}

