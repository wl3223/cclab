
  let grid = [];
  let n = 20;
  let squid;
  let backcolor, backbase;
  let SquidColor = [];
  let countS = 0;
  let ifCount = false;
  let mySound;
  
  function preload(){
    mySound=loadSound("smove.mp3")
  }
  
  function setup() {
    let canvas=createCanvas(500, 500);
    canvas.parent("tutorial")

    frameRate(50);
  
    //background grid
    for (let i = 0; i < width; i += n) {
      grid[i] = [];
      for (let j = 0; j < height; j += n) {
        grid[i][j] = new Grid(i, j, 0);
      }
    }
  
    //color
    SquidColor = [color(255,204,0), color(243,89,135), color(250,143,61)];
    
    let si=floor(random(0,3));
    
    squid = new Squid(si);
  
  }
  
  function draw() {
    push();
    colorMode(HSB, 100);
    backcolor = map(sin(frameCount * 0.05), -1, 1, 0, 100);
  
    //background(backcolor, 20, 80);
    background(0);
    pop();
  
    //background Grid
    if (ifCount) {
      for (let i = 0; i < width; i += n) {
        for (let j = 0; j < height; j += n) {
          let colorV = grid[i][j].c;
          if (colorV == squid.c) {
            countS += 1;
            //console.log(count);
          }
        }
      }
  
      ifCount = false;
      time = 0;
    }
  
    
    for (let i = 0; i < width; i += n) {
      for (let j = 0; j < height; j += n) {
        grid[i][j].update();
        grid[i][j].display();
      }
    }
    //squid
    squid.update();
    squid.display();
    
    fill(255)
    textSize(30)
    text("Use WASD",10,30)
    text("to control the squid",10,60)
  
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
      noStroke();
      fill(this.c);
      rect(this.x, this.y, this.s);
    }
  }
  
  class Squid {
    constructor(si) {
      this.x = width/2; // Initial x position
      this.y = height/2; // Initial y position
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
      if (keyIsDown(65)) {//j
        this.x -= this.speed;
            if (mySound.isPlaying() == false) {
        mySound.play();
      }
      }
      if (keyIsDown(68)) {//L
        this.x += this.speed;
            if (mySound.isPlaying() == false) {
        mySound.play();
      }
      }
      if (keyIsDown(87)) {//i
        this.y -= this.speed;
            if (mySound.isPlaying() == false) {
        mySound.play();
      }
      }
      if (keyIsDown(83)) {//
        this.y += this.speed;
            if (mySound.isPlaying() == false) {
        mySound.play();
      }
      }
      this.x = constrain(this.x, 0, width);
      this.y = constrain(this.y, 0, height);
    }
  }
  
  

