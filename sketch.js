let slider_hue, slider_angle, slider_conc;
let i,n,na;
let high=200;
let a=0;

let statue; let spotPos1, spotPos2, spotDir1, spotDir2, spotDir3, modelPos, modelPos2, modelPos3, modelPos4;
let mrot, srot;

function preload() { 
 //statue = loadModel("venus_polygonal_statue.obj");
  statue = loadModel("jellyfish.obj");
  mySound = loadSound('On.mp3');
}

function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL);
  //slider_hue = createSlider(0, 360, 0); slider_hue.position(10, 10);
  slider_hue=0;
  high = createSlider(0, 400, 20);
  high.position(10, 30);
  n = createSlider(1, 1000, 5); 
  n.position(10, 50);

  spotPos2 = new p5.Vector(0, 200, 200);
  
  modelPos = new p5.Vector(0, 0, 0);
  modelPos1 = new p5.Vector(-50, 50, 0);
  modelPos2 = new p5.Vector(50, 50, 0);
  modelPos3 = new p5.Vector(50, -50, 0);
  modelPos4 = new p5.Vector(-50, -50, 0);
  mrot = 0; 
  srot = 0;
}

function draw() { 
  colorMode(RGB);
  background(0);
  lights();
  camera(0, 190, 80, 0, 0, 0, 0, 1, 0);
// setup lighting
  spotPos1 = new p5.Vector(0, 0, high.value());
  srot += 0.1; 
  slider_hue += 10;
  spotPos1.x = 200*cos(srot);
  spotPos1.y = 200*sin(srot);
  spotPos2.x = 200*cos(srot);
  spotPos2.y = 200*sin(srot);
  spotDir1 = p5.Vector.sub(modelPos1, spotPos1);
  spotDir2 = p5.Vector.sub(modelPos2, spotPos1);
  spotDir3 = p5.Vector.sub(modelPos3, spotPos1);
  spotDir4 = p5.Vector.sub(modelPos4, spotPos1);
  
  colorMode(HSB, 360, 100, 100); 
  na=n.value();
  for(i=0; i<na; i++){
  spotLight(slider_hue%360+i, 100, 100, spotPos1, spotDir1, 30,
  170);
  spotLight(slider_hue%360+i*40, 100, 100, spotPos1, spotDir2, 30, 170);
  spotLight(slider_hue%360+i*80, 100, 100, spotPos1, spotDir3, 30, 170);
  spotLight(slider_hue%360+i*120, 100, 100, spotPos1, spotDir4, 30,170);
  }
 
//directionalLight(slider_hue.value(), 100, 100, spotDir1);
// draw a grid on xy plane colorMode(RGB);
  noStroke();
  fill(50);
  push();
  plane(1000, 1000, 200, 200); // plane is drawn on xy plane
  pop();
// draw statue 
  push();
  translate(modelPos);
  rotateX(PI / 2);
  rotateY(mrot);
  fill(255);
  model(statue);  
  ellipsoid(30, 60, 60);
  pop();
  if(a==1)
  mrot += 0.02;
}

function mousePressed() {
    if (mySound.isPlaying()){
    a=1;
    }
  else
  mySound.play();
}