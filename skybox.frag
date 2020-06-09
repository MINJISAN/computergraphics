// must always set precision
precision mediump float;

//uniform variables that we set in the application program
uniform samplerCube cubeMap;

// varying variables that are initially from vertex shader and interpolated before fed into this fragment shader
varying vec3 vTexCoords;

void main() {
  vec3 tc = vec3(vTexCoords.x, -vTexCoords.y, vTexCoords.z);
  gl_FragColor = textureCube(cubeMap, normalize(tc));
}