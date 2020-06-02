let cam_x, cam_y, cam_z;
let cam_cx, cam_cy, cam_cz;

let cam_dx, cam_dy, cam_dz;
let tilt;
let pan;

let ranx,rany;

let cam_bx, cam_by, cam_bz;
let cam_qx, cam_qy, cam_qz;

const WORLD_SIZE = 1000;
let cvs = [];
let pcvs = [];
let fcvs = [];

let songcode=0;
let timeflag=0;
let wall;
let sd;
let w, h, ph, fh;
/*
class Building {
  constructor(x, y, w, d, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.d = d;
    this.h = h;
  }
  
  render() {
    push();
    translate(this.x, this.y, this.h / 2);
  stroke(0);
  strokeWeight(3);
  fill(255);
  box(this.w, this.d, this.h);
  pop();
  }
}
*/

function preload() {
  
  stone = loadImage("stone-1.png");
  B = loadSound("B.wav");
  A = loadSound("A.wav");
  D = loadSound("D.wav");
  Ah = loadSound("Ah.wav");
  GS = loadSound("Gs.wav");
  MS = loadSound("Ms.wav");
  
}

class Caves {
  constructor(x, y, w, d, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.d = d;
    this.h = h;
  }
  render() {
    this.h+=0.007;
    push();  
    translate(this.x, this.y, 1000-(this.h/2));
    stroke(0);
    strokeWeight(3);
    fill(255);
    box(this.w, this.d, this.h);
    pop();
    
    push();  
    translate(this.x, this.y, this.h/2);
    stroke(0);
    strokeWeight(3);
    fill(255);
    box(this.w, this.d, this.h);
    pop();
  }
}

class pCaves {
  constructor(x, y, w, d, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.d = d;
    this.h = h;
  }
  render() {
    this.h+=0.001;
    push();  
    translate(this.x, this.y, 1000-(this.h/2));
    if(sd==0) sd=1000-(this.h/2);
    stroke(0);
    strokeWeight(3);
    fill(255);
    box(this.w, this.d, this.h);
    pop();
    
    push();  
    translate(this.x, this.y, this.h/2);
    stroke(0);
    strokeWeight(3);
    fill(255);
    box(this.w, this.d, this.h);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // init camera
  cam_x = -750;
  cam_y = 0;
  cam_z = 50;
  cam_dx = 0;
  cam_dy = -1;
  cam_dz = 0;
  
  pan = PI;
  tilt = 0;
  updateCamCenter();
  
  for(let i=0; i<70; i++){
    h=random(50,120);
    ph=random(5,30);
    fh=random(200,550);
    w=random(5,25);
    
    ranx=random(-1450,-550);
    rany=random(-450,450);
    
    let b = new Caves(ranx, rany, w, w, h);
    cvs.push(b);
    
    let p = new pCaves(ranx, rany, w, w, ph);
    pcvs.push(p);
    
    let f = new Caves(ranx, rany, w, w, fh);
    fcvs.push(f);
  }

}

function draw() {
  background(255);

  // light set-up
  
  directionalLight(255, 255, 255, 1, -1, 0); // side light
  directionalLight(255, 255, 255, 0, 1, 0); // side light
  directionalLight(255, 255, 255, 0, 0, -1); // top light
  directionalLight(255, 255, 255, 0, -1, -1);

  // camera set-up
  /*
  cam_bx=constrain(cam_x,-900,900);
  cam_by=constrain(cam_y,0,100);
  cam_bz=constrain(cam_z,-50,50);
  
  cam_qx=constrain(cam_cx,-950,950);
  cam_qy=constrain(cam_cy,0,100);
  cam_qz=constrain(cam_cz,-100,100);
  */
  
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, 0, -1);
  
  perspective(radians(60), width / height, 1, 20000);
  // draw city scene
  drawCity();
  if(timeflag==1){
   drawPastCave();
  lights();
  spotLight(0, 200, 50, 0, -500, 1000, 0, -1500, 0, PI/3, 50);
  }
  else if(timeflag==2){
   drawFutureCave();
  }
  else drawCave();
  // handle user input
  if (keyIsPressed) handleUserInput();
}

function handleUserInput() {
  
  let s = 10; // moving speed
  switch (keyCode) {
    
    case UP_ARROW: // move forward
      B.play();
      songcode=1;
      break;
    case DOWN_ARROW: // move backward
      D.play();
      if(songcode==1){
        songcode=2;
      }
      break;
    case LEFT_ARROW: // pan to the left
      A.play();
      if(songcode==2){
        songcode=3;
      }
      else songcode=0;
      break;
    case RIGHT_ARROW: // pan to the right
      Ah.play();
      if(songcode==2){
        songcode=4;
      }
      else songcode=0;
      break;
  }

  if(songcode==3){
    MS.play();
    timeflag=1;
  }
  else if(songcode==4){
    GS.play();
    timeflag=2;
  }
  
  
  switch (key) {
    
    case 'w': // move forward
      cam_x += s * cam_dx;
      cam_y += s * cam_dy;
      break;
    case 's': // move backward
      cam_x -= s * cam_dx;
      cam_y -= s * cam_dy;
      break;
    case 'a':
      //pan -= 0.05;
      pan = PI;
      break;
    case 'd':
      //pan += 0.05;
      pan = 0;
      break;
    
    case 'q':
      tilt += 0.02;
      if (tilt > HALF_PI) tilt = HALF_PI;
      break;
    case 'e':
      tilt -= 0.02;
      if (tilt < -HALF_PI) tilt = -HALF_PI;
      break;
      
  }

  updateCamCenter();
}

function updateCamCenter() {
  
  cam_dx = cos(pan) * cos(tilt);
  cam_dy = sin(pan) * cos(tilt);
  cam_dz = sin(tilt);
  
  cam_cx = cam_x + cam_dx;
  cam_cy = cam_y + cam_dy;
  cam_cz = cam_z + cam_dz;
}

function drawCity() {
  // draw ground
  noStroke();
  fill(150);
  //plane(2 * WORLD_SIZE, 2 * WORLD_SIZE);
  
  // draw buildings
  push();
  translate(-1000, 0, 500);
  stroke(0);
  strokeWeight(3);
  fill(255);
  box(1000, 1000, 1000);
  pop();
  
  push();
  translate(150, 0, 50);
  stroke(0);
  strokeWeight(3);
  fill(255);
  box(1300, 100, 100);
  pop();
  
  push();
  translate(900, 0, 100);
  stroke(0);
  strokeWeight(3);
  fill(255);
  //texture(wall);
  box(200, 200, 200);
  pop();
  
  push();
  translate(970, 0, 60);
  stroke(0);
  strokeWeight(3);
  texture(stone);
  box(30, 80, 120);
  pop();
}

function drawCave() {
  for (let b of cvs) {
    b.render();
  }
}

function drawPastCave() {
  for (let p of pcvs) {
    p.render();
  }
}

function drawFutureCave() {
  for (let f of fcvs) {
    f.render();
  }
}