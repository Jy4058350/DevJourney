precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;

void main() {

  vec4 color1 = texture2D(uTex1, vUv);
  vec4 color2 = texture2D(uTex2, vUv);

// Calculate the y-coordinate with respect to uProgress
  float yCoordinate = vUv.y * (1.0 - uProgress);

  // Use the calculated y-coordinate to make color1 gradually transparent from bottom
  vec4 fadedColor1 = mix(color1, vec4(0.0), smoothstep(0.0, 0.4, yCoordinate));

// Use uProgress to transition from gray to fadedColor1
  vec4 finalColor = mix(toGrayscale(color1), fadedColor1, uProgress);

  gl_FragColor = finalColor;
}