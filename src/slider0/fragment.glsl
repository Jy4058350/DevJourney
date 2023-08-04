precision mediump float;

#pragma glslify: noise2 = require(glsl-noise/simplex/2d);
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uTick;
uniform float uProgress;
uniform float uProgress2;

// Function to convert color to grayscale
vec4 toGrayscale(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  return vec4(gray, gray, gray, color.a);
}

void main() {

  vec4 tex1 = texture(uTexCurrent, vUv);
  vec4 tex2 = texture(uTexNext, vUv);

  // Calculate the grayscale transition progress from tex1 to gray based on uProgress
  float grayscaleProgress = smoothstep(0.0, 1.0, uProgress);

  // Convert tex1 to grayscale based on the grayscale transition progress
  vec4 grayscaleTex1 = mix(tex1, toGrayscale(tex1), grayscaleProgress);

  // Calculate the transition progress from tex1 to tex2 based on uProgress
  float transitionProgress = step(1.0, uProgress);

  // Apply alpha blending between grayscaleTex1 and tex2 based on the transition progress
  gl_FragColor = mix(grayscaleTex1, tex2, transitionProgress);
}