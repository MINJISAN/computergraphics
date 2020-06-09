let teapot;
let envShader, skyboxShader;
let badak;
let img = [];
let gl; // WebGL pointer
let tex, texLoc;
let high=240;
let flag=0;
let high_flag=0;
let holy_flag=0;
let esflag=0;
let amb_l = 255;


let cam_x, cam_y, cam_z;
let cam_cx, cam_cy, cam_cz;

let cam_dx, cam_dy, cam_dz;
let tilt;
let pan;

let pp = [];

let ranx,rany;

let cam_bx, cam_by, cam_bz;
let cam_qx, cam_qy, cam_qz;

let mic;

function preload() {
  //teapot = loadModel('teapot.obj');
  envShader = loadShader('envmap.vert', 'envmap.frag');
  skyboxShader = loadShader('skybox.vert', 'skybox.frag');
  
  // load six cubemap textures
  
  /*
  img[0] = loadImage("right.jpg");
  img[1] = loadImage("left.jpg");
  img[2] = loadImage("top.jpg");
  img[3] = loadImage("bottom.jpg");
  img[4] = loadImage("front.jpg");
  img[5] = loadImage("back.jpg");
  */

  img[0] = loadImage("GHY/2-1.jpg");
  img[1] = loadImage("GHY/2-2.jpg");
  img[2] = loadImage("assets/bttm.jpg");
  img[3] = loadImage("assets/bttm.jpg");
  img[4] = loadImage("GHY/2-3.jpg");
  img[5] = loadImage("GHY/2-4.jpg");
  
  
  /*
  img[0] = loadImage("eye/rght.png");
  img[1] = loadImage("eye/lft.png");
  img[2] = loadImage("assets/bttm.jpg");
  img[3] = loadImage("assets/bttm.jpg");
  img[4] = loadImage("eye/frnt.png");
  img[5] = loadImage("eye/bck.png");
  */
  
  white = loadImage("white.jpg");
  badak = loadImage("GHY/2.jpg");
  
  head = loadImage("GHY/head.jpg");
  con = loadImage("GHY/cone2.jpg");
  wall1 = loadImage("GHY/wall4.jpg");
  wall2 = loadImage("GHY/wall5.jpg");
  wall3 = loadImage("GHY/wall6.jpg");
  wall4 = loadImage("GHY/wall7.jpg");
  cunjang=loadImage("GHY/cunjang2.jpg");
  
  main = loadSound('main2.mp3');
  comfy = loadSound('comfy2.mp3');
}

class people {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    push();
    translate(this.x, 500, this.y);
    fill(210);
    ellipsoid(10, 40, 10);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
    
  mic = new p5.AudioIn();
  mic.start();
  main.loop();
  
  noStroke();
  textureMode(NORMAL);
  setupCubeMap();
  cam_x = 0;
  cam_y = 1500;
  cam_z = 100;
  cam_dx = 0;
  cam_dy = -1;
  cam_dz = 0;
  
  
  pan = -PI/2;
  tilt =0.2;
  updateCamCenter();
  
  for(let i=0; i<20; i++){
    
  let x1=random(-1500,-500);
  let y1=random(-1500,-500);
  let x2=random(500,1500);
  let y2=random(500,1500);
    
    let p1 = new people(x1, y1);
    let p2 =  new people(x1, y2);
    let p3 =  new people(x2, y1);
    let p4 =  new people(x2, y2);
    pp.push(p1);
    pp.push(p2);
    pp.push(p3);
    pp.push(p4);
    
  }
  
}

function draw() {
  clear();
  //orbitControl();

let high_b = map(high,-100,240,255,0);
  //let amb_l = map(high,-100,220,0,10000);
  
  colorMode(HSB,255);
  
  pointLight(100,255,high_b,5000,1000,2000);
  pointLight(200,255,high_b,-5000,1000,2000);
  pointLight(50,255,high_b,0,5000,2000);
  pointLight(250,255,high_b,0,-5000,2000);
  /*
  spotLight(120,255,high_b,5000,1000,2000,0,0,0);
  spotLight(120,255,high_b,-5000,1000,2000,0,0,0);
  spotLight(120,255,high_b,0,5000,2000,0,0,0);*/
  
  ambientLight(amb_l);
  
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, 0, -1);
  perspective(radians(50), width / height, 1, 20000);
  if (keyIsPressed) handleUserInput();
  rotateX(-PI/2);
  
  let vol = mic.getLevel();
  let chansong = map(vol, 0, 1, 0, 100);
  
  renderPeople();
  renderTeapot(); // teapot with environment mapping
  renderSkyBox(); // draw skybox
  renderBadak();
  renderPeople();
  
  if(vol>0.3){
  if(flag==0){
      flag=1;
  } 
    /*
  else {
    flag=0;
  }*/
  }
  if(flag ==1) {
    amb_l -= high/100 ;
    }
  
  if(holy_flag==1){
  main.stop();
    if(esflag==0){
      comfy.loop();
      esflag=1;
    }
  }
  
}

