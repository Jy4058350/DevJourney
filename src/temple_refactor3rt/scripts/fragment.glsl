precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uHover;

void main() {

  vec2 uv = vUv;
  vec4 color = texture2D(uTex1, uv);

  vec2 mouse = step(uMouse, uv);

  gl_FragColor = vec4(mouse, uHover, 1.0);
  gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);

}