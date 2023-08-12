precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;

void main() {

  vec2 uv = vUv;

  vec2 yCoodinate = (1 - uProgress) * uv;

  // vec4 color = texture2D(uTex1, uv);
vec4 yCoodinateColor = texture2D(uTex1, yCoodinate);
  gl_FragColor = color;
  gl_FragColor = yCoodinateColor;

}