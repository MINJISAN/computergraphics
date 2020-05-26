let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 20;
let rot=0;
let turnflag=0;
let keyflag=0;
let endflag=0;
let esflag=0;
let planelen=500;
let flag=0;

let cX, cY, cZ; // 방향키에 따른 x, z 증가 변수
let pX, pY, pZ; // 캐릭터 위치
let rX, rY, rZ;
let sX, sY, sZ;
let zY;

let pastH, preH;
let b1_front, b2_front, b3_front, b4_front;
let b1_side, b2_side, etc;
let book_front, book_side;
let box_front, box_side;
let cha_front, cha_side;
let cha_front_2, cha_side_2;
let dir=-1;

let a=0;
let b=0;

function preload() {
  
  pastH = loadImage("house_past_2.png");
  preH = loadImage("house_pre.png");
  b1_front = loadImage("b1_front_2.png");
  b2_front = loadImage("b2_front_2.png");
  b3_front = loadImage("b3_front_2.png");
  b4_front = loadImage("b4_front_2.png");
  
  b1_side = loadImage("b1_side.png");
  b2_side = loadImage("b2_side.png");
  etc = loadImage("etc.png");
  book_front = loadImage("bookshelf_front_2.png");
  book_side = loadImage("bookshelf_side.png");
  
  box_front = loadImage("box_front.png");
  box_side = loadImage("box_side.png");
  
  cha_front = loadImage("cha_front.png");
  cha_side = loadImage("cha_side.png");
  cha_front_2 = loadImage("cha_front_2.png");
  cha_side_2 = loadImage("cha_side_2.png");
  
  ending = loadImage("clear.png");
  
  BGM = loadSound('tokka.m4a');
  endingBGM = loadSound('Ending.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB,1);
  angleMode(DEGREES);
 BGM.loop();
 perspective(5, width/height,((height/2.0) / tan(30))/10.0, ((height/2.0) / tan(30))*10.0);
  
   for (var i = 0; i < 6; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 8000,7000);
    } 
    else if (i === 1) {
      sliderGroup[i] = createSlider(-2000, 2000, 150);
    }else {
      sliderGroup[i] = createSlider(-2000, 2000, 0);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, h);
     h+=20;
    //sliderGroup[i].style('width', '80px');
     
  }

  Z = 5850;
  cX = 0;
  cY = 0; 
  cZ = 0;
  pX = 300;
  pY = 113; 
  pZ = 300;
}

function draw() {
  if(turnflag==0) background(0.5,0.5,0.7);
  else if(turnflag==1) background(0.7,0.5,0.5);
  //lights();
  X = sliderGroup[0].value();
  Y = sliderGroup[1].value();
  centerX = sliderGroup[3].value();
  centerY = sliderGroup[4].value();
  centerZ = sliderGroup[5].value();
  rX = pX+cX;
  rY = pY+cY;
  rZ = pZ+cZ;
  zX = constrain(rX, 20, 313);

  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
    
  if(endflag==1){
  endingseq();
  }

  else if(endflag==0) {
  
  changingside();
  
  mapping();
  
  makeplane(planelen);
  
  
  if(rY<200){
  makePlayer(zX, rY, rZ); 
  }
  else if(rY>=200){
  cX = 0;
  cY = 0; 
  cZ = 0;
  pX = 300;
  pY = 104; 
  pZ = 300;
  makePlayer(zX, rY, rZ);   
  }
  platformrule();
  }
}

function makeplane(length) {
  noStroke();
  fill(0.2);
  translate(length/2,0,0);
  texture(pastH);
  plane(length,length);
  translate(-length/2,0,length/2);
  rotateY(90);
  fill(0.8);
  texture(preH);
  plane(length,length);
  rotateY(-90);
  translate(0,0,-length/2);
}

function changingside(){
if(keyIsPressed==true){
  if(keyCode == "32") keyflag=1;
  }
  if(keyflag==1){
  if(turnflag==0){
   if(rot>-90){   
    rotateY(rot); 
      rot-=3;
   }
    if(rot==-90){
    turnflag=1;
    keyflag=0;
    rot=0;
    }
  }
    if(turnflag==1){
      if(rot<90){
        rotateY(rot);
        rot+=3;
      }
      if(rot==90){
        turnflag=0;
        keyflag=0;
        rot=0;
      }
  }
  }
  
  if(turnflag==1){
  rotateY(-90);
  }
  if(turnflag==0){
  rotateY(0);
  }
}

