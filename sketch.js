let building_sl, speed, godo;
let CITY_SIZE = 800;
let BUILDING_MAX_SIZE = 40;
let gridSz = CITY_SIZE / BUILDING_MAX_SIZE;
let map = [];


let slider_hue, slider_angle, slider_conc;
let i,n,na;
let what;
let high=200;
let a=0;
let buho=1;

let statue; let spotPos1, spotPos2, spotDir1, spotDir2, spotDir3, modelPos, modelPos2, modelPos3, modelPos4;
let mrot, srot;

let angle=0;

let myFont;

function preload() {
  myFont = loadFont('ARIALBI.TTF');
}

function resetMap() {
  for (let i = 0; i < gridSz; i++)
  for (let j = 0; j < gridSz; j++) {
  map[i][j] = false;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB,1);
  
    textFont(myFont);
  textSize(30);
  fill(0);
  text('delevopment', 0, 20);
  
// init map
  for (let i = 0; i < gridSz; i++) {
    map[i] = [];
  for (let j = 0; j < gridSz; j++) {
    map[i][j] = false;
    }
  }
  resetMap();
  building_sl = createSlider(1, 200, 200);
  building_sl.position(10, 30);

  speed = createSlider(0, 200, 20);
  speed.position(10, 50);
  godo = createSlider(20, 380, 90);
  godo.position(10, 70);
  what = createSlider(-500, 80, 0);
  what.position(10, 130);

  high = createSlider(50, 1000, 700);
  high.position(10, 90);
  n = createSlider(50, 1000, 300); 
  n.position(10, 110);

  spotPos2 = new p5.Vector(0, 2000, 2000);
  
  modelPos = new p5.Vector(0, 0, 0);
  modelPos1 = new p5.Vector(-5000, 5000, 0);
  modelPos2 = new p5.Vector(5000, 5000, 0);
  modelPos3 = new p5.Vector(5000, -5000, 0);
  modelPos4 = new p5.Vector(-5000, -5000, 0);
  mrot = 0; 
  srot = 0;
  
}

