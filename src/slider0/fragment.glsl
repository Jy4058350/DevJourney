precision mediump float;

varying vec2 vUv;
uniform sampler2D uTexCurrent;
uniform sampler2D uTexNext;
uniform float uTick;
uniform float uProgress;
uniform float uProgress2;
uniform float uProgress3;

// Function to convert color to grayscale
vec4 toGrayscale(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  return vec4(gray, gray, gray, color.a);
}

void main() {
  vec4 tex1 = texture(uTexCurrent, vUv);
  vec4 tex2 = texture(uTexNext, vUv);

  // Stage 1: Display tex1 in color
  vec4 colorTex1 = tex1;

  // Stage 2: Convert tex1 to grayscale based on uProgress
  float grayscaleProgress = smoothstep(0.0, 1.0, uProgress);
  vec4 grayscaleTex1 = mix(colorTex1, toGrayscale(colorTex1), grayscaleProgress);

// Stage 2.5: Convert tex2 to grayscale based on uProgress3
  float grayscaleProgress2 = smoothstep(1.0, 0.0, uProgress2);
  vec4 grayscaleTex2 = mix(tex2, toGrayscale(tex2), grayscaleProgress2);

  // Stage 3: Transition from tex1 to tex2 based on uProgress2
  float transitionProgress = smoothstep(0.0, 1.0, uProgress3);
  gl_FragColor = mix(grayscaleTex1, grayscaleTex2, transitionProgress);
}
