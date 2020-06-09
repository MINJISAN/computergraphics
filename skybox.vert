// must always set precision
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// p5.js built-in attribute variables
attribute vec3 aPosition;

// varying variables that are passed to rasterizer and fragment shader
varying vec3 vTexCoords;

void main() {
  vTexCoords = aPosition;
  // mat4(mat3(uModelViewMatrix)) -> remove camera translation from the view matrix
  vec4 pos = uProjectionMatrix * mat4(mat3(uModelViewMatrix)) * vec4(aPosition, 1.0);

  // xyzw —> xyww makes skybox surface always at the farthest distance because after perspective divide z always becomes +1 (the farthest distance in NDC space)

  gl_Position = pos.xyww;
}