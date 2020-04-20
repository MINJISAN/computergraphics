let back;
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
  back=0;
}

function draw() {
  background(0);
  colorMode(RGB, 1);
  ambientLight(0.2);
  specularColor(1, 1, 1);
  directionalLight(1, 1, 1, 0, 0, -1);

  let r = map(mouseX, 0, width, -radians(180), radians(180)); 
  rotateY(rtY);

  noStroke();
  beginShape();
  texture(mona);
  plane(457, 600, 100, 100);
  endShape();

  let h = map(mouseY, 0, height, 0, 100);
  colorMode(HSB, 360, 100, 100, 100);

  fill(h);
  stroke(0, 0, 100);
  translate(0,-300,0);
  box(457, len, 200);
  if(a==1&&len>0){
      len=len-2;
  }
  if(len==0){
    rtY=frameCount*0.01;
    back=random(0,100);
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