function mapping(){
  
  //1층
  push();
  drawFaceBox(255, 134, 350,50,7,350, b1_front, b1_side, etc);
  pop();
  push();
  fill(1,0,1);
  translate(280,137,175);
  box(49,5,349);
  pop();
  
  push();
  drawFaceBox(0, 134, 325,200,7,50, b2_front, b2_side, etc);
  pop();
  push();
  fill(1,0,1);
  translate(100,137,300);
  box(199,5,49);
  pop();
  
  //2층
  push();
  drawFaceBox(0, 6, 350,125,7,350, b3_front, b1_side, etc);
  pop();
  push();
  fill(1,0,1);
  translate(62.5,9,175);
  box(124,5,349);
  pop();
  
  push();
  drawFaceBox(190,6,350,160,7,350, b4_front, b1_side, etc);
  pop();
  push();
  fill(1,0,1);
  translate(270,9,175);
  box(149,5,349);
  pop();
  
  //책장
  push();
  drawFaceBox(75,63,275,50,70,50, book_front, book_front, book_side);
  pop();
  push();
  fill(1,0,1);
  translate(100,98,250);
  box(49,69,49)
  pop();
  
  //상자
  push();
  drawFaceBox_2(265,-25,60,60,30,30,box_front, box_side, book_side)
  pop();
  push();
  translate(295,-10,45);
  box(59,29,29);
  pop();
}

function makePlayer(x, y, z) {
  
  if(turnflag == 0){
      if(keyIsDown(RIGHT_ARROW)) { 
        if(sX<313) cX += 1;
      }
      else if (keyIsDown(LEFT_ARROW)) {
        if(25<sX) cX -= 1;
      }
      else if (keyIsDown(UP_ARROW)) {
      if(-15<y&&20<sX&&sX<60) cY -= 1;
    }
      else if (keyIsDown(DOWN_ARROW)) {
      if(-15<y&&20<sX&&sX<60) cY += 1;
    }
    }
    
    else if (turnflag == 1) {
      if(keyIsDown(RIGHT_ARROW)){ 
        if(25<sZ) {
           if(105<rY){
            if(278<sZ||209>=sZ) cZ -= 1;
          }
          else if(105>=rY){
            if(70<sZ) cZ -= 1;
          }
          else cZ -= 1;
        }
        }
      else if (keyIsDown(LEFT_ARROW)) {
        if(sZ<313){ 
          if(105<rY){
            if(278<=sZ||209>sZ) cZ += 1;
          }
          else cZ+=1;
           
        }
      }
    } 
 
  push();
  fill(0,0,0);
  if(turnflag==0){
    if(flag==0){
  translate(x,y,pZ);
  sX=x;
    }
    if(flag==1){
      if(105<rY){
        sX=(326-sZ)+cX;
        translate(sX,y,pZ);
        cZ=0;
      }
      else if(105>=rY){
        sX=(335-sZ)+cX;
        translate(sX,y,pZ); 
        cZ=0;
      }
    }
    
  }
  else if(turnflag==1){
    if(105<rY){
      sZ=(333-sX)+cZ;
      translate(pX,y,sZ);
      flag=1;
      cX=0;
    }
    else if(105>=rY){
      sZ=(335-sX)+cZ;
      translate(pX,y,sZ);
      cX=0;
    }
  }
  box(21,43,21);
  
  if(keyIsDown(LEFT_ARROW)) {dir=0;}
  else if(keyIsDown(RIGHT_ARROW)) {dir=1;}
  
  if(dir==-1){
  drawFaceBox_3(-10, -20, 11, 22,44,22, cha_front, cha_side, book_side);
  }
  
  else if(dir==0 || keyIsDown(LEFT_ARROW)){
     drawFaceBox_3(-10, -20, 11, 22,44,22, cha_front, cha_side, book_side);
  }
  else if(dir==1 || keyIsDown(RIGHT_ARROW)){
  drawFaceBox_3(-10, -20, 11, 22,44,22, cha_front_2, cha_side_2, book_side);
  }
  pop();
  
/*  push();
  drawFaceBox_3(sX-10, y-20, sZ+11 ,22,44,22, cha_front, cha_side, book_side);
  pop(); */
  }

