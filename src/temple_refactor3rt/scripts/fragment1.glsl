precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex;
uniform float uTick;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uHover;

void main() {

  vec2 uv = vUv;
  vec4 color = texture(uTex, uv);
  gl_FragColor = color;

}