precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;

// Function to convert color to grayscale
vec4 toGrayscale(vec4 color) {
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  return vec4(gray, gray, gray, color.a);
}

// Function to convert grayscale to color
vec4 toColor(vec4 grayscale) {
  return vec4(grayscale.r, grayscale.r, grayscale.r, grayscale.a);
}

// Mix function for vec4 values
vec4 mix(vec4 x, vec4 y, float a) {
  return x * (1.0 - a) + y * a;
}

void main() {

  vec4 color1 = texture2D(uTex1, vUv);
  vec4 color2 = texture2D(uTex2, vUv);

// Calculate the y-coordinate with respect to uProgress
  float yCoordinate = vUv.y * (1.0 - uProgress);

  // Use the calculated y-coordinate to make color1 gradually transparent from bottom
  vec4 fadedColor1 = mix(toGrayscale(color1), vec4(0.0), smoothstep(0.0, 0.4, yCoordinate));

// Calculate a separate progress value for the grayscale transition
  float grayscaleProgress = smoothstep(0.5, 1.0, uProgress);

  // Use uProgress to transition from fadedColor1 to grayscale
  vec4 finalColor = mix(fadedColor1, color1, grayscaleProgress);

  gl_FragColor = finalColor;
}