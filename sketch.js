let building_sl, rotateX_sl, rotateZ_sl;
let CITY_SIZE = 800;
let BUILDING_MAX_SIZE = 40;
let gridSz = CITY_SIZE / BUILDING_MAX_SIZE;
let map = [];
function resetMap() {
for (let i = 0; i < gridSz; i++)
for (let j = 0; j < gridSz; j++) {
map[i][j] = false;
}
}
function setup() {
createCanvas(windowWidth, windowHeight, WEBGL);
colorMode(RGB,1);
// init map
for (let i = 0; i < gridSz; i++) {
map[i] = [];
for (let j = 0; j < gridSz; j++) {
map[i][j] = false;
}
}
resetMap();
building_sl = createSlider(1, 200, 3);
building_sl.position(10, 30);
rotateX_sl = createSlider(0, 180, 0);
rotateX_sl.position(10, 50);
rotateZ_sl = createSlider(0, 180, 0);
rotateZ_sl.position(10, 70);
}
function draw() {
background(0.2,0.2,0.9);
randomSeed(1);
lights();
directionalLight(1, 1, 0, 0, 1, 0);
rotateX(radians(rotateX_sl.value()));
rotateZ(radians(rotateZ_sl.value()));
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