function renderBadak() {
  push();
  rotateX(PI / 2);
  translate(0,0,-500);
  texture(badak);
  plane(5200,5200);
  pop();
  
  push();
  translate(0,-1500,-2500);
  texture(wall1);
  plane(5000,4000);
  pop();
  
  push();
  translate(0,-1500,2500);
  texture(wall2);
  plane(5000,4000);
  pop();
  
  push();
  rotateY(PI / 2);
  translate(0,-1500,-2500);
  texture(wall3);
  plane(5000,4000);
  pop();
  
  push();
  rotateY(PI / 2);
  translate(0,-1500,2500);
  texture(wall4);
  plane(5000,4000);
  pop();
  
  /*
  push();
  translate(0,0,0);
  texture(white);
  cylinder(5000,5000);
  pop();
  */
  
    // outer cylinde (wall)
  push(); 
  translate(0,-1000,0);
  texture(head);
  cylinder(3000,5000); 
  pop();
  
  // dome (actually its' cone)
  push();
  translate(0,-3000,0);
  rotateZ(PI);
  fill(200);
  texture(con);
  cone(3000,1500,24,1,false); 
  pop();
  
  push();
  rotateX(PI / 2);
  translate(0,0,3000);
  texture(cunjang);
  plane(10000,10000);
  pop();

  /*
  push();
  fill(0);
  translate(x,500,y);
  ellipsoid(10, 40, 10);
  pop();
  */
}
  
function renderTeapot() {
  shader(envShader);
  // Using WebGL functions directly to set uniform variable for cubemap texture because p5.js doesn't support cubemap yet
  texLoc = gl.getUniformLocation(envShader._glProgram, "cubeMap");
  gl.uniform1i(texLoc, 0);
  
  if(flag==1){
    if (high_flag==0&&high>=-100) {
    holy_flag=1;
    high-=0.06;
    if(high==-100){
      high_flag=1;
      flag=0;
    }
  }
  else if(high_flag==1&&high<=235) {
    holy_flag=1;
    high+=0.06;
    if(high==240){
      high_flag=0;
      flag=0;
    }
   }
  }
  
  push()
  //rotateY(frameCount * 0.01);
  //rotateX(PI / 2);
  scale(10);
  translate(0,high,0);
  cylinder(60,300);
  pop();
  resetShader();
}

function setupCubeMap() {
  // Using WebGL functions directly because p5.js doesn't support cubemap yet
  gl = this._renderer.GL;
  tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, tex);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[0].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[1].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[2].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[3].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[4].canvas);
  gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA,
  gl.UNSIGNED_BYTE, img[5].canvas);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

// draw skybox as last object to draw only necessary parts
function renderSkyBox() {
  shader(skyboxShader);
  
  // set uniform variable for cubemap texture
  texLoc = gl.getUniformLocation(skyboxShader._glProgram, "cubeMap");
  gl.uniform1i(texLoc, 0);
  
  // set z-depth test condition from 'less' to 'less than or equal' to make skybox always pass z-depth test because depth buffer is usually inialized with +1.

  //gl.depthFunc(gl.LEQUAL);

  push();
  rotateY(frameCount * 0.01);
  // right
  beginShape();
  vertex(1, -1, -1, 0, 0);
  vertex(1, 1, -1, 0, 1);
  vertex(1, 1, 1, 1, 1);
  vertex(1, -1, 1, 1, 0);
  endShape();
  
  //left
  beginShape();
  vertex(-1, -1, 1, 0, 0);
  vertex(-1, 1, 1, 0, 1);
  vertex(-1, 1, -1, 1, 1);
  vertex(-1, -1, -1, 1, 0);
  endShape();
  
  // top
  beginShape();
  vertex(-1, -1, 1, 0, 0);
  vertex(-1, -1, -1, 0, 1);
  vertex(1, -1, -1, 1, 1);
  vertex(1, -1, 1, 1, 0);
  endShape();
  
  //bottom

  beginShape();
  vertex(-1, 1, -1, 0, 0);
  vertex(-1, 1, 1, 0, 1);
  vertex(1, 1, 1, 1, 1);
  vertex(1, 1, -1, 1, 0);
  endShape();



  //front
  beginShape();
  vertex(-1, -1, -1, 0, 0);
  vertex(-1, 1, -1, 0, 1);
  vertex(1, 1, -1, 1, 1);
  vertex(1, -1, -1, 1, 0);
  endShape();

  // back
  beginShape();
  vertex(1, -1, 1, 0, 0);
  vertex(1, 1, 1, 0, 1);
  vertex(-1, 1, 1, 1, 1);
  vertex(-1, -1, 1, 1, 0);
  endShape();
  pop();
  

  // return z-depth test back to default mode
  //gl.depthFunc(gl.LESS);
  resetShader();
}

function holytrigger() {
  if(flag==0){
      flag=1;
  } 
  else {
    flag=0;
  }
}

function handleUserInput() {
  
  let s = 3; // moving speed
  
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
      pan -= 0.005;
      //pan = PI;
      break;
    case 'd':
      pan += 0.005;
      //pan = 0;
      break;
    
    case 'q':
      tilt += 0.005;
      if (tilt > HALF_PI) tilt = HALF_PI;
      break;
    case 'e':
      tilt -= 0.005;
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

function renderPeople() {
  for (let p1 of pp) {
    p1.render();
}
    for (let p2 of pp) {
    p2.render();
}
    for (let p3 of pp) {
    p3.render();
}
    for (let p4 of pp) {
    p4.render();
}
}