function draw() {
  background(0.2,0.2,0.9);
  randomSeed(1);
  lights();
  camera(high.value()*cos(angle/50), what.value(), n.value()*sin(angle/50), 0, 0, 0, 0, 10, 0);
  angle=angle+(buho)*speed.value()/100;
  /*
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
  spotLight((slider_hue+i)%360, 100, 100, spotPos1, spotDir1, 30,
  170);
  spotLight((slider_hue+i*40)%360, 100, 100, spotPos1, spotDir2, 30, 170);
  spotLight((slider_hue+i*80)%360, 100, 100, spotPos1, spotDir3, 30, 170);
  spotLight((slider_hue+i*120)%360, 100, 100, spotPos1, spotDir4, 30,170);
  }
  */
  translate(0,godo.value(),0);
  directionalLight(1, 1, 0, 0, 1, 0.3);
  rotateX(PI*49/100);
  //rotateX(radians(rotateX_sl.value()));
  //rotateZ(radians(rotateZ_sl.value()));
  fill(0.2);
  plane(1000, 1000); // draw ground
  fill(0.5);
  noStroke();
  let nBuildings = building_sl.value();
  translate(-CITY_SIZE / 2, -CITY_SIZE / 2);

  for (let i = 0; i < nBuildings/4; i++) {
    let foundEmptySpot = false;
    let x1 = 0;
    let y1 = 0;
// loop until it finds an empty spot
    while (foundEmptySpot == false) {
      x1 = floor(random(0, (gridSz/2)-1));
      y1 = floor(random(0, gridSz/2));
        if (map[x1][y1] == false) {
        foundEmptySpot = true;
        map[x1][y1] = true;
        }
    }
// randomly determine building dimensions
    let w1 = random(10, BUILDING_MAX_SIZE);
    let h1 = random(10, BUILDING_MAX_SIZE);
    let d1 = random(40, 100); // building height
// render a building
    push();
    translate(x1 * BUILDING_MAX_SIZE, y1 * BUILDING_MAX_SIZE, d1 / 2);
    box(w1, h1, d1);
    pop();
  }
  resetMap();
  
  for (let i = 0; i < nBuildings/4; i++) {
    let foundEmptySpot = false;
    let x2 = 0;
    let y2 = 0;
  while (foundEmptySpot == false) {
    x2 = floor(random((gridSz/2)+1, gridSz));
    y2 = floor(random((gridSz/2)+1, gridSz));
  if (map[x2][y2] == false) {
    foundEmptySpot = true;
    map[x2][y2] = true;
    }
  }
// randomly determine building dimensions
  let w2 = random(10, BUILDING_MAX_SIZE*1.5);
  let h2 = random(10, BUILDING_MAX_SIZE*1.5);
  let d2 = random(10, 20); // building height
// render a building
  push();
  translate(x2 * BUILDING_MAX_SIZE, y2 * BUILDING_MAX_SIZE, d2 / 2);
  box(w2, h2, d2);
  let ran;
  ran=random(0,100);
    if(ran<20){
      translate(random(-2,10),random(-2,10), random(-2,2));
      box(5, 5, random(d2*5));
    }  
  pop();
  } 
  resetMap();

  for (let i = 0; i < nBuildings/4; i++) {
    let foundEmptySpot = false;
    let x3 = 0;
    let y3 = 0;
  while (foundEmptySpot == false) {
    x3 = floor(random(gridSz/2, gridSz));
    y3 = floor(random(0, gridSz/2));
    if (map[x3][y3] == false) {
      foundEmptySpot = true;
      map[x3][y3] = true;
    }
  }
// randomly determine building dimensions
  let w3 = random(10, BUILDING_MAX_SIZE/2);
  let h3 = random(10, BUILDING_MAX_SIZE/2);
  let d3 = random(nBuildings/2, nBuildings+100); // building height
// render a building
  push();
  translate(x3 * BUILDING_MAX_SIZE, y3 * BUILDING_MAX_SIZE, d3 / 2);
  rotateX(7.85);
  cylinder(w3, d3, floor(random(3,8)),1);
  pop();
  }
  resetMap();
  
  for (let i = 0; i < nBuildings/4; i++) {
    let foundEmptySpot = false;
    let x4 = 0;
    let y4 = 0;
  while (foundEmptySpot == false) {
    x4 = floor(random(0, gridSz/2));
    y4 = floor(random(gridSz/2, gridSz));
  if (map[x4][y4] == false) {
    foundEmptySpot = true;
    map[x4][y4] = true;
    }
  }
// randomly determine building dimensions
  let w4 = random(10, BUILDING_MAX_SIZE/2);
  let h4 = random(10, BUILDING_MAX_SIZE/2);
  let d4 = random(10, 60); // building height
// render a building
  push();
  translate(x4 * BUILDING_MAX_SIZE, y4 * BUILDING_MAX_SIZE, d4 / 2);

  ellipsoid(w4, h4, d4,floor(random(3,8)) , 2);
  ellipsoid(w4+10, h4+10, d4/2 ,floor(random(3,8)) , 2);  
  rotateZ(7.85);    
  pop();
  } 
  resetMap();
    
  for (let i = 0; i < nBuildings; i++) {
    let foundEmptySpot = false;
    let x5 = 0;
    let y5 = 0;
  while (foundEmptySpot == false) {
    x5 = floor(random(0, gridSz));
    y5 = floor(random(0, gridSz));
    if (map[x5][y5] == false) {
      foundEmptySpot = true;
      map[x5][y5] = true;
    }
  }
// randomly determine building dimensions
  let w5 = random(10, BUILDING_MAX_SIZE/2);
  let h5 = random(10, BUILDING_MAX_SIZE/2);
  let d5 = random(10, 60); // building height
// render a building
  push();
  translate(x5 * BUILDING_MAX_SIZE, y5 * BUILDING_MAX_SIZE, 400);
  rotateX(7.85);
  sphere(d5);
  pop();
  } 
    resetMap();
}

function mousePressed() {
  if (buho==1) {
  buho=-1;
  }
  else{
  buho=1;
  }
  
}
