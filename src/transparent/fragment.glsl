precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform float uTick;
uniform float uProgress;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;

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
  float yCoordinate1 = vUv.y * (1.0 - uProgress);

  float grayChange1 = vUv.y * uProgress;
//カラーをグレースケールに変換
  vec4 startColor1 = mix(color1, toGrayscale(color1), uProgress);

  float fadeFactor1 = smoothstep(1.0, 0.0, (vUv.y * (2.0 - uProgress4)));
  vec4 fadeColor1 = mix(startColor1, vec4(0.0), fadeFactor1);

  // Use the calculated y-coordinate to make color1 gradually transparent from bottom
  vec4 fadedColor1 = mix(toGrayscale(color1), vec4(0.0), smoothstep(0.0, 0.4, yCoordinate1));

// Calculate a separate progress value for the grayscale transition
  float grayscaleProgress1 = smoothstep(0.5, 1.0, uProgress);

// Use uProgress to transition from fadedColor1 to grayscale
  vec4 finalColor1 = mix(fadedColor1, color1, grayscaleProgress1);

// Calculate the y-coordinate with respect to uProgress2
  float grayChange2 = vUv.y * uProgress2;
  float yCoordinate2 = vUv.y * (1.0 - uProgress3);
//グレーをカラーに変換
  vec4 startColor2 = mix(toGrayscale(color2), color2, (grayChange2) * 1.0);
  //カラーをグレーに変換
  vec4 gray = mix(color2, toGrayscale(color2), uProgress2);


  // Calculate the factor for fading from the bottom
  float fadeFactor = smoothstep(1.0, 0.0, (vUv.y * (2.0 - uProgress3)));
  // Use the calculated y-coordinate to make color2 gradually transparent from bottom
  vec4 fadeColor2 = mix(startColor2, vec4(0.0), fadeFactor);

  // Calculate a separate progress value for the grayscale transition
  float grayscaleProgress2 = smoothstep(0.5, 1.0, uProgress2);
  vec4 finalColor2 = mix(fadeColor2, color2, grayscaleProgress2);

  gl_FragColor = finalColor1;
  gl_FragColor = finalColor2;

  gl_FragColor = fadeColor1;
  // gl_FragColor = startColor1;
  // gl_FragColor = color1;
  // gl_FragColor = gray;
  gl_FragColor = fadeColor2;
  // gl_FragColor = startColor2;
  // gl_FragColor = color2;
}