//values for creature
let x1, y1, xSpd, ySpd, f, circleSize;
let dirX = 1;
let dirY = 1;
let d2x = 1;
let d2y = 1;
let xa = [];
let ya = [];
let num = 30;
let color1;
let creatureSize = [];
let a = 30;


//values for bubbles
let sbu = [];
let xbu = [];
let ybu = [];
let sxbu = [];
let sybu = [];

//values for fish
let sf = [];
let xf = [];
let yf = [];
let sxf = [];
let syf = [];
let tail =[[[10, 20, 20],[-10,-20, -20]]];
let ty1, ty2, ty3, tx1, tx2, tx3;
//define a color array//
let colorFish = []; 
let r, g, b, tp;

function setup() {
  let canvas = createCanvas(400, 400);
  //canvas.id("p5-canvas");
  canvas.parent("p5-canvas");
  x1 = random(width/2);
  y1 = random(height/2);
  xSpd = 0;
  ySpd = 0;
  f = frameCount * 0.03;
  for (let i = 0; i < num; i++) {
    xa[i] = 0;
    ya[i] = 0;
  }

  //store a new color to the color array//

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  colorFish.push([r, g, b]);

  
}

function draw() {
  background(150, 190, 220);
  
  if (keyIsPressed) {
    flag = true;
    // if key is pressed, increase the acceleration.
    if (keyCode == UP_ARROW) {
      dirY = -1;
    }
    if (keyCode == DOWN_ARROW) {
      dirY = 1;
    }
    if (keyCode == LEFT_ARROW) {
      dirX = -1;
    }
    if (keyCode == RIGHT_ARROW) {
      dirX = 1;
    }

    ySpd += 0.1 * dirY;
    xSpd += 0.1 * dirX;
  } else {
    if (abs(xSpd) >= 0.5) {
      xSpd -= 0.5 * dirX;
    }
    if (abs(ySpd) >= 0.5) {
      ySpd -= 0.5 * dirY;
    }
  }

  x1 += xSpd;
  y1 += ySpd;

  if (x1 <= 0 || x1 >= width) {
    xSpd *= -1;
  }
  if (y1 <= 0 || y1 >= height) {
    ySpd *= -1;
  }
  // console.log(xSpd,ySpd,dirX,dirY);

  //the creature
  for (let i = num - 1; i > 0; i--) {
    xa[i] = xa[i - 1];
    ya[i] = ya[i - 1];
  }

  xa[0] = x1; // Set the first element
  ya[0] = y1; // Set the first element

  for (let i = 0; i < num; i++) {
    color1 = map(sin(frameCount * 0.1), -1, 1, 100, i * 4);
    fill(color1, 100, 150, 180);
    //stroke(250, 100);
    noStroke();
    circleSize = map(sin(frameCount * 0.08), -1, 1, 20, 35);
    //circleSize=30
    creatureSize[0] = circleSize;
    creatureSize[i + 1] = creatureSize[i] - 0.5;
    circle(xa[i], ya[i], creatureSize[i]);
  }

  //background line
  for (let x = a / 2; x < width; x = x + a) {
    for (let y = a / 2; y < height; y = y + a) {
      push();
      translate(x, y);
      let d = dist(xa[0], ya[0], x, y);
      let rectSize = map(d, 0, width * 1.5, 0.3 * a, 2 * a);
      angle = map(d, 0, width * 1.5, 0, 2 * PI);
      let thickness = map(d, 0, width * 1.5, 5, 20);
      rotate(angle);
      //let color= map(d,0,width,0,100);
      //stroke(color,100,100,80);
      //noStroke();
      stroke(0, 76, 153, 50);
      strokeWeight(thickness);
      line(0, 0, 0, rectSize);
      //rect(0,0,rectSize)
      //line(0,0,rectSize,0)
      pop();
    }
  }

  //bubble
  for (let i = 0; i < xbu.length; i++) {
    drawBubble(xbu[i], ybu[i], sbu[i]);

    xbu[i] = xbu[i] + sxbu[i];
    ybu[i] = ybu[i] + sybu[i];
  }

  deleteFish();

  //fish
  for (let i = 0; i < xf.length; i++) {
    let dir;
    if (sxf[i] > 0) {
      dir = 1;
      //triangle(-10,0,-20,10,-20,-10)
   
      
      //triangle(10,0,20,10,20,-10)
    } else {
      dir = 0;
    
    }
    drawFish(xf[i], yf[i], sf[i], i, dir);

    xf[i] = xf[i] + sxf[i];
    yf[i] = yf[i] + syf[i];
    if (xf[i] > width || xf[i] < 0) {
      sxf[i] = -sxf[i];
    }
    if (yf[i] > height || yf[i] < 0) {
      syf[i] = -syf[i];
    }
    
    
      tx1 = tail[i] * 10;
      ty1 = 0;
      tx2 = tail[i] * 20;
      ty2 = 10;
      tx3 = tail[i] * 20;
      ty3 = -10;
  }

  if (keyCode == 71) {
    let lightSize1 = 1.5 * circleSize;
    let lightSize2 = 2 * circleSize;
    let lightSize3 = 2.5 * circleSize;
    noStroke();
    fill(255, 230, 64, 130);
    circle(xa[0], ya[0], lightSize1);
    fill(255, 230, 64, 100);
    circle(xa[0], ya[0], lightSize2);
    fill(255, 230, 64, 50);
    circle(xa[0], ya[0], lightSize3);
  }
  // if(xa[0]==xf[0] || ya[0]==yf[0] ){
  // drawFish.hide();
  // }
}

function keyPressed() {
  //control the speed
  if (keyCode == 81) {
    xSpd *= 0.1;
    ySpd *= 0.1;
  }
  //bubble
  if (keyCode == 66) {
    xbu.push(xa[0]);
    ybu.push(ya[0]);
    sxbu.push(0);
    sybu.push(random(-1, -5));
    sbu.push(random(10, 30));
  }
  if (keyCode == 70) {
    xf.push(mouseX);
    yf.push(mouseY);
    sxf.push(random(-2, 2));
    syf.push(random(-2, 2));
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    colorFish.push([r, g, b]);
    tail.push([[10, 20, 20],[-10,-20, -20]]);
    console.log(colorFish);
  }
}

function drawBubble(u, v, s) {
  strokeWeight(5);
  stroke(255, 150);
  fill(255, 50);
  circle(u, v, s);
}

function drawFish(u, v, s, i, dir) {
  push();
  translate(u, v);
  tp = 200;
  let redV = colorFish[i][0];
  let greenV = colorFish[i][1];
  let blueV = colorFish[i][2];
  fill(redV, greenV, blueV, tp);

  noStroke();
  ellipse(0, 0, 25, 15);

  triangle(tail[i][dir][0], ty1, tail[i][dir][1], ty2, tail[i][dir][2], ty3);
  pop();

}

//check fish delete
function deleteFish() {
  for (let i = 0; i < xf.length; i++) {
    let distFish = dist(xa[0], ya[0], xf[i], yf[i]);
    if (distFish <= 20) {
      xf.splice(i, 1);
      yf.splice(i, 1);
      sf.splice(i, 1);
      colorFish.splice(i, 1);
    }
  }
}
