precision mediump float;

varying vec2 vUv;
uniform sampler2D uT;
uniform float uTick;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uHover;

void main() {

  vec2 uv = vUv;
  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  vec4 texColor = texture(uT, uv);
  gl_FragColor = texColor;

}