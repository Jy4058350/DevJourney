precision mediump float;

varying vec2 vUv;
uniform sampler2D uTex1;
uniform float uTick;
uniform float uProgress;
uniform vec2 uMouse;

void main() {

  vec2 uv = vUv;
  vec4 color = texture2D(uTex1, uv);

  vec2 mouse = step(uMouse, uv);

  gl_FragColor = vec4(mouse, 0.0, 1.0);

}