function platformrule(){
  if(110<rY){
  if(210<sX&&sX<245){
     cY+=9;
  }
  }
  else if(120>=rY){
  if(130<sX&&180>sX){
     cY+=9;
  }
  else if(sX>260){
  endflag=1;
  }
  }
}


function drawFaceBox(a1, a2, a3, boxWidth, boxHeight, boxDepth, frontTexture, sideTexture, etc) {
  let wid = boxWidth;
  let hei = boxHeight;
  let dim = boxDepth;
  let a= a1;
  let b= a2;
  let c=a3;
  push();
  translate(a,b,c);
  //front
  push();
  texture(frontTexture);
  quad(0,0, wid,0,wid,hei, 0, hei);
  pop();
  //left
  push();
  texture(sideTexture);
  rotateY(90);
  quad(0, 0,0, dim, 0,0,dim, hei,0, 0, hei,0);
  pop();
  //right
  push();
  texture(sideTexture);
  translate(wid, 0, 0);
  rotateY(90);
  quad(0, 0,0, dim, 0,0, dim, hei,0, 0, hei,0);
  pop();
  //bottom
  push();
  texture(etc);
  translate(0, hei, 0);
  rotateX(-90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  //back
  push();
  texture(etc);
  rotateY(180);
  translate(-wid, 0, dim);
  quad(0, 0,0, wid, 0,0, wid, hei,0, 0,hei,0);
  //top
  push();
  texture(etc);
  translate(0, 0,-dim);
  rotateX(90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  pop();
}

function drawFaceBox_2(a1, a2, a3, boxWidth, boxHeight, boxDepth, frontTexture, sideTexture, etc) {
  let wid = boxWidth;
  let hei = boxHeight;
  let dim = boxDepth;
  let a= a1;
  let b= a2;
  let c=a3;
  push();
  translate(a,b,c);
  //front
  push();
  texture(frontTexture);
  quad(0,0, wid,0,wid,hei, 0, hei);
  pop();
  //left
  push();
  texture(etc);
  rotateY(90);
  quad(0, 0,0, dim, 0,0,dim, hei,0, 0, hei,0);
  pop();
  //right
  push();
  texture(sideTexture);
  translate(wid, 0, 0);
  rotateY(90);
  quad(0, 0,0, dim, 0,0, dim, hei,0, 0, hei,0);
  pop();
  //bottom
  push();
  texture(etc);
  translate(0, hei, 0);
  rotateX(-90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  //back
  push();
  texture(etc);
  rotateY(180);
  translate(-wid, 0, dim);
  quad(0, 0,0, wid, 0,0, wid, hei,0, 0,hei,0);
  //top
  push();
  texture(etc);
  translate(0, 0,-dim);
  rotateX(90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  pop();
}

function drawFaceBox_3(a1, a2, a3, boxWidth, boxHeight, boxDepth, frontTexture, sideTexture, etc) {
  let wid = boxWidth;
  let hei = boxHeight;
  let dim = boxDepth;
  let a= a1;
  let b= a2;
  let c=a3;
  push();
  translate(a,b,c);
  //front
  push();
  texture(frontTexture);
  quad(0,0, wid,0,wid,hei, 0, hei);
  pop();
  //left
  push();
  texture(etc);
  rotateY(90);
  quad(0, 0,0, dim, 0,0,dim, hei,0, 0, hei,0);
  pop();
  //right
  push();
  texture(sideTexture);
  translate(wid, 0, 0);
  rotateY(90);
  quad(0, 0,0, dim, 0,0, dim, hei,0, 0, hei,0);
  pop();
  //bottom
  push();
  texture(etc);
  translate(0, hei, 0);
  rotateX(-90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  //back
  push();
  texture(etc);
  rotateY(180);
  translate(-wid, 0, dim);
  quad(0, 0,0, wid, 0,0, wid, hei,0, 0,hei,0);
  //top
  push();
  texture(etc);
  translate(0, 0,-dim);
  rotateX(90);
  quad(0, 0, wid, 0, wid, dim, 0, dim);
  pop();
  pop();
}

function endingseq(){
  background(0,0,0);
  translate(0,0,0);
  plane(400,400);
  texture(ending);
  BGM.stop();  
  if(esflag==0){
  endingBGM.loop();
  esflag=1;
  }
  if(Z>3850) Z=Z-2;
  }