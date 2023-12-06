

let oc;
function setup() {
  createCanvas(300, 300);
}

function preload() {
  mySound = loadSound("octopus.mp3");
}

function draw() {
let canvas=createCanvas(300, 300);
canvas.parent("octopus");

  if (mouseIsPressed) {
        if (mySound.isPlaying()) {
          mySound.pause();
        } else {
          mySound.play(); 
        }
      }
    
  
  colorMode(HSB,100);
  oc=map(sin(frameCount*0.015),-1,1,45,75);
  
push();
    translate(width/2, height/2);
    scale(1.1);
    noStroke();
    fill(oc,100,40);
    circle(0, -10, 150);
    ellipse(0, 0, 120, 150);
    arc(-40, 50, 50, 80, 0, PI, CHORD);
    arc(40, 50, 50, 80, 0, PI, CHORD);
    arc(-15, 50, 50, 80, 0, PI, CHORD);
    arc(15, 50, 50, 80, 0, PI, CHORD);
    pop();
    //colorful main body
    push();
    translate(width/2, height/2);
    scale(1);
    noStroke();
    fill(oc,100,100);
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

    fill(oc,100,50);
    ellipse(-15, -5, 30, 40);
    ellipse(15, -5, 30, 40);
    pop();
}
