let sc;
function setup() {
  let canvas=createCanvas(300, 300);
  canvas.parent("squid");
}


function draw() {
  
  colorMode(HSB, 100);
  sc = map(sin(frameCount * 0.03), -1, 1, 0, 15);

  push();
  translate(width / 2, height / 2);
  scale(1.1);
  noStroke();
  // Head of the squid
  fill(sc, 100, 40);
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
  translate(width / 2, height / 2);
  scale(1);
  noStroke();

  // Head of the squid
  fill(sc, 100, 100);
  beginShape();
  vertex(0, -105);
  curveVertex(-60, -70);
  curveVertex(-90, -30);
  curveVertex(90, -30);
  curveVertex(60, -70);
  curveVertex(0, -105);
  endShape(CLOSE);

  // Body of the squid
  fill(sc, 100, 100);
  ellipse(0, 0, 120, 150);

  arc(-40, 50, 50, 80, 0, PI, CHORD);
  arc(40, 50, 50, 80, 0, PI, CHORD);
  arc(-15, 50, 50, 80, 0, PI, CHORD);
  arc(15, 50, 50, 80, 0, PI, CHORD);

  // Eyes
  fill(255);
  ellipse(-15, 0, 45, 60);
  ellipse(15, 0, 45, 60);

  fill(sc, 100, 50);
  ellipse(-15, -5, 30, 40);
  ellipse(15, -5, 30, 40);

  pop();
}

