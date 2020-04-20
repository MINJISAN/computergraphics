let rtY;
let a;
let len;
let mona;
let sound;
function preload() {
  mona = loadImage("MonaLisa.jpg");
  soundFormats('mp3');
  mySound = loadSound('4AM.mp3');
} 
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  len=1200;
  a=0;
  rtY=frameCount*0.01;
}

function draw() {
  background(0);
  colorMode(RGB, 1);
// set light
  ambientLight(0.2); //La
  specularColor(1, 1, 1); // Ks
  directionalLight(1, 1, 1, 0, 0, -1); // Ld and Ls
// let mouse X control rotation
  let r = map(mouseX, 0, width, -radians(180), radians(180)); 
  rotateY(rtY);
// display mona lisa
  noStroke();
  beginShape();
  texture(mona);
  plane(457, 600, 100, 100);
  endShape();
// let mouse Y control color hue
  let h = map(mouseY, 0, height, 0, 100);
  colorMode(HSB, 360, 100, 100, 100);
// material setting
  fill(h); // lambert only model, Kd
// try the following blinn-phong model and see how it changes
// specularMaterial(h,100,100, 60); // parameters set both Ka and Kd
// shininess(10); // shininess of specular region, ns
// display a glass box
  stroke(0, 0, 100);
  translate(0,-300,0);
  box(457, len, 200);
  if(a==1&&len>0){
      len=len-2;
  }
  if(len==0){
    rtY=frameCount*0.01;
  }
  if(a==2){
    rtY=frameCount*0.1;
  }
}

function mousePressed() {
  if (mySound.isPlaying()) {
      a=1;
  } else {
    mySound.play();
  }
  
  if(a==1&&len==0){
    a=2;
  }
}
