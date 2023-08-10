precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
uniform sampler2D uTex4;
uniform sampler2D uTex5;
uniform float uTick;
uniform float uProgress;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;
uniform float uProgress5;
uniform float uIndex;

void main() {

  vec2 uv = vUv;
  vec4 color1 = texture2D(uTex1, uv);
  vec4 color2 = texture2D(uTex2, uv);
  vec4 color3 = texture2D(uTex3, uv);
  vec4 color4 = texture2D(uTex4, uv);
  vec4 color5 = texture2D(uTex5, uv);

  float tempIndex = uIndex;
  float tempProgress = uProgress;
  float tempProgress2 = uProgress2;
  float tempProgress3 = uProgress3;
  float tempProgress4 = uProgress4;
  float tempProgress5 = uProgress5;
// Check if uProgress animation is complete (uProgress reaches 1)
  if(tempProgress >= 1.0) {
    // Increase uIndex to switch to the next texture
    tempIndex = mod(tempIndex + 1.0, 5.0); // Assuming you have 3 textures
    // Reset uProgress to start the animation again
    tempProgress = 0.0;
  }

  if(tempIndex == 0.0) {
    vec4 finalColor = mix(color1, color2, tempProgress);
    gl_FragColor = finalColor;
    // gl_FragColor = color1;
  } else if(tempIndex == 1.0) {
    vec4 finalColor = mix(color2, color3, tempProgress2);
    gl_FragColor = finalColor;
    // gl_FragColor = color2;
  } else if(tempIndex == 2.0) {
    vec4 finalColor = mix(color3, color4, tempProgress3);
    gl_FragColor = finalColor;
    // gl_FragColor = color3;
  } else if(tempIndex == 3.0) {
    vec4 finalColor = mix(color4, color5, tempProgress4);
    gl_FragColor = finalColor;
    // gl_FragColor = color4;
  } else if(tempIndex == 4.0) {
    vec4 finalColor = mix(color5, color1, tempProgress5);
    gl_FragColor = finalColor;
    // gl_FragColor = color5;
  } else {
    // Handle other index values if needed
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Default color if index is not matched
  }
  // gl_FragColor = vec4(tempProgress / 3.0, 0.0, 0.0, 1.0);
  // gl_FragColor = vec4(tempIndex / 3.0 / 0.0, 0.0, 0.0, 1.0);
}