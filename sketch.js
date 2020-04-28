let uy, uz, fy, fz, ay, az, by, bz;

function preload() {
  mySound1 = loadSound('ninja.mp3');
  mySound2 = loadSound('MMD.mp3');
}
let rate=1;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  amplitude = new p5.Amplitude();
  frameRate(rate);
  

}

let upper_yrot = 0;
let upper_zrot = 0;
let forearm_yrot = 0;
let forearm_zrot = 0;
let rightarm_yrot = 0;
let rightarm_zrot = 0;
let leftarm_yrot = 0;
let leftarm_zrot = 0;

function draw() {
  background(255,0,0);
      if (keyIsPressed === true) {
  background(random(0,255),random(0,255),random(0,255));
  }
  lights();


/*  upper_yrot = radians(slider_uy.value());
  upper_zrot = radians(slider_uz.value());
  forearm_yrot = radians(slider_fy.value());
  forearm_zrot = radians(slider_fz.value());
  rightarm_yrot = radians(slider_ay.value());
  rightarm_zrot = radians(slider_az.value());
  leftarm_yrot = radians(slider_by.value());
  leftarm_zrot = radians(slider_bz.value()); */
  // rotate entire scene to make it visible

  upper_yrot = 0;
  upper_zrot = random(-180,180);
  forearm_yrot = random();
  forearm_zrot = random(-180,180);
  rightarm_yrot = random(-90,0);
  rightarm_zrot = random(-180,180);
  leftarm_yrot = random(-90,90);
  
  
 rotateX(radians(70));
// draw a grid on xy plane
  noStroke();
  fill(180);
  push();
  fill(100);
  plane(1000); // plane is drawn on xy plane
  pop();
  
  push();
// upper arm
  fill(255, 100, 25); // magenta

  transformAndRnderRobotBody(upper_yrot, upper_zrot);
// forearm
  push();
  fill(250, 225, 225); // cyan
  translate(0, 0, 50);

  transformAndRnderRobotBody(forearm_yrot, forearm_zrot);
  
  push();
  translate(0,0,70);
  sphere(20);
  
  pop();
  
  push();
  fill(255, 255, 0); // cyan
  translate(20, 0, 20);  
  transformAndRnderRobotArm(rightarm_yrot, rightarm_zrot);
  pop();
  push();
  fill(255, 200, 0); // cyan
  translate(-20, 0, 20);  
  transformAndRnderRobotArm(leftarm_yrot, leftarm_zrot);
  pop();
  pop();
  pop();
 

  
}

function transformAndRnderRobotBody(yrot, zrot) {
  strokeWeight(1);
  stroke(255, 0, 0);
  rotateY(yrot);
  stroke(0, 255, 0);
  rotateZ(zrot);
  stroke(0, 0, 255);
  noStroke();
  translate(0, 0, 50);
  box(30, 30, 100);
// The above axis visualization is to show about which axis
// each rotation rotates
}

function transformAndRnderRobotArm(yrot, zrot) {
  strokeWeight(1);
  stroke(255, 0, 0);
  rotateY(yrot);
  stroke(0, 255, 0);
  rotateZ(zrot);
  stroke(0, 0, 255);
  noStroke();
  translate(0, 0, 50);
  box(20, 20, 100);
// The above axis visualization is to show about which axis
// each rotation rotates
}

function mousePressed() {
  if (mySound2.isPlaying()) {
   
    if(rate==1){
   rate=10;
   frameRate(rate);
    }
    
  else if (rate==10){
   rate=3; 
   frameRate(rate); 
    }
    
  else if (rate==3){
   rate=10; 
   frameRate(rate); 
    }
  } 
    else if (rate==1) {
   mySound2.play();
    
  }
  